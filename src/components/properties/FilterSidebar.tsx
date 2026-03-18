"use client";

import { useState } from "react";
import type { PropertyFilters } from "./types";
import { accommodationOptions } from "./propertiesData";

const propertyNames = ["", "Legends Lodge", "La Picasso", "Pablo", "28"];

type FilterSidebarProps = {
  filters: PropertyFilters;
  onChange: (next: PropertyFilters) => void;
  onReset: () => void;
};

export default function FilterSidebar({
  filters,
  onChange,
  onReset,
}: FilterSidebarProps) {
  const [isAccommodationOpen, setIsAccommodationOpen] = useState(false);
  const handleAccommodationToggle = (item: string) => {
    const set = new Set(filters.accommodation);
    if (set.has(item)) {
      set.delete(item);
    } else {
      set.add(item);
    }
    onChange({ ...filters, accommodation: Array.from(set) });
  };

  return (
    <section className="rounded-3xl border border-white/40 bg-white/80 p-5 shadow-lg backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-picasso-brown">
            Filters
          </p>
          <h2 className="font-serif text-2xl text-neutral-900">Refine search</h2>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="rounded-full border border-picasso-brown/40 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-picasso-brown"
        >
          Reset Filters
        </button>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.1fr_1fr_1.3fr]">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600" htmlFor="property-name">
            Pick a res
          </label>
          <select
            id="property-name"
            value={filters.name}
            onChange={(event) =>
              onChange({ ...filters, name: event.target.value })
            }
            className="h-11 w-full rounded-xl border border-neutral-200 bg-white/80 px-3 text-sm text-neutral-800 outline-none focus:border-picasso-brown"
          >
            {propertyNames.map((name) => (
              <option key={name || "all"} value={name}>
                {name || "All properties"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600" htmlFor="room-type">
            Room Type
          </label>
          <select
            id="room-type"
            value={filters.roomType}
            onChange={(event) =>
              onChange({
                ...filters,
                roomType: event.target.value as PropertyFilters["roomType"],
              })
            }
            className="h-11 w-full rounded-xl border border-neutral-200 bg-white/80 px-3 text-sm text-neutral-800 outline-none focus:border-picasso-brown"
          >
            <option value="">All types</option>
            <option value="Single">Single</option>
            <option value="Sharing">Sharing</option>
          </select>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setIsAccommodationOpen((prev) => !prev)}
            className="flex h-11 w-full items-center justify-between rounded-xl border border-neutral-200 bg-white/80 px-3 text-xs font-semibold uppercase tracking-wider text-neutral-600"
          >
            <span>What&apos;s Included</span>
            <span className="text-picasso-brown">
              {isAccommodationOpen ? "Hide" : "Show"}
            </span>
          </button>
        </div>
      </div>

      {isAccommodationOpen ? (
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {accommodationOptions.map((item) => (
            <label
              key={item}
              className="flex items-center gap-2 rounded-xl border border-white/60 bg-white/70 px-3 py-2 text-sm text-neutral-700"
            >
              <input
                type="checkbox"
                checked={filters.accommodation.includes(item)}
                onChange={() => handleAccommodationToggle(item)}
                className="h-4 w-4 rounded border-neutral-300 text-picasso-brown focus:ring-picasso-brown"
              />
              {item}
            </label>
          ))}
        </div>
      ) : null}
    </section>
  );
}
