import { properties } from "@/data/properties";

export default function MapPreview() {
  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-picasso-brown">
              Locations
            </p>
            <h2 className="font-serif text-3xl text-neutral-900">
              Centrally located in Ermelo
            </h2>
            <p className="text-sm text-neutral-600">
              Each res is positioned near key campuses, transport routes, and
              city conveniences.
            </p>
            <div className="grid gap-3 text-sm text-neutral-700">
              {properties.map((property) => (
                <a
                  key={property.id}
                  href={property.googleMapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-white/40 bg-white/70 px-4 py-3 shadow-sm backdrop-blur transition hover:border-picasso-brown/40 block truncate"
                >
                  {property.name}
                </a>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/40 bg-gradient-to-br from-picasso-light/70 to-white/50 p-6 shadow-lg backdrop-blur">
            <div className="overflow-hidden rounded-2xl border border-white/60">
              <iframe
                title="Ermelo student res locations"
                src="https://www.google.com/maps?q=Ermelo%20Mpumalanga%20student%20res&output=embed"
                className="h-[260px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
