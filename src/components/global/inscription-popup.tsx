"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X, ArrowRight, Calendar, Sparkles } from "lucide-react";

const STORAGE_KEY = "arv-inscription-popup";
const DELAY_MS = 8000;
const RENEW_DAYS = 7;

export function InscriptionPopup() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const ts = Number(stored);
      const daysSince = (Date.now() - ts) / (1000 * 60 * 60 * 24);
      if (daysSince < RENEW_DAYS) return;
    }

    const timer = setTimeout(() => setOpen(true), DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

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
        {/* Close */}
        <button
          onClick={dismiss}
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/60"
          aria-label="Fermer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Image — same as Notre promesse */}
        <div className="relative h-52 overflow-hidden">
          <Image
            src="/images/academy/kids-trophy.jpg"
            alt="Enfants de l'académie avec le trophée"
            fill
            sizes="(max-width: 640px) 100vw, 448px"
            className="object-cover object-[center_30%]"
            priority
          />
          {/* Dark gradient for badge legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Badge */}
          <div className="absolute left-4 top-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur">
              <Sparkles className="h-3 w-3" />
              Inscriptions 2026/27
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <h2
            id="inscription-popup-title"
            className="text-2xl font-black leading-tight text-foreground"
          >
            Rejoignez l&apos;académie
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Inscrivez votre enfant dès aujourd&apos;hui. Première séance
            d&apos;évaluation gratuite, sans engagement.
          </p>

          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
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