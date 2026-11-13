import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Users, Trophy, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Avenir Sportif Tataouine — Football & Futsal",
  description:
    "La section football à 11 et futsal du Groupe Sportif ARV Tataouine. Formation polyvalente pour les joueurs du sud tunisien.",
};

// Thème navy / bleu clair / jaune — override les CSS variables
const THEME = {
  "--color-primary": "210 65% 20%",        // navy #0F2A47
  "--color-primary-dark": "210 65% 12%",
  "--color-primary-light": "210 65% 32%",
  "--color-accent": "47 90% 52%",          // jaune #F0C419
  "--color-accent-dark": "47 90% 40%",
  "--color-accent-light": "47 90% 68%",
  "--color-info": "205 55% 55%",           // bleu clair
  "--color-gold": "47 90% 52%",            // jaune
} as React.CSSProperties;

const GALLERY = [
  { id: "g1", label: "Match de football", span: "col-span-2 row-span-2" },
  { id: "g2", label: "Futsal en action", span: "col-span-2" },
  { id: "g3", label: "Entraînement", span: "" },
  { id: "g4", label: "Victoire", span: "" },
  { id: "g5", label: "Esprit collectif", span: "col-span-2" },
  { id: "g6", label: "Coulisses", span: "col-span-2" },
];

const NEWS = [
  {
    id: "n1",
    title: "Un début de saison prometteur pour Avenir",
    excerpt:
      "Nos équipes football et futsal ont entamé la saison avec de belles performances.",
    category: "Match",
  },
  {
    id: "n2",
    title: "Nouveau programme futsal pour les U13",
    excerpt:
      "Un cycle de formation dédié au futsal débute ce mois-ci pour développer la technique individuelle.",
    category: "Formation",
  },
  {
    id: "n3",
    title: "Stage intensif pendant les vacances",
    excerpt:
      "Un stage de cinq jours ouvert à tous les joueurs du club, encadré par nos entraîneurs diplômés.",
    category: "Stage",
  },
];

export default function AvenirPage() {
  return (
    <div style={THEME} className="flex flex-col bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-accent/70 opacity-95" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
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
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-bold text-primary shadow-lg transition-all hover:scale-[1.02] hover:bg-accent/90"
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
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
            Notre mission
          </p>
          <h2 className="mt-4 text-3xl font-black leading-tight text-foreground sm:text-4xl lg:text-5xl">
            Former des joueurs complets
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <p className="text-base leading-relaxed text-foreground">
              Avenir Sportif Tataouine est la section football à 11 et futsal du
              groupe. Elle complète l&apos;offre sportive en proposant aux
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
            {[
              { icon: Users, value: "80+", label: "Joueurs" },
              { icon: Zap, value: "2", label: "Disciplines" },
              { icon: Trophy, value: "5", label: "Catégories" },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="rounded-2xl border border-border bg-white p-6 text-center"
                >
                  <Icon className="mx-auto h-6 w-6 text-accent" />
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
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
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
                className={`relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-light to-accent ${item.span}`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="h-12 w-12 text-white/30" />
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
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
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
                <div className="aspect-video bg-gradient-to-br from-primary via-primary-light to-accent" />
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
            Rejoignez Avenir Sportif
          </h2>
          <p className="mt-4 text-white/85 sm:text-lg">
            Football à 11 ou futsal — nos portes sont ouvertes à tous les
            joueurs motivés, quel que soit leur niveau de départ.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-bold text-primary shadow-lg transition-all hover:scale-[1.02] hover:bg-accent/90"
          >
            Nous contacter
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}