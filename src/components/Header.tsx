"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Clock,
  Menu,
  BookOpen,
  Terminal,
  Binary,
  Layers,
  FileCode2,
  Palette,
  Hash,
  LayoutTemplate,
  Skull,
  Ghost,
  ChevronDown,
  PanelLeft,
  Type,
  AtSign,
  Search,
  Send,
  Image as ImageIcon,
} from "lucide-react";
import { SidebarDrawer } from "@/components/SidebarDrawer";
import { CommandPalette } from "@/components/CommandPalette";

export function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // 5 Main features visible on the top navbar
  const primaryLinks = [
    { href: "/", label: "Generator", icon: Clock },
    { href: "/discord-timestamp-formats", label: "Formats", icon: Layers },
    { href: "/discord-embed-generator", label: "Embed Maker", icon: LayoutTemplate },
    { href: "/discord-colored-text", label: "Colored Text", icon: Palette },
    { href: "/blog", label: "Guides", icon: BookOpen },
  ];

  // Additional tools grouped cleanly inside the dropdown
  const otherTools = [
    {
      href: "/discord-font-generator",
      label: "Font Generator",
      desc: "Aesthetic Unicode fonts for names and bios",
      icon: Type,
    },
    {
      href: "/discord-character-counter",
      label: "Character Counter",
      desc: "Message, Nitro, and bio length limits",
      icon: Hash,
    },
    {
      href: "/discord-mention-generator",
      label: "Mentions & Emoji",
      desc: "User, role, channel, and custom emoji tags",
      icon: AtSign,
    },
    {
      href: "/discord-invisible-name",
      label: "Invisible Name",
      desc: "Blank usernames and bio characters",
      icon: Ghost,
    },
    {
      href: "/discord-glitch-text",
      label: "Glitch Text",
      desc: "Zalgo diacritics generator",
      icon: Skull,
    },
    {
      href: "/discord-snowflake-to-timestamp",
      label: "Snowflake Decoder",
      desc: "Convert Discord IDs to creation dates",
      icon: Hash,
    },
    {
      href: "/unix-timestamp",
      label: "Unix Epoch Tool",
      desc: "10 vs 13 digit epoch conversions",
      icon: Binary,
    },
    {
      href: "/discord-markdown",
      label: "Markdown Cheatsheet",
      desc: "Formatting syntax and codeblocks",
      icon: FileCode2,
    },
    {
      href: "/discord-webhook-sender",
      label: "Webhook Sender",
      desc: "Live message and embed dispatcher",
      icon: Send,
    },
    {
      href: "/discord-avatar-banner-size",
      label: "Image Sizes & Checker",
      desc: "Avatar, banner, and emoji dimensions",
      icon: ImageIcon,
    },
    {
      href: "/discord-bot-timestamps",
      label: "Bot Integration",
      desc: "Discord.js and Python syntax helpers",
      icon: Terminal,
    },
  ];


  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isOtherActive = otherTools.some((t) => t.href === pathname);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0b0e14]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left Side: Sidebar Toggle & Brand Logo */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open Discord Tools Sidebar"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 shadow-sm"
              title="Open Discord utilities sidebar"
            >
              <PanelLeft className="h-4 w-4 text-indigo-400" />
              <span className="hidden sm:inline">Tools</span>
            </button>

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
          </div>

          {/* Desktop Primary Navigation: 5 Main Features + Dropdown */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center space-x-1">
            {primaryLinks.map((link) => {
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

            {/* More Tools Dropdown Button */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  isOtherActive || dropdownOpen
                    ? "bg-slate-800 text-indigo-300 font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                <span>More Tools</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180 text-indigo-400" : "text-slate-400"
                  }`}
                />
              </button>

              {/* Dropdown Menu Panel */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-xl border border-slate-800 bg-[#0e121a] p-2 shadow-2xl shadow-black/80 backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-2 py-1.5 mb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800/80">
                    Additional Discord Utilities
                  </div>
                  <div className="space-y-0.5">
                    {otherTools.map((tool) => {
                      const Icon = tool.icon;
                      const isActive = pathname === tool.href;
                      return (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          onClick={() => setDropdownOpen(false)}
                          className={`flex items-start gap-2.5 p-2 rounded-lg transition-colors ${
                            isActive
                              ? "bg-indigo-950/40 text-indigo-300 border border-indigo-500/20"
                              : "text-slate-200 hover:bg-slate-800/60 hover:text-white"
                          }`}
                        >
                          <div className="p-1.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 mt-0.5 flex-shrink-0">
                            <Icon className="h-3.5 w-3.5" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-medium leading-none mb-1 text-slate-100">
                              {tool.label}
                            </div>
                            <div className="text-[11px] text-slate-400 leading-tight truncate">
                              {tool.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Quick CTA & Mobile Hamburger (both open sidebar on mobile) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }));
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs transition-all shadow-sm"
              title="Search tools and presets (Ctrl+K)"
            >
              <Search className="h-3.5 w-3.5 text-indigo-400" />
              <span className="text-[11px] text-slate-300">Quick Find</span>
              <kbd className="rounded border border-slate-700 bg-slate-950 px-1.5 py-0.2 text-[10px] font-mono text-slate-400">
                ⌘K
              </kbd>
            </button>

            <Link
              href="/"
              className="hidden md:inline-flex items-center justify-center px-3.5 py-1.5 text-xs font-semibold text-white bg-[#5865F2] hover:bg-[#4752c4] rounded-lg shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 active:scale-[0.98]"
            >
              Create Timestamp
            </Link>

            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation menu"
              className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-Out Side Navigation Drawer */}
      <SidebarDrawer open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Global Command Palette */}
      <CommandPalette />
    </>
  );
}
