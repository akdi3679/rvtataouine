"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, User, Users, FileCheck2 } from "lucide-react";

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
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [form, setForm] = useState({
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
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  };

  if (status === "success") {
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
            Merci ! Nous avons bien reçu votre demande d&apos;inscription. Notre
            équipe vous contactera sous 48h pour planifier la séance
            d&apos;évaluation gratuite.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-6 py-10 lg:px-8 lg:py-16">
        <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">
          Inscription
        </h1>
        <p className="mt-3 max-w-xl text-base text-muted-foreground">
          Rejoignez l&apos;académie en 4 étapes simples. Remplissez le
          formulaire, nous vous contacterons pour organiser une séance
          d&apos;évaluation gratuite.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-8">
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

          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              * Champs obligatoires
            </p>
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Envoi...
                </>
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