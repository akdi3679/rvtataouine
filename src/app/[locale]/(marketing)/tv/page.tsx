import type { Metadata } from "next";
import { videos, type Video } from "@/data/videos";
import { TvView } from "@/components/sections/tv-view";
import { TeamFilter } from "@/components/global/team-filter";
import { parseTeamQuery } from "@/data/team-theme";

export const metadata: Metadata = {
  title: "ARV TV | ARV Tataouine",
  description: "Toutes les vidéos de l'Académie Real Valladolid Tataouine.",
};

type SearchParams = Promise<{ team?: string }>;

export default async function TvPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
 const team = parseTeamQuery(params.team);

  const filtered: Video[] =
    team === "all" ? videos : videos.filter((v) => v.team === team);

  return <TvView videos={filtered} team={team} />;
}