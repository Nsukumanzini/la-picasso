"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { propertyRecords } from "@/components/properties/propertiesData";

type ShowcaseImage = {
  src: string;
  label: string;
};

const buildShowcaseImages = (property: (typeof propertyRecords)[number]) => {
  const labeled: ShowcaseImage[] = [];

  const pushUnique = (items: string[], label: string) => {
    items.forEach((src) => {
      if (!src) return;
      if (labeled.some((item) => item.src === src)) return;
      labeled.push({ src, label });
    });
  };

  pushUnique(property.gallery?.rooms ?? [], "Rooms");
  pushUnique(property.gallery?.kitchen ?? [], "Kitchen");
  pushUnique(property.gallery?.sittingAreas ?? [], "Lounge");
  pushUnique(property.gallery?.bathrooms ?? [], "Bathrooms");
  pushUnique(property.gallery?.outside ?? [], "Outside");
  pushUnique(property.gallery?.study ?? [], "Study");
  pushUnique(property.gallery?.laundry ?? [], "Laundry");
  pushUnique(property.gallery?.parking ?? [], "Parking");
  pushUnique(property.gallery?.features ?? [], "Features");
  pushUnique(property.images ?? [], "Res");
  if (property.mainImage) {
    pushUnique([property.mainImage], "Res");
  }

  if (labeled.length === 0) return [];
  if (labeled.length >= 4) return labeled.slice(0, 4);
  const padded = [...labeled];
  while (padded.length < 4) {
    padded.push(labeled[padded.length % labeled.length]);
  }
  return padded;
};

export default function ResShowcase() {
  const slides = useMemo(() => {
    return propertyRecords.map((property) => {
      const images = buildShowcaseImages(property);

      return {
        id: property.id,
        name: property.name,
        slug: property.slug,
        distance: property.distance,
        images,
      };
    });
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5200);
    return () => clearInterval(timer);
  }, [slides.length]);

  const activeSlide = slides[activeIndex];

  return (
    <section className="relative -mt-12 pb-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/40 bg-white/70 p-6 shadow-xl backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-picasso-brown">
                Quick Tour
              </p>
              <h2 className="mt-2 font-serif text-2xl text-neutral-900">
                Step inside our res spaces
              </h2>
              <p className="mt-2 text-sm text-neutral-600">
                Fresh rooms, social spots, and safe study areas. Four images per res,
                rotating like a mini tour.
              </p>
            </div>
            <Link
              href="/properties"
              className="rounded-full bg-picasso-brown px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-md"
            >
              Explore all res
            </Link>
          </div>

          {activeSlide ? (
            <div className="mt-6 grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
              <div className="grid grid-cols-2 gap-3">
                {activeSlide.images.map((item, index) => (
                  <div
                    key={`${activeSlide.id}-shot-${index}`}
                    className="relative h-36 overflow-hidden rounded-2xl bg-gradient-to-br from-picasso-light/60 to-white/40 sm:h-44"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${item.src})` }}
                    />
                    <div className="absolute bottom-2 left-2 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-picasso-brown shadow-sm">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex h-full flex-col justify-between rounded-2xl border border-white/50 bg-white/70 p-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-picasso-brown">
                    {activeSlide.name}
                  </p>
                  <p className="mt-3 text-lg font-semibold text-neutral-900">
                    {activeSlide.distance}
                  </p>
                  <p className="mt-2 text-sm text-neutral-600">
                    Safe, social, and NSFAS-ready. Tap below to see the full gallery.
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {slides.map((slide, index) => (
                    <button
                      key={`dot-${slide.id}`}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`h-2.5 w-2.5 rounded-full transition ${
                        index === activeIndex
                          ? "bg-picasso-brown"
                          : "bg-picasso-brown/30"
                      }`}
                      aria-label={`Show ${slide.name}`}
                    />
                  ))}
                </div>
                <Link
                  href={`/properties/${activeSlide.slug}`}
                  className="mt-4 inline-flex w-fit items-center rounded-full border border-picasso-brown/40 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-picasso-brown"
                >
                  View this res
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
