"use client";

import { motion } from "framer-motion";

type PropertySummaryProps = {
  description: string;
  badges: string[];
};

export default function PropertySummary({
  description,
  badges,
}: PropertySummaryProps) {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {badges.map((badge) => (
          <span
            key={badge}
            className="rounded-full border border-picasso-brown/30 bg-picasso-light/40 px-3 py-1 text-xs font-semibold text-picasso-brown"
          >
            {badge}
          </span>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, margin: "-80px" }}
      >
        <p className="text-base text-neutral-700">{description}</p>
      </motion.div>
    </div>
  );
}
