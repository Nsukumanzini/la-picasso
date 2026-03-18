export type PropertyAvailability = "Available" | "Full";

export type PropertyGallery = {
  rooms: string[];
  kitchen: string[];
  sittingAreas: string[];
  bathrooms: string[];
  outside: string[];
  features?: string[];
  study?: string[];
  laundry?: string[];
  parking?: string[];
};

export type PropertyVideo = {
  src: string;
  label?: string;
};

export type PropertyRecord = {
  id: string;
  name: string;
  slug: string;
  description: string;
  address?: string;
  googleMapsLink?: string;
  listingType?: "NSFAS";
  mainImage?: string;
  logo?: string;
  images: string[];
  gallery?: PropertyGallery;
  videos?: Array<string | PropertyVideo>;
  availability: PropertyAvailability;
  nsfasVerified: boolean;
  distance: string;
  priceFrom: number;
  priceNote: string;
  roomTypes: Array<"Single" | "Sharing">;
  accommodation: string[];
};

export type PropertyFilters = {
  name: string;
  roomType: "" | "Single" | "Sharing";
  accommodation: string[];
};

export type ViewMode = "grid" | "list";
