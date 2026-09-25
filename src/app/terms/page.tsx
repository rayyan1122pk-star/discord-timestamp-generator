import React from "react";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { routeMetadataMap } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: routeMetadataMap.terms.title,
  description: routeMetadataMap.terms.description,
  alternates: { canonical: routeMetadataMap.terms.canonical },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumbs items={[{ name: "Terms of Service", href: "/terms" }]} />

      <header className="mb-8 pb-8 border-b border-slate-800">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-slate-400">Last updated: September 25, 2026</p>
      </header>

      <div className="space-y-8 text-slate-300 text-sm sm:text-base leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-white mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing and using Discord Timestamps (discordtimestamps.dev), you accept and agree to be bound
            by these Terms of Service. If you do not agree to these terms, you should discontinue use of the site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-2">2. Nature of Service &amp; Disclaimer</h2>
          <p>
            Discord Timestamps is an independent web utility and educational reference. It is not affiliated with,
            endorsed by, maintained by, or sponsored by Discord Inc. Discord and the Discord logo are registered
            trademarks of Discord Inc.
          </p>
          <p className="mt-2 text-xs text-slate-400">
            The software and documentation are provided &ldquo;as is&rdquo;, without warranty of any kind, express or implied.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-2">3. Acceptable Use</h2>
          <p>
            You agree to use this tool only for lawful purposes. You agree not to attempt to disrupt, overload,
            or tamper with the website or its underlying infrastructure through denial-of-service attacks or
            malicious automated scraping.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-2">4. Intellectual Property</h2>
          <p>
            The original tutorials, code examples, guides, and visual assets on this site are protected by
            applicable copyright and intellectual property laws. Open source code samples provided in tutorials
            may be freely utilized in your personal or commercial Discord bot and webhook projects.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-2">5. Modifications to Terms</h2>
          <p>
            We reserve the right to revise or update these Terms of Service at any time. Continued use of the
            service following any changes constitutes acceptance of the modified terms.
          </p>
        </section>
      </div>
    </div>
  );
}
