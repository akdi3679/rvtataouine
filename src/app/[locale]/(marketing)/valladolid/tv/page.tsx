import type { Metadata } from "next";
import { TvView } from "@/components/sections/tv-view";

export const metadata: Metadata = {
  title: "ARV TV | ARV Tataouine",
  description:
    "Toutes les vidéos de l'Académie Real Valladolid Tataouine : matchs, interviews, coulisses et tutoriels.",
};

export default function TvPage() {
  return <TvView />;
}