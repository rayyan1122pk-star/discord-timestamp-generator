import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DiscordSnowflakeTool } from "@/components/DiscordSnowflakeTool";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Discord Snowflake to Timestamp: ID Age Decoder",
  description:
    "Decode any Discord Snowflake ID (User ID, Server ID, Channel ID, Message ID) into its exact creation date and Unix timestamp. Free, instant, and 100% client-side.",
  alternates: { canonical: `${siteConfig.url}/discord-snowflake-to-timestamp` },
  openGraph: {
    title: "Discord Snowflake to Timestamp: ID Age Decoder",
    description:
      "Find the exact creation date of any Discord user account, server, role, or message from its 64-bit Snowflake ID.",
    url: `${siteConfig.url}/discord-snowflake-to-timestamp`,
    type: "website",
  },
};

export default function DiscordSnowflakePage() {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Discord Snowflake to Timestamp Decoder",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Calculate the exact creation date and Unix timestamp of any Discord entity from its Snowflake ID.",
    url: `${siteConfig.url}/discord-snowflake-to-timestamp`,
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Find Discord Account or Server Creation Date from an ID",
    description: "Step-by-step instructions for extracting timestamps from Discord Snowflake IDs.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Copy the Discord ID",
        text: "Enable Developer Mode in Discord settings, right-click any user, server, or channel, and select Copy ID.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Paste into the Decoder",
        text: "Paste the 17 to 20 digit numeric Snowflake ID into the input field.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "View and Copy Creation Date",
        text: "Review the decoded creation timestamp in local time, UTC, and copy the dynamic Discord timestamp code.",
      },
    ],
  };

  const faqs = [
    {
      question: "What is a Discord Snowflake ID?",
      answer:
        "A Discord Snowflake is a unique 64-bit integer assigned to every entity in Discord (users, servers, roles, channels, emojis, and messages). Because Discord IDs are based on Twitter's Snowflake format, the first 42 bits represent the number of milliseconds since the Discord Epoch (January 1, 2015 UTC).",
    },
    {
      question: "How do I find a Discord User ID or Server ID?",
      answer:
        "Open Discord User Settings, go to 'Advanced', and toggle on 'Developer Mode'. Once enabled, you can right-click any user profile, server icon, channel, or message and click 'Copy ID' from the context menu.",
    },
    {
      question: "Can someone change or fake their Discord creation date?",
      answer:
        "No. Discord Snowflake IDs are generated cryptographically by Discord's core backend infrastructure at the exact millisecond of registration. They are immutable and permanently tied to that entity.",
    },
    {
      question: "What is the mathematical formula for Discord Snowflake timestamps?",
      answer:
        "The formula is: timestamp_ms = (snowflake >> 22) + 1420070400000. Dividing the resulting timestamp by 1000 yields the Unix epoch in seconds, which can be formatted as a standard Discord dynamic timestamp tag (<t:TIMESTAMP:f>).",
    },
  ];

  return (
    <>
      <JsonLd data={webAppSchema} />
      <JsonLd data={howToSchema} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <Breadcrumbs
          items={[
            { name: "Snowflake to Timestamp", href: "/discord-snowflake-to-timestamp" },
          ]}
        />

        {/* Hero Section */}
        <section className="mb-10 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Discord Snowflake to Timestamp Decoder
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            Discover the exact creation date, account age, and Unix epoch time of any Discord user, server, channel, or message from its 64-bit Snowflake ID.
          </p>
        </section>

        {/* Platform Compatibility Callout */}
        <div className="mb-8 p-4 rounded-xl border border-slate-800 bg-[#0e121a] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-300">
          <span className="font-semibold text-indigo-400">Desktop & Mobile ID Copying:</span>
          <span className="text-slate-400">Enable Developer Mode in User Settings on Discord desktop or mobile app to right-click or long-press and copy any ID.</span>
        </div>

        {/* Interactive Tool Widget */}
        <DiscordSnowflakeTool />

        {/* Technical Architecture Section */}
        <section className="mt-16 pt-12 border-t border-slate-800/80">
          <h2 className="text-2xl font-bold tracking-tight text-white mb-4">
            How Discord Snowflake IDs Work
          </h2>
          <div className="space-y-4 text-sm text-slate-300 leading-relaxed max-w-3xl">
            <p>
              Unlike traditional auto-incrementing database identifiers (1, 2, 3), Discord uses distributed 64-bit integers called Snowflakes. This architecture guarantees that every ID created across Discord global server clusters is guaranteed unique without requiring centralized database locks.
            </p>
            <p>
              Because the millisecond timestamp occupies the most significant 42 bits of the ID, all Discord IDs are naturally time-sorted. The oldest entities have smaller numbers, and newer accounts have larger numbers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="p-4 rounded-xl border border-slate-800 bg-[#0d1017]">
              <div className="font-mono text-xs font-semibold text-indigo-400 mb-1">Bits 22 to 63 (42 bits)</div>
              <h3 className="font-semibold text-white text-sm mb-1">Milliseconds Timestamp</h3>
              <p className="text-xs text-slate-400">Time elapsed since January 1, 2015 (Discord Epoch: 1420070400000).</p>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-[#0d1017]">
              <div className="font-mono text-xs font-semibold text-indigo-400 mb-1">Bits 17 to 21 (5 bits)</div>
              <h3 className="font-semibold text-white text-sm mb-1">Internal Worker ID</h3>
              <p className="text-xs text-slate-400">Identifies which Discord datacenter node generated the ID.</p>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-[#0d1017]">
              <div className="font-mono text-xs font-semibold text-indigo-400 mb-1">Bits 12 to 16 (5 bits)</div>
              <h3 className="font-semibold text-white text-sm mb-1">Internal Process ID</h3>
              <p className="text-xs text-slate-400">Identifies the specific server thread or process instance.</p>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-[#0d1017]">
              <div className="font-mono text-xs font-semibold text-indigo-400 mb-1">Bits 0 to 11 (12 bits)</div>
              <h3 className="font-semibold text-white text-sm mb-1">Sequence Increment</h3>
              <p className="text-xs text-slate-400">Counts IDs generated within the same millisecond (up to 4,096 IDs/ms).</p>
            </div>
          </div>
        </section>

        {/* Quick Links to Other Tools */}
        <section className="mt-12 p-6 rounded-xl border border-slate-800 bg-[#0d1017] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white">Create Auto-Adjusting Timestamps</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Generate countdowns and dynamic date badges for server announcements.
            </p>
          </div>
          <Link
            href="/"
            className="px-4 py-2 rounded-lg bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-semibold whitespace-nowrap transition-colors"
          >
            Open Timestamp Generator
          </Link>
        </section>

        {/* FAQ Section */}
        <section className="mt-16 pt-12 border-t border-slate-800/80">
          <h2 className="text-2xl font-bold tracking-tight text-white mb-6">
            Frequently Asked Questions
          </h2>
          <FaqAccordion items={faqs} />
        </section>
      </div>
    </>
  );
}
