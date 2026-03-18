"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import type { PropertyRecord, ViewMode } from "./types";

const nsfasBadge = "NSFAS Accredited";
const nsfasNote = "Includes your student home, transport, & Wi-Fi";

type PropertyCardProps = {
  property: PropertyRecord;
  viewMode: ViewMode;
};

export default function PropertyCard({ property, viewMode }: PropertyCardProps) {
  const [index, setIndex] = useState(0);
  const [isIncludedOpen, setIsIncludedOpen] = useState(false);
  const images = property.images.length > 0 ? property.images : [""];
  const isList = viewMode === "list";

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <article
      className={`group overflow-hidden rounded-3xl border border-white/40 bg-white/80 shadow-lg backdrop-blur transition ${
        isList ? "grid gap-4 p-4 md:grid-cols-[1.2fr_1.6fr]" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-picasso-light/60 to-white/40 ${
          isList ? "h-full min-h-[240px]" : "h-56"
        }`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${images[index]})` }}
        />
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
            Available
          </span>
          {property.nsfasVerified && (
            <span className="rounded-full border border-white/60 bg-white/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-picasso-brown">
              NSFAS Verified
            </span>
          )}
        </div>
        {property.distance ? (
          <div className="absolute right-3 top-3 flex flex-col items-end gap-2">
            <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-neutral-700">
              {property.distance}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-picasso-brown">
              <MapPin className="h-3 w-3" />
              Walk to Campus
            </span>
          </div>
        ) : null}
        <div className="absolute bottom-3 right-3 flex gap-2">
          <button
            type="button"
            onClick={handlePrev}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-neutral-700 shadow-sm"
            aria-label="Previous image"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-neutral-700 shadow-sm"
            aria-label="Next image"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-4 p-5">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-neutral-900">
              {property.name}
            </h3>
            <span className="rounded-full border border-picasso-brown/40 bg-picasso-light/40 px-3 py-1 text-xs font-semibold text-picasso-brown">
              {property.roomTypes.join(" / ")}
            </span>
          </div>
          <p className="text-sm text-neutral-600">{property.description}</p>
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setIsIncludedOpen((prev) => !prev)}
              className="flex w-full items-center justify-between rounded-xl border border-neutral-200 bg-white/80 px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-600"
            >
              <span>View what&apos;s included</span>
              <span className="text-picasso-brown">
                {isIncludedOpen ? "Hide" : "Show"}
              </span>
            </button>
            {isIncludedOpen ? (
              <div className="flex flex-wrap gap-2">
                {property.accommodation.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/60 bg-white/70 px-3 py-1 text-[11px] font-medium text-neutral-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="group/price relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
              {nsfasBadge}
            </div>
            <p className="mt-2 text-xs text-neutral-600">{nsfasNote}</p>
            <div className="pointer-events-none absolute bottom-full left-0 mb-2 w-56 origin-bottom-left scale-95 rounded-xl border border-white/40 bg-white/95 p-3 text-xs text-neutral-700 opacity-0 shadow-lg transition-all duration-200 group-hover/price:scale-100 group-hover/price:opacity-100">
              100% Covered by NSFAS. No Top-Up Required.
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/apply?property=${property.slug}`}
              className="rounded-full bg-picasso-brown px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-md"
            >
              Apply Now
            </Link>
            <Link
              href={`/properties/${property.slug}`}
              className="rounded-full border border-picasso-brown/40 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-picasso-brown"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
