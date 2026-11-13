"use client";

import { useRouter, usePathname } from "next/navigation";
import { TEAM_THEME, type TeamId } from "@/data/team-theme";

const OPTIONS: { id: TeamId | "all"; label: string }[] = [
  { id: "all", label: "Tous" },
  { id: "valladolid", label: "Real Valladolid" },
  { id: "ennour", label: "Ennour" },
  { id: "avenir", label: "Avenir" },
];

export function TeamFilter({ currentTeam }: { currentTeam: TeamId | "all" }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (id: TeamId | "all") => {
    const url = id === "all" ? pathname : `${pathname}?team=${id}`;
    router.push(url, { scroll: false });
  };

  return (
    <div className="flex flex-wrap gap-1.5">
      {OPTIONS.map((opt) => {
        const active = currentTeam === opt.id;
        const theme = opt.id !== "all" ? TEAM_THEME[opt.id] : null;

        return (
          <button
            key={opt.id}
            onClick={() => handleClick(opt.id)}
            className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-xs font-semibold transition-colors ${
              active
                ? theme
                  ? `${theme.bgClass} text-white`
                  : "bg-foreground text-background"
                : "border border-border bg-white text-foreground hover:border-foreground/30 hover:bg-secondary/50"
            }`}
          >
            {theme && (
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: active ? "#fff" : theme.hex }}
              />
            )}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}