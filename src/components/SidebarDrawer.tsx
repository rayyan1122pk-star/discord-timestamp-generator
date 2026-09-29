"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Home,
  MessageSquare,
  Clock,
  FileText,
  Palette,
  Hash,
  EyeOff,
  LayoutTemplate,
  Send,
  Code2,
  Binary,
  BookOpen,
  Globe,
  X,
  Sparkles,
  Terminal,
} from "lucide-react";

interface SidebarDrawerProps {
  open: boolean;
  onClose: () => void;
}

interface ToolItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  category: "MESSAGES" | "EMBEDS" | "DEVELOPER";
}

const TOOLS: ToolItem[] = [
  // MESSAGES
  { name: "Timestamp Generator", href: "/", icon: Clock, category: "MESSAGES" },
  { name: "Format Cheatsheet", href: "/discord-timestamp-formats", icon: Hash, category: "MESSAGES" },
  { name: "ANSI Color Text", href: "/discord-colored-text", icon: Palette, category: "MESSAGES" },
  { name: "Invisible Name & Bio", href: "/discord-invisible-name", icon: EyeOff, category: "MESSAGES" },
  { name: "Glitch / Zalgo Text", href: "/discord-glitch-text", icon: Sparkles, category: "MESSAGES" },
  { name: "Markdown Formatter", href: "/discord-markdown", icon: FileText, category: "MESSAGES" },

  // EMBEDS
  { name: "Embed Builder", href: "/discord-embed-generator", icon: LayoutTemplate, category: "EMBEDS" },
  { name: "Webhook Tester", href: "/discord-webhook-timestamps", icon: Send, category: "EMBEDS" },

  // DEVELOPER
  { name: "Snowflake Decoder", href: "/discord-snowflake-to-timestamp", icon: Hash, category: "DEVELOPER" },
  { name: "Unix Epoch Converter", href: "/unix-timestamp", icon: Binary, category: "DEVELOPER" },
  { name: "Bot Syntax Helper", href: "/discord-bot-timestamps", icon: Terminal, category: "DEVELOPER" },
  { name: "Technical Guides", href: "/blog", icon: BookOpen, category: "DEVELOPER" },
];

export function SidebarDrawer({ open, onClose }: SidebarDrawerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search input when drawer opens
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Filter tools based on search query
  const filteredTools = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return TOOLS;
    return TOOLS.filter((t) => t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
  }, [searchQuery]);

  const messageTools = filteredTools.filter((t) => t.category === "MESSAGES");
  const embedTools = filteredTools.filter((t) => t.category === "EMBEDS");
  const devTools = filteredTools.filter((t) => t.category === "DEVELOPER");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside
        aria-label="Discord Utilities Sidebar"
        className="relative w-72 sm:w-80 max-w-[85vw] h-full bg-[#111318] border-r border-slate-800/90 text-slate-200 flex flex-col z-10 shadow-2xl animate-in slide-in-from-left duration-200"
      >
        {/* Top Header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <Link href="/" onClick={onClose} className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-[#5865F2] to-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-base font-bold text-white tracking-tight leading-none flex items-center gap-1.5">
                <span>Discord</span>
                <span className="text-indigo-400">Utils</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Tools for Discord</div>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-3 border-b border-slate-800/60">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools"
              className="w-full pl-9 pr-3 py-2 bg-[#171a22] border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* Scrollable Tool Categories */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
          {/* Home Button */}
          <Link
            href="/"
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              pathname === "/"
                ? "bg-[#5865F2]/20 border border-[#5865F2]/40 text-white shadow-sm"
                : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
            }`}
          >
            <div
              className={`p-1.5 rounded-lg ${
                pathname === "/" ? "bg-[#5865F2] text-white" : "bg-slate-800/80 text-slate-400"
              }`}
            >
              <Home className="h-4 w-4" />
            </div>
            <span>Home</span>
          </Link>

          {/* Category: Messages */}
          {messageTools.length > 0 && (
            <div>
              <div className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <MessageSquare className="h-3 w-3" />
                <span>Messages</span>
              </div>
              <div className="space-y-0.5">
                {messageTools.map((tool) => {
                  const Icon = tool.icon;
                  const isActive = pathname === tool.href;
                  return (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      onClick={onClose}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-colors ${
                        isActive
                          ? "bg-slate-800 text-white font-semibold"
                          : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${isActive ? "text-indigo-400" : "text-slate-400"}`} />
                      <span>{tool.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Category: Embeds */}
          {embedTools.length > 0 && (
            <div>
              <div className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <LayoutTemplate className="h-3 w-3" />
                <span>Embeds</span>
              </div>
              <div className="space-y-0.5">
                {embedTools.map((tool) => {
                  const Icon = tool.icon;
                  const isActive = pathname === tool.href;
                  return (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      onClick={onClose}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-colors ${
                        isActive
                          ? "bg-slate-800 text-white font-semibold"
                          : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${isActive ? "text-indigo-400" : "text-slate-400"}`} />
                      <span>{tool.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Category: Developer */}
          {devTools.length > 0 && (
            <div>
              <div className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Code2 className="h-3 w-3" />
                <span>Developer</span>
              </div>
              <div className="space-y-0.5">
                {devTools.map((tool) => {
                  const Icon = tool.icon;
                  const isActive = pathname === tool.href;
                  return (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      onClick={onClose}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-colors ${
                        isActive
                          ? "bg-slate-800 text-white font-semibold"
                          : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${isActive ? "text-indigo-400" : "text-slate-400"}`} />
                      <span>{tool.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {filteredTools.length === 0 && (
            <div className="text-center py-6 text-xs text-slate-400">
              No tools matching &quot;{searchQuery}&quot;
            </div>
          )}
        </div>

        {/* Footer Area */}
        <div className="p-3.5 border-t border-slate-800/80 bg-[#0d0f14]">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 px-1">
            <Link href="/about" onClick={onClose} className="hover:text-white transition-colors">
              About
            </Link>
            <Link href="/contact" onClick={onClose} className="hover:text-white transition-colors">
              Contact
            </Link>
            <Link href="/privacy" onClick={onClose} className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" onClick={onClose} className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>

          <p className="text-[10px] text-slate-400 leading-normal px-1">
            Not affiliated with Discord Inc. A fan made project.
          </p>
        </div>
      </aside>
    </div>
  );
}
