"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { getTeamVars, TEAMS } from "@/data/team-theme";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  const theme = TEAMS.group;

  return (
    <html>
      <body>
        <div style={getTeamVars("group")} className="flex min-h-screen items-center justify-center bg-white px-6">
          <div className="mx-auto max-w-md text-center">
            <div
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl"
              style={{ backgroundColor: theme.hex + "20" }}
            >
              <AlertTriangle className="h-8 w-8" style={{ color: theme.hex }} />
            </div>
            <h1 className="mt-6 text-3xl font-black text-foreground">
              Erreur critique
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Une erreur inattendue s'est produite. Veuillez réessayer.
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
      </body>
    </html>
  );
}