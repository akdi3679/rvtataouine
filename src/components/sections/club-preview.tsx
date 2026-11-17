"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getTeamFromPath, TEAMS, type TeamId } from "@/data/team-theme";
import { TeamIcon } from "@/components/global/icon";

interface ClubPreviewSectionProps {
  team?: TeamId;
}

export function ClubPreviewSection({ team }: ClubPreviewSectionProps = {}) {
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "fr";
  const activeTeam = team ?? getTeamFromPath(pathname);
  const theme = TEAMS[activeTeam];
  const story = theme.content.story;

  if (!story) return null;

  const ctaHref = story.ctaHref.startsWith("/")
    ? `/${currentLocale}${story.ctaHref}`
    : story.ctaHref;

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Left: story */}
          <div>
            <span
              className={`inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] ${theme.textClass}`}
            >
              <span className="h-px w-10" style={{ backgroundColor: theme.hex }} />
              {story.kicker}
            </span>

            <h2 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
              {story.titleLine1}
              <span className={`block ${theme.textClass}`}>
                {story.titleLine2}
              </span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground lg:text-lg">
              {story.paragraph}
            </p>

            {/* 3 pillars */}
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
              {story.pillars.map((p) => (
                <div key={p.label}>
                  <TeamIcon
                    name={p.icon}
                    className="h-5 w-5"
                    style={{ color: theme.hex }}
                  />
                  <p className="mt-3 text-sm font-semibold leading-tight text-foreground">
                    {p.label}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-muted-foreground">
                    {p.value}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href={ctaHref}
              className="group mt-10 inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-85"
            >
              {story.ctaLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Right: years typography + 2 stats */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Notre parcours
            </p>

            <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-2">
              <span className="text-6xl font-black tracking-tighter text-foreground sm:text-7xl lg:text-8xl">
                {story.yearFrom}
              </span>
              <span className="text-2xl font-light text-muted-foreground sm:text-3xl lg:text-4xl">
                →
              </span>
              <span className="text-6xl font-black tracking-tighter text-foreground sm:text-7xl lg:text-8xl">
                {story.yearTo}
              </span>
            </div>

            <p className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground">
              {story.yearParagraph}
            </p>

            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-border pt-8">
              <div>
                <p className="text-4xl font-black tabular-nums tracking-tight text-foreground lg:text-5xl">
                  {story.stat1.value.replace(/\+$/, "")}
                  {story.stat1.value.endsWith("+") && (
                    <span style={{ color: theme.hex }}>+</span>
                  )}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {story.stat1.label}
                </p>
              </div>
              <div>
                <p className="text-4xl font-black tabular-nums tracking-tight text-foreground lg:text-5xl">
                  {story.stat2.value}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {story.stat2.label}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}