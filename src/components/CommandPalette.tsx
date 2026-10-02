"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Clock,
  Layers,
  LayoutTemplate,
  Palette,
  Ghost,
  Skull,
  Hash,
  Binary,
  Type,
  AtSign,
  BookOpen,
  Copy,
  Check,
  Sparkles,
  CornerDownLeft,
  X,
  Volume2,
  VolumeX,
} from "lucide-react";
import { playCopySound, playPresetSound, isSoundEnabled, setSoundEnabled } from "@/lib/sound-effects";

interface CommandItem {
  id: string;
  title: string;
  category: "Tools" | "Instant Presets" | "Documentation";
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  href?: string;
  copyValue?: string;
  description?: string;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [soundActive, setSoundActive] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    setSoundActive(isSoundEnabled());
  }, []);

  // Listen for Cmd+K / Ctrl+K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Compute live presets dynamically based on current epoch
  const presetCommands = useMemo<CommandItem[]>(() => {
    const now = Math.floor(Date.now() / 1000);
    
    // In 15 minutes
    const in15m = now + 15 * 60;
    // In 1 hour
    const in1h = now + 60 * 60;
    // In 3 hours
    const in3h = now + 3 * 60 * 60;
    // Tomorrow same time
    const tomorrow = now + 24 * 60 * 60;
    // In 1 week
    const in1w = now + 7 * 24 * 60 * 60;

    return [
      {
        id: "preset-15m",
        title: "In 15 Minutes (<t:" + in15m + ":R>)",
        category: "Instant Presets",
        icon: Sparkles,
        badge: "Copy Tag",
        copyValue: `<t:${in15m}:R>`,
        description: "Countdown tag updating automatically in Discord chat",
      },
      {
        id: "preset-1h",
        title: "In 1 Hour (<t:" + in1h + ":R>)",
        category: "Instant Presets",
        icon: Sparkles,
        badge: "Copy Tag",
        copyValue: `<t:${in1h}:R>`,
        description: "Dynamic 60-minute relative countdown",
      },
      {
        id: "preset-3h",
        title: "In 3 Hours (<t:" + in3h + ":R>)",
        category: "Instant Presets",
        icon: Sparkles,
        badge: "Copy Tag",
        copyValue: `<t:${in3h}:R>`,
        description: "Perfect for scheduled raids, streams, and syncs",
      },
      {
        id: "preset-tomorrow",
        title: "Tomorrow Same Time (<t:" + tomorrow + ":F>)",
        category: "Instant Presets",
        icon: Clock,
        badge: "Copy Tag",
        copyValue: `<t:${tomorrow}:F>`,
        description: "Full day of week and time tag in recipient's local clock",
      },
      {
        id: "preset-1w",
        title: "Next Week (<t:" + in1w + ":F>)",
        category: "Instant Presets",
        icon: Clock,
        badge: "Copy Tag",
        copyValue: `<t:${in1w}:F>`,
        description: "Scheduled event date for next week",
      },
    ];
  }, [isOpen]);

  const toolCommands: CommandItem[] = [
    {
      id: "tool-generator",
      title: "Discord Timestamp Generator",
      category: "Tools",
      icon: Clock,
      badge: "Main",
      href: "/",
      description: "Datepicker, timezone converter, and live Discord preview",
    },
    {
      id: "tool-embed",
      title: "Discord Embed Generator & Webhook Maker",
      category: "Tools",
      icon: LayoutTemplate,
      badge: "Visual Builder",
      href: "/discord-embed-generator",
      description: "Interactive embed editor with discord.js, python & JSON export",
    },
    {
      id: "tool-invisible",
      title: "Discord Invisible Name & Blank Character",
      category: "Tools",
      icon: Ghost,
      badge: "1-Click Copy",
      href: "/discord-invisible-name",
      description: "Hangul Filler (U+3164) for blank usernames and channels",
    },
    {
      id: "tool-colored",
      title: "Discord Colored Text Formatter (ANSI)",
      category: "Tools",
      icon: Palette,
      badge: "8 Colors",
      href: "/discord-colored-text",
      description: "Visual ANSI escape codes for formatted announcement codeblocks",
    },
    {
      id: "tool-font",
      title: "Discord Font Generator",
      category: "Tools",
      icon: Type,
      badge: "Unicode",
      href: "/discord-font-generator",
      description: "Small caps, gothic, cursive, and aesthetic text styles",
    },
    {
      id: "tool-character",
      title: "Discord Character & Nitro Counter",
      category: "Tools",
      icon: Hash,
      badge: "Limits",
      href: "/discord-character-counter",
      description: "Message (2000), Nitro (4000), and Bio length validator",
    },
    {
      id: "tool-mention",
      title: "Discord Mention & Emoji Formatter",
      category: "Tools",
      icon: AtSign,
      badge: "Raw Tags",
      href: "/discord-mention-generator",
      description: "Raw IDs for users, roles, channels, emojis, and slash commands",
    },
    {
      id: "tool-snowflake",
      title: "Discord Snowflake ID Decoder",
      category: "Tools",
      icon: Hash,
      badge: "Epoch Math",
      href: "/discord-snowflake-to-timestamp",
      description: "Extract exact creation timestamps from Discord IDs",
    },
    {
      id: "tool-formats",
      title: "Discord Timestamp Formats Guide",
      category: "Tools",
      icon: Layers,
      badge: "Cheat Sheet",
      href: "/discord-timestamp-formats",
      description: "Compare all 7 format style flags (:R, :t, :T, :d, :D, :f, :F)",
    },
    {
      id: "tool-unix",
      title: "Unix Timestamp Converter",
      category: "Tools",
      icon: Binary,
      badge: "Epoch Tool",
      href: "/unix-timestamp",
      description: "10-digit seconds vs 13-digit millisecond time conversions",
    },
  ];

  const docCommands: CommandItem[] = [
    {
      id: "doc-guides",
      title: "Developer Blog & Guides Hub",
      category: "Documentation",
      icon: BookOpen,
      href: "/blog",
      description: "Tutorials on Discord APIs, rate limits, and bots",
    },
    {
      id: "doc-bot",
      title: "Discord Bot Timestamps (discord.js & discord.py)",
      category: "Documentation",
      icon: BookOpen,
      href: "/discord-bot-timestamps",
      description: "Copy-paste automation snippets for bots and webhooks",
    },
    {
      id: "doc-troubleshoot",
      title: "Timestamp Not Working Troubleshooting Guide",
      category: "Documentation",
      icon: BookOpen,
      href: "/blog/discord-timestamp-not-working-troubleshooting-guide",
      description: "Fix backtick syntax bugs and raw text leaks in chat",
    },
  ];

  const allCommands = useMemo(() => {
    return [...presetCommands, ...toolCommands, ...docCommands];
  }, [presetCommands]);

  const filteredCommands = useMemo(() => {
    if (!query.trim()) return allCommands;
    const lower = query.toLowerCase();
    return allCommands.filter(
      (cmd) =>
        cmd.title.toLowerCase().includes(lower) ||
        cmd.category.toLowerCase().includes(lower) ||
        cmd.description?.toLowerCase().includes(lower) ||
        cmd.badge?.toLowerCase().includes(lower)
    );
  }, [allCommands, query]);

  // Execute action on selected command
  const executeCommand = async (cmd: CommandItem) => {
    if (cmd.copyValue) {
      try {
        await navigator.clipboard.writeText(cmd.copyValue);
        playCopySound();
        setCopiedId(cmd.id);
        setTimeout(() => {
          setCopiedId(null);
          setIsOpen(false);
        }, 800);
      } catch {
        // Fallback
      }
    } else if (cmd.href) {
      playPresetSound();
      setIsOpen(false);
      router.push(cmd.href);
    }
  };

  // Keyboard navigation inside list
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredCommands.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = filteredCommands[selectedIndex];
      if (selected) executeCommand(selected);
    }
  };

  const handleToggleSound = () => {
    const next = !soundActive;
    setSoundActive(next);
    setSoundEnabled(next);
    if (next) playCopySound();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/75 backdrop-blur-sm p-4 pt-16 sm:pt-24 animate-in fade-in duration-150"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-800 bg-[#0d1117] shadow-2xl shadow-black/90 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-slate-800/80 px-4 py-3.5 bg-slate-900/50">
          <Search className="h-5 w-5 text-indigo-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a tool name or preset (e.g. embed, 15m, invisible, font)..."
            className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
            aria-label="Search tools and commands"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 text-slate-400 hover:text-white rounded-md transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            onClick={handleToggleSound}
            title={soundActive ? "Audio feedback enabled (Click to mute)" : "Audio muted (Click to enable)"}
            className={`p-1.5 rounded-lg border text-xs font-mono transition-colors ${
              soundActive
                ? "border-emerald-500/30 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-900/40"
                : "border-slate-800 bg-slate-900 text-slate-500 hover:text-slate-300"
            }`}
          >
            {soundActive ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
          <kbd className="hidden sm:inline-flex items-center rounded border border-slate-800 bg-slate-900 px-2 py-0.5 text-[11px] font-mono text-slate-400">
            Esc
          </kbd>
        </div>

        {/* Command Items List */}
        <div
          ref={listRef}
          className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-slate-800/40 scrollbar-thin scrollbar-thumb-slate-800"
        >
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-40 text-indigo-400" />
              <p className="text-sm">No commands or tools matching &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-slate-600 mt-1">Try searching for &quot;embed&quot;, &quot;timestamp&quot;, or &quot;1h&quot;</p>
            </div>
          ) : (
            filteredCommands.map((cmd, index) => {
              const Icon = cmd.icon;
              const isSelected = index === selectedIndex;
              const isCopied = copiedId === cmd.id;

              return (
                <div
                  key={cmd.id}
                  onClick={() => executeCommand(cmd)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`group flex items-center justify-between gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? "bg-indigo-600/15 border border-indigo-500/30 shadow-inner"
                      : "hover:bg-slate-850/60 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-2 rounded-lg transition-colors ${
                        isSelected
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                          : "bg-slate-800/80 text-slate-400 group-hover:text-slate-200"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-medium truncate ${
                            isSelected ? "text-white" : "text-slate-200"
                          }`}
                        >
                          {cmd.title}
                        </span>
                        {cmd.badge && (
                          <span
                            className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                              cmd.category === "Instant Presets"
                                ? "border-emerald-500/30 bg-emerald-950/40 text-emerald-300"
                                : "border-indigo-500/30 bg-indigo-950/40 text-indigo-300"
                            }`}
                          >
                            {cmd.badge}
                          </span>
                        )}
                      </div>
                      {cmd.description && (
                        <p className="text-xs text-slate-500 truncate mt-0.5">
                          {cmd.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {cmd.copyValue ? (
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-colors ${
                          isCopied
                            ? "bg-emerald-600 text-white"
                            : isSelected
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-800 text-slate-300"
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="h-3.5 w-3.5" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span className="hidden sm:inline">Press Enter</span>
                          </>
                        )}
                      </span>
                    ) : (
                      <span
                        className={`hidden sm:inline-flex items-center gap-1 text-[11px] font-mono ${
                          isSelected ? "text-indigo-400" : "text-slate-600"
                        }`}
                      >
                        <span>Open</span>
                        <CornerDownLeft className="h-3 w-3" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="flex items-center justify-between border-t border-slate-800/80 bg-slate-900/70 px-4 py-2.5 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-slate-800 bg-slate-950 px-1.5 py-0.5 text-slate-300">↑</kbd>
              <kbd className="rounded border border-slate-800 bg-slate-950 px-1.5 py-0.5 text-slate-300">↓</kbd>
              <span>to navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-slate-800 bg-slate-950 px-1.5 py-0.5 text-slate-300">↵</kbd>
              <span>to select / copy</span>
            </span>
          </div>
          <span className="text-slate-500">10 Discord Utilities</span>
        </div>
      </div>
    </div>
  );
}
