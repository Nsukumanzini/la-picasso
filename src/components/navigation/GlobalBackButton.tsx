"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function GlobalBackButton() {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setCanGoBack(window.history.length > 1);
  }, []);

  if (!canGoBack) return null;

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="fixed left-4 top-24 z-50 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-700 shadow-lg backdrop-blur transition hover:border-picasso-brown/40 hover:text-picasso-brown"
      aria-label="Go back"
    >
      <span aria-hidden="true">←</span>
      Back
    </button>
  );
}
