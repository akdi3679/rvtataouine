"use client";

import { useRouter, usePathname } from "next/navigation";
import { ChevronDown, Check, Globe } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { TEAMS, ENTITY_LIST, type TeamId } from "@/data/team-theme";
import Image from "next/image";

export function TeamFilter({ currentTeam }: { currentTeam: TeamId | "all" }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const allLabel = "Toutes les équipes";
  const current = currentTeam === "all" ? null : TEAMS[currentTeam];

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleSelect = (id: TeamId | "all") => {
    const baseUrl = pathname.split("?")[0];
    const url = id === "all" ? baseUrl : `${baseUrl}?team=${id}`;
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
        {current ? (
          <div className="relative h-5 w-5 overflow-hidden rounded-full bg-white">
            <Image src={current.logoPath} alt={current.name} fill className="object-contain p-0.5" />
          </div>
        ) : (
          <Globe className="h-4 w-4 text-muted-foreground" />
        )}
        <span className="whitespace-nowrap">
          {current ? current.name : allLabel}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-lg border border-border bg-white shadow-xl"
          role="listbox"
        >
          <button
            onClick={() => handleSelect("all")}
            className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors ${
              currentTeam === "all" ? "bg-secondary font-semibold text-foreground" : "text-foreground hover:bg-secondary/50"
            }`}
            role="option"
            aria-selected={currentTeam === "all"}
          >
            <Globe className="h-4 w-4 text-muted-foreground" />
            <span className="flex-1">{allLabel}</span>
            {currentTeam === "all" && <Check className="h-4 w-4" />}
          </button>

          {ENTITY_LIST.map((team) => {
            const active = currentTeam === team.id;
            return (
              <button
                key={team.id}
                onClick={() => handleSelect(team.id)}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors ${
                  active ? "bg-secondary font-semibold text-foreground" : "text-foreground hover:bg-secondary/50"
                }`}
                role="option"
                aria-selected={active}
              >
                <div className="relative h-5 w-5 overflow-hidden rounded-full bg-white">
                  <Image src={team.logoPath} alt={team.name} fill className="object-contain p-0.5" />
                </div>
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