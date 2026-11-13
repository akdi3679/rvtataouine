"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

const STORAGE_KEY = "arv-cookie-consent";
const RENEW_DAYS = 180;

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const daysSince =
          (Date.now() - Number(parsed.ts)) / (1000 * 60 * 60 * 24);
        if (daysSince < RENEW_DAYS) return;
      } catch {
        // old format "accepted"/"rejected" — ignore and re-show
      }
    }

    const timer = setTimeout(() => setShow(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const save = (choice: "accepted" | "rejected") => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ choice, ts: Date.now() }),
    );
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-2xl animate-in slide-in-from-bottom-4 fade-in duration-300 sm:inset-x-4 sm:bottom-4"
      role="dialog"
      aria-label="Préférences de cookies"
    >
      <div className="relative rounded-2xl border border-border bg-white shadow-xl">
        <button
          onClick={() => save("rejected")}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Refuser et fermer"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        <div className="flex flex-col gap-4 p-4 pr-10 sm:flex-row sm:items-center sm:gap-6 sm:p-5 sm:pr-12">
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">
              Votre vie privée
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Nous utilisons uniquement des cookies nécessaires au
              fonctionnement du site.{" "}
              <Link
                href="/valladolid/cookies"
                className="font-semibold text-foreground underline underline-offset-2 hover:opacity-70"
              >
                En savoir plus
              </Link>
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={() => save("rejected")}
              className="flex-1 rounded-lg border border-border bg-white px-4 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-secondary sm:flex-initial"
            >
              Refuser
            </button>
            <button
              onClick={() => save("accepted")}
              className="flex-1 rounded-lg bg-foreground px-4 py-2.5 text-xs font-semibold text-background transition-opacity hover:opacity-85 sm:flex-initial"
            >
              Accepter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}