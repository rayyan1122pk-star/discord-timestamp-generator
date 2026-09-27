"use client";

import React, { useState } from "react";
import {
  Copy,
  Check,
  RotateCcw,
  Plus,
  Trash2,
  Code2,
  ExternalLink,
  Layers,
  Image as ImageIcon,
  User,
  FileText,
  Clock,
  Send,
} from "lucide-react";

export interface EmbedField {
  id: string;
  name: string;
  value: string;
  inline: boolean;
}

interface EmbedPreset {
  name: string;
  title: string;
  description: string;
  color: string;
  authorName: string;
  fields: EmbedField[];
  footerText: string;
}

const PRESETS: EmbedPreset[] = [
  {
    name: "Server Announcement",
    title: "Official Community Announcement",
    description: "We are excited to roll out new community features and roles! Read through the updates below and join us in voice chat tonight.",
    color: "#5865F2",
    authorName: "Community Staff",
    fields: [
      { id: "p1", name: "Scheduled Time", value: "Today at 8:00 PM UTC", inline: true },
      { id: "p2", name: "Voice Channel", value: "#stage-events", inline: true },
      { id: "p3", name: "Important Note", value: "Ensure you have updated your client to the newest version.", inline: false },
    ],
    footerText: "Server Administration Team",
  },
  {
    name: "Rules & Verification",
    title: "Server Rules & Guidelines",
    description: "Welcome to the server. To keep our community friendly and productive, please follow these core guidelines.",
    color: "#57F287",
    authorName: "Moderation Team",
    fields: [
      { id: "r1", name: "1. Respect", value: "Treat all members with mutual courtesy.", inline: true },
      { id: "r2", name: "2. No Spam", value: "Keep advertising to designated channels.", inline: true },
      { id: "r3", name: "Verification", value: "Click the reaction button in #verify to receive access.", inline: false },
    ],
    footerText: "Rulebook Revision 4",
  },
  {
    name: "System Outage / Status",
    title: "Service Operational Alert",
    description: "All automated bot instances and database clusters are currently running with zero degraded performance.",
    color: "#00B0F4",
    authorName: "DevOps Bot",
    fields: [
      { id: "s1", name: "API Latency", value: "24ms", inline: true },
      { id: "s2", name: "Gateway", value: "Connected", inline: true },
      { id: "s3", name: "Uptime", value: "99.98% across 30 days", inline: false },
    ],
    footerText: "System Monitor v2.4",
  },
  {
    name: "Urgent Warning",
    title: "Security Warning: Phishing Links",
    description: "Staff will never direct message you asking for your password, QR code scans, or account tokens.",
    color: "#ED4245",
    authorName: "Security Desk",
    fields: [
      { id: "w1", name: "Do Not Click", value: "Suspicious free Nitro links", inline: true },
      { id: "w2", name: "Report", value: "Tag @Moderator immediately", inline: true },
    ],
    footerText: "Official Security Bulletin",
  },
];

const COLOR_SWATCHES = [
  { name: "Blurple", hex: "#5865F2" },
  { name: "Green", hex: "#57F287" },
  { name: "Yellow", hex: "#FEE75C" },
  { name: "Fuchsia", hex: "#EB459E" },
  { name: "Red", hex: "#ED4245" },
  { name: "Aqua", hex: "#00B0F4" },
  { name: "Dark", hex: "#2B2D31" },
  { name: "White", hex: "#FFFFFF" },
];

