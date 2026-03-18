import type { PropertyRecord } from "./types";

type MapViewProps = {
  properties: PropertyRecord[];
};

export default function MapView({ properties }: MapViewProps) {
  return (
    <section className="rounded-3xl border border-white/40 bg-white/80 p-6 shadow-xl backdrop-blur">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-picasso-brown">
            Map View
          </h2>
          <span className="text-xs text-neutral-500">Ermelo</span>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/60">
          <iframe
            title="Ermelo student res locations"
            src="https://www.google.com/maps?q=Ermelo%20Mpumalanga%20student%20res&output=embed"
            className="h-[320px] w-full lg:h-[520px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="grid gap-2 text-xs text-neutral-600">
          <p>Map shows all four res around Ermelo.</p>
          <p>Filter results to focus on your top picks.</p>
        </div>
      </div>
    </section>
  );
}
