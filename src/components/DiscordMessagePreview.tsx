"use client";

import React, { useState } from "react";
import { Info } from "lucide-react";
import { DiscordFormatStyle, renderDiscordFormatPreview } from "@/lib/time-utils";

interface DiscordMessagePreviewProps {
  epochSeconds: number;
  style: DiscordFormatStyle;
  syntax: string;
  userTimezone: string;
}

export function DiscordMessagePreview({
  epochSeconds,
  style,
  syntax,
  userTimezone,
}: DiscordMessagePreviewProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const formattedOutput = renderDiscordFormatPreview(epochSeconds, style, "en-US", userTimezone);
  const absoluteTooltip = renderDiscordFormatPreview(epochSeconds, "F", "en-US", userTimezone);

  return (
    <div className="rounded-xl border border-slate-800 bg-[#1e1f22] p-4 sm:p-5 text-[#dbdee1] shadow-lg">
      <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-[#2b2d31]">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <span className="inline-block h-2 w-2 rounded-full bg-[#5865f2]" />
          <span>Live Discord Chat Preview</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Info className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">Renders dynamically on user client</span>
        </div>
      </div>

      {/* Simulated Discord Message */}
      <div className="flex items-start gap-3 sm:gap-4 py-2 px-1">
        {/* Discord Avatar */}
        <div className="relative flex-shrink-0">
          <div className="h-10 w-10 rounded-full bg-[#5865f2] flex items-center justify-center font-bold text-white text-base shadow-sm">
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              role="img"
              aria-label="Discord Bot Avatar"
            >
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
          </div>
        </div>

        {/* Message Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-semibold text-white text-sm hover:underline cursor-pointer">
              Server Announcer
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#5865f2] text-white tracking-wide uppercase leading-none">
              BOT
            </span>
            <span className="text-[11px] text-[#949ba4]">Today at 12:00 PM</span>
          </div>

          <div className="mt-1.5 text-sm text-[#dbdee1] leading-relaxed break-words">
            Community Event Reminder! The tournament kickoff is scheduled for{" "}
            {/* The Timestamp Pill with Tooltip */}
            <span className="relative inline-block my-0.5">
              <span
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onFocus={() => setShowTooltip(true)}
                onBlur={() => setShowTooltip(false)}
                tabIndex={0}
                className="inline-block px-1.5 py-0.5 rounded bg-[#2b2d31] hover:bg-[#35373c] text-[#f2f3f5] font-medium text-xs sm:text-sm cursor-pointer border border-[#35373c] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#5865f2]"
              >
                {formattedOutput}
              </span>

              {/* Discord Hover Tooltip */}
              {showTooltip && (
                <div
                  role="tooltip"
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 px-2.5 py-1.5 bg-[#111214] text-[#dbdee1] text-xs font-normal rounded-md shadow-xl border border-[#232428] whitespace-nowrap pointer-events-none transition-opacity duration-150"
                >
                  <div className="font-semibold text-white">{absoluteTooltip}</div>
                  <div className="text-[10px] text-[#949ba4] font-mono mt-0.5">{syntax}</div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-[#111214]" />
                </div>
              )}
            </span>
            . Make sure to be in the voice channel on time!
          </div>
        </div>
      </div>
    </div>
  );
}
