import Link from "next/link";

type EmptyStateProps = {
  onReset: () => void;
};

export default function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-picasso-brown/40 bg-white/80 p-10 text-center shadow-md backdrop-blur">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-picasso-brown">
        No Results
      </p>
      <h3 className="mt-3 font-serif text-2xl text-neutral-900">
        We could not match those filters
      </h3>
      <p className="mt-2 text-sm text-neutral-600">
        Try widening your search or reset filters to explore all properties.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onReset}
          className="rounded-full bg-picasso-brown px-6 py-3 text-xs font-semibold uppercase tracking-wide text-white shadow-md"
        >
          Reset Filters
        </button>
        <Link
          href="/properties"
          className="rounded-full border border-picasso-brown/40 bg-white/70 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-picasso-brown"
        >
          See all res
        </Link>
      </div>
    </div>
  );
}
