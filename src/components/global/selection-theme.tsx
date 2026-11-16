"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getTeamFromPath, TEAMS } from "@/data/team-theme";

/**
 * Sets --selection-bg and --selection-text on <html> based on the current team.
 * globals.css reads them in ::selection rules.
 */
export function SelectionTheme() {
  const pathname = usePathname();

  useEffect(() => {
    const team = getTeamFromPath(pathname);
    const theme = TEAMS[team];
    document.documentElement.style.setProperty("--selection-bg", theme.selectionBg);
    document.documentElement.style.setProperty("--selection-text", theme.selectionText);
  }, [pathname]);

  return null;
}