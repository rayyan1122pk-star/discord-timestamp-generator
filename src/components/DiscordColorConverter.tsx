"use client";

import React, { useState, useMemo } from "react";
import {
  Copy,
  Check,
  RotateCcw,
  Palette,
  Sparkles,
  Sliders,
  Code2,
  Terminal,
  ExternalLink,
  Info,
} from "lucide-react";
import { playCopySound, playPresetSound } from "@/lib/sound-effects";
import {
  convertColor,
  OFFICIAL_DISCORD_COLORS,
  PresetDiscordColor,
} from "@/lib/color-converter";

export function DiscordColorConverter() {
  const [hexInput, setHexInput] = useState<string>("#5865F2");
  const [decimalInput, setDecimalInput] = useState<string>("5793266");
  const [rgbR, setRgbR] = useState<number>(88);
  const [rgbG, setRgbG] = useState<number>(101);
  const [rgbB, setRgbB] = useState<number>(242);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Active color calculation
  const currentColor = useMemo(() => {
    return convertColor(hexInput);
  }, [hexInput]);

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

  const updateFromHex = (newHex: string) => {
    setHexInput(newHex);
    const converted = convertColor(newHex);
    if (converted.isValid) {
      setDecimalInput(converted.decimal.toString());
      setRgbR(converted.rgb.r);
      setRgbG(converted.rgb.g);
      setRgbB(converted.rgb.b);
    }
  };

  const updateFromDecimal = (newDecStr: string) => {
    setDecimalInput(newDecStr);
    const dec = parseInt(newDecStr, 10);
    if (!isNaN(dec) && dec >= 0 && dec <= 16777215) {
      const converted = convertColor(dec);
      setHexInput(converted.hex);
      setRgbR(converted.rgb.r);
      setRgbG(converted.rgb.g);
      setRgbB(converted.rgb.b);
    }
  };

  const updateFromRgb = (r: number, g: number, b: number) => {
    setRgbR(r);
    setRgbG(g);
    setRgbB(b);
    const clamp = (val: number) => Math.max(0, Math.min(255, val));
    const toHex = (val: number) => clamp(val).toString(16).padStart(2, "0").toUpperCase();
    const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    setHexInput(hex);
    const converted = convertColor(hex);
    setDecimalInput(converted.decimal.toString());
  };

  const handlePresetClick = (preset: PresetDiscordColor) => {
    playPresetSound();
    updateFromHex(preset.hex);
  };

  const handleReset = () => {
    playPresetSound();
    updateFromHex("#5865F2");
  };

  return (
    <div className="space-y-8">
      {/* Interactive Converter Workspace */}
      <div className="rounded-2xl border border-slate-800 bg-[#0e121a] p-5 sm:p-7 md:p-8 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-800/80 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <Palette className="h-6 w-6 text-indigo-400" />
              <span>Discord Color & Decimal Converter</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Convert between HEX, Decimal integer (Discord API Embed color), and RGB with real-time preview.
            </p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700/80 bg-slate-800/60 hover:bg-slate-700/60 text-xs font-medium text-slate-300 hover:text-white transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        </div>

        {/* Top Split: Live Preview Tile & Primary Inputs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Live Color Card (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div
              className="w-full h-44 rounded-2xl border border-white/10 shadow-xl flex flex-col justify-between p-5 relative overflow-hidden transition-all duration-200"
              style={{ backgroundColor: currentColor.hex }}
            >
              <div className="flex items-center justify-between z-10">
                <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-[11px] font-mono font-bold text-white border border-white/15">
                  {currentColor.hex}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-[11px] font-mono font-bold text-white border border-white/15">
                  DEC: {currentColor.decimal}
                </span>
              </div>

              <div className="z-10 bg-black/50 backdrop-blur-md p-3 rounded-xl border border-white/15">
                <div className="text-xs text-white/80 font-medium leading-none mb-1">
                  Discord Embed Color Preview
                </div>
                <div className="text-[11px] font-mono text-white/90">
                  {currentColor.discordJs}
                </div>
              </div>

              {/* Decorative Subtle Corner Accent */}
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
            </div>

            {/* Simulated Discord Embed Border Bar */}
            <div className="p-4 rounded-xl border border-slate-800 bg-[#1e1f22] text-xs">
              <div className="text-[11px] uppercase font-mono text-slate-400 mb-2 flex items-center justify-between">
                <span>Discord Chat Embed Simulation</span>
                <span className="text-emerald-400">Live Render</span>
              </div>
              <div
                className="pl-3.5 py-2.5 pr-3 rounded-r-lg bg-[#2b2d31] border-l-4 transition-all"
                style={{ borderLeftColor: currentColor.hex }}
              >
                <div className="font-bold text-white text-sm mb-1">Sample Announcement Title</div>
                <div className="text-slate-300 text-xs leading-relaxed">
                  This embed border illustrates the exact color rendering on official Discord desktop and mobile clients.
                </div>
                <div className="mt-2 text-[10px] font-mono text-slate-400">
                  Color Value: {currentColor.decimal} (0x{currentColor.hex.replace("#", "")})
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Conversion Fields (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Hex Input with Native Color Picker */}
            <div className="p-4 rounded-xl border border-slate-800 bg-[#0a0d13]">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                HEX Color (#RRGGBB)
              </label>
              <div className="flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <input
                    type="color"
                    value={currentColor.hex}
                    onChange={(e) => updateFromHex(e.target.value)}
                    className="h-11 w-11 rounded-lg border border-slate-700 bg-transparent cursor-pointer p-0.5"
                    title="Open native color picker"
                  />
                </div>
                <input
                  type="text"
                  value={hexInput}
                  onChange={(e) => updateFromHex(e.target.value)}
                  placeholder="#5865F2"
                  className="flex-1 font-mono text-base font-bold text-white bg-slate-900 border border-slate-700/80 rounded-lg px-3.5 py-2.5 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => handleCopy(currentColor.hex, "hex")}
                  className="px-3.5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  {copiedKey === "hex" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  <span>{copiedKey === "hex" ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            {/* Decimal Integer Input (Discord API Embed Field) */}
            <div className="p-4 rounded-xl border border-slate-800 bg-[#0a0d13]">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Discord Decimal Integer
                </label>
                <span className="text-[11px] text-indigo-400 font-mono">0 to 16,777,215</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="0"
                  max="16777215"
                  value={decimalInput}
                  onChange={(e) => updateFromDecimal(e.target.value)}
                  placeholder="5793266"
                  className="flex-1 font-mono text-base font-bold text-white bg-slate-900 border border-slate-700/80 rounded-lg px-3.5 py-2.5 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => handleCopy(currentColor.decimal.toString(), "decimal")}
                  className="px-3.5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  {copiedKey === "decimal" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  <span>{copiedKey === "decimal" ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            {/* RGB Sliders */}
            <div className="p-4 rounded-xl border border-slate-800 bg-[#0a0d13] space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  RGB Sliders
                </label>
                <span className="text-xs font-mono text-slate-400">{currentColor.rgbString}</span>
              </div>

              {/* R Slider */}
              <div className="flex items-center gap-3">
                <span className="w-4 text-xs font-bold text-rose-400 font-mono">R</span>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={rgbR}
                  onChange={(e) => updateFromRgb(parseInt(e.target.value, 10), rgbG, rgbB)}
                  className="flex-1 accent-rose-500"
                />
                <span className="w-8 text-right font-mono text-xs text-slate-300">{rgbR}</span>
              </div>

              {/* G Slider */}
              <div className="flex items-center gap-3">
                <span className="w-4 text-xs font-bold text-emerald-400 font-mono">G</span>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={rgbG}
                  onChange={(e) => updateFromRgb(rgbR, parseInt(e.target.value, 10), rgbB)}
                  className="flex-1 accent-emerald-500"
                />
                <span className="w-8 text-right font-mono text-xs text-slate-300">{rgbG}</span>
              </div>

              {/* B Slider */}
              <div className="flex items-center gap-3">
                <span className="w-4 text-xs font-bold text-indigo-400 font-mono">B</span>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={rgbB}
                  onChange={(e) => updateFromRgb(rgbR, rgbG, parseInt(e.target.value, 10))}
                  className="flex-1 accent-indigo-500"
                />
                <span className="w-8 text-right font-mono text-xs text-slate-300">{rgbB}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Code Snippets Export Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Code2 className="h-4 w-4 text-indigo-400" />
              <span>Developer Library Integration Snippets</span>
            </span>
            <span className="text-[11px] text-slate-400">1-click copy code</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* discord.js */}
            <div className="p-3.5 rounded-xl border border-slate-800 bg-[#0a0d13] flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block mb-1">discord.js v14</span>
                <code className="text-xs font-mono text-indigo-300 break-all select-all block">
                  {currentColor.discordJs}
                </code>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(currentColor.discordJs, "djs")}
                className="mt-3 w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors flex items-center justify-center gap-1"
              >
                {copiedKey === "djs" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedKey === "djs" ? "Copied" : "Copy d.js"}</span>
              </button>
            </div>

            {/* discord.py */}
            <div className="p-3.5 rounded-xl border border-slate-800 bg-[#0a0d13] flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block mb-1">discord.py</span>
                <code className="text-xs font-mono text-indigo-300 break-all select-all block">
                  {currentColor.discordPy}
                </code>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(currentColor.discordPy, "dpy")}
                className="mt-3 w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors flex items-center justify-center gap-1"
              >
                {copiedKey === "dpy" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedKey === "dpy" ? "Copied" : "Copy d.py"}</span>
              </button>
            </div>

            {/* Webhook JSON Payload */}
            <div className="p-3.5 rounded-xl border border-slate-800 bg-[#0a0d13] flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block mb-1">Webhook JSON</span>
                <code className="text-xs font-mono text-indigo-300 break-all select-all block">
                  {`"color": ${currentColor.decimal}`}
                </code>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(`"color": ${currentColor.decimal}`, "json")}
                className="mt-3 w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors flex items-center justify-center gap-1"
              >
                {copiedKey === "json" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedKey === "json" ? "Copied" : "Copy JSON"}</span>
              </button>
            </div>

            {/* Raw Hex */}
            <div className="p-3.5 rounded-xl border border-slate-800 bg-[#0a0d13] flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block mb-1">Hex Integer</span>
                <code className="text-xs font-mono text-indigo-300 break-all select-all block">
                  0x{currentColor.hex.replace("#", "")}
                </code>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(`0x${currentColor.hex.replace("#", "")}`, "hexraw")}
                className="mt-3 w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors flex items-center justify-center gap-1"
              >
                {copiedKey === "hexraw" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedKey === "hexraw" ? "Copied" : "Copy Hex"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Official Discord Color Presets Directory */}
      <div className="rounded-2xl border border-slate-800 bg-[#0e121a] p-5 sm:p-7 shadow-2xl">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/80">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-indigo-400" />
              <span>Official Discord Brand & Role Color Presets</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any official color tile to instantly load its HEX and Decimal values.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {OFFICIAL_DISCORD_COLORS.map((preset) => {
            const isSelected = currentColor.hex.toUpperCase() === preset.hex.toUpperCase();
            return (
              <button
                key={preset.name}
                type="button"
                onClick={() => handlePresetClick(preset)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between group active:scale-[0.98] ${
                  isSelected
                    ? "border-indigo-500 bg-indigo-950/30 ring-1 ring-indigo-500/50"
                    : "border-slate-800 bg-[#0a0d13] hover:border-slate-700 hover:bg-slate-900/60"
                }`}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div
                    className="h-6 w-6 rounded-lg border border-white/20 shadow-sm flex-shrink-0"
                    style={{ backgroundColor: preset.hex }}
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white truncate group-hover:text-indigo-300 transition-colors">
                      {preset.name}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800/60">
                  <span>{preset.hex}</span>
                  <span className="text-slate-500">{preset.decimal}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
