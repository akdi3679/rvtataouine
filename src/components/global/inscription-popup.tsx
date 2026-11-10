"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X, ArrowRight, Calendar } from "lucide-react";

const STORAGE_KEY = "arv-inscription-popup-last-shown";
const INITIAL_DELAY_MS = 8000; // 8s avant la 1ère apparition (1er visit)
const REPEAT_AFTER_MS = 20 * 60 * 1000; // 20 minutes
const CHECK_INTERVAL_MS = 30 * 1000; // vérifie toutes les 30s

export function InscriptionPopup() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Timer — 8s première fois, puis toutes les 20 min
  useEffect(() => {
    if (typeof window === "undefined") return;

    const check = () => {
      if (open) return;

      const raw = localStorage.getItem(STORAGE_KEY);
      const lastShown = raw ? Number(raw) : 0;

      if (lastShown === 0) {
        // Première visite — affiche après 8s
        setOpen(true);
      } else if (Date.now() - lastShown >= REPEAT_AFTER_MS) {
        // 20 min passées — affiche à nouveau
        setOpen(true);
      }
    };

    const initialTimer = setTimeout(check, INITIAL_DELAY_MS);
    const interval = setInterval(check, CHECK_INTERVAL_MS);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [open]);

  // Lock scroll pendant l'ouverture
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // ESC pour fermer
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    setOpen(false);
  };

  const goToInscription = () => {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    setOpen(false);
    router.push("/inscription");
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[95] flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inscription-popup-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={dismiss}
        aria-hidden="true"
      />

      {/* Card */}
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl animate-in slide-in-from-bottom-4 fade-in duration-300">
        {/* Close — sobre sur fond blanc */}
        <button
          onClick={dismiss}
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Fermer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Image — sans fond, sans gradient, taille naturelle */}
        <div className="flex justify-center px-8 pt-8">
          <Image
            src="/images/academy/popup.jpg"
            alt="Enfants de l'académie"
            width={400}
            height={400}
            priority
            className="h-auto w-full max-w-[240px] object-contain"
          />
        </div>

        {/* Body */}
        <div className="px-6 pb-6 pt-4 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent">
            Inscriptions 2026/27
          </span>

          <h2
            id="inscription-popup-title"
            className="mt-3 text-2xl font-black leading-tight text-foreground"
          >
            Rejoignez l&apos;académie
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Inscrivez votre enfant dès aujourd&apos;hui. Première séance
            d&apos;évaluation gratuite, sans engagement.
          </p>

          <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>Places limitées · Sessions dès septembre</span>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <button
              onClick={goToInscription}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent/90 hover:shadow-xl"
            >
              S&apos;inscrire maintenant
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={dismiss}
              className="w-full rounded-xl px-6 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Plus tard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}