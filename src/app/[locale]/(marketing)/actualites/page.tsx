import type { Metadata } from "next";
import { articles, type Article } from "@/data/news";
import { ActualitesView } from "@/components/sections/actualites-view";
import { TeamFilter } from "@/components/global/team-filter";
import type { TeamId } from "@/data/team-theme";

export const metadata: Metadata = {
  title: "Actualités | ARV Tataouine",
  description: "Les dernières nouvelles de l'Académie Real Valladolid Tataouine.",
};

type SearchParams = Promise<{ team?: string }>;

function parseTeam(value: string | undefined): TeamId | "all" {
  if (value === "valladolid" || value === "ennour" || value === "avenir") return value;
  return "all";
}

export default async function ActualitesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const team = parseTeam(params.team);

  const filtered: Article[] =
    team === "all" ? articles : articles.filter((a) => a.team === team);

  return (
    <>
      <section className="bg-white border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-8 pb-4">
          <TeamFilter currentTeam={team} />
        </div>
      </section>
      <ActualitesView articles={filtered} />
    </>
  );
}