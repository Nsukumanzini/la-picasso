"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 12);
      if (currentScrollY > lastScrollY && currentScrollY > 64) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY = currentScrollY;
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className={`mt-4 flex items-center justify-between rounded-2xl px-6 py-3 transition duration-300 ${
            scrolled
              ? "bg-[#4E342E] shadow-lg"
              : "bg-picasso-brown"
          }`}
        >
          <div className="text-lg font-semibold tracking-wide text-white">
            La Picasso Property Group
          </div>
          <Link
            href="/apply"
            className="rounded-full border border-white/50 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white md:hidden"
          >
            Apply
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-white md:flex">
            <Link className="transition hover:text-white/80" href="/properties">
              Properties
            </Link>
            <Link className="transition hover:text-white/80" href="/about">
              About
            </Link>
            <Link className="transition hover:text-white/80" href="/properties">
              Accommodation
            </Link>
            <Link className="transition hover:text-white/80" href="/contact">
              Contact
            </Link>
          </nav>
          <div className="hidden items-center gap-4 md:flex">
            <label className="sr-only" htmlFor="global-search">
              Search properties
            </label>
            <input
              id="global-search"
              type="search"
              placeholder="Search properties"
              className="h-10 w-64 rounded-full border border-white/40 bg-white px-4 text-sm text-neutral-800 shadow-inner outline-none transition focus:border-white"
            />
            <a
              href="tel:+27769883928"
              className="rounded-full border border-white/60 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-picasso-brown"
            >
              Call Now
            </a>
            <Link
              href="/apply"
              className="relative inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-5 py-2 text-xs font-semibold uppercase tracking-wide text-[#3E2723] shadow-md"
            >
              <motion.span
                className="h-2 w-2 rounded-full bg-[#3E2723]"
                animate={{ scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
