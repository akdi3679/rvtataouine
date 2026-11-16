"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { getTeamFromPath, TEAMS, type TeamId } from "@/data/team-theme";
import { TeamIcon } from "@/components/global/icon";

interface TeamPresentationSectionProps {
  team?: TeamId;
}

export function TeamPresentationSection({
  team,
}: TeamPresentationSectionProps = {}) {
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "fr";
  const activeTeam = team ?? getTeamFromPath(pathname);
  const theme = TEAMS[activeTeam];
  const m = theme.content.mission;

  if (!m) return null;

  const image = theme.content.missionImage ?? "/images/academy/kids-trophy.jpg";
  const cards = theme.content.stats ?? [];

  const ctaLabel =
    activeTeam === "ennour"
      ? "Inscrire ma fille"
      : activeTeam === "group"
      ? "Découvrir nos équipes"
      : "Inscrire mon enfant";
  const ctaHref =
    activeTeam === "group"
      ? `/${currentLocale}/#entities`
      : `/${currentLocale}/inscription`;

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Desktop image on right, faded into content */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] lg:flex lg:items-center lg:justify-end lg:py-10 lg:pr-6">
        <div className="relative h-full w-full">
          <Image
            src={image}
            alt={theme.name}
            fill
            sizes="55vw"
            className="object-contain object-right"
          />
        </div>
        <div
          className="absolute inset-y-0 left-0 w-2/5"
          style={{
            background:
              "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0.4) 65%, rgba(255,255,255,0) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="lg:max-w-[42%]">
          {/* Badge */}
          <span
            className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest ${theme.bgSoftClass} ${theme.textClass}`}
          >
            <Sparkles className="h-3 w-3" />
            {m.kicker}
          </span>

          {/* Title */}
          <h2 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
            {m.title}
            {m.titleLine2 && (
              <span className={`block ${theme.textClass}`}>{m.titleLine2}</span>
            )}
          </h2>

          {/* Mobile image — full-bleed, overlaps title */}
          <div className="relative z-10 -mx-6 -mt-8 lg:hidden">
            <Image
              src={image}
              alt={theme.name}
              width={1400}
              height={1000}
              sizes="100vw"
              className="w-full h-auto"
            />
          </div>

          {/* Paragraphs */}
          <div className="mt-6 space-y-3 text-base leading-relaxed text-muted-foreground">
            {m.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Stat cards */}
          {cards.length > 0 && (
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {cards.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-border bg-white p-4"
                >
                  <TeamIcon
                    name={s.icon}
                    className={`h-5 w-5 ${theme.textClass}`}
                  />
                  <p className="mt-2 text-2xl font-black tabular-nums text-foreground">
                    {s.value}
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-8 flex justify-center lg:justify-start">
            <Link
              href={ctaHref}
              className={`inline-flex items-center gap-3 rounded-md px-8 py-4 text-base font-bold shadow-xl transition-all hover:-translate-y-0.5 hover:opacity-90 ${theme.carousel.button}`}
            >
              {ctaLabel}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}