import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "Connexion | ARV Tataouine",
    template: "%s | ARV Tataouine",
  },
  robots: { index: false, follow: false }, // Keep auth pages out of search engines
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white font-bold text-lg">
              ARV
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-sm text-foreground">ARV Tataouine</div>
              <div className="text-xs text-muted-foreground">Espace sécurisé</div>
            </div>
          </Link>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Retour au site
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-6 py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border bg-background/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-6 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Académie Real Valladolid Tataouine. Tous droits réservés.</p>
          <div className="mt-2 flex items-center justify-center gap-4">
            <Link href="/mentions-legales" className="hover:text-foreground transition-colors">
              Mentions légales
            </Link>
            <Link href="/politique-confidentialite" className="hover:text-foreground transition-colors">
              Confidentialité
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}