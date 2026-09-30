import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CodeBlock } from "@/components/CodeBlock";
import { DiscordAnsiEditor } from "@/components/DiscordAnsiEditor";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Discord Colored Text Generator: ANSI Codeblocks",
  description:
    "Generate colored text in Discord using ANSI codeblocks. Features visual color picker, background highlights, bold, underline, live chat preview, and 1-click copy.",
  alternates: { canonical: `${siteConfig.url}/discord-colored-text` },
  openGraph: {
    title: "Discord Colored Text Generator: ANSI Codeblocks",
    description:
      "Create vibrant colored text messages in Discord with ANSI formatting. 100% free, client-side, and works across desktop and web Discord clients.",
    url: `${siteConfig.url}/discord-colored-text`,
    type: "website",
  },
};

export default function DiscordColoredTextPage() {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Discord Colored Text Generator",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Generate colored text in Discord using ANSI codeblocks with real-time preview and 1-click copy.",
    url: `${siteConfig.url}/discord-colored-text`,
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Make Colored Text in Discord",
    description: "Step-by-step instructions for sending colored text in Discord chat using ANSI escape codes.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Type Your Message",
        text: "Enter your announcement or message text into the editor input area.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Select Colors and Styles",
        text: "Pick your text color (Red, Green, Yellow, Blue, Pink, Cyan) and optional background highlight.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Copy and Paste ANSI Block",
        text: "Click Copy ANSI Block and paste the entire codeblock into any Discord channel.",
      },
    ],
  };

  const faqs = [
    {
      question: "How does colored text work in Discord?",
      answer:
        "Discord supports ANSI escape sequences inside codeblocks denoted with the 'ansi' syntax language identifier (```ansi ... ```). By wrapping text in specific ANSI terminal color codes, Discord's desktop and web clients render the text with custom foreground and background colors.",
    },
    {
      question: "Does colored text work on Discord Mobile (iOS and Android)?",
      answer:
        "ANSI colored text renders natively on Discord Desktop (Windows, macOS, Linux) and Discord Web. On some mobile app versions, text inside codeblocks may render in standard monospaced white font depending on Discord's mobile markdown engine release.",
    },
    {
      question: "What colors are supported in Discord?",
      answer:
        "Discord supports 8 foreground text colors: Dark Gray (30), Red (31), Green (32), Yellow (33), Blue (34), Pink/Magenta (35), Cyan (36), and Bright White (37). It also supports 8 background highlight colors and bold/underline text styles.",
    },
    {
      question: "Can I combine colored text with Discord dynamic timestamps?",
      answer:
        "No. Dynamic timestamps (<t:TIMESTAMP:STYLE>) require Discord's entity parser, which is intentionally disabled inside codeblocks. Keep timestamps outside codeblocks for auto-adjusting time badges, and use ANSI codeblocks for colored banners and announcements.",
    },
  ];

  return (
    <>
      <JsonLd data={webAppSchema} />
      <JsonLd data={howToSchema} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <Breadcrumbs
          items={[
            { name: "Discord Colored Text", href: "/discord-colored-text" },
          ]}
        />

        {/* Hero Section */}
        <section className="mb-10 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Discord Colored Text Generator
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            Create eye-catching announcements, alert banners, and formatted code blocks using Discord ANSI color syntax. Real-time preview with 1-click copy.
          </p>
        </section>

        {/* Quick Answer: How to Make Red Text in Discord */}
        <section className="mb-8 rounded-xl border border-rose-500/20 bg-rose-950/10 p-5">
          <div className="mb-3">
            <h2 className="text-base font-semibold text-rose-300 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              Quick Copy: How to Make Red Text in Discord
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Wrap your text in an ANSI codeblock with code <code className="text-rose-300 font-mono">\u001b[31m</code>. Click copy and paste into Discord:
            </p>
          </div>
          <CodeBlock
            code={"```ansi\n\u001b[31m[ERROR] Server announcement in red text\u001b[0m\n```"}
            language="ansi"
            caption="1-Click Copy: Discord Red Text Codeblock"
          />
        </section>

        {/* Interactive Tool Widget */}
        <DiscordAnsiEditor />

        {/* ANSI Reference Table */}
        <section className="mt-16 pt-12 border-t border-slate-800/80">
          <h2 className="text-2xl font-bold tracking-tight text-white mb-4">
            Discord ANSI Color Codes Reference
          </h2>
          <p className="text-sm text-slate-400 mb-6">
            Discord syntax requires wrapping text inside an <code className="text-indigo-300 font-mono">```ansi</code> codeblock. Each style uses the escape code <code className="text-indigo-300 font-mono">\u001b[CODEm</code>.
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0e121a]">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[11px] bg-slate-900/60">
                  <th className="py-3 px-4">Color Name</th>
                  <th className="py-3 px-4">ANSI Code</th>
                  <th className="py-3 px-4">Syntax Example</th>
                  <th className="py-3 px-4">Common Usage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr>
                  <td className="py-3 px-4 font-semibold text-emerald-400">Green</td>
                  <td className="py-3 px-4 font-mono text-slate-300">32</td>
                  <td className="py-3 px-4 font-mono text-indigo-300">\u001b[32mSuccess\u001b[0m</td>
                  <td className="py-3 px-4 text-slate-400">Verification passes, bot online notices</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-rose-400">Red</td>
                  <td className="py-3 px-4 font-mono text-slate-300">31</td>
                  <td className="py-3 px-4 font-mono text-indigo-300">\u001b[31mError\u001b[0m</td>
                  <td className="py-3 px-4 text-slate-400">Warnings, bans, moderation rules</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-amber-400">Yellow</td>
                  <td className="py-3 px-4 font-mono text-slate-300">33</td>
                  <td className="py-3 px-4 font-mono text-indigo-300">\u001b[33mWarning\u001b[0m</td>
                  <td className="py-3 px-4 text-slate-400">Caution alerts, pending approvals</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-sky-400">Blue</td>
                  <td className="py-3 px-4 font-mono text-slate-300">34</td>
                  <td className="py-3 px-4 font-mono text-indigo-300">\u001b[34mInfo\u001b[0m</td>
                  <td className="py-3 px-4 text-slate-400">Server guides, changelogs, links</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-fuchsia-400">Pink / Magenta</td>
                  <td className="py-3 px-4 font-mono text-slate-300">35</td>
                  <td className="py-3 px-4 font-mono text-indigo-300">\u001b[35mEvent\u001b[0m</td>
                  <td className="py-3 px-4 text-slate-400">Giveaways, VIP roles, special announcements</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-teal-400">Cyan</td>
                  <td className="py-3 px-4 font-mono text-slate-300">36</td>
                  <td className="py-3 px-4 font-mono text-indigo-300">\u001b[36mHighlight\u001b[0m</td>
                  <td className="py-3 px-4 text-slate-400">Bot status codes, technical metrics</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Quick Links to Other Tools */}
        <section className="mt-12 p-6 rounded-xl border border-slate-800 bg-[#0d1017] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white">Need Dynamic Timestamps Instead?</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Create timezone-adjusting timestamps that update automatically in each member local time.
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
