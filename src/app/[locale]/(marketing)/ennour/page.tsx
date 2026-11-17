import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PartnersStrip } from "@/components/sections/partners-strip";
import { FeaturedProductsSection } from "@/components/sections/featured-products";
import { FeaturedVideosSection } from "@/components/sections/featured-videos";
import { NewsSection } from "@/components/sections/news-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { HeroCarousel } from "@/components/sections/hero-carousel";
import { TEAMS } from "@/data/team-theme";
import { AcademyStorySection } from "@/components/sections/academy-story";
import { ClubPreviewSection } from "@/components/sections/club-preview";
import { Gallery } from "@/components/sections/gallery";
import { FinalCTASection } from "@/components/sections/final-cta";
export const metadata: Metadata = {
  title: "Ennour Sportif Tataouine â€” Football fÃ©minin",
  description:
    "La section fÃ©minine du Groupe Sportif ARV Tataouine. Formation, accompagnement et cÃ©lÃ©bration du football fÃ©minin dans le sud tunisien.",
};

export default function EnnourPage() {
  const t = TEAMS.ennour;
 
  

 const teamVars = {
  "--color-primary": "352 59% 30%",
  "--color-primary-dark": "352 59% 20%",
  "--color-primary-light": "352 59% 45%",
  "--color-accent": "353 58% 40%",
  "--color-accent-dark": "352 59% 30%",
  "--color-accent-light": "353 58% 51%",
} as React.CSSProperties;

  
  return (
    <div style={teamVars} className="flex flex-col bg-white">
      <HeroCarousel team="ennour" />
      <PartnersStrip />

      {/* Mission + stats */}
                <AcademyStorySection team="ennour" />
      <ClubPreviewSection team="ennour" />

         <Gallery team="ennour" />

      <section id="boutique"><FeaturedProductsSection team="ennour" /></section>
      <section id="tv"><FeaturedVideosSection team="ennour" /></section>
      <section id="news"><NewsSection team="ennour" /></section>

     <NewsletterSection team="ennour" />

      {/* CTA */}
           <FinalCTASection team="ennour" />
    </div>
  );
}