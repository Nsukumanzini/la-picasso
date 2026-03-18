const links = [
  { id: "gallery", label: "Gallery" },
  { id: "accommodation", label: "Accommodation" },
  { id: "location", label: "Location" },
  { id: "reviews", label: "Reviews" },
  { id: "faq", label: "FAQ" },
];

export default function JumpLinks() {
  return (
    <div className="sticky top-20 z-30 w-full border-b border-white/40 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-600 sm:px-6 sm:py-3 sm:text-xs lg:px-8">
        <span className="text-picasso-brown">Explore</span>
        <div className="flex flex-1 items-center gap-3 overflow-x-auto whitespace-nowrap text-[10px] sm:text-xs">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="transition hover:text-picasso-brown"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