export function DiscordEmbedBuilder() {
  const [webhookName, setWebhookName] = useState<string>("Community Bot");
  const [webhookAvatar, setWebhookAvatar] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const [title, setTitle] = useState<string>("Official Community Announcement");
  const [titleUrl, setTitleUrl] = useState<string>("");
  const [description, setDescription] = useState<string>(
    "We are excited to roll out new community features and roles! Read through the updates below and join us in voice chat tonight."
  );
  const [color, setColor] = useState<string>("#5865F2");

  const [authorName, setAuthorName] = useState<string>("Community Staff");
  const [authorUrl, setAuthorUrl] = useState<string>("");
  const [authorIcon, setAuthorIcon] = useState<string>("");

  const [fields, setFields] = useState<EmbedField[]>([
    { id: "1", name: "Scheduled Time", value: "Today at 8:00 PM UTC", inline: true },
    { id: "2", name: "Voice Channel", value: "#stage-events", inline: true },
    { id: "3", name: "Important Note", value: "Ensure you have updated your client to the newest version.", inline: false },
  ]);

  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const [footerText, setFooterText] = useState<string>("Server Administration Team");
  const [footerIcon, setFooterIcon] = useState<string>("");
  const [includeTimestamp, setIncludeTimestamp] = useState<boolean>(true);

  const [activeTab, setActiveTab] = useState<"content" | "author" | "fields" | "images" | "footer">("content");
  const [exportFormat, setExportFormat] = useState<"webhook" | "discordjs" | "discordpy" | "raw">("webhook");
  const [copied, setCopied] = useState<boolean>(false);

  // Convert hex string to integer decimal for Discord API
  const getDecimalColor = (hex: string): number => {
    const cleanHex = hex.replace("#", "");
    const parsed = parseInt(cleanHex, 16);
    return Number.isNaN(parsed) ? 5793266 : parsed;
  };

  const addField = () => {
    if (fields.length >= 25) return;
    const newField: EmbedField = {
      id: Date.now().toString(),
      name: `Field ${fields.length + 1}`,
      value: "Field value text goes here.",
      inline: true,
    };
    setFields([...fields, newField]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  const updateField = (id: string, key: keyof EmbedField, val: string | boolean) => {
    setFields(
      fields.map((f) => (f.id === id ? { ...f, [key]: val } : f))
    );
  };

  const applyPreset = (preset: EmbedPreset) => {
    setTitle(preset.title);
    setDescription(preset.description);
    setColor(preset.color);
    setAuthorName(preset.authorName);
    setFields(preset.fields);
    setFooterText(preset.footerText);
  };

  const handleReset = () => {
    setTitle("");
    setTitleUrl("");
    setDescription("");
    setColor("#5865F2");
    setAuthorName("");
    setAuthorUrl("");
    setAuthorIcon("");
    setFields([]);
    setThumbnailUrl("");
    setImageUrl("");
    setFooterText("");
    setFooterIcon("");
    setContent("");
  };

  // Generate Webhook JSON Payload
  const getWebhookJson = () => {
    const embedObj: Record<string, unknown> = {};

    if (title.trim()) embedObj.title = title.trim();
    if (titleUrl.trim()) embedObj.url = titleUrl.trim();
    if (description.trim()) embedObj.description = description.trim();
    embedObj.color = getDecimalColor(color);

    if (authorName.trim()) {
      const authorObj: Record<string, string> = { name: authorName.trim() };
      if (authorUrl.trim()) authorObj.url = authorUrl.trim();
      if (authorIcon.trim()) authorObj.icon_url = authorIcon.trim();
      embedObj.author = authorObj;
    }

    if (fields.length > 0) {
      embedObj.fields = fields.map((f) => ({
        name: f.name.trim() || "Untitled",
        value: f.value.trim() || "No content",
        inline: f.inline,
      }));
    }

    if (thumbnailUrl.trim()) {
      embedObj.thumbnail = { url: thumbnailUrl.trim() };
    }

    if (imageUrl.trim()) {
      embedObj.image = { url: imageUrl.trim() };
    }

    if (footerText.trim() || footerIcon.trim()) {
      const footerObj: Record<string, string> = {};
      if (footerText.trim()) footerObj.text = footerText.trim();
      if (footerIcon.trim()) footerObj.icon_url = footerIcon.trim();
      embedObj.footer = footerObj;
    }

    if (includeTimestamp) {
      embedObj.timestamp = new Date().toISOString();
    }

    const payload: Record<string, unknown> = {
      username: webhookName.trim() || "Community Bot",
    };
    if (webhookAvatar.trim()) payload.avatar_url = webhookAvatar.trim();
    if (content.trim()) payload.content = content.trim();
    payload.embeds = [embedObj];

    return JSON.stringify(payload, null, 2);
  };

  // Generate discord.js v14 code
  const getDiscordJsCode = () => {
    const lines: string[] = [
      "const { EmbedBuilder } = require('discord.js');",
      "",
      "const embed = new EmbedBuilder()",
      `  .setColor(${color.replace('#', '0x')})`,
    ];

    if (title.trim()) lines.push(`  .setTitle(${JSON.stringify(title.trim())})`);
    if (titleUrl.trim()) lines.push(`  .setURL(${JSON.stringify(titleUrl.trim())})`);
    if (description.trim()) lines.push(`  .setDescription(${JSON.stringify(description.trim())})`);

    if (authorName.trim()) {
      const authorProps: string[] = [`name: ${JSON.stringify(authorName.trim())}`];
      if (authorIcon.trim()) authorProps.push(`iconURL: ${JSON.stringify(authorIcon.trim())}`);
      if (authorUrl.trim()) authorProps.push(`url: ${JSON.stringify(authorUrl.trim())}`);
      lines.push(`  .setAuthor({ ${authorProps.join(", ")} })`);
    }

    if (thumbnailUrl.trim()) {
      lines.push(`  .setThumbnail(${JSON.stringify(thumbnailUrl.trim())})`);
    }

    if (fields.length > 0) {
      const fieldList = fields
        .map(
          (f) =>
            `    { name: ${JSON.stringify(f.name.trim() || "Untitled")}, value: ${JSON.stringify(f.value.trim() || "No content")}, inline: ${f.inline} }`
        )
        .join(",\n");
      lines.push(`  .addFields(\n${fieldList}\n  )`);
    }

    if (imageUrl.trim()) {
      lines.push(`  .setImage(${JSON.stringify(imageUrl.trim())})`);
    }

    if (includeTimestamp) {
      lines.push("  .setTimestamp()");
    }

    if (footerText.trim()) {
      const footerProps: string[] = [`text: ${JSON.stringify(footerText.trim())}`];
      if (footerIcon.trim()) footerProps.push(`iconURL: ${JSON.stringify(footerIcon.trim())}`);
      lines.push(`  .setFooter({ ${footerProps.join(", ")} })`);
    }

    lines.push(";");
    lines.push("");
    lines.push("// Send via channel or interaction:");
    lines.push("await channel.send({ embeds: [embed] });");

    return lines.join("\n");
  };

  // Generate discord.py code
  const getDiscordPyCode = () => {
    const lines: string[] = [
      "import discord",
      "from datetime import datetime, timezone",
      "",
      `embed = discord.Embed(`,
    ];

    if (title.trim()) lines.push(`    title=${JSON.stringify(title.trim())},`);
    if (titleUrl.trim()) lines.push(`    url=${JSON.stringify(titleUrl.trim())},`);
    if (description.trim()) lines.push(`    description=${JSON.stringify(description.trim())},`);
    lines.push(`    color=${color.replace('#', '0x')},`);
    if (includeTimestamp) lines.push("    timestamp=datetime.now(timezone.utc),");
    lines.push(")");

    if (authorName.trim()) {
      const aProps: string[] = [`name=${JSON.stringify(authorName.trim())}`];
      if (authorIcon.trim()) aProps.push(`icon_url=${JSON.stringify(authorIcon.trim())}`);
      if (authorUrl.trim()) aProps.push(`url=${JSON.stringify(authorUrl.trim())}`);
      lines.push(`embed.set_author(${aProps.join(", ")})`);
    }

    if (thumbnailUrl.trim()) {
      lines.push(`embed.set_thumbnail(url=${JSON.stringify(thumbnailUrl.trim())})`);
    }

    for (const f of fields) {
      lines.push(
        `embed.add_field(name=${JSON.stringify(f.name.trim() || "Untitled")}, value=${JSON.stringify(f.value.trim() || "No content")}, inline=${f.inline ? "True" : "False"})`
      );
    }

    if (imageUrl.trim()) {
      lines.push(`embed.set_image(url=${JSON.stringify(imageUrl.trim())})`);
    }

    if (footerText.trim()) {
      const fProps: string[] = [`text=${JSON.stringify(footerText.trim())}`];
      if (footerIcon.trim()) fProps.push(`icon_url=${JSON.stringify(footerIcon.trim())}`);
      lines.push(`embed.set_footer(${fProps.join(", ")})`);
    }

    lines.push("");
    lines.push("# Send via channel or interaction context:");
    lines.push("await channel.send(embed=embed)");

    return lines.join("\n");
  };

  // Raw Embed JSON (embeds array element only)
  const getRawEmbedJson = () => {
    try {
      const full = JSON.parse(getWebhookJson());
      return JSON.stringify(full.embeds[0], null, 2);
    } catch {
      return "{}";
    }
  };

  const getExportCode = () => {
    switch (exportFormat) {
      case "webhook":
        return getWebhookJson();
      case "discordjs":
        return getDiscordJsCode();
      case "discordpy":
        return getDiscordPyCode();
      case "raw":
        return getRawEmbedJson();
      default:
        return getWebhookJson();
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getExportCode());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  // Character counts
  const totalChars =
    (title?.length || 0) +
    (description?.length || 0) +
    (authorName?.length || 0) +
    (footerText?.length || 0) +
    fields.reduce((acc, f) => acc + (f.name?.length || 0) + (f.value?.length || 0), 0);

  return (
    <div className="space-y-8">
      {/* Top Bar: Presets & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl border border-slate-800 bg-[#0e121a]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">
            Presets:
          </span>
          {PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => applyPreset(p)}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700/60 font-medium"
            >
              {p.name}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-slate-800/40 hover:bg-red-950/40 text-slate-400 hover:text-red-300 border border-slate-800 hover:border-red-900/50 transition-colors"
          title="Reset all inputs"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Clear All</span>
        </button>
      </div>

      {/* Main Workspace: 2-Column Split (Editor on Left, Live Discord Preview on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Editor Controls (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-[#0e121a] p-5 sm:p-6 shadow-xl">
            {/* Editor Sub-Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4 mb-6">
              <button
                type="button"
                onClick={() => setActiveTab("content")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  activeTab === "content"
                    ? "bg-[#5865F2] text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Body & Title</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("author")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  activeTab === "author"
                    ? "bg-[#5865F2] text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <User className="h-3.5 w-3.5" />
                <span>Author</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("fields")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  activeTab === "fields"
                    ? "bg-[#5865F2] text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>Fields ({fields.length}/25)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("images")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  activeTab === "images"
                    ? "bg-[#5865F2] text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <ImageIcon className="h-3.5 w-3.5" />
                <span>Images</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("footer")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  activeTab === "footer"
                    ? "bg-[#5865F2] text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Clock className="h-3.5 w-3.5" />
                <span>Footer & Time</span>
              </button>
            </div>

            {/* TAB 1: Content & Body */}
            {activeTab === "content" && (
              <div className="space-y-4">
                {/* Message Content (Outside Embed) */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="msg-content" className="text-xs font-semibold text-slate-300">
                      Message Content (Optional text above embed)
                    </label>
                    <span className="text-[11px] text-slate-500">{content.length}/2000</span>
                  </div>
                  <input
                    id="msg-content"
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="e.g. Hey @everyone, here is our weekly update!"
                    maxLength={2000}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700/80 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#5865F2]"
                  />
                </div>

                {/* Embed Title & URL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label htmlFor="embed-title" className="text-xs font-semibold text-slate-300">
                        Embed Title
                      </label>
                      <span className="text-[11px] text-slate-500">{title.length}/256</span>
                    </div>
                    <input
                      id="embed-title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Title of your embed"
                      maxLength={256}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700/80 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#5865F2]"
                    />
                  </div>

                  <div>
                    <label htmlFor="embed-title-url" className="block text-xs font-semibold text-slate-300 mb-1">
                      Title Link URL (Optional)
                    </label>
                    <input
                      id="embed-title-url"
                      type="url"
                      value={titleUrl}
                      onChange={(e) => setTitleUrl(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700/80 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#5865F2]"
                    />
                  </div>
                </div>

                {/* Embed Description */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="embed-desc" className="text-xs font-semibold text-slate-300">
                      Description (Supports Discord Markdown)
                    </label>
                    <span className="text-[11px] text-slate-500">{description.length}/4096</span>
                  </div>
                  <textarea
                    id="embed-desc"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Write the main body text for your Discord embed..."
                    maxLength={4096}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700/80 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#5865F2] font-mono leading-relaxed"
                  />
                </div>

                {/* Color Chooser */}
                <div>
                  <label htmlFor="embed-color" className="block text-xs font-semibold text-slate-300 mb-2">
                    Embed Accent Color
                  </label>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700/80">
                      <input
                        id="embed-color"
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="h-6 w-6 rounded border-0 bg-transparent cursor-pointer"
                      />
                      <input
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-20 text-xs font-mono bg-transparent text-white focus:outline-none uppercase"
                        maxLength={7}
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      {COLOR_SWATCHES.map((swatch) => (
                        <button
                          key={swatch.hex}
                          type="button"
                          onClick={() => setColor(swatch.hex)}
                          style={{ backgroundColor: swatch.hex }}
                          className={`h-6 w-6 rounded-md border transition-transform hover:scale-110 ${
                            color.toLowerCase() === swatch.hex.toLowerCase()
                              ? "ring-2 ring-white border-transparent scale-110"
                              : "border-black/30"
                          }`}
                          title={`${swatch.name} (${swatch.hex})`}
                          aria-label={`Select ${swatch.name}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Author */}
            {activeTab === "author" && (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="author-name" className="text-xs font-semibold text-slate-300">
                      Author Name
                    </label>
                    <span className="text-[11px] text-slate-500">{authorName.length}/256</span>
                  </div>
                  <input
                    id="author-name"
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Announcement Broadcaster"
                    maxLength={256}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700/80 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#5865F2]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="author-url" className="block text-xs font-semibold text-slate-300 mb-1">
                      Author Link URL
                    </label>
                    <input
                      id="author-url"
                      type="url"
                      value={authorUrl}
                      onChange={(e) => setAuthorUrl(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700/80 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#5865F2]"
                    />
                  </div>

                  <div>
                    <label htmlFor="author-icon" className="block text-xs font-semibold text-slate-300 mb-1">
                      Author Icon Image URL
                    </label>
                    <input
                      id="author-icon"
                      type="url"
                      value={authorIcon}
                      onChange={(e) => setAuthorIcon(e.target.value)}
                      placeholder="https://example.com/icon.png"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700/80 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#5865F2]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Fields */}
            {activeTab === "fields" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-400">
                    Discord embeds support up to 25 custom fields. Set inline to arrange fields side-by-side.
                  </p>
                  <button
                    type="button"
                    onClick={addField}
                    disabled={fields.length >= 25}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#5865F2] hover:bg-[#4752c4] disabled:opacity-50 text-white text-xs font-medium transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Field</span>
                  </button>
                </div>

                {fields.length === 0 ? (
                  <div className="text-center py-8 border border-dashed border-slate-800 rounded-xl">
                    <p className="text-xs text-slate-500">No fields added yet. Click Add Field above.</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                    {fields.map((field, idx) => (
                      <div
                        key={field.id}
                        className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">
                            Field #{idx + 1}
                          </span>
                          <div className="flex items-center gap-3">
                            <label className="inline-flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={field.inline}
                                onChange={(e) => updateField(field.id, "inline", e.target.checked)}
                                className="rounded border-slate-700 bg-slate-900 text-[#5865F2] focus:ring-0"
                              />
                              <span>Inline (Side-by-side)</span>
                            </label>
                            <button
                              type="button"
                              onClick={() => removeField(field.id)}
                              className="text-slate-500 hover:text-red-400 p-1 transition-colors"
                              title="Delete field"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div className="sm:col-span-1">
                            <input
                              type="text"
                              value={field.name}
                              onChange={(e) => updateField(field.id, "name", e.target.value)}
                              placeholder="Field Name"
                              maxLength={256}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#5865F2]"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <input
                              type="text"
                              value={field.value}
                              onChange={(e) => updateField(field.id, "value", e.target.value)}
                              placeholder="Field Value (markdown supported)"
                              maxLength={1024}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#5865F2]"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: Images */}
            {activeTab === "images" && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="thumbnail-url" className="block text-xs font-semibold text-slate-300 mb-1">
                    Thumbnail Image URL (Displayed in top-right of embed)
                  </label>
                  <input
                    id="thumbnail-url"
                    type="url"
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                    placeholder="https://example.com/small-logo.png"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700/80 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#5865F2]"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Direct image link (PNG, JPG, GIF). Displayed as an 80x80 preview badge.
                  </p>
                </div>

                <div>
                  <label htmlFor="main-image-url" className="block text-xs font-semibold text-slate-300 mb-1">
                    Main Banner Image URL (Displayed full-width at embed bottom)
                  </label>
                  <input
                    id="main-image-url"
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/banner-art.png"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700/80 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#5865F2]"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Direct banner image link. Renders responsively within Discord chat width.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 5: Footer & Timestamp */}
            {activeTab === "footer" && (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="footer-text" className="text-xs font-semibold text-slate-300">
                      Footer Text
                    </label>
                    <span className="text-[11px] text-slate-500">{footerText.length}/2048</span>
                  </div>
                  <input
                    id="footer-text"
                    type="text"
                    value={footerText}
                    onChange={(e) => setFooterText(e.target.value)}
                    placeholder="e.g. System Security Team"
                    maxLength={2048}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700/80 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#5865F2]"
                  />
                </div>

                <div>
                  <label htmlFor="footer-icon" className="block text-xs font-semibold text-slate-300 mb-1">
                    Footer Icon Image URL
                  </label>
                  <input
                    id="footer-icon"
                    type="url"
                    value={footerIcon}
                    onChange={(e) => setFooterIcon(e.target.value)}
                    placeholder="https://example.com/tiny-shield.png"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700/80 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#5865F2]"
                  />
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <label className="inline-flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeTimestamp}
                      onChange={(e) => setIncludeTimestamp(e.target.checked)}
                      className="rounded border-slate-700 bg-slate-900 text-[#5865F2] focus:ring-0"
                    />
                    <span className="font-medium">Include Real-time ISO-8601 Timestamp in Footer</span>
                  </label>
                </div>
              </div>
            )}

            {/* Character Limit Status Footer */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Total Embed Characters:</span>
              <span className={`font-mono font-semibold ${totalChars > 6000 ? "text-red-400" : "text-emerald-400"}`}>
                {totalChars} / 6000
              </span>
            </div>
          </div>

          {/* Webhook Bot Settings Box */}
          <div className="rounded-xl border border-slate-800 bg-[#0e121a]/80 p-4 space-y-3">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Send className="h-3.5 w-3.5 text-[#5865F2]" />
              <span>Webhook Bot Identity (Preview Header)</span>
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={webhookName}
                onChange={(e) => setWebhookName(e.target.value)}
                placeholder="Bot Display Name"
                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#5865F2]"
              />
              <input
                type="url"
                value={webhookAvatar}
                onChange={(e) => setWebhookAvatar(e.target.value)}
                placeholder="Bot Avatar Image URL"
                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#5865F2]"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Live Discord Chat Simulation Preview (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Discord Chat Preview</span>
            </span>
            <span className="text-[11px] text-slate-500">Dark Mode</span>
          </div>

          {/* Discord Chat Bubble Frame */}
          <div className="rounded-2xl border border-[#202225] bg-[#313338] p-4 sm:p-5 shadow-2xl text-slate-200 font-sans selection:bg-[#5865F2]/40">
            {/* Discord Message Row */}
            <div className="flex items-start gap-4">
              {/* Bot Avatar */}
              <div className="relative flex-shrink-0 mt-0.5">
                {webhookAvatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={webhookAvatar}
                    alt={webhookName}
                    className="h-10 w-10 rounded-full object-cover bg-slate-800"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-[#5865F2] flex items-center justify-center text-white font-bold text-sm shadow-inner">
                    {webhookName.charAt(0).toUpperCase() || "B"}
                  </div>
                )}
              </div>

              {/* Message Body */}
              <div className="flex-1 min-w-0">
                {/* Header: Username, BOT tag, Timestamp */}
                <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                  <span className="font-semibold text-white text-[15px] hover:underline cursor-pointer leading-tight">
                    {webhookName.trim() || "Community Bot"}
                  </span>
                  <span className="bg-[#5865F2] text-white text-[10px] font-bold px-1.5 py-0.5 rounded leading-none">
                    BOT
                  </span>
                  <span className="text-[11px] text-[#949ba4] font-normal">
                    Today at 1:15 PM
                  </span>
                </div>

                {/* Content above embed if present */}
                {content.trim() && (
                  <div className="text-[14px] text-[#dbdee1] mb-2 break-words leading-relaxed whitespace-pre-wrap">
                    {content}
                  </div>
                )}

                {/* Discord Embed Container */}
                <div
                  className="rounded-lg bg-[#2b2d31] p-4 max-w-lg border-l-4 shadow-sm space-y-3"
                  style={{ borderLeftColor: color || "#5865F2" }}
                >
                  {/* Author Header */}
                  {authorName.trim() && (
                    <div className="flex items-center gap-2">
                      {authorIcon.trim() && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={authorIcon}
                          alt=""
                          className="h-6 w-6 rounded-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      )}
                      {authorUrl.trim() ? (
                        <a
                          href={authorUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-semibold text-white hover:underline truncate"
                        >
                          {authorName}
                        </a>
                      ) : (
                        <span className="text-xs font-semibold text-white truncate">
                          {authorName}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Title & Thumbnail Grid */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1.5 flex-1 min-w-0">
                      {title.trim() && (
                        <div className="text-[15px] font-bold text-white leading-snug">
                          {titleUrl.trim() ? (
                            <a
                              href={titleUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[#00a8fc] hover:underline flex items-center gap-1 inline-flex"
                            >
                              <span>{title}</span>
                              <ExternalLink className="h-3 w-3 inline" />
                            </a>
                          ) : (
                            <span>{title}</span>
                          )}
                        </div>
                      )}

                      {description.trim() && (
                        <p className="text-[13px] text-[#dbdee1] leading-relaxed whitespace-pre-wrap break-words">
                          {description}
                        </p>
                      )}
                    </div>

                    {/* Top Right Thumbnail */}
                    {thumbnailUrl.trim() && (
                      <div className="flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={thumbnailUrl}
                          alt="Thumbnail"
                          className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg object-cover bg-black/20"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Fields Section (Inline grid layout) */}
                  {fields.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                      {fields.map((f) => (
                        <div
                          key={f.id}
                          className={`${f.inline ? "sm:col-span-1" : "sm:col-span-3"} min-w-0`}
                        >
                          <div className="text-xs font-bold text-white mb-0.5 truncate">
                            {f.name || "Untitled"}
                          </div>
                          <div className="text-xs text-[#dbdee1] break-words whitespace-pre-wrap">
                            {f.value || "No content"}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Main Banner Image */}
                  {imageUrl.trim() && (
                    <div className="pt-1">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imageUrl}
                        alt="Embed banner"
                        className="rounded-lg max-h-72 w-full object-cover bg-black/20"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    </div>
                  )}

                  {/* Footer & Timestamp */}
                  {(footerText.trim() || includeTimestamp) && (
                    <div className="flex items-center gap-2 pt-1 text-[11px] text-[#949ba4] font-medium leading-none">
                      {footerIcon.trim() && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={footerIcon}
                          alt=""
                          className="h-4 w-4 rounded-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      )}
                      <div className="flex items-center gap-1.5 truncate">
                        {footerText.trim() && <span>{footerText}</span>}
                        {footerText.trim() && includeTimestamp && <span>•</span>}
                        {includeTimestamp && <span>Today at 1:15 PM</span>}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Notice */}
          <p className="text-[11px] text-slate-500 text-center">
            Simulated dark mode preview closely matches official Discord desktop and mobile render engines.
          </p>
        </div>
      </div>

      {/* Export Section: Webhook JSON, discord.js v14, discord.py, Raw JSON */}
      <div className="rounded-2xl border border-slate-800 bg-[#0e121a] p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Code2 className="h-4 w-4 text-[#5865F2]" />
              <span>Export Ready Code & Payloads</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Copy ready-to-use payloads for Discord Webhooks, discord.js bots, or python scripts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-900 rounded-lg p-1 border border-slate-800">
              <button
                type="button"
                onClick={() => setExportFormat("webhook")}
                className={`text-xs px-2.5 py-1 rounded font-medium transition-colors ${
                  exportFormat === "webhook" ? "bg-[#5865F2] text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                Webhook JSON
              </button>
              <button
                type="button"
                onClick={() => setExportFormat("discordjs")}
                className={`text-xs px-2.5 py-1 rounded font-medium transition-colors ${
                  exportFormat === "discordjs" ? "bg-[#5865F2] text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                discord.js
              </button>
              <button
                type="button"
                onClick={() => setExportFormat("discordpy")}
                className={`text-xs px-2.5 py-1 rounded font-medium transition-colors ${
                  exportFormat === "discordpy" ? "bg-[#5865F2] text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                discord.py
              </button>
              <button
                type="button"
                onClick={() => setExportFormat("raw")}
                className={`text-xs px-2.5 py-1 rounded font-medium transition-colors ${
                  exportFormat === "raw" ? "bg-[#5865F2] text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                Embed Array
              </button>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all shadow-sm ${
                copied ? "bg-emerald-600 hover:bg-emerald-500" : "bg-[#5865F2] hover:bg-[#4752c4]"
              }`}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Code Output Box */}
        <div className="relative">
          <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono overflow-x-auto max-h-72 leading-relaxed">
            <code>{getExportCode()}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
