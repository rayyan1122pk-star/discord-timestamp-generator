import React from "react";
import type { Metadata } from "next";
import { Mail, MessageSquare, AlertCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ContactForm } from "@/components/ContactForm";
import { routeMetadataMap, siteConfig } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: routeMetadataMap.contact.title,
  description: routeMetadataMap.contact.description,
  alternates: { canonical: routeMetadataMap.contact.canonical },
  openGraph: {
    title: routeMetadataMap.contact.title,
    description: routeMetadataMap.contact.description,
    url: routeMetadataMap.contact.canonical,
  },
};

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Discord Timestamps",
    description: routeMetadataMap.contact.description,
    url: routeMetadataMap.contact.canonical,
    publisher: {
      "@type": "Organization",
      name: siteConfig.shortName,
      url: siteConfig.url,
    },
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd data={contactSchema} />

      <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />

      <header className="mb-8 pb-8 border-b border-slate-800">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
          Contact &amp; Developer Feedback
        </h1>
        <p className="mt-3 text-base text-slate-300 leading-relaxed">
          Have an idea for a new timestamp tool feature, noticed a syntax bug, or want to suggest a guide?
          Send a message directly to our engineering team.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="rounded-xl border border-slate-800 bg-[#0e121a] p-5">
          <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-2">
            <Mail className="h-4 w-4" aria-hidden="true" />
          </div>
          <h2 className="text-sm font-semibold text-white">Direct Email</h2>
          <p className="text-xs text-slate-300 mt-1">support@discordtimestamps.dev</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#0e121a] p-5">
          <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2">
            <MessageSquare className="h-4 w-4" aria-hidden="true" />
          </div>
          <h2 className="text-sm font-semibold text-white">Response Time</h2>
          <p className="text-xs text-slate-300 mt-1">Within 24 to 48 business hours</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#0e121a] p-5">
          <div className="h-8 w-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-2">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
          </div>
          <h2 className="text-sm font-semibold text-white">Bug Reports</h2>
          <p className="text-xs text-slate-300 mt-1">Please include device &amp; browser</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-[#0e121a] p-6 sm:p-8">
        <ContactForm />
      </div>
    </div>
  );
}
