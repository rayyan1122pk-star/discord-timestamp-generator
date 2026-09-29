import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DiscordFontGenerator } from "@/components/DiscordFontGenerator";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Discord Font Generator [Copy & Paste Aesthetic Fonts]",
  description:
    "Generate cool, aesthetic Discord fonts for usernames, nicknames, server channels, and bios. 100% free with instant 1-click copy and live chat preview.",
  alternates: { canonical: `${siteConfig.url}/discord-font-generator` },
  openGraph: {
    title: "Discord Font Generator [Copy & Paste Aesthetic Fonts]",
    description:
      "Transform plain text into Small Caps, Bold, Gothic, Cursive, and Monospace Discord fonts. Works across desktop and mobile chat.",
    url: `${siteConfig.url}/discord-font-generator`,
    type: "website",
  },
};

export default function DiscordFontGeneratorPage() {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Discord Font Generator",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Convert plain text into aesthetic Discord fonts using Unicode characters with instant copy and live preview.",
    url: `${siteConfig.url}/discord-font-generator`,
  };

  const faqs = [
    {
      question: "How do Discord fonts work without Nitro?",
      answer:
        "Discord does not allow changing system font families, but it fully renders Unicode mathematical alphanumeric symbols. This tool converts standard English letters into special Unicode glyphs (such as Small Caps, Gothic Fraktur, and Double-Struck) that Discord treats as regular text.",
    },
    {
      question: "Can I use these fonts in Discord channel names?",
      answer:
        "Yes. Unicode font characters like Small Caps (sᴍᴀʟʟ ᴄᴀᴘs) and Bold Sans work in Discord text and voice channel names, category headers, and server nicknames.",
    },
    {
      question: "Are Discord fonts visible on mobile phones?",
      answer:
        "Yes. Standard Unicode characters are supported across modern iOS and Android operating systems, so friends on mobile see the exact same stylish formatting.",
    },
    {
      question: "Can screen readers read aesthetic Discord fonts?",
      answer:
        "Screen readers may spell out mathematical symbols individually. For maximum server accessibility, use decorative fonts primarily for aesthetic accents, nicknames, or badges rather than essential server rules.",
    },
  ];

  return (
    <>
      <JsonLd data={webAppSchema} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <Breadcrumbs
          items={[
            { name: "Discord Font Generator", href: "/discord-font-generator" },
          ]}
        />

        {/* Hero Section */}
        <section className="mb-10 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Discord Font Generator
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            Create aesthetic and fancy fonts for Discord bios, channel titles, usernames, and announcements. Click any font to copy instantly.
          </p>
        </section>

        {/* Interactive Tool Widget */}
        <DiscordFontGenerator />

        {/* Quick Links to Related Tools */}
        <section className="mt-12 p-6 rounded-xl border border-slate-800 bg-[#0d1017] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white">Need an Invisible Discord Name?</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Copy blank Hangul Filler and zero-width characters to make your username or bio completely transparent.
            </p>
          </div>
          <Link
            href="/discord-invisible-name"
            className="px-4 py-2 rounded-lg bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-semibold whitespace-nowrap transition-colors"
          >
            Invisible Name Generator
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
