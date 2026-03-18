"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type BentoGalleryProps = {
  images: string[];
  title: string;
  slug: string;
};

export default function BentoGallery({
  images,
  title,
  slug,
}: BentoGalleryProps) {
  const galleryImages = useMemo(() => {
    const unique = Array.from(new Set(images)).filter(Boolean) as string[];
    return unique.length ? unique : [""];
  }, [images]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (galleryImages.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [galleryImages.length]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) =>
      (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/70 p-3 shadow-lg backdrop-blur sm:p-4">
        <div className="relative h-64 overflow-hidden rounded-2xl bg-gradient-to-br from-picasso-light/60 to-white/40 sm:h-80">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
            style={{ backgroundImage: `url(${galleryImages[activeIndex]})` }}
          />
          <div className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
            {activeIndex + 1} / {galleryImages.length}
          </div>
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className="rounded-full border border-white/70 bg-white/90 px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-neutral-700"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="rounded-full border border-white/70 bg-white/90 px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-neutral-700"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <Link
        href={`/gallery#${slug}`}
        className="inline-flex w-full items-center justify-center rounded-full bg-picasso-brown px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white shadow-md sm:w-fit"
      >
        See all the pictures of {title}
      </Link>
    </div>
  );
}
