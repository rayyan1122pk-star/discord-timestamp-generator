"use client";

import React, { useState } from "react";
import { Check, Copy, UserCheck, ShieldAlert, Sparkles, Smartphone, Monitor } from "lucide-react";

export function DiscordInvisibleNameTool() {
  const HANGUL_FILLER = "\u3164"; // The special character that Discord accepts
  const ZERO_WIDTH_SPACE = "\u200B";

  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [testInput, setTestInput] = useState("");

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="space-y-8">
      {/* Primary Action Card */}
      <div className="rounded-2xl border border-indigo-500/30 bg-[#0e121a] p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-medium text-indigo-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Tested & Verified for Discord 2026
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
            1-Click Copy Invisible Discord Character
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            Discord blocks standard spacebar spaces in names. We use the special Unicode Hangul Filler character (<code className="text-indigo-300 font-mono">U+3164</code>), which Discord recognizes as a valid character while rendering completely invisible in chat and member lists.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Primary Button */}
            <button
              type="button"
              onClick={() => handleCopy(HANGUL_FILLER, "hangul")}
              className="flex items-center justify-between p-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/25 group cursor-pointer"
            >
              <span className="flex items-center gap-2.5">
                {copiedType === "hangul" ? (
                  <Check className="w-5 h-5 text-emerald-300 animate-bounce" />
                ) : (
                  <Copy className="w-5 h-5 text-indigo-200 group-hover:scale-110 transition-transform" />
                )}
                <span>Copy Invisible Name</span>
              </span>
              <span className="text-xs bg-indigo-700/60 px-2 py-0.5 rounded font-mono">
                {copiedType === "hangul" ? "Copied!" : "Hangul U+3164"}
              </span>
            </button>

            {/* Zero-Width Space Button */}
            <button
              type="button"
              onClick={() => handleCopy(ZERO_WIDTH_SPACE, "zwsp")}
              className="flex items-center justify-between p-4 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-750 text-slate-200 font-semibold text-sm transition-all border border-slate-700/60 group cursor-pointer"
            >
              <span className="flex items-center gap-2.5">
                {copiedType === "zwsp" ? (
                  <Check className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Copy className="w-5 h-5 text-slate-400 group-hover:scale-110 transition-transform" />
                )}
                <span>Copy Blank Message</span>
              </span>
              <span className="text-xs bg-slate-900 px-2 py-0.5 rounded font-mono text-slate-400">
                {copiedType === "zwsp" ? "Copied!" : "ZWSP U+200B"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Live Discord Dark Mode Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 rounded-xl border border-slate-800 bg-[#0e121a] p-5">
          <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-indigo-400" />
            Live Discord Profile & Chat Preview
          </h3>

          {/* Simulated Discord Message */}
          <div className="rounded-lg bg-[#313338] p-4 font-sans text-sm text-[#dbdee1] border border-slate-800/80 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-linear-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-inner">
                ?
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="inline-block w-16 h-3 bg-slate-600/40 rounded italic text-[11px] text-slate-400 px-1 font-mono">
                    (Invisible)
                  </span>
                  <span className="text-[11px] text-slate-400">Today at 8:45 PM</span>
                </div>
                <p className="text-sm text-slate-200 mt-1">
                  Notice how the author display name above is completely blank!
                </p>
              </div>
            </div>

            {/* Member List Simulator */}
            <div className="pt-3 border-t border-slate-700/60">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Online - 1
              </span>
              <div className="flex items-center gap-2.5 mt-2 px-2 py-1.5 rounded bg-[#35373c]">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-xs text-white">
                    ?
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#23a55a] ring-2 ring-[#313338]" />
                </div>
                <span className="inline-block w-12 h-2.5 bg-slate-500/30 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Test Sandbox Input */}
        <div className="lg:col-span-6 rounded-xl border border-slate-800 bg-[#0e121a] p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-2">
              Test Pasting Your Character Here
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Paste the copied character below to verify that your clipboard received the invisible character.
            </p>

            <div className="relative">
              <input
                type="text"
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                placeholder="Press Ctrl+V (or tap Paste on phone)..."
                className="w-full px-4 py-3 rounded-lg bg-[#141824] border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
              {testInput && (
                <button
                  type="button"
                  onClick={() => setTestInput("")}
                  className="absolute right-3 top-3 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Characters: {testInput.length}</span>
              <span>
                Status:{" "}
                {testInput.includes(HANGUL_FILLER) ? (
                  <span className="text-emerald-400 font-semibold">Valid Invisible Character</span>
                ) : testInput.length > 0 ? (
                  <span className="text-amber-400">Standard Text</span>
                ) : (
                  "Empty"
                )}
              </span>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300/90 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              Discord requires standard alphanumeric characters for your @username handle, but fully allows invisible characters for your <strong>Display Name</strong> and <strong>Server Nickname</strong>.
            </span>
          </div>
        </div>
      </div>

      {/* Step by Step Device Instructions */}
      <div className="rounded-xl border border-slate-800 bg-[#0e121a] p-6">
        <h3 className="text-lg font-bold text-white mb-4">
          How to Set an Invisible Name on Discord
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Desktop Instructions */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-indigo-400">
              <Monitor className="w-4 h-4" />
              <span>Discord Desktop & Browser (Windows / Mac)</span>
            </div>
            <ol className="list-decimal list-inside text-xs sm:text-sm text-slate-300 space-y-2 leading-relaxed">
              <li>Click the <strong>Copy Invisible Name</strong> button above.</li>
              <li>Open Discord and click the <strong>Gear icon (User Settings)</strong> at the bottom left.</li>
              <li>Under User Settings, select <strong>Profiles</strong>.</li>
              <li>Click inside the <strong>Display Name</strong> field, delete any existing text, and press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-xs">Ctrl+V</kbd> (or <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-xs">Cmd+V</kbd> on Mac).</li>
              <li>Click <strong>Save Changes</strong> at the bottom pop-up bar.</li>
            </ol>
          </div>

          {/* Mobile Instructions */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-indigo-400">
              <Smartphone className="w-4 h-4" />
              <span>Discord Mobile App (iOS & Android)</span>
            </div>
            <ol className="list-decimal list-inside text-xs sm:text-sm text-slate-300 space-y-2 leading-relaxed">
              <li>Tap the <strong>Copy Invisible Name</strong> button above on your phone.</li>
              <li>Open the Discord mobile app and tap your <strong>Profile avatar</strong> at the bottom right.</li>
              <li>Tap <strong>Edit Profile</strong> (or <strong>Server Profile</strong> for a specific server).</li>
              <li>Tap your <strong>Display Name</strong>, clear it, long-press the field, and select <strong>Paste</strong>.</li>
              <li>Tap <strong>Save</strong> in the upper right corner.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
