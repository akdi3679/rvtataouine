"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, Loader2, Shield, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/app/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // TODO: Replace with actual Auth.js signIn
      // const result = await signIn("credentials", { email, password, redirect: false });
      // if (result?.error) {
      //   setError("Email ou mot de passe incorrect");
      //   setLoading(false);
      //   return;
      // }
      // router.push(redirectTo);

      // Simulated for now
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Login attempt:", { email, password });
      setError("Connexion simulée. Intégrez Auth.js pour activer la connexion.");
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
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Connexion</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Accédez à votre espace parent ou administrateur
          </p>
        </div>

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

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Mot de passe
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Mot de passe oublié ?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-input bg-background pl-11 pr-11 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                placeholder="••••••••"
                required
                autoComplete="current-password"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
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
                Connexion en cours...
              </>
            ) : (
              "Se connecter"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">OU</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Register link */}
        <div className="text-center text-sm text-muted-foreground">
          Vous n'avez pas de compte ?{" "}
          <Link href="/register" className="font-medium text-primary hover:text-primary/80 transition-colors">
            Créer un compte
          </Link>
        </div>
      </div>

      {/* Trust signals */}
      <div className="mt-6 text-center">
        <p className="text-xs text-muted-foreground">
          🔒 Connexion sécurisée · Données protégées
        </p>
      </div>
    </div>
  );
}