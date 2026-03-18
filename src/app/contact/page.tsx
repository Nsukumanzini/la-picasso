import BusinessHours from "@/components/contact/BusinessHours";
import ContactCards from "@/components/contact/ContactCards";
import OfficeMap from "@/components/contact/OfficeMap";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-picasso-light/20 pb-24 pt-28">
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6 lg:px-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-picasso-brown">
            Get in Touch
          </p>
          <h1 className="font-serif text-3xl text-neutral-900">
            Need help today? Talk to us.
          </h1>
          <p className="text-sm text-neutral-600">
            Reach our team for bookings, NSFAS support, or viewing requests.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="tel:+27769883928"
              className="rounded-full bg-[#D4AF37] px-5 py-2 text-xs font-semibold uppercase tracking-wide text-[#3E2723] shadow-md"
            >
              Call now
            </a>
            <a
              href="https://wa.me/27769883928?text=Hi%20La%20Picasso%2C%20I%20need%20help"
              className="rounded-full border border-[#3E2723]/30 bg-white/80 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-[#3E2723]"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <a
              href="mailto:alufabrico@outlook.com"
              className="rounded-full border border-[#3E2723]/30 bg-white/80 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-[#3E2723]"
            >
              Email
            </a>
          </div>
        </header>

        <BusinessHours />
        <ContactCards />
        <OfficeMap />
        <section className="rounded-3xl border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-picasso-brown">
            Quick answers
          </p>
          <h2 className="mt-2 font-serif text-2xl text-neutral-900">
            Contact FAQ
          </h2>
          <div className="mt-4 grid gap-3 text-sm text-neutral-700">
            <div className="rounded-xl border border-white/40 bg-white/70 p-3">
              We reply within 2 hours during business hours.
            </div>
            <div className="rounded-xl border border-white/40 bg-white/70 p-3">
              Viewings can be booked for mornings, afternoons, or evenings.
            </div>
            <div className="rounded-xl border border-white/40 bg-white/70 p-3">
              NSFAS help is available for all approved students.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
