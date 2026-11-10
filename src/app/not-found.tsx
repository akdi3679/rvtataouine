import Link from "next/link";
import { Home, Search, ArrowRight, Trophy, ShoppingBag, Calendar } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 py-24 text-center">
      {/* Big 404 */}
      <div className="relative">
        <div className="text-[180px] font-black leading-none text-primary/10 sm:text-[240px]">404</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Trophy className="mx-auto h-16 w-16 text-primary" />
            <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">Page non trouvée</h2>
            <p className="mt-3 max-w-md text-muted-foreground">
              La page que vous recherchez n'existe pas ou a été déplacée. Comme un ballon hors du terrain !
            </p>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
        <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary/90 hover:scale-105">
          <Home className="h-4 w-4" />
          Retour à l'accueil
        </Link>
        <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary">
          Nous contacter
        </Link>
      </div>

      {/* Popular pages */}
      <div className="mt-16 w-full max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-6">
          Pages populaires
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { href: "/club", label: "Notre Club", icon: Trophy, desc: "Histoire et philosophie" },
            { href: "/matchs", label: "Matchs", icon: Calendar, desc: "Calendrier et résultats" },
            { href: "/boutique", label: "Boutique", icon: ShoppingBag, desc: "Maillots et équipements" },
            { href: "/actualites", label: "Actualités", icon: Search, desc: "Dernières nouvelles" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <link.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-foreground">{link.label}</div>
                <div className="text-xs text-muted-foreground">{link.desc}</div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}