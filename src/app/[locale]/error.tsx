"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { getTeamFromPath, getTeamVars, TEAMS } from "@/data/team-theme";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname();
  const team = getTeamFromPath(pathname);
  const theme = TEAMS[team];

  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div style={getTeamVars(team)} className="flex min-h-[80vh] items-center justify-center bg-white px-6">
      <div className="mx-auto max-w-md text-center">
        <div
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{ backgroundColor: theme.hex + "20" }}
        >
          <AlertTriangle className="h-8 w-8" style={{ color: theme.hex }} />
        </div>
        <h1 className="mt-6 text-3xl font-black text-foreground">
          Oups, une erreur est survenue
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Quelque chose s'est mal passé. Veuillez réessayer ou retourner à l'accueil.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: theme.hex }}
          >
            <RefreshCw className="h-4 w-4" />
            Réessayer
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            <Home className="h-4 w-4" />
            Accueil
          </Link>
        </div>
      </div>
    </div>
  );
}