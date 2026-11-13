import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Target, Users, Heart, Shield } from "lucide-react";

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
    "Un projet, trois équipes, une même passion. Découvrez le groupe sportif ARV Tataouine : football masculin, football féminin et futsal.",
};

interface Entity {
  id: TeamId;
  href: string;
  subtitle: string;
  tagline: string;
  description: string;
  stats: { value: string; label: string }[];
}

const ENTITIES: Entity[] = [
  {
    id: "valladolid",
    href: "/valladolid",
    subtitle: "Football masculin",
    tagline: "L'académie historique",
    description:
      "Fondée en 2016, l'Académie Real Valladolid Tataouine est l'entité phare du groupe. Méthodologie espagnole, encadrement professionnel, formation des champions de demain.",
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
    tagline: "La lumière du football féminin",
    description:
      "Notre section féminine, dédiée à la formation et à l'épanouissement des jeunes filles de la région dans la pratique du football.",
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
    tagline: "L'avenir, sur et en dehors du terrain",
    description:
      "Notre entité dédiée au football à 11 et au futsal, avec un programme complet pour former des joueurs polyvalents.",
    stats: [
      { value: "80+", label: "Joueurs" },
      { value: "2", label: "Disciplines" },
      { value: "5", label: "Catégories" },
    ],
  },
];

const VALUES = [
  {
    icon: Target,
    title: "Excellence",
    description: "Recherche constante du haut niveau technique et tactique.",
  },
  {
    icon: Users,
    title: "Famille",
    description: "Un esprit collectif qui unit joueurs, staff et familles.",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "L'amour du football, le respect de l'adversaire, la joie de jouer.",
  },
  {
    icon: Shield,
    title: "Discipline",
    description: "Sérieux, ponctualité et respect sur et en dehors du terrain.",
  },
];

function GroupHero() {
  return (
    <section className="relative overflow-hidden bg-[#1F5F8B] text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero1.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1F5F8B]/95 via-[#1F5F8B]/85 to-[#0F2A47]/90" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70">
          Groupe Sportif · Tataouine
        </p>
        <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl">
          Un projet.
          <br />
          Trois équipes.
          <br />
          <span className="text-white/90">Une même passion.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
          Depuis 2016, le Groupe Sportif ARV Tataouine forme les jeunes talents
          du sud tunisien. Aujourd&apos;hui, trois entités portent la même
          vision : l&apos;excellence sportive, l&apos;éducation et la passion du
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
    </section>
  );
}

function ManifestoSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1F5F8B]">
          Notre vision
        </p>
        <h2 className="mt-4 text-3xl font-black leading-tight text-foreground sm:text-4xl lg:text-5xl">
          Former des champions,
          <br />
          <span className="text-[#1F5F8B]">
            sur et en dehors du terrain.
          </span>
        </h2>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
          Le Groupe Sportif ARV Tataouine n&apos;est pas qu&apos;un club de
          football. C&apos;est un projet éducatif, social et sportif qui
          accompagne les jeunes de Tataouine dans leur développement personnel
          et sportif. À travers nos trois entités, nous couvrons le football
          masculin, le football féminin et le futsal, offrant à chaque jeune
          une place pour grandir.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.title}>
                <Icon className="h-6 w-6 text-[#1F5F8B]" />
                <h3 className="mt-3 text-base font-bold text-foreground">
                  {v.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {v.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function EntitiesSection() {
  return (
    <section id="entities" className="border-y border-border bg-secondary/30 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1F5F8B]">
            Nos entités
          </p>
          <h2 className="mt-4 text-3xl font-black text-foreground sm:text-4xl lg:text-5xl">
            Trois équipes, une famille
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {ENTITIES.map((entity) => {
            const theme = TEAM_THEME[entity.id];
            return (
              <Link
                key={entity.id}
                href={entity.href}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className={`relative flex aspect-[4/3] items-end p-6 ${theme.bgClass}`}
                >
                  <div className="relative z-10">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">
                      {entity.subtitle}
                    </p>
                    <h3 className="mt-1 text-2xl font-black text-white sm:text-3xl">
                      {theme.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-white/85">
                      {entity.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {entity.description}
                  </p>

                  <div className="mt-6 grid grid-cols-3 gap-2 border-t border-border pt-4">
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

                  <div className="mt-6 flex items-center justify-between text-sm font-bold text-foreground">
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

export default function GroupHomePage() {
  return (
    <div className="flex flex-col">
      <GroupHero />
      <ManifestoSection />
      <EntitiesSection />
      <PartnersStrip />
      <FeaturedProductsSection />
      <FeaturedVideosSection />
      <NewsSection />
      <NewsletterSection />
      <FinalCTASection />
    </div>
  );
}