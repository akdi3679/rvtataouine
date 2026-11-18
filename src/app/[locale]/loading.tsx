"use client";

import { usePathname } from "next/navigation";
import { getTeamFromPath, TEAMS } from "@/data/team-theme";

export default function Loading() {
  const pathname = usePathname();
  const team = getTeamFromPath(pathname);
  const theme = TEAMS[team];

  return (
    <div 
      className="flex min-h-[60vh] items-center justify-center bg-white"
      style={{ 
        "--color-primary": theme.vars.primary,
        "--color-primary-dark": theme.vars.primaryDark,
        "--color-primary-light": theme.vars.primaryLight,
      } as React.CSSProperties}
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"
          style={{ 
            borderColor: theme.hex,
            borderTopColor: "transparent"
          }}
          aria-label="Chargement"
        />
        <p className="text-sm font-medium text-muted-foreground">Chargement...</p>
      </div>
    </div>
  );
}