"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { getTeamFromPath, TEAMS, type TeamId } from "@/data/team-theme";
import { TeamIcon } from "@/components/global/icon";

interface AcademyStorySectionProps {
  team?: TeamId;
}

export function AcademyStorySection({ team }: AcademyStorySectionProps = {}) {
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "fr";
  const activeTeam = team ?? getTeamFromPath(pathname);
  const theme = TEAMS[activeTeam];

  const promise = theme.content.promise;
  const mission = theme.content.mission;
  const values = theme.content.values ?? [];
  const image = theme.content.missionImage ?? "/images/academy/kids-trophy.jpg";

  if (!promise || !mission) return null;

  const ctaHref = promise.ctaHref.startsWith("/")
    ? `/${currentLocale}${promise.ctaHref}`
    : promise.ctaHref;

  return (
    <section id="mission" className="relative overflow-hidden bg-white">
      {/* Desktop image on right */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] lg:flex lg:items-center lg:justify-end lg:py-10 lg:pr-6">
        <div className="relative h-full w-full">
          <Image
            src={image}
            alt={theme.name}
            fill
            sizes="55vw"
            className="object-contain object-right"
            priority={false}
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
            {promise.badge}
          </span>

          {/* Title */}
          <h2 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
            {mission.title}
            {mission.titleLine2 && (
              <span className={`block ${theme.textClass}`}>
                {mission.titleLine2}
              </span>
            )}
          </h2>

          {/* Mobile image */}
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

          {/* Description — first paragraph only */}
          <p className="mt-6 text-base leading-relaxed text-muted-foreground lg:mt-5">
            {mission.paragraphs[0]}
          </p>

          {/* 4 value cards */}
                    {/* 4 value cards */}
          {values.length > 0 && (
            <div className="mt-8 grid grid-cols-2 gap-3">
              {values.slice(0, 4).map((v) => (
                <div
                  key={v.title}
                  className="group rounded-xl border border-border bg-white p-4 transition-all hover:shadow-md"
                >
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${theme.bgSoftClass}`}
                  >
                    <TeamIcon
                      name={v.icon!}
                      className="h-4 w-4"
                      style={{ color: theme.hex }}
                    />
                  </div>
                  <h3 className="mt-3 text-sm font-bold leading-tight text-foreground">
                    {v.title}
                  </h3>
                  <p className="mt-1 text-xs leading-snug text-muted-foreground">
                    {v.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Mission cards */}
          {mission.cards && mission.cards.length > 0 && (
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {mission.cards.map((card, i) => (
                <div key={i} className="rounded-xl border border-border bg-secondary/30 p-4 transition-shadow hover:shadow-md">
                  <h4 className="text-sm font-bold text-foreground">{card.title}</h4>
                  <p className="mt-1 text-xs text-muted-foreground">{card.description}</p>
                </div>
              ))}
            </div>
          )}
                  <h3 className="mt-3 text-sm font-bold leading-tight text-foreground">
                    {v.title}
                  </h3>
                  <p className="mt-1 text-xs leading-snug text-muted-foreground">
                    {v.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-8 flex justify-center">
            <Link
              href={ctaHref}
              className={`inline-flex items-center gap-3 rounded-md px-10 py-4 text-base font-bold shadow-xl transition-all hover:-translate-y-0.5 hover:opacity-90 ${theme.promiseButton ?? theme.carousel.button}`}
            >
              {promise.ctaLabel}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}