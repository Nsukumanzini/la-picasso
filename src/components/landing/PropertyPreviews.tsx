"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { properties } from "@/data/properties";

type PropertyPreview = (typeof properties)[number];

const buildSlides = (property: PropertyPreview) => {
  const images = [
    property.images.cover,
    ...property.images.gallery,
    ...(property.gallery?.rooms ?? []),
    ...(property.gallery?.outside ?? []),
    ...(property.gallery?.kitchen ?? []),
    ...(property.gallery?.sittingAreas ?? []),
  ].filter(Boolean) as string[];

  const unique = Array.from(new Set(images));
  if (unique.length >= 4) return unique.slice(0, 4);
  if (unique.length === 0) return [""];
  const padded = [...unique];
  while (padded.length < 4) {
    padded.push(unique[padded.length % unique.length]);
  }
  return padded;
};

function PropertyPreviewCard({ property }: { property: PropertyPreview }) {
  const slides = useMemo(() => buildSlides(property), [property]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [slides.length]);

  const activeImage = slides[activeIndex] ?? property.images.cover;

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/40 bg-white/80 shadow-lg transition hover:-translate-y-1">
      <div className="relative h-40 bg-gradient-to-br from-picasso-light/60 to-white/50">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${activeImage})` }}
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {property.listingType === "NSFAS" && (
            <span className="rounded-full bg-emerald-500/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
              NSFAS Only
            </span>
          )}
        </div>
        <div className="absolute bottom-3 left-3 rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
          {activeIndex + 1} / {slides.length}
        </div>
      </div>
      <div className="space-y-3 p-5">
        <h3 className="text-lg font-semibold text-neutral-900 truncate">
          {property.name}
        </h3>
        {property.distanceToCampus ? (
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-white/60 bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-picasso-brown">
              {property.distanceToCampus}
            </span>
          </div>
        ) : null}
        <p className="text-sm text-neutral-600">
          Modern spaces, private study zones, and a close-knit student
          community.
        </p>
        <Link
          href={`/properties/${property.slug}`}
          className="text-xs font-semibold uppercase tracking-wide text-picasso-brown"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}

export default function PropertyPreviews() {
  return (
    <section id="properties" className="py-20 snap-start">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-picasso-brown">
              Res
            </p>
            <h2 className="font-serif text-3xl text-neutral-900">
              Four beautiful student residences
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-600">
            Each property blends design, safety, and vibrant community spaces.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {properties.map((property) => (
            <PropertyPreviewCard key={property.id} property={property} />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            href="/properties"
            className="inline-flex items-center justify-center rounded-full border border-picasso-brown/40 bg-white/80 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-picasso-brown shadow-sm"
          >
            See all res
          </Link>
        </div>
      </div>
    </section>
  );
}
