import Link from "next/link";
import { propertyRecords } from "@/components/properties/propertiesData";

const values = [
  {
    title: "Safety first",
    description:
      "Secure res with CCTV, access control, and staff support every day.",
  },
  {
    title: "Student focused",
    description:
      "Study-friendly spaces, calm routines, and clear rules that help you focus.",
  },
  {
    title: "Community",
    description:
      "Clean shared areas, respectful culture, and support that feels personal.",
  },
];

const commitments = [
  "NSFAS-only accreditation",
  "Walking distance to campus",
  "Uncapped Wi-Fi and utilities included",
  "Backup power and reliable water",
  "Laundry facilities for every res",
];

export default function AboutPage() {
  return (
    <div className="bg-picasso-light/20 pb-20 pt-24">
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-picasso-brown">
            About
          </p>
          <h1 className="mt-3 font-serif text-3xl text-neutral-900 sm:text-4xl">
            La Picasso Property Group
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-neutral-600">
            We offer four NSFAS-accredited residences within easy walking distance of Ermelo campus.
          </p>
          <p className="mt-4 max-w-2xl text-sm text-neutral-600">
            We are centrally located and easily accessible to all the daily essentials a student might need, including local shops, clinics, the hospital, and the shopping mall. To help you unwind after classes, we also offer recreational facilities in the form of board games and soccer.
          </p>
          <p className="mt-4 max-w-2xl text-sm text-neutral-600">
            Our Residence Committee is proudly led by registered students, who are here to actively look after their peers' needs and ensure a welcoming community for everyone.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-600">
            <span className="rounded-full border border-white/60 bg-white/80 px-3 py-1">
              4 residences
            </span>
            <span className="rounded-full border border-white/60 bg-white/80 px-3 py-1">
              NSFAS accredited
            </span>
            <span className="rounded-full border border-white/60 bg-white/80 px-3 py-1">
              24/7 support
            </span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/properties"
              className="rounded-full bg-picasso-brown px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white shadow-md"
            >
              View our residences
            </Link>
            <Link
              href="/apply"
              className="rounded-full border border-picasso-brown/40 bg-white/70 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-picasso-brown"
            >
              Apply now
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-picasso-brown/40 bg-white/70 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-picasso-brown"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-3xl border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-picasso-brown">
              Our story
            </p>
            <h2 className="mt-2 font-serif text-2xl text-neutral-900">
              Built for focused students
            </h2>
              <p className="mt-3 text-sm text-neutral-600">
              We are a student accommodation group with four (4) unique properties. All our properties are 100% NSFAS Accredited, and each one is situated within a short walking distance to the Ermelo campus.
            </p>
            <p className="mt-3 text-sm text-neutral-600">
              We are centrally located and easily accessible to all the daily essentials a student might need, including local shops, clinics, the hospital, and the shopping mall. To help you unwind after classes, we also offer recreational facilities in the form of board games and soccer.
            </p>
            <p className="mt-3 text-sm text-neutral-600">
              Our Residence Committee is proudly led by registered students, who are here to actively look after their peers' needs and ensure a welcoming community for everyone.
            </p>
          </div>
          <div className="rounded-3xl border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-picasso-brown">
              Values
            </p>
            <h2 className="mt-2 font-serif text-2xl text-neutral-900">
              What we stand for
            </h2>
            <div className="mt-4 space-y-4">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-2xl border border-white/50 bg-white/70 p-4"
                >
                  <p className="text-sm font-semibold text-neutral-900">
                    {value.title}
                  </p>
                  <p className="mt-2 text-sm text-neutral-600">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-picasso-brown">
            Our promise
          </p>
          <h2 className="mt-2 font-serif text-2xl text-neutral-900">
            What you can expect
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {commitments.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/60 bg-white/80 px-3 py-1 text-xs font-medium text-neutral-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-picasso-brown">
            Our residences
          </p>
          <h2 className="mt-2 font-serif text-2xl text-neutral-900">
            Walk to campus from any res
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {propertyRecords.map((property) => (
              <Link
                key={property.id}
                href={`/properties/${property.slug}`}
                className="rounded-2xl border border-white/50 bg-white/70 p-4 text-sm font-semibold text-neutral-800 transition hover:border-picasso-brown/40"
              >
                {property.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
