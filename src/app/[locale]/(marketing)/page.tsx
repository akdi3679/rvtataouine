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
import { TEAM_THEME, type TeamId } from "@/data/team-theme";

export const metadata: Metadata = {
  title: "Groupe Sportif ARV Tataouine",
  description:
    "Un projet, trois équipes, une même passion. Découvrez le groupe sportif ARV Tataouine.",
};

interface Entity {
  id: TeamId;
  href: string;
  subtitle: string;
  description: string;
  stats: { value: string; label: string }[];
}

const ENTITIES: Entity[] = [
  {
    id: "valladolid",
    href: "/valladolid",
    subtitle: "Football masculin",
    description:
      "L'académie historique. Méthodologie espagnole, encadrement professionnel, formation des champions de demain.",
    stats: [
      { value: "150+", label: "Joueurs" },
      { value: "4", label: "Catégories" },
      { value: "10", label: "Ans" },
    ],
  },
  {
    id: "ennour",
    href: "/ennour",
    subtitle: "Football féminin",
    description:
      "La section féminine dédiée à la formation et à l'épanouissement des jeunes filles dans le football.",
    stats: [
      { value: "40+", label: "Joueuses" },
      { value: "3", label: "Catégories" },
      { value: "1", label: "Équipe" },
    ],
  },
  {
    id: "avenir",
    href: "/avenir",
    subtitle: "Football & Futsal",
    description:
      "Football à 11 et futsal, avec un programme complet pour former des joueurs polyvalents.",
    stats: [
      { value: "80+", label: "Joueurs" },
      { value: "2", label: "Disciplines" },
      { value: "5", label: "Catégories" },
    ],
  },
];

const VALUES = [
  { number: "01", title: "Excellence", description: "Recherche constante du haut niveau technique et tactique." },
  { number: "02", title: "Famille", description: "Un esprit collectif qui unit joueurs, staff et familles." },
  { number: "03", title: "Passion", description: "L'amour du football, le respect de l'adversaire, la joie de jouer." },
  { number: "04", title: "Discipline", description: "Sérieux, ponctualité et respect sur et en dehors du terrain." },
];

function GroupHero() {
  return (
    <section className="relative h-[85svh] min-h-[560px] w-full overflow-hidden text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero1.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1F5F8B]/70 via-transparent to-[#0F2A47]/60" />
      </div>

      <div className="relative flex h-full flex-col justify-end pb-12 lg:pb-20">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-white backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#F0C419]" />
            Groupe Sportif · Tataouine
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl lg:text-7xl">
            Un projet. Trois équipes.
            <span className="block text-white/90">Une même passion.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            Depuis 2016, le Groupe Sportif ARV Tataouine forme les jeunes
            talents du sud tunisien. Trois entités, une seule vision :
            l&apos;excellence sportive, l&apos;éducation et la passion du
            football.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#entities"
              className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-bold text-[#1F5F8B] shadow-lg transition-all hover:scale-[1.02] hover:bg-white/90"
            >
              Découvrir nos équipes
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition-all hover:bg-white/20"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function EntitiesSection() {
  return (
    <section
      id="entities"
      className="border-y border-border bg-secondary/30 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1F5F8B]">
            Nos entités
          </p>
          <h2 className="mt-4 text-3xl font-black text-foreground sm:text-4xl lg:text-5xl">
            Trois équipes, une famille
          </h2>
        </div>

        <div className="grid gap-8 gap-y-24 pt-12 lg:grid-cols-3">
          {ENTITIES.map((entity) => {
            const theme = TEAM_THEME[entity.id];
            return (
              <Link
                key={entity.id}
                href={entity.href}
                className="group relative flex flex-col"
              >
                {/* Logo overflowing top edge */}
                <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-xl ring-4 ring-secondary/50 transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={theme.logoPath}
                      alt={theme.name}
                      width={80}
                      height={80}
                      className="h-20 w-20 object-contain"
                    />
                  </div>
                </div>

                <div className="flex flex-1 flex-col rounded-2xl border border-border bg-white pt-16 transition-all hover:-translate-y-1 hover:shadow-xl">
                  <div className="px-6 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      {entity.subtitle}
                    </p>
                    <h3 className="mt-2 text-2xl font-black text-foreground">
                      {theme.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {entity.description}
                    </p>
                  </div>

                  <div className="mt-6 px-6">
                    <div className="grid grid-cols-3 gap-2 border-t border-border pt-4">
                      {entity.stats.map((s) => (
                        <div key={s.label} className="text-center">
                          <p className="text-lg font-black tabular-nums text-foreground">
                            {s.value}
                          </p>
                          <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                            {s.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between rounded-b-2xl bg-secondary/40 px-6 py-4 text-sm font-bold text-foreground transition-colors group-hover:bg-secondary/70">
                    Découvrir
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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

function VisionSection() {
  return (
    <section className="py-24 lg:py-40 bg-white">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#1F5F8B]">
          Notre vision
        </p>

        <h2 className="mt-16 text-3xl font-black leading-[1.05] tracking-tight text-foreground sm:text-4xl lg:text-6xl">
          Former des champions,
          <br />
          <span className="text-[#1F5F8B]">
            sur et en dehors du terrain.
          </span>
        </h2>

        <p className="mt-14 mx-auto max-w-2xl text-base leading-[1.8] text-muted-foreground sm:text-lg lg:text-xl">
          Le Groupe Sportif ARV Tataouine n&apos;est pas qu&apos;un club de
          football. C&apos;est un projet éducatif, social et sportif qui
          accompagne les jeunes de Tataouine dans leur développement personnel
          et sportif.
        </p>
      </div>

      <div className="mx-auto max-w-5xl px-6 lg:px-8 mt-24">
        <div className="border-t border-border pt-16">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title}>
                <p className="text-xs font-bold tracking-[0.3em] text-muted-foreground/50">
                  {v.number}
                </p>
                <p className="mt-4 text-lg font-bold text-foreground">
                  {v.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function GroupHomePage() {
  // Override CSS vars so shared sections use group colors (blue + gold)
  const groupVars = {
    "--color-primary": "204 63% 33%",
    "--color-primary-dark": "204 63% 23%",
    "--color-primary-light": "204 63% 43%",
    "--color-accent": "43 100% 60%",
    "--color-accent-dark": "43 100% 50%",
    "--color-accent-light": "43 100% 70%",
  } as React.CSSProperties;

  return (
    <div style={groupVars} className="flex flex-col">
      <GroupHero />
      <EntitiesSection />
      <VisionSection />
      <NewsSection />
      <FeaturedVideosSection />
      <PartnersStrip />
      <FeaturedProductsSection />
      <NewsletterSection />
      <FinalCTASection />
    </div>
  );
}