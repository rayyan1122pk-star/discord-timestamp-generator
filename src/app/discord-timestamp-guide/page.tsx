import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Calendar, User, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CodeBlock } from "@/components/CodeBlock";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { routeMetadataMap, siteConfig } from "@/lib/seo-config";
import { COMPREHENSIVE_GUIDES } from "@/data/guides-data";

const guide = COMPREHENSIVE_GUIDES["discord-timestamp-guide"];

export const metadata: Metadata = {
  title: routeMetadataMap.guide.title,
  description: routeMetadataMap.guide.description,
  alternates: { canonical: routeMetadataMap.guide.canonical },
  openGraph: {
    title: routeMetadataMap.guide.title,
    description: routeMetadataMap.guide.description,
    url: routeMetadataMap.guide.canonical,
    type: "article",
    publishedTime: guide.publishedDate,
    modifiedTime: guide.modifiedDate,
    authors: [guide.author.name],
  },
};

export default function TimestampGuidePage() {
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
    mainEntityOfPage: routeMetadataMap.guide.canonical,
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

      <Breadcrumbs items={[{ name: "Timestamp Guide", href: "/discord-timestamp-guide" }]} />

      <header className="mb-8 pb-8 border-b border-slate-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
          Documentation &amp; Tutorial
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

      {/* AEO / Quick Summary Box */}
      <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-5 mb-10 text-slate-200">
        <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-300 mb-1.5">
          Key Takeaway (Direct Summary)
        </h2>
        <p className="text-sm leading-relaxed">{guide.summary}</p>
        <div className="mt-3 pt-3 border-t border-indigo-500/20 flex items-center justify-between">
          <span className="text-xs text-slate-400">Need to generate a timestamp right now?</span>
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
          >
            <span>Open Generator Tool</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
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

            {section.table && (
              <div className="my-6 overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase font-mono text-[11px]">
                    <tr>
                      {section.table.headers.map((h, i) => (
                        <th key={i} className="py-3 px-3.5">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-sans">
                    {section.table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-800/40">
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`py-3 px-3.5 ${
                              cIdx === 0
                                ? "font-mono font-bold text-indigo-400"
                                : cIdx === 2
                                ? "font-mono text-slate-300"
                                : "text-slate-200"
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
          </section>
        ))}
      </div>

      {/* Interactive Tool Banner */}
      <div className="my-12 rounded-2xl border border-slate-800 bg-[#0e121a] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">Ready to create your Discord timestamp?</h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Use our interactive generator with instant timezone conversion and live chat preview.
          </p>
        </div>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-[#5865F2] hover:bg-[#4752c4] transition-all whitespace-nowrap shadow-md"
        >
          Open Timestamp Generator
        </Link>
      </div>

      {/* FAQs */}
      {guide.faqs && <FaqAccordion items={guide.faqs} />}

      {/* Related Resources */}
      <div className="mt-12 pt-8 border-t border-slate-800">
        <h3 className="text-base font-bold text-white mb-4">Related Developer Resources</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <Link
            href="/discord-timestamp-formats"
            className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:border-indigo-500/40 transition-colors"
          >
            <div className="font-semibold text-white text-sm mb-1">Formats &amp; Styles Cheat Sheet</div>
            <div className="text-slate-400">Compare t, T, d, D, f, F, and R flags with visual examples.</div>
          </Link>
          <Link
            href="/unix-timestamp"
            className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:border-indigo-500/40 transition-colors"
          >
            <div className="font-semibold text-white text-sm mb-1">Unix Timestamp &amp; Epoch Guide</div>
            <div className="text-slate-400">Learn how POSIX time powers worldwide synchronization.</div>
          </Link>
        </div>
      </div>
    </article>
  );
}
