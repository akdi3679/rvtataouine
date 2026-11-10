"use client";

import { useEffect, useRef, useState } from "react";
import { Trophy, Award, Medal, Star, Sparkles } from "lucide-react";
import type { Season, Trophy as TrophyType } from "@/data/trophies";
import Image from "next/image";
function getTrophyIcon(title: string) {
  if (title.includes("Champion")) return Trophy;
  if (title.includes("Tournoi") || title.includes("Coupe")) return Award;
  if (title.includes("Vice")) return Medal;
  if (title.includes("Fair-Play")) return Star;
  return Sparkles;
}

interface TimelineProps {
  seasons: Season[];
}

export function Timeline({ seasons }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.max(
        0,
        Math.min(1, (vh * 0.7 - rect.top) / (rect.height + vh * 0.4)),
      );
      setLineProgress(progress);
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  const items = seasons.flatMap((season) =>
    season.trophies.map((trophy) => ({
      trophy,
      season: season.year,
    })),
  );

  return (
    <div ref={containerRef} className="relative mx-auto max-w-4xl pt-10">
      {/* Track — neutral gray */}
      <div
        className="absolute top-0 bottom-0 left-4 w-px -translate-x-1/2 bg-border md:left-1/2"
        aria-hidden="true"
      />

      {/* Fill — violet → red gradient, draws on scroll */}
      <div
        className="absolute top-0 left-4 w-px -translate-x-1/2 bg-gradient-to-b from-primary via-primary-dark to-accent md:left-1/2"
        style={{
          height: `${lineProgress * 100}%`,
          transition: "height 80ms linear",
        }}
        aria-hidden="true"
      />

      <div className="space-y-20">
        {items.map((item, index) => (
          <TrophyEntry
            key={`${item.season}-${index}`}
            trophy={item.trophy}
            season={item.season}
            index={index}
            side={index % 2 === 0 ? "left" : "right"}
          />
        ))}
      </div>
    </div>
  );
}

function TrophyEntry({
  trophy,
  season,
  index,
  side,
}: {
  trophy: TrophyType;
  season: string;
  index: number;
  side: "left" | "right";
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const Icon = getTrophyIcon(trophy.title);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
      style={{
        transitionDelay: `${Math.min(index * 50, 200)}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Point — simple dot, violet when visible */}
      <div className="absolute left-4 top-10 z-10 -translate-x-1/2 md:left-1/2">
        <div
          className={`h-3 w-3 rounded-full ring-4 ring-white transition-all duration-500 ${
            isVisible
              ? "bg-primary scale-100 shadow-[0_0_10px_rgba(94,45,145,0.5)]"
              : "bg-border scale-75"
          }`}
        />
      </div>

      {/* Card wrapper — alternates side */}
      <div
        className={`pl-14 md:pl-0 ${
          side === "left"
            ? "md:pr-[calc(50%+2rem)]"
            : "md:pl-[calc(50%+2rem)]"
        }`}
      >
        <div className="relative">
          {/* Trophy icon — overflows top edge, violet gradient */}
                   {/* Trophy image/icon — overflows top edge */}
          <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-xl ring-4 ring-white">
              {trophy.image ? (
                <Image
                  src={trophy.image}
                  alt={trophy.title}
                  width={64}
                  height={64}
                  className="h-full w-full object-contain p-1"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-dark">
                  <Icon className="h-7 w-7 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-border bg-white px-6 pb-6 pt-12 shadow-sm transition-shadow duration-300 hover:shadow-md">
            {/* Season + category */}
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                Saison {season}
              </p>
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-primary">
                {trophy.category}
              </span>
            </div>

            {/* Title */}
            <h3 className="mt-3 text-xl font-black leading-[1.15] tracking-tight text-foreground">
              {trophy.title}
            </h3>

            {/* Competition — violet */}
            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.15em] text-primary">
              {trophy.competition}
            </p>

            {/* Violet divider */}
            <div className="mt-4 h-px w-10 bg-primary" />

            {/* Description */}
            <p className="mt-4 text-sm leading-[1.65] text-muted-foreground">
              {trophy.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}