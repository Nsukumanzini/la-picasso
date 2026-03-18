import ApplyClient from "@/components/forms/ApplyClient";

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-picasso-light/20 pb-24 pt-28">
      <div className="mx-auto max-w-6xl space-y-6 px-4 sm:px-6 lg:px-8">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-picasso-brown">
            Apply
          </p>
          <h1 className="font-serif text-3xl text-neutral-900">
            Book your spot
          </h1>
          <p className="text-sm text-neutral-600">
            NSFAS-only res. Quick 3-step booking.
          </p>
        </header>
        <ApplyClient />
      </div>
    </div>
  );
}
