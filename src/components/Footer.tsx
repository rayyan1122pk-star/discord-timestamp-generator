import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Shield, ExternalLink } from "lucide-react";
import { siteConfig } from "@/lib/seo-config";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-[#080b10] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-white tracking-tight text-base mb-3"
            >
              <Image
                src="/logo.png"
                alt="Discord Timestamps Logo"
                width={26}
                height={26}
                className="h-6 w-6 object-contain"
              />
              <span>Discord Timestamps</span>
            </Link>
            <p className="text-slate-400 leading-relaxed mb-4 text-xs">
              Fast, privacy-first developer utility for generating dynamic Discord timestamps.
              Calculated 100% in your local browser with zero server telemetry.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 text-emerald-400 border border-emerald-800/50 text-[11px] font-medium">
              <Shield className="h-3 w-3" aria-hidden="true" />
              <span>100% Client-Side Privacy</span>
            </div>
          </div>

          {/* Tools & Resources Column */}
          <div>
            <h3 className="font-semibold text-slate-200 text-sm tracking-tight mb-3">
              Tools & References
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Discord Timestamp Generator
                </Link>
              </li>
              <li>
                <Link href="/discord-timestamp-formats" className="hover:text-white transition-colors">
                  Formats & Styles Cheat Sheet
                </Link>
              </li>
              <li>
                <Link href="/unix-timestamp" className="hover:text-white transition-colors">
                  Unix Timestamp Converter
                </Link>
              </li>
              <li>
                <Link href="/discord-markdown" className="hover:text-white transition-colors">
                  Discord Markdown Formatter
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer Guides Column */}
          <div>
            <h3 className="font-semibold text-slate-200 text-sm tracking-tight mb-3">
              Developer Guides
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/discord-timestamp-guide" className="hover:text-white transition-colors">
                  Complete Timestamp Guide
                </Link>
              </li>
              <li>
                <Link href="/discord-webhook-timestamps" className="hover:text-white transition-colors">
                  Discord Webhook Embeds
                </Link>
              </li>
              <li>
                <Link href="/discord-bot-timestamps" className="hover:text-white transition-colors">
                  Bots in discord.js & Python
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Tutorials & Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Project & Legal Column */}
          <div>
            <h3 className="font-semibold text-slate-200 text-sm tracking-tight mb-3">
              About & Governance
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About the Project
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Feedback
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a
                  href={siteConfig.links.discordDocs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-indigo-400 transition-colors"
                >
                  <span>Official Discord Docs</span>
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} Discord Timestamps. Independent developer utility.
            Not affiliated with, endorsed by, or sponsored by Discord Inc.
          </div>
          <div className="flex items-center gap-1">
            <span>Built with precision for global Discord communities.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
