import Link from "next/link";
import type { PropertyRecord } from "../properties/types";

const nsfasBadge = "NSFAS Approved • Fully Covered";
const nsfasNote = "Includes your student home, transport & Wi-Fi";

type StickyBookingWidgetProps = {
  property: PropertyRecord;
};

export default function StickyBookingWidget({ property }: StickyBookingWidgetProps) {
  return (
    <aside className="space-y-4 rounded-3xl border border-white/40 bg-white/80 p-5 shadow-lg backdrop-blur sm:p-6 lg:sticky lg:top-28">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-picasso-brown">
          NSFAS Only
        </p>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#3E2723]/30 bg-[#D4AF37] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#3E2723]">
          {nsfasBadge}
        </div>
        <p className="mt-2 text-sm text-neutral-600">{nsfasNote}</p>
        <p className="mt-2 text-xs text-neutral-500">
          100% Covered by NSFAS. No Top-Up Required.
        </p>
      </div>
      <div className="space-y-2 text-sm text-neutral-700">
        <div className="flex items-center justify-between">
          <span>Availability</span>
          <span className="font-semibold text-picasso-brown">
            {property.availability}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Room types</span>
          <span className="font-semibold text-neutral-800">
            {property.roomTypes.join(" / ")}
          </span>
        </div>
      </div>
      <Link
        href={`/apply?property=${property.slug}`}
        className="w-full rounded-full bg-picasso-brown px-6 py-3 text-center text-xs font-semibold uppercase tracking-wide text-white shadow-md"
      >
        Apply Now
      </Link>
      <a
        href="tel:+27769883928"
        className="w-full rounded-full border border-picasso-brown/40 bg-white/80 px-6 py-3 text-center text-xs font-semibold uppercase tracking-wide text-picasso-brown"
      >
        Call US NOW
      </a>
      <Link
        href={`/apply?property=${property.slug}&viewing=true`}
        className="w-full rounded-full border border-picasso-brown/40 bg-white/80 px-6 py-3 text-center text-xs font-semibold uppercase tracking-wide text-picasso-brown"
      >
        Book a Viewing
      </Link>
    </aside>
  );
}
