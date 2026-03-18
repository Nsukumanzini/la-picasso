"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const stats = [
  { label: "Premium Res", value: 4, suffix: "" },
  { label: "Happy Students", value: 500, suffix: "+" },
  { label: "Safety Rating (4.9/5)", value: 4.9, suffix: "" , note: "from student reviews" },
];

type Stat = (typeof stats)[number];

function useCountUp(target: number, isActive: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    let start: number | null = null;
    const duration = 1200;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setValue(target * progress);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [isActive, target]);

  return value;
}

export default function StatsCounter() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="grid gap-6 rounded-3xl border border-white/40 bg-white/80 p-8 shadow-lg backdrop-blur md:grid-cols-3"
        >
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} isActive={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

type StatCardProps = {
  stat: Stat;
  isActive: boolean;
};

function StatCard({ stat, isActive }: StatCardProps) {
  const count = useCountUp(stat.value, isActive);
  const formatted = stat.value % 1 === 0 ? Math.round(count) : count.toFixed(1);

  return (
    <div className="text-center">
      <div className="text-3xl font-semibold text-picasso-brown">
        {formatted}
        {stat.suffix}
      </div>
      <p className="mt-2 text-sm font-semibold text-neutral-700">{stat.label}</p>
      {stat.note ? <p className="mt-1 text-xs text-neutral-500">{stat.note}</p> : null}
    </div>
  );
}
