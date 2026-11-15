"use client";

import { useRouter, usePathname } from "next/navigation";
import { ChevronDown, Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { TEAMS, ENTITY_LIST, type TeamId } from "@/data/team-theme";

export function TeamFilter({ currentTeam }: { currentTeam: TeamId | "all" }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const allLabel = "Toutes les équipes";
  const current =
    currentTeam === "all" ? null : TEAMS[currentTeam];

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleSelect = (id: TeamId | "all") => {
    const url = id === "all" ? pathname : `${pathname}?team=${id}`;
    router.push(url, { scroll: false });
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2.5 rounded-md border border-border bg-white px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-foreground/30 hover:bg-secondary/50"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {current && (
          <span
            className="h-2 w-2 rounded-full shrink-0"
            style={{ backgroundColor: current.hex }}
          />
        )}
        <span className="whitespace-nowrap">
          {current ? current.name : allLabel}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-lg border border-border bg-white shadow-xl"
          role="listbox"
        >
          <button
            onClick={() => handleSelect("all")}
            className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors ${
              currentTeam === "all"
                ? "bg-secondary font-semibold text-foreground"
                : "text-foreground hover:bg-secondary/50"
            }`}
            role="option"
            aria-selected={currentTeam === "all"}
          >
            <span className="flex-1">{allLabel}</span>
            {currentTeam === "all" && <Check className="h-4 w-4" />}
          </button>

          {ENTITY_LIST.map((team) => {
            const active = currentTeam === team.id;
            return (
              <button
                key={team.id}
                onClick={() => handleSelect(team.id)}
                className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors ${
                  active
                    ? "bg-secondary font-semibold text-foreground"
                    : "text-foreground hover:bg-secondary/50"
                }`}
                role="option"
                aria-selected={active}
              >
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: team.hex }}
                />
                <span className="flex-1">{team.name}</span>
                {active && <Check className="h-4 w-4" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}