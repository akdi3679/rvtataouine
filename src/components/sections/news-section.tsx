"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
} from "lucide-react";
import { articles, type Article } from "@/data/news";
import Image from "next/image";
const FILTERS = [
  { id: "all", label: "Tous" },
  { id: "match", label: "Compétition" },
  { id: "stage", label: "Stage" },
  { id: "academie", label: "Académie" },
  { id: "alumni", label: "Alumni" },
  { id: "conseil", label: "Conseil" },
] as const;

const GRADIENTS: Record<string, string> = {
  match: "from-accent/30 via-accent/15 to-primary/10",
  stage: "from-primary/30 via-primary/15 to-accent/10",
  academie: "from-info/30 via-info/15 to-primary/10",
  alumni: "from-warning/30 via-warning/15 to-primary/10",
  conseil: "from-success/30 via-success/15 to-primary/10",
};

function formatShortDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function FeaturedCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/actualites/${article.slug}`}
      className="group grid overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-lg md:grid-cols-2"
    >
     <div className="relative aspect-[16/9] md:aspect-auto md:min-h-[340px]">
  <Image
    src={article.image}
    alt={article.title}
    fill
    sizes="(max-width: 768px) 100vw, 50vw"
    className="object-cover"
    priority
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
  <span className="absolute left-4 top-4 inline-flex rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm">
    {article.categoryLabel}
  </span>
</div>

      <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          <span>{formatShortDate(article.publishedAt)}</span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {article.readTime} min
          </span>
        </div>

        <h3 className="mt-3 line-clamp-3 text-xl font-black leading-tight text-foreground transition-colors group-hover:text-primary md:text-2xl lg:text-3xl">
          {article.title}
        </h3>

        <p className="mt-3 line-clamp-2 text-sm text-muted-foreground md:text-base">
          {article.excerpt}
        </p>

        <div className="mt-6 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
            {article.author.initials}
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">
              {article.author.name}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {article.author.role}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

function SmallCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/actualites/${article.slug}`}
      data-card-index
      className="group flex w-[260px] flex-shrink-0 snap-center flex-col overflow-hidden rounded-xl border border-border bg-white transition-all hover:border-primary/30 hover:shadow-md"
    >
     <div className="relative aspect-[16/9]">
  <Image
    src={article.image}
    alt={article.title}
    fill
    sizes="260px"
    className="object-cover"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
  <span className="absolute left-2 top-2 inline-flex rounded-full bg-white/95 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary shadow-sm">
    {article.categoryLabel}
  </span>
</div>
      <div className="flex flex-1 flex-col p-3">
        <h3 className="line-clamp-2 text-sm font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-[11px] leading-snug text-muted-foreground">
          {article.excerpt}
        </p>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-2.5 text-[10px] text-muted-foreground">
          <span>{formatShortDate(article.publishedAt)}</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {article.readTime} min
          </span>
        </div>
      </div>
    </Link>
  );
}

function EndCard({ team }: { team?: string }) {
  return (
    <Link
      href={team ? `/actualites?team=${team}` : "/actualites"}
      data-card-index
      className="group flex w-[260px] flex-shrink-0 snap-center flex-col items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primary-dark p-6 text-center transition-all hover:from-primary/90"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur transition-colors group-hover:bg-white/25">
        <ArrowRight className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-base font-bold leading-tight text-white">
        Envie d'en voir plus ?
      </h3>
      <p className="text-xs text-white/80">
        Toutes les actualités de l'académie
      </p>
      <span className="mt-1 inline-flex items-center gap-1.5 rounded-md bg-white px-4 py-1.5 text-xs font-bold text-primary">
        Voir tout
        <ArrowRight className="h-3 w-3" />
      </span>
    </Link>
  );
}

