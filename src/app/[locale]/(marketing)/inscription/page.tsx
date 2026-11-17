"use client";

import { useState } from "react";

import { TEAMS, ENTITY_LIST, parseTeamQuery, type TeamId } from "@/data/team-theme";
import { CheckCircle2, Loader2, User, Users, FileCheck2, Shield } from "lucide-react";
import { TeamIcon } from "@/components/global/icon";
import { useSearchParams } from "next/navigation";
const inputCls =
  "w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none transition-colors";

function Field({
  label,
  required,
  className = "",
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-xs font-semibold text-foreground">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      {children}
    </div>
  );
}

export default function InscriptionPage() {
  const searchParams = useSearchParams();
 const teamParam = parseTeamQuery(searchParams.get("team"));
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [form, setForm] = useState({
     team: (teamParam === "all" ? "" : teamParam) as TeamId | "",
    childFirst: "",
    childLast: "",
    childDob: "",
    childGender: "",
    category: "",
    parentFirst: "",
    parentLast: "",
    parentEmail: "",
    parentPhone: "",
    parentRelation: "",
    message: "",
    consent: false,
  });
  const set =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const value =
        e.target.type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : e.target.value;
      setForm((prev) => ({ ...prev, [key]: value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.team) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  };

  if (status === "success") {
const selectedTheme = form.team ? TEAMS[form.team as TeamId] : null;
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-white px-6 py-20">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
          <h1 className="mt-6 text-2xl font-black text-foreground">
            Demande envoyée
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Merci ! Nous avons bien reçu votre demande d&apos;inscription
            {selectedTheme && ` pour ${selectedTheme.name}`}. Notre équipe vous
            contactera sous 48h pour planifier la séance d&apos;évaluation
            gratuite.
          </p>
        </div>
      </div>
    );
  }

const selectedTheme = form.team ? TEAMS[form.team as TeamId] : null;
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-6 py-10 lg:px-8 lg:py-16">
        <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">
          Inscription
        </h1>
        <p className="mt-3 max-w-xl text-base text-muted-foreground">
          Rejoignez l&apos;une de nos trois équipes. Remplissez le formulaire,
          nous vous contacterons pour organiser une séance d&apos;évaluation
          gratuite.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-8">
          {/* 1. Team selection */}
          <fieldset className="rounded-2xl border border-border bg-white p-6">
            <legend className="flex items-center gap-2 px-2 text-sm font-bold text-foreground">
              <Shield className="h-4 w-4 text-accent" />
              Quelle équipe vous intéresse ?
            </legend>
                     {/* 1. Team selection */}
          <div className="relative -mt-12 mb-8 z-10">
            <div className="grid gap-4 sm:grid-cols-3">
              {ENTITY_LIST.map((t) => {
                const active = form.team === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, team: t.id }))}
                    className={`group relative flex flex-col items-center rounded-2xl border-2 bg-white p-6 pt-10 text-center transition-all ${
                      active ? `${t.borderClass} shadow-xl` : "border-border hover:border-foreground/20 hover:shadow-md"
                    }`}
                  >
                    {/* Logo popping out */}
                    <div className="absolute -top-8 flex h-16 w-16 items-center justify-center rounded-full bg-white p-2 shadow-lg ring-4 ring-white">
                      <div className="relative h-full w-full">
                        <Image src={t.logoPath} alt={t.name} fill className="object-contain" />
                      </div>
                    </div>
                    
                    <p className="mt-2 text-sm font-bold leading-tight text-foreground">{t.name}</p>
                    <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      {t.formTagline}
                    </p>
                    
                    {active && (
                      <span
                        className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full text-white"
                        style={{ backgroundColor: t.hex }}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          </fieldset>

          {/* 2. Child */}
          <fieldset className="rounded-2xl border border-border bg-white p-6">
            <legend className="flex items-center gap-2 px-2 text-sm font-bold text-foreground">
              <User className="h-4 w-4 text-accent" />
              Informations de l&apos;enfant
            </legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Prénom" required>
                <input
                  type="text"
                  required
                  value={form.childFirst}
                  onChange={set("childFirst")}
                  className={inputCls}
                />
              </Field>
              <Field label="Nom" required>
                <input
                  type="text"
                  required
                  value={form.childLast}
                  onChange={set("childLast")}
                  className={inputCls}
                />
              </Field>
              <Field label="Date de naissance" required>
                <input
                  type="date"
                  required
                  value={form.childDob}
                  onChange={set("childDob")}
                  className={inputCls}
                />
              </Field>
              <Field label="Genre" required>
                <select
                  required
                  value={form.childGender}
                  onChange={set("childGender")}
                  className={inputCls}
                >
                  <option value="">Sélectionner</option>
                  <option value="M">Garçon</option>
                  <option value="F">Fille</option>
                </select>
              </Field>
              <Field
                label="Catégorie souhaitée"
                required
                className="sm:col-span-2"
              >
                <select
                  required
                  value={form.category}
                  onChange={set("category")}
                  className={inputCls}
                >
                  <option value="">Sélectionner une catégorie</option>
                  <option value="u8">U8-U10 (8-10 ans)</option>
                  <option value="u12">U11-U13 (11-13 ans)</option>
                  <option value="u15">U14-U15 (14-15 ans)</option>
                  <option value="u18">U16-U18 (16-18 ans)</option>
                </select>
              </Field>
            </div>
          </fieldset>

          {/* 3. Parent */}
          <fieldset className="rounded-2xl border border-border bg-white p-6">
            <legend className="flex items-center gap-2 px-2 text-sm font-bold text-foreground">
              <Users className="h-4 w-4 text-accent" />
              Informations du parent / tuteur
            </legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Prénom" required>
                <input
                  type="text"
                  required
                  value={form.parentFirst}
                  onChange={set("parentFirst")}
                  className={inputCls}
                />
              </Field>
              <Field label="Nom" required>
                <input
                  type="text"
                  required
                  value={form.parentLast}
                  onChange={set("parentLast")}
                  className={inputCls}
                />
              </Field>
              <Field label="Email" required>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={form.parentEmail}
                  onChange={set("parentEmail")}
                  className={inputCls}
                />
              </Field>
              <Field label="Téléphone" required>
                <input
                  type="tel"
                  required
                  autoComplete="tel"
                  value={form.parentPhone}
                  onChange={set("parentPhone")}
                  className={inputCls}
                  placeholder="+216 ..."
                />
              </Field>
              <Field
                label="Relation avec l'enfant"
                required
                className="sm:col-span-2"
              >
                <select
                  required
                  value={form.parentRelation}
                  onChange={set("parentRelation")}
                  className={inputCls}
                >
                  <option value="">Sélectionner</option>
                  <option value="father">Père</option>
                  <option value="mother">Mère</option>
                  <option value="guardian">Tuteur légal</option>
                  <option value="other">Autre</option>
                </select>
              </Field>
            </div>
          </fieldset>

          {/* 4. Complementary */}
          <fieldset className="rounded-2xl border border-border bg-white p-6">
            <legend className="flex items-center gap-2 px-2 text-sm font-bold text-foreground">
              <FileCheck2 className="h-4 w-4 text-accent" />
              Informations complémentaires
            </legend>
            <div className="mt-4">
              <Field label="Message (optionnel)">
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={set("message")}
                  className={inputCls}
                  placeholder="Questions, remarques, expérience du football..."
                />
              </Field>
              <label className="mt-6 flex items-start gap-3 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  required
                  checked={form.consent}
                  onChange={set("consent")}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-foreground"
                />
                <span>
                  J&apos;accepte que mes données soient utilisées pour le
                  traitement de cette demande, conformément à la politique de
                  confidentialité. *
                </span>
              </label>
            </div>
          </fieldset>

                    <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-secondary/30 p-6 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              * Champs obligatoires
              {selectedTheme && (
                <span className="ml-2 inline-flex items-center gap-1">
                  · Équipe :{" "}
                  <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: selectedTheme.hex }} />
                  <strong>{selectedTheme.name}</strong>
                </span>
              )}
            </p>
            <button
              type="submit"
              disabled={status === "loading" || !form.team}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              style={{ backgroundColor: selectedTheme ? selectedTheme.hex : TEAMS.group.hex }}
            >
              {status === "loading" ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Envoi...</>
              ) : (
                "Envoyer la demande"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}