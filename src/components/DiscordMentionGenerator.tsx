"use client";

import React, { useState } from "react";
import { Copy, Check, AtSign, Hash, Smile, Terminal, Sparkles, MessageSquare } from "lucide-react";
import { playCopySound } from "@/lib/sound-effects";

type MentionType = "user" | "role" | "channel" | "emoji" | "animated_emoji" | "command";

interface TabDef {
  id: MentionType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const TABS: TabDef[] = [
  { id: "user", label: "User Mention", icon: AtSign, description: "Mention any user by their Discord Snowflake ID" },
  { id: "role", label: "Role Mention", icon: Sparkles, description: "Ping any server role in announcements or webhooks" },
  { id: "channel", label: "Channel Link", icon: Hash, description: "Create clickable text links directly to server channels" },
  { id: "emoji", label: "Static Emoji", icon: Smile, description: "Format custom server emojis for bots and webhooks" },
  { id: "animated_emoji", label: "Animated Emoji", icon: Sparkles, description: "Format custom Nitro animated emojis with a: prefix" },
  { id: "command", label: "Slash Command", icon: Terminal, description: "Create clickable slash command mentions" },
];

export function DiscordMentionGenerator() {
  const [activeTab, setActiveTab] = useState<MentionType>("user");
  const [snowflakeId, setSnowflakeId] = useState("123456789012345678");
  const [name, setName] = useState("announcements");
  const [copied, setCopied] = useState(false);

  // Generate Discord formatting code
  const getSyntax = (): string => {
    const cleanId = snowflakeId.trim() || "0";
    const cleanName = name.trim().replace(/[^a-zA-Z0-9_]/g, "") || "item";

    switch (activeTab) {
      case "user":
        return `<@${cleanId}>`;
      case "role":
        return `<@&${cleanId}>`;
      case "channel":
        return `<#${cleanId}>`;
      case "emoji":
        return `<:${cleanName}:${cleanId}>`;
      case "animated_emoji":
        return `<a:${cleanName}:${cleanId}>`;
      case "command":
        return `</${cleanName}:${cleanId}>`;
      default:
        return `<@${cleanId}>`;
    }
  };

  const syntax = getSyntax();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(syntax);
      playCopySound();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0e121a] p-5 sm:p-7 md:p-8 shadow-2xl backdrop-blur-sm">
      <div className="pb-6 mb-6 border-b border-slate-800/80">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <AtSign className="h-6 w-6 text-indigo-400" />
          <span>Discord Mention & Emoji Formatter</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Generate raw Discord mention tags for users, roles, channels, custom emojis, and slash commands.
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mb-6">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-semibold transition-all ${
                isActive
                  ? "border-indigo-500 bg-indigo-950/40 text-white shadow-md shadow-indigo-500/10"
                  : "border-slate-800 bg-slate-900/60 text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon className={`h-4 w-4 mb-1.5 ${isActive ? "text-indigo-400" : "text-slate-400"}`} />
              <span className="text-[11px] text-center">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Input Controls */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-2">
            Discord Snowflake ID
          </label>
          <input
            type="text"
            value={snowflakeId}
            onChange={(e) => setSnowflakeId(e.target.value)}
            placeholder="Right-click user/role/channel -> Copy ID (e.g. 104523485728394857)"
            className="w-full rounded-xl border border-slate-700/80 bg-slate-900/90 p-3.5 text-sm text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono transition-colors"
          />
          <p className="text-[11px] text-slate-400 mt-1.5">
            Enable Developer Mode in Discord Settings to right-click any item and copy its ID.
          </p>
        </div>

        {(activeTab === "emoji" || activeTab === "animated_emoji" || activeTab === "command") && (
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-2">
              {activeTab === "command" ? "Command Name" : "Emoji Name"}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. pepe_happy, ban, help"
              className="w-full rounded-xl border border-slate-700/80 bg-slate-900/90 p-3.5 text-sm text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono transition-colors"
            />
          </div>
        )}
      </div>

      {/* Generated Output Box with 1-Click Copy */}
      <div className="rounded-xl border border-slate-800 bg-[#0a0d13] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex-1 min-w-0">
          <div className="text-xs text-slate-400 font-mono mb-1">Raw Discord Mention Syntax:</div>
          <div className="text-base font-mono text-indigo-300 bg-slate-900/90 p-3 rounded-lg border border-slate-800/80 select-all font-semibold">
            {syntax}
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all shadow-md active:scale-[0.98] ${
            copied
              ? "bg-emerald-600 text-white"
              : "bg-[#5865F2] hover:bg-[#4752c4] text-white"
          }`}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              <span>Copied Syntax!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>Copy Tag</span>
            </>
          )}
        </button>
      </div>

      {/* Live Discord Dark Chat Preview */}
      <div className="pt-6 border-t border-slate-800/80">
        <div className="rounded-xl border border-slate-800 bg-[#1e1f22] p-4 text-[#dbdee1] shadow-lg">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#2b2d31]">
            <span className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
              <MessageSquare className="h-3.5 w-3.5 text-indigo-400" />
              <span>Discord Chat Preview (How Discord Renders It)</span>
            </span>
          </div>

          <div className="rounded-lg bg-[#2b2d31] p-3 font-mono text-sm leading-relaxed border border-[#35373c] flex items-center gap-2">
            <span>Ping message:</span>
            {activeTab === "user" && (
              <span className="bg-[#5865F2]/20 text-[#c9cdfb] px-1.5 py-0.5 rounded font-semibold text-xs hover:bg-[#5865F2]/40 transition-colors">
                @User
              </span>
            )}
            {activeTab === "role" && (
              <span className="bg-[#5865F2]/20 text-[#5865F2] px-1.5 py-0.5 rounded font-semibold text-xs hover:bg-[#5865F2]/40 transition-colors">
                @Role
              </span>
            )}
            {activeTab === "channel" && (
              <span className="bg-[#2b2d31] text-[#949ba4] px-1.5 py-0.5 rounded text-xs hover:text-white transition-colors flex items-center gap-0.5">
                <Hash className="h-3 w-3 inline text-slate-400" />
                <span>channel</span>
              </span>
            )}
            {(activeTab === "emoji" || activeTab === "animated_emoji") && (
              <span className="inline-flex items-center gap-1 bg-[#1e1f22] px-2 py-0.5 rounded text-xs border border-slate-700">
                <Smile className="h-3.5 w-3.5 text-amber-400" />
                <span className="font-semibold text-white">:{name || "emoji"}:</span>
              </span>
            )}
            {activeTab === "command" && (
              <span className="bg-[#5865F2]/15 text-indigo-300 px-1.5 py-0.5 rounded text-xs font-semibold">
                /{name || "command"}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
