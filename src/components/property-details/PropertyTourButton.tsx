"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { PlayCircle, X } from "lucide-react";
import VideoCarousel from "./VideoCarousel";

type VideoItem = { src: string; label?: string };

type PropertyTourButtonProps = {
  title: string;
  videos: Array<string | VideoItem>;
  className?: string;
};

export default function PropertyTourButton({ title, videos, className = "" }: PropertyTourButtonProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      buttonRef.current?.focus();
    };
  }, [open]);

  if (!videos.length) return null;

  const dialog = <div className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain bg-black/65 p-4 sm:p-6" role="dialog" aria-modal="true" aria-label={`${title} video tours`} onClick={() => setOpen(false)}>
    <div className="flex min-h-full items-center justify-center">
      <div className="max-h-[calc(100dvh-2rem)] w-full max-w-4xl overflow-y-auto overscroll-contain rounded-3xl bg-[#fbfaf8] p-4 shadow-2xl sm:p-6" onClick={(event) => event.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-picasso-brown">{title}</p><h2 className="mt-1 font-serif text-2xl text-neutral-900">Property tour</h2></div><button type="button" onClick={() => setOpen(false)} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-neutral-200 bg-white text-neutral-700" aria-label="Close property tour"><X className="h-5 w-5" /></button></div>
        <VideoCarousel videos={videos} />
      </div>
    </div>
  </div>;

  return <>
    <button ref={buttonRef} type="button" onClick={() => setOpen(true)} className={`inline-flex items-center justify-center gap-2 rounded-full border border-picasso-brown/30 bg-white px-4 py-2 text-sm font-semibold text-picasso-brown transition hover:bg-picasso-light/40 ${className}`}>
      <PlayCircle className="h-4 w-4" /> Watch property tour
    </button>
    {open && mounted ? createPortal(dialog, document.body) : null}
  </>;
}
