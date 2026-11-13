import type { Metadata } from "next";
import { MatchsView } from "@/components/sections/matchs-view";

export const metadata: Metadata = {
  title: "Matchs | ARV Tataouine",
  description:
    "Calendrier, résultats et prochains matchs de l'Académie Real Valladolid Tataouine.",
};

export default function MatchsPage() {
  return <MatchsView />;
}