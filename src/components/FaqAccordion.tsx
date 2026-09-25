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
    <section aria-labelledby="faq-heading" className="my-16 pt-10 border-t border-slate-800/80">
      <div className="mb-8">
        <h2 id="faq-heading" className="text-2xl font-bold tracking-tight text-white">
          {title}
        </h2>
        {description && <p className="mt-2 text-sm text-slate-400">{description}</p>}
      </div>

      <div className="divide-y divide-slate-800/70">
        {items.map((item, idx) => {
          const isOpen = openIndices.includes(idx);
          const questionId = `faq-q-${idx}`;
          const answerId = `faq-a-${idx}`;

          return (
            <div key={idx} className="py-5 first:pt-0 last:pb-0">
              <button
                type="button"
                id={questionId}
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => toggleIndex(idx)}
                className="flex w-full items-center justify-between text-left text-base font-medium text-slate-200 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-400 rounded py-1"
              >
                <span className="pr-4">{item.question}</span>
                <ChevronDown
                  className={`h-4 w-4 flex-shrink-0 text-slate-500 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-indigo-400" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              {isOpen && (
                <div id={answerId} role="region" aria-labelledby={questionId} className="mt-3 text-sm leading-relaxed text-slate-400 pr-8">
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
