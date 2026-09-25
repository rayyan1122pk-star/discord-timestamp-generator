import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, ArrowRight, CheckCircle2, Tag } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { CodeBlock } from "@/components/CodeBlock";
import { FaqAccordion } from "@/components/FaqAccordion";
import { siteConfig } from "@/lib/seo-config";
import { BLOG_POSTS } from "@/data/guides-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const canonicalUrl = `${siteConfig.url}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonicalUrl,
      type: "article",
      publishedTime: post.publishedDate,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const articleSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Person",
      name: post.author,
      url: `${siteConfig.url}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.shortName,
      url: siteConfig.url,
    },
    datePublished: post.publishedDate,
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  const schemas: Record<string, unknown>[] = [articleSchema];

  if (post.faqs && post.faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd data={schemas} />

      <Breadcrumbs
        items={[
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      />

      <header className="mb-8 pb-8 border-b border-slate-800">
        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3">
          {post.category}
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
          {post.title}
        </h1>
        <p className="mt-3 text-base text-slate-300 leading-relaxed">
          {post.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-indigo-400" aria-hidden="true" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-indigo-400" aria-hidden="true" />
            <span>{post.publishedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-indigo-400" aria-hidden="true" />
            <span>{post.readingTime}</span>
          </div>
        </div>
      </header>

      {/* Key Takeaways Box */}
      {post.keyTakeaways && post.keyTakeaways.length > 0 && (
        <section aria-labelledby="key-takeaways" className="mb-10 rounded-xl border border-indigo-500/30 bg-[#0e121a] p-5 sm:p-6">
          <h2 id="key-takeaways" className="text-base font-bold text-white flex items-center gap-2 mb-3">
            <CheckCircle2 className="h-4 w-4 text-indigo-400 flex-shrink-0" aria-hidden="true" />
            <span>Key Takeaways &amp; Summary</span>
          </h2>
          <ul className="space-y-2.5 text-sm text-slate-300">
            {post.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-indigo-400 font-bold mt-0.5">•</span>
                <span className="leading-relaxed">{takeaway}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Lead Excerpt and Introduction */}
      <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-5 mb-10">
        <p className="font-medium text-slate-200 text-base leading-relaxed border-l-2 border-indigo-500 pl-4 py-0.5 bg-indigo-500/5 rounded-r">
          {post.excerpt}
        </p>
        <p className="text-slate-300 leading-relaxed">
          {post.content}
        </p>
      </div>

      {/* Detailed Sections */}
      {post.sections && post.sections.length > 0 && (
        <div className="space-y-12 text-slate-300 text-sm sm:text-base leading-relaxed mb-12">
          {post.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-4">
                {section.heading}
              </h2>

              <p className="text-slate-300 leading-relaxed whitespace-pre-line mb-4">
                {section.content}
              </p>

              {section.codeSnippet && (
                <CodeBlock
                  code={section.codeSnippet.code}
                  language={section.codeSnippet.language}
                />
              )}

              {section.table && (
                <div className="my-6 overflow-x-auto rounded-lg border border-slate-800/80">
                  <table className="w-full text-left text-xs sm:text-sm">
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
                              className={`py-3 px-4 ${
                                cIdx === 0
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
            </section>
          ))}
        </div>
      )}

      {/* Search Variations / Keyword Cloud */}
      {post.searchVariations && post.searchVariations.length > 0 && (
        <div className="my-8 p-4 rounded-xl border border-slate-800/70 bg-[#0a0d14]">
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <Tag className="h-3 w-3 text-indigo-400" aria-hidden="true" />
            <span>Related Search Queries &amp; Topics</span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {post.searchVariations.map((query, qIdx) => (
              <span
                key={qIdx}
                className="inline-block px-2.5 py-1 rounded-md text-xs bg-slate-900 border border-slate-800 text-slate-300"
              >
                {query}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* FAQs Section */}
      {post.faqs && post.faqs.length > 0 && (
        <FaqAccordion
          items={post.faqs}
          title="Frequently Asked Questions"
          description="Straightforward answers to common questions about this topic."
        />
      )}

      {/* Call to action for timestamp generator */}
      <div className="my-10 rounded-2xl border border-slate-800 bg-[#0e121a] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-white text-base">Generate Your Discord Timestamps Now</h3>
          <p className="text-xs text-slate-400 mt-1">
            Convert any date or countdown into auto-adjusting Discord tags with 1-click copy.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg font-semibold text-xs text-white bg-[#5865F2] hover:bg-[#4752c4] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          <span>Open Free Generator</span>
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>

      {/* Footer Navigation */}
      <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Back to All Articles</span>
        </Link>
        <Link
          href="/discord-timestamp-guide"
          className="text-indigo-400 hover:underline font-semibold"
        >
          Read Core Timestamp Guide &rarr;
        </Link>
      </div>
    </article>
  );
}
