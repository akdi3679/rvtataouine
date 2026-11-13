"use client";

import { useState } from "react";
import {
  Phone, Mail, MapPin, MessageCircle, ArrowRight,
  Loader2, CheckCircle2, HelpCircle, ChevronDown,
} from "lucide-react";
import { brand } from "@/data/brand";
import { TEAM_THEME, type TeamId } from "@/data/team-theme";

const TEAM_OPTIONS: { id: TeamId | "group"; label: string }[] = [
  { id: "group", label: "Le Groupe (toutes les équipes)" },
  { id: "valladolid", label: "Real Valladolid — Football masculin" },
  { id: "ennour", label: "Ennour Sportif — Football féminin" },
  { id: "avenir", label: "Avenir Sportif — Football & Futsal" },
];

const SUBJECTS = [
  { value: "general", label: "Question générale" },
  { value: "inscription", label: "Inscription" },
  { value: "partenariat", label: "Partenariat" },
  { value: "sponsoring", label: "Sponsoring" },
  { value: "other", label: "Autre" },
];

const FAQ = [
  {
    q: "À partir de quel âge mon enfant peut-il s'inscrire ?",
    a: "Nous accueillons les jeunes footballeurs à partir de 8 ans (catégorie U8). Des programmes d'initiation existent pour les débutants.",
  },
  {
    q: "Les séances d'essai sont-elles vraiment gratuites ?",
    a: "Oui, la première séance d'évaluation est entièrement gratuite et sans engagement. Elle nous permet de déterminer la catégorie la plus adaptée.",
  },
  {
    q: "Comment se déroule un partenariat ou sponsoring ?",
    a: "Nous proposons plusieurs formules adaptées à vos objectifs. Contactez-nous via le formulaire en sélectionnant Partenariat ou Sponsoring, nous vous envoyons notre dossier sous 48h.",
  },
  {
    q: "Que se passe-t-il en cas de mauvais temps ?",
    a: "Nos terrains synthétiques permettent de maintenir les entraînements dans la plupart des conditions. En cas de force majeure, les séances sont reportées.",
  },
];

const inputCls =
  "w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none transition-colors";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-foreground">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      {children}
    </div>
  );
}

function ContactCard({
  icon: Icon,
  label,
  value,
  sub,
  href,
  target,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  sub: string;
  href?: string;
  target?: boolean;
}) {
  const inner = (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-white p-4 transition-colors hover:border-foreground/30">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 truncate text-sm font-semibold text-foreground">
          {value}
        </p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">{sub}</p>
      </div>
    </div>
  );
  if (href)
    return (
      <a
        href={href}
        target={target ? "_blank" : undefined}
        rel={target ? "noopener noreferrer" : undefined}
      >
        {inner}
      </a>
    );
  return inner;
}

export default function ContactPage() {
  const phone = brand.phone.replace(/\s+/g, "");
  const whatsapp = brand.whatsapp.replace(/\s+/g, "");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [form, setForm] = useState({
    team: "group" as TeamId | "group",
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
  });

  const set =
    <K extends keyof typeof form>(k: K) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setForm((p) => ({ ...p, [k]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
  };

  const selectedTeamTheme =
    form.team !== "group" ? TEAM_THEME[form.team] : null;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8 lg:py-16">
        <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">
          Contact
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground">
          Une question ? Envie d&apos;inscrire votre enfant ou de devenir
          partenaire ? Nous répondons sous 24h.
        </p>

        {/* Contact cards */}
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <ContactCard
            icon={Phone}
            label="Téléphone"
            value={brand.phone}
            sub="Lun-Sam · 8h-20h"
            href={"tel:" + phone}
          />
          <ContactCard
            icon={Mail}
            label="Email"
            value={brand.email}
            sub="Réponse sous 24h"
            href={"mailto:" + brand.email}
          />
          <ContactCard
            icon={MessageCircle}
            label="WhatsApp"
            value="Discuter maintenant"
            sub="Réponse rapide"
            href={"https://wa.me/" + whatsapp}
            target
          />
          <ContactCard
            icon={MapPin}
            label="Adresse"
            value={brand.address.city}
            sub={brand.address.country}
          />
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-black text-foreground sm:text-3xl">
              Envoyez-nous un message
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Indiquez à quelle équipe votre message est destiné, puis
              choisissez le sujet.
            </p>

            {status === "success" ? (
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-success/20 bg-success/5 p-5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                <div>
                  <p className="font-semibold text-foreground">Message envoyé</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Merci, nous vous répondons sous 24h.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {/* "Ce message concerne" — the selector */}
                <Field label="Ce message concerne" required>
                  <div className="relative">
                    <select
                      required
                      value={form.team}
                      onChange={set("team")}
                      className={`${inputCls} appearance-none pr-10`}
                    >
                      {TEAM_OPTIONS.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                  {selectedTeamTheme && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: selectedTeamTheme.hex }}
                      />
                      Votre message sera transmis à {selectedTeamTheme.name}
                    </p>
                  )}
                </Field>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Nom" required>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={set("name")}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Email" required>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={set("email")}
                      className={inputCls}
                    />
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Téléphone">
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={set("phone")}
                      className={inputCls}
                      placeholder="+216 ..."
                    />
                  </Field>
                  <Field label="Sujet" required>
                    <select
                      required
                      value={form.subject}
                      onChange={set("subject")}
                      className={inputCls}
                    >
                      {SUBJECTS.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Message" required>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={set("message")}
                    className={inputCls}
                    placeholder="Votre message..."
                  />
                </Field>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent/90 disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Envoi...
                    </>
                  ) : (
                    <>
                      Envoyer
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-black text-foreground sm:text-3xl">
              Questions fréquentes
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Les réponses aux questions les plus posées.
            </p>
            <div className="mt-6 space-y-3">
              {FAQ.map((f, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-border bg-white p-4"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-foreground">
                      {f.q}
                    </span>
                    <HelpCircle className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-45" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}