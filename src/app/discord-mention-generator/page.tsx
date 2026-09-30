import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DiscordMentionGenerator } from "@/components/DiscordMentionGenerator";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Discord Mention Generator: User, Role & Channel",
  description:
    "Generate Discord mention syntax for users, roles, channels, custom emojis, and slash commands using Snowflake IDs. 100% free with 1-click copy.",
  alternates: { canonical: `${siteConfig.url}/discord-mention-generator` },
  openGraph: {
    title: "Discord Mention Generator: User, Role & Channel",
    description:
      "Format Discord mention codes (<@ID>, <@&ID>, <#ID>, <:name:ID>) for bot announcements, webhooks, and channel navigation.",
    url: `${siteConfig.url}/discord-mention-generator`,
    type: "website",
  },
};

export default function DiscordMentionGeneratorPage() {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Discord Mention Generator",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Format raw Discord mention tags for users, roles, channels, custom emojis, and slash commands.",
    url: `${siteConfig.url}/discord-mention-generator`,
  };

  const faqs = [
    {
      question: "How do I find a Discord user, role, or channel ID?",
      answer:
        "Open Discord Settings -> Advanced -> enable 'Developer Mode'. Once enabled, you can right-click any user, role, channel, or custom emoji in Discord and select 'Copy ID' to obtain its 18 to 19 digit Snowflake identifier.",
    },
    {
      question: "What is the syntax to mention a role in Discord?",
      answer:
        "The syntax to mention a Discord role is <@&ROLE_ID>. For example, <@&104523485728394857>. When posted in chat, Discord renders this as a highlighted role ping.",
    },
    {
      question: "How do I format custom server emojis in webhooks or bot messages?",
      answer:
        "Static server emojis use the syntax <:emoji_name:EMOJI_ID>. Animated Nitro emojis use <a:emoji_name:EMOJI_ID>. The bot or webhook sending the message must have access to the server where the emoji is hosted.",
    },
    {
      question: "How do I create a clickable channel link in Discord?",
      answer:
        "Channel links use the syntax <#CHANNEL_ID>. For example, <#104523485728394857> creates a clickable link directly to that channel in your server.",
    },
  ];

  return (
    <>
      <JsonLd data={webAppSchema} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <Breadcrumbs
          items={[
            { name: "Discord Mention Generator", href: "/discord-mention-generator" },
          ]}
        />

        {/* Hero Section */}
        <section className="mb-10 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Discord Mention & Emoji Generator
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            Format raw mention codes for Discord users, roles, server channels, custom emojis, and slash commands. Copy directly into bots or webhook payloads.
          </p>
        </section>

        {/* Interactive Tool Widget */}
        <DiscordMentionGenerator />

        {/* Quick Links to Related Tools */}
        <section className="mt-12 p-6 rounded-xl border border-slate-800 bg-[#0d1017] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white">Need to Inspect a Snowflake ID?</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Decode any Discord 64-bit Snowflake ID into its exact creation date, timestamp, and worker numbers.
            </p>
          </div>
          <Link
            href="/discord-snowflake-to-timestamp"
            className="px-4 py-2 rounded-lg bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-semibold whitespace-nowrap transition-colors"
          >
            Snowflake Decoder
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
