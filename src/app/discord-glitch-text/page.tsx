import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DiscordGlitchEditor } from "@/components/DiscordGlitchEditor";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/seo-config";
import { Sparkles, Terminal, Code2, Shield, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Discord Glitch Text Generator [Zalgo & Corrupted Font Maker]",
  description:
    "Generate glitched, corrupted, and cursed Zalgo text for Discord usernames, channels, and messages. Features intensity sliders, direction controls, and live chat preview.",
  alternates: { canonical: `${siteConfig.url}/discord-glitch-text` },
  openGraph: {
    title: "Discord Glitch Text Generator [Zalgo & Corrupted Font Maker]",
    description:
      "Transform normal words into dripping void, glitch, and cursed Zalgo fonts for Discord nicknames, roles, and chat messages. 100% free and client-side.",
    url: `${siteConfig.url}/discord-glitch-text`,
    type: "website",
  },
};

export default function DiscordGlitchTextPage() {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Discord Glitch Text Generator",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Client-side Zalgo glitch text maker with real-time Discord chat preview and nickname character limit safety.",
    url: `${siteConfig.url}/discord-glitch-text`,
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Make Glitch Text in Discord",
    description: "Step-by-step instructions for creating corrupted Zalgo text and using it in Discord chat, nicknames, and channels.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Enter Your Text",
        text: "Type your nickname, word, or sentence into the input box.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Adjust Glitch Intensity",
        text: "Use the slider to choose between subtle glitch accents, heavy void corruption, or maximum chaos.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Copy and Paste into Discord",
        text: "Click Copy Glitch Text and paste it directly into Discord messages, server nicknames, or role titles.",
      },
    ],
  };

  const faqs = [
    {
      question: "How does glitch / Zalgo text work in Discord?",
      answer:
        "Glitch text relies on Unicode combining diacritical marks (Unicode range U+0300 to U+036F). Instead of rendering as separate characters, these special glyphs stack directly above, through, and below preceding letters. Discord's text rendering engine natively supports Unicode, allowing the stacked marks to produce a dripping, corrupted aesthetic.",
    },
    {
      question: "Will glitch text get my Discord account banned?",
      answer:
        "No. Using combining marks is completely valid Unicode and does not violate Discord Terms of Service. However, server moderators may enforce local server rules against excessive glitch text if it disrupts channel readability or causes visual overlap with neighboring messages.",
    },
    {
      question: "Why does Discord say my nickname is too long when I paste glitch text?",
      answer:
        "Discord enforces a strict 32-character limit on server nicknames. Because every combining mark counts as an individual Unicode codepoint, a 5-letter word with high glitch intensity can contain 40 or more codepoints. Use the Subtle Glitch preset (Intensity 1 to 2) to keep your nickname under the 32-character ceiling.",
    },
    {
      question: "Does glitch text work on Discord Mobile (iOS and Android)?",
      answer:
        "Yes. Both the iOS and Android Discord applications render Unicode combining marks. On mobile devices, extreme vertical stacking is gently clamped by the operating system text renderer to prevent UI clipping.",
    },
    {
      question: "Can I use glitch text in Discord channel names?",
      answer:
        "Yes! Discord text channels support lowercase Unicode characters and combining marks up to 100 characters in length. Server channels for Halloween events, horror games, or secret lore often use glitched titles for atmosphere.",
    },
  ];

  return (
    <>
      <JsonLd data={webAppSchema} />
      <JsonLd data={howToSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Breadcrumbs items={[{ name: "Glitch Text Generator", href: "/discord-glitch-text" }]} />

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-800/60 text-indigo-300 text-xs font-medium mb-4">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span>Unicode Combining Mark Visualizer</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Discord Glitch Text Generator
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Convert normal text into corrupted, dripping Zalgo and hacker glitch fonts. Perfect for Discord
            nicknames, role names, server channel titles, and spooky announcements with live chat preview.
          </p>
        </div>

        {/* Interactive Glitch Editor */}
        <DiscordGlitchEditor />

        {/* Informational Guides & Technical Specs */}
        <div className="mt-16 space-y-12">
          {/* Section: How Combining Diacritics Work */}
          <div className="rounded-2xl border border-slate-800 bg-[#0e121a] p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
              <Terminal className="h-5 w-5 text-indigo-400" />
              <span>How Unicode Glitch & Zalgo Text Works</span>
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Unlike fonts that require custom font files or CSS downloads, Zalgo text is 100% plain text. It works by
              stacking multiple <strong>Unicode Combining Diacritical Marks</strong> onto base characters.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Upward Marks</div>
                <h3 className="text-sm font-semibold text-white mb-1.5">Ascending Glitch</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Characters like combining tildes, grave accents, and carons stack above uppercase and lowercase letters,
                  creeping toward the message line above.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Center Marks</div>
                <h3 className="text-sm font-semibold text-white mb-1.5">Corrupted Overlays</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Combining short strokes, slashes, and overlays cut horizontally through letters to mimic damaged CRT monitors
                  and data packet corruption.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Downward Marks</div>
                <h3 className="text-sm font-semibold text-white mb-1.5">Dripping Void</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Combining ogoneks, cedillas, and lower dots descend into lower margins, creating the iconic horror creepypasta
                  dripping font appearance.
                </p>
              </div>
            </div>
          </div>

          {/* Section: Where to Use in Discord */}
          <div className="rounded-2xl border border-slate-800 bg-[#0e121a] p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
              <Info className="h-5 w-5 text-indigo-400" />
              <span>Where to Use Glitch Text in Discord</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <h3 className="text-sm font-semibold text-white">Server Nicknames</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Set a glitched server profile display name. Keep intensity low (level 1 to 2) so your total Unicode character
                  count stays under Discord&apos;s 32-character maximum.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <h3 className="text-sm font-semibold text-white">Role Names</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Create stylized server hierarchy roles like <span className="font-mono text-indigo-300">C̶O̶R̶E̶-̶O̶P̶S̶</span> or{" "}
                  <span className="font-mono text-indigo-300">A̶D̶M̶I̶N̶</span> to stand out in member sidebars.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <h3 className="text-sm font-semibold text-white">Channel Names</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Decorate text and voice channels for ARG mysteries, Halloween seasons, or quarantine zones. Supports up to
                  100 total characters.
                </p>
              </div>
            </div>
          </div>

          {/* Section: Related Formatting Utilities */}
          <div className="rounded-2xl border border-slate-800 bg-[#0e121a] p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Code2 className="h-5 w-5 text-indigo-400" />
              <span>Combine with Other Discord Utilities</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/discord-embed-generator"
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 transition-colors group"
              >
                <h3 className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors mb-1">
                  Embed Generator
                </h3>
                <p className="text-xs text-slate-400">
                  Build rich Discord webhook embeds with live dark-mode chat cards.
                </p>
              </Link>

              <Link
                href="/discord-colored-text"
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 transition-colors group"
              >
                <h3 className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors mb-1">
                  Colored Text Maker
                </h3>
                <p className="text-xs text-slate-400">
                  Format ANSI colored messages and backgrounds for Discord codeblocks.
                </p>
              </Link>

              <Link
                href="/"
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 transition-colors group"
              >
                <h3 className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors mb-1">
                  Timestamp Generator
                </h3>
                <p className="text-xs text-slate-400">
                  Generate local dynamic timestamps with live countdowns.
                </p>
              </Link>

              <Link
                href="/discord-snowflake-to-timestamp"
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 transition-colors group"
              >
                <h3 className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors mb-1">
                  Snowflake ID Decoder
                </h3>
                <p className="text-xs text-slate-400">
                  Decode any Discord user, message, or server ID into creation dates.
                </p>
              </Link>
            </div>
          </div>

          {/* Privacy Guarantee */}
          <div className="rounded-xl border border-slate-800 bg-[#0e121a]/60 p-5 flex items-start gap-4">
            <Shield className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-white block mb-1">100% Client-Side Privacy Guarantee</strong>
              This glitch text generator runs exclusively in your local web browser. Your typed text and generated combinations
              are never transmitted or saved to external databases.
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="rounded-2xl border border-slate-800 bg-[#0e121a] p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
              Frequently Asked Questions About Glitch & Zalgo Text
            </h2>
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </div>
    </>
  );
}
