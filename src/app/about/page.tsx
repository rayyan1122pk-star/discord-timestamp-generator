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
          A fast, zero-tracking timestamp builder created to end timezone confusion in Discord servers.
        </p>
      </header>

      <div className="space-y-8 text-slate-300 text-sm sm:text-base leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-white mb-2.5">Why This Tool Exists</h2>
          <p>
            This project started out of sheer annoyance with timezone math. A few friends and I were trying to
            coordinate a weekly gaming session across Toronto, London, and Lahore. Someone posted &quot;8 PM tonight&quot;.
            Two people arrived an hour late, another showed up three hours early, and the whole plan fell apart.
          </p>
          <p className="mt-3">
            Discord actually solved this years ago with dynamic timestamp tags (<code className="text-indigo-300 bg-slate-900 px-1.5 py-0.5 rounded">&lt;t:UNIX:STYLE&gt;</code>).
            When you post a dynamic tag, Discord automatically converts it to each viewer&apos;s local phone or desktop clock.
            The catch? Nobody wants to open a terminal or run <code className="text-indigo-300 bg-slate-900 px-1.5 py-0.5 rounded">date +%s</code> just to tell their guild when a raid kicks off.
          </p>
          <p className="mt-3">
            The existing web tools I tried were packed with ads, loaded slowly on mobile, or made you click through five
            different dropdowns. I wanted a tool that felt like a developer utility: instant, clean, zero trackers, and completely free.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
          <div className="rounded-xl border border-slate-800 bg-[#0e121a] p-5">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
              <Shield className="h-4 w-4" aria-hidden="true" />
            </div>
            <h3 className="font-semibold text-white text-sm">100% Client-Side Privacy</h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Every date, time, and timezone calculation happens in your browser via native JavaScript Intl APIs.
              Your event details and schedules never touch an external server or AI API.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#0e121a] p-5">
            <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
              <Zap className="h-4 w-4" aria-hidden="true" />
            </div>
            <h3 className="font-semibold text-white text-sm">Instant &amp; Ad-Free</h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              No banner ads, popups, or bloated analytics scripts slowing your browser down.
              Pick a date, tap copy, and paste it into Discord.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#0e121a] p-5">
            <div className="h-8 w-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
              <Terminal className="h-4 w-4" aria-hidden="true" />
            </div>
            <h3 className="font-semibold text-white text-sm">Built for Mod Teams &amp; Devs</h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Includes quick shorthand parsing, Discord Snowflake ID decoders, ANSI color block generators,
              and code snippets for discord.js and discord.py.
            </p>
          </div>
        </section>

        <section className="pt-4 border-t border-slate-800">
          <h2 className="text-xl font-bold text-white mb-2.5">Creator &amp; Open Source Community</h2>
          <p>
            Discord Timestamps is maintained by <strong className="text-white font-semibold">Rayyan</strong> (<a href="https://github.com/rayyan1122pk-star" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">@rayyan1122pk-star</a>),
            with feedback, testing, and contributions from server moderators and bot developers across the Discord community.
          </p>
          <p className="mt-3">
            All guides and format references are verified against Discord&apos;s official developer documentation and tested across Windows, macOS, Linux, iOS, and Android clients.
          </p>
          <ul className="mt-3 space-y-2 text-xs sm:text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>Tested on Discord desktop, browser, and mobile apps.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>Full keyboard accessibility, zero layout shift, and clean dark mode styling.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>Independent developer project. Not affiliated with or endorsed by Discord Inc.</span>
            </li>
          </ul>
        </section>

        <section className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">Have feedback or a feature idea?</h3>
            <p className="text-xs text-slate-400 mt-0.5">Found a bug or want another formatting tool added? Reach out anytime.</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
          >
            <span>Get in Touch</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </section>
      </div>
    </div>
  );
}
