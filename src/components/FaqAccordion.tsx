"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  title?: string;
  description?: string;
}

export function FaqAccordion({ items, title = "Frequently Asked Questions", description }: FaqAccordionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section aria-labelledby="faq-heading" className="my-10 rounded-xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
      <div className="mb-6">
        <h2 id="faq-heading" className="text-xl md:text-2xl font-semibold tracking-tight text-white">
          {title}
        </h2>
        {description && <p className="mt-1 text-sm text-slate-400">{description}</p>}
      </div>

      <div className="divide-y divide-slate-800/80">
        {items.map((item, idx) => {
          const isOpen = openIndices.includes(idx);
          const questionId = `faq-q-${idx}`;
          const answerId = `faq-a-${idx}`;

          return (
            <div key={idx} className="py-4 first:pt-0 last:pb-0">
              <button
                type="button"
                id={questionId}
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => toggleIndex(idx)}
                className="flex w-full items-center justify-between text-left text-base font-medium text-slate-200 hover:text-white transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`h-4 w-4 flex-shrink-0 text-slate-400 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-indigo-400" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              {isOpen && (
                <div id={answerId} role="region" aria-labelledby={questionId} className="mt-2.5 text-sm leading-relaxed text-slate-300 pr-6">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
