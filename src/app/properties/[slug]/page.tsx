import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import BentoGallery from "@/components/property-details/BentoGallery";
import PropertySummary from "@/components/property-details/PropertySummary";
import IncludedAccommodation from "@/components/property-details/IncludedAccommodation";
import NSFASBanner from "@/components/property-details/NSFASBanner";
import ResidenceManager from "@/components/property-details/ResidenceManager";
import PropertyFAQ from "@/components/property-details/PropertyFAQ";
import PropertyReviews from "@/components/property-details/PropertyReviews";
import NeighborhoodMap from "@/components/property-details/NeighborhoodMap";
import VideoCarousel from "@/components/property-details/VideoCarousel";
import StickyBookingWidget from "@/components/property-details/StickyBookingWidget";
import MobileActionBar from "@/components/property-details/MobileActionBar";
import SimilarProperties from "@/components/property-details/SimilarProperties";
import { propertyRecords } from "@/components/properties/propertiesData";

const faqs = [
  {
    question: "Is there a curfew?",
    answer: "Quiet hours start at 10pm to support focus and rest.",
  },
  {
    question: "Is the res walkable to campus?",
    answer: "Yes, every res is less than 2km to GS Ermelo Campus.",
  },
  {
    question: "Is NSFAS proof required?",
    answer: "Yes, NSFAS proof is required to secure your spot.",
  },
  {
    question: "Are visitors allowed?",
    answer: "Visitors are welcome during the day, they only have to sign check in and check out at the front desk.",
  },
  {
    question: "Do rooms come furnished?",
    answer: "Yes, each room includes a bed, desk, wardrobe, dustbin, and own bathroom.",
  },
];

const reviews = [
  {
    name: "Gift Mkhize",
    quote: "The res is peaceful and feels secure all day.",
    rating: "★★★★★",
  },
  {
    name: "Sibongile Zulu",
    quote: "The Wi-Fi is reliable and study rooms are always available.",
    rating: "★★★★★",
  },
];

const manager = {
  name: "Nandi Dlamini",
  phone: "+27 82 555 0199",
  email: "og.technologies@outlook.com",
};

const standardPackage = [
  "Backup Power (Generator)",
  "CCTV & 24/7 Security",
  "Free Laundry Facilities",
  "Uncapped Wi-Fi",
  "Walking Distance to Campus (<2km)",
  "Water & Electricity Included",
];

export default function PropertyDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const property = propertyRecords.find(
    (record) => record.slug === params.slug
  );

  if (!property) {
    notFound();
  }

  const galleryImages = [
    property.mainImage,
    ...(property.gallery?.rooms ?? []),
    ...(property.gallery?.kitchen ?? []),
    ...(property.gallery?.sittingAreas ?? []),
    ...(property.gallery?.bathrooms ?? []),
    ...(property.gallery?.outside ?? []),
    ...property.images,
  ].filter(Boolean) as string[];

  const bentoImages = [
    property.mainImage,
    property.gallery?.features?.[0],
    property.gallery?.rooms?.[0],
    property.gallery?.kitchen?.[0],
    property.gallery?.sittingAreas?.[0] ?? property.gallery?.features?.[2],
    property.gallery?.outside?.[0],
  ].filter(Boolean) as string[];

  const accommodationHighlights = property.accommodation?.length
    ? [
        ...standardPackage,
        ...property.accommodation.filter(
          (item) => !standardPackage.includes(item)
        ),
      ]
    : [];
  const accommodationPreview = accommodationHighlights.slice(0, 6);
  const accommodationOverflow = Math.max(
    accommodationHighlights.length - 6,
    0
  );

  return (
    <div className="bg-picasso-light/20 pb-20 pt-20 sm:pt-24">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:gap-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
        <div className="space-y-8">
          <header className="space-y-4">
            <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
              <Link className="transition hover:text-picasso-brown" href="/">
                Home
              </Link>
              <span>•</span>
              <Link
                className="transition hover:text-picasso-brown"
                href="/properties"
              >
                Properties
              </Link>
              <span>•</span>
              <span className="text-picasso-brown">{property.name}</span>
            </nav>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-picasso-brown">
              {property.name}
            </p>
            <h1 className="font-serif text-3xl text-neutral-900">
              Your res in Ermelo
            </h1>
            {property.address ? (
              <p className="text-sm text-neutral-600">{property.address}</p>
            ) : null}
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[#3E2723]/30 bg-[#D4AF37] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#3E2723]">
                NSFAS Approved • Fully Covered
              </span>
              {property.distance ? (
                <span className="rounded-full border border-picasso-brown/30 bg-picasso-light/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-picasso-brown">
                  {property.distance}
                </span>
              ) : null}
            </div>
            <div className="flex flex-wrap items-center gap-2 lg:hidden">
              <span className="rounded-full border border-white/60 bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
                Availability: {property.availability}
              </span>
              <span className="rounded-full border border-white/60 bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
                Room types: {property.roomTypes.join(" / ")}
              </span>
            </div>
            <PropertySummary
              description={property.description}
              badges={[property.distance, property.address].filter(Boolean) as string[]}
            />
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-500">
              <span className="text-picasso-brown">On this page</span>
              <a className="transition hover:text-picasso-brown" href="#gallery">
                Gallery
              </a>
              <a className="transition hover:text-picasso-brown" href="#accommodation">
                Accommodation
              </a>
              <a className="transition hover:text-picasso-brown" href="#location">
                Location
              </a>
              <a className="transition hover:text-picasso-brown" href="#reviews">
                Reviews
              </a>
              <a className="transition hover:text-picasso-brown" href="#faq">
                FAQ
              </a>
            </div>
          </header>

          <section id="gallery">
            <BentoGallery
              images={galleryImages.length ? galleryImages : property.images}
              title={property.name}
              slug={property.slug}
            />
          </section>

          <IncludedAccommodation
            highlights={accommodationPreview}
            overflowCount={accommodationOverflow}
          />
          <NSFASBanner />
          <ResidenceManager
            name={manager.name}
            phone={manager.phone}
            email={manager.email}
          />
          <VideoCarousel videos={property.videos ?? []} />
          <PropertyReviews reviews={reviews} />
          <NeighborhoodMap property={property} />
          <PropertyFAQ items={faqs} />
        </div>

        <div className="hidden lg:block">
          <StickyBookingWidget property={property} />
        </div>
      </div>

      <SimilarProperties currentSlug={property.slug} />
      <MobileActionBar
        price="100% Covered by NSFAS"
        href={`/apply?property=${property.slug}`}
      />
    </div>
  );
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const property = propertyRecords.find(
    (record) => record.slug === params.slug
  );

  if (!property) {
    return {
      title: "Property not found",
    };
  }

  return {
    title: `${property.name} | La Picasso Property Group`,
    description: property.description,
    openGraph: {
      title: `${property.name} | La Picasso Property Group`,
      description: property.description,
      images: property.images[0]
        ? [
            {
              url: property.images[0],
              width: 1200,
              height: 630,
              alt: property.name,
            },
          ]
        : undefined,
    },
  };
}
