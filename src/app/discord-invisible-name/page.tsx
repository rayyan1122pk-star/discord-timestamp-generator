import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DiscordInvisibleNameTool } from "@/components/DiscordInvisibleNameTool";
import { FaqAccordion, FaqItem } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { routeMetadataMap, siteConfig } from "@/lib/seo-config";
import { ArrowRight, ShieldCheck, Sparkles, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: routeMetadataMap.invisibleName.title,
  description: routeMetadataMap.invisibleName.description,
  alternates: { canonical: routeMetadataMap.invisibleName.canonical },
  openGraph: {
    title: routeMetadataMap.invisibleName.title,
    description: routeMetadataMap.invisibleName.description,
    url: routeMetadataMap.invisibleName.canonical,
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Discord Invisible Name Generator Interface",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: routeMetadataMap.invisibleName.title,
    description: routeMetadataMap.invisibleName.description,
    images: [`${siteConfig.url}/og-image.png`],
  },
};

const INVISIBLE_FAQS: FaqItem[] = [
  {
    question: "Why does Discord block standard spacebar spaces in names?",
    answer:
      "Discord's input validator trims whitespace at the start and end of names to prevent accidental spaces. If your name contains only spaces, Discord treats it as empty and prevents saving. The Hangul Filler character (U+3164) bypasses this because it is classified by Unicode as a standard letter character, while rendering completely blank.",
  },
  {
    question: "Can I use an invisible name on my primary @username?",
    answer:
      "No. Discord handles (@username) must consist of 2 to 32 alphanumeric characters, underscores, and periods. However, your Display Name (which everyone sees in chat, member lists, and voice channels) and Server Nicknames fully support invisible Unicode characters.",
  },
  {
    question: "Can I get banned for using an invisible name or nickname in Discord?",
    answer:
      "Using invisible characters does not violate Discord Terms of Service. However, individual Discord server administrators may set custom rules requiring visible names so moderators can ping you. Always check your server rules before changing your nickname.",
  },
  {
    question: "Does this invisible name character work on Discord mobile?",
    answer:
      "Yes. The Hangul Filler character renders completely blank across all Discord platforms: desktop (Windows, macOS, Linux), web browser, and mobile apps (iOS and Android).",
  },
  {
    question: "How do I send a completely blank message in Discord chat?",
    answer:
      "Click the Copy Blank Message button above, paste the zero-width character into Discord chat, and press Enter. Discord sends the message without showing any visible text.",
  },
];

export default function DiscordInvisibleNamePage() {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Discord Invisible Name & Blank Character Generator",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: routeMetadataMap.invisibleName.description,
    url: routeMetadataMap.invisibleName.canonical,
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Set an Invisible Name on Discord",
    description: "Step-by-step tutorial on copying and applying a blank character to your Discord profile.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Copy the Invisible Character",
        text: "Click the Copy Invisible Name button to copy the Unicode Hangul Filler (U+3164) character.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Open Discord Profiles",
        text: "Navigate to User Settings > Profiles on desktop or tap your profile avatar on mobile.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Paste into Display Name",
        text: "Clear your current display name, paste the copied invisible character, and save changes.",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: INVISIBLE_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={webAppSchema} />
      <JsonLd data={howToSchema} />
      <JsonLd data={faqSchema} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <Breadcrumbs
          items={[
            { name: "Invisible Name Generator", href: "/discord-invisible-name" },
          ]}
        />

        {/* Hero Section */}
        <section className="mb-10 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Discord Invisible Name Generator
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            Copy the verified blank character to set an invisible display name, empty server nickname, or send blank messages in Discord chat.
          </p>
        </section>

        {/* The Interactive Tool Component */}
        <DiscordInvisibleNameTool />

        {/* Editorial Guide Section */}
        <section className="mt-16 pt-12 border-t border-slate-800/80 max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-white mb-4">
            How Discord Invisible Names Work (Unicode U+3164)
          </h2>
          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              When Discord transitioned to its unique username system, they separated your underlying unique handle (such as <code className="text-indigo-300 font-mono">@rayyandev</code>) from your public <strong>Display Name</strong> and <strong>Server Nickname</strong>.
            </p>
            <p>
              If you try to type spaces with your spacebar, Discord automatically rejects it with an error saying your name cannot be empty. This happens because Discord strips leading and trailing ASCII space characters (<code className="text-indigo-300 font-mono">U+0020</code>).
            </p>
            <p>
              The solution is the <strong>Hangul Filler character</strong> (<code className="text-indigo-300 font-mono">U+3164</code>). In the official Unicode database, this character is categorized as a letter, not whitespace. Because Discord recognizes it as a valid typographic letter, it bypasses the empty name filter while rendering completely invisible to other users on Discord desktop, browser, and mobile apps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="p-4 rounded-xl border border-slate-800 bg-[#0e121a]">
              <div className="flex items-center gap-2 text-white font-semibold text-sm mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Client-Side Copy</span>
              </div>
              <p className="text-xs text-slate-400">
                The character is copied directly to your device clipboard with zero external trackers or API dependencies.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-800 bg-[#0e121a]">
              <div className="flex items-center gap-2 text-white font-semibold text-sm mb-1">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Full Cross-Platform Support</span>
              </div>
              <p className="text-xs text-slate-400">
                Verified to work on Windows, macOS, Linux, iOS, Android, and Discord Web clients in 2026.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mt-16 pt-12 border-t border-slate-800/80">
          <h2 className="text-2xl font-bold tracking-tight text-white mb-6">
            Frequently Asked Questions
          </h2>
          <FaqAccordion items={INVISIBLE_FAQS} />
        </section>

        {/* Related Discord Tools Links */}
        <section className="mt-16 pt-12 border-t border-slate-800/80">
          <h2 className="text-xl font-bold text-white mb-6">
            Explore More Discord Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/"
              className="p-4 rounded-xl border border-slate-800 bg-[#0e121a] hover:border-indigo-500/50 hover:bg-slate-850/50 transition-all group"
            >
              <div className="font-semibold text-sm text-white group-hover:text-indigo-300 flex items-center justify-between">
                <span>Timestamp Generator</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-slate-400 mt-1">Dynamic time badges with auto timezone</p>
            </Link>

            <Link
              href="/discord-colored-text"
              className="p-4 rounded-xl border border-slate-800 bg-[#0e121a] hover:border-indigo-500/50 hover:bg-slate-850/50 transition-all group"
            >
              <div className="font-semibold text-sm text-white group-hover:text-indigo-300 flex items-center justify-between">
                <span>Colored Text</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-slate-400 mt-1">ANSI color codeblocks with live preview</p>
            </Link>

            <Link
              href="/discord-glitch-text"
              className="p-4 rounded-xl border border-slate-800 bg-[#0e121a] hover:border-indigo-500/50 hover:bg-slate-850/50 transition-all group"
            >
              <div className="font-semibold text-sm text-white group-hover:text-indigo-300 flex items-center justify-between">
                <span>Glitch & Zalgo Text</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-slate-400 mt-1">Cursed font maker with intensity controls</p>
            </Link>

            <Link
              href="/discord-embed-generator"
              className="p-4 rounded-xl border border-slate-800 bg-[#0e121a] hover:border-indigo-500/50 hover:bg-slate-850/50 transition-all group"
            >
              <div className="font-semibold text-sm text-white group-hover:text-indigo-300 flex items-center justify-between">
                <span>Embed Generator</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-slate-400 mt-1">Visual webhook builder with dark preview</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
