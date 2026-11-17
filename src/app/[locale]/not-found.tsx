"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search } from "lucide-react";
import { getTeamFromPath, getTeamVars, TEAMS } from "@/data/team-theme";

export default function NotFound() {
  const pathname = usePathname();
  const team = getTeamFromPath(pathname);
  const theme = TEAMS[team];

  return (
    <div style={getTeamVars(team)} className="flex min-h-[80vh] items-center justify-center bg-white px-6">
      <div className="mx-auto max-w-md text-center">
        <div
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl"
          style={{ backgroundColor: theme.hex + "20" }}
        >
          <span className="text-4xl font-black" style={{ color: theme.hex }}>
            404
          </span>
        </div>
        <h1 className="mt-6 text-3xl font-black text-foreground">
          Page introuvable
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: theme.hex }}
          >
            <Home className="h-4 w-4" />
            Retour à l'accueil
          </Link>
          <Link
            href="/actualites"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            <Search className="h-4 w-4" />
            Explorer les actualités
          </Link>
        </div>
      </div>
    </div>
  );
}