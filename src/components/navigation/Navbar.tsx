"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#30211e]/95 px-4 py-3 shadow-xl shadow-[#2b1c19]/20 backdrop-blur-md sm:px-5">
          <Link href="/" aria-label="La Picasso home" className="flex items-center gap-3 text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D4AF37] font-serif text-lg font-bold text-[#3E2723]">LP</span>
            <span className="leading-none"><span className="block text-base font-semibold tracking-wide">La Picasso</span><span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.2em] text-white/55">Property Group</span></span>
          </Link>
          <div className="hidden items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#f1d77d] lg:flex"><span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" /> 2027 applications open</div>
          <button type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen(!open)} className="rounded-full border border-white/25 px-3 py-2 text-xs font-semibold text-white md:hidden">{open ? "Close" : "Menu"}</button>
          <nav className={`${open ? "flex" : "hidden"} basis-full flex-col gap-4 border-t border-white/10 pt-4 text-sm font-medium text-white md:flex md:basis-auto md:flex-row md:items-center md:gap-7 md:border-0 md:pt-0`}>
            <Link className="transition hover:text-[#f1d77d]" href="/properties">Properties</Link>
            <Link className="transition hover:text-[#f1d77d]" href="/about">About</Link>
            <Link className="transition hover:text-[#f1d77d]" href="/contact">Contact</Link>
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <a href="tel:+27769883928" className="rounded-full border border-white/35 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:border-white hover:bg-white/10">Call us</a>
            <Link href="/apply" className="rounded-full bg-[#D4AF37] px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-[#3E2723] shadow-md shadow-black/20 transition hover:bg-[#e3c55b]">Apply for 2027</Link>
          </div>
        </div>
      </div>
    </header>
  );
}