export type PropertyRecord = {
  id: string;
  name: string;
  description: string;
  slug: string;
  address?: string;
  distanceToCampus?: string;
  googleMapsLink?: string;
  listingType?: "NSFAS";
  mainImage?: string;
  logo?: string;
  images: {
    cover: string;
    gallery: string[];
  };
  gallery?: {
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
  videos?: Array<string | { src: string; label?: string }>;
  accommodation?: string[];
};

export const properties: PropertyRecord[] = [
  {
    id: "legends-lodge",
    name: "Legends Lodge",
    description:
      "Chilled, quiet student home with great study spots, strong security, and a quick walk to campus.",
    slug: "legends-lodge",
    address: "3 Charles Talbot St, Ermelo, Mpumalanga",
    distanceToCampus: "Less than 2km to GS Ermelo Campus",
    googleMapsLink:
      "https://www.google.com/maps/search/?api=1&query=3%20Charles%20Talbot%20St%2C%20Ermelo%2C%20Mpumalanga",
    listingType: "NSFAS",
    mainImage: "/assets/properties/legends-lodge/outside-1.jpeg",
    images: {
      cover: "/assets/properties/legends-lodge/outside-1.jpeg",
      gallery: [
        "/assets/properties/legends-lodge/outside-1.jpeg",
        "/assets/properties/legends-lodge/room-1.jpeg",
        "/assets/properties/legends-lodge/kitchen-1.jpeg",
        "/assets/properties/legends-lodge/sitting-1.jpeg",
        "/assets/properties/legends-lodge/study-hall-1.jpeg",
      ],
    },
    gallery: {
      rooms: [
        "/assets/properties/legends-lodge/room-1.jpeg",
        "/assets/properties/legends-lodge/room-2.jpeg",
        "/assets/properties/legends-lodge/room-3.jpeg",
        "/assets/properties/legends-lodge/room-4.jpeg",
        "/assets/properties/legends-lodge/room-5.jpeg",
        "/assets/properties/legends-lodge/room-6.jpeg",
        "/assets/properties/legends-lodge/room-7.jpeg",
        "/assets/properties/legends-lodge/room-8.jpeg",
        "/assets/properties/legends-lodge/room-9.jpeg",
      ],
      kitchen: [
        "/assets/properties/legends-lodge/kitchen-1.jpeg",
        "/assets/properties/legends-lodge/kitchen-2.jpeg",
        "/assets/properties/legends-lodge/kitchen-3.jpeg",
      ],
      sittingAreas: [
        "/assets/properties/legends-lodge/sitting-1.jpeg",
        "/assets/properties/legends-lodge/sitting-2.jpeg",
      ],
      bathrooms: [
        "/assets/properties/legends-lodge/bathroom-1.jpeg",
        "/assets/properties/legends-lodge/bathroom-2.jpeg",
        "/assets/properties/legends-lodge/bathroom-3.jpeg",
        "/assets/properties/legends-lodge/bathroom-4.jpeg",
      ],
      outside: [
        "/assets/properties/legends-lodge/outside-1.jpeg",
        "/assets/properties/legends-lodge/outside-2.jpeg",
        "/assets/properties/legends-lodge/outside-3.jpeg",
        "/assets/properties/legends-lodge/outside-4.jpeg",
        "/assets/properties/legends-lodge/outside-5.jpeg",
        "/assets/properties/legends-lodge/outside-6.jpeg",
        "/assets/properties/legends-lodge/outside-7.jpeg",
        "/assets/properties/legends-lodge/outside-8.jpeg",
        "/assets/properties/legends-lodge/outside-9.jpeg",
      ],
      features: [
        "/assets/properties/legends-lodge/generator.jpeg",
        "/assets/properties/legends-lodge/guard-house.jpeg",
        "/assets/properties/legends-lodge/reception-1.jpeg",
        "/assets/properties/legends-lodge/reception-2.jpeg",
        "/assets/properties/legends-lodge/reception-3.jpeg",
        "/assets/properties/legends-lodge/stairs-1.jpeg",
        "/assets/properties/legends-lodge/stairs-2.jpeg",
      ],
      study: [
        "/assets/properties/legends-lodge/study-hall-1.jpeg",
        "/assets/properties/legends-lodge/study-hall-2.jpeg",
      ],
      laundry: [
        "/assets/properties/legends-lodge/laundry-1.jpeg",
        "/assets/properties/legends-lodge/laundry-2.jpeg",
        "/assets/properties/legends-lodge/laundry-3.jpeg",
        "/assets/properties/legends-lodge/laundry-4.jpeg",
        "/assets/properties/legends-lodge/laundry-5.jpeg",
      ],
      parking: ["/assets/properties/legends-lodge/parking-1.jpeg"],
    },
    videos: [
      { src: "/assets/properties/legends-lodge/main-video.mp4", label: "Main Tour" },
      { src: "/assets/properties/legends-lodge/room-video.mp4", label: "Rooms" },
      { src: "/assets/properties/legends-lodge/kitchen-video.mp4", label: "Kitchen" },
      { src: "/assets/properties/legends-lodge/sitting-video.mp4", label: "Living Areas" },
      { src: "/assets/properties/legends-lodge/laundry-video.mp4", label: "Laundry" },
      { src: "/assets/properties/legends-lodge/parking-video.mp4", label: "Parking" },
      { src: "/assets/properties/legends-lodge/outside-video-1.mp4", label: "Exterior 1" },
      { src: "/assets/properties/legends-lodge/outside-video-2.mp4", label: "Exterior 2" },
      { src: "/assets/properties/legends-lodge/outside-video-3.mp4", label: "Exterior 3" }
    ],
    accommodation: [
      "Backup Power (Generator)",
      "CCTV & 24/7 Security",
      "Free Laundry Facilities",
      "Uncapped Wi-Fi",
      "Walking Distance to Campus (<2km)",
      "Water & Electricity Included",
      "Study Hall",
      "Guard House",
    ],
  },
  {
    id: "la-picasso",
    name: "La Picasso Guest House",
    description:
      "Stylish student home with a gym and boardroom, great for study sessions and group work.",
    slug: "la-picasso",
    address: "37a Voortrekker St, Ermelo, 2351",
    distanceToCampus: "Less than 2km to GS Ermelo Campus",
    googleMapsLink:
      "https://www.google.com/maps/search/?api=1&query=37a%20Voortrekker%20St%2C%20Ermelo%2C%202351",
    listingType: "NSFAS",
    mainImage: "/assets/properties/la-picasso/main.jpeg",
    images: {
      cover: "/assets/properties/la-picasso/main.jpeg",
      gallery: [
        "/assets/properties/la-picasso/main.jpeg",
        "/assets/properties/la-picasso/gym.jpeg",
        "/assets/properties/la-picasso/boardroom.jpeg",
        "/assets/properties/la-picasso/sitting-1.jpeg",
        "/assets/properties/la-picasso/sitting-2.jpeg",
        "/assets/properties/la-picasso/sitting-3.jpeg",
        "/assets/properties/la-picasso/sitting-4.jpeg",
        "/assets/properties/la-picasso/outside-1.jpeg",
      ],
    },
    gallery: {
      kitchen: [],
      sittingAreas: [
        "/assets/properties/la-picasso/sitting-1.jpeg",
        "/assets/properties/la-picasso/sitting-2.jpeg",
        "/assets/properties/la-picasso/sitting-3.jpeg",
        "/assets/properties/la-picasso/sitting-4.jpeg",
      ],
      rooms: [
        "/assets/properties/la-picasso/room-1.jpeg",
        "/assets/properties/la-picasso/room-2.jpeg",
        "/assets/properties/la-picasso/room-3.jpeg",
        "/assets/properties/la-picasso/room-4.jpeg",
        "/assets/properties/la-picasso/room-5.jpeg",
        "/assets/properties/la-picasso/room-6.jpeg",
        "/assets/properties/la-picasso/room-7.jpeg",
        "/assets/properties/la-picasso/room-8.jpeg",
      ],
      bathrooms: [
        "/assets/properties/la-picasso/bathroom-2.jpeg",
        "/assets/properties/la-picasso/bathroom-3.jpeg",
        "/assets/properties/la-picasso/bathroom-4.jpeg",
        "/assets/properties/la-picasso/bathroom-5.jpeg",
        "/assets/properties/la-picasso/bathroom-6.jpeg",
      ],
      outside: [
        "/assets/properties/la-picasso/outside-1.jpeg",
        "/assets/properties/la-picasso/outside-2.jpeg",
        "/assets/properties/la-picasso/outside-3.jpeg",
      ],
      features: [
        "/assets/properties/la-picasso/gym.jpeg",
        "/assets/properties/la-picasso/boardroom.jpeg",
      ],
    },
    videos: [],
    accommodation: [
      "Backup Power (Generator)",
      "CCTV & 24/7 Security",
      "Free Laundry Facilities",
      "Uncapped Wi-Fi",
      "Walking Distance to Campus (<2km)",
      "Water & Electricity Included",
      "On-site Gym",
      "Boardroom",
    ],
  },
  {
    id: "pablo",
    name: "Pablo Guest house",
    description:
      "Friendly res with social lounges and outdoor space, safe and great for studying.",
    slug: "pablo",
    address: "2 Carolus-Reinecke St, Ermelo, Mpumalanga",
    distanceToCampus: "Less than 3km to GS Ermelo Campus",
    googleMapsLink:
      "https://www.google.com/maps/search/?api=1&query=2%20Carolus-Reinecke%20St%2C%20Ermelo%2C%20Mpumalanga",
    listingType: "NSFAS",
    mainImage: "/assets/properties/pablo/main.jpeg",
    logo: "/assets/properties/pablo/logo.png",
    images: {
      cover: "/assets/properties/pablo/main.jpeg",
      gallery: [
        "/assets/properties/pablo/room-1.jpeg",
        "/assets/properties/pablo/kitchen-1.jpeg",
        "/assets/properties/pablo/sitting-1.jpeg",
        "/assets/properties/pablo/outside-1.jpeg",
      ],
    },
    gallery: {
      rooms: [
        "/assets/properties/pablo/room-1.jpeg",
        "/assets/properties/pablo/room-2.jpeg",
        "/assets/properties/pablo/room-3.jpeg",
        "/assets/properties/pablo/room-4.jpeg",
        "/assets/properties/pablo/room-5.jpeg",
        "/assets/properties/pablo/room-6.jpeg",
        "/assets/properties/pablo/room-7.jpeg",
        "/assets/properties/pablo/room-8.jpeg",
      ],
      kitchen: [
        "/assets/properties/pablo/kitchen-1.jpeg",
        "/assets/properties/pablo/kitchen-2.jpeg",
        "/assets/properties/pablo/kitchen-3.jpeg",
        "/assets/properties/pablo/kitchen-4.jpeg",
        "/assets/properties/pablo/kitchen-5.jpeg",
        "/assets/properties/pablo/kitchen-6.jpeg",
      ],
      sittingAreas: [
        "/assets/properties/pablo/sitting-1.jpeg",
        "/assets/properties/pablo/sitting-2.jpeg",
        "/assets/properties/pablo/sitting-3.jpeg",
        "/assets/properties/pablo/sitting-4.jpeg",
        "/assets/properties/pablo/sitting-5.jpeg",
        "/assets/properties/pablo/sitting-6.jpeg",
      ],
      bathrooms: [
        "/assets/properties/pablo/bathroom-1.jpeg",
        "/assets/properties/pablo/bathroom-2.jpeg",
        "/assets/properties/pablo/bathroom-3.jpeg",
      ],
      outside: [
        "/assets/properties/pablo/outside-1.jpeg",
        "/assets/properties/pablo/outside-2.jpeg",
        "/assets/properties/pablo/outside-3.jpeg",
        "/assets/properties/pablo/outside-4.jpeg",
        "/assets/properties/pablo/outside-5.jpeg",
        "/assets/properties/pablo/outside-6.jpeg",
        "/assets/properties/pablo/outside-7.jpeg",
      ],
    },
    videos: [
      "/assets/properties/pablo/room-video.mp4",
      "/assets/properties/pablo/outside-video.mp4",
      "/assets/properties/pablo/sitting-video.mp4",
    ],
    accommodation: [
      "Backup Power (Generator)",
      "CCTV & 24/7 Security",
      "Free Laundry Facilities",
      "Uncapped Wi-Fi",
      "Walking Distance to Campus (<2km)",
      "Water & Electricity Included",
    ],
  },
  {
    id: "28",
    name: "28 Genl Hertzog",
    description:
      "Small, calm res with a focused vibe, safe and secure for serious study.",
    slug: "28",
    address: "28 Genl Hertzog St, Ermelo, Mpumalanga",
    distanceToCampus: "Less than 2km to GS Ermelo Campus",
    googleMapsLink:
      "https://www.google.com/maps/search/?api=1&query=28%20Genl%20Hertzog%20St%2C%20Ermelo%2C%20Mpumalanga",
    listingType: "NSFAS",
    mainImage: "/assets/properties/28/outside-1.jpeg",
    images: {
      cover: "/assets/properties/28/outside-1.jpeg",
      gallery: [
        "/assets/properties/28/outside-1.jpeg",
        "/assets/properties/28/room-1.jpeg",
        "/assets/properties/28/kitchen-1.jpeg",
        "/assets/properties/28/bathroom-1.jpeg",
        "/assets/properties/28/sitting-1.jpeg",
      ],
    },
    gallery: {
      rooms: [
        "/assets/properties/28/room-1.jpeg",
        "/assets/properties/28/room-2.jpeg",
        "/assets/properties/28/room-3.jpeg",
        "/assets/properties/28/room-4.jpeg",
      ],
      kitchen: [
        "/assets/properties/28/kitchen-1.jpeg",
        "/assets/properties/28/kitchen-2.jpeg",
        "/assets/properties/28/kitchen-3.jpeg",
        "/assets/properties/28/kitchen-4.jpeg",
      ],
      sittingAreas: [
        "/assets/properties/28/sitting-1.jpeg",
        "/assets/properties/28/sitting-2.jpeg",
      ],
      bathrooms: [
        "/assets/properties/28/bathroom-1.jpeg",
        "/assets/properties/28/bathroom-2.jpeg",
        "/assets/properties/28/bathroom-3.jpeg",
        "/assets/properties/28/bathroom-4.jpeg",
        "/assets/properties/28/bathroom-5.jpeg",
      ],
      outside: [
        "/assets/properties/28/outside-1.jpeg",
        "/assets/properties/28/outside-2.jpeg",
        "/assets/properties/28/outside-3.jpeg",
        "/assets/properties/28/outside-4.jpeg",
        "/assets/properties/28/outside-5.jpeg",
        "/assets/properties/28/outside-6.jpeg",
      ],
    },
    videos: [
      "/assets/properties/28/bathroom-video.mp4",
      "/assets/properties/28/kitchen-video.mp4",
      "/assets/properties/28/outside-video.mp4",
    ],
    accommodation: [
      "Backup Power (Generator)",
      "CCTV & 24/7 Security",
      "Free Laundry Facilities",
      "Uncapped Wi-Fi",
      "Walking Distance to Campus (<2km)",
      "Water & Electricity Included",
    ],
  },
];
