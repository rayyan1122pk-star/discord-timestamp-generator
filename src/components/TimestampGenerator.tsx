"use client";

import React, { useState, useEffect, useMemo, useTransition } from "react";
import {
  Calendar,
  Clock,
  Globe,
  Copy,
  Check,
  RotateCcw,
  Share2,
  Sparkles,
  Layers,
} from "lucide-react";
import {
  DiscordFormatStyle,
  DISCORD_FORMAT_STYLES,
  COMMON_TIMEZONES,
  buildDiscordSyntax,
  calculateEpochSeconds,
  renderDiscordFormatPreview,
} from "@/lib/time-utils";
import { DiscordMessagePreview } from "./DiscordMessagePreview";

export function TimestampGenerator() {
  const [, startTransition] = useTransition();

  // Initial state helper based on current time
  const getInitialDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return {
      date: `${year}-${month}-${day}`,
      time: `${hours}:${minutes}`,
    };
  };

  const initial = useMemo(() => getInitialDateTime(), []);

  const [date, setDate] = useState<string>(initial.date);
  const [time, setTime] = useState<string>(initial.time);
  const [timezone, setTimezone] = useState<string>("UTC");
  const [selectedStyle, setSelectedStyle] = useState<DiscordFormatStyle>("R");
  const [copiedStyle, setCopiedStyle] = useState<string | null>(null);
  const [shareCopied, setShareCopied] = useState<boolean>(false);
  const [clientTzDetected, setClientTzDetected] = useState<string | null>(null);

  // Auto-detect browser timezone on mount & check URL search params asynchronously
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (userTz) {
          setTimezone(userTz);
          setClientTzDetected(userTz);
        }
      } catch {
        // Keep UTC fallback
      }

      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const urlEpoch = params.get("t");
        const urlStyle = params.get("s") as DiscordFormatStyle | null;

        if (urlEpoch && !isNaN(Number(urlEpoch))) {
          const d = new Date(Number(urlEpoch) * 1000);
          const y = d.getFullYear();
          const m = String(d.getMonth() + 1).padStart(2, "0");
          const day = String(d.getDate()).padStart(2, "0");
          const h = String(d.getHours()).padStart(2, "0");
          const min = String(d.getMinutes()).padStart(2, "0");
          setDate(`${y}-${m}-${day}`);
          setTime(`${h}:${min}`);
        }

        if (urlStyle && DISCORD_FORMAT_STYLES.some((f) => f.style === urlStyle)) {
          setSelectedStyle(urlStyle);
        }
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Compute calculated epoch seconds
  const epochSeconds = useMemo(() => {
    return calculateEpochSeconds(date, time, timezone);
  }, [date, time, timezone]);

  // Primary active syntax
  const activeSyntax = useMemo(() => {
    return buildDiscordSyntax(epochSeconds, selectedStyle);
  }, [epochSeconds, selectedStyle]);

  // Copy handler
  const handleCopy = async (syntaxToCopy: string, identifier: string = "primary") => {
    try {
      await navigator.clipboard.writeText(syntaxToCopy);
      setCopiedStyle(identifier);
      setTimeout(() => setCopiedStyle(null), 2200);
    } catch {
      // Fallback
    }
  };

  // Share URL handler
  const handleShare = async () => {
    if (typeof window === "undefined") return;
    const url = `${window.location.origin}${window.location.pathname}?t=${epochSeconds}&s=${selectedStyle}`;
    try {
      await navigator.clipboard.writeText(url);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  // Reset to now
  const handleReset = () => {
    startTransition(() => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setDate(`${year}-${month}-${day}`);
      setTime(`${hours}:${minutes}`);
      if (clientTzDetected) {
        setTimezone(clientTzDetected);
      }
      setSelectedStyle("R");
    });
  };

  // Quick preset offsets
  const applyPreset = (type: "now" | "+15m" | "+1h" | "+24h" | "tomorrow-night") => {
    const current = new Date();
    let target = new Date();

    switch (type) {
      case "now":
        target = current;
        break;
      case "+15m":
        target = new Date(current.getTime() + 15 * 60 * 1000);
        break;
      case "+1h":
        target = new Date(current.getTime() + 60 * 60 * 1000);
        break;
      case "+24h":
        target = new Date(current.getTime() + 24 * 60 * 60 * 1000);
        break;
      case "tomorrow-night":
        target = new Date(current.getTime() + 24 * 60 * 60 * 1000);
        target.setHours(20, 0, 0, 0);
        break;
    }

    const y = target.getFullYear();
    const m = String(target.getMonth() + 1).padStart(2, "0");
    const d = String(target.getDate()).padStart(2, "0");
    const h = String(target.getHours()).padStart(2, "0");
    const min = String(target.getMinutes()).padStart(2, "0");

    setDate(`${y}-${m}-${d}`);
    setTime(`${h}:${min}`);
  };

  return (
    <div className="w-full">
      {/* Interactive Generator Card */}
      <section
        aria-labelledby="tool-heading"
        className="rounded-2xl border border-slate-800 bg-[#0e121a] p-5 sm:p-7 md:p-8 shadow-2xl backdrop-blur-sm"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-800/80 gap-3">
          <div>
            <h2 id="tool-heading" className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <span>Timestamp Generator</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                Live Preview
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select date, time, and timezone to generate auto-adjusting Discord syntax.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700/80 bg-slate-800/60 hover:bg-slate-700/60 text-xs font-medium text-slate-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              title="Reset to current time"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Reset</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700/80 bg-slate-800/60 hover:bg-slate-700/60 text-xs font-medium text-slate-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              title="Copy shareable link with selected time"
            >
              {shareCopied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                  <span className="text-emerald-400">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Input Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Date Picker */}
          <div>
            <label htmlFor="timestamp-date" className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-indigo-400" aria-hidden="true" />
              <span>Target Date</span>
            </label>
            <input
              id="timestamp-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border border-slate-700/80 bg-slate-900/90 px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono transition-colors"
            />
          </div>

          {/* Time Picker */}
          <div>
            <label htmlFor="timestamp-time" className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-indigo-400" aria-hidden="true" />
              <span>Target Time</span>
            </label>
            <input
              id="timestamp-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-lg border border-slate-700/80 bg-slate-900/90 px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono transition-colors"
            />
          </div>

          {/* Timezone Dropdown */}
          <div>
            <label htmlFor="timestamp-tz" className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-indigo-400" aria-hidden="true" />
                <span>Source Timezone</span>
              </span>
              {clientTzDetected && (
                <button
                  type="button"
                  onClick={() => setTimezone(clientTzDetected)}
                  className="text-[11px] font-normal text-indigo-400 hover:underline capitalize"
                  title="Use my browser timezone"
                >
                  (Local: {clientTzDetected.split("/").pop()?.replace("_", " ")})
                </button>
              )}
            </label>
            <select
              id="timestamp-tz"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full rounded-lg border border-slate-700/80 bg-slate-900/90 px-3 py-2.5 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans transition-colors cursor-pointer"
            >
              {clientTzDetected && !COMMON_TIMEZONES.some((tz) => tz.value === clientTzDetected) && (
                <option value={clientTzDetected}>Detected: {clientTzDetected}</option>
              )}
              {COMMON_TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Presets Bar */}
        <div className="mt-4 pt-4 border-t border-slate-800/60 flex items-center gap-2 flex-wrap text-xs">
          <span className="text-slate-400 font-medium">Quick Presets:</span>
          <button
            type="button"
            onClick={() => applyPreset("now")}
            className="px-2.5 py-1 rounded-md bg-slate-800/70 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            Right Now
          </button>
          <button
            type="button"
            onClick={() => applyPreset("+15m")}
            className="px-2.5 py-1 rounded-md bg-slate-800/70 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            +15 Minutes
          </button>
          <button
            type="button"
            onClick={() => applyPreset("+1h")}
            className="px-2.5 py-1 rounded-md bg-slate-800/70 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            +1 Hour
          </button>
          <button
            type="button"
            onClick={() => applyPreset("+24h")}
            className="px-2.5 py-1 rounded-md bg-slate-800/70 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            +24 Hours
          </button>
          <button
            type="button"
            onClick={() => applyPreset("tomorrow-night")}
            className="px-2.5 py-1 rounded-md bg-slate-800/70 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            Tomorrow 8:00 PM
          </button>
        </div>

        {/* Primary Generated Output Box */}
        <div className="mt-6 rounded-xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/20 to-slate-900/60 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1.5">
                <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Discord Timestamp Syntax</span>
                <span className="text-slate-400 font-mono font-normal">
                  (Epoch: {epochSeconds}s)
                </span>
              </div>
              <div className="font-mono text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight break-all select-all">
                {activeSyntax}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleCopy(activeSyntax, "primary")}
              className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 active:scale-[0.98] ${
                copiedStyle === "primary"
                  ? "bg-emerald-600 text-white"
                  : "bg-[#5865F2] hover:bg-[#4752c4] text-white"
              }`}
            >
              {copiedStyle === "primary" ? (
                <>
                  <Check className="h-4 w-4" aria-hidden="true" />
                  <span>Copied Syntax!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" aria-hidden="true" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          {/* Style Selector Tabs */}
          <div className="mt-5 pt-4 border-t border-slate-800/80">
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-2.5">
              Select Display Style:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
              {DISCORD_FORMAT_STYLES.map((item) => {
                const isSelected = selectedStyle === item.style;
                return (
                  <button
                    key={item.style}
                    type="button"
                    onClick={() => setSelectedStyle(item.style)}
                    className={`flex flex-col items-center justify-center p-2 rounded-lg border text-center transition-all text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                      isSelected
                        ? "border-[#5865f2] bg-[#5865f2]/15 text-white font-semibold shadow-sm"
                        : "border-slate-800 bg-slate-900/60 hover:bg-slate-800/60 text-slate-300"
                    }`}
                  >
                    <span className="font-mono font-bold text-sm text-indigo-400">
                      {item.flag || ":f"}
                    </span>
                    <span className="text-[11px] truncate w-full mt-0.5">{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live Discord Message Preview */}
        <div className="mt-6">
          <DiscordMessagePreview
            epochSeconds={epochSeconds}
            style={selectedStyle}
            syntax={activeSyntax}
            userTimezone={timezone}
          />
        </div>
      </section>

      {/* Comprehensive Format Matrix Table */}
      <section aria-labelledby="all-formats-heading" className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/40 p-5 sm:p-7">
        <div className="mb-4">
          <h3 id="all-formats-heading" className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span>All Discord Timestamp Styles</span>
            <span className="text-xs font-normal text-slate-400 font-mono">
              (Quick 1-Click Copy)
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Every Discord timestamp flag with its rendered appearance in your selected timezone.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[11px]">
                <th className="py-3 px-3">Flag</th>
                <th className="py-3 px-3">Style Name</th>
                <th className="py-3 px-3">Discord Syntax</th>
                <th className="py-3 px-3">Simulated Output</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {DISCORD_FORMAT_STYLES.map((f) => {
                const syntax = buildDiscordSyntax(epochSeconds, f.style);
                const rendered = renderDiscordFormatPreview(epochSeconds, f.style, "en-US", timezone);
                const isCopied = copiedStyle === f.style;

                return (
                  <tr key={f.style} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-indigo-400">
                      {f.flag || "(none)"}
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-200">
                      <div>{f.name}</div>
                      <div className="text-[11px] text-slate-400 font-normal">{f.useCase}</div>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-300">
                      <code>{syntax}</code>
                    </td>
                    <td className="py-3 px-3 text-slate-100">
                      <span className="inline-block px-2 py-0.5 rounded bg-slate-800/90 text-slate-200 border border-slate-700/60 text-xs">
                        {rendered}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleCopy(syntax, f.style)}
                        aria-label={`Copy ${f.name} syntax`}
                        className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                          isCopied
                            ? "bg-emerald-600/90 text-white"
                            : "bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
