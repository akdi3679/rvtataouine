import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Target,
  Users,
  Heart,
  Shield,
  MapPin,
  Dumbbell,
  Video,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Notre Club | ARV Tataouine",
  description:
    "Découvrez l'histoire, la philosophie, le stade et les installations de l'Académie Real Valladolid Tataouine.",
};

const PHILOSOPHY = [
  {
    number: "01",
    icon: Target,
    title: "Excellence technique",
    description:
      "Maîtrise du ballon, précision des gestes et intelligence de jeu.",
  },
  {
    number: "02",
    icon: Users,
    title: "Esprit d'équipe",
    description:
      "Le collectif prime sur l'individuel. Apprendre à jouer ensemble.",
  },
  {
    number: "03",
    icon: Heart,
    title: "Passion et respect",
    description:
      "Respect des entraîneurs, des arbitres, des adversaires et du jeu.",
  },
  {
    number: "04",
    icon: Shield,
    title: "Discipline",
    description:
      "Ponctualité, effort constant et sérieux sur le terrain comme à l'école.",
  },
];

const INSTALLATIONS = [
  {
    icon: MapPin,
    title: "Terrain principal",
    description:
      "Surface synthétique moderne pour entraînements et matchs.",
    features: ["Surface stable", "Éclairage adapté"],
  },
  {
    icon: Dumbbell,
    title: "Préparation physique",
    description:
      "Espace dédié au renforcement, à la mobilité et à la récupération.",
    features: ["Travail physique", "Prévention blessures"],
  },
  {
    icon: Video,
    title: "Analyse vidéo",
    description:
      "Outils vidéo pour comprendre le jeu et corriger les détails.",
    features: ["Feedback individuel", "Analyse collective"],
  },
];

export default function ClubPage() {
  return (
    <div className="flex flex-col bg-white">
      {/* 1 ─ Hero : texte gauche + image droite */}
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
                Notre club
              </p>
              <h1 className="mt-3 text-4xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Une académie,
                <span className="block text-primary">une famille</span>
              </h1>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                Fondée en 2016, l&apos;Académie Real Valladolid Tataouine forme
                les jeunes talents du sud tunisien avec une méthodologie
                espagnole et un encadrement professionnel.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/inscription"
                  className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-accent/20 transition-all hover:bg-accent/90 hover:shadow-lg"
                >
                  Inscrire mon enfant
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-foreground/30 hover:bg-secondary/50"
                >
                  Visiter le club
                </Link>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
            <Image
  src="/images/academy/club.jpg"
  alt="L'Académie Real Valladolid Tataouine"
  width={800}
  height={1000}
  sizes="(max-width: 1024px) 100vw, 50vw"
  className="h-auto w-full max-w-[520px]"
  priority
/>
            </div>
          </div>
        </div>
      </section>

      {/* 2 ─ Histoire */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
            Notre histoire
          </p>

          <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <span className="text-6xl font-black tracking-tighter text-foreground sm:text-7xl lg:text-8xl">
              2016
            </span>
            <span className="text-2xl font-light text-muted-foreground sm:text-3xl lg:text-4xl">
              →
            </span>
            <span className="text-6xl font-black tracking-tighter text-foreground sm:text-7xl lg:text-8xl">
              2026
            </span>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 md:gap-10">
            <p className="text-base leading-relaxed text-foreground">
              Une passion née à Tataouine. Fondée en 2016 par des passionnés de
              football, l&apos;académie est née d&apos;une vision : apporter
              l&apos;excellence du football européen au sud de la Tunisie.
            </p>
            <p className="text-base leading-relaxed text-foreground">
              Grâce à notre partenariat officiel avec le Real Valladolid CF,
              nous intégrons une méthodologie structurée tout en valorisant le
              talent local. Aujourd&apos;hui, nous accompagnons des jeunes
              joueurs dans leur progression sportive, éducative et humaine.
            </p>
          </div>
        </div>
      </section>

      {/* 3 ─ Philosophie */}
      <section className="border-y border-border/60 bg-secondary/20 py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
              Notre philosophie
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              Les 4 piliers de la formation
            </h2>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PHILOSOPHY.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title}>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      {p.number}
                    </span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <Icon className="mt-6 h-7 w-7 text-primary" />
                  <h3 className="mt-4 text-base font-bold text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4 ─ Notre stade */}
      <section className="border-t border-border/60 py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
                Notre stade
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                Un lieu pour apprendre,
                <span className="block text-primary">progresser et gagner</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Notre stade est le cœur de l&apos;académie. C&apos;est là que
                les joueurs développent leur technique, leur discipline et leur
                esprit d&apos;équipe dans un cadre sécurisé et professionnel.
              </p>
            </div>

                       <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <div className="rounded-2xl border border-border bg-white p-3 text-center sm:p-5">
                <p className="text-2xl font-black tabular-nums text-foreground sm:text-3xl">
                  150+
                </p>
                <p className="mt-2 break-words text-[8px] font-semibold uppercase leading-tight tracking-normal text-muted-foreground sm:text-[10px] sm:tracking-wider">
                  Jeunes accueillis
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-white p-3 text-center sm:p-5">
                <p className="text-2xl font-black tabular-nums text-foreground sm:text-3xl">
                  4
                </p>
                <p className="mt-2 break-words text-[8px] font-semibold uppercase leading-tight tracking-normal text-muted-foreground sm:text-[10px] sm:tracking-wider">
                  Catégories
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-white p-3 text-center sm:p-5">
                <p className="text-2xl font-black tabular-nums text-foreground sm:text-3xl">
                  6j/7
                </p>
                <p className="mt-2 break-words text-[8px] font-semibold uppercase leading-tight tracking-normal text-muted-foreground sm:text-[10px] sm:tracking-wider">
                  Activité
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 ─ Installations */}
      <section className="border-t border-border/60 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
              Nos installations
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              Des équipements pour progresser
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {INSTALLATIONS.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="rounded-2xl border border-border bg-white p-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-foreground">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {f.description}
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {f.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-center gap-2 text-xs text-foreground"
                      >
                        <span className="h-1 w-1 rounded-full bg-accent" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}