"use client";

import React, { useState } from "react";
import { Copy, Check, Type, RotateCcw, Terminal } from "lucide-react";
import { FONT_STYLES } from "@/lib/font-generator";

export function DiscordFontGenerator() {
  const [text, setText] = useState("Welcome to the community!");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (transformed: string, id: string) => {
    try {
      await navigator.clipboard.writeText(transformed);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0e121a] p-5 sm:p-7 md:p-8 shadow-2xl backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-800/80 gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Type className="h-6 w-6 text-indigo-400" />
            <span>Discord Font Generator</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Generate stylish Unicode fonts for Discord usernames, channel names, server bios, and role titles.
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

      {/* Input Field */}
      <div className="mb-6">
        <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-2">
          Your Text
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your name or message here..."
          className="w-full rounded-xl border border-slate-700/80 bg-slate-900/90 p-4 text-base text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono transition-colors"
        />
      </div>

      {/* Font Output Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {FONT_STYLES.map((style) => {
          const transformed = style.transform(text || "Preview Text");
          const isCopied = copiedId === style.id;

          return (
            <div
              key={style.id}
              className="flex items-center justify-between p-3.5 rounded-xl border border-slate-800/80 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900 transition-all group"
            >
              <div className="min-w-0 pr-3">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <span>{style.name}</span>
                  <span className="text-[10px] text-indigo-400/80 font-normal">({style.category})</span>
                </div>
                <div className="text-sm sm:text-base font-medium text-slate-100 truncate select-all">
                  {transformed}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(transformed, style.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all flex-shrink-0 ${
                  isCopied
                    ? "bg-emerald-600 text-white"
                    : "bg-[#5865F2] hover:bg-[#4752c4] text-white opacity-90 group-hover:opacity-100"
                }`}
              >
                {isCopied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Live Discord Dark Chat Preview */}
      <div className="mt-8 pt-6 border-t border-slate-800/80">
        <div className="rounded-xl border border-slate-800 bg-[#1e1f22] p-4 text-[#dbdee1] shadow-lg">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#2b2d31]">
            <span className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
              <Terminal className="h-3.5 w-3.5 text-indigo-400" />
              <span>Discord Chat Preview</span>
            </span>
          </div>

          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-full bg-[#5865F2] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              DISC
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">ServerMember</span>
                <span className="text-[11px] text-slate-400">Today at 12:00 PM</span>
              </div>
              <p className="text-sm text-slate-200 mt-1 break-words">
                {FONT_STYLES[0].transform(text || "Welcome to the server!")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
