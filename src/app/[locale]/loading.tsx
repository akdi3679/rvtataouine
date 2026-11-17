"use client";

import { usePathname } from "next/navigation";
import { getTeamFromPath, getTeamVars, TEAMS } from "@/data/team-theme";

export default function Loading() {
  const pathname = usePathname();
  const team = getTeamFromPath(pathname);
  const theme = TEAMS[team];

  return (
    <div style={getTeamVars(team)} className="flex min-h-[60vh] items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-12 w-12 animate-spin rounded-full border-4 border-current border-t-transparent"
          style={{ color: theme.hex }}
          aria-label="Chargement"
        />
        <p className="text-sm font-medium text-muted-foreground">Chargement...</p>
      </div>
    </div>
  );
}