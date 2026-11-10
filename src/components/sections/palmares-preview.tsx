"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  ChevronLeft,
  ChevronRight,
  Medal,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";
import { seasons, totalTrophies } from "@/data/trophies";

type Honour = {
  title: string;
  count: number;
  categories: string;
  Icon: typeof Trophy;
  tintClass: string;
  iconClass: string;
};

function buildHonours(): Honour[] {
  const allTrophies = seasons.flatMap((s) => s.trophies);
  const groups: Record<string, { count: number; categories: Set<string> }> = {};

  for (const t of allTrophies) {
    let key: string;
    if (t.title.includes("Vice-Champion")) key = "Vice-Champion";
    else if (t.title.includes("Champion")) key = "Champion Régional";
    else if (t.title.includes("Tournoi") || t.title.includes("Coupe"))
      key = "Coupes & Tournois";
    else if (t.title.includes("Fair-Play")) key = "Fair-Play";
    else key = "Distinction";

    if (!groups[key]) groups[key] = { count: 0, categories: new Set() };
    groups[key].count++;
    if (t.category) groups[key].categories.add(t.category);
  }

  const meta: Record<
    string,
    { Icon: typeof Trophy; tint: string; icon: string }
  > = {
    "Champion Régional": {
      Icon: Trophy,
      tint: "bg-gold/15",
      icon: "text-gold-dark",
    },
    "Coupes & Tournois": {
      Icon: Award,
      tint: "bg-accent/10",
      icon: "text-accent",
    },
    "Vice-Champion": {
      Icon: Medal,
      tint: "bg-secondary",
      icon: "text-foreground",
    },
    "Fair-Play": {
      Icon: Star,
      tint: "bg-info/10",
      icon: "text-info",
    },
    Distinction: {
      Icon: Sparkles,
      tint: "bg-secondary",
      icon: "text-foreground",
    },
  };

  return Object.entries(groups).map(([title, g]) => {
    const m = meta[title] ?? meta.Distinction;
    return {
      title,
      count: g.count,
      categories: Array.from(g.categories).join(" · "),
      Icon: m.Icon,
      tintClass: m.tint,
      iconClass: m.icon,
    };
  });
}

function HonourCard({ honour }: { honour: Honour }) {
  const { Icon } = honour;
  return (
    <Link
      href="/palmares"
      data-card-index
      className="group flex w-[200px] flex-shrink-0 snap-center flex-col items-center rounded-xl border border-border bg-white p-5 text-center transition-all hover:border-accent/30 hover:shadow-md"
    >
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-full ${honour.tintClass} transition-transform duration-300 group-hover:scale-110`}
      >
        <Icon className={`h-8 w-8 ${honour.iconClass}`} />
      </div>
      <h3 className="mt-4 line-clamp-2 text-sm font-bold leading-tight text-foreground">
        {honour.title}
      </h3>
      <p className="mt-1 line-clamp-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {honour.categories || "Toutes catégories"}
      </p>
      <p className="mt-3 text-4xl font-black leading-none text-accent">
        {honour.count}
      </p>
    </Link>
  );
}

function EndCard() {
  return (
    <Link
      href="/palmares"
      data-card-index
      className="group flex w-[200px] flex-shrink-0 snap-center flex-col items-center justify-center gap-3 rounded-xl bg-gradient-to-br from-accent to-accent-dark p-5 text-center transition-all hover:from-accent/90"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur transition-colors group-hover:bg-white/25">
        <ArrowRight className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-sm font-bold leading-tight text-white">
        Voir tout le palmarès
      </h3>
      <p className="text-[10px] text-white/80">Toutes nos victoires</p>
    </Link>
  );
}

export function PalmaresPreviewSection() {
  const honours = buildHonours();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const totalCards = honours.length + 1;

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
    requestAnimationFrame(() => updateIndicators());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  if (honours.length === 0) return null;

  return (
    <section className="bg-white py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-foreground sm:text-3xl">
              Palmarès
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {totalTrophies} trophées depuis la création
            </p>
          </div>
          <Link
            href="/palmares"
            className="hidden shrink-0 items-center gap-2 rounded-md border border-accent px-4 py-2 text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-white sm:inline-flex"
          >
            Tout voir
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Carousel — full-bleed to container edges */}
        <div className="relative -mx-6 lg:-mx-8">
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
            {honours.map((honour) => (
              <HonourCard key={honour.title} honour={honour} />
            ))}
            <EndCard />
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            onClick={() => scrollBy(-1)}
            disabled={!canLeft}
            className={`flex h-8 w-8 items-center justify-center rounded-md  bg-white text-accent transition-all ${
              canLeft
                ? " hover:text-accent"
                : "cursor-not-allowed opacity-30"
            }`}
            aria-label="Palmarès précédent"
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
                  className="h-1.5 rounded-sm bg-accent transition-all duration-300 ease-out"
                  style={{ width, opacity }}
                />
              );
            })}
          </div>

          <button
            onClick={() => scrollBy(1)}
            disabled={!canRight}
            className={`flex h-8 w-8 items-center justify-center rounded-md  bg-white text-accent transition-all ${
              canRight
                ? " hover:text-accent"
                : "cursor-not-allowed opacity-30"
            }`}
            aria-label="Palmarès suivant"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile-only bottom button */}
        <div className="mt-5 flex justify-center sm:hidden">
          <Link
            href="/palmares"
            className="inline-flex items-center gap-2 rounded-md border border-accent px-6 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
          >
            Voir tout le palmarès
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}