import { Shield, Sparkles, WashingMachine, Zap } from "lucide-react";

const accommodationItems = [
  {
    title: "Laundry",
    description: "On-site, secure laundry facilities.",
    icon: WashingMachine,
  },
  {
    title: "Backup Power",
    description: "Generator keeps the lights and Wi-Fi on.",
    icon: Zap,
  },
  {
    title: "Study Areas",
    description: "Quiet, well-lit collaborative spaces.",
    icon: Sparkles,
  },
  {
    title: "24/7 Security",
    description: "CCTV and dedicated security teams.",
    icon: Shield,
  },
];

export default function AccommodationGrid() {
  return (
    <section id="accommodation" className="py-20 snap-start">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-picasso-brown">
            Why Choose Us
          </p>
          <h2 className="font-serif text-3xl text-neutral-900">
            Designed for modern student life
          </h2>
          <p className="text-sm text-neutral-600">
            Every detail is curated for comfort, safety, and community.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {accommodationItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-white/40 bg-white/80 p-6 shadow-md backdrop-blur"
              >
                <Icon className="h-8 w-8 text-picasso-brown" />
                <h3 className="mt-4 text-lg font-semibold text-neutral-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}