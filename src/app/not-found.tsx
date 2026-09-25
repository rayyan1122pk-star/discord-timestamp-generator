import React from "react";
import Link from "next/link";
import { Clock, Home, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#5865F2]/10 border border-[#5865F2]/25 text-[#5865F2] mb-6">
        <Clock className="h-8 w-8" aria-hidden="true" />
      </div>

      <span className="block text-xs font-mono font-semibold uppercase tracking-wider text-indigo-400 mb-2">
        Error 404
      </span>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
        Timestamp Not Found
      </h1>
      <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed max-w-md mx-auto">
        The page you are looking for has moved, expired, or does not exist.
        Jump back to the main generator or explore our format guides below.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-[#5865F2] hover:bg-[#4752c4] transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          <span>Open Timestamp Generator</span>
        </Link>
        <Link
          href="/discord-timestamp-guide"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-all border border-slate-700"
        >
          <BookOpen className="h-4 w-4" aria-hidden="true" />
          <span>Timestamp Guide</span>
        </Link>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-800/80 text-xs text-slate-400">
        <span>Popular Quick Links: </span>
        <Link href="/discord-timestamp-formats" className="text-indigo-400 hover:underline mx-1.5">
          Formats Cheat Sheet
        </Link>
        &bull;
        <Link href="/unix-timestamp" className="text-indigo-400 hover:underline mx-1.5">
          Unix Epoch Converter
        </Link>
        &bull;
        <Link href="/discord-markdown" className="text-indigo-400 hover:underline mx-1.5">
          Markdown Guide
        </Link>
      </div>
    </div>
  );
}
