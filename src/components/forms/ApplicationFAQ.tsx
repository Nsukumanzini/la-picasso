"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How long does approval take?",
    answer: "Approvals are typically processed within 3 to 5 business days.",
  },
  {
    question: "What documents do I need?",
    answer:
      "A certified ID copy, proof of registration, and proof of income or NSFAS approval.",
  },
  {
    question: "Is NSFAS funding accepted?",
    answer: "Yes, all res are NSFAS accredited.",
  },
  {
    question: "Is NSFAS proof required?",
    answer: "Yes, NSFAS proof is required to secure your spot.",
  },
  {
    question: "Can I visit before applying?",
    answer: "Yes. You can book a viewing first, then apply when ready.",
  },
];

export default function ApplicationFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="rounded-3xl border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-picasso-brown">
        Application FAQ
      </p>
      <h2 className="mt-2 font-serif text-2xl text-neutral-900">
        Booking guidance
      </h2>
      <div className="mt-4 space-y-3">
        {faqs.map((item, index) => {
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
