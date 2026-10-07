import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ImageIcon, ShieldCheck, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqAccordion, FaqItem } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { DiscordAvatarBannerSize } from "@/components/DiscordAvatarBannerSize";
import { siteConfig } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Discord Banner & Avatar Size Guide: Dimension Checker",
  description:
    "Complete 2026 Discord image dimension guide and interactive size checker for profile banners, avatars, server icons, emojis, and stickers.",
  alternates: {
    canonical: `${siteConfig.url}/discord-avatar-banner-size`,
  },
  openGraph: {
    title: "Discord Banner & Avatar Size Guide: Dimension Checker",
    description:
      "Interactive Discord image dimension checker and pixel specifications for banners, avatars, emojis, and server icons.",
    url: `${siteConfig.url}/discord-avatar-banner-size`,
    siteName: siteConfig.shortName,
    images: [`${siteConfig.url}/og-image.png`],
  },
};

const DIMENSION_FAQS: FaqItem[] = [
  {
    question: "What is the recommended Discord profile banner size?",
    answer:
      "The recommended Discord profile banner size is 600 x 240 pixels with a 5:2 aspect ratio. Discord supports PNG, JPG, and animated GIF files up to 10 MB.",
  },
  {
    question: "What are the exact dimensions for a Discord avatar?",
    answer:
      "The ideal Discord avatar size is 128 x 128 pixels (or up to 1024 x 1024 pixels for maximum clarity). Avatars are displayed as circular crops in chat and member lists, so keep primary logos and faces centered.",
  },
  {
    question: "What are the dimensions and file limits for Discord custom emojis?",
    answer:
      "Custom Discord emojis should be 128 x 128 pixels with a 1:1 square aspect ratio. The maximum file size limit is 256 KB. Supported formats are PNG, JPG, WebP, and animated GIF.",
  },
  {
    question: "What size should a Discord server banner be?",
    answer:
      "Discord server banners require a minimum size of 960 x 540 pixels with a 16:9 aspect ratio. Servers must reach Boost Level 2 to enable animated server banners.",
  },
];

export default function DiscordAvatarBannerSizePage() {
  const pageSchema = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Discord Avatar and Banner Dimension Checker",
      applicationCategory: "DesignApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "Interactive Discord image dimensions calculator and asset validator for profile avatars, banners, server icons, emojis, and stickers.",
      url: `${siteConfig.url}/discord-avatar-banner-size`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: DIMENSION_FAQS.map((faq) => ({
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
          { name: "Image Dimensions", href: "/discord-avatar-banner-size" },
        ]}
      />

      {/* Hero Header */}
      <section className="mb-8 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-medium text-indigo-400 mb-3">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          <span>2026 Asset Standards</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
          Discord Banner & Avatar Size Guide
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed text-pretty">
          Exact pixel dimensions, aspect ratios, and file size limits for Discord profile banners, avatars, server icons, emojis, and stickers.
        </p>
      </section>

      {/* AEO: Direct Answer Snippet Box */}
      <div className="mb-8 p-4 rounded-xl border border-indigo-950/70 bg-gradient-to-r from-indigo-950/30 to-slate-900/40 text-xs text-slate-300">
        <strong className="text-white block mb-1">Quick Answer: Discord Image Sizes</strong>
        Discord profile avatars require 128x128px (1:1 square crop). Profile banners require 600x240px (5:2 ratio). Server banners require 960x540px (16:9 ratio). Custom emojis must be 128x128px under 256KB. Custom stickers must be exactly 320x320px under 512KB.
      </div>

      {/* Interactive Tool Component */}
      <section className="mb-16">
        <DiscordAvatarBannerSize />
      </section>

      {/* FAQ Section */}
      <section className="mt-16 pt-10 border-t border-slate-800/80 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Common specifications for Discord branding and asset uploads.
          </p>
        </div>
        <FaqAccordion items={DIMENSION_FAQS} />
      </section>
    </div>
  );
}
