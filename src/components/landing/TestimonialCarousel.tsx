"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Yenzokuhle Nxumalo",
    quote:
      "The res feels safe and premium, and the study spaces are perfect for focus.",
  },
  {
    name: "Welcome Madonsela",
    quote:
      "The community events helped me settle in quickly. It truly feels like home.",
  },
  {
    name: "Nsuku Manzini",
    quote:
      "Fast Wi-Fi, great security, and a beautiful space. I would choose it again.",
  },
  {
    name: "Bongane Maseko",
    quote:
      "Beautiful rooms and a great location. The staff are friendly and always ready to help.",
  },
];

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/40 bg-white/80 p-10 text-center shadow-lg backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-picasso-brown">
            Student Feedback
          </p>
          <div className="relative mt-6 min-h-[140px]">
            {testimonials.map((testimonial, testimonialIndex) => (
              <motion.div
                key={testimonial.name}
                animate={{ opacity: testimonialIndex === index ? 1 : 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-4"
              >
                <p className="text-lg text-neutral-700">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="text-sm font-semibold text-neutral-900">
                  {testimonial.name}
                </div>
                <div className="text-picasso-brown">★★★★★</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
