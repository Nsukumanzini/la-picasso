"use client";

import Link from "next/link";
import { propertyRecords } from "../properties/propertiesData";

type SimilarPropertiesProps = {
  currentSlug: string;
};

export default function SimilarProperties({ currentSlug }: SimilarPropertiesProps) {
  const options = propertyRecords.filter(
    (property) => property.slug !== currentSlug
  );

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-picasso-brown">
              You might also like
            </p>
            <h2 className="font-serif text-3xl text-neutral-900">
              Similar properties
            </h2>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {options.map((property) => (
            <Link
              key={property.id}
              href={`/properties/${property.slug}`}
              className="min-w-[260px] rounded-2xl border border-white/40 bg-white/80 p-4 shadow-md backdrop-blur transition hover:-translate-y-1"
            >
              <div className="relative h-32 overflow-hidden rounded-xl bg-gradient-to-br from-picasso-light/60 to-white/40">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${property.images[0] ?? property.mainImage ?? ""})`,
                  }}
                />
              </div>
              <h3 className="mt-3 text-lg font-semibold text-neutral-900 truncate">
                {property.name}
              </h3>
              <p className="mt-1 text-sm text-neutral-600">
                {property.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
