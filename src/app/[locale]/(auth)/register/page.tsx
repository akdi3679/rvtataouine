"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, User, Loader2, Shield, AlertCircle, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    setLoading(true);

    try {
      // TODO: Replace with actual Auth.js signUp
      // const result = await signUp({ name, email, password });
      // if (result?.error) {
      //   setError(result.error);
      //   setLoading(false);
      //   return;
      // }
      // router.push("/login?registered=true");

      // Simulated for now
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Register attempt:", { name, email });
      setError("Inscription simulée. Intégrez Auth.js pour activer l'inscription.");
      setLoading(false);
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
      setLoading(false);
    }
  };

  // Password strength indicator
  const getPasswordStrength = (pwd: string) => {
    if (pwd.length === 0) return { strength: 0, label: "" };
    if (pwd.length < 8) return { strength: 1, label: "Faible" };
    if (pwd.length < 12) return { strength: 2, label: "Moyen" };
    if (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(pwd)) return { strength: 3, label: "Fort" };
    return { strength: 2, label: "Moyen" };
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="w-full max-w-md">
      {/* Card */}
      <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <User className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Créer un compte</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Rejoignez l'espace parent de l'académie
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
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-foreground">
              Nom complet
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-input bg-background pl-11 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                placeholder="Votre nom"
                required
                autoComplete="name"
                disabled={loading}
              />
            </div>
          </div>

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
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Mot de passe
            </label>
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
                autoComplete="new-password"
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

            {/* Password strength */}
            {password.length > 0 && (
              <div className="space-y-1.5">
                <div className="flex gap-1">
                  {[1, 2, 3].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        level <= passwordStrength.strength
                          ? passwordStrength.strength === 1
                            ? "bg-destructive"
                            : passwordStrength.strength === 2
                            ? "bg-warning"
                            : "bg-success"
                          : "bg-border"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Force : <span className="font-medium">{passwordStrength.label}</span>
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
              Confirmer le mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border border-input bg-background pl-11 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                placeholder="••••••••"
                required
                autoComplete="new-password"
                disabled={loading}
              />
              {confirmPassword.length > 0 && password === confirmPassword && (
                <CheckCircle2 className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-success" />
              )}
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3">
            <input
              id="terms"
              type="checkbox"
              required
              disabled={loading}
              className="mt-1 h-4 w-4 rounded border-input text-primary focus:ring-ring"
            />
            <label htmlFor="terms" className="text-xs text-muted-foreground">
              J'accepte les{" "}
              <Link href="/cgv" className="font-medium text-primary hover:text-primary/80">
                conditions générales
              </Link>{" "}
              et la{" "}
              <Link href="/politique-confidentialite" className="font-medium text-primary hover:text-primary/80">
                politique de confidentialité
              </Link>
            </label>
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
                Création du compte...
              </>
            ) : (
              "Créer mon compte"
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
          Vous avez déjà un compte ?{" "}
          <Link href="/login" className="font-medium text-primary hover:text-primary/80 transition-colors">
            Se connecter
          </Link>
        </div>
      </div>

      {/* Trust signals */}
      <div className="mt-6 text-center">
        <p className="text-xs text-muted-foreground">
          🔒 Données sécurisées · Conforme RGPD
        </p>
      </div>
    </div>
  );
}