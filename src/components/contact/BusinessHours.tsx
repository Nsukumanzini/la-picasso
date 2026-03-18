"use client";

import { useEffect, useMemo, useState } from "react";

type Status = "Open Now" | "Closed";

export default function BusinessHours() {
  const [status, setStatus] = useState<Status>("Closed");

  const formatter = useMemo(
    () => new Intl.DateTimeFormat("en-ZA", {
      timeZone: "Africa/Johannesburg",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
      weekday: "short",
    }),
    []
  );

  useEffect(() => {
    const updateStatus = () => {
      const parts = formatter.formatToParts(new Date());
      const hour = Number(parts.find((part) => part.type === "hour")?.value);
      const minute = Number(
        parts.find((part) => part.type === "minute")?.value
      );
      const weekday = parts.find((part) => part.type === "weekday")?.value;

      const totalMinutes = hour * 60 + minute;
      const isSunday = weekday === "Sun";
      const isSaturday = weekday === "Sat";

      const openMinutes = 8 * 60 + 30;
      const closeMinutes = isSunday
        ? 14 * 60 + 30
        : isSaturday
        ? 17 * 60
        : 20 * 60;

      const isOpen = totalMinutes >= openMinutes && totalMinutes < closeMinutes;
      setStatus(isOpen ? "Open Now" : "Closed");
    };

    updateStatus();
    const timer = setInterval(updateStatus, 60000);
    return () => clearInterval(timer);
  }, [formatter]);

  const isOpen = status === "Open Now";

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/40 bg-white/80 px-4 py-3 text-sm shadow-md backdrop-blur">
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`h-2 w-2 rounded-full ${
            isOpen ? "bg-emerald-500" : "bg-rose-500"
          }`}
        />
        <span className="font-semibold text-neutral-800">{status}</span>
        <span className="text-neutral-500">SAST</span>
        <span className="text-neutral-500">
          Mon-Fri 08:30-20:00 • Sat 08:30-17:00 • Sun 08:30-14:30
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] ${
            isOpen
              ? "bg-emerald-100 text-emerald-700"
              : "bg-rose-100 text-rose-700"
          }`}
        >
          {status}
        </span>
        <span className="text-xs text-neutral-500">We reply within 2 hours</span>
      </div>
    </div>
  );
}
