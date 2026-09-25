import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Globe2 } from "lucide-react";
import { TimestampGenerator } from "@/components/TimestampGenerator";
import { FaqAccordion, FaqItem } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/seo-config";

const HOME_FAQS: FaqItem[] = [
  {
    question: "What is a Discord timestamp?",
    answer:
      "A Discord timestamp is a formatted code snippet written in the format <t:TIMESTAMP:STYLE>, where TIMESTAMP is a 10-digit Unix Epoch integer (seconds since January 1, 1970 UTC) and STYLE is an optional single-letter display flag. When sent in a Discord message, channel topic, or forum post, Discord automatically calculates and displays the date and time in each individual user's local timezone.",
  },
  {
    question: "Why should I use dynamic timestamps instead of typing regular time?",
    answer:
      "When you type 'Event starts at 8:00 PM EST', international members in London, Tokyo, Berlin, or Sydney must manually calculate timezone conversions and account for daylight saving changes. Dynamic timestamps eliminate all confusion because Discord's client recalculates the display according to the viewer's device clock.",
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
      "Yes. 100% of calculations happen locally inside your web browser using client-side JavaScript. No dates, times, or personal data are ever transmitted to or stored on our servers.",
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd data={pageSchema} />

      {/* Hero Header Section */}
      <section className="mb-8 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5865F2]/10 border border-[#5865F2]/25 text-[#7289da] text-xs font-semibold uppercase tracking-wider mb-4">
          <Globe2 className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Automatic Worldwide Timezone Sync</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white text-balance leading-tight">
          Discord Timestamp Generator &amp; Time Formatter
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed text-pretty">
          Generate dynamic Discord timestamps that automatically adjust to every viewer&apos;s local
          clock. Select your event time, preview how Discord renders it, and copy the code with one click.
        </p>
      </section>

      {/* The Core Interactive Product Tool */}
      <TimestampGenerator />

      {/* AEO / GEO Direct Answer Section */}
      <section className="mt-14 pt-10 border-t border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-3">
              How Do Discord Dynamic Timestamps Work?
            </h2>
            <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
              <p>
                Discord dynamic timestamps are special text tokens formatted as{" "}
                <code className="px-1.5 py-0.5 rounded bg-slate-800 text-indigo-300 font-mono text-xs">
                  &lt;t:TIMESTAMP:STYLE&gt;
                </code>
                . Instead of sending a static time string like &ldquo;8 PM EST&rdquo;, you send the universal
                Unix epoch timestamp in seconds.
              </p>
              <p>
                When any Discord user views the message—whether on desktop, iOS, Android, or web—the
                Discord app queries the user&apos;s local operating system clock and displays the exact
                equivalent time in their local timezone and regional 12h/24h format.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/discord-timestamp-guide"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
              >
                <span>Read the Complete Timestamp Guide</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <Link
                href="/discord-timestamp-formats"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
              >
                <span>Explore All 7 Format Flags</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Key Advantages Bento */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
              <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-2.5">
                <Globe2 className="h-4 w-4" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-white text-sm">Zero Timezone Math</h3>
              <p className="text-xs text-slate-400 mt-1">
                Never calculate UTC offsets or daylight saving shifts again. Discord handles it instantly.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2.5">
                <Zap className="h-4 w-4" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-white text-sm">Live Countdowns</h3>
              <p className="text-xs text-slate-400 mt-1">
                The <code className="font-mono">:R</code> flag updates dynamically in chat as time elapses without editing the message.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
              <div className="h-8 w-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-2.5">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-white text-sm">Works Everywhere</h3>
              <p className="text-xs text-slate-400 mt-1">
                Fully supported in direct messages, group chats, server channels, channel topics, and bot embeds.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
              <div className="h-8 w-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-2.5">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-white text-sm">100% Client-Side</h3>
              <p className="text-xs text-slate-400 mt-1">
                Your selected dates and times remain private in your browser. Zero server logging.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Instructions */}
      <section className="mt-14 rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/40 to-[#0e121a] p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
          How to Use Discord Timestamps in 3 Simple Steps
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mb-6">
          Follow these quick steps to schedule gaming sessions, server meetings, or tournament deadlines.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-slate-800/80 bg-slate-900/80 p-5">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#5865F2] font-bold text-xs text-white">
                1
              </span>
              <h3 className="font-semibold text-white text-sm">Pick Date &amp; Time</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Use our interactive date and time pickers above. The tool automatically detects your current
              timezone so you don&apos;t have to do any mental conversion.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800/80 bg-slate-900/80 p-5">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#5865F2] font-bold text-xs text-white">
                2
              </span>
              <h3 className="font-semibold text-white text-sm">Choose Your Style Flag</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Select how you want Discord to render your time. Choose Relative Time (
              <code className="font-mono text-indigo-300">:R</code>) for countdowns or Long Date/Time (
              <code className="font-mono text-indigo-300">:F</code>) for formal schedules.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800/80 bg-slate-900/80 p-5">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#5865F2] font-bold text-xs text-white">
                3
              </span>
              <h3 className="font-semibold text-white text-sm">Paste into Discord</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Hit &ldquo;Copy Code&rdquo; and paste the resulting{" "}
              <code className="font-mono text-indigo-300">&lt;t:EPOCH:STYLE&gt;</code> snippet directly into
              any Discord message. Discord will immediately render it in the reader&apos;s local time.
            </p>
          </div>
        </div>
      </section>

      {/* Internal Linking Hub */}
      <section className="mt-14">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
          Developer Guides &amp; Documentation
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mb-6">
          Everything you need to master Discord Markdown, Unix timestamps, bot builders, and webhook integrations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/discord-timestamp-guide"
            className="group rounded-xl border border-slate-800 bg-slate-900/40 p-5 hover:border-indigo-500/50 hover:bg-slate-800/40 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                Beginner to Advanced
              </span>
              <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
            </div>
            <h3 className="font-semibold text-white text-sm group-hover:text-indigo-300 transition-colors">
              The Complete Discord Timestamp Guide
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Learn the full syntax rules, avoid the 13-digit millisecond error, and discover server announcement tips.
            </p>
          </Link>

          <Link
            href="/discord-timestamp-formats"
            className="group rounded-xl border border-slate-800 bg-slate-900/40 p-5 hover:border-indigo-500/50 hover:bg-slate-800/40 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                Cheat Sheet
              </span>
              <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
            </div>
            <h3 className="font-semibold text-white text-sm group-hover:text-indigo-300 transition-colors">
              Format Styles: t, T, d, D, f, F, R
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Side-by-side comparison of every Discord format flag with rendered previews and use-case recommendations.
            </p>
          </Link>

          <Link
            href="/unix-timestamp"
            className="group rounded-xl border border-slate-800 bg-slate-900/40 p-5 hover:border-indigo-500/50 hover:bg-slate-800/40 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                Technical Deep Dive
              </span>
              <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
            </div>
            <h3 className="font-semibold text-white text-sm group-hover:text-indigo-300 transition-colors">
              Unix Epoch Timestamp Explained
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              How seconds since Jan 1, 1970 UTC prevent timezone bugs, and how to convert epoch times across programming languages.
            </p>
          </Link>

          <Link
            href="/discord-markdown"
            className="group rounded-xl border border-slate-800 bg-slate-900/40 p-5 hover:border-indigo-500/50 hover:bg-slate-800/40 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                Chat Styling
              </span>
              <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
            </div>
            <h3 className="font-semibold text-white text-sm group-hover:text-indigo-300 transition-colors">
              Discord Markdown &amp; Text Formatting
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Bold, italics, spoiler tags, headers, blockquotes, syntax highlighting, and embedding timestamps in stylized text.
            </p>
          </Link>

          <Link
            href="/discord-webhook-timestamps"
            className="group rounded-xl border border-slate-800 bg-slate-900/40 p-5 hover:border-indigo-500/50 hover:bg-slate-800/40 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                API &amp; Webhooks
              </span>
              <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
            </div>
            <h3 className="font-semibold text-white text-sm group-hover:text-indigo-300 transition-colors">
              Discord Webhook Timestamps &amp; Embeds
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              How to send timestamps in webhook payloads, embed descriptions, fields, and ISO-8601 footer timestamps.
            </p>
          </Link>

          <Link
            href="/discord-bot-timestamps"
            className="group rounded-xl border border-slate-800 bg-slate-900/40 p-5 hover:border-indigo-500/50 hover:bg-slate-800/40 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                Bot Developers
              </span>
              <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
            </div>
            <h3 className="font-semibold text-white text-sm group-hover:text-indigo-300 transition-colors">
              Discord Bot Timestamps (JS &amp; Python)
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Build type-safe timestamps with discord.js v14 time() utility, TimestampStyles, and python discord.py helpers.
            </p>
          </Link>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <FaqAccordion items={HOME_FAQS} />
    </div>
  );
}
