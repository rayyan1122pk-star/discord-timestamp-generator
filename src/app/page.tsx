import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TimestampGenerator } from "@/components/TimestampGenerator";
import { FaqAccordion, FaqItem } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";
import { siteConfig, routeMetadataMap } from "@/lib/seo-config";
import { BLOG_POSTS } from "@/data/guides-data";

export const metadata: Metadata = {
  title: routeMetadataMap.home.title,
  description: routeMetadataMap.home.description,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: routeMetadataMap.home.title,
    description: routeMetadataMap.home.description,
    url: siteConfig.url,
    siteName: siteConfig.shortName,
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Discord Timestamp Generator & Preview Interface",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: routeMetadataMap.home.title,
    description: routeMetadataMap.home.description,
    images: [`${siteConfig.url}/og-image.png`],
  },
};

const HOME_FAQS: FaqItem[] = [
  {
    question: "What is a Discord timestamp?",
    answer:
      "A Discord timestamp is a formatted code snippet written as <t:TIMESTAMP:STYLE>, where TIMESTAMP is a 10-digit Unix Epoch integer (seconds since January 1, 1970 UTC) and STYLE is an optional single-letter display flag. When sent in a Discord message, channel topic, or forum post, Discord automatically calculates and displays the date and time in each user's local timezone.",
  },
  {
    question: "Why should I use dynamic timestamps instead of typing regular time?",
    answer:
      "When you type 'Event starts at 8:00 PM EST', international members in London, Tokyo, Berlin, or Sydney must manually calculate timezone conversions and daylight saving shifts. Dynamic timestamps eliminate all confusion because Discord's client recalculates the display according to the viewer's device clock.",
  },
  {
    question: "What is the difference between relative time (:R) and short date/time (:f)?",
    answer:
      "The :R flag produces a dynamic live countdown or elapsed time string like 'in 2 hours' or '15 minutes ago' that updates automatically in the chat. The :f flag displays an absolute date and time, such as 'September 25, 2026 8:00 PM'.",
  },
  {
    question: "Why does my Discord timestamp show as raw text like <t:1727280000>?",
    answer:
      "This happens if you accidentally wrapped the code in backticks (`<t:...>`), added spaces inside the brackets, forgot the closing bracket, or passed a 13-digit millisecond value from JavaScript instead of a 10-digit second value.",
  },
  {
    question: "Is this Discord timestamp tool completely private?",
    answer:
      "Yes. 100% of calculations happen locally inside your web browser using native JavaScript Intl APIs. No dates, times, or personal data are ever transmitted to or stored on our servers.",
  },
];

