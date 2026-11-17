import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { TeamIcon } from "@/components/global/icon";
import { TEAMS } from "@/data/team-theme";

export const metadata: Metadata = {
  title: "Notre Club | ARV Tataouine",
  description:
    "Découvrez l'histoire, la philosophie, le stade et les installations de l'Académie Real Valladolid Tataouine.",
};

export default function ClubPage() {
  const t = TEAMS.valladolid;
  const c = t.content.club!;

  return (
    <div className="flex flex-col bg-white">
      {/* 1 — Hero */}
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
                {c.heroKicker}
              </p>
              <h1 className="mt-3 text-4xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {c.heroTitle1}
                <span className={`block ${t.textClass}`}>{c.heroTitle2}</span>
              </h1>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                {c.heroParagraph}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/inscription"
                  className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-accent/20 transition-all hover:bg-accent/90 hover:shadow-lg"
                >
                  Inscrire mon enfant
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-foreground/30 hover:bg-secondary/50"
                >
                  Visiter le club
                </Link>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <Image
                src={c.heroImage}
                alt="L'Académie Real Valladolid Tataouine"
                width={800}
                height={1000}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-auto w-full max-w-[520px]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2 — Histoire */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
            {c.historyKicker}
          </p>

          <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <span className="text-6xl font-black tracking-tighter text-foreground sm:text-7xl lg:text-8xl">
              {c.historyYearFrom}
            </span>
            <span className="text-2xl font-light text-muted-foreground sm:text-3xl lg:text-4xl">
              →
            </span>
            <span className="text-6xl font-black tracking-tighter text-foreground sm:text-7xl lg:text-8xl">
              {c.historyYearTo}
            </span>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 md:gap-10">
            {c.historyparagraphs.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-foreground">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — Philosophie */}
      <section className="border-y border-border/60 bg-secondary/20 py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
              {c.philosophyKicker}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              {c.philosophyTitle}
            </h2>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {c.philosophy.map((p) => (
              <div key={p.title}>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {p.number}
                  </span>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <TeamIcon
                  name={p.icon!}
                  className={`mt-6 h-7 w-7 ${t.textClass}`}
                />
                <h3 className="mt-4 text-base font-bold text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Stade */}
      <section className="border-t border-border/60 py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
                {c.stadeKicker}
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                {c.stadeTitle1}
                <span className={`block ${t.textClass}`}>{c.stadeTitle2}</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {c.stadeParagraph}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {c.stadeStats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-border bg-white p-3 text-center sm:p-5"
                >
                  <p className="text-2xl font-black tabular-nums text-foreground sm:text-3xl">
                    {s.value}
                  </p>
                  <p className="mt-2 break-words text-[8px] font-semibold uppercase leading-tight tracking-normal text-muted-foreground sm:text-[10px] sm:tracking-wider">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5 — Installations */}
      <section className="border-t border-border/60 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
              {c.installationsKicker}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              {c.installationsTitle}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {c.installations.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-border bg-white p-6"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${t.bgSoftClass} ${t.textClass}`}>
                  <TeamIcon name={f.icon} className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.description}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {f.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-center gap-2 text-xs text-foreground"
                    >
                      <span className="h-1 w-1 rounded-full bg-accent" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}