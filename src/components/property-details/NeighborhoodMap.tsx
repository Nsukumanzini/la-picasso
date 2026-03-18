import type { PropertyRecord } from "../properties/types";

type NeighborhoodMapProps = {
  property: PropertyRecord;
};

export default function NeighborhoodMap({ property }: NeighborhoodMapProps) {
  const query = property.address
    ? encodeURIComponent(property.address)
    : encodeURIComponent(property.name);
  const mapSrc = `https://www.google.com/maps?q=${query}&output=embed`;

  return (
    <section id="location" className="rounded-3xl border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-picasso-brown">
        Location
      </p>
      <h2 className="mt-2 font-serif text-2xl text-neutral-900">
        Neighborhood highlights
      </h2>
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="overflow-hidden rounded-2xl border border-white/60">
          <iframe
            title={`${property.name} location`}
            src={mapSrc}
            className="h-[260px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="space-y-3 text-sm text-neutral-700">
          <div className="rounded-xl border border-white/40 bg-white/70 p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-picasso-brown">
              {property.name}
            </p>
            {property.address ? (
              <p className="mt-2 text-sm text-neutral-700">
                {property.address}
              </p>
            ) : null}
          </div>
          {property.googleMapsLink ? (
            <a
              href={property.googleMapsLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full border border-picasso-brown/40 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-picasso-brown"
            >
              Open in Google Maps
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
