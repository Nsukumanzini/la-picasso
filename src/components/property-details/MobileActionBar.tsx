import Link from "next/link";

type MobileActionBarProps = {
  price: string;
  href: string;
};

export default function MobileActionBar({ price, href }: MobileActionBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/40 bg-white/90 px-4 py-3 shadow-lg backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-picasso-brown">
            NSFAS Only
          </p>
          <p className="text-sm font-semibold text-neutral-900">{price}</p>
        </div>
        <Link
          href={href}
          className="rounded-full bg-picasso-brown px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-md"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
}
