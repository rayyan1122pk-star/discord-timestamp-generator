import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Calendar, User, ArrowRight, Terminal } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CodeBlock } from "@/components/CodeBlock";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { routeMetadataMap, siteConfig } from "@/lib/seo-config";
import { COMPREHENSIVE_GUIDES } from "@/data/guides-data";

const guide = COMPREHENSIVE_GUIDES["discord-bot-timestamps"];

export const metadata: Metadata = {
  title: routeMetadataMap.bots.title,
  description: routeMetadataMap.bots.description,
  alternates: { canonical: routeMetadataMap.bots.canonical },
  openGraph: {
    title: routeMetadataMap.bots.title,
    description: routeMetadataMap.bots.description,
    url: routeMetadataMap.bots.canonical,
    type: "article",
    publishedTime: guide.publishedDate,
    modifiedTime: guide.modifiedDate,
    authors: [guide.author.name],
  },
};

export default function DiscordBotTimestampsPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: guide.title,
    description: guide.description,
    author: {
      "@type": "Person",
      name: guide.author.name,
      jobTitle: guide.author.role,
      url: `${siteConfig.url}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.shortName,
      url: siteConfig.url,
    },
    datePublished: guide.publishedDate,
    dateModified: guide.modifiedDate,
    mainEntityOfPage: routeMetadataMap.bots.canonical,
  };

  const faqSchema = guide.faqs
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: guide.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd data={articleSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      <Breadcrumbs items={[{ name: "Bot Timestamps", href: "/discord-bot-timestamps" }]} />

      <header className="mb-8 pb-8 border-b border-slate-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
          <span>SDK &amp; Bot Development</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
          {guide.title}
        </h1>
        <p className="mt-3 text-base text-slate-300 leading-relaxed">
          {guide.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-indigo-400" aria-hidden="true" />
            <span>{guide.author.name}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-indigo-400" aria-hidden="true" />
            <span>Updated: {guide.modifiedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-indigo-400" aria-hidden="true" />
            <span>{guide.readingTime}</span>
          </div>
        </div>
      </header>

      {/* Direct AEO Summary */}
      <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-5 mb-10 text-slate-200">
        <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-300 mb-1.5">
          Bot Timestamps Summary
        </h2>
        <p className="text-sm leading-relaxed">{guide.summary}</p>
      </div>

      {/* Guide Content Sections */}
      <div className="space-y-10 text-slate-300 text-sm sm:text-base leading-relaxed">
        {guide.sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-3">
              {section.heading}
            </h2>
            <div className="text-slate-300 leading-relaxed whitespace-pre-line mb-4">
              {section.content}
            </div>

            {section.codeSnippet && (
              <CodeBlock
                code={section.codeSnippet.code}
                language={section.codeSnippet.language}
                caption={section.codeSnippet.caption}
              />
            )}
          </section>
        ))}
      </div>

      {/* FAQs */}
      {guide.faqs && <FaqAccordion items={guide.faqs} />}

      {/* Contextual Links */}
      <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-[#5865F2] hover:bg-[#4752c4] transition-all"
        >
          <span>Open Timestamp Generator</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link
          href="/discord-timestamp-guide"
          className="text-xs font-semibold text-indigo-400 hover:underline"
        >
          Back to Main Timestamp Guide &rarr;
        </Link>
      </div>
    </article>
  );
}
