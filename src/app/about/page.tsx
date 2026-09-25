import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Zap, Terminal, ArrowRight, CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { routeMetadataMap, siteConfig } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: routeMetadataMap.about.title,
  description: routeMetadataMap.about.description,
  alternates: { canonical: routeMetadataMap.about.canonical },
  openGraph: {
    title: routeMetadataMap.about.title,
    description: routeMetadataMap.about.description,
    url: routeMetadataMap.about.canonical,
  },
};

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Discord Timestamps",
    description: routeMetadataMap.about.description,
    url: routeMetadataMap.about.canonical,
    publisher: {
      "@type": "Organization",
      name: siteConfig.shortName,
      url: siteConfig.url,
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd data={aboutSchema} />

      <Breadcrumbs items={[{ name: "About", href: "/about" }]} />

      <header className="mb-8 pb-8 border-b border-slate-800">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
          About Discord Timestamps
        </h1>
        <p className="mt-3 text-base text-slate-300 leading-relaxed">
          An open, developer-crafted utility designed to eliminate timezone confusion for Discord communities worldwide.
        </p>
      </header>

      <div className="space-y-8 text-slate-300 text-sm sm:text-base leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-white mb-2.5">Our Mission</h2>
          <p>
            Discord Timestamps was built to solve a simple yet frustrating problem: coordinate global events
            without timezone math errors. Whether you are running an esports clan, hosting a community AMA,
            coordinating open-source sprint reviews, or broadcasting scheduled podcasts, typing static times
            forces users across the globe to guess or look up conversions.
          </p>
          <p className="mt-3">
            Our goal is to provide the fastest, cleanest, and most reliable Discord timestamp formatter on the web,
            combined with thorough, accessible technical documentation on Discord API formatting, webhooks,
            and bot development.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
          <div className="rounded-xl border border-slate-800 bg-[#0e121a] p-5">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
              <Shield className="h-4 w-4" aria-hidden="true" />
            </div>
            <h3 className="font-semibold text-white text-sm">100% Client-Side Privacy</h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Every date, time, and timezone calculation runs in your local browser using native JavaScript Intl APIs.
              We do not log, transmit, or monetize your personal schedules.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#0e121a] p-5">
            <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
              <Zap className="h-4 w-4" aria-hidden="true" />
            </div>
            <h3 className="font-semibold text-white text-sm">Zero-Latency Speed</h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              No bloated frameworks, tracking scripts, or ad networks slowing down your workflow.
              Instant conversion, 1-click copy, and live Discord preview.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#0e121a] p-5">
            <div className="h-8 w-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
              <Terminal className="h-4 w-4" aria-hidden="true" />
            </div>
            <h3 className="font-semibold text-white text-sm">Developer First</h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Built by bot developers and server managers. We provide tested code snippets for discord.js v14,
              discord.py, webhook JSON schemas, and POSIX epoch mathematics.
            </p>
          </div>
        </section>

        <section className="pt-4 border-t border-slate-800">
          <h2 className="text-xl font-bold text-white mb-2.5">Editorial &amp; Technical Standards</h2>
          <p>
            All tutorials, format breakdowns, and SDK code examples on this site are written, tested, and
            benchmarked against Discord&apos;s live API specifications. We update our guides whenever Discord
            introduces updates to chat rendering, Markdown syntax, or Developer Portal schemas.
          </p>
          <ul className="mt-3 space-y-2 text-xs sm:text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>Tested against Discord desktop (Windows, macOS, Linux) and mobile (iOS, Android).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>Full compliance with WCAG AA accessibility standards, semantic HTML, and keyboard navigation.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>Independent resource. Not affiliated with, endorsed by, or sponsored by Discord Inc.</span>
            </li>
          </ul>
        </section>

        <section className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">Have feedback or questions?</h3>
            <p className="text-xs text-slate-400 mt-0.5">We welcome bug reports, suggestions, and corrections.</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
          >
            <span>Contact the Team</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </section>
      </div>
    </div>
  );
}
