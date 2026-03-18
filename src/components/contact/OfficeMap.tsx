export default function OfficeMap() {
  return (
    <section className="rounded-3xl border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-picasso-brown">
        Head Office
      </p>
      <h2 className="mt-2 font-serif text-2xl text-neutral-900">
        Visit our Ermelo reception
      </h2>
      <div className="mt-4 overflow-hidden rounded-2xl border border-white/60">
        <iframe
          title="La Picasso head office"
          src="https://www.google.com/maps?q=37a%20Voortrekker%20St%2C%20Ermelo%2C%202351&output=embed"
          className="h-[280px] w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
