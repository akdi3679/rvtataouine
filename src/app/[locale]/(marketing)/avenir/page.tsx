import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap, Users, Trophy, Target, Shield, Flame } from "lucide-react";
import { PartnersStrip } from "@/components/sections/partners-strip";
import { FeaturedProductsSection } from "@/components/sections/featured-products";
import { FeaturedVideosSection } from "@/components/sections/featured-videos";
import { NewsSection } from "@/components/sections/news-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";

export const metadata: Metadata = {
  title: "Avenir Sportif Tataouine — Football & Futsal",
  description:
    "La section football à 11 et futsal du Groupe Sportif ARV Tataouine. Formation polyvalente pour les joueurs du sud tunisien.",
};

const STATS = [
  { icon: Users, value: "80+", label: "Joueurs" },
  { icon: Zap, value: "2", label: "Disciplines" },
  { icon: Trophy, value: "5", label: "Catégories" },
];

const VALUES = [
  {
    icon: Target,
    title: "Polyvalence",
    description:
      "Football à 11 et futsal pour former des joueurs complets et adaptables.",
  },
  {
    icon: Zap,
    title: "Technique individuelle",
    description:
      "Le futsal affine le contrôle, la rapidité d'exécution et le dribble.",
  },
  {
    icon: Flame,
    title: "Intelligence tactique",
    description:
      "Lire le jeu, prendre la bonne décision, anticiper sous pression.",
  },
  {
    icon: Shield,
    title: "Discipline",
    description:
      "Rigueur, ponctualité et sérieux dans les deux disciplines.",
  },
];

const GALLERY = [
  { id: "g1", label: "Match de football", span: "col-span-2 row-span-2" },
  { id: "g2", label: "Futsal en action", span: "col-span-2" },
  { id: "g3", label: "Entraînement", span: "" },
  { id: "g4", label: "Victoire", span: "" },
  { id: "g5", label: "Esprit collectif", span: "col-span-2" },
  { id: "g6", label: "Coulisses", span: "col-span-2" },
];

export default function AvenirPage() {
  return (
    <div className="flex flex-col bg-white">
      {/* 1. HERO */}
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F2A47] via-[#1E3B66] to-[#0F2A47]" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#F0C419]">
            Football &amp; Futsal · Tataouine
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl">
            Avenir Sportif
            <span className="block text-white/85">Tataouine</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
            L&apos;avenir du football, sur et en dehors du terrain. Football à
            11, futsal, formation polyvalente — nous préparons les joueurs de
            demain avec ambition et discipline.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/inscription"
              className="inline-flex items-center gap-2 rounded-md bg-[#F0C419] px-6 py-3 text-sm font-bold text-[#0F2A47] shadow-lg transition-all hover:scale-[1.02] hover:bg-[#F0C419]/90"
            >
              Inscrire mon enfant
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

      {/* 2. MISSION */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0F2A47]">
            Notre mission
          </p>
          <h2 className="mt-4 text-3xl font-black leading-tight text-foreground sm:text-4xl lg:text-5xl">
            Former des joueurs complets
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <p className="text-base leading-relaxed text-foreground">
              Avenir Sportif Tataouine est la section football à 11 et futsal
              du groupe. Elle complète l&apos;offre sportive en proposant aux
              joueurs une formation polyvalente, adaptée aux différentes
              disciplines du football moderne.
            </p>
            <p className="text-base leading-relaxed text-foreground">
              Le futsal apporte une technique individuelle affinée, une
              lecture de jeu rapide et une intelligence tactique que le
              football à 11 valorise. Nos joueurs bénéficient du meilleur des
              deux mondes.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {STATS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="rounded-2xl border border-border bg-white p-6 text-center"
                >
                  <Icon className="mx-auto h-6 w-6 text-[#0F2A47]" />
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

      {/* 3. VALEURS */}
      <section className="border-y border-border bg-secondary/30 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0F2A47]">
              Nos valeurs
            </p>
            <h2 className="mt-4 text-3xl font-black text-foreground sm:text-4xl lg:text-5xl">
              Les 4 piliers d&apos;Avenir
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F2A47]/10">
                    <Icon className="h-6 w-6 text-[#0F2A47]" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-foreground">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. GALERIE */}
      <section id="gallery" className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0F2A47]">
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
                className={`group relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-[#0F2A47] via-[#1E3B66] to-[#F0C419] ${item.span}`}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <Zap className="h-12 w-12 text-white" />
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

      {/* 5. PARTNERS */}
      <PartnersStrip />

      {/* 6. BOUTIQUE */}
      <section id="boutique">
        <FeaturedProductsSection team="avenir" />
      </section>

      {/* 7. TV */}
      <section id="tv">
        <FeaturedVideosSection team="avenir" />
      </section>

      {/* 8. ACTUALITÉS */}
      <section id="news">
        <NewsSection team="avenir" />
      </section>

      {/* 9. NEWSLETTER */}
      <NewsletterSection />

      {/* 10. CTA FINAL */}
      <section className="bg-gradient-to-br from-[#0F2A47] via-[#1E3B66] to-[#0F2A47] py-16 text-white lg:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-black sm:text-4xl lg:text-5xl">
            Rejoignez Avenir Sportif
          </h2>
          <p className="mt-4 text-white/85 sm:text-lg">
            Football à 11 ou futsal — nos portes sont ouvertes à tous les
            joueurs motivés, quel que soit leur niveau de départ.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/inscription"
              className="inline-flex items-center gap-2 rounded-md bg-[#F0C419] px-6 py-3 text-sm font-bold text-[#0F2A47] shadow-lg transition-all hover:scale-[1.02] hover:bg-[#F0C419]/90"
            >
              Inscrire mon enfant
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition-all hover:bg-white/20"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}