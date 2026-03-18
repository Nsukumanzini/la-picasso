"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

const cards = [
  {
    label: "Phone",
    value: "+27 76 988 3928",
    href: "tel:+27769883928",
    icon: Phone,
  },
  {
    label: "Email",
    value: "lapicassoproperty@gmail.com",
    href: "mailto:lapicassoproperty@gmail.com",
    icon: Mail,
  },
  {
    label: "Address",
    value: "37a Voortrekker St, Ermelo, 2351, Mpumalanga, South Africa",
    href:
      "https://www.google.com/maps/search/?api=1&query=37a%20Voortrekker%20St%2C%20Ermelo%2C%202351",
    icon: MapPin,
    shortLabel: "Ermelo CBD",
  },
];

type CopyState = {
  [key: string]: boolean;
};

export default function ContactCards() {
  const [copied, setCopied] = useState<CopyState>({});
  const { push } = useToast();

  const handleCopy = async (value: string) => {
    if (!navigator?.clipboard) return;
    await navigator.clipboard.writeText(value);
    setCopied((prev) => ({ ...prev, [value]: true }));
    push({ title: "Link copied!", variant: "success" });
    setTimeout(() => {
      setCopied((prev) => ({ ...prev, [value]: false }));
    }, 1200);
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <a
            key={card.label}
            href={card.href}
            target={card.href.startsWith("http") ? "_blank" : undefined}
            rel={card.href.startsWith("http") ? "noreferrer" : undefined}
            onClick={() => handleCopy(card.value)}
            className="group relative rounded-3xl border border-white/40 bg-white/80 p-6 text-left shadow-lg backdrop-blur transition hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-picasso-brown text-white">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-picasso-brown">
                {card.label}
              </span>
            </div>
            <p className="mt-4 text-sm font-semibold text-neutral-900">
              {card.value}
            </p>
            {card.shortLabel ? (
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                {card.shortLabel}
              </p>
            ) : null}
            <span className="mt-2 hidden text-xs text-neutral-500 md:inline-block">
              Tap to copy
            </span>
            {copied[card.value] && (
              <span className="absolute right-4 top-4 rounded-full bg-picasso-brown px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                Copied!
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
}
