import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Send, Clock, BookOpen, ShieldCheck, Zap } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqAccordion, FaqItem } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { DiscordWebhookSender } from "@/components/DiscordWebhookSender";
import { siteConfig } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Discord Webhook Sender: Live Message & Embed Tester",
  description:
    "Test and send real-time Discord webhook messages, embeds, and dynamic timestamps directly from your browser. 100% client-side with zero token storage.",
  alternates: {
    canonical: `${siteConfig.url}/discord-webhook-sender`,
  },
  openGraph: {
    title: "Discord Webhook Sender: Live Message & Embed Tester",
    description:
      "Send live webhook messages, embeds, and dynamic timestamps directly to Discord channels. Instant HTTP 204 validation.",
    url: `${siteConfig.url}/discord-webhook-sender`,
    siteName: siteConfig.shortName,
    images: [`${siteConfig.url}/og-image.png`],
  },
};

const WEBHOOK_SENDER_FAQS: FaqItem[] = [
  {
    question: "How do I get a Discord webhook URL?",
    answer:
      "In your Discord server, click the gear icon next to your desired channel, navigate to Integrations, select Webhooks, click New Webhook, and click Copy Webhook URL.",
  },
  {
    question: "Is this webhook sender safe to use with my webhook URL?",
    answer:
      "Yes. The request is dispatched directly from your browser JavaScript runtime to Discord API servers (https://discord.com/api/webhooks/...). We never store, log, or route your webhook token through external backend servers.",
  },
  {
    question: "Can I send dynamic timestamps in webhooks?",
    answer:
      "Yes. You can include any valid Discord dynamic timestamp token like <t:1794686400:R> directly in the message content or embed description, and Discord will render it in each recipient's local timezone.",
  },
  {
    question: "Why did Discord return an HTTP 400 Bad Request error?",
    answer:
      "HTTP 400 usually indicates invalid JSON, an avatar URL that is broken or does not resolve to an image, an empty message with no content and no embeds, or exceeding Discord character limits (2,000 for content, 6,000 for embeds).",
  },
];

export default function DiscordWebhookSenderPage() {
  const pageSchema = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Discord Webhook Sender and Tester",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "Client-side Discord webhook sender and tester utility to dispatch live messages, embeds, and dynamic timestamps directly to Discord channels.",
      url: `${siteConfig.url}/discord-webhook-sender`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: WEBHOOK_SENDER_FAQS.map((faq) => ({
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
          { name: "Webhook Sender", href: "/discord-webhook-sender" },
        ]}
      />

      {/* Hero Header */}
      <section className="mb-8 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-medium text-indigo-400 mb-3">
          <Zap className="h-3.5 w-3.5 text-indigo-400" />
          <span>Real-Time Webhook Dispatcher</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
          Discord Webhook Sender & Tester
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed text-pretty">
          Send live test messages, custom embeds, and dynamic timestamps directly to your Discord server channels. Fast, client-side, and private.
        </p>
      </section>

      {/* AEO: Direct Answer Snippet Box for Answer Engines */}
      <div className="mb-8 p-4 rounded-xl border border-indigo-950/70 bg-gradient-to-r from-indigo-950/30 to-slate-900/40 text-xs text-slate-300">
        <strong className="text-white block mb-1">What is a Discord Webhook Sender?</strong>
        A Discord Webhook Sender is an API utility that posts messages and embeds directly to a designated Discord text channel using HTTP POST requests without running an active bot process or requiring bot authentication tokens.
      </div>

      {/* Interactive Tool Component */}
      <section className="mb-16">
        <DiscordWebhookSender />
      </section>

      {/* FAQ Section */}
      <section className="mt-16 pt-10 border-t border-slate-800/80 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Common questions about Discord webhook integration and message formatting.
          </p>
        </div>
        <FaqAccordion items={WEBHOOK_SENDER_FAQS} />
      </section>
    </div>
  );
}
