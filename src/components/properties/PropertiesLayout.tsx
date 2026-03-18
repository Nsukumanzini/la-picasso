"use client";

import { useEffect, useMemo, useState } from "react";
import FilterSidebar from "./FilterSidebar";
import MapView from "./MapView";
import PropertyCard from "./PropertyCard";
import PropertySkeleton from "./PropertySkeleton";
import EmptyState from "./EmptyState";
import { propertyRecords } from "./propertiesData";
import type { PropertyFilters, ViewMode } from "./types";

const defaultFilters: PropertyFilters = {
  name: "",
  roomType: "",
  accommodation: [],
};

export default function PropertiesLayout() {
  const [filters, setFilters] = useState<PropertyFilters>(defaultFilters);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 350);
    return () => clearTimeout(timer);
  }, [filters]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 550);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    return propertyRecords.filter((property) => {
      if (filters.name && property.name !== filters.name) return false;
      if (
        filters.roomType &&
        !property.roomTypes.includes(filters.roomType)
      )
        return false;
      if (
        filters.accommodation.length > 0 &&
        !filters.accommodation.every((item) =>
          property.accommodation.includes(item)
        )
      )
        return false;
      return true;
    });
  }, [filters]);

  const handleReset = () => setFilters(defaultFilters);

  return (
    <div className="min-h-screen bg-picasso-light/20">
      <div className="mx-auto max-w-7xl space-y-8 px-4 pb-20 pt-28">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-picasso-brown">
              Properties
            </p>
            <h1 className="font-serif text-3xl text-neutral-900">
              Find your res
            </h1>
            <p className="mt-2 text-sm text-neutral-600">
              Compare spaces, see what is included, and pick your closest walk to campus.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/40 bg-white/80 p-1 text-xs font-semibold uppercase tracking-wide text-neutral-600 shadow-sm backdrop-blur">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`rounded-full px-4 py-2 transition ${
                viewMode === "grid"
                  ? "bg-picasso-brown text-white"
                  : "text-neutral-600"
              }`}
            >
              Grid View
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`rounded-full px-4 py-2 transition ${
                viewMode === "list"
                  ? "bg-picasso-brown text-white"
                  : "text-neutral-600"
              }`}
            >
              List View
            </button>
          </div>
        </header>

        <FilterSidebar
          filters={filters}
          onChange={setFilters}
          onReset={handleReset}
        />

        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-6">
            {isLoading ? (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-2 md:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {Array.from({ length: 6 }).map((_, index) => (
                  <PropertySkeleton key={`skeleton-${index}`} />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <EmptyState onReset={handleReset} />
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-2 md:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {filtered.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-28">
            <MapView properties={filtered.length ? filtered : propertyRecords} />
          </div>
        </div>
      </div>
    </div>
  );
}
