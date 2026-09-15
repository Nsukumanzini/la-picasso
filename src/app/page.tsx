import Image from "next/image";
import Link from "next/link";
import { propertyRecords } from "@/components/properties/propertiesData";

export default function HomePage() {
  return <div className="bg-[#fbfaf8] pb-20">
    <section className="relative isolate min-h-[590px] overflow-hidden rounded-b-[2.5rem] bg-[#30211e]">
      <Image src="/assets/properties/legends-lodge/outside-8.jpeg" alt="Exterior of Legends Lodge student residence" fill priority className="-z-20 object-cover" sizes="100vw" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#201412]/90 via-[#2d1b17]/70 to-[#2d1b17]/25" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#201412]/65 via-transparent to-[#201412]/10" />
      <div className="relative mx-auto flex min-h-[590px] max-w-6xl items-end px-4 pb-16 pt-36 sm:px-6 lg:px-8 lg:pb-20">
        <div className="max-w-2xl text-white">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#f1d77d]/40 bg-[#30211e]/50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#f1d77d] backdrop-blur"><span className="h-2 w-2 rounded-full bg-[#D4AF37]" /> 2027 applications are open</div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/75">Student accommodation · Ermelo</p>
          <h1 className="mt-4 max-w-2xl font-serif text-5xl leading-[1.05] sm:text-6xl">A better place to begin your student life.</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/80">Secure, NSFAS-focused student residences close to GS Ermelo Campus—with clear information and real support from first enquiry to move-in.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="/properties" className="rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-[#3E2723] shadow-lg shadow-black/20 transition hover:bg-[#f1d77d]">Explore residences <span aria-hidden="true">→</span></Link><Link href="/apply" className="rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">Apply for 2027</Link></div>
          <p className="mt-5 text-sm text-white/65">Four Ermelo residences · less than 3km from campus</p>
        </div>
      </div>
    </section>
    <section className="border-y border-[#e8dfd8] bg-white"><div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:px-8"><div><p className="font-semibold text-neutral-900">NSFAS-focused</p><p className="mt-1 text-sm text-neutral-600">Straightforward guidance for your application.</p></div><div><p className="font-semibold text-neutral-900">Close to campus</p><p className="mt-1 text-sm text-neutral-600">Residences within easy reach of GS Ermelo Campus.</p></div><div><p className="font-semibold text-neutral-900">Made for students</p><p className="mt-1 text-sm text-neutral-600">Wi-Fi, security, study spaces and practical support.</p></div></div></section>
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8"><div className="flex items-end justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-[0.22em] text-picasso-brown">Choose your residence</p><h2 className="mt-2 font-serif text-3xl text-neutral-900">Four places to start</h2></div><Link href="/properties" className="hidden text-sm font-semibold text-picasso-brown sm:block">See all →</Link></div><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{propertyRecords.map((property)=><Link href={`/properties/${property.slug}`} key={property.id} className="group overflow-hidden rounded-2xl border border-[#e8dfd8] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div className="relative h-44"><Image src={property.mainImage} alt={`${property.name} exterior`} fill className="object-cover transition group-hover:scale-105" sizes="(max-width: 640px) 100vw, 25vw" /></div><div className="p-4"><h3 className="font-semibold text-neutral-900">{property.name}</h3><p className="mt-2 text-sm text-neutral-600">{property.distance}</p><span className="mt-4 inline-block text-sm font-semibold text-picasso-brown">View details <span aria-hidden="true">→</span></span></div></Link>)}</div></section>
  </div>;
}