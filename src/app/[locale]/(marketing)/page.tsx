import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Target,
  Users,
  Heart,
  Shield,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Groupe Sportif ARV Tataouine",
  description:
    "Un projet, trois équipes, une même passion. Découvrez le groupe sportif ARV Tataouine : football masculin, football féminin et futsal.",
};

const ENTITIES = [
  {
    id: "valladolid",
    name: "Real Valladolid",
    subtitle: "Football masculin",
    tagline: "L'académie historique",
    description:
      "Fondée en 2016, l'Académie Real Valladolid Tataouine est l'entité phare du groupe. Méthodologie espagnole, encadrement professionnel, formation des champions de demain.",
    gradient: "from-primary via-primary-dark to-accent",
    href: "/valladolid",
    stats: [
      { value: "150+", label: "Joueurs" },
      { value: "4", label: "Catégories" },
      { value: "10", label: "Ans" },
    ],
  },
  {
    id: "ennour",
    name: "Ennour Sportif",
    subtitle: "Football féminin",
    tagline: "La lumière du football féminin",
    description:
      "Notre section féminine, dédiée à la formation et à l'épanouissement des jeunes filles de la région dans la pratique du football.",
    gradient: "from-[#7A1F2B] via-[#5C1620] to-[#141414]",
    href: "/ennour",
    stats: [
      { value: "40+", label: "Joueuses" },
      { value: "3", label: "Catégories" },
      { value: "1", label: "Équipe" },
    ],
  },
  {
    id: "avenir",
    name: "Avenir Sportif",
    subtitle: "Football & Futsal",
    tagline: "L'avenir, sur et en dehors du terrain",
    description:
      "Notre entité dédiée au football à 11 et au futsal, avec un programme complet pour former des joueurs polyvalents.",
    gradient: "from-[#0F2A47] via-[#1E3B66] to-[#F0C419]",
    href: "/avenir",
    stats: [
      { value: "80+", label: "Joueurs" },
      { value: "2", label: "Disciplines" },
      { value: "5", label: "Catégories" },
    ],
  },
];

const GROUP_STATS = [
  { value: "3", label: "Entités" },
  { value: "270+", label: "Joueurs formés" },
  { value: "12", label: "Catégories" },
  { value: "10", label: "Années d'excellence" },
];

const VALUES = [
  {
    icon: Target,
    title: "Excellence",
    description:
      "La recherche constante du haut niveau dans la formation technique et tactique.",
  },
  {
    icon: Users,
    title: "Famille",
    description:
      "Un esprit collectif qui unit joueurs, entraîneurs, parents et supporters.",
  },
  {
    icon: Heart,
    title: "Passion",
    description:
      "L'amour du football, le respect de l'adversaire, la joie de jouer.",
  },
  {
    icon: Shield,
    title: "Discipline",
    description:
      "Le sérieux, la ponctualité et le respect sur le terrain comme à l'école.",
  },
];

export default function GroupHomePage() {
  return (
    <div className="flex flex-col bg-white">
      {/* 1. HERO */}
      <section className="relative overflow-hidden bg-foreground text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero1.jpg"
            alt="Groupe Sportif ARV Tataouine"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/95 via-foreground/80 to-foreground/55" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
            Groupe Sportif — Tataouine, Tunisie
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl">
            Un projet.
            <br />
            Trois équipes.
            <br />
            <span className="text-gold">Une même passion.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
            Depuis 2016, le Groupe Sportif ARV Tataouine forme les jeunes
            talents du sud tunisien. Aujourd&apos;hui, trois entités portent la
            même vision : l&apos;excellence sportive, l&apos;éducation et la
            passion du football.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#entities"
              className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-bold text-foreground shadow-lg transition-all hover:scale-[1.02] hover:bg-white/90"
            >
              Découvrir nos équipes
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/valladolid/contact"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition-all hover:bg-white/20"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      {/* 2. MANIFESTO */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
            Notre vision
          </p>
          <h2 className="mt-4 text-3xl font-black leading-tight text-foreground sm:text-4xl lg:text-5xl">
            Former des champions,
            <br />
            <span className="text-primary">sur et en dehors du terrain.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Le Groupe Sportif ARV Tataouine n&apos;est pas qu&apos;un club de
            football. C&apos;est un projet éducatif, social et sportif qui
            accompagne les jeunes de Tataouine dans leur développement personnel
            et sportif. À travers nos trois entités, nous couvrons le football
            masculin, le football féminin et le futsal, offrant à chaque jeune
            une place pour grandir.
          </p>
        </div>
      </section>

      {/* 3. ENTITÉS */}
      <section
        id="entities"
        className="border-y border-border bg-secondary/30 py-16 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
              Nos entités
            </p>
            <h2 className="mt-4 text-3xl font-black text-foreground sm:text-4xl lg:text-5xl">
              Trois équipes, une famille
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {ENTITIES.map((entity) => (
              <Link
                key={entity.id}
                href={entity.href}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className={`relative flex aspect-[4/3] items-end bg-gradient-to-br p-6 ${entity.gradient}`}
                >
                  <div className="relative z-10">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">
                      {entity.subtitle}
                    </p>
                    <h3 className="mt-1 text-2xl font-black text-white sm:text-3xl">
                      {entity.name}
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
            ))}
          </div>
        </div>
      </section>

      {/* 4. STATS GROUPE */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
              Le groupe en chiffres
            </p>
            <h2 className="mt-4 text-3xl font-black text-foreground sm:text-4xl">
              Une échelle qui grandit
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {GROUP_STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border bg-white p-6 text-center"
              >
                <p className="text-4xl font-black tabular-nums text-foreground lg:text-5xl">
                  {s.value}
                </p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. VALEURS */}
      <section className="border-y border-border bg-foreground py-16 text-white lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
              Nos valeurs
            </p>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl lg:text-5xl">
              Les 4 piliers du groupe
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                    <Icon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-white">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-black text-foreground sm:text-4xl lg:text-5xl">
            Rejoignez la famille
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Que vous soyez un jeune joueur, une jeune joueuse, un parent ou un
            partenaire potentiel — il y a une place pour vous dans notre groupe.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/valladolid/inscription"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-bold text-white shadow-lg shadow-accent/20 transition-all hover:scale-[1.02] hover:bg-accent/90"
            >
              Inscrire mon enfant
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/valladolid/contact"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-6 py-3 text-sm font-bold text-foreground transition-colors hover:border-foreground/30 hover:bg-secondary/50"
            >
              Devenir partenaire
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}