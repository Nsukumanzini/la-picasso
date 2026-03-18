"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });

  return (
    <motion.div
      className="fixed left-0 top-0 z-[70] h-[2px] w-full origin-left bg-picasso-brown"
      style={{ scaleX }}
    />
  );
}
