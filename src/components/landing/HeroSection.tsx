"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Phone } from "lucide-react";
import Link from "next/link";

const phrases = [
  "Find your home...",
  "Find your community...",
  "Meet new people...",
  "Kusekhaya e LaPicasso...",
];

export default function HeroSection() {
  const [displayText, setDisplayText] = useState(phrases[0]);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const rotateX = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });
  const tiltRef = useRef<HTMLDivElement | null>(null);

  const currentPhrase = useMemo(() => phrases[phraseIndex], [phraseIndex]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentPhrase.length) {
        const nextIndex = charIndex + 1;
        setCharIndex(nextIndex);
        setDisplayText(currentPhrase.slice(0, nextIndex));
        return;
      }

      if (isDeleting && charIndex > 0) {
        const nextIndex = charIndex - 1;
        setCharIndex(nextIndex);
        setDisplayText(currentPhrase.slice(0, nextIndex));
        return;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }, isDeleting ? 45 : 80);

    return () => clearTimeout(timeout);
  }, [charIndex, currentPhrase, isDeleting]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltRef.current) return;
    const rect = tiltRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateMax = 8;
    const rotateYValue = ((x / rect.width) - 0.5) * rotateMax * 2;
    const rotateXValue = ((y / rect.height) - 0.5) * rotateMax * -2;
    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <section className="relative overflow-hidden pb-24 pt-28 snap-start">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-24 top-10 h-80 w-80 rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(215,204,200,0.75) 0%, rgba(215,204,200,0) 70%)",
          }}
        />
        <div
          className="absolute right-10 top-28 h-96 w-96 rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(93,64,55,0.4) 0%, rgba(93,64,55,0) 70%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid-12 items-center">
          <div className="col-span-12 space-y-6 lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-picasso-brown shadow-sm backdrop-blur">
              Premium Living
            </div>
            <div className="space-y-4">
              <h1 className="font-serif text-4xl leading-tight text-neutral-900 sm:text-5xl">
                Premium Student Homes. 100% NSFAS Accredited.
              </h1>
              <h2 className="min-h-[3rem] text-2xl font-semibold text-picasso-brown">
                <span className="sr-only">{currentPhrase}</span>
                <span aria-live="polite">{displayText}</span>
                <span className="ml-1 inline-block h-6 w-[2px] animate-pulse bg-picasso-brown align-middle" />
              </h2>
              <p className="max-w-xl text-base text-neutral-700">
                A beautiful portfolio of secure, stylish res tailored for
                ambitious students who value community, focus, and comfort.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/apply"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-picasso-brown px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg"
              >
                <span className="absolute inset-0 rounded-full bg-picasso-brown/40 blur-lg animate-pulse" />
                <span className="relative">Apply Now</span>
              </Link>
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 rounded-full border border-picasso-brown/40 bg-white/70 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-picasso-brown shadow-sm backdrop-blur transition hover:border-picasso-brown"
              >
                View our residences
              </Link>
              <Link
                href="tel:+27769883928"
                className="inline-flex items-center gap-2 rounded-full border border-picasso-brown/40 bg-white/70 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-picasso-brown shadow-sm backdrop-blur transition hover:border-picasso-brown"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-600">
              <span>NSFAS Only</span>
              <span className="text-picasso-brown">•</span>
              <span>Free Wi-Fi</span>
              <span className="text-picasso-brown">•</span>
              <span>Walk to Campus</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              We handle the admin directly with NSFAS.
            </div>
          </div>

          <div className="relative col-span-12 mt-12 lg:col-span-6 lg:mt-0">
            <motion.div
              ref={tiltRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY }}
              className="relative mx-auto h-[360px] w-full max-w-md rounded-[32px] border border-white/40 bg-white/50 shadow-2xl backdrop-blur-xl"
            >
              <div className="absolute inset-4 overflow-hidden rounded-[28px] border border-dashed border-picasso-brown/40">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url(/assets/properties/legends-lodge/outside-8.jpeg)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-picasso-light/30" />
                <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-picasso-brown shadow-sm">
                  Legends Lodge
                </div>
              </div>
            </motion.div>

            <div className="absolute -left-6 top-6 rounded-2xl border border-white/40 bg-white/70 px-4 py-3 text-xs font-semibold text-neutral-800 shadow-lg backdrop-blur">
              NSFAS Accredited
            </div>
            <div className="absolute -right-4 bottom-16 rounded-2xl border border-white/40 bg-white/70 px-4 py-3 text-xs font-semibold text-neutral-800 shadow-lg backdrop-blur">
               Walk to Campus
            </div>
           
          </div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-picasso-brown/40 bg-white/70 text-picasso-brown shadow-sm backdrop-blur">
          <span className="text-lg">&#8595;</span>
        </div>
      </motion.div>
    </section>
  );
}
