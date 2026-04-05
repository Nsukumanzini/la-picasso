"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cormorant_Garamond } from "next/font/google";

// ── Font: loaded at module scope — valid in "use client" components.
// No changes to layout.tsx needed; this font is self-contained here.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// Single source of truth — drives both the dismiss timer and the progress bar animation.
const DISPLAY_DURATION = 3500; // ms (3.5 seconds)

export default function SplashScreen() {
  // Start as false so nothing renders on the server (prevents hydration mismatch).
  // useEffect opts-in client-side only.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show only once per browser session.
    if (sessionStorage.getItem("splash-shown")) return;
    sessionStorage.setItem("splash-shown", "1");

    setVisible(true);
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => setVisible(false), DISPLAY_DURATION);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  // Ensure scroll is fully restored after the exit animation completes.
  const handleExitComplete = () => {
    document.body.style.overflow = "";
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#5D4037]"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{
            duration: 0.75,
            ease: [0.76, 0, 0.24, 1], // easeInOutQuart — cinematic curtain slide-up
          }}
        >
          {/* ── Brand content ── */}
          {/* Cinematic entrance: slow scale + fade over 1.4s while the 3.5s timer runs */}
          <motion.div
            className="flex flex-col items-center gap-5 px-8 text-center"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: "easeOut", delay: 0.1 }}
          >
            {/* Top decorative rule */}
            <motion.span
              className="block h-px w-16 bg-[#D4AF37]/70"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
              style={{ transformOrigin: "center" }}
            />

            {/* Welcome line */}
            <p
              className={`${cormorant.className} text-lg font-light tracking-[0.28em] uppercase text-white/70 sm:text-xl`}
            >
              Welcome to
            </p>

            {/* Primary wordmark */}
            <h1
              className={`${cormorant.className} text-5xl font-semibold italic tracking-[0.08em] text-[#D4AF37] sm:text-6xl md:text-7xl lg:text-8xl`}
            >
              La Picasso
            </h1>

            {/* Subtitle */}
            <p
              className={`${cormorant.className} text-base font-light tracking-[0.3em] uppercase text-white/80 sm:text-lg`}
            >
              Student Accommodation
            </p>

            {/* Bottom decorative rule */}
            <motion.span
              className="block h-px w-16 bg-[#D4AF37]/70"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.7 }}
              style={{ transformOrigin: "center" }}
            />
          </motion.div>

          {/* ── Progress line — scaleX synced to DISPLAY_DURATION ── */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
            <motion.div
              className="h-full origin-left bg-[#D4AF37]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: DISPLAY_DURATION / 1000,
                ease: "linear",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
