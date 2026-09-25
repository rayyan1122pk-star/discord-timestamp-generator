import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CodeBlock } from "@/components/CodeBlock";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { routeMetadataMap, siteConfig } from "@/lib/seo-config";
import { COMPREHENSIVE_GUIDES } from "@/data/guides-data";

const guide = COMPREHENSIVE_GUIDES["unix-timestamp"];

export const metadata: Metadata = {
  title: routeMetadataMap.unix.title,
  description: routeMetadataMap.unix.description,
  alternates: { canonical: routeMetadataMap.unix.canonical },
  openGraph: {
    title: routeMetadataMap.unix.title,
    description: routeMetadataMap.unix.description,
    url: routeMetadataMap.unix.canonical,
    type: "article",
    publishedTime: guide.publishedDate,
    modifiedTime: guide.modifiedDate,
    authors: [guide.author.name],
  },
};

export default function UnixTimestampPage() {
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
    mainEntityOfPage: routeMetadataMap.unix.canonical,
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
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <JsonLd data={articleSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      <Breadcrumbs items={[{ name: "Unix Timestamp", href: "/unix-timestamp" }]} />

      <header className="mb-10 pb-8 border-b border-slate-800/80">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
          {guide.title}
        </h1>

        <div className="mt-4 flex items-center gap-3 text-xs text-slate-500 font-mono">
          <span>By {guide.author.name}</span>
          <span>&bull;</span>
          <span>Updated {guide.modifiedDate}</span>
          <span>&bull;</span>
          <span>{guide.readingTime}</span>
        </div>
      </header>

      {/* Natural Lead Paragraph */}
      <div className="text-lg text-slate-300 font-normal leading-relaxed mb-10 text-pretty">
        {guide.summary}
      </div>

      {/* Guide Content Sections */}
      <div className="space-y-12 text-slate-300 text-base leading-relaxed">
        {guide.sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-4">
              {section.heading}
            </h2>

            <div className="text-slate-300 leading-relaxed whitespace-pre-line mb-4">
              {section.content}
            </div>

            {section.codeSnippet && (
              <CodeBlock
                code={section.codeSnippet.code}
                language={section.codeSnippet.language}
              />
            )}
          </section>
        ))}
      </div>

      {/* FAQs */}
      {guide.faqs && <FaqAccordion items={guide.faqs} />}

      {/* Further Reading */}
      <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-slate-400">
        <Link
          href="/discord-timestamp-formats"
          className="hover:text-white transition-colors"
        >
          &larr; Formats Cheat Sheet
        </Link>
        <Link
          href="/discord-markdown"
          className="text-indigo-400 hover:underline"
        >
          Next: Discord Markdown &amp; Styling &rarr;
        </Link>
      </div>
    </article>
  );
}
