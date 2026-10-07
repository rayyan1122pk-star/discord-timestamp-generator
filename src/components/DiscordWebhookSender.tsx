"use client";

import React, { useState } from "react";
import {
  Send,
  Check,
  AlertTriangle,
  RotateCcw,
  Copy,
  ExternalLink,
  ShieldCheck,
  Clock,
  Code2,
  Terminal,
  Sparkles,
} from "lucide-react";
import { playCopySound, playPresetSound } from "@/lib/sound-effects";

export function DiscordWebhookSender() {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [username, setUsername] = useState("Server Announcer");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [content, setContent] = useState("Community Sync starts <t:1794686400:R>! Make sure to join voice chat.");
  const [embedTitle, setEmbedTitle] = useState("Weekly Guild Announcement");
  const [embedDescription, setEmbedDescription] = useState("All members are requested to attend. Event scheduled for <t:1794686400:F>.");
  const [embedColor, setEmbedColor] = useState("#5865F2");
  
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<{ success: boolean; message: string } | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Convert hex color to Discord integer decimal
  const getDecimalColor = (hex: string): number => {
    const clean = hex.replace("#", "");
    return parseInt(clean, 16) || 5793266;
  };

  const getPayload = () => {
    const payload: Record<string, unknown> = {
      content: content.trim() || undefined,
      username: username.trim() || undefined,
      avatar_url: avatarUrl.trim() || undefined,
    };

    if (embedTitle.trim() || embedDescription.trim()) {
      payload.embeds = [
        {
          title: embedTitle.trim() || undefined,
          description: embedDescription.trim() || undefined,
          color: getDecimalColor(embedColor),
        },
      ];
    }

    return payload;
  };

  const jsonPayloadString = JSON.stringify(getPayload(), null, 2);

  const handleSendWebhook = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendResult(null);

    const cleanUrl = webhookUrl.trim();
    if (!cleanUrl.startsWith("https://discord.com/api/webhooks/") && !cleanUrl.startsWith("https://discordapp.com/api/webhooks/")) {
      setSendResult({
        success: false,
        message: "Invalid Webhook URL. It must start with https://discord.com/api/webhooks/...",
      });
      return;
    }

    setSending(true);
    playPresetSound();

    try {
      const response = await fetch(cleanUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonPayloadString,
      });

      if (response.status === 204 || response.ok) {
        playCopySound();
        setSendResult({
          success: true,
          message: "Message sent to Discord successfully! Status: 204 No Content.",
        });
      } else {
        const errorText = await response.text();
        setSendResult({
          success: false,
          message: `Discord API returned error code ${response.status}: ${errorText || response.statusText}`,
        });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to connect to Discord API";
      setSendResult({
        success: false,
        message: `Network Error: ${message}. If using browser adblockers or strict CORS rules, verify Discord allows this request.`,
      });
    } finally {
      setSending(false);
    }
  };

  const handleCopy = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      playCopySound();
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="space-y-8">
      {/* Privacy Guarantee Card */}
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 flex items-start gap-3">
        <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300">
          <strong className="text-emerald-300">100% Client-Side Direct Execution:</strong> Your Discord Webhook URL is dispatched directly from your browser to Discord API servers. We never log, cache, or store your webhook tokens.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Configuration */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-[#0e121a] p-5 sm:p-7 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Send className="h-5 w-5 text-indigo-400" />
            <span>Configure Discord Webhook</span>
          </h3>

          <form onSubmit={handleSendWebhook} className="space-y-4">
            {/* Webhook URL Input */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                Discord Webhook URL <span className="text-rose-400">*</span>
              </label>
              <input
                type="url"
                required
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://discord.com/api/webhooks/123456789/abcdefgh..."
                className="w-full rounded-lg border border-slate-700/80 bg-slate-900/90 px-3.5 py-2.5 text-xs font-mono text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Found in Discord Channel Settings &gt; Integrations &gt; Webhooks &gt; Copy Webhook URL.
              </p>
            </div>

            {/* Bot Username & Avatar Override */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                  Bot Name Override
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Server Announcer"
                  className="w-full rounded-lg border border-slate-700/80 bg-slate-900/90 px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                  Avatar Icon URL
                </label>
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://i.imgur.com/example.png"
                  className="w-full rounded-lg border border-slate-700/80 bg-slate-900/90 px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Message Body Content */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                  Message Content (Dynamic Timestamps Supported)
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const nowEpoch = Math.floor(Date.now() / 1000) + 3600;
                    setContent((prev) => `${prev} <t:${nowEpoch}:R>`);
                  }}
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-mono"
                >
                  <Clock className="h-3 w-3" />
                  <span>Insert Timestamp</span>
                </button>
              </div>
              <textarea
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Type your message with dynamic timestamps like <t:1794686400:R>..."
                className="w-full rounded-lg border border-slate-700/80 bg-slate-900/90 px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none font-mono"
              />
            </div>

            {/* Optional Embed Settings */}
            <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/50 space-y-3">
              <span className="text-xs font-semibold text-slate-300 block">
                Optional Embed Box
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    Embed Title
                  </label>
                  <input
                    type="text"
                    value={embedTitle}
                    onChange={(e) => setEmbedTitle(e.target.value)}
                    placeholder="Announcement Title"
                    className="w-full rounded-lg border border-slate-700/80 bg-slate-900 px-3 py-1.5 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    Embed Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={embedColor}
                      onChange={(e) => setEmbedColor(e.target.value)}
                      className="h-8 w-10 rounded border border-slate-700 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={embedColor}
                      onChange={(e) => setEmbedColor(e.target.value)}
                      className="w-full rounded-lg border border-slate-700/80 bg-slate-900 px-2 py-1.5 text-xs text-slate-100 font-mono focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  Embed Description
                </label>
                <textarea
                  rows={2}
                  value={embedDescription}
                  onChange={(e) => setEmbedDescription(e.target.value)}
                  placeholder="Embed details..."
                  className="w-full rounded-lg border border-slate-700/80 bg-slate-900 px-3 py-1.5 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Send Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={sending}
                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all shadow-lg active:scale-[0.98] ${
                  sending
                    ? "bg-slate-700 text-slate-300 cursor-not-allowed"
                    : "bg-[#5865F2] hover:bg-[#4752c4] text-white shadow-[#5865F2]/25"
                }`}
              >
                <Send className="h-4 w-4" />
                <span>{sending ? "Dispatching to Discord..." : "Send Test Message to Discord Channel"}</span>
              </button>
            </div>

            {/* Send Result Feedback Alert */}
            {sendResult && (
              <div
                className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 animate-in fade-in duration-200 ${
                  sendResult.success
                    ? "border-emerald-500/40 bg-emerald-950/30 text-emerald-300"
                    : "border-rose-500/40 bg-rose-950/30 text-rose-300"
                }`}
              >
                {sendResult.success ? (
                  <Check className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                ) : (
                  <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
                )}
                <div className="leading-relaxed">{sendResult.message}</div>
              </div>
            )}
          </form>
        </div>

        {/* Right Side: Real-time Discord Dark Mode Preview & Code Exports */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live Discord Message Preview Simulator */}
          <div className="rounded-2xl border border-slate-800 bg-[#1e1f22] p-5 shadow-xl text-[#dbdee1]">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#2b2d31]">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Live Chat Simulator
              </span>
              <span className="text-[11px] text-slate-500 font-mono">Discord Client Preview</span>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-[#5865F2] flex items-center justify-center font-bold text-white text-base shrink-0 overflow-hidden">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
                ) : (
                  <span>{username.charAt(0) || "B"}</span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-semibold text-white text-sm">
                    {username || "Server Announcer"}
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-[#5865F2] text-white tracking-wide uppercase">
                    APP
                  </span>
                  <span className="text-[11px] text-[#949ba4]">Today at 12:00 PM</span>
                </div>

                {content && (
                  <div className="mt-1 text-xs text-[#dbdee1] leading-relaxed break-words whitespace-pre-wrap">
                    {content}
                  </div>
                )}

                {/* Embed Preview Box */}
                {(embedTitle || embedDescription) && (
                  <div
                    className="mt-2.5 p-3 rounded-lg bg-[#2b2d31] border-l-4 text-xs space-y-1 shadow-sm"
                    style={{ borderLeftColor: embedColor }}
                  >
                    {embedTitle && (
                      <div className="font-bold text-white text-xs">{embedTitle}</div>
                    )}
                    {embedDescription && (
                      <div className="text-slate-300 text-[11px] leading-relaxed break-words whitespace-pre-wrap">
                        {embedDescription}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Code Export Box */}
          <div className="rounded-2xl border border-slate-800 bg-[#0e121a] p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
                <Code2 className="h-4 w-4 text-indigo-400" />
                <span>Raw Webhook JSON</span>
              </span>
              <button
                type="button"
                onClick={() => handleCopy(jsonPayloadString, "json")}
                className="px-2.5 py-1 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors flex items-center gap-1.5"
              >
                {copiedCode === "json" ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy JSON</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-indigo-300 overflow-x-auto max-h-48 scrollbar-thin">
              {jsonPayloadString}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
