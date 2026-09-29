"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

interface FormatRow {
  flag: string;
  name: string;
  syntax: string;
  output: string;
  useCase: string;
}

const FORMAT_ROWS: FormatRow[] = [
  {
    flag: "R",
    name: "Relative Time",
    syntax: "<t:1727280000:R>",
    output: "in 2 hours / 5 minutes ago",
    useCase: "Countdowns, deadlines, live streams",
  },
  {
    flag: "f",
    name: "Short Date/Time",
    syntax: "<t:1727280000:f>",
    output: "September 25, 2026 8:00 PM",
    useCase: "General events, community meetings (Default)",
  },
  {
    flag: "F",
    name: "Long Date/Time",
    syntax: "<t:1727280000:F>",
    output: "Friday, September 25, 2026 8:00 PM",
    useCase: "Official tournaments, server rules",
  },
  {
    flag: "t",
    name: "Short Time",
    syntax: "<t:1727280000:t>",
    output: "8:00 PM",
    useCase: "Daily recurring events (standups, raids)",
  },
  {
    flag: "T",
    name: "Long Time",
    syntax: "<t:1727280000:T>",
    output: "8:00:00 PM",
    useCase: "Precise speedrun logs, server reboots",
  },
  {
    flag: "d",
    name: "Short Date",
    syntax: "<t:1727280000:d>",
    output: "09/25/2026",
    useCase: "Compact lists, ban expirations",
  },
  {
    flag: "D",
    name: "Long Date",
    syntax: "<t:1727280000:D>",
    output: "September 25, 2026",
    useCase: "Seasonal announcements, release days",
  },
];

export function FormatSyntaxTable() {
  const [copiedTag, setCopiedTag] = useState<string | null>(null);

  const handleCopy = async (syntax: string) => {
    try {
      await navigator.clipboard.writeText(syntax);
      setCopiedTag(syntax);
      setTimeout(() => setCopiedTag(null), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="my-8 rounded-xl border border-slate-800/80 bg-[#0e121a] overflow-hidden">
      <div className="p-4 bg-slate-900/60 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span className="font-semibold text-white text-sm">
          Quick Copy 7-Row Discord Timestamp Syntax Reference
        </span>
        <span className="text-xs text-slate-400">
          Click any tag to copy directly to clipboard
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#0b0e14] border-b border-slate-800 text-slate-400 font-mono text-xs">
            <tr>
              <th className="py-3 px-4 font-medium">Flag</th>
              <th className="py-3 px-4 font-medium">Format Name</th>
              <th className="py-3 px-4 font-medium">Syntax (Click to Copy)</th>
              <th className="py-3 px-4 font-medium">Discord Rendered Preview</th>
              <th className="py-3 px-4 font-medium">Best Use Case</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {FORMAT_ROWS.map((row) => {
              const isCopied = copiedTag === row.syntax;
              return (
                <tr key={row.flag} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-indigo-400">
                    :{row.flag}
                  </td>
                  <td className="py-3 px-4 text-slate-200 font-medium whitespace-nowrap">
                    {row.name}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      type="button"
                      onClick={() => handleCopy(row.syntax)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-indigo-300 hover:text-white font-mono text-xs border border-slate-700/60 transition-colors"
                      title="Click to copy syntax"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-semibold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>{row.syntax}</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2.5 py-1 rounded bg-[#2b2d31] text-[#dbdee1] text-xs font-sans border border-[#3f4147]/40 shadow-xs">
                      {row.output}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-slate-400">
                    {row.useCase}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-3 bg-slate-900/40 border-t border-slate-800/60 text-xs text-slate-400 flex items-center justify-between">
        <span>Desktop & Mobile: Works natively on Windows, Mac, Linux, iOS, and Android Discord apps.</span>
      </div>
    </div>
  );
}
