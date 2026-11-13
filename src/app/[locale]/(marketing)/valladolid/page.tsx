import { HeroCarousel } from "@/components/sections/hero-carousel";
import { NextMatchSection } from "@/components/sections/next-match";
import { PartnersStrip } from "@/components/sections/partners-strip";
import { NewsSection } from "@/components/sections/news-section";
import { RecentResultsSection } from "@/components/sections/recent-results";
import { AcademyStorySection } from "@/components/sections/academy-story";
import { ClubPreviewSection } from "@/components/sections/club-preview";
import { PalmaresPreviewSection } from "@/components/sections/palmares-preview";
import { FeaturedVideosSection } from "@/components/sections/featured-videos";
import { AlumniSpotlightSection } from "@/components/sections/alumni-spotlight";
import { FeaturedProductsSection } from "@/components/sections/featured-products";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { FinalCTASection } from "@/components/sections/final-cta";

export default function ValladolidHomePage() {
  return (
    <div className="flex flex-col">
      <HeroCarousel />
      <NextMatchSection />
      <PartnersStrip />
      <NewsSection />
      <AcademyStorySection />
            <RecentResultsSection />

      <ClubPreviewSection />
      <PalmaresPreviewSection />
      <FeaturedVideosSection />
      <FeaturedProductsSection />
      <NewsletterSection />
      <FinalCTASection />
    </div>
  );
}