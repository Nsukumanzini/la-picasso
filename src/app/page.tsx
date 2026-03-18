import HeroSection from "@/components/landing/HeroSection";
import ResShowcase from "@/components/landing/ResShowcase";
import AccommodationGrid from "@/components/landing/AccommodationGrid";
import PropertyPreviews from "@/components/landing/PropertyPreviews";
import StatsCounter from "@/components/landing/StatsCounter";
import TestimonialCarousel from "@/components/landing/TestimonialCarousel";
import FAQAccordion from "@/components/landing/FAQAccordion";
import MapPreview from "@/components/landing/MapPreview";

export default function HomePage() {          
  return (
    <div className="bg-picasso-light/20 snap-y snap-mandatory">
      <HeroSection />
      <ResShowcase />
      <AccommodationGrid />
      <PropertyPreviews />
      <StatsCounter />
      <TestimonialCarousel />
      <FAQAccordion />
      <MapPreview />
    </div>
  );
}