export function NewsSection({ team }: { team?: string } = {}) {
  const [filter, setFilter] = useState<string>("all");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const filtered =
    filter === "all" ? articles : articles.filter((a) => a.category === filter);
  const featured = filtered[0];
  const rest = filtered.slice(1, 5);
  const totalCards = rest.length + 1;

  const updateIndicators = () => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const el = scrollerRef.current;
      if (!el) return;

      const maxScroll = el.scrollWidth - el.clientWidth;
      setCanLeft(el.scrollLeft > 4);
      setCanRight(el.scrollLeft < maxScroll - 4);

      const cards = Array.from(
        el.querySelectorAll<HTMLElement>("[data-card-index]"),
      );
      if (cards.length === 0) return;

      if (el.scrollLeft <= 4) {
        setActiveIndex(0);
        return;
      }
      if (el.scrollLeft >= maxScroll - 4) {
        setActiveIndex(cards.length - 1);
        return;
      }

      const viewportCenter = el.scrollLeft + el.clientWidth / 2;
      let closest = 0;
      let minDist = Infinity;
      cards.forEach((card, i) => {
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const dist = Math.abs(cardCenter - viewportCenter);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      setActiveIndex(closest);
    });
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollLeft = 0;
    setActiveIndex(0);
    requestAnimationFrame(() => updateIndicators());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const centerScrollLeft = (el: HTMLDivElement, card: HTMLElement) =>
    card.offsetLeft - (el.clientWidth - card.clientWidth) / 2;

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const scrollToIndex = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>("[data-card-index]");
    const card = cards[index];
    if (!card) return;
    el.scrollTo({
      left: Math.max(0, centerScrollLeft(el, card)),
      behavior: "smooth",
    });
  };

  if (!featured) return null;

  return (
    <section className="bg-white py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-foreground sm:text-3xl">
              Actualités
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Les dernières nouvelles de l'académie
            </p>
          </div>
          <Link
            href={team ? `/actualites?team=${team}` : "/actualites"}
            className="hidden shrink-0 items-center gap-2 rounded-md border border-primary px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-white sm:inline-flex"
          >
            Toutes les actualités
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Filter pills */}
        <div className="-mx-6 mb-6 overflow-x-auto scrollbar-hide px-6 lg:-mx-8 lg:px-8">
          <ul className="flex gap-1.5 whitespace-nowrap">
            {FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <li key={f.id}>
                  <button
                    onClick={() => setFilter(f.id)}
                    className={`inline-flex items-center rounded-md px-4 py-2 text-xs font-semibold transition-colors ${
                      active
                        ? "bg-primary text-white"
                        : "border border-border bg-transparent text-foreground hover:border-primary/30 hover:bg-primary/5"
                    }`}
                  >
                    {f.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Featured */}
        <FeaturedCard article={featured} />

        {/* Carousel + endcard — full-bleed to container edges */}
        {totalCards > 0 && (
          <div className="relative mt-6 -mx-6 lg:-mx-8">
            <div
              className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent transition-opacity ${
                canLeft ? "opacity-100" : "opacity-0"
              }`}
            />
            <div
              className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent transition-opacity ${
                canRight ? "opacity-100" : "opacity-0"
              }`}
            />

            <div
              ref={scrollerRef}
              onScroll={updateIndicators}
              className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-6 lg:px-8 py-2"
            >
              {rest.map((article) => (
                <SmallCard key={article.slug} article={article} />
              ))}
              <EndCard team={team} />
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            onClick={() => scrollBy(-1)}
            disabled={!canLeft}
            className={`flex h-8 w-8 items-center justify-center rounded-md  bg-white text-primary transition-all ${
              canLeft
                ? "hover:text-gray"
                : "cursor-not-allowed opacity-30"
            }`}
            aria-label="Actualités précédentes"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalCards }).map((_, i) => {
              const distance = Math.abs(i - activeIndex);
              let width = "0.375rem";
              let opacity = 0.2;
              if (distance === 0) {
                width = "1.5rem";
                opacity = 1;
              } else if (distance === 1) {
                width = "0.75rem";
                opacity = 1;
              } else if (distance === 2) {
                width = "0.5rem";
                opacity = 0.5;
              }
              return (
                <button
                  key={i}
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Aller à la carte ${i + 1}`}
                  aria-current={i === activeIndex}
                  className="h-1.5 rounded-sm bg-primary transition-all duration-300 ease-out"
                  style={{ width, opacity }}
                />
              );
            })}
          </div>

          <button
            onClick={() => scrollBy(1)}
            disabled={!canRight}
            className={`flex h-8 w-8 items-center justify-center rounded-md  bg-white text-primary transition-all ${
              canRight
                ? " hover:text-gray"
                : "cursor-not-allowed opacity-30"
            }`}
            aria-label="Actualités suivantes"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile-only bottom button */}
        <div className="mt-5 flex justify-center sm:hidden">
          <Link
            href={team ? `/actualites?team=${team}` : "/actualites"}
            className="inline-flex items-center gap-2 rounded-md border border-primary px-6 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            Toutes les actualités
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}