import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Heart, Users, Trophy, Sparkles, Shield } from "lucide-react";
import { PartnersStrip } from "@/components/sections/partners-strip";
import { FeaturedProductsSection } from "@/components/sections/featured-products";
import { FeaturedVideosSection } from "@/components/sections/featured-videos";
import { NewsSection } from "@/components/sections/news-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";

export const metadata: Metadata = {
  title: "Ennour Sportif Tataouine — Football féminin",
  description:
    "La section féminine du Groupe Sportif ARV Tataouine. Formation, accompagnement et célébration du football féminin dans le sud tunisien.",
};

const STATS = [
  { icon: Users, value: "40+", label: "Joueuses" },
  { icon: Trophy, value: "3", label: "Catégories" },
  { icon: Heart, value: "1", label: "Équipe" },
];

const VALUES = [
  {
    icon: Sparkles,
    title: "Excellence sportive",
    description:
      "Même niveau d'exigence technique et tactique que les équipes masculines.",
  },
  {
    icon: Heart,
    title: "Épanouissement",
    description:
      "Un cadre bienveillant où chaque joueuse peut grandir à son rythme.",
  },
  {
    icon: Users,
    title: "Solidarité",
    description:
      "L'esprit d'équipe et la sororité au cœur de chaque entraînement.",
  },
  {
    icon: Shield,
    title: "Combativité",
    description:
      "Apprendre à se dépasser, sur et en dehors du terrain.",
  },
];

const GALLERY = [
  { id: "g1", label: "Entraînement collectif", span: "col-span-2 row-span-2" },
  { id: "g2", label: "Match officiel", span: "col-span-2" },
  { id: "g3", label: "Échauffement", span: "" },
  { id: "g4", label: "Célébration", span: "" },
  { id: "g5", label: "Esprit d'équipe", span: "col-span-2" },
  { id: "g6", label: "Coulisses", span: "col-span-2" },
];

export default function EnnourPage() {
  return (
    <div className="flex flex-col bg-white">
      {/* 1. HERO */}
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7A1F2B] via-[#5C1620] to-[#141414]" />
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
              href="/inscription"
              className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-bold text-[#7A1F2B] shadow-lg transition-all hover:scale-[1.02] hover:bg-white/90"
            >
              Inscrire ma fille
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
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#7A1F2B]">
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

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {STATS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="rounded-2xl border border-border bg-white p-6 text-center"
                >
                  <Icon className="mx-auto h-6 w-6 text-[#7A1F2B]" />
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
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#7A1F2B]">
              Nos valeurs
            </p>
            <h2 className="mt-4 text-3xl font-black text-foreground sm:text-4xl lg:text-5xl">
              Les 4 piliers d&apos;Ennour
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#7A1F2B]/10">
                    <Icon className="h-6 w-6 text-[#7A1F2B]" />
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
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#7A1F2B]">
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
                className={`group relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-[#7A1F2B] to-[#141414] ${item.span}`}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <Heart className="h-12 w-12 text-white" />
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

      {/* 6. BOUTIQUE (filtered — empty state for now) */}
      <section id="boutique">
        <FeaturedProductsSection team="ennour" />
      </section>

      {/* 7. TV (filtered — empty state for now) */}
      <section id="tv">
        <FeaturedVideosSection team="ennour" />
      </section>

      {/* 8. ACTUALITÉS (filtered — empty state for now) */}
      <section id="news">
        <NewsSection team="ennour" />
      </section>

      {/* 9. NEWSLETTER */}
      <NewsletterSection />

      {/* 10. CTA FINAL */}
      <section className="bg-gradient-to-br from-[#7A1F2B] via-[#5C1620] to-[#141414] py-16 text-white lg:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-black sm:text-4xl lg:text-5xl">
            Rejoignez Ennour Sportif
          </h2>
          <p className="mt-4 text-white/85 sm:text-lg">
            Vous êtes une jeune joueuse ou un parent ? Contactez-nous pour
            découvrir nos programmes et venir essayer.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/inscription"
              className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-bold text-[#7A1F2B] shadow-lg transition-all hover:scale-[1.02] hover:bg-white/90"
            >
              Inscrire ma fille
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

