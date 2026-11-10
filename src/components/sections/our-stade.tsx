import Link from "next/link";
import { ArrowRight, Calendar, CheckCircle2, MapPin, Shield, Users } from "lucide-react";

export function OurStadeSection() {
  const features = [
    "Terrain synthétique adapté aux entraînements intensifs",
    "Éclairage pour les séances du soir",
    "Espace sécurisé pour les jeunes joueurs",
    "Accès aux vestiaires et zone de préparation",
  ];

  return (
    <section id="stade" className="bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
            <div className="relative aspect-[16/10] bg-gradient-to-br from-primary/25 via-accent/15 to-primary-dark/30">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_0,transparent_55%)] opacity-10" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="mx-auto h-20 w-20 text-primary/50" />
                  <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-primary">
                    Stade Municipal
                  </p>
                  <p className="mt-1 text-2xl font-bold text-foreground">
                    Tataouine
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 border-t border-border p-6 sm:grid-cols-3">
              <div>
                <p className="text-2xl font-black text-primary">150+</p>
                <p className="text-xs text-muted-foreground">Jeunes accueillis</p>
              </div>
              <div>
                <p className="text-2xl font-black text-primary">4</p>
                <p className="text-xs text-muted-foreground">Catégories</p>
              </div>
              <div>
                <p className="text-2xl font-black text-primary">6j/7</p>
                <p className="text-xs text-muted-foreground">Activité sportive</p>
              </div>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 rounded bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <MapPin className="h-4 w-4" />
              Notre stade
            </div>

            <h2 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Un lieu pour apprendre,
              <span className="block text-primary">progresser et gagner</span>
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Notre stade est le cœur de l’académie. C’est là que les joueurs développent leur technique,
              leur discipline et leur esprit d’équipe dans un cadre sécurisé et professionnel.
            </p>

            <div className="mt-8 space-y-3">
              {features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-success" />
                  <p className="text-sm text-foreground">{feature}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-4">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="mt-3 font-semibold text-foreground">Sécurité</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Encadrement présent et espace adapté aux jeunes.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-4">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="mt-3 font-semibold text-foreground">Esprit collectif</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Un lieu où chaque joueur apprend à jouer avec les autres.
                </p>
              </div>
            </div>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
            >
              Planifier une visite
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}