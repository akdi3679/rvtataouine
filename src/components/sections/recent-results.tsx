import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { recentMatches } from "@/data/matches";

function shortDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
  });
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function RecentResultsSection() {
  const results = recentMatches.slice(0, 4);
  if (!results.length) return null;

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Derniers résultats
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Les performances récentes de nos équipes
            </p>
          </div>
          <Link
            href="/matchs"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-foreground transition-opacity hover:opacity-60"
          >
            Tous les matchs
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-white">
          {/* Header — desktop only */}
          <div className="hidden md:grid md:grid-cols-[auto_1fr_120px_120px_100px] md:items-center md:gap-x-6 md:border-b md:border-border/60 md:bg-secondary/30 md:px-6 md:py-3">
            <span className="h-3 w-3" aria-hidden />
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Adversaire
            </span>
            <span className="text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Score
            </span>
            <span className="text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Résultat
            </span>
            <span className="text-right text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Date
            </span>
          </div>

          {/* Rows */}
          {results.map((match, idx) => {
            const arvIsHome = match.homeTeam.name
              .toLowerCase()
              .includes("arv");
            const opponent = arvIsHome
              ? match.awayTeam.name
              : match.homeTeam.name;
            const ourScore = arvIsHome
              ? match.homeTeam.score ?? 0
              : match.awayTeam.score ?? 0;
            const theirScore = arvIsHome
              ? match.awayTeam.score ?? 0
              : match.homeTeam.score ?? 0;
            const isHome = arvIsHome;

            const resultMap = {
              win: { dot: "bg-success", text: "text-success", label: "Victoire" },
              draw: {
                dot: "bg-warning",
                text: "text-warning",
                label: "Nul",
              },
              loss: {
                dot: "bg-muted-foreground/50",
                text: "text-muted-foreground",
                label: "Défaite",
              },
            } as const;
            const result = resultMap[match.result ?? "draw"];
            const divider =
              idx !== results.length - 1 ? "border-b border-border/40" : "";

            return (
              <Link
                key={match.id}
                href="/matchs"
                className={`grid grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-2 px-4 py-3 transition-colors hover:bg-secondary/30 md:grid-cols-[auto_1fr_120px_120px_100px] md:gap-x-6 md:px-6 md:py-4 ${divider}`}
              >
                {/* Logo */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-foreground">
                  {initials(opponent)}
                </div>

                {/* Name + subtext */}
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {opponent}
                  </p>
                  <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                    {isHome ? "Domicile" : "Extérieur"} · {match.category}
                  </p>
                </div>

                {/* Score */}
                <div className="text-right md:text-center">
                  <span className="text-xl font-semibold tabular-nums text-foreground">
                    {ourScore}
                    <span className="mx-0.5 text-muted-foreground/40">–</span>
                    {theirScore}
                  </span>
                </div>

                {/* Result — desktop */}
                <div className="hidden justify-center md:flex">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold ${result.text}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${result.dot}`}
                    />
                    {result.label}
                  </span>
                </div>

                {/* Date — desktop */}
                <div className="hidden text-right text-xs font-medium text-muted-foreground md:block">
                  {shortDate(match.date)}
                </div>

                {/* Mobile sub-row: result + date */}
                <div className="col-span-3 mt-1 flex items-center justify-between md:hidden">
                  <span
                    className={`inline-flex items-center gap-1.5 text-[11px] font-semibold ${result.text}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${result.dot}`}
                    />
                    {result.label}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {shortDate(match.date)}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}