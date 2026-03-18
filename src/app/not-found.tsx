"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-picasso-light/20 px-4">
      <div className="max-w-md rounded-3xl border border-white/40 bg-white/80 p-8 text-center shadow-lg backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-picasso-brown">
          404
        </p>
        <h1 className="mt-3 font-serif text-3xl text-neutral-900">
          Looks like this room is occupied!
        </h1>
        <p className="mt-3 text-sm text-neutral-600">
          The page you are looking for is unavailable. Let us get you back to
          the listings.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex rounded-full bg-picasso-brown px-6 py-3 text-xs font-semibold uppercase tracking-wide text-white shadow-md"
          >
            Return Home
          </Link>
          <Link
            href="/properties"
            className="inline-flex rounded-full border border-picasso-brown/40 bg-white/70 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-picasso-brown"
          >
            View Properties
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex rounded-full border border-picasso-brown/40 bg-white/70 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-picasso-brown"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
