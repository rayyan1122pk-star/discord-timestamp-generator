import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DiscordCharacterCounter } from "@/components/DiscordCharacterCounter";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Discord Character Counter [Message, Nitro, Bio & Embed Limits]",
  description:
    "Check character count for Discord messages, Nitro chats, profile bios, server nicknames, and embed fields. Live limit checks with instant feedback.",
  alternates: { canonical: `${siteConfig.url}/discord-character-counter` },
  openGraph: {
    title: "Discord Character Counter [Message, Nitro, Bio & Embed Limits]",
    description:
      "Verify Discord character limits in real time. Avoid 'Your message is too long' errors for messages, bios, nicknames, and webhook embeds.",
    url: `${siteConfig.url}/discord-character-counter`,
    type: "website",
  },
};

export default function DiscordCharacterCounterPage() {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Discord Character Counter",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Real-time character counter and limit checker for Discord messages, server nicknames, user bios, and webhook payloads.",
    url: `${siteConfig.url}/discord-character-counter`,
  };

  const faqs = [
    {
      question: "What is the Discord character limit for regular chat messages?",
      answer:
        "The standard Discord chat character limit is exactly 2,000 characters per message for standard accounts. If your message exceeds 2,000 characters, Discord will block you from sending it or offer to convert it into a .txt file upload.",
    },
    {
      question: "What is the message limit for Discord Nitro subscribers?",
      answer:
        "Discord Nitro subscribers have an increased limit of 4,000 characters per message, allowing twice the text capacity of a standard message.",
    },
    {
      question: "What is the character limit for a Discord user bio?",
      answer:
        "Discord profile bios (the 'About Me' section) are strictly limited to 190 characters. Spaces, line breaks, and emojis all count toward this 190-character ceiling.",
    },
    {
      question: "How long can a Discord server nickname be?",
      answer:
        "Server nicknames and account display names have a maximum limit of 32 characters.",
    },
    {
      question: "What are the limits for Discord webhook embeds?",
      answer:
        "Discord embeds have individual limits: Title (256 characters), Description (4,096 characters), Field Name (256 characters), Field Value (1,024 characters), and Footer (2,048 characters). The combined total character count across all embed structures cannot exceed 6,000 characters.",
    },
  ];

  return (
    <>
      <JsonLd data={webAppSchema} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <Breadcrumbs
          items={[
            { name: "Discord Character Counter", href: "/discord-character-counter" },
          ]}
        />

        {/* Hero Section */}
        <section className="mb-10 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Discord Character Counter
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            Verify message lengths against Discord 2,000 character and Nitro 4,000 character boundaries. Includes bio and embed field limit indicators.
          </p>
        </section>

        {/* Interactive Tool Widget */}
        <DiscordCharacterCounter />

        {/* Quick Links to Related Tools */}
        <section className="mt-12 p-6 rounded-xl border border-slate-800 bg-[#0d1017] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white">Need to Build a Discord Embed?</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Design custom webhook embeds with color pickers, titles, author icons, and field structures.
            </p>
          </div>
          <Link
            href="/discord-embed-generator"
            className="px-4 py-2 rounded-lg bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-semibold whitespace-nowrap transition-colors"
          >
            Open Embed Maker
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
