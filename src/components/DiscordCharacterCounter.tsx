"use client";

import React, { useState } from "react";
import { Copy, Check, Hash, RotateCcw, AlertTriangle, ShieldCheck } from "lucide-react";

interface LimitDef {
  id: string;
  name: string;
  limit: number;
  description: string;
}

const DISCORD_LIMITS: LimitDef[] = [
  { id: "msg", name: "Standard Message", limit: 2000, description: "Regular Discord chat message limit" },
  { id: "nitro", name: "Nitro Message", limit: 4000, description: "Nitro subscriber expanded message limit" },
  { id: "bio", name: "About Me / Bio", limit: 190, description: "User profile bio character limit" },
  { id: "nick", name: "Server Nickname", limit: 32, description: "Maximum nickname length in servers" },
  { id: "channel", name: "Channel Name", limit: 100, description: "Text or voice channel name length" },
  { id: "field", name: "Embed Field Value", limit: 1024, description: "Maximum length per embed field value" },
  { id: "embed", name: "Total Embed Payload", limit: 6000, description: "Combined characters across all embed parts" },
];

export function DiscordCharacterCounter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lineCount = text ? text.split("\n").length : 0;
  const byteCount = new TextEncoder().encode(text).length;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0e121a] p-5 sm:p-7 md:p-8 shadow-2xl backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-800/80 gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Hash className="h-6 w-6 text-indigo-400" />
            <span>Discord Character Counter</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Test your messages, announcements, and bios against official Discord limits before sending.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setText("")}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700/80 bg-slate-800/60 hover:bg-slate-700/60 text-xs font-medium text-slate-300 hover:text-white transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Clear</span>
        </button>
      </div>

      {/* Real-time Metric Overview Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Characters</div>
          <div className="text-2xl font-bold text-white mt-1 font-mono">{charCount}</div>
        </div>
        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Words</div>
          <div className="text-2xl font-bold text-indigo-300 mt-1 font-mono">{wordCount}</div>
        </div>
        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Lines</div>
          <div className="text-2xl font-bold text-slate-200 mt-1 font-mono">{lineCount}</div>
        </div>
        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">UTF-8 Bytes</div>
          <div className="text-2xl font-bold text-slate-200 mt-1 font-mono">{byteCount}</div>
        </div>
      </div>

      {/* Input Textarea */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-medium uppercase tracking-wider text-slate-300">
            Paste or Type Your Text
          </label>
          <button
            type="button"
            onClick={handleCopy}
            disabled={!text}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              copied
                ? "bg-emerald-600 text-white"
                : text
                ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                : "bg-slate-800 text-slate-400 cursor-not-allowed"
            }`}
          >
            {copied ? (
              <>
                <Check className="h-3 w-3" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy Text</span>
              </>
            )}
          </button>
        </div>
        <textarea
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your announcement, server rules, or profile bio here to verify limits..."
          className="w-full rounded-xl border border-slate-700/80 bg-slate-900/90 p-4 text-sm text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono transition-colors"
        />
      </div>

      {/* Discord Limits Breakdown */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
          Discord Limits Status
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {DISCORD_LIMITS.map((item) => {
            const isOver = charCount > item.limit;
            const remaining = item.limit - charCount;
            const percentage = Math.min(100, Math.round((charCount / item.limit) * 100));

            return (
              <div
                key={item.id}
                className={`p-3.5 rounded-xl border transition-colors ${
                  isOver
                    ? "border-rose-500/40 bg-rose-950/20"
                    : percentage > 85
                    ? "border-amber-500/40 bg-amber-950/20"
                    : "border-slate-800/80 bg-slate-900/60"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                    {isOver ? (
                      <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
                    ) : (
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                    )}
                    <span>{item.name}</span>
                  </span>
                  <span
                    className={`text-xs font-mono font-semibold ${
                      isOver ? "text-rose-400" : "text-slate-300"
                    }`}
                  >
                    {charCount} / {item.limit}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden mb-2">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isOver ? "bg-rose-500" : percentage > 85 ? "bg-amber-400" : "bg-indigo-500"
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="truncate">{item.description}</span>
                  <span className={`font-mono font-medium flex-shrink-0 ${isOver ? "text-rose-400" : "text-slate-400"}`}>
                    {isOver ? `${Math.abs(remaining)} over` : `${remaining} left`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
