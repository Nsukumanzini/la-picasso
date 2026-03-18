"use client";

import { useMemo } from "react";
import { propertyRecords } from "../properties/propertiesData";

const standardPackage = [
  "Backup Power (Generator)",
  "CCTV & 24/7 Security",
  "Free Laundry Facilities",
  "Uncapped Wi-Fi",
  "Walking Distance to Campus (<2km)",
  "Water & Electricity Included",
];

type ApplicationSummaryProps = {
  selectedProperty?: string;
};

export default function ApplicationSummary({
  selectedProperty = "",
}: ApplicationSummaryProps) {

  const property = useMemo(() => {
    return propertyRecords.find(
      (record) =>
        record.slug === selectedProperty ||
        record.name === selectedProperty
    );
  }, [selectedProperty]);

  return (
    <aside className="sticky top-28 space-y-4 rounded-3xl border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-picasso-brown">
          Your booking
        </p>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#3E2723]/30 bg-[#D4AF37] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#3E2723]">
          NSFAS Approved • Fully Covered
        </div>
      </div>

      <div className="rounded-2xl border border-white/40 bg-white/70 p-4">
        <div className="relative h-32 overflow-hidden rounded-xl bg-gradient-to-br from-picasso-light/60 to-white/40">
          {property?.mainImage ? (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${property.mainImage})` }}
            />
          ) : null}
        </div>
        <div className="mt-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Selected res
          </p>
          <p className="mt-1 text-base font-semibold text-neutral-900">
            {property?.name ?? "Select a res in the form"}
          </p>
          {property?.distance ? (
            <p className="mt-1 text-xs text-neutral-600">{property.distance}</p>
          ) : null}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
          What&apos;s covered
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {standardPackage.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/60 bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-picasso-brown"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
