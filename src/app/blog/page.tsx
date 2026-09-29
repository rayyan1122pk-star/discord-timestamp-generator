import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, User } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CodeBlock } from "@/components/CodeBlock";
import { JsonLd } from "@/components/JsonLd";
import { routeMetadataMap, siteConfig } from "@/lib/seo-config";
import { BLOG_POSTS } from "@/data/guides-data";

export const metadata: Metadata = {
  title: routeMetadataMap.blog.title,
  description: routeMetadataMap.blog.description,
  alternates: { canonical: routeMetadataMap.blog.canonical },
  openGraph: {
    title: routeMetadataMap.blog.title,
    description: routeMetadataMap.blog.description,
    url: routeMetadataMap.blog.canonical,
  },
};

export default function BlogIndexPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Discord Timestamps Blog & Technical Articles",
    description: routeMetadataMap.blog.description,
    url: routeMetadataMap.blog.canonical,
    publisher: {
      "@type": "Organization",
      name: siteConfig.shortName,
      url: siteConfig.url,
    },
    hasPart: BLOG_POSTS.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: `${siteConfig.url}/blog/${post.slug}`,
      datePublished: post.publishedDate,
      author: {
        "@type": "Person",
        name: post.author,
      },
    })),
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd data={collectionSchema} />

      <Breadcrumbs items={[{ name: "Blog & Articles", href: "/blog" }]} />

      <header className="mb-10 pb-6 border-b border-slate-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Knowledge Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
          Articles, Guides &amp; Automation Tutorials
        </h1>
        <p className="mt-3 text-base text-slate-300 leading-relaxed max-w-2xl">
          Deep dives into Discord platform mechanics, server scheduling best practices, webhook
          workflows, and timezone synchronization.
        </p>
      </header>

      {/* Quick Interactive Copy Banner */}
      <div className="mb-10 p-5 rounded-2xl border border-slate-800 bg-[#0e121a] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold text-white">Need a quick relative timestamp for Discord chat?</h2>
          <p className="text-xs text-slate-400 mt-1">Copy this default tag and paste into Discord desktop browser or mobile apps:</p>
        </div>
        <div className="w-full md:w-auto">
          <CodeBlock code="<t:1727280000:R>" language="syntax" caption="1-Click Copy" />
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {BLOG_POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-[#0e121a] p-6 hover:border-indigo-500/50 hover:bg-slate-900/50 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {post.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">{post.readingTime}</span>
              </div>

              <h2 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2">
                {post.title}
              </h2>

              <p className="mt-2.5 text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-indigo-400" aria-hidden="true" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1 font-semibold text-indigo-400 group-hover:text-indigo-300 group-hover:translate-x-1 transition-all">
                <span>Read Article</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
