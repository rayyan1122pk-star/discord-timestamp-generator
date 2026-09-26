"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Clock, Menu, X, BookOpen, Terminal, Sparkles, Layers, FileCode2, Palette, Hash } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Generator", icon: Clock },
    { href: "/discord-timestamp-formats", label: "Formats", icon: Layers },
    { href: "/discord-colored-text", label: "Colored Text", icon: Palette },
    { href: "/discord-snowflake-to-timestamp", label: "Snowflake ID", icon: Hash },
    { href: "/unix-timestamp", label: "Unix Epoch", icon: Sparkles },
    { href: "/discord-markdown", label: "Markdown", icon: FileCode2 },
    { href: "/discord-bot-timestamps", label: "Bots", icon: Terminal },
    { href: "/blog", label: "Guides", icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#0b0e14]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold text-white tracking-tight text-base sm:text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1"
        >
          <Image
            src="/logo.png"
            alt="Discord Timestamps Logo"
            width={34}
            height={34}
            className="h-8 w-8 object-contain"
            priority
          />
          <span className="flex items-baseline gap-1.5">
            <span>Discord</span>
            <span className="text-indigo-400 font-normal">Timestamps</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  isActive
                    ? "bg-slate-800 text-white font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Quick CTA or Mobile Hamburger */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            className="hidden sm:inline-flex items-center justify-center px-3.5 py-1.5 text-xs font-semibold text-white bg-[#5865F2] hover:bg-[#4752c4] rounded-lg shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            Create Timestamp
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#0e121a] px-4 py-4 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg transition-colors ${
                  isActive
                    ? "bg-[#5865f2]/15 text-indigo-400 font-semibold"
                    : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span>{link.label}</span>
              </Link>
            );
          })}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 px-3">
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">
              About
            </Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">
              Contact
            </Link>
            <Link href="/privacy" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">
              Privacy
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
