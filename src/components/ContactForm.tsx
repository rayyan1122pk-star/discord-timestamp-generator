"use client";

import React, { useState } from "react";
import { Check, Send } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("feedback");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-4">
          <Check className="h-6 w-6" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-bold text-white">Message Received!</h3>
        <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto">
          Thank you for reaching out, {name}. Our engineering team reviews all feedback and suggestions.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setName("");
            setEmail("");
            setMessage("");
          }}
          className="mt-6 px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-colors"
        >
          Send Another Note
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-xs font-medium text-slate-300 mb-1.5">
            Your Name
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Robin"
            className="w-full rounded-lg border border-slate-700 bg-slate-900/90 px-3.5 py-2 text-sm text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-xs font-medium text-slate-300 mb-1.5">
            Email Address
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@domain.com"
            className="w-full rounded-lg border border-slate-700 bg-slate-900/90 px-3.5 py-2 text-sm text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-xs font-medium text-slate-300 mb-1.5">
          Topic
        </label>
        <select
          id="contact-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-900/90 px-3 py-2 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="feedback">General Feedback &amp; Suggestions</option>
          <option value="bug">Bug Report / Syntax Error</option>
          <option value="guide-idea">Suggest a Guide or Tutorial</option>
          <option value="partnership">API / Developer Inquiry</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-msg" className="block text-xs font-medium text-slate-300 mb-1.5">
          Message
        </label>
        <textarea
          id="contact-msg"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Share your thoughts, suggestions, or reproduction steps..."
          className="w-full rounded-lg border border-slate-700 bg-slate-900/90 px-3.5 py-2 text-sm text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-[#5865F2] hover:bg-[#4752c4] transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
      >
        <Send className="h-3.5 w-3.5" aria-hidden="true" />
        <span>Send Message</span>
      </button>
    </form>
  );
}
