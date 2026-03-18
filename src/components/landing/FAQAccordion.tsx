"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What is included in the rent?",
    answer:
      "Rent covers utilities, high-speed Wi-Fi, security services, and access to shared spaces.",
  },
  {
    question: "Is NSFAS funding accepted?",
    answer:
      "Yes, our res are NSFAS accredited and fully compliant.",
  },
  {
    question: "Is the res walkable to campus?",
    answer: "Yes, every res is less than 2km to GS Ermelo Campus.",
  },
  {
    question: "How do I book a viewing?",
    answer:
      "Use the booking form or contact our team to schedule an in-person or virtual tour.",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-picasso-brown">
            FAQs
          </p>
          <h2 className="font-serif text-3xl text-neutral-900">
            Answers to common questions
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="rounded-2xl border border-white/40 bg-white/80 p-6 shadow-md backdrop-blur"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between text-left text-base font-semibold text-neutral-900"
                  aria-expanded={isOpen}
                  onClick={() =>
                    setOpenIndex((prev) => (prev === index ? null : index))
                  }
                >
                  {faq.question}
                  <span className="text-picasso-brown">
                    {isOpen ? "-" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <p className="mt-3 text-sm text-neutral-600">{faq.answer}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
