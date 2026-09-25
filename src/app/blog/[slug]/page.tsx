import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
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
    title: `${post.title} | Discord Timestamps`,
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

  const articleSchema = {
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

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd data={articleSchema} />

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

      {/* Main Post Body */}
      <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-5">
        <p className="font-medium text-slate-200 text-base leading-relaxed border-l-2 border-indigo-500 pl-4">
          {post.excerpt}
        </p>
        <p>{post.content}</p>
      </div>

      {/* Call to action for timestamp generator */}
      <div className="my-10 rounded-2xl border border-slate-800 bg-[#0e121a] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-white text-base">Try Discord Timestamps Today</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Convert any date or countdown into auto-adjusting Discord tags with 1-click copy.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-xs text-white bg-[#5865F2] hover:bg-[#4752c4] transition-colors whitespace-nowrap"
        >
          <span>Open Generator</span>
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
          Read Discord Timestamp Guide &rarr;
        </Link>
      </div>
    </article>
  );
}
