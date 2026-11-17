import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PartnersStrip } from "@/components/sections/partners-strip";
import { FeaturedProductsSection } from "@/components/sections/featured-products";
import { FeaturedVideosSection } from "@/components/sections/featured-videos";
import { NewsSection } from "@/components/sections/news-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { FinalCTASection } from "@/components/sections/final-cta";
import { HeroCarousel } from "@/components/sections/hero-carousel";
import { TEAMS, ENTITY_LIST } from "@/data/team-theme";
import { AcademyStorySection } from "@/components/sections/academy-story";
import { ClubPreviewSection } from "@/components/sections/club-preview";
export const metadata: Metadata = {
  title: "Groupe Sportif ARV Tataouine",
  description:
    "Un projet, trois équipes, une même passion. Découvrez le groupe sportif ARV Tataouine.",
};

function EntitiesSection() {
  const group = TEAMS.group;
  return (
    <section
      id="entities"
      className="border-y border-border bg-secondary/30 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className={`text-[10px] font-bold uppercase tracking-[0.3em] ${group.textClass}`}>
            {group.content.entitiesKicker}
          </p>
          <h2 className="mt-4 text-3xl font-black text-foreground sm:text-4xl lg:text-5xl">
            {group.content.entitiesTitle}
          </h2>
        </div>

        <div className="grid gap-8 gap-y-24 pt-12 lg:grid-cols-3">
          {ENTITY_LIST.map((theme) => {
            const content = theme.content;
            const stats = content.stats ?? [];
            return (
              <Link
                key={theme.id}
                href={`/${theme.id}`}
                className="group relative flex flex-col"
              >
                {/* Logo floats above the card */}
                <div className="relative z-10 -mb-12 flex justify-center">
                  <div className="transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-110">
                    <Image
                      src={theme.logoPath}
                      alt={theme.name}
                      width={96}
                      height={96}
                      className="h-24 w-24 object-contain drop-shadow-xl"
                    />
                  </div>
                </div>

                <div className="flex flex-1 flex-col rounded-2xl border border-border bg-white pt-16 overflow-hidden">
                  <div className="px-6 text-center">
                    <p className={`text-[10px] font-bold uppercase tracking-[0.4em] ${group.textClass}`}>
                      {content.subtitle}
                    </p>
                    <h3 className="mt-2 text-2xl font-black text-foreground">
                      {theme.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {content.shortDescription}
                    </p>
                  </div>

                  {stats.length > 0 && (
                    <div className="mt-6 px-6">
                      <div className="grid grid-cols-3 gap-2 border-t border-border pt-4">
                        {stats.map((s) => (
                          <div key={s.label} className="text-center">
                            <p
                              className="text-lg font-black tabular-nums"
                              style={{ color: theme.hex }}
                            >
                              {s.value}
                            </p>
                            <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                              {s.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-auto flex items-center justify-between bg-secondary/40 px-6 py-4 text-sm font-bold text-foreground">
                    Découvrir
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}



export default function GroupHomePage() {
  // Override CSS vars so shared sections use group colors (blue + gold).
  // NOTE: HSL values MUST match TEAMS.group.hex (#0B3E5C). Update both if group hex changes.
  const groupVars = {
    "--color-primary": "202 79% 20%",
    "--color-primary-dark": "202 79% 14%",
    "--color-primary-light": "202 79% 30%",
    "--color-accent": "43 100% 60%",
    "--color-accent-dark": "43 100% 50%",
    "--color-accent-light": "43 100% 70%",
  } as React.CSSProperties;

  return (
    <div style={groupVars} className="flex flex-col">
      <HeroCarousel team="group" />

      <PartnersStrip />
      <AcademyStorySection team="group" />
      <ClubPreviewSection team="group" />

      <EntitiesSection />
      <NewsSection />
      <FeaturedVideosSection />
      <FeaturedProductsSection />
      <NewsletterSection />
      <FinalCTASection />
    </div>
  );
}