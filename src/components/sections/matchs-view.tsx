"use client";

import { useState, useEffect, useMemo } from "react";
import {
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Goal,
  Shield,
  TrendingUp,
} from "lucide-react";
import { recentMatches, upcomingMatches, type Match } from "@/data/matches";

/* ── Helpers ──────────────────────────────────────────── */

function useNow() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function Countdown({ date, time }: { date: string; time: string }) {
  const now = useNow();
  const target = new Date(`${date}T${time}:00`).getTime();
  const diff = Math.max(0, target - now);

  if (diff <= 0) {
    return (
      <span className="inline-flex items-center gap-2 text-xs font-bold text-accent">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
        Match en cours
      </span>
    );
  }

  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff / 3_600_000) % 24);
  const minutes = Math.floor((diff / 60_000) % 60);
  const seconds = Math.floor((diff / 1_000) % 60);

  return (
    <div className="flex items-baseline gap-3">
      <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/50">
        Coup d&apos;envoi dans
      </span>
      <div className="flex items-baseline gap-1.5 tabular-nums text-white">
        <span className="text-lg font-black">{String(days).padStart(2, "0")}</span>
        <span className="text-[9px] font-bold text-white/40">J</span>
        <span className="text-white/25">:</span>
        <span className="text-lg font-black">{String(hours).padStart(2, "0")}</span>
        <span className="text-[9px] font-bold text-white/40">H</span>
        <span className="text-white/25">:</span>
        <span className="text-lg font-black">{String(minutes).padStart(2, "0")}</span>
        <span className="text-[9px] font-bold text-white/40">M</span>
        <span className="text-white/25">:</span>
        <span className="text-lg font-black">{String(seconds).padStart(2, "0")}</span>
        <span className="text-[9px] font-bold text-white/40">S</span>
      </div>
    </div>
  );
}

