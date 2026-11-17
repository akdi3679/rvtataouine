import type { Metadata } from "next";
import { articles, type Article } from "@/data/news";
import { ActualitesView } from "@/components/sections/actualites-view";
import { parseTeamQuery, getTeamVars } from "@/data/team-theme";
export const metadata: Metadata = {
  title: "Actualités | ARV Tataouine",
  description: "Les dernières nouvelles de l'Académie Real Valladolid Tataouine.",
};

type SearchParams = Promise<{ team?: string }>;
export default async function ActualitesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const team = parseTeamQuery(params.team);

  const filtered: Article[] =
    team === "all" ? articles : articles.filter((a) => a.team === team);

  return (<div style={team === "all" ? undefined : getTeamVars(team)}><ActualitesView articles={filtered} team={team} /></div>);
}