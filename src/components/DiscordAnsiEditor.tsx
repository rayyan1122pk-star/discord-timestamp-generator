"use client";

import React, { useState } from "react";
import { Copy, Check, RotateCcw, Palette, Terminal } from "lucide-react";
import {
  ANSI_FOREGROUND_COLORS,
  ANSI_BACKGROUND_COLORS,
  generateDiscordAnsiBlock,
  FormattedSpan,
} from "@/lib/ansi-colors";

export function DiscordAnsiEditor() {
  const [inputText, setInputText] = useState<string>("Welcome to the server! Read the rules and enjoy your stay.");
  const [selectedFg, setSelectedFg] = useState<string>("32"); // Green by default
  const [selectedBg, setSelectedBg] = useState<string>("");
  const [isBold, setIsBold] = useState<boolean>(true);
  const [isUnderline, setIsUnderline] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Pre-built popular color presets
  const presets = [
    { name: "Success Alert", text: "[SUCCESS] Verification completed successfully!", fg: "32", bg: "", bold: true, underline: false },
    { name: "Error Warning", text: "[ERROR] Access denied. Missing server permissions.", fg: "31", bg: "", bold: true, underline: false },
    { name: "Info Notice", text: "[NOTICE] Scheduled maintenance in 30 minutes.", fg: "36", bg: "40", bold: false, underline: false },
    { name: "VIP Announcement", text: "*** OFFICIAL SERVER UPDATE ***", fg: "33", bg: "", bold: true, underline: true },
  ];

  // Current formatted span representation
  const currentSpan: FormattedSpan = {
    text: inputText,
    fg: selectedFg,
    bg: selectedBg,
    bold: isBold,
    underline: isUnderline,
  };

  const outputCode = generateDiscordAnsiBlock([currentSpan]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const applyPreset = (preset: typeof presets[0]) => {
    setInputText(preset.text);
    setSelectedFg(preset.fg);
    setSelectedBg(preset.bg);
    setIsBold(preset.bold);
    setIsUnderline(preset.underline);
  };

  const getPreviewHex = () => {
    const fg = ANSI_FOREGROUND_COLORS.find((c) => c.code === selectedFg);
    return fg ? fg.hex : "#ffffff";
  };

  const getPreviewBgHex = () => {
    const bg = ANSI_BACKGROUND_COLORS.find((c) => c.code === selectedBg);
    return bg ? bg.hex : "transparent";
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0e121a] p-5 sm:p-7 md:p-8 shadow-2xl backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-800/80 gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Palette className="h-6 w-6 text-indigo-400" />
            <span>Discord Colored Text Generator</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Format custom ANSI colored text and copy ready-to-paste code blocks for Discord chat.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setInputText("Type your announcement text here...");
            setSelectedFg("0");
            setSelectedBg("");
            setIsBold(false);
            setIsUnderline(false);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700/80 bg-slate-800/60 hover:bg-slate-700/60 text-xs font-medium text-slate-300 hover:text-white transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Preset Buttons */}
      <div className="mb-6 flex items-center gap-2 flex-wrap">
        <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
          <Palette className="h-3.5 w-3.5 text-indigo-400" />
          <span>Style Presets:</span>
        </span>
        {presets.map((p) => (
          <button
            key={p.name}
            type="button"
            onClick={() => applyPreset(p)}
            className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 hover:border-indigo-500 text-xs text-slate-200 transition-colors"
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Editor Controls */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-2">
            Enter Message Text
          </label>
          <textarea
            rows={3}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full rounded-lg border border-slate-700/80 bg-slate-900/90 p-3.5 text-sm text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono transition-colors"
            placeholder="Type your message..."
          />
        </div>

        {/* Text Color Selection */}
        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-2">
            Text Color (Foreground)
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
            {ANSI_FOREGROUND_COLORS.map((col) => {
              const active = selectedFg === col.code;
              return (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => setSelectedFg(col.code)}
                  className={`flex items-center gap-1.5 p-2 rounded-lg border text-left text-xs transition-all ${
                    active
                      ? "border-indigo-500 bg-indigo-950/40 text-white font-semibold"
                      : "border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300"
                  }`}
                >
                  <span
                    className="inline-block h-3 w-3 rounded-full border border-white/20 flex-shrink-0"
                    style={{ backgroundColor: col.hex }}
                  />
                  <span className="truncate text-[11px]">{col.name.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Background Color Selection & Styles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-2">
              Background Highlight
            </label>
            <select
              value={selectedBg}
              onChange={(e) => setSelectedBg(e.target.value)}
              className="w-full rounded-lg border border-slate-700/80 bg-slate-900/90 px-3 py-2 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {ANSI_BACKGROUND_COLORS.map((bg) => (
                <option key={bg.id} value={bg.code}>
                  {bg.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-2">
              Text Formatting
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsBold(!isBold)}
                className={`flex-1 py-2 px-3 rounded-lg border text-xs font-semibold transition-colors ${
                  isBold
                    ? "border-indigo-500 bg-indigo-950/50 text-indigo-300"
                    : "border-slate-800 bg-slate-900 text-slate-400 hover:text-white"
                }`}
              >
                Bold [1m]
              </button>
              <button
                type="button"
                onClick={() => setIsUnderline(!isUnderline)}
                className={`flex-1 py-2 px-3 rounded-lg border text-xs font-semibold transition-colors ${
                  isUnderline
                    ? "border-indigo-500 bg-indigo-950/50 text-indigo-300"
                    : "border-slate-800 bg-slate-900 text-slate-400 hover:text-white"
                }`}
              >
                Underline [4m]
              </button>
            </div>
          </div>
        </div>

        {/* Live Discord Dark Mode Chat Preview */}
        <div className="mt-6 pt-4 border-t border-slate-800/80">
          <div className="rounded-xl border border-slate-800 bg-[#1e1f22] p-4 text-[#dbdee1] shadow-lg">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#2b2d31]">
              <span className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
                <Terminal className="h-3.5 w-3.5 text-indigo-400" />
                <span>Discord ANSI Preview (How it looks in chat)</span>
              </span>
            </div>

            <div className="rounded-lg bg-[#2b2d31] p-3 font-mono text-sm leading-relaxed overflow-x-auto border border-[#35373c]">
              <span
                style={{
                  color: getPreviewHex(),
                  backgroundColor: getPreviewBgHex(),
                  fontWeight: isBold ? 700 : 400,
                  textDecoration: isUnderline ? "underline" : "none",
                  padding: selectedBg ? "2px 4px" : "0",
                  borderRadius: selectedBg ? "3px" : "0",
                }}
              >
                {inputText || "Your colored text will preview here..."}
              </span>
            </div>
          </div>
        </div>

        {/* Raw Codeblock Output with 1-Click Copy */}
        <div className="mt-4 rounded-xl border border-slate-800 bg-[#0a0d13] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <span className="text-xs text-slate-400 font-mono block mb-1">Raw Discord Syntax:</span>
            <pre className="text-xs font-mono text-indigo-300 bg-slate-900/90 p-2.5 rounded-lg border border-slate-800/80 overflow-x-auto whitespace-pre-wrap">
              {outputCode}
            </pre>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 active:scale-[0.98] ${
              copied
                ? "bg-emerald-600 text-white"
                : "bg-[#5865F2] hover:bg-[#4752c4] text-white"
            }`}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>Copied Code!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy ANSI Block</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
