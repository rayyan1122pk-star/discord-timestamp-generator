"use client";

import React, { useState, useRef } from "react";
import {
  ImageIcon,
  Upload,
  Check,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Info,
  Maximize2,
  FileCheck,
} from "lucide-react";
import { playCopySound, playPresetSound } from "@/lib/sound-effects";

interface DimensionGuide {
  id: string;
  name: string;
  category: "User Profiles" | "Server Branding" | "Emojis & Stickers";
  recommendedSize: string;
  aspectRatio: string;
  maxFileSize: string;
  supportedFormats: string;
  notes: string;
  targetWidth: number;
  targetHeight: number;
}

const DISCORD_DIMENSIONS: DimensionGuide[] = [
  {
    id: "user-avatar",
    name: "User Profile Avatar",
    category: "User Profiles",
    recommendedSize: "128 x 128 px (up to 1024 x 1024 px)",
    aspectRatio: "1:1 (Square or Circle)",
    maxFileSize: "10 MB (Free / Nitro)",
    supportedFormats: "PNG, JPG, WebP, Animated GIF",
    notes: "Discord crops avatars into a circle in chat and server lists. Keep faces and main logos centered.",
    targetWidth: 512,
    targetHeight: 512,
  },
  {
    id: "user-banner",
    name: "User Profile Banner",
    category: "User Profiles",
    recommendedSize: "600 x 240 px",
    aspectRatio: "5:2",
    maxFileSize: "10 MB",
    supportedFormats: "PNG, JPG, Animated GIF",
    notes: "Requires Discord Nitro for custom profile banners. Bottom-left corner is partially covered by avatar.",
    targetWidth: 600,
    targetHeight: 240,
  },
  {
    id: "server-icon",
    name: "Server Icon",
    category: "Server Branding",
    recommendedSize: "512 x 512 px",
    aspectRatio: "1:1 (Square / Circular)",
    maxFileSize: "10 MB",
    supportedFormats: "PNG, JPG, Animated GIF (Server Level 1+)",
    notes: "Renders at 48x48px on desktop and mobile server rails. High-contrast, bold silhouettes look best.",
    targetWidth: 512,
    targetHeight: 512,
  },
  {
    id: "server-banner",
    name: "Server Banner Background",
    category: "Server Branding",
    recommendedSize: "960 x 540 px",
    aspectRatio: "16:9",
    maxFileSize: "10 MB",
    supportedFormats: "PNG, JPG, Animated GIF (Server Level 2+)",
    notes: "Appears above the channel list for Level 2 boosted servers. Top half is most visible.",
    targetWidth: 960,
    targetHeight: 540,
  },
  {
    id: "invite-splash",
    name: "Server Invite Splash",
    category: "Server Branding",
    recommendedSize: "1920 x 1080 px",
    aspectRatio: "16:9",
    maxFileSize: "10 MB",
    supportedFormats: "PNG, JPG",
    notes: "Background banner displayed on web invite links and mobile join modals (Server Level 1+).",
    targetWidth: 1920,
    targetHeight: 1080,
  },
  {
    id: "custom-emoji",
    name: "Custom Server Emoji",
    category: "Emojis & Stickers",
    recommendedSize: "128 x 128 px",
    aspectRatio: "1:1",
    maxFileSize: "256 KB (Strict limit)",
    supportedFormats: "PNG, JPG, Animated GIF",
    notes: "Discord downscales emojis to 32x32px in text. Keep file size under 256KB or Discord will reject upload.",
    targetWidth: 128,
    targetHeight: 128,
  },
  {
    id: "custom-sticker",
    name: "Custom Server Sticker",
    category: "Emojis & Stickers",
    recommendedSize: "320 x 320 px",
    aspectRatio: "1:1",
    maxFileSize: "512 KB (Strict limit)",
    supportedFormats: "PNG, APNG, Lottie JSON",
    notes: "Must be exactly 320x320 pixels. Transparent background is strongly recommended.",
    targetWidth: 320,
    targetHeight: 320,
  },
];

export function DiscordAvatarBannerSize() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    width: number;
    height: number;
    sizeKb: number;
    aspectRatio: string;
    url: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = ["All", "User Profiles", "Server Branding", "Emojis & Stickers"];

  const filteredGuides = selectedCategory === "All"
    ? DISCORD_DIMENSIONS
    : DISCORD_DIMENSIONS.filter((g) => g.category === selectedCategory);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    playPresetSound();

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.src = objectUrl;

    img.onload = () => {
      const width = img.width;
      const height = img.height;
      const ratio = (width / height).toFixed(2);
      const sizeKb = Math.round(file.size / 1024);

      setUploadedFile({
        name: file.name,
        width,
        height,
        sizeKb,
        aspectRatio: `${width}:${height} (~${ratio})`,
        url: objectUrl,
      });

      playCopySound();
    };
  };

  const clearUpload = () => {
    if (uploadedFile?.url) {
      URL.revokeObjectURL(uploadedFile.url);
    }
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-8">
      {/* Interactive Image Dimension Validator Box */}
      <div className="rounded-2xl border border-indigo-500/30 bg-[#0e121a] p-5 sm:p-7 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-800/80 gap-3">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Upload className="h-5 w-5 text-indigo-400" />
              <span>Interactive Discord Image Tester</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Drop any image to instantly measure dimensions, check aspect ratio, and verify file size limits.
            </p>
          </div>

          {uploadedFile && (
            <button
              type="button"
              onClick={clearUpload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 self-start sm:self-auto transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Tester</span>
            </button>
          )}
        </div>

        {!uploadedFile ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-700 hover:border-indigo-500/80 bg-slate-900/40 hover:bg-slate-900/80 rounded-xl p-8 text-center cursor-pointer transition-all"
          >
            <ImageIcon className="h-10 w-10 text-indigo-400 mx-auto mb-2 opacity-80" />
            <div className="text-sm font-semibold text-white mb-1">
              Click to select or drag an image here
            </div>
            <div className="text-xs text-slate-400">
              Supports PNG, JPG, WebP, and GIF. 100% client-side privacy.
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            <div className="md:col-span-4 flex items-center justify-center p-3 rounded-xl bg-slate-950 border border-slate-800">
              <img
                src={uploadedFile.url}
                alt="Uploaded preview"
                className="max-h-48 object-contain rounded-lg"
              />
            </div>

            <div className="md:col-span-8 space-y-3">
              <div className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-emerald-400" />
                <span className="font-semibold text-white text-sm truncate">
                  {uploadedFile.name}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-2.5 rounded-lg border border-slate-800 bg-slate-900">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">Dimensions</span>
                  <span className="text-sm font-bold text-white font-mono">{uploadedFile.width} x {uploadedFile.height} px</span>
                </div>

                <div className="p-2.5 rounded-lg border border-slate-800 bg-slate-900">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">File Size</span>
                  <span className="text-sm font-bold text-white font-mono">{uploadedFile.sizeKb} KB</span>
                </div>

                <div className="p-2.5 rounded-lg border border-slate-800 bg-slate-900">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">Aspect Ratio</span>
                  <span className="text-sm font-bold text-white font-mono">{uploadedFile.aspectRatio}</span>
                </div>
              </div>

              {/* Compatibility Badges */}
              <div className="pt-2">
                <span className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Discord Compatibility Audit:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
                    uploadedFile.width === uploadedFile.height
                      ? "border-emerald-500/30 bg-emerald-950/40 text-emerald-300"
                      : "border-slate-800 bg-slate-900 text-slate-400"
                  }`}>
                    {uploadedFile.width === uploadedFile.height ? "Square (Avatar / Icon Ideal)" : "Non-Square"}
                  </span>

                  <span className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
                    uploadedFile.sizeKb <= 256
                      ? "border-emerald-500/30 bg-emerald-950/40 text-emerald-300"
                      : "border-amber-500/30 bg-amber-950/40 text-amber-300"
                  }`}>
                    {uploadedFile.sizeKb <= 256 ? "Emoji Safe (<= 256KB)" : "Exceeds Emoji Limit (> 256KB)"}
                  </span>

                  <span className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
                    uploadedFile.sizeKb <= 10240
                      ? "border-emerald-500/30 bg-emerald-950/40 text-emerald-300"
                      : "border-rose-500/30 bg-rose-950/40 text-rose-300"
                  }`}>
                    {uploadedFile.sizeKb <= 10240 ? "Profile / Server Upload Safe (<= 10MB)" : "Exceeds 10MB"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              playPresetSound();
              setSelectedCategory(cat);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedCategory === cat
                ? "bg-[#5865F2] text-white font-semibold"
                : "border border-slate-800 bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Dimensions Catalog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredGuides.map((guide) => (
          <div
            key={guide.id}
            className="rounded-xl border border-slate-800 bg-[#0e121a] p-5 shadow-lg flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-white">{guide.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-indigo-500/30 bg-indigo-950/40 text-indigo-300">
                  {guide.category}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs mb-3 font-mono">
                <div className="p-2 rounded bg-slate-900 border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 block">Recommended</span>
                  <span className="text-white font-semibold">{guide.recommendedSize}</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 block">Aspect Ratio</span>
                  <span className="text-white font-semibold">{guide.aspectRatio}</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {guide.notes}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Max: {guide.maxFileSize}</span>
              <span>{guide.supportedFormats}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
