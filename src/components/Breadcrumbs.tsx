import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { JsonLd } from "./JsonLd";
import { siteConfig } from "@/lib/seo-config";

export interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems: BreadcrumbItem[] = [{ name: "Home", href: "/" }, ...items];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href.startsWith("http") ? item.href : `${siteConfig.url}${item.href}`,
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <nav aria-label="Breadcrumbs" className="mb-6 flex items-center space-x-2 text-xs text-slate-400">
        {allItems.map((item, idx) => {
          const isLast = idx === allItems.length - 1;

          return (
            <React.Fragment key={item.href}>
              {idx > 0 && <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-slate-400" aria-hidden="true" />}
              {isLast ? (
                <span className="font-medium text-slate-200 truncate max-w-[200px] sm:max-w-none" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-indigo-400 transition-colors duration-150 flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
                >
                  {idx === 0 && <Home className="h-3.5 w-3.5" aria-hidden="true" />}
                  <span>{item.name}</span>
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </>
  );
}
