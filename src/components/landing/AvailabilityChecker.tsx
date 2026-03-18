import { properties } from "@/data/properties";
import Link from "next/link";

export default function AvailabilityChecker() {
  return (
    <section className="relative -mt-12 pb-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/40 bg-white/70 p-6 shadow-xl backdrop-blur-xl">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600" htmlFor="property">
                Property
              </label>
              <select
                id="property"
                className="h-12 rounded-xl border border-neutral-200 bg-white/80 px-4 text-sm text-neutral-800 outline-none focus:border-picasso-brown"
              >
                <option value="">Select property</option>
                {properties.map((property) => (
                  <option key={property.id} value={property.slug}>
                    {property.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600" htmlFor="room-type">
                Room type
              </label>
              <select
                id="room-type"
                className="h-12 rounded-xl border border-neutral-200 bg-white/80 px-4 text-sm text-neutral-800 outline-none focus:border-picasso-brown"
              >
                <option value="">Any</option>
                <option value="Single">Single</option>
                <option value="Sharing">Sharing</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600" htmlFor="move-in">
                Move-in date
              </label>
              <input
                id="move-in"
                type="date"
                className="h-12 rounded-xl border border-neutral-200 bg-white/80 px-4 text-sm text-neutral-800 outline-none focus:border-picasso-brown"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
                Action
              </span>
              <div className="flex flex-col gap-2">
                <Link
                  href="/properties"
                  className="flex h-12 items-center justify-center rounded-xl bg-picasso-brown text-sm font-semibold uppercase tracking-wide text-white shadow-md"
                >
                  Check Availability
                </Link>
                <a
                  href="https://wa.me/27769883928?text=Hi%20La%20Picasso%2C%20I%27d%20like%20to%20check%20availability"
                  className="flex h-10 items-center justify-center rounded-xl border border-picasso-brown/30 bg-white/80 text-xs font-semibold uppercase tracking-wide text-picasso-brown"
                  target="_blank"
                  rel="noreferrer"
                >
                  Talk on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
