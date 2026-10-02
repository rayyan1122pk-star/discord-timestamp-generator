"use client";

import React, { useState } from "react";
import { Hash, Copy, Check, RotateCcw, Clock, Layers, ShieldCheck } from "lucide-react";
import { decodeDiscordSnowflake, SnowflakeDecodeResult } from "@/lib/snowflake";
import { renderDiscordFormatPreview } from "@/lib/time-utils";
import { playCopySound, playPresetSound } from "@/lib/sound-effects";

export function DiscordSnowflakeTool() {
  const [snowflakeInput, setSnowflakeInput] = useState<string>("803511102246789140");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const data: SnowflakeDecodeResult = decodeDiscordSnowflake(snowflakeInput);

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      playCopySound();
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      // Fallback
    }
  };

  const sampleSnowflakes = [
    { label: "Sample User ID", id: "803511102246789140" },
    { label: "Discord Founders Era", id: "155149108183695360" },
    { label: "Modern Bot ID", id: "1071477793574588526" },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0e121a] p-5 sm:p-7 md:p-8 shadow-2xl backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-800/80 gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Hash className="h-6 w-6 text-indigo-400" />
            <span>Discord Snowflake to Timestamp Decoder</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Decode the exact creation date, Unix timestamp, and entity age from any Discord ID.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setSnowflakeInput("")}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700/80 bg-slate-800/60 hover:bg-slate-700/60 text-xs font-medium text-slate-300 hover:text-white transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Clear</span>
        </button>
      </div>

      {/* Input Section */}
      <div>
        <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-2">
          Paste Discord Snowflake ID (User, Server, Role, Channel, or Message ID)
        </label>
        <input
          type="text"
          value={snowflakeInput}
          onChange={(e) => setSnowflakeInput(e.target.value)}
          placeholder="e.g. 803511102246789140"
          className="w-full rounded-lg border border-slate-700/80 bg-slate-900/90 px-4 py-3 text-base text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono transition-colors"
        />

        {/* Preset Sample Buttons */}
        <div className="mt-3 flex items-center gap-2 flex-wrap text-xs">
          <span className="text-slate-400 text-[11px] font-medium mr-1">Try samples:</span>
          {sampleSnowflakes.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSnowflakeInput(s.id)}
              className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 hover:border-indigo-500 text-xs text-slate-300 transition-colors"
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Section */}
      {data.valid ? (
        <div className="mt-8 space-y-5">
          {/* Main Hero Card: Creation Date & Age */}
          <div className="p-5 rounded-xl border border-indigo-950/80 bg-gradient-to-br from-indigo-950/30 to-slate-900/60">
            <span className="text-xs font-mono uppercase text-indigo-400 font-semibold block mb-1">
              Decoded Creation Moment
            </span>
            <div className="text-xl sm:text-2xl font-bold text-white mb-2">
              {new Date(data.timestampMs).toLocaleString(undefined, {
                dateStyle: "full",
                timeStyle: "medium",
              })}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2 border-t border-slate-800/60">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-indigo-400" />
                <span>UTC: {data.dateUtc}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Account Age: {renderDiscordFormatPreview(data.timestampSeconds, "R")}</span>
              </span>
            </div>
          </div>

          {/* Grid of Key Properties */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-800 bg-[#0d1017]">
              <span className="text-slate-400 block mb-1">Unix Epoch (Seconds):</span>
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-semibold text-white">{data.timestampSeconds}s</span>
                <button
                  type="button"
                  onClick={() => handleCopy(String(data.timestampSeconds), "sec")}
                  className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                  title="Copy seconds"
                >
                  {copiedKey === "sec" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-[#0d1017]">
              <span className="text-slate-400 block mb-1">Unix Epoch (Milliseconds):</span>
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-semibold text-white">{data.timestampMs}ms</span>
                <button
                  type="button"
                  onClick={() => handleCopy(String(data.timestampMs), "ms")}
                  className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                  title="Copy milliseconds"
                >
                  {copiedKey === "ms" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-[#0d1017]">
              <span className="text-slate-400 block mb-1">ISO-8601 Timestamp:</span>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-white truncate max-w-[170px]">{data.dateIso}</span>
                <button
                  type="button"
                  onClick={() => handleCopy(data.dateIso, "iso")}
                  className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                  title="Copy ISO string"
                >
                  {copiedKey === "iso" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Discord Formatted Tag Ready to Copy */}
          <div className="p-4 rounded-xl border border-slate-800 bg-[#0a0d13] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs text-slate-400 block mb-1">Discord Timestamp Code:</span>
              <div className="font-mono text-sm text-indigo-300 font-semibold">{data.discordTagRelative}</div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleCopy(data.discordTagRelative, "tag-r")}
                className="px-3.5 py-2 rounded-lg bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                {copiedKey === "tag-r" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>Copy Relative Tag</span>
              </button>

              <button
                type="button"
                onClick={() => handleCopy(data.discordTagShortDate, "tag-f")}
                className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                {copiedKey === "tag-f" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>Copy Full Date Tag</span>
              </button>
            </div>
          </div>

          {/* Internal Discord Architecture Metadata */}
          <div className="p-4 rounded-xl border border-slate-800 bg-[#0d1017]">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
              <Layers className="h-3.5 w-3.5 text-indigo-400" />
              <span>Internal 64-Bit Discord Snowflake Architecture</span>
            </span>
            <div className="grid grid-cols-3 gap-2 text-xs text-slate-400 font-mono">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="block text-[10px] text-slate-400">Worker ID (5 bits):</span>
                <span className="font-bold text-white text-xs">{data.workerId}</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="block text-[10px] text-slate-400">Process ID (5 bits):</span>
                <span className="font-bold text-white text-xs">{data.processId}</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="block text-[10px] text-slate-400">Sequence Increment (12 bits):</span>
                <span className="font-bold text-white text-xs">{data.increment}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        snowflakeInput.trim() && (
          <div className="mt-4 p-4 rounded-xl border border-rose-900/50 bg-rose-950/20 text-xs text-rose-300">
            {data.errorMessage}
          </div>
        )
      )}
    </div>
  );
}
