"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Loader2, KeyRound, AlertCircle, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // TODO: Replace with actual password reset logic
      // await sendPasswordResetEmail(email);

      // Simulated for now
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Password reset request:", email);
      setSuccess(true);
      setLoading(false);
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Card */}
      <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <KeyRound className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Mot de passe oublié</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Entrez votre adresse email pour recevoir un lien de réinitialisation
          </p>
        </div>

        {/* Success state */}
        {success ? (
          <div className="space-y-6">
            <div className="flex items-start gap-3 rounded-lg border border-success/20 bg-success/5 p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-success" />
              <div className="flex-1">
                <p className="text-sm font-medium text-success">Email envoyé !</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Si un compte existe avec l'adresse <strong className="text-foreground">{email}</strong>, vous recevrez un email avec les instructions pour réinitialiser votre mot de passe.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Vous n'avez pas reçu l'email ? Vérifiez votre dossier spam ou réessayez.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Renvoyer l'email
              </button>
              <Link
                href="/login"
                className="block w-full text-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
              >
                Retour à la connexion
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Error message */}
            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-4">
                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
                <div className="flex-1 text-sm text-destructive">{error}</div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Adresse email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background pl-11 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    placeholder="votre@email.com"
                    required
                    autoComplete="email"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  "Envoyer le lien de réinitialisation"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">OU</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            {/* Login link */}
            <div className="text-center text-sm text-muted-foreground">
              Vous vous souvenez de votre mot de passe ?{" "}
              <Link href="/login" className="font-medium text-primary hover:text-primary/80 transition-colors">
                Se connecter
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Trust signals */}
      <div className="mt-6 text-center">
        <p className="text-xs text-muted-foreground">
          🔒 Lien sécurisé · Expiration dans 1 heure
        </p>
      </div>
    </div>
  );
}