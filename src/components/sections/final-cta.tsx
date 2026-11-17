"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { getTeamFromPath, TEAMS, type TeamId } from "@/data/team-theme";

interface FinalCTASectionProps {
  team?: TeamId;
}

export function FinalCTASection({ team }: FinalCTASectionProps = {}) {
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "fr";
  const activeTeam = team ?? getTeamFromPath(pathname);
  const theme = TEAMS[activeTeam];
  const cta = theme.content.finalCta;

  if (!cta) return null;

  const sectionBg = cta.sectionBgClass ?? "bg-white";

  return (
    <section className={`relative overflow-x-clip pt-28 pb-24 lg:py-24 ${sectionBg}`}>
      {/* Image — left side */}
      <div className="pointer-events-none absolute left-0 -bottom-10 z-0 h-[130%]">
        <Image
          src="/images/cta/kids.png"
          alt=""
          aria-hidden="true"
          width={800}
          height={1200}
          className="h-full w-auto object-contain object-bottom"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <div className={cta.titleShiftClass ?? "-translate-y-[150px] lg:translate-y-0"}>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            {cta.title}
          </h2>
          <p className="mt-6 text-xl text-muted-foreground">
            {cta.subtitle}
          </p>
        </div>

        <div className="mt-28 flex flex-col items-center justify-center gap-4 sm:flex-row lg:mt-10">
          <Link
            href={`/${currentLocale}/inscription`}
            className={`inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white transition-all hover:opacity-90 hover:scale-105 ${theme.bgClass}`}
          >
            {cta.ctaLabel} <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href={`/${currentLocale}${cta.secondaryHref}`}
            className="inline-flex items-center gap-2 rounded-full border-2 border-foreground/15 bg-transparent px-8 py-4 text-base font-semibold text-foreground transition-all hover:border-foreground/40 hover:bg-foreground/5"
          >
            {cta.secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}