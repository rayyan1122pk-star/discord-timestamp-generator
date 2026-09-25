import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CodeBlock } from "@/components/CodeBlock";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { routeMetadataMap, siteConfig } from "@/lib/seo-config";
import { COMPREHENSIVE_GUIDES } from "@/data/guides-data";

const guide = COMPREHENSIVE_GUIDES["discord-markdown"];

export const metadata: Metadata = {
  title: routeMetadataMap.markdown.title,
  description: routeMetadataMap.markdown.description,
  alternates: { canonical: routeMetadataMap.markdown.canonical },
  openGraph: {
    title: routeMetadataMap.markdown.title,
    description: routeMetadataMap.markdown.description,
    url: routeMetadataMap.markdown.canonical,
    type: "article",
    publishedTime: guide.publishedDate,
    modifiedTime: guide.modifiedDate,
    authors: [guide.author.name],
  },
};

export default function DiscordMarkdownPage() {
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
    mainEntityOfPage: routeMetadataMap.markdown.canonical,
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

      <Breadcrumbs items={[{ name: "Discord Markdown", href: "/discord-markdown" }]} />

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

            {section.table && (
              <div className="my-8 overflow-x-auto rounded-lg border border-slate-800/80">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#0e121a] border-b border-slate-800 text-slate-400 font-mono text-xs">
                    <tr>
                      {section.table.headers.map((h, i) => (
                        <th key={i} className="py-3 px-4 font-medium">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {section.table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-850/30">
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`py-3.5 px-4 ${
                              cIdx === 1
                                ? "font-mono font-semibold text-indigo-400"
                                : cIdx === 2
                                ? "font-mono text-slate-300 text-xs"
                                : "text-slate-300"
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

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
          href="/unix-timestamp"
          className="hover:text-white transition-colors"
        >
          &larr; Unix Timestamp Guide
        </Link>
        <Link
          href="/discord-webhook-timestamps"
          className="text-indigo-400 hover:underline"
        >
          Next: Using Timestamps in Webhooks &rarr;
        </Link>
      </div>
    </article>
  );
}
