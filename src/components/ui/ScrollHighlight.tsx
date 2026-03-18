"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type ScrollHighlightProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ScrollHighlight({
  children,
  className,
}: ScrollHighlightProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <span ref={ref} className={`relative inline-block ${className ?? ""}`}>
      <motion.span
        className="absolute inset-x-0 bottom-1 -z-10 h-3 rounded-full bg-picasso-light"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isInView ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ transformOrigin: "0% 50%" }}
      />
      {children}
    </span>
  );
}