function initials(name: string) {
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

/* ── 1. Hero full-width — prochain match ──────────────── */
function NextMatchHero({ match }: { match: Match }) {
  return (
    <section className="relative w-full overflow-hidden bg-primary">
      {/* Photo — full bleed */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/images/matchs/hero.jpg)" }}
          aria-hidden="true"
        />
        {/* Gradient uniquement en bas pour lisibilité du texte */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-black/25 to-black/85"
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-[420px] max-w-5xl flex-col justify-end px-6 pb-10 pt-20 text-white lg:min-h-[480px] lg:px-8 lg:pb-14 lg:pt-24">
        {/* Hairline rouge + kicker */}
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px w-10 bg-accent" />
          <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            Prochain match
          </span>
        </div>

        {/* Match — la star */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3 sm:gap-8">
          {/* Home */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-end sm:gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/30 backdrop-blur-md sm:h-24 sm:w-24">
              <span className="text-lg font-black text-white sm:text-2xl">
                {initials(match.homeTeam.name)}
              </span>
            </div>
            <p className="text-center text-sm font-bold text-white sm:text-right sm:text-lg">
              {match.homeTeam.name}
            </p>
          </div>

          {/* Time */}
          <div className="flex flex-col items-center gap-1 pb-3 sm:pb-5">
            <span className="text-3xl font-black tabular-nums text-white sm:text-5xl">
              {match.time}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-white/60 sm:text-[10px]">
              {shortDate(match.date)}
            </span>
          </div>

          {/* Away */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-start sm:gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/30 backdrop-blur-md sm:h-24 sm:w-24">
              <span className="text-lg font-black text-white sm:text-2xl">
                {initials(match.awayTeam.name)}
              </span>
            </div>
            <p className="text-center text-sm font-bold text-white sm:text-left sm:text-lg">
              {match.awayTeam.name}
            </p>
          </div>
        </div>

        {/* Meta */}
        <p className="mt-4 text-center text-xs font-medium text-white/70 sm:text-sm">
          {match.competition} · {match.location}
        </p>

        {/* Bottom strip: countdown + CTA séparés par hairline */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-5 sm:flex-row">
          <Countdown date={match.date} time={match.time} />
          <a
  href="/inscription"
  className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent/90 hover:scale-[1.02]"
>
  Inscrire mon enfant
  <ArrowRight className="h-3.5 w-3.5" />
</a>
        </div>
      </div>
    </section>
  );
}

/* ── 2. Prochain match — row style football site ─────── */

function UpcomingRow({ match }: { match: Match }) {
  const d = new Date(match.date);
  const day = d.getDate().toString().padStart(2, "0");
  const month = d
    .toLocaleDateString("fr-FR", { month: "short" })
    .replace(".", "");

  return (
    <div className="py-4 sm:grid sm:grid-cols-[80px_1fr_60px_1fr_100px] sm:items-center sm:gap-4 sm:py-3">
      {/* Date badge */}
      <div className="mb-3 flex w-14 flex-col items-center rounded-lg bg-secondary px-2 py-1.5 sm:mb-0 sm:w-auto">
        <span className="text-base font-black leading-none text-foreground">
          {day}
        </span>
        <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
          {month}
        </span>
      </div>

      {/* Mobile layout */}
      <div className="space-y-2 sm:hidden">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-1 items-center gap-2 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-foreground">
              {initials(match.homeTeam.name)}
            </div>
            <span className="truncate text-sm font-bold text-foreground">
              {match.homeTeam.name}
            </span>
          </div>
          <span className="shrink-0 text-xs font-bold text-muted-foreground">
            vs
          </span>
          <div className="flex flex-1 items-center justify-end gap-2 min-w-0">
            <span className="truncate text-right text-sm font-bold text-foreground">
              {match.awayTeam.name}
            </span>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-foreground">
              {initials(match.awayTeam.name)}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
          <span className="truncate">{match.competition}</span>
          <span className="flex items-center gap-2">
            <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[9px] font-bold text-primary">
              {match.category}
            </span>
            <span className="font-bold text-foreground">{match.time}</span>
          </span>
        </div>
        <p className="truncate text-[10px] text-muted-foreground">
          <MapPin className="mr-0.5 inline h-2.5 w-2.5" />
          {match.location}
        </p>
      </div>

      {/* Desktop layout */}
      {/* Home */}
      <div className="hidden min-w-0 items-center justify-end gap-2 sm:flex">
        <div className="min-w-0 text-right">
          <p className="truncate text-sm font-bold text-foreground">
            {match.homeTeam.name}
          </p>
          <p className="truncate text-[10px] text-muted-foreground">
            {match.location}
          </p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-foreground">
          {initials(match.homeTeam.name)}
        </div>
      </div>

      {/* Time */}
      <div className="hidden text-center sm:block">
        <span className="text-lg font-black tabular-nums text-foreground">
          {match.time}
        </span>
      </div>

      {/* Away */}
      <div className="hidden min-w-0 items-center justify-start gap-2 sm:flex">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-foreground">
          {initials(match.awayTeam.name)}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-foreground">
            {match.awayTeam.name}
          </p>
          <p className="truncate text-[10px] text-muted-foreground">
            {match.competition}
          </p>
        </div>
      </div>

      {/* Category */}
      <div className="hidden text-right sm:block">
        <span className="inline-block rounded bg-primary/10 px-2 py-1 text-[10px] font-bold text-primary">
          {match.category}
        </span>
      </div>
    </div>
  );
}

function UpcomingList({ matches }: { matches: Match[] }) {
  if (matches.length === 0) {
    return (
      <p className="py-6 text-sm text-muted-foreground">
        Aucun autre match programmé.
      </p>
    );
  }

  return (
    <div className="divide-y divide-border/50">
      {matches.map((m) => (
        <UpcomingRow key={m.id} match={m} />
      ))}
    </div>
  );
}

/* ── 3. Historique — alignement fixe ──────────────────── */

function HistoryList({ matches }: { matches: Match[] }) {
  if (matches.length === 0) {
    return (
      <p className="py-6 text-sm text-muted-foreground">
        Aucun match joué pour le moment.
      </p>
    );
  }

  return (
    <div className="divide-y divide-border/40">
      {matches.map((match) => {
        const arvIsHome = match.homeTeam.name.toLowerCase().includes("arv");
        const opponent = arvIsHome ? match.awayTeam.name : match.homeTeam.name;
        const ourScore = arvIsHome
          ? match.homeTeam.score ?? 0
          : match.awayTeam.score ?? 0;
        const theirScore = arvIsHome
          ? match.awayTeam.score ?? 0
          : match.homeTeam.score ?? 0;
        const isHome = arvIsHome;

        const resultMap = {
          win: { dot: "bg-success", text: "text-success", label: "Victoire" },
          draw: { dot: "bg-warning", text: "text-warning", label: "Nul" },
          loss: {
            dot: "bg-muted-foreground/50",
            text: "text-muted-foreground",
            label: "Défaite",
          },
        } as const;
        const result = resultMap[match.result ?? "draw"];

        return (
          <div
            key={match.id}
            className="grid grid-cols-[40px_1fr_64px] items-center gap-3 py-4 sm:grid-cols-[40px_1fr_64px_110px_90px] sm:gap-4"
          >
            {/* Logo */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-foreground">
              {initials(opponent)}
            </div>

            {/* Name + meta */}
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                {opponent}
              </p>
              <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                {isHome ? "Domicile" : "Extérieur"} · {match.category}
              </p>
            </div>

            {/* Score — FIXED width column, always aligned */}
            <div className="text-center">
              <span className="text-xl font-black tabular-nums text-foreground">
                {ourScore}
                <span className="mx-0.5 text-muted-foreground/40">–</span>
                {theirScore}
              </span>
            </div>

            {/* Result — desktop */}
            <div className="hidden justify-center sm:flex">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold ${result.text}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${result.dot}`} />
                {result.label}
              </span>
            </div>

            {/* Date — desktop */}
            <div className="hidden text-right text-xs font-medium text-muted-foreground sm:block">
              {shortDate(match.date)}
            </div>

            {/* Mobile sub-row */}
            <div className="col-span-3 flex items-center justify-between pt-1 sm:hidden">
              <span
                className={`inline-flex items-center gap-1.5 text-[11px] font-semibold ${result.text}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${result.dot}`} />
                {result.label}
              </span>
              <span className="text-[11px] text-muted-foreground">
                {shortDate(match.date)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── 4. Bilan simplifié — radar + stats friendly ──────── */

function RadarChart({
  values,
}: {
  values: { label: string; value: number }[];
}) {
  const size = 260;
  const center = size / 2;
  const maxR = 82;
  const n = values.length;
  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const point = (i: number, r: number) => ({
    x: center + Math.cos(angle(i)) * r,
    y: center + Math.sin(angle(i)) * r,
  });

  const rings = [0.25, 0.5, 0.75, 1];
  const dataPoints = values.map((v, i) =>
    point(i, (maxR * Math.min(v.value, 100)) / 100),
  );
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");
  const labelPoints = values.map((_, i) => point(i, maxR + 22));

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="mx-auto w-full max-w-[280px]"
      aria-label="Radar des performances"
    >
      {rings.map((r) => (
        <polygon
          key={r}
          points={values
            .map((_, i) => {
              const p = point(i, maxR * r);
              return `${p.x},${p.y}`;
            })
            .join(" ")}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-border"
        />
      ))}

      {values.map((_, i) => {
        const p = point(i, maxR);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={p.x}
            y2={p.y}
            stroke="currentColor"
            strokeWidth="1"
            className="text-border"
          />
        );
      })}

      <polygon
        points={dataPolygon}
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        className="text-accent"
      />

      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" className="fill-accent" />
      ))}

      {values.map((v, i) => {
        const p = labelPoints[i];
        return (
          <g key={i}>
            <text
              x={p.x}
              y={p.y - 4}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-foreground text-[10px] font-bold"
            >
              {v.label}
            </text>
            <text
              x={p.x}
              y={p.y + 8}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-muted-foreground text-[9px] font-semibold tabular-nums"
            >
              {Math.round(v.value)}%
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function FormBadge({ result }: { result: "win" | "draw" | "loss" }) {
  const styles = {
    win: "bg-success text-white",
    draw: "bg-warning text-white",
    loss: "bg-muted-foreground/40 text-white",
  };
  const letters = { win: "V", draw: "N", loss: "D" };
  return (
    <span
      className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-black ${styles[result]}`}
    >
      {letters[result]}
    </span>
  );
}

function Bilan({ matches }: { matches: Match[] }) {
  const chronological = useMemo(
    () =>
      [...matches].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      ),
    [matches],
  );

  const total = matches.length;
  const wins = matches.filter((m) => m.result === "win").length;
  const draws = matches.filter((m) => m.result === "draw").length;
  const losses = matches.filter((m) => m.result === "loss").length;

  const goalsFor = matches.reduce((acc, m) => {
    const arvIsHome = m.homeTeam.name.toLowerCase().includes("arv");
    return acc + (arvIsHome ? m.homeTeam.score ?? 0 : m.awayTeam.score ?? 0);
  }, 0);
  const goalsAgainst = matches.reduce((acc, m) => {
    const arvIsHome = m.homeTeam.name.toLowerCase().includes("arv");
    return acc + (arvIsHome ? m.awayTeam.score ?? 0 : m.homeTeam.score ?? 0);
  }, 0);

  const last5 = chronological.slice(-5);

  const winPct = total > 0 ? (wins / total) * 100 : 0;
  const drawPct = total > 0 ? (draws / total) * 100 : 0;
  const attackPct =
    total > 0 ? Math.min((goalsFor / total / 4) * 100, 100) : 0;
  const defensePct =
    total > 0 ? Math.max(100 - (goalsAgainst / total / 4) * 100, 0) : 0;
  const formPoints = last5.reduce((acc, m) => {
    if (m.result === "win") return acc + 3;
    if (m.result === "draw") return acc + 1;
    return acc;
  }, 0);
  const formPct = last5.length > 0 ? (formPoints / (last5.length * 3)) * 100 : 0;

  const radarValues = [
    { label: "Victoires", value: winPct },
    { label: "Nuls", value: drawPct },
    { label: "Attaque", value: attackPct },
    { label: "Défense", value: defensePct },
    { label: "Forme", value: formPct },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Radar card */}
      <div className="rounded-2xl border border-border bg-white p-6">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Profil de la saison
          </p>
          <TrendingUp className="h-4 w-4 text-accent" />
        </div>
        <div className="mt-4">
          <RadarChart values={radarValues} />
        </div>
      </div>

      {/* Summary card — simple, kid-friendly */}
      <div className="rounded-2xl border border-border bg-white p-6">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Forme récente
        </p>
        <div className="mt-4 flex items-center gap-2">
          {last5.length > 0 ? (
            last5.map((m, i) => (
              <FormBadge key={i} result={m.result ?? "draw"} />
            ))
          ) : (
            <p className="text-xs text-muted-foreground">Aucun match joué.</p>
          )}
        </div>
        <p className="mt-2 text-[10px] text-muted-foreground">
          Plus ancien → plus récent
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-5">
          <div className="text-center">
            <p className="text-2xl font-black text-success">{wins}</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Victoires
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-warning">{draws}</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Nuls
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-muted-foreground">
              {losses}
            </p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Défaites
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-5">
          <div className="flex items-center gap-2">
            <Goal className="h-4 w-4 text-accent" />
            <div>
              <p className="text-lg font-black text-foreground">{goalsFor}</p>
              <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                Buts marqués
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <div>
              <p className="text-lg font-black text-foreground">
                {goalsAgainst}
              </p>
              <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                Encaissés
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Vue principale ───────────────────────────────────── */

export function MatchsView() {
  const nextMatch = upcomingMatches[0];
  const restUpcoming = upcomingMatches.slice(1);
  const sortedRecent = useMemo(
    () =>
      [...recentMatches].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    [],
  );

  return (
    <div className="bg-white">
      {/* 1 ─ Full-width hero, above the title */}
      {nextMatch && <NextMatchHero match={nextMatch} />}

      {/* 2 ─ Page title */}
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-4xl px-6 py-10 lg:px-8 lg:py-14">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
            Calendrier & Résultats
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Matchs
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Tous les matchs de l&apos;académie, toutes catégories confondues.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-10 lg:px-8 lg:py-14">
        {/* 3 ─ Prochains matchs */}
        {restUpcoming.length > 0 && (
          <div className="mb-14">
            <div className="mb-5">
              <h2 className="text-xl font-black text-foreground sm:text-2xl">
                Prochains matchs
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                {restUpcoming.length} match
                {restUpcoming.length > 1 ? "s" : ""} à venir
              </p>
            </div>
            <UpcomingList matches={restUpcoming} />
          </div>
        )}

        {/* 4 ─ Historique */}
        <div className="mb-14">
          <div className="mb-5">
            <h2 className="text-xl font-black text-foreground sm:text-2xl">
              Historique
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              {sortedRecent.length} match{sortedRecent.length > 1 ? "s" : ""}{" "}
              joué{sortedRecent.length > 1 ? "s" : ""}
            </p>
          </div>
          <HistoryList matches={sortedRecent} />
        </div>

        {/* 5 ─ Bilan */}
        <div>
          <div className="mb-5">
            <h2 className="text-xl font-black text-foreground sm:text-2xl">
              Bilan de la saison
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Profil et statistiques globales
            </p>
          </div>
          <Bilan matches={sortedRecent} />
        </div>
      </section>
    </div>
  );
}