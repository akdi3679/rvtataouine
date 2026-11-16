import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PartnersStrip } from "@/components/sections/partners-strip";
import { FeaturedProductsSection } from "@/components/sections/featured-products";
import { FeaturedVideosSection } from "@/components/sections/featured-videos";
import { NewsSection } from "@/components/sections/news-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { HeroCarousel } from "@/components/sections/hero-carousel";
import { TeamIcon } from "@/components/global/icon";
import { TEAMS } from "@/data/team-theme";
import { TeamPresentationSection } from "@/components/sections/team-presentation";
import { Gallery } from "@/components/sections/gallery";
import { FinalCTASection } from "@/components/sections/final-cta";
export const metadata: Metadata = {
  title: "Ennour Sportif Tataouine — Football féminin",
  description:
    "La section féminine du Groupe Sportif ARV Tataouine. Formation, accompagnement et célébration du football féminin dans le sud tunisien.",
};

export default function EnnourPage() {
  const t = TEAMS.ennour;
 
  const values = t.content.values!;
  

  return (
    <div className="flex flex-col bg-white">
      <HeroCarousel team="ennour" />
      <PartnersStrip />

      {/* Mission + stats */}
           <TeamPresentationSection team="ennour" />

      {/* Values */}
      <section className="border-y border-border bg-secondary/30 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className={`text-[10px] font-bold uppercase tracking-[0.3em] ${t.textClass}`}>
              {t.content.valuesKicker}
            </p>
            <h2 className="mt-4 text-3xl font-black text-foreground sm:text-4xl lg:text-5xl">
              {t.content.valuesTitle}
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title}>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${t.bgSoftClass}`}>
                  <TeamIcon name={v.icon!} className="h-6 w-6" style={{ color: t.hex }} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

         <Gallery />

      <section id="boutique"><FeaturedProductsSection team="ennour" /></section>
      <section id="tv"><FeaturedVideosSection team="ennour" /></section>
      <section id="news"><NewsSection team="ennour" /></section>

     <NewsletterSection team="ennour" />

      {/* CTA */}
           <FinalCTASection team="ennour" />
    </div>
  );
}