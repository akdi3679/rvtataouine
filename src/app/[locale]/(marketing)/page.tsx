import { HeroCarousel } from "@/components/sections/hero-carousel";
import { NextMatchSection } from "@/components/sections/next-match";
import { RecentResultsSection } from "@/components/sections/recent-results";
import { ClubPreviewSection } from "@/components/sections/club-preview";
import { AcademyStorySection } from "@/components/sections/academy-story";

import { PalmaresPreviewSection } from "@/components/sections/palmares-preview";
import { FeaturedVideosSection } from "@/components/sections/featured-videos";
import { FeaturedProductsSection } from "@/components/sections/featured-products";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { FinalCTASection } from "@/components/sections/final-cta";
import { PartnersStrip } from "@/components/sections/partners-strip";
import { NewsSection } from "@/components/sections/news-section";
export default function HomePage() {
  return (
    <div className="flex flex-col -mt-16">
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