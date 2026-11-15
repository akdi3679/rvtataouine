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

export const metadata: Metadata = {
  title: "Ennour Sportif Tataouine — Football féminin",
  description:
    "La section féminine du Groupe Sportif ARV Tataouine. Formation, accompagnement et célébration du football féminin dans le sud tunisien.",
};

export default function EnnourPage() {
  const t = TEAMS.ennour;
  const m = t.content.mission!;
  const stats = t.content.stats!;
  const values = t.content.values!;
  const gallery = t.content.gallery!;
  const cta = t.content.cta!;

  return (
    <div className="flex flex-col bg-white">
      <HeroCarousel team="ennour" />

      {/* Mission + stats */}
      <section id="mission" className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <p className={`text-[10px] font-bold uppercase tracking-[0.3em] ${t.textClass}`}>
            {m.kicker}
          </p>
          <h2 className="mt-4 text-3xl font-black leading-tight text-foreground sm:text-4xl lg:text-5xl">
            {m.title}
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {m.paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-foreground">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-white p-6 text-center">
                <TeamIcon name={s.icon} className="mx-auto h-6 w-6" style={{ color: t.hex }} />
                <p className="mt-3 text-3xl font-black tabular-nums text-foreground">{s.value}</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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

      {/* Gallery */}
      <section id="gallery" className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className={`text-[10px] font-bold uppercase tracking-[0.3em] ${t.textClass}`}>
              {t.content.galleryKicker}
            </p>
            <h2 className="mt-4 text-3xl font-black text-foreground sm:text-4xl">
              {t.content.galleryTitle}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{t.content.gallerySubtitle}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {gallery.map((item) => (
              <div
                key={item.id}
                className={`group relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br ${t.heroGradient} ${item.span}`}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <TeamIcon name={t.content.galleryIcon ?? "star"} className="h-12 w-12 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-xs font-semibold text-white sm:text-sm">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PartnersStrip />

      <section id="boutique"><FeaturedProductsSection team="ennour" /></section>
      <section id="tv"><FeaturedVideosSection team="ennour" /></section>
      <section id="news"><NewsSection team="ennour" /></section>

      <NewsletterSection />

      {/* CTA */}
      <section className={`bg-gradient-to-br ${t.heroGradient} py-16 text-white lg:py-24`}>
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-black sm:text-4xl lg:text-5xl">{cta.title}</h2>
          <p className="mt-4 text-white/85 sm:text-lg">{cta.paragraph}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/inscription"
              className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-bold shadow-lg transition-all hover:scale-[1.02] hover:bg-white/90"
              style={{ color: t.hex }}
            >
              {cta.buttonLabel}
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