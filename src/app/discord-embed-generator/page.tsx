import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DiscordEmbedBuilder } from "@/components/DiscordEmbedBuilder";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/seo-config";
import { Sparkles, Terminal, Code2, Shield, Info, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Discord Embed Generator: Visual Webhook & Bot Embed Builder [Live Preview]",
  description:
    "Build custom Discord webhook embeds with real-time dark mode preview. Supports custom colors, inline fields, images, timestamps, discord.js v14 and JSON export.",
  alternates: { canonical: `${siteConfig.url}/discord-embed-generator` },
  openGraph: {
    title: "Discord Embed Generator: Live Webhook & Bot Builder",
    description:
      "Design rich Discord embeds with instant live chat simulation. 1-click export for Discord Webhook JSON, discord.js v14, and discord.py. 100% free and client-side.",
    url: `${siteConfig.url}/discord-embed-generator`,
    type: "website",
  },
};

export default function DiscordEmbedGeneratorPage() {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Discord Embed Generator",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Visual Discord embed maker and webhook generator with live dark mode simulation and 1-click code export.",
    url: `${siteConfig.url}/discord-embed-generator`,
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Build and Send a Discord Webhook Embed",
    description: "Step-by-step guide to generating and posting custom embed cards to Discord channels using webhooks.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Design Embed Content",
        text: "Customize the embed title, description, accent color, fields, images, and footer inside the visual builder.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Copy Webhook JSON or Bot Code",
        text: "Select your preferred format (Webhook JSON, discord.js v14, or discord.py) and click Copy Code.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Send to Discord",
        text: "Make an HTTP POST request to your Discord webhook URL with the copied JSON payload, or paste the code into your bot handler.",
      },
    ],
  };

  const faqs = [
    {
      question: "Can regular Discord users send embeds without a bot or webhook?",
      answer:
        "No. The standard Discord desktop and mobile chat input only sends plain text, emojis, markdown, and uploaded attachments. Rich colored embed cards can only be posted by Discord Webhooks or authorized Discord Bots via the official Discord REST API.",
    },
    {
      question: "Why does the Discord API use integer numbers for embed colors instead of hex strings?",
      answer:
        "The Discord API stores embed colors as 24-bit decimal integers (ranging from 0 to 16777215) rather than hex strings. For example, Discord Blurple (#5865F2) is converted by taking hexadecimal 5865F2 and converting it to decimal integer 5793266. Our generator automatically converts hex colors to exact API decimal integers.",
    },
    {
      question: "What are the official character limits for Discord embeds?",
      answer:
        "A single embed title allows up to 256 characters, description allows 4,096 characters, up to 25 fields (each field title 256 characters, field value 1,024 characters), author name 256 characters, and footer text 2,048 characters. The combined total character count across all elements in one embed cannot exceed 6,000 characters.",
    },
    {
      question: "Can I use dynamic timestamps inside a Discord embed?",
      answer:
        "Yes! You can insert dynamic timestamps like <t:1700000000:R> or <t:1700000000:F> directly inside the embed description and field values. Discord will render them as interactive, local timezone badges for every reader. For embed footers, use the ISO-8601 timestamp property instead.",
    },
    {
      question: "How do I create a Discord webhook URL in my server?",
      answer:
        "Open Discord, go to your Server Settings or right-click any channel, select Edit Channel > Integrations > Webhooks > New Webhook. Give your webhook a name, pick the channel, click Copy Webhook URL, and you are ready to send payloads.",
    },
  ];

  return (
    <>
      <JsonLd data={webAppSchema} />
      <JsonLd data={howToSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Breadcrumbs items={[{ name: "Discord Embed Generator", href: "/discord-embed-generator" }]} />

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-800/60 text-indigo-300 text-xs font-medium mb-4">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span>Interactive Webhook & Bot Embed Builder</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Free Discord Embed Generator
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Design rich, styled Discord message embeds with live dark-mode chat simulation. Export ready-to-send
            Discord Webhook JSON, discord.js v14 EmbedBuilder code, or discord.py payloads with one click.
          </p>
        </div>

        {/* Interactive Embed Builder Component */}
        <DiscordEmbedBuilder />

        {/* Informational Guides & Technical Specs */}
        <div className="mt-16 space-y-12">
          {/* Section: How to Send via Webhook */}
          <div className="rounded-2xl border border-slate-800 bg-[#0e121a] p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
              <Terminal className="h-5 w-5 text-[#5865F2]" />
              <span>How to Send Embeds to Discord Using Webhooks</span>
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Webhooks let you push messages and embeds directly to any Discord channel from server alerts, GitHub
              repositories, monitoring scripts, or simple curl commands without hosting a 24/7 bot process.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Step 1</div>
                <h3 className="text-sm font-semibold text-white mb-1.5">Generate Webhook in Discord</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Right-click your channel in Discord, select <strong>Edit Channel &gt; Integrations &gt; Webhooks &gt; New Webhook</strong>,
                  and copy your secret URL.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Step 2</div>
                <h3 className="text-sm font-semibold text-white mb-1.5">Design Your Embed Above</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Configure your title, color, fields, author, and media in the interactive tool. Verify how it looks in the real-time preview card.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Step 3</div>
                <h3 className="text-sm font-semibold text-white mb-1.5">POST JSON to Discord</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Copy the <strong>Webhook JSON</strong> and send an HTTP POST request with header{" "}
                  <code className="text-indigo-300 font-mono text-[11px]">Content-Type: application/json</code>.
                </p>
              </div>
            </div>

            {/* Curl Command Example */}
            <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400">cURL Terminal Example:</span>
                <span className="text-[11px] text-slate-500 font-mono">bash / zsh / powershell</span>
              </div>
              <pre className="text-xs text-slate-300 font-mono overflow-x-auto p-1 leading-relaxed">
{`curl -H "Content-Type: application/json" \\
  -X POST \\
  -d '{"embeds":[{"title":"Server Update","description":"All systems normal.","color":5793266}]}' \\
  https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN`}
              </pre>
            </div>
          </div>

          {/* Section: Discord Embed Limits Reference Table */}
          <div className="rounded-2xl border border-slate-800 bg-[#0e121a] p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
              <Info className="h-5 w-5 text-indigo-400" />
              <span>Official Discord Embed Limits Reference</span>
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              When creating embeds for bots or automated webhooks, keeping your payloads within official Discord API
              boundaries prevents HTTP 400 Bad Request errors.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300 border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/60">
                    <th className="py-3 px-4 font-semibold">Embed Element</th>
                    <th className="py-3 px-4 font-semibold">Maximum Character Limit</th>
                    <th className="py-3 px-4 font-semibold">Markdown Support</th>
                    <th className="py-3 px-4 font-semibold">Notes & Best Practices</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  <tr className="hover:bg-slate-900/30">
                    <td className="py-3 px-4 font-medium text-white">Embed Title</td>
                    <td className="py-3 px-4 font-mono text-indigo-300">256 characters</td>
                    <td className="py-3 px-4 text-emerald-400">No</td>
                    <td className="py-3 px-4 text-slate-400">Can be linked to a URL if title URL is provided</td>
                  </tr>
                  <tr className="hover:bg-slate-900/30">
                    <td className="py-3 px-4 font-medium text-white">Embed Description</td>
                    <td className="py-3 px-4 font-mono text-indigo-300">4,096 characters</td>
                    <td className="py-3 px-4 text-emerald-400">Yes (Full)</td>
                    <td className="py-3 px-4 text-slate-400">Supports bold, italics, codeblocks, links, and dynamic timestamps</td>
                  </tr>
                  <tr className="hover:bg-slate-900/30">
                    <td className="py-3 px-4 font-medium text-white">Total Fields</td>
                    <td className="py-3 px-4 font-mono text-indigo-300">25 fields maximum</td>
                    <td className="py-3 px-4 text-slate-400">N/A</td>
                    <td className="py-3 px-4 text-slate-400">Arranged in up to 3 columns when set to inline</td>
                  </tr>
                  <tr className="hover:bg-slate-900/30">
                    <td className="py-3 px-4 font-medium text-white">Field Name</td>
                    <td className="py-3 px-4 font-mono text-indigo-300">256 characters</td>
                    <td className="py-3 px-4 text-slate-400">Limited</td>
                    <td className="py-3 px-4 text-slate-400">Cannot be empty; acts as header for field value</td>
                  </tr>
                  <tr className="hover:bg-slate-900/30">
                    <td className="py-3 px-4 font-medium text-white">Field Value</td>
                    <td className="py-3 px-4 font-mono text-indigo-300">1,024 characters</td>
                    <td className="py-3 px-4 text-emerald-400">Yes (Full)</td>
                    <td className="py-3 px-4 text-slate-400">Supports markdown formatting, bullet lists, and timestamps</td>
                  </tr>
                  <tr className="hover:bg-slate-900/30">
                    <td className="py-3 px-4 font-medium text-white">Author Name</td>
                    <td className="py-3 px-4 font-mono text-indigo-300">256 characters</td>
                    <td className="py-3 px-4 text-rose-400">No</td>
                    <td className="py-3 px-4 text-slate-400">Can include author icon and author URL</td>
                  </tr>
                  <tr className="hover:bg-slate-900/30">
                    <td className="py-3 px-4 font-medium text-white">Footer Text</td>
                    <td className="py-3 px-4 font-mono text-indigo-300">2,048 characters</td>
                    <td className="py-3 px-4 text-rose-400">No</td>
                    <td className="py-3 px-4 text-slate-400">Appears at bottom beside small footer icon and timestamp</td>
                  </tr>
                  <tr className="hover:bg-slate-900/30">
                    <td className="py-3 px-4 font-medium text-white">Total Combined Characters</td>
                    <td className="py-3 px-4 font-mono text-amber-300">6,000 characters</td>
                    <td className="py-3 px-4 text-slate-400">N/A</td>
                    <td className="py-3 px-4 text-slate-400">Combined sum across all title, description, fields, footer, author</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section: Combining Timestamps with Embeds */}
          <div className="rounded-2xl border border-slate-800 bg-[#0e121a] p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
              <Code2 className="h-5 w-5 text-indigo-400" />
              <span>Embedding Dynamic Timestamps in Discord Embeds</span>
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Discord embeds fully support dynamic timestamp syntax inside their description and field values.
              When you paste <code className="text-indigo-300 font-mono text-xs bg-slate-900 px-1.5 py-0.5 rounded">&lt;t:TIMESTAMP:STYLE&gt;</code> into
              an embed body, Discord translates it into the local timezone of every single user reading the message.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <span className="text-xs font-semibold text-emerald-400">Inside Description or Fields (Dynamic Time)</span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Use our timestamp generator to get dynamic codes like <code className="text-indigo-300 font-mono">&lt;t:1774735200:R&gt;</code>.
                  This shows as an active countdown (e.g. &quot;in 2 hours&quot;) for all members worldwide.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-1 text-xs text-[#5865F2] hover:text-indigo-300 font-medium"
                >
                  <span>Open Timestamp Generator</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <span className="text-xs font-semibold text-indigo-400">Inside Footer Timestamp (Static ISO-8601)</span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Discord embed footers take standard ISO-8601 format timestamps like <code className="text-indigo-300 font-mono">2026-09-28T12:00:00.000Z</code>.
                  Discord converts this to &quot;Today at 12:00 PM&quot; next to the footer text.
                </p>
                <Link
                  href="/discord-webhook-timestamps"
                  className="inline-flex items-center gap-1 text-xs text-[#5865F2] hover:text-indigo-300 font-medium"
                >
                  <span>Read Webhook Timestamp Guide</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Related Tools Section */}
          <div className="rounded-2xl border border-slate-800 bg-[#0e121a] p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-4">Related Discord Formatting Utilities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/"
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 transition-colors group"
              >
                <h3 className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors mb-1">
                  Timestamp Generator
                </h3>
                <p className="text-xs text-slate-400">
                  Generate local dynamic timestamps with live countdowns and 1-click copy.
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
                href="/discord-snowflake-to-timestamp"
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 transition-colors group"
              >
                <h3 className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors mb-1">
                  Snowflake ID Decoder
                </h3>
                <p className="text-xs text-slate-400">
                  Decode any Discord user, message, or server ID into its exact creation date.
                </p>
              </Link>

              <Link
                href="/discord-markdown"
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 transition-colors group"
              >
                <h3 className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors mb-1">
                  Markdown Guide
                </h3>
                <p className="text-xs text-slate-400">
                  Format headers, quotes, spoilers, codeblocks, and bold italics in chat.
                </p>
              </Link>
            </div>
          </div>

          {/* Privacy Guarantee */}
          <div className="rounded-xl border border-slate-800 bg-[#0e121a]/60 p-5 flex items-start gap-4">
            <Shield className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-white block mb-1">100% Client-Side Privacy Guarantee</strong>
              Everything you design in this Discord Embed Generator runs purely in your local browser JavaScript. We never
              store, log, or transmit your webhook URLs, secret tokens, or embed content to any external server.
            </div>
          </div>

          {/* FAQ Section */}
          <div className="rounded-2xl border border-slate-800 bg-[#0e121a] p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
              Frequently Asked Questions About Discord Embeds
            </h2>
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </div>
    </>
  );
}
