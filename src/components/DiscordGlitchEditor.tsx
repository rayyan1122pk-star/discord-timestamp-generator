"use client";

import React, { useState, useId } from "react";
import { Copy, Check, RotateCcw, RefreshCw, Skull, Zap, AlertTriangle } from "lucide-react";
import { generateZalgo, ZalgoOptions } from "@/lib/zalgo";
import { playCopySound, playPresetSound } from "@/lib/sound-effects";

interface GlitchPreset {
  name: string;
  text: string;
  intensity: number;
  up: boolean;
  mid: boolean;
  down: boolean;
}

const PRESETS: GlitchPreset[] = [
  {
    name: "Subtle Glitch",
    text: "Discord Member",
    intensity: 2,
    up: true,
    mid: false,
    down: true,
  },
  {
    name: "Hacker Anomaly",
    text: "ACCESS GRANTED",
    intensity: 6,
    up: true,
    mid: true,
    down: true,
  },
  {
    name: "Cursed Void",
    text: "HE COMES FOR YOU",
    intensity: 14,
    up: true,
    mid: true,
    down: true,
  },
  {
    name: "Horizontal Slashes",
    text: "CORRUPTED SYSTEM",
    intensity: 4,
    up: false,
    mid: true,
    down: false,
  },
];

export function DiscordGlitchEditor() {
  const [inputText, setInputText] = useState<string>("SYSTEM OVERRIDE");
  const [intensity, setIntensity] = useState<number>(6);
  const [glitchUp, setGlitchUp] = useState<boolean>(true);
  const [glitchMid, setGlitchMid] = useState<boolean>(true);
  const [glitchDown, setGlitchDown] = useState<boolean>(true);
  const [seed, setSeed] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const intensityInputId = useId();

  // Re-generate output on seed change or option change
  const outputText = React.useMemo(() => {
    void seed;
    const options: ZalgoOptions = {
      up: glitchUp,
      mid: glitchMid,
      down: glitchDown,
      intensity,
    };
    return generateZalgo(inputText, options);
  }, [inputText, glitchUp, glitchMid, glitchDown, intensity, seed]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      playCopySound();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleReroll = () => {
    playPresetSound();
    setSeed((prev) => prev + 1);
  };

  const applyPreset = (preset: GlitchPreset) => {
    playPresetSound();
    setInputText(preset.text);
    setIntensity(preset.intensity);
    setGlitchUp(preset.up);
    setGlitchMid(preset.mid);
    setGlitchDown(preset.down);
    setSeed((prev) => prev + 1);
  };

  const handleReset = () => {
    setInputText("");
    setIntensity(6);
    setGlitchUp(true);
    setGlitchMid(true);
    setGlitchDown(true);
    setSeed((prev) => prev + 1);
  };

  const charCount = outputText.length;
  const isNicknameSafe = charCount <= 32;
  const isChannelSafe = charCount <= 100;

  return (
    <div className="space-y-8">
      {/* Top Presets Bar */}
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
          title="Clear text"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Clear</span>
        </button>
      </div>

      {/* Main Grid: Controls on Left, Live Discord Chat Simulation on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Editor & Controls */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-[#0e121a] p-5 sm:p-6 shadow-xl space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="glitch-input" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-indigo-400" />
                  <span>Input Text</span>
                </label>
                <span className="text-[11px] text-slate-500 font-mono">
                  {inputText.length} base characters
                </span>
              </div>
              <textarea
                id="glitch-input"
                rows={3}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your nickname, channel name, or text here..."
                maxLength={500}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#5865F2] font-mono leading-relaxed"
              />
            </div>

            {/* Slider: Glitch Intensity */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor={intensityInputId} className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Skull className="h-3.5 w-3.5 text-indigo-400" />
                  <span>Corruption Intensity</span>
                </label>
                <span className="text-xs font-bold text-indigo-400 font-mono">
                  Level {intensity} {intensity <= 3 ? "(Subtle)" : intensity <= 8 ? "(Medium)" : intensity <= 14 ? "(Heavy)" : "(Chaos)"}
                </span>
              </div>
              <input
                id={intensityInputId}
                type="range"
                min={1}
                max={20}
                step={1}
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#5865F2]"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>1 (Light)</span>
                <span>5 (Standard)</span>
                <span>10 (Heavy)</span>
                <span>20 (Maximum Chaos)</span>
              </div>
            </div>

            {/* Direction Toggles */}
            <div>
              <span className="text-xs font-semibold text-slate-300 block mb-2">
                Glitch Direction
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setGlitchUp(!glitchUp)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors flex items-center justify-center gap-1.5 ${
                    glitchUp
                      ? "bg-indigo-950/60 border-indigo-500/80 text-indigo-200"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-300"
                  }`}
                >
                  <span>Top (Upwards)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setGlitchMid(!glitchMid)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors flex items-center justify-center gap-1.5 ${
                    glitchMid
                      ? "bg-indigo-950/60 border-indigo-500/80 text-indigo-200"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-300"
                  }`}
                >
                  <span>Center (Overlay)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setGlitchDown(!glitchDown)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors flex items-center justify-center gap-1.5 ${
                    glitchDown
                      ? "bg-indigo-950/60 border-indigo-500/80 text-indigo-200"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-300"
                  }`}
                >
                  <span>Bottom (Dripping)</span>
                </button>
              </div>
            </div>

            {/* Re-roll & Copy Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={handleReroll}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700"
              >
                <RefreshCw className="h-3.5 w-3.5 text-indigo-400" />
                <span>Re-roll Random Glitch</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                disabled={!outputText}
                className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-lg text-xs font-semibold text-white transition-all shadow-sm ${
                  copied
                    ? "bg-emerald-600 hover:bg-emerald-500"
                    : "bg-[#5865F2] hover:bg-[#4752c4] disabled:opacity-50"
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
                    <span>Copy Glitch Text</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Discord Limits Safety Card */}
          <div className="rounded-xl border border-slate-800 bg-[#0e121a]/80 p-4 space-y-2 text-xs">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
              <span>Discord Character Boundary Checker</span>
            </span>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Discord Nickname Limit:</span>
                <span className={`font-mono font-bold ${isNicknameSafe ? "text-emerald-400" : "text-amber-400"}`}>
                  {charCount} / 32 chars {isNicknameSafe ? "(Safe)" : "(Exceeds 32-char limit)"}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Channel Name Limit:</span>
                <span className={`font-mono font-bold ${isChannelSafe ? "text-emerald-400" : "text-amber-400"}`}>
                  {charCount} / 100 chars {isChannelSafe ? "(Safe)" : "(Exceeds 100-char limit)"}
                </span>
              </div>
            </div>
            {!isNicknameSafe && (
              <p className="text-[11px] text-amber-400/90 leading-relaxed">
                Tip: Discord calculates nicknames by total Unicode codepoints. Reduce intensity to level 1 or 2 if setting this as a server nickname.
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Live Discord Chat Simulation */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Discord Chat Simulation</span>
            </span>
            <span className="text-[11px] text-slate-500">Dark Mode</span>
          </div>

          {/* Discord Dark Frame */}
          <div className="rounded-2xl border border-[#202225] bg-[#313338] p-5 shadow-2xl text-slate-200 font-sans space-y-5">
            {/* Example 1: In a Discord Chat Message */}
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Preview: Channel Message
              </span>
              <div className="flex items-start gap-3.5">
                <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-0.5">
                  Z
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-semibold text-white text-[15px] leading-tight">
                      GlitchUser
                    </span>
                    <span className="text-[11px] text-[#949ba4]">Today at 1:20 PM</span>
                  </div>
                  <div className="text-[15px] text-[#dbdee1] leading-relaxed break-words py-1 select-all overflow-hidden font-normal">
                    {outputText || <span className="text-slate-500 italic">Glitch text will preview here...</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Example 2: In a Discord Nickname / Member List */}
            <div className="pt-4 border-t border-slate-700/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Preview: Member List Nickname
              </span>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-[#2b2d31]">
                <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                  N
                </div>
                <div className="truncate min-w-0">
                  <div className="text-xs font-semibold text-white truncate">
                    {outputText || "GlitchedNick"}
                  </div>
                  <div className="text-[10px] text-slate-400">Playing with Discord Fonts</div>
                </div>
              </div>
            </div>

            {/* Example 3: In a Channel Name */}
            <div className="pt-4 border-t border-slate-700/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Preview: Server Channel Name
              </span>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2b2d31] text-xs text-slate-300 font-medium">
                <span className="text-slate-400 text-sm font-bold">#</span>
                <span className="truncate">{outputText ? outputText.toLowerCase().replace(/\s+/g, "-") : "glitch-channel"}</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 text-center">
            Renders using standard Unicode combining marks compatible with Discord desktop, web, iOS, and Android.
          </p>
        </div>
      </div>
    </div>
  );
}
