import React from "react";
import type { Metadata } from "next";
import { Palette, Sparkles, HelpCircle, Copy } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqAccordion, FaqItem } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { DiscordColorConverter } from "@/components/DiscordColorConverter";
import { siteConfig } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Discord Color Converter: Hex to Decimal Embed Tool",
  description:
    "Convert between HEX, Decimal integer, and RGB for Discord bot embeds and webhooks. Includes official Blurple, role colors, and code generators.",
  alternates: {
    canonical: `${siteConfig.url}/discord-color-converter`,
  },
  openGraph: {
    title: "Discord Color Converter: Hex to Decimal Embed Tool",
    description:
      "Interactive Discord color converter: convert Hex to Decimal for bot embeds, discord.js, and python with live Discord dark mode preview.",
    url: `${siteConfig.url}/discord-color-converter`,
    siteName: siteConfig.shortName,
    images: [`${siteConfig.url}/og-image.png`],
  },
};

const COLOR_FAQS: FaqItem[] = [
  {
    question: "What is a Discord Decimal color?",
    answer:
      "Discord embeds do not accept HEX color strings like #5865F2 in the REST API. Instead, Discord requires a 24-bit base-10 integer (decimal). For example, Discord Blurple (#5865F2) converts to the decimal integer 5793266.",
  },
  {
    question: "How do you calculate Discord decimal color from HEX?",
    answer:
      "Strip the pound sign (#) and convert the red, green, and blue hex channels into an integer using (R << 16) + (G << 8) + B. In JavaScript, you can run parseInt(hex.replace('#', ''), 16).",
  },
  {
    question: "What are the official Discord brand color HEX and Decimal values?",
    answer:
      "Official Discord Blurple is #5865F2 (Decimal: 5793266), Success Green is #57F287 (Decimal: 5763719), Warning Yellow is #FEE75C (Decimal: 16705372), Nitro Fuchsia is #EB459E (Decimal: 15418782), and Danger Red is #ED4245 (Decimal: 15548997).",
  },
  {
    question: "How do I set embed colors in discord.js and discord.py?",
    answer:
      "In discord.js v14, use new EmbedBuilder().setColor(0x5865F2) or pass the decimal number 5793266. In discord.py, use discord.Embed(color=discord.Color.from_rgb(88, 101, 242)) or discord.Color(0x5865F2).",
  },
];

export default function DiscordColorConverterPage() {
  const pageSchema = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Discord Color and Decimal Converter",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "Convert colors between HEX, Discord API Decimal integers, and RGB for Discord bot embeds, webhooks, and server roles.",
      url: `${siteConfig.url}/discord-color-converter`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: COLOR_FAQS.map((faq) => ({
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <JsonLd data={pageSchema} />

      <Breadcrumbs
        items={[
          { name: "Color Converter", href: "/discord-color-converter" },
        ]}
      />

      {/* Hero Header */}
      <section className="mb-8 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-medium text-indigo-400 mb-3">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          <span>Discord Embed & API Standards</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
          Discord Color & Decimal Converter
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed text-pretty">
          Convert HEX color codes to Discord API decimal integers with real-time chat embed preview, official brand presets, and discord.js and python snippets.
        </p>
      </section>

      {/* AEO: Direct Answer Snippet Box */}
      <div className="mb-8 p-4 rounded-xl border border-indigo-950/70 bg-gradient-to-r from-indigo-950/30 to-slate-900/40 text-xs text-slate-300">
        <strong className="text-white block mb-1">Quick Answer: Discord Embed Colors</strong>
        Discord bot embeds and webhook JSON payloads require a 24-bit decimal integer instead of standard HEX strings. For example, Blurple (#5865F2) converts to 5793266. You can calculate it with parseInt(hex.replace(&quot;#&quot;, &quot;&quot;), 16) or pass raw hexadecimal literals (0x5865F2).
      </div>

      {/* Interactive Tool Component */}
      <section className="mb-16">
        <DiscordColorConverter />
      </section>

      {/* Desktop & Mobile Instructions */}
      <section className="mb-16 p-6 rounded-2xl border border-slate-800 bg-[#0d1017]">
        <h2 className="text-xl font-bold text-white mb-3">How to Use Discord Embed Colors on Desktop & Mobile</h2>
        <p className="text-sm text-slate-300 leading-relaxed mb-4">
          When configuring bot embeds via discord.js, discord.py, or custom webhooks, pass the 24-bit decimal integer into the <code>color</code> parameter. The resulting embed border color renders identically on <strong>desktop (PC / Mac / Web Browser)</strong> and <strong>mobile (iOS & Android phone)</strong> Discord apps. Use the 1-click copy code buttons to export the exact format for your developer stack.
        </p>
      </section>

      {/* FAQ Section */}
      <section className="mt-16 pt-10 border-t border-slate-800/80 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Learn how Discord embeds handle colors and decimal integers.
          </p>
        </div>
        <FaqAccordion items={COLOR_FAQS} />
      </section>
    </div>
  );
}
