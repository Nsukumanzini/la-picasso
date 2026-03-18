import {
  Power,
  Shield,
  Wifi,
  Zap,
  WashingMachine,
} from "lucide-react";

const items = [
  { label: "Backup Power (Generator)", icon: Power },
  { label: "Free Laundry Facilities", icon: WashingMachine },
  { label: "Uncapped Wi-Fi", icon: Wifi },
  { label: "Water & Electricity Included", icon: Zap },
  { label: "CCTV & 24/7 Security", icon: Shield },
];

type IncludedAccommodationProps = {
  highlights?: string[];
  overflowCount?: number;
};

export default function IncludedAccommodation({
  highlights = [],
  overflowCount = 0,
}: IncludedAccommodationProps) {
  return (
    <section id="accommodation" className="rounded-3xl border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-picasso-brown">
          What&apos;s covered
        </p>
        <h2 className="font-serif text-2xl text-neutral-900">
          The essentials are covered
        </h2>
        <p className="mt-2 text-sm text-neutral-600">
          Your NSFAS package covers the basics so you can focus on school.
        </p>
      </div>
      {highlights.length > 0 ? (
        <div className="mb-6 flex flex-wrap gap-2">
          {highlights.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/60 bg-white/80 px-3 py-1 text-xs font-medium text-neutral-700"
            >
              {item}
            </span>
          ))}
          {overflowCount > 0 ? (
            <span className="rounded-full border border-dashed border-picasso-brown/40 bg-picasso-light/50 px-3 py-1 text-xs font-semibold text-picasso-brown">
              +{overflowCount} more
            </span>
          ) : null}
        </div>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-picasso-light/60 text-picasso-brown">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold text-neutral-700">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}