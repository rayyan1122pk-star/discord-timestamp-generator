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
  ArrowRightLeft,
  Hash,
  ArrowRight,
  Info,
  Sparkles,
  Zap,
} from "lucide-react";
import { playCopySound, playPresetSound } from "@/lib/sound-effects";
import {
  DiscordFormatStyle,
  DISCORD_FORMAT_STYLES,
  COMMON_TIMEZONES,
  buildDiscordSyntax,
  calculateEpochSeconds,
  renderDiscordFormatPreview,
} from "@/lib/time-utils";
import { parseNaturalLanguageTime } from "@/lib/natural-time-parser";
import { decodeDiscordSnowflake, SnowflakeDecodeResult } from "@/lib/snowflake";
import { DiscordMessagePreview } from "./DiscordMessagePreview";

type GeneratorTab = "generator" | "reverse" | "snowflake";

export function TimestampGenerator() {
  const [, startTransition] = useTransition();

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

  // Main Generator State
  const [activeTab, setActiveTab] = useState<GeneratorTab>("generator");
  const [date, setDate] = useState<string>(initial.date);
  const [time, setTime] = useState<string>(initial.time);
  const [timezone, setTimezone] = useState<string>("UTC");
  const [selectedStyle, setSelectedStyle] = useState<DiscordFormatStyle>("R");
  const [copiedStyle, setCopiedStyle] = useState<string | null>(null);
  const [shareCopied, setShareCopied] = useState<boolean>(false);
  const [clientTzDetected, setClientTzDetected] = useState<string | null>(null);

  // Natural Language Input State
  const [naturalText, setNaturalText] = useState<string>("");
  const [naturalFeedback, setNaturalFeedback] = useState<string | null>(null);

  // Reverse Timestamp State
  const [reverseInput, setReverseInput] = useState<string>("");
  const [reverseEpoch, setReverseEpoch] = useState<number | null>(null);
  const [reverseStyle, setReverseStyle] = useState<string>("R");
  const [reverseError, setReverseError] = useState<string | null>(null);

  // Snowflake State
  const [snowflakeInput, setSnowflakeInput] = useState<string>("");
  const [snowflakeData, setSnowflakeData] = useState<SnowflakeDecodeResult | null>(null);

  // Auto-detect browser timezone on mount & check URL params
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (userTz) {
          setTimezone(userTz);
          setClientTzDetected(userTz);
        }
      } catch {
        // Fallback to UTC
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
      playCopySound();
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
      playCopySound();
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  // Quick relative time offset (+15m, +1h, etc.)
  const handleQuickOffset = (offsetMinutes: number) => {
    startTransition(() => {
      const target = new Date(Date.now() + offsetMinutes * 60 * 1000);
      const year = target.getFullYear();
      const month = String(target.getMonth() + 1).padStart(2, "0");
      const day = String(target.getDate()).padStart(2, "0");
      const hours = String(target.getHours()).padStart(2, "0");
      const minutes = String(target.getMinutes()).padStart(2, "0");
      setDate(`${year}-${month}-${day}`);
      setTime(`${hours}:${minutes}`);
      setNaturalFeedback(`Offset: +${offsetMinutes >= 60 ? Math.round(offsetMinutes / 60) + "h" : offsetMinutes + "m"}`);
      playPresetSound();
    });
  };

  // Preset calendar targets (tonight, tomorrow, weekend)
  const handlePresetTarget = (targetType: "tonight" | "tomorrow" | "friday" | "next_week") => {
    startTransition(() => {
      const now = new Date();
      const target = new Date();
      if (targetType === "tonight") {
        target.setHours(20, 0, 0, 0);
        if (target.getTime() <= now.getTime()) {
          target.setDate(target.getDate() + 1);
        }
      } else if (targetType === "tomorrow") {
        target.setDate(target.getDate() + 1);
        target.setHours(9, 0, 0, 0);
      } else if (targetType === "friday") {
        const day = target.getDay();
        const diff = (5 - day + 7) % 7 || 7;
        target.setDate(target.getDate() + diff);
        target.setHours(18, 0, 0, 0);
      } else if (targetType === "next_week") {
        target.setDate(target.getDate() + 7);
      }

      const year = target.getFullYear();
      const month = String(target.getMonth() + 1).padStart(2, "0");
      const day = String(target.getDate()).padStart(2, "0");
      const hours = String(target.getHours()).padStart(2, "0");
      const minutes = String(target.getMinutes()).padStart(2, "0");
      setDate(`${year}-${month}-${day}`);
      setTime(`${hours}:${minutes}`);
      playPresetSound();
    });
  };

  // Reset to current time
  const handleReset = () => {
    startTransition(() => {
      playPresetSound();
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setDate(`${year}-${month}-${day}`);
      setTime(`${hours}:${minutes}`);
      setNaturalText("");
      setNaturalFeedback(null);
      if (clientTzDetected) {
        setTimezone(clientTzDetected);
      }
      setSelectedStyle("R");
    });
  };

  // Natural language handler
  const handleNaturalSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!naturalText.trim()) return;

    const parsed = parseNaturalLanguageTime(naturalText);
    if (parsed) {
      setDate(parsed.date);
      setTime(parsed.time);
      setNaturalFeedback(parsed.description);
    } else {
      setNaturalFeedback("Could not parse time. Try: 'in 2 hours' or 'tomorrow at 5pm'");
    }
  };

  const handleNaturalPresetClick = (phrase: string) => {
    setNaturalText(phrase);
    const parsed = parseNaturalLanguageTime(phrase);
    if (parsed) {
      setDate(parsed.date);
      setTime(parsed.time);
      setNaturalFeedback(parsed.description);
    }
  };

  // Reverse decoder handler
  const handleReverseDecode = (val: string) => {
    setReverseInput(val);
    const cleaned = val.trim();
    if (!cleaned) {
      setReverseEpoch(null);
      setReverseError(null);
      return;
    }

    // Check if user pasted Discord tag: <t:1790409000:R> or <t:1790409000>
    const tagMatch = cleaned.match(/<t:(-?\d{1,12})(?::([tTdDfFR]))?>/);
    if (tagMatch) {
      const epoch = parseInt(tagMatch[1], 10);
      const style = tagMatch[2] || "f";
      setReverseEpoch(epoch);
      setReverseStyle(style);
      setReverseError(null);
      return;
    }

    // Check if user pasted raw number
    if (/^-?\d{1,12}$/.test(cleaned)) {
      const epoch = parseInt(cleaned, 10);
      setReverseEpoch(epoch);
      setReverseStyle("f");
      setReverseError(null);
      return;
    }

    // If 13 digits (milliseconds)
    if (/^\d{13}$/.test(cleaned)) {
      const epoch = Math.floor(parseInt(cleaned, 10) / 1000);
      setReverseEpoch(epoch);
      setReverseStyle("f");
      setReverseError("Detected 13 digit millisecond timestamp. Auto converted to seconds.");
      return;
    }

    setReverseEpoch(null);
    setReverseError("Invalid format. Please paste a Discord tag like <t:1727280000:R> or a 10 digit Unix epoch.");
  };

  // Load reverse decoded timestamp into main generator
  const handleLoadReverseToGenerator = () => {
    if (reverseEpoch === null) return;
    const d = new Date(reverseEpoch * 1000);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const h = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");
    setDate(`${y}-${m}-${day}`);
    setTime(`${h}:${min}`);
    if (DISCORD_FORMAT_STYLES.some((f) => f.style === reverseStyle)) {
      setSelectedStyle(reverseStyle as DiscordFormatStyle);
    }
    setActiveTab("generator");
  };

  // Snowflake decoder handler
  const handleSnowflakeChange = (val: string) => {
    setSnowflakeInput(val);
    if (!val.trim()) {
      setSnowflakeData(null);
      return;
    }
    const result = decodeDiscordSnowflake(val);
    setSnowflakeData(result);
  };

  return (
    <div className="w-full">
      {/* Tool Navigation Tabs */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1 border-b border-slate-800/80">
        <button
          type="button"
          onClick={() => setActiveTab("generator")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === "generator"
              ? "bg-[#5865F2] text-white shadow-sm"
              : "bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200"
          }`}
        >
          <Clock className="h-4 w-4" aria-hidden="true" />
          <span>Timestamp Generator</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("reverse")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === "reverse"
              ? "bg-[#5865F2] text-white shadow-sm"
              : "bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200"
          }`}
        >
          <ArrowRightLeft className="h-4 w-4" aria-hidden="true" />
          <span>Convert Timestamp to Date</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("snowflake")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === "snowflake"
              ? "bg-[#5865F2] text-white shadow-sm"
              : "bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200"
          }`}
        >
          <Hash className="h-4 w-4" aria-hidden="true" />
          <span>Snowflake ID Decoder</span>
        </button>
      </div>

      {/* TAB 1: TIMESTAMP GENERATOR (WITH NATURAL LANGUAGE INPUT) */}
      {activeTab === "generator" && (
        <section
          aria-labelledby="tool-heading"
          className="rounded-2xl border border-slate-800 bg-[#0e121a] p-5 sm:p-7 md:p-8 shadow-2xl backdrop-blur-sm"
        >
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-800/80 gap-3">
            <div>
              <h2 id="tool-heading" className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Timestamp Generator
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Select date and time or use natural phrases to generate auto-adjusting Discord syntax.
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

          {/* Quick Shorthand Input Bar */}
          <div className="mb-6 p-4 rounded-xl border border-indigo-950/60 bg-indigo-950/20">
            <form onSubmit={handleNaturalSubmit} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="h-4 w-4 text-indigo-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  value={naturalText}
                  onChange={(e) => setNaturalText(e.target.value)}
                  placeholder="Quick shorthand: 'tomorrow at 5pm', 'in 2 hours', 'tmr 6 pm', 'friday 8:30pm'..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-700/80 bg-slate-900/90 text-sm text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap"
              >
                Apply
              </button>
            </form>

            {/* Quick Natural Language Preset Chips */}
            <div className="mt-3 flex items-center gap-1.5 flex-wrap text-xs">
              <span className="text-slate-400 text-[11px] font-medium mr-1">Quick phrases:</span>
              {[
                "in 15 minutes",
                "in 1 hour",
                "in 2 hours",
                "tomorrow at 8pm",
                "next friday at 6pm",
              ].map((phrase) => (
                <button
                  key={phrase}
                  type="button"
                  onClick={() => handleNaturalPresetClick(phrase)}
                  className="px-2 py-0.5 rounded-md bg-slate-800/80 hover:bg-indigo-950 hover:text-indigo-300 border border-slate-700/60 text-slate-300 text-[11px] transition-colors"
                >
                  {phrase}
                </button>
              ))}
            </div>

            {naturalFeedback && (
              <div className="mt-2 text-xs font-medium text-emerald-400 flex items-center gap-1">
                <Check className="h-3 w-3" />
                <span>Parsed: {naturalFeedback}</span>
              </div>
            )}
          </div>

          {/* 1-Click Instant Time Presets Bar */}
          <div className="mb-6 pb-5 border-b border-slate-800/80">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-amber-400" />
                <span>Instant Presets (1-Click)</span>
              </span>
              <span className="text-[11px] text-slate-400">Zero typing required</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-1.5">
              <button
                type="button"
                onClick={handleReset}
                className="px-2 py-1.5 rounded-lg border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-all text-center active:scale-[0.97]"
              >
                ⚡ Right Now
              </button>
              <button
                type="button"
                onClick={() => handleQuickOffset(15)}
                className="px-2 py-1.5 rounded-lg border border-indigo-950/80 bg-indigo-950/30 hover:bg-indigo-900/40 text-indigo-300 hover:text-white text-xs font-medium transition-all text-center active:scale-[0.97]"
              >
                +15 Mins
              </button>
              <button
                type="button"
                onClick={() => handleQuickOffset(60)}
                className="px-2 py-1.5 rounded-lg border border-indigo-950/80 bg-indigo-950/30 hover:bg-indigo-900/40 text-indigo-300 hover:text-white text-xs font-medium transition-all text-center active:scale-[0.97]"
              >
                +1 Hour
              </button>
              <button
                type="button"
                onClick={() => handleQuickOffset(180)}
                className="px-2 py-1.5 rounded-lg border border-indigo-950/80 bg-indigo-950/30 hover:bg-indigo-900/40 text-indigo-300 hover:text-white text-xs font-medium transition-all text-center active:scale-[0.97]"
              >
                +3 Hours
              </button>
              <button
                type="button"
                onClick={() => handlePresetTarget("tonight")}
                className="px-2 py-1.5 rounded-lg border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-all text-center active:scale-[0.97]"
              >
                Tonight 8 PM
              </button>
              <button
                type="button"
                onClick={() => handlePresetTarget("tomorrow")}
                className="px-2 py-1.5 rounded-lg border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-all text-center active:scale-[0.97]"
              >
                Tomorrow 9 AM
              </button>
              <button
                type="button"
                onClick={() => handlePresetTarget("friday")}
                className="px-2 py-1.5 rounded-lg border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-all text-center active:scale-[0.97]"
              >
                Friday 6 PM
              </button>
              <button
                type="button"
                onClick={() => handlePresetTarget("next_week")}
                className="px-2 py-1.5 rounded-lg border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-all text-center active:scale-[0.97]"
              >
                Next Week
              </button>
            </div>
          </div>

          {/* Standard Input Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Date Picker */}
            <div>
              <label
                htmlFor="timestamp-date"
                className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5"
              >
                <Calendar className="h-3.5 w-3.5 text-white" aria-hidden="true" />
                <span>Target Date</span>
              </label>
              <input
                id="timestamp-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-lg border border-slate-700/80 bg-slate-900/90 px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono transition-colors [color-scheme:dark]"
              />
            </div>

            {/* Time Picker */}
            <div>
              <label
                htmlFor="timestamp-time"
                className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5"
              >
                <Clock className="h-3.5 w-3.5 text-white" aria-hidden="true" />
                <span>Target Time</span>
              </label>
              <input
                id="timestamp-time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-lg border border-slate-700/80 bg-slate-900/90 px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono transition-colors [color-scheme:dark]"
              />
            </div>

            {/* Timezone Dropdown */}
            <div>
              <label
                htmlFor="timestamp-tz"
                className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-2 flex items-center justify-between"
              >
                <span className="flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-white" aria-hidden="true" />
                  <span>Source Timezone</span>
                </span>
                {clientTzDetected && (
                  <button
                    type="button"
                    onClick={() => setTimezone(clientTzDetected)}
                    className="text-[11px] font-normal text-indigo-400 hover:underline capitalize"
                    title="Use my browser timezone"
                  >
                    (Local: {clientTzDetected.replace(/_/g, " ").split("/").pop()})
                  </button>
                )}
              </label>
              <select
                id="timestamp-tz"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full rounded-lg border border-slate-700/80 bg-slate-900/90 px-3 py-2.5 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans transition-colors cursor-pointer"
              >
                {COMMON_TIMEZONES.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Output Display Card */}
          <div className="mt-6 rounded-xl border border-slate-800 bg-[#0a0d13] p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-1.5 font-mono">
                  <span>Discord Timestamp Syntax</span>
                  <span>•</span>
                  <span>Epoch: {epochSeconds}s</span>
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
                    <span>Copied Code!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" aria-hidden="true" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            {/* Format Style Selector Grid */}
            <div className="mt-5 pt-4 border-t border-slate-800/80">
              <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-2.5">
                Select Display Style:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
                {DISCORD_FORMAT_STYLES.map((f) => {
                  const isSelected = selectedStyle === f.style;
                  return (
                    <button
                      key={f.style}
                      type="button"
                      onClick={() => setSelectedStyle(f.style)}
                      className={`flex flex-col items-center justify-center p-2 rounded-lg border text-center transition-all text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                        isSelected
                          ? "border-[#5865f2] bg-[#5865f2]/15 text-white font-semibold shadow-sm"
                          : "border-slate-800 bg-slate-900/60 hover:bg-slate-800/60 text-slate-300"
                      }`}
                    >
                      <span className="font-mono font-bold text-sm text-indigo-400">
                        {f.flag ? f.flag : ":f"}
                      </span>
                      <span className="text-[11px] truncate w-full mt-0.5">{f.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Live Discord Message Preview Simulator */}
          <div className="mt-6">
            <DiscordMessagePreview
              epochSeconds={epochSeconds}
              style={selectedStyle}
              syntax={activeSyntax}
              userTimezone={timezone}
            />
          </div>
        </section>
      )}

      {/* TAB 2: REVERSE TIMESTAMP DECODER (CONVERT EXISTING TIMESTAMP TO DATE) */}
      {activeTab === "reverse" && (
        <section className="rounded-2xl border border-slate-800 bg-[#0e121a] p-5 sm:p-7 md:p-8 shadow-2xl backdrop-blur-sm">
          <div className="pb-6 mb-6 border-b border-slate-800/80">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <ArrowRightLeft className="h-6 w-6 text-indigo-400" />
              <span>Convert Discord Timestamp to Date</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Paste any Discord timestamp tag or raw Unix epoch to reverse calculate the exact local date, UTC time, and relative status.
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-2">
              Paste Discord Timestamp or Unix Epoch
            </label>
            <input
              type="text"
              value={reverseInput}
              onChange={(e) => handleReverseDecode(e.target.value)}
              placeholder="e.g. <t:1790409000:R> or 1790409000"
              className="w-full rounded-lg border border-slate-700/80 bg-slate-900/90 px-4 py-3 text-base text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono transition-colors"
            />
            {reverseError && (
              <p className="mt-2 text-xs text-rose-400 flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5" />
                <span>{reverseError}</span>
              </p>
            )}
          </div>

          {reverseEpoch !== null && (
            <div className="mt-6 rounded-xl border border-slate-800 bg-[#0a0d13] p-5">
              <h3 className="text-sm font-semibold text-white mb-3">Decoded Timestamp Details</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Local Browser Time:</span>
                  <span className="font-semibold text-white text-sm">
                    {new Date(reverseEpoch * 1000).toLocaleString(undefined, {
                      dateStyle: "full",
                      timeStyle: "medium",
                    })}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Coordinated Universal Time (UTC):</span>
                  <span className="font-semibold text-indigo-300 text-sm font-mono">
                    {new Date(reverseEpoch * 1000).toUTCString()}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Detected Style Flag:</span>
                  <span className="font-semibold text-white text-sm font-mono">
                    :{reverseStyle} ({DISCORD_FORMAT_STYLES.find((f) => f.style === reverseStyle)?.name || "Default"})
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-xs text-slate-400">
                  <span>Relative countdown representation: </span>
                  <span className="text-emerald-400 font-medium">
                    {renderDiscordFormatPreview(reverseEpoch, "R")}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleLoadReverseToGenerator}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-semibold transition-colors"
                >
                  <span>Edit in Main Generator</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* TAB 3: DISCORD SNOWFLAKE ID DECODER */}
      {activeTab === "snowflake" && (
        <section className="rounded-2xl border border-slate-800 bg-[#0e121a] p-5 sm:p-7 md:p-8 shadow-2xl backdrop-blur-sm">
          <div className="pb-6 mb-6 border-b border-slate-800/80">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Hash className="h-6 w-6 text-indigo-400" />
              <span>Discord Snowflake ID to Date Decoder</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Every Discord account, server, role, channel, and message ID contains its exact creation timestamp embedded in a 64-bit integer.
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-2">
              Discord Snowflake ID
            </label>
            <input
              type="text"
              value={snowflakeInput}
              onChange={(e) => handleSnowflakeChange(e.target.value)}
              placeholder="e.g. 803511102246789140"
              className="w-full rounded-lg border border-slate-700/80 bg-slate-900/90 px-4 py-3 text-base text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono transition-colors"
            />
            {snowflakeData && !snowflakeData.valid && (
              <p className="mt-2 text-xs text-rose-400 flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5" />
                <span>{snowflakeData.errorMessage}</span>
              </p>
            )}
          </div>

          {snowflakeData && snowflakeData.valid && (
            <div className="mt-6 rounded-xl border border-slate-800 bg-[#0a0d13] p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Creation Date (Local):</span>
                  <span className="font-semibold text-white text-sm">
                    {new Date(snowflakeData.timestampMs).toLocaleString(undefined, {
                      dateStyle: "full",
                      timeStyle: "medium",
                    })}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Creation Date (UTC):</span>
                  <span className="font-semibold text-indigo-300 text-sm font-mono">
                    {snowflakeData.dateUtc}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Account / Entity Age:</span>
                  <span className="font-semibold text-emerald-400 text-sm">
                    {renderDiscordFormatPreview(snowflakeData.timestampSeconds, "R")}
                  </span>
                </div>
              </div>

              {/* Timestamp Syntax Ready to Copy */}
              <div className="mt-4 pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="font-mono text-xs text-slate-300">
                  <span className="text-slate-400">Discord Syntax: </span>
                  <code className="text-indigo-400 font-semibold">{snowflakeData.discordTagRelative}</code>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(snowflakeData.discordTagRelative, "snowflake")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-semibold transition-colors"
                >
                  {copiedStyle === "snowflake" ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Timestamp</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ALL FORMATS MATRIX TABLE (ALWAYS VISIBLE FOR QUICK REFERENCE) */}
      <section
        aria-labelledby="all-formats-heading"
        className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/40 p-5 sm:p-7"
      >
        <div className="mb-4">
          <h3 id="all-formats-heading" className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span>All Discord Timestamp Styles</span>
            <span className="text-xs font-normal text-slate-400 font-mono">(Quick 1-Click Copy)</span>
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
                const rendered = renderDiscordFormatPreview(epochSeconds, f.style);
                const isCopied = copiedStyle === f.style;

                return (
                  <tr key={f.style} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-indigo-400">
                      {f.flag ? f.flag : "(none)"}
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-200">
                      <div>{f.name}</div>
                      <div className="text-[11px] text-slate-400 font-normal">{f.description}</div>
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
