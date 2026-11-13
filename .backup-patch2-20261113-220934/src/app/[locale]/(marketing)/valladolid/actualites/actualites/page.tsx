import type { Metadata } from "next";
import { ActualitesView } from "@/components/sections/actualites-view";

export const metadata: Metadata = {
  title: "Actualités | ARV Tataouine",
  description:
    "Toutes les actualités de l'Académie Real Valladolid Tataouine : résultats, événements, conseils et coulisses.",
};

export default function ActualitesPage() {
  return <ActualitesView />;
}