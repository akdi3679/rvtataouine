import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PartnersStrip } from "@/components/sections/partners-strip";
import { FeaturedProductsSection } from "@/components/sections/featured-products";
import { FeaturedVideosSection } from "@/components/sections/featured-videos";
import { NewsSection } from "@/components/sections/news-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { HeroCarousel } from "@/components/sections/hero-carousel";
import { Gallery } from "@/components/sections/gallery";
import { TEAMS, getTeamVars } from "@/data/team-theme";
import { AcademyStorySection } from "@/components/sections/academy-story";
import { ClubPreviewSection } from "@/components/sections/club-preview";
import { FinalCTASection } from "@/components/sections/final-cta";
export const metadata: Metadata = {
  title: "Avenir Sportif Tataouine , Football & Futsal",
  description:
    "La section football  11 et futsal du Groupe Sportif ARV Tataouine. Formation polyvalente pour les joueurs du sud tunisien.",
};

export default function AvenirPage() {
  const t = TEAMS.avenir;
  
  

return (
    <div style={getTeamVars("avenir")} className="flex flex-col bg-white">
      <HeroCarousel team="avenir" />
      <PartnersStrip />

      {/* Mission + stats */}
     <AcademyStorySection team="avenir" /> 
      <ClubPreviewSection team="avenir" />

           <Gallery team="avenir" />      

      <section id="boutique"><FeaturedProductsSection team="avenir" /></section>
      <section id="tv"><FeaturedVideosSection team="avenir" /></section>
      <section id="news"><NewsSection team="avenir" /></section>

      <NewsletterSection team="avenir"  />

      {/* CTA */}
           <FinalCTASection team="avenir" />
    </div>
  );
}