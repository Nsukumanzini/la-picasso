"use client";

import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

type PropertyFAQProps = {
  items: FAQItem[];
};

export default function PropertyFAQ({ items }: PropertyFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="rounded-3xl border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-picasso-brown">
        FAQ
      </p>
      <h2 className="mt-2 font-serif text-2xl text-neutral-900">
        Building-specific questions
      </h2>
      <div className="mt-4 space-y-3">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.question} className="rounded-2xl border border-white/40 bg-white/70 p-4">
              <button
                type="button"
                className="flex w-full items-center justify-between text-left text-sm font-semibold text-neutral-800"
                aria-expanded={isOpen}
                onClick={() =>
                  setOpenIndex((prev) => (prev === index ? null : index))
                }
              >
                {item.question}
                <span className="text-picasso-brown">
                  {isOpen ? "-" : "+"}
                </span>
              </button>
              {isOpen && (
                <p className="mt-3 text-sm text-neutral-600">{item.answer}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
