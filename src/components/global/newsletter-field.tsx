"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

export function NewsletterField() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="votre@email.com"
        required
        disabled={status === "loading"}
        className="w-full bg-background/5 border border-background/20 rounded px-3 py-2 pr-10 text-xs text-background placeholder:text-background/40 focus:outline-none focus:border-background/40 transition-colors disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-background/40 hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="S'abonner"
      >
        {status === "loading" ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : status === "success" ? (
          <CheckCircle2 className="h-3.5 w-3.5 text-success" />
        ) : (
          <Send className="h-3.5 w-3.5" />
        )}
      </button>
    </form>
  );
}