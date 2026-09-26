"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  caption?: string;
}

export function CodeBlock({ code, language, caption }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="relative group my-6 rounded-lg border border-slate-800/80 bg-[#0d1017] text-sm overflow-hidden">
      {(caption || language) && (
        <div className="flex items-center justify-between px-4 py-2 bg-slate-900/60 border-b border-slate-800/60 text-xs text-slate-400 font-mono">
          <span className="text-slate-300 font-sans text-xs">{caption || ""}</span>
          <span className="text-[11px] uppercase tracking-wider text-indigo-400/80 font-mono mr-16">
            {language || ""}
          </span>
        </div>
      )}
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied code" : "Copy code"}
        className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-xs text-slate-300 hover:text-white border border-slate-700/60 opacity-80 group-hover:opacity-100 transition-opacity focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-400"
      >
        {copied ? (
          <>
            <Check className="h-3 w-3 text-emerald-400" aria-hidden="true" />
            <span className="text-emerald-400 font-medium text-[11px]">Copied</span>
          </>
        ) : (
          <>
            <Copy className="h-3 w-3 text-slate-400" aria-hidden="true" />
            <span className="text-[11px]">Copy</span>
          </>
        )}
      </button>

      <div className="overflow-x-auto p-4 sm:p-5 font-mono text-[13px] leading-relaxed text-slate-200">
        <pre className="whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
