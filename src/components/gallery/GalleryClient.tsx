"use client";

import { useMemo, useState } from "react";
import { propertyRecords } from "../properties/propertiesData";
import ImageLightbox from "../property-details/ImageLightbox";

const categories = [
  { key: "all", label: "All" },
  { key: "rooms", label: "Rooms" },
  { key: "kitchen", label: "Kitchen" },
  { key: "sittingAreas", label: "Sitting Areas" },
  { key: "bathrooms", label: "Bathrooms" },
  { key: "outside", label: "Outside" },
  { key: "features", label: "Features" },
  { key: "study", label: "Study" },
  { key: "laundry", label: "Laundry" },
  { key: "parking", label: "Parking" },
] as const;

type CategoryKey = (typeof categories)[number]["key"];
type PropertyKey = "all" | (typeof propertyRecords)[number]["id"];

type PropertyRecord = (typeof propertyRecords)[number];

const collectAllImages = (property: PropertyRecord) => {
  const images = [
    property.mainImage,
    ...property.images,
    ...(property.gallery?.rooms ?? []),
    ...(property.gallery?.kitchen ?? []),
    ...(property.gallery?.sittingAreas ?? []),
    ...(property.gallery?.bathrooms ?? []),
    ...(property.gallery?.outside ?? []),
    ...(property.gallery?.features ?? []),
    ...(property.gallery?.study ?? []),
    ...(property.gallery?.laundry ?? []),
    ...(property.gallery?.parking ?? []),
  ].filter(Boolean) as string[];

  return Array.from(new Set(images));
};

const getCategoryImages = (property: PropertyRecord, category: CategoryKey) => {
  if (category === "all") return collectAllImages(property);
  if (category === "rooms") return property.gallery?.rooms ?? [];
  if (category === "kitchen") return property.gallery?.kitchen ?? [];
  if (category === "sittingAreas") return property.gallery?.sittingAreas ?? [];
  if (category === "bathrooms") return property.gallery?.bathrooms ?? [];
  if (category === "outside") return property.gallery?.outside ?? [];
  if (category === "features") return property.gallery?.features ?? [];
  if (category === "study") return property.gallery?.study ?? [];
  if (category === "laundry") return property.gallery?.laundry ?? [];
  if (category === "parking") return property.gallery?.parking ?? [];
  return [];
};


const shuffleImages = (images: string[]) => {
  const shuffled = [...images];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [activeProperty, setActiveProperty] = useState<PropertyKey>("all");
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleOpen = (images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const handleClose = () => setIsLightboxOpen(false);

  const filteredImages = useMemo(() => {
    const selectedProperties =
      activeProperty === "all"
        ? propertyRecords
        : propertyRecords.filter((property) => property.id === activeProperty);
    const collected = selectedProperties.flatMap((property) =>
      getCategoryImages(property, activeCategory)
    );
    const unique = Array.from(new Set(collected));
    return shuffleImages(unique);
  }, [activeCategory, activeProperty]);

  return (
    <div className="min-h-screen bg-picasso-light/20 pb-24 pt-28">
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6 lg:px-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-picasso-brown">
            Gallery
          </p>
          <h1 className="font-serif text-3xl text-neutral-900">
            A closer look at our res
          </h1>
          <p className="text-sm text-neutral-600">
            Browse rooms, kitchens, and shared spaces across all four properties.
          </p>
        </header>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveProperty("all")}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
              activeProperty === "all"
                ? "bg-picasso-brown text-white"
                : "border border-picasso-brown/30 bg-white/80 text-picasso-brown"
            }`}
          >
            All
          </button>
          {propertyRecords.map((property) => (
            <button
              key={property.id}
              type="button"
              onClick={() => setActiveProperty(property.id)}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                activeProperty === property.id
                  ? "bg-picasso-brown text-white"
                  : "border border-picasso-brown/30 bg-white/80 text-picasso-brown"
              }`}
            >
              {property.name}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.key}
              type="button"
              onClick={() => setActiveCategory(category.key)}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                activeCategory === category.key
                  ? "bg-picasso-brown text-white"
                  : "border border-picasso-brown/30 bg-white/80 text-picasso-brown"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {filteredImages.map((src, index) => (
            <button
              key={`gallery-image-${index}`}
              type="button"
              onClick={() => handleOpen(filteredImages, index)}
              className="relative h-28 overflow-hidden rounded-2xl bg-gradient-to-br from-picasso-light/60 to-white/40 sm:h-40"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${src})` }}
              />
            </button>
          ))}
        </div>
      </div>

      <ImageLightbox
        images={lightboxImages}
        isOpen={isLightboxOpen}
        startIndex={lightboxIndex}
        onClose={handleClose}
      />
    </div>
  );
}
