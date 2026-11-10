"use client";

import { useState } from "react";
import { Mail, CheckCircle2, Loader2 } from "lucide-react";

export function NewsletterPanel({ variant = "section" }: { variant?: "section" | "inline" | "footer" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 4000);
  };

  // Footer variant - compact, rounded, dark background compatible
  if (variant === "footer" || variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex items-center gap-2 rounded-md border border-background/20 bg-background/5 p-1 backdrop-blur transition-all focus-within:border-background/40 focus-within:bg-background/10">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            required
            disabled={status === "loading"}
            className="flex-1 min-w-0 bg-transparent border-none outline-none text-sm text-background placeholder:text-background/50 px-3 py-1.5"
          />
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="flex-shrink-0 rounded bg-primary px-4 py-1.5 text-xs font-semibold text-white transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : status === "success" ? (
              <CheckCircle2 className="h-3.5 w-3.5" />
            ) : (
              "OK"
            )}
          </button>
        </div>
        {status === "success" && (
          <p className="mt-2 text-xs text-success">Merci ! Vous êtes inscrit.</p>
        )}
      </form>
    );
  }

  // Section variant - full hero style
  return (
    <section className="bg-gradient-to-br from-primary via-primary-dark to-accent-dark py-20 text-white">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur">
          <Mail className="h-7 w-7 text-gold" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ne manquez aucune actualité
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
          Recevez les dernières nouvelles, résultats et événements de l'académie directement dans votre boîte mail.
        </p>

        {status === "success" ? (
          <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-success/20 px-6 py-3 backdrop-blur">
            <CheckCircle2 className="h-5 w-5 text-success" />
            <span className="font-medium">Merci ! Vous êtes inscrit.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-2 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              required
              disabled={status === "loading"}
              className="flex-1 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-white placeholder:text-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-full bg-gold px-8 py-3.5 text-sm font-bold text-primary transition-all hover:bg-gold-light hover:scale-105 disabled:opacity-50"
            >
              {status === "loading" ? "Envoi..." : "S'abonner"}
            </button>
          </form>
        )}

        <p className="mt-4 text-xs text-white/60">
          Pas de spam · Désabonnement en un clic · 1 email par semaine maximum
        </p>
      </div>
    </section>
  );
}