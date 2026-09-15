"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className="mt-4 flex flex-wrap items-center justify-between rounded-2xl bg-[#3d2924] px-5 py-3 shadow-lg"
        >
          <div className="text-lg font-semibold tracking-wide text-white">
            <span>La Picasso</span><span className="ml-2 text-xs font-normal text-white/70">Student homes</span>
          </div>
          <button type="button" aria-label="Toggle navigation" onClick={() => setOpen(!open)} className="rounded-full border border-white/30 px-3 py-2 text-xs text-white md:hidden">Menu</button>
          <nav className={`${open ? "flex" : "hidden"} basis-full flex-col gap-4 pt-4 text-sm font-medium text-white md:flex md:basis-auto md:flex-row md:items-center md:gap-7 md:pt-0`}>
            <Link className="transition hover:text-white/80" href="/properties">
              Properties
            </Link>
            <Link className="transition hover:text-white/80" href="/about">
              About
            </Link>
            <Link className="transition hover:text-white/80" href="/contact">
              Contact
            </Link>
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <a
              href="tel:+27769883928"
              className="rounded-full border border-white/60 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-picasso-brown"
            >
              Call Now
            </a>
            <Link href="/apply" className="rounded-full bg-[#D4AF37] px-5 py-2 text-xs font-semibold uppercase tracking-wide text-[#3E2723] shadow-md">
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
