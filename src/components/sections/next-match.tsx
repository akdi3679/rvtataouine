"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";
import {
  getNextMatch,
  recentMatches,
  upcomingMatches,
  type Match,
} from "@/data/matches";

function teamInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function shortDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
}

function useNow(intervalMs = 1000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}

/* ─── Countdown — 4 units, centered ─────────────── */
function Countdown({
  targetDate,
  targetTime,
}: {
  targetDate: string;
  targetTime: string;
}) {
  const now = useNow(1000);
  const target = new Date(`${targetDate}T${targetTime}:00`).getTime();
  const diff = Math.max(0, target - now);

  if (diff <= 0) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-bold text-white">
        <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
        Match en cours
      </div>
    );
  }

  const units = [
    { value: Math.floor(diff / 86_400_000), label: "Jours" },
    { value: Math.floor((diff / 3_600_000) % 24), label: "Heures" },
    { value: Math.floor((diff / 60_000) % 60), label: "Min" },
    { value: Math.floor((diff / 1_000) % 60), label: "Sec" },
  ];

  return (
    <div className="flex items-end justify-center gap-1.5 sm:gap-3">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-end">
          <div className="flex flex-col items-center leading-none">
            <span className="text-2xl sm:text-4xl font-black tabular-nums text-primary">
              {String(u.value).padStart(2, "0")}
            </span>
            <span className="mt-1.5 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              {u.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="mx-1 sm:mx-1.5 mb-4 sm:mb-6 text-lg sm:text-2xl font-black text-primary/25">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Card ───────────────────────────────────────── */
function MatchCard({ match, isNext }: { match: Match; isNext: boolean }) {
  const isFinished = match.status === "finished";

  return (
    <Link
      href="/matchs"
      data-card-index
      className={`group relative flex-shrink-0 w-[240px] snap-center rounded-xl bg-white overflow-hidden flex flex-col transition-all ${
  isNext
    ? "border-2 border-accent shadow-lg shadow-accent/30"
    : "border border-border shadow-sm hover:shadow-md hover:border-primary/30"
}`}
    >
      {/* Next-match badge — flush top strip, red */}
      {isNext && (
  <div className="relative flex justify-center -mt-px">
    <svg width="160" height="16" viewBox="0 0 160 16" aria-hidden="true">
      <path
        d="M 30 0 L 130 0 Q 134 0 132 3 L 127 13 Q 125 16 121 16 L 39 16 Q 35 16 33 13 L 28 3 Q 26 0 30 0 Z"
        className="fill-accent"
      />
    </svg>
    <span className="absolute inset-0 flex items-center justify-center text-[8px] font-black uppercase tracking-wider text-white">
      Prochain match
    </span>
  </div>
)}

      <div className="flex flex-1 flex-col p-3">
        {/* Competition · category — violet title */}
        <p className="text-center text-[9px] font-bold uppercase tracking-wider text-primary truncate">
          {match.competition} · {match.category}
        </p>

        {/* Emblems + middle info */}
        <div className="mt-3 flex items-center justify-between gap-1">
          {/* Home */}
          <div className="flex flex-1 flex-col items-center gap-1.5 min-w-0">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full text-xs font-black transition-colors ${
                isNext
                  ? "bg-accent text-white"
                  : "bg-primary/10 text-primary group-hover:bg-primary/15"
              }`}
            >
              {teamInitials(match.homeTeam.name)}
            </div>
            <p className="line-clamp-2 text-center text-[10px] font-semibold leading-tight text-foreground">
              {match.homeTeam.name}
            </p>
          </div>

          {/* Center: score or time + date */}
          <div className="flex-shrink-0 px-1 text-center min-w-[60px]">
            {isFinished ? (
              <>
                <div className="text-2xl font-black tabular-nums leading-none text-foreground">
                  {match.homeTeam.score ?? 0}
                  <span className="mx-0.5 text-muted-foreground/40">:</span>
                  {match.awayTeam.score ?? 0}
                </div>
                <div className="mt-1.5 text-[9px] font-semibold capitalize text-muted-foreground whitespace-nowrap">
                  {shortDate(match.date)} · {match.time}
                </div>
              </>
            ) : (
              <>
                <div
                  className={`text-xl font-black tabular-nums leading-none ${
                    isNext ? "text-accent" : "text-foreground"
                  }`}
                >
                  {match.time}
                </div>
                <div className="mt-1.5 text-[9px] font-semibold capitalize text-muted-foreground whitespace-nowrap">
                  {shortDate(match.date)}
                </div>
              </>
            )}
          </div>

          {/* Away */}
          <div className="flex flex-1 flex-col items-center gap-1.5 min-w-0">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full text-xs font-black transition-colors ${
                isNext
                  ? "bg-accent text-white"
                  : "bg-primary/10 text-primary group-hover:bg-primary/15"
              }`}
            >
              {teamInitials(match.awayTeam.name)}
            </div>
            <p className="line-clamp-2 text-center text-[10px] font-semibold leading-tight text-foreground">
              {match.awayTeam.name}
            </p>
          </div>
        </div>

        {/* Stadium */}
        <div className="mt-3 flex items-center justify-center gap-1 border-t border-border pt-2.5 text-[9px] text-muted-foreground">
          <MapPin className="h-2.5 w-2.5 flex-shrink-0" />
          <span className="truncate">{match.location}</span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Section ────────────────────────────────────── */
export function NextMatchSection() {
  const nextMatch = getNextMatch();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const pastThree = [...recentMatches]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)
    .reverse();

  const nextFour = [...upcomingMatches]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 4);

  const allMatches = [...pastThree, ...nextFour];
  const centerScrollLeft = (el: HTMLDivElement, card: HTMLElement) =>
    card.offsetLeft - (el.clientWidth - card.clientWidth) / 2;
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
    if (!el || !nextMatch) return;

    const cards = Array.from(
      el.querySelectorAll<HTMLElement>("[data-card-index]"),
    );
    const targetIdx = allMatches.findIndex((m) => m.id === nextMatch.id);
    const target = cards[targetIdx];
       if (target) {
      el.scrollLeft = Math.max(0, centerScrollLeft(el, target));
    }
    requestAnimationFrame(() => updateIndicators());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollBy = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction * el.clientWidth * 0.8,
      behavior: "smooth",
    });
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

  if (!nextMatch) return null;

  return (
    <section className="relative overflow-hidden bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, rgba(94,45,145,0.04) 0, rgba(94,45,145,0.04) 1px, transparent 1px, transparent 22px),
            repeating-linear-gradient(-45deg, rgba(94,45,145,0.03) 0, rgba(94,45,145,0.03) 1px, transparent 1px, transparent 22px)
          `,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-8 lg:py-10">
        {/* Heading + timer centered · button top-right (md+) */}
        <div className="relative mb-6">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-xs font-medium uppercase tracking-widest text-foreground">
              Prochain match
            </h2>
            <div className="mt-2">
              <Countdown
                targetDate={nextMatch.date}
                targetTime={nextMatch.time}
              />
            </div>
          </div>

          <Link
            href="/matchs"
            className="absolute top-0 right-0 hidden md:inline-flex items-center gap-2 rounded-lg border border-primary px-4 py-2 text-xs font-semibold text-primary hover:bg-primary hover:text-white transition-colors shrink-0"
          >
            Calendrier
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div
            className={`pointer-events-none absolute inset-y-0 left-0 w-10 z-10 bg-gradient-to-r from-white to-transparent transition-opacity ${
              canLeft ? "opacity-100" : "opacity-0"
            }`}
          />
          <div
            className={`pointer-events-none absolute inset-y-0 right-0 w-10 z-10 bg-gradient-to-l from-white to-transparent transition-opacity ${
              canRight ? "opacity-100" : "opacity-0"
            }`}
          />

          <div
            ref={scrollerRef}
            onScroll={updateIndicators}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-5"
          >
            {allMatches.map((m) => (
              <MatchCard key={m.id} match={m} isNext={m.id === nextMatch.id} />
            ))}
          </div>
        </div>

        {/* Indicator row — arrows + morphing dots */}
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            onClick={() => scrollBy(-1)}
            disabled={!canLeft}
            className={`flex h-8 w-8 items-center justify-center  bg-white text-gray transition-all ${
              canLeft ? " hover:text-gray" : "opacity-30 cursor-not-allowed"
            }`}
            aria-label="Matchs précédents"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-1.5">
            {allMatches.map((m, i) => {
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
                  key={m.id}
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Aller au match ${i + 1}`}
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
            className={`flex h-8 w-8 items-center justify-center  bg-white text-gray transition-all ${
              canRight ? " hover:text-gray" : "opacity-30 cursor-not-allowed"
            }`}
            aria-label="Matchs suivants"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile-only bottom button */}
        <div className="mt-5 flex justify-center md:hidden">
          <Link
            href="/matchs"
            className="inline-flex items-center gap-2 rounded-lg border border-primary px-6 py-2.5 text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-colors"
          >
            Voir le calendrier
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}