import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Heart, Users, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "Ennour Sportif Tataouine — Football féminin",
  description:
    "La section féminine du Groupe Sportif ARV Tataouine. Formation, accompagnement et célébration du football féminin dans le sud tunisien.",
};

// Thème bordeaux / noir — override les CSS variables du site
const THEME = {
  "--color-primary": "345 65% 32%",        // bordeaux #7A1F2B
  "--color-primary-dark": "345 65% 20%",
  "--color-primary-light": "345 65% 45%",
  "--color-accent": "0 0% 10%",            // noir #1A1A1A
  "--color-accent-dark": "0 0% 0%",
  "--color-accent-light": "0 0% 25%",
  "--color-gold": "345 55% 55%",           // bordeaux clair pour badges
} as React.CSSProperties;

const GALLERY = [
  { id: "g1", label: "Entraînement collectif", span: "col-span-2 row-span-2" },
  { id: "g2", label: "Match officiel", span: "col-span-2" },
  { id: "g3", label: "Échauffement", span: "" },
  { id: "g4", label: "Célébration", span: "" },
  { id: "g5", label: "Esprit d'équipe", span: "col-span-2" },
  { id: "g6", label: "Coulisses", span: "col-span-2" },
];

const NEWS = [
  {
    id: "n1",
    title: "Première victoire de la saison pour Ennour",
    excerpt:
      "Nos joueuses ont signé une victoire convaincante lors de leur premier match officiel de la saison.",
    category: "Match",
  },
  {
    id: "n2",
    title: "Nouvelle recrue au sein de l'équipe",
    excerpt:
      "Bienvenue à notre nouvelle joueuse qui rejoint l'effectif pour la saison en cours.",
    category: "Équipe",
  },
  {
    id: "n3",
    title: "Journée portes ouvertes pour les jeunes filles",
    excerpt:
      "Une journée dédiée à la découverte du football féminin. Toutes les jeunes filles de 8 à 17 ans sont invitées.",
    category: "Événement",
  },
];

export default function EnnourPage() {
  return (
    <div style={THEME} className="flex flex-col bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-accent opacity-95" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70">
            Football féminin · Tataouine
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl">
            Ennour Sportif
            <span className="block text-white/85">Tataouine</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
            La lumière du football féminin dans le sud tunisien. Nous formons,
            accompagnons et célébrons les jeunes filles qui font vivre le
            football au féminin.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-bold text-primary shadow-lg transition-all hover:scale-[1.02] hover:bg-white/90"
            >
              Rejoindre l&apos;équipe
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#gallery"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition-all hover:bg-white/20"
            >
              Voir la galerie
            </a>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
            Notre mission
          </p>
          <h2 className="mt-4 text-3xl font-black leading-tight text-foreground sm:text-4xl lg:text-5xl">
            Faire grandir le football féminin à Tataouine
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <p className="text-base leading-relaxed text-foreground">
              Ennour Sportif Tataouine est la section féminine du groupe.
              Fondée pour offrir aux jeunes filles de la région un cadre
              structuré pour pratiquer le football, elle incarne notre
              engagement pour l&apos;égalité des chances dans le sport.
            </p>
            <p className="text-base leading-relaxed text-foreground">
              Nos joueuses bénéficient du même encadrement professionnel, des
              mêmes installations et de la même exigence que les équipes
              masculines. Un projet ambitieux, porté par des entraîneuses
              passionnées et des familles engagées.
            </p>
          </div>

          {/* 3 stats */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Users, value: "40+", label: "Joueuses" },
              { icon: Trophy, value: "3", label: "Catégories" },
              { icon: Heart, value: "1", label: "Équipe" },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="rounded-2xl border border-border bg-white p-6 text-center"
                >
                  <Icon className="mx-auto h-6 w-6 text-primary" />
                  <p className="mt-3 text-3xl font-black tabular-nums text-foreground">
                    {s.value}
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="bg-secondary/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
              En images
            </p>
            <h2 className="mt-4 text-3xl font-black text-foreground sm:text-4xl">
              Galerie
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Les moments forts de la saison, en images
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {GALLERY.map((item) => (
              <div
                key={item.id}
                className={`relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-accent ${item.span}`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Heart className="h-12 w-12 text-white/30" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-xs font-semibold text-white sm:text-sm">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
              Actualités
            </p>
            <h2 className="mt-4 text-3xl font-black text-foreground sm:text-4xl">
              Les dernières nouvelles
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {NEWS.map((n) => (
              <div
                key={n.id}
                className="overflow-hidden rounded-2xl border border-border bg-white"
              >
                <div className="aspect-video bg-gradient-to-br from-primary to-accent" />
                <div className="p-6">
                  <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                    {n.category}
                  </span>
                  <h3 className="mt-3 text-base font-bold leading-tight text-foreground">
                    {n.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {n.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-white lg:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-black sm:text-4xl lg:text-5xl">
            Rejoignez Ennour Sportif
          </h2>
          <p className="mt-4 text-white/85 sm:text-lg">
            Vous êtes une jeune joueuse ou un parent ? Contactez-nous pour
            découvrir nos programmes et venir essayer.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-bold text-primary shadow-lg transition-all hover:scale-[1.02] hover:bg-white/90"
          >
            Nous contacter
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}