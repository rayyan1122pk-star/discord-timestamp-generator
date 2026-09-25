import React from "react";
import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { routeMetadataMap } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: routeMetadataMap.privacy.title,
  description: routeMetadataMap.privacy.description,
  alternates: { canonical: routeMetadataMap.privacy.canonical },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumbs items={[{ name: "Privacy Policy", href: "/privacy" }]} />

      <header className="mb-8 pb-8 border-b border-slate-800">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-slate-400">Last updated: September 25, 2026</p>
      </header>

      <div className="space-y-8 text-slate-300 text-sm sm:text-base leading-relaxed">
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-5">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-1.5">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            <span>Zero Data Collection Commitment</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Discord Timestamps is an offline-capable client-side web utility. When you pick a date, choose a
            timezone, or generate a Discord timestamp code, 100% of the computations occur directly inside
            your web browser using native JavaScript APIs. No dates, times, or personal schedules are ever
            sent to, processed by, or saved on our servers.
          </p>
        </div>

        <section>
          <h2 className="text-xl font-bold text-white mb-2">1. Information We Do Not Collect</h2>
          <p>
            Unlike many web utilities, we do not require account registration, login credentials, or personal
            identifiers. We do not inspect, log, or transmit:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-slate-300 text-sm">
            <li>The event dates, times, or timezones you select</li>
            <li>The content of your Discord server announcements</li>
            <li>Your Discord usernames, tokens, or server IDs</li>
            <li>Your clipboard contents</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-2">2. Local Storage &amp; URL Parameters</h2>
          <p>
            When you click &ldquo;Share&rdquo;, the generator encodes your selected Unix timestamp in the browser
            URL query string (e.g. <code className="font-mono text-xs text-indigo-300">?t=1727280000</code>).
            This parameter is processed entirely on your device and is not saved to any server database.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-2">3. Cookies &amp; Tracking</h2>
          <p>
            We do not use tracking cookies, behavioral tracking pixels, or cross-site profiling scripts.
            Any session preferences (such as your auto-detected browser timezone) remain strictly inside
            your browser&apos;s memory.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-2">4. Third-Party Links</h2>
          <p>
            Our documentation includes links to external websites, including Discord&apos;s official Developer
            Documentation and developer GitHub repositories. We are not responsible for the privacy practices
            or policies of external platforms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-2">5. Contact Regarding Privacy</h2>
          <p>
            If you have questions about our client-side privacy architecture, you can contact our privacy
            officer at <code className="text-indigo-300">privacy@discordtimestamps.dev</code>.
          </p>
        </section>
      </div>
    </div>
  );
}