export default function HomePage() {
  const pageSchema = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Discord Timestamp Generator",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description: siteConfig.description,
      url: siteConfig.url,
      featureList: [
        "Unix epoch timestamp conversion",
        "Discord timestamp syntax generation",
        "Live Discord chat preview",
        "Relative time countdown simulator",
        "Automatic browser timezone detection",
        "1-click copy with tactile feedback",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to Generate and Send a Dynamic Discord Timestamp",
      description: "Step-by-step instructions for creating timestamps that automatically adjust to every Discord user's timezone.",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Select Your Target Date and Time",
          text: "Use the date and time pickers in the generator to select when your event, stream, or deadline will take place.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Select Your Source Timezone",
          text: "Confirm your local timezone or select the reference timezone for your event.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Choose a Display Format",
          text: "Choose between Relative Time (:R), Long Date/Time (:F), Short Time (:t), or any of the 7 supported styles.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Copy and Paste into Discord",
          text: "Click Copy Code and paste the resulting <t:TIMESTAMP:STYLE> snippet into any Discord chat message, announcement, or channel topic.",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: HOME_FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <JsonLd data={pageSchema} />

      {/* Hero Header Section */}
      <section className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white text-balance leading-tight">
          Discord Timestamp Generator
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed text-pretty">
          Generate dynamic Discord timestamps that automatically adjust to each viewer&apos;s local
          clock. Select an event time, preview how Discord renders it, and copy the code.
        </p>
      </section>

      {/* The Core Interactive Product Tool */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
          Create a Discord Timestamp
        </h2>
        <TimestampGenerator />
      </section>

      {/* Editorial Explanatory Section */}
      <section className="mt-20 pt-12 border-t border-slate-800/80">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-white mb-4">
            How Discord Timestamps Work
          </h2>
          <div className="space-y-4 text-base text-slate-300 leading-relaxed">
            <p>
              When organizing events across international Discord servers, typing static time zones like
              &ldquo;8:00 PM EST&rdquo; forces members in Europe, Asia, and Oceania to calculate offsets and
              account for daylight saving changes manually.
            </p>
            <p>
              Discord solves this with special syntax:{" "}
              <code className="px-1.5 py-0.5 rounded bg-slate-800 text-indigo-300 font-mono text-sm">
                &lt;t:TIMESTAMP:STYLE&gt;
              </code>
              . Instead of sending a formatted string, you supply the universal Unix epoch timestamp in seconds.
              When anyone views your message, their local Discord client automatically translates that moment
              into their device&apos;s clock and regional format.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
            <div className="border border-slate-800/80 rounded-xl p-5 bg-[#0d1017]">
              <h3 className="font-semibold text-white text-base mb-2">Unix Timestamps</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                A Unix timestamp represents seconds passed since January 1, 1970 UTC. Discord requires 10-digit second values, not 13-digit millisecond values.
              </p>
            </div>
            <div className="border border-slate-800/80 rounded-xl p-5 bg-[#0d1017]">
              <h3 className="font-semibold text-white text-base mb-2">Discord Timestamp Syntax</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                The syntax follows <code className="font-mono text-indigo-300">&lt;t:TIMESTAMP:STYLE&gt;</code>. The style flag specifies whether Discord renders date, time, or a relative countdown.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-5 text-sm">
            <Link
              href="/discord-timestamp-guide"
              className="text-indigo-400 hover:text-indigo-300 hover:underline inline-flex items-center gap-1 font-medium"
            >
              <span>Read the full timestamp guide</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href="/discord-timestamp-formats"
              className="text-indigo-400 hover:text-indigo-300 hover:underline inline-flex items-center gap-1 font-medium"
            >
              <span>Explore format flags (t, T, d, D, f, F, R)</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Discord Timestamp Formats Section */}
      <section className="mt-16 pt-12 border-t border-slate-800/80">
        <h2 className="text-2xl font-bold tracking-tight text-white mb-2">
          Discord Timestamp Formats
        </h2>
        <p className="text-sm text-slate-400 mb-6">
          Discord supports 7 distinct formatting styles using a single-letter flag at the end of the syntax.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border border-slate-800/80 rounded-xl p-4 bg-[#0d1017]">
            <span className="font-mono text-xs font-semibold text-indigo-400">:t</span>
            <h3 className="font-semibold text-white text-sm mt-1 mb-1">Short Time</h3>
            <p className="text-xs text-slate-400">Displays hour and minute (e.g., 9:41 PM).</p>
          </div>
          <div className="border border-slate-800/80 rounded-xl p-4 bg-[#0d1017]">
            <span className="font-mono text-xs font-semibold text-indigo-400">:T</span>
            <h3 className="font-semibold text-white text-sm mt-1 mb-1">Long Time</h3>
            <p className="text-xs text-slate-400">Displays hour, minute, and seconds (e.g., 9:41:30 PM).</p>
          </div>
          <div className="border border-slate-800/80 rounded-xl p-4 bg-[#0d1017]">
            <span className="font-mono text-xs font-semibold text-indigo-400">:d</span>
            <h3 className="font-semibold text-white text-sm mt-1 mb-1">Short Date</h3>
            <p className="text-xs text-slate-400">Displays day, month, and year (e.g., 11/14/2026).</p>
          </div>
          <div className="border border-slate-800/80 rounded-xl p-4 bg-[#0d1017]">
            <span className="font-mono text-xs font-semibold text-indigo-400">:D</span>
            <h3 className="font-semibold text-white text-sm mt-1 mb-1">Long Date</h3>
            <p className="text-xs text-slate-400">Displays full written month name and year (e.g., November 14, 2026).</p>
          </div>
          <div className="border border-slate-800/80 rounded-xl p-4 bg-[#0d1017]">
            <span className="font-mono text-xs font-semibold text-indigo-400">:f</span>
            <h3 className="font-semibold text-white text-sm mt-1 mb-1">Short Date/Time</h3>
            <p className="text-xs text-slate-400">Default style if flag is omitted. Displays date and time.</p>
          </div>
          <div className="border border-slate-800/80 rounded-xl p-4 bg-[#0d1017]">
            <span className="font-mono text-xs font-semibold text-indigo-400">:F</span>
            <h3 className="font-semibold text-white text-sm mt-1 mb-1">Long Date/Time</h3>
            <p className="text-xs text-slate-400">Full day of week, written month, year, and time.</p>
          </div>
          <div className="border border-slate-800/80 rounded-xl p-4 bg-[#0d1017] sm:col-span-2 lg:col-span-1">
            <span className="font-mono text-xs font-semibold text-indigo-400">:R</span>
            <h3 className="font-semibold text-white text-sm mt-1 mb-1">Relative Time</h3>
            <p className="text-xs text-slate-400">Live countdown or countup (e.g., in 2 hours, 10 minutes ago).</p>
          </div>
        </div>
      </section>

      {/* Simple 3-Step Guide */}
      <section className="mt-16 pt-12 border-t border-slate-800/80">
        <h2 className="text-2xl font-bold tracking-tight text-white mb-2">
          How to Use Timestamps in Discord
        </h2>
        <p className="text-sm text-slate-400 mb-8">
          Follow these three steps to post auto-adjusting dates in any channel, announcement, or role rule.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-slate-800/80 rounded-xl p-5 bg-[#0d1017]">
            <div className="font-mono text-xs font-semibold text-indigo-400 mb-2">Step 01</div>
            <h3 className="font-semibold text-white text-base mb-1.5">Pick Date &amp; Time</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Select your event time in the tool. The generator detects your current timezone automatically.
            </p>
          </div>

          <div className="border border-slate-800/80 rounded-xl p-5 bg-[#0d1017]">
            <div className="font-mono text-xs font-semibold text-indigo-400 mb-2">Step 02</div>
            <h3 className="font-semibold text-white text-base mb-1.5">Select a Style</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Choose relative countdowns (<code className="font-mono text-indigo-300">:R</code>) for countdowns
              or long dates (<code className="font-mono text-indigo-300">:F</code>) for formal announcements.
            </p>
          </div>

          <div className="border border-slate-800/80 rounded-xl p-5 bg-[#0d1017]">
            <div className="font-mono text-xs font-semibold text-indigo-400 mb-2">Step 03</div>
            <h3 className="font-semibold text-white text-base mb-1.5">Paste into Chat</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Copy the <code className="font-mono text-indigo-300">&lt;t:...&gt;</code> code and paste it
              into Discord. It renders in the viewer&apos;s local clock immediately.
            </p>
          </div>
        </div>
      </section>

      {/* Common Mistakes & Troubleshooting Section */}
      <section className="mt-16 pt-12 border-t border-slate-800/80">
        <h2 className="text-2xl font-bold tracking-tight text-white mb-2">
          Common Discord Timestamp Mistakes &amp; Fixes
        </h2>
        <p className="text-sm text-slate-400 mb-8">
          Avoid these four frequent errors when sharing timestamps in channels, bots, or webhooks.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-slate-800/80 rounded-xl p-5 bg-[#0d1017]">
            <div className="font-mono text-xs font-semibold text-rose-400 mb-2">Mistake 01: Milliseconds Bug</div>
            <h3 className="font-semibold text-white text-base mb-1.5">Using 13-Digit JavaScript Timestamps</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-3">
              Standard JavaScript <code className="text-slate-300 font-mono">Date.now()</code> returns milliseconds (13 digits). Discord strictly requires whole seconds (10 digits). Passing milliseconds pushes dates to the year 50,000+ or renders broken code.
            </p>
            <div className="rounded bg-slate-900/80 p-2.5 font-mono text-xs text-slate-300 border border-slate-800">
              <span className="text-emerald-400 font-semibold">Fix:</span> Math.floor(Date.now() / 1000)
            </div>
          </div>

          <div className="border border-slate-800/80 rounded-xl p-5 bg-[#0d1017]">
            <div className="font-mono text-xs font-semibold text-rose-400 mb-2">Mistake 02: Markdown Code Block Wrapping</div>
            <h3 className="font-semibold text-white text-base mb-1.5">Wrapping Timestamps in Backticks</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-3">
              Typing <code className="text-slate-300 font-mono">`&lt;t:TIMESTAMP:R&gt;`</code> tells Discord to render an inline code span. Inside code blocks, all entity parsing is disabled, preventing the localized badge from appearing.
            </p>
            <div className="rounded bg-slate-900/80 p-2.5 font-mono text-xs text-slate-300 border border-slate-800">
              <span className="text-emerald-400 font-semibold">Fix:</span> Paste without backticks. Bold (<code className="text-indigo-300 font-mono">**&lt;t:...&gt;**</code>) works!
            </div>
          </div>

          <div className="border border-slate-800/80 rounded-xl p-5 bg-[#0d1017]">
            <div className="font-mono text-xs font-semibold text-rose-400 mb-2">Mistake 03: Webhook Payload Rejection</div>
            <h3 className="font-semibold text-white text-base mb-1.5">Putting &lt;t:...&gt; Inside Embed Footers</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-3">
              Discord webhook embed footers require an ISO-8601 string (e.g. <code className="text-slate-300 font-mono">2026-09-25T20:00:00Z</code>). Putting dynamic tags into the footer causes an immediate <code className="text-rose-400 font-mono">HTTP 400 Bad Request</code>.
            </p>
            <div className="rounded bg-slate-900/80 p-2.5 font-mono text-xs text-slate-300 border border-slate-800">
              <span className="text-emerald-400 font-semibold">Fix:</span> Use &lt;t:...&gt; in description; use ISO-8601 in embed.timestamp.
            </div>
          </div>

          <div className="border border-slate-800/80 rounded-xl p-5 bg-[#0d1017]">
            <div className="font-mono text-xs font-semibold text-rose-400 mb-2">Mistake 04: Client Clock Desynchronization</div>
            <h3 className="font-semibold text-white text-base mb-1.5">Assuming Discord Overrides Device Time</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-3">
              Discord renders timestamps using the viewer&apos;s local operating system clock. If a member&apos;s phone clock is 10 minutes slow, all event timestamps will appear 10 minutes late on their screen.
            </p>
            <div className="rounded bg-slate-900/80 p-2.5 font-mono text-xs text-slate-300 border border-slate-800">
              <span className="text-emerald-400 font-semibold">Fix:</span> Sync device clock with automatic network time (NTP).
            </div>
          </div>
        </div>
      </section>

      {/* Developer Guides Directory */}
      <section className="mt-16 pt-12 border-t border-slate-800/80">
        <h2 className="text-2xl font-bold tracking-tight text-white mb-2">
          Developer Documentation
        </h2>
        <p className="text-sm text-slate-400 mb-8">
          Detailed technical references for Discord bot architects, webhook pipelines, and server admins.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/discord-timestamp-guide"
            className="group rounded-xl border border-slate-800/80 bg-[#0d1017] p-5 hover:border-slate-700 transition-colors"
          >
            <h3 className="font-semibold text-white text-sm group-hover:text-indigo-300 transition-colors mb-1">
              The Complete Timestamp Guide &rarr;
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Syntax rules, seconds vs. milliseconds pitfall, and server announcement templates.
            </p>
          </Link>

          <Link
            href="/discord-timestamp-formats"
            className="group rounded-xl border border-slate-800/80 bg-[#0d1017] p-5 hover:border-slate-700 transition-colors"
          >
            <h3 className="font-semibold text-white text-sm group-hover:text-indigo-300 transition-colors mb-1">
              Format Styles Cheat Sheet &rarr;
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Side-by-side comparison of every flag with rendered output in 12h/24h clocks.
            </p>
          </Link>

          <Link
            href="/unix-timestamp"
            className="group rounded-xl border border-slate-800/80 bg-[#0d1017] p-5 hover:border-slate-700 transition-colors"
          >
            <h3 className="font-semibold text-white text-sm group-hover:text-indigo-300 transition-colors mb-1">
              Unix Epoch Time &amp; Systems &rarr;
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              How POSIX epoch timestamps work and conversion snippets in JS, Python, Go, and PHP.
            </p>
          </Link>

          <Link
            href="/discord-markdown"
            className="group rounded-xl border border-slate-800/80 bg-[#0d1017] p-5 hover:border-slate-700 transition-colors"
          >
            <h3 className="font-semibold text-white text-sm group-hover:text-indigo-300 transition-colors mb-1">
              Discord Markdown &amp; Formatting &rarr;
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bold, italics, headers, code blocks, spoilers, and embedding timestamps in styled text.
            </p>
          </Link>

          <Link
            href="/discord-webhook-timestamps"
            className="group rounded-xl border border-slate-800/80 bg-[#0d1017] p-5 hover:border-slate-700 transition-colors"
          >
            <h3 className="font-semibold text-white text-sm group-hover:text-indigo-300 transition-colors mb-1">
              Webhook Timestamps &amp; Embeds &rarr;
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dynamic timestamp tags in descriptions vs. ISO-8601 strings in embed footers.
            </p>
          </Link>

          <Link
            href="/discord-bot-timestamps"
            className="group rounded-xl border border-slate-800/80 bg-[#0d1017] p-5 hover:border-slate-700 transition-colors"
          >
            <h3 className="font-semibold text-white text-sm group-hover:text-indigo-300 transition-colors mb-1">
              Bot Timestamps in discord.js &amp; Python &rarr;
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Clean implementations using discord.js v14 time() utility and discord.py helpers.
            </p>
          </Link>
        </div>
      </section>

      {/* Featured Blog Articles & Guides */}
      <section className="mt-16 pt-12 border-t border-slate-800/80">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white mb-2">
              Featured Guides &amp; Tutorials
            </h2>
            <p className="text-sm text-slate-400">
              In-depth articles covering Discord scheduling, countdown timers, mobile shortcuts, and webhook bots.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors whitespace-nowrap"
          >
            <span>View All {BLOG_POSTS.length} Articles</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BLOG_POSTS.slice(0, 4).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col justify-between rounded-xl border border-slate-800/80 bg-[#0d1017] p-5 hover:border-indigo-500/50 hover:bg-slate-900/50 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-semibold text-indigo-400 font-mono">
                    {post.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {post.readingTime}
                  </span>
                </div>
                <h3 className="font-semibold text-white text-sm group-hover:text-indigo-300 transition-colors line-clamp-1 mb-1.5">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                <span>By {post.author}</span>
                <span className="text-indigo-400 font-medium group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                  Read Article &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <FaqAccordion items={HOME_FAQS} />
    </div>
  );
}
