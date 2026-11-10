import Link from "next/link";
import { ArrowRight, Heart, Target, MapPin } from "lucide-react";

const PILLARS = [
  { icon: Target, label: "Philosophie", value: "4 piliers de formation" },
  { icon: MapPin, label: "Installations", value: "Qualité professionnelle" },
  { icon: Heart, label: "Valeurs", value: "Respect et excellence" },
];

export function ClubPreviewSection() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* ── Left: story ── */}
          <div>
            <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="h-px w-10 bg-accent" />
              Notre histoire
            </span>

            <h2 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
              Plus qu'un club,
              <span className="block text-accent">une famille</span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground lg:text-lg">
              Fondée en 2016, notre académie est née d'une vision : apporter
              l'excellence du football européen au sud de la Tunisie. Grâce à
              notre partenariat avec le Real Valladolid CF, nous formons les
              champions de demain avec une méthodologie éprouvée.
            </p>

            {/* 3 pillars — clean text, no cards */}
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
              {PILLARS.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.label}>
                    <Icon className="h-5 w-5 text-accent" />
                    <p className="mt-3 text-sm font-semibold leading-tight text-foreground">
                      {p.label}
                    </p>
                    <p className="mt-1 text-xs leading-snug text-muted-foreground">
                      {p.value}
                    </p>
                  </div>
                );
              })}
            </div>

            <Link
              href="/club"
              className="group mt-10 inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-85"
            >
              Découvrir notre club
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* ── Right: 10-year typographic ── */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Notre parcours
            </p>

            <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-2">
              <span className="text-6xl font-black tracking-tighter text-foreground sm:text-7xl lg:text-8xl">
                2016
              </span>
              <span className="text-2xl font-light text-muted-foreground sm:text-3xl lg:text-4xl">
                →
              </span>
              <span className="text-6xl font-black tracking-tighter text-foreground sm:text-7xl lg:text-8xl">
                2026
              </span>
            </div>

            <p className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground">
              Dix ans d'excellence et de formation au service des jeunes
              talents du sud tunisien.
            </p>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-border pt-8">
              <div>
                <p className="text-4xl font-black tabular-nums tracking-tight text-foreground lg:text-5xl">
                  150<span className="text-accent">+</span>
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Joueurs formés
                </p>
              </div>
              <div>
                <p className="text-4xl font-black tabular-nums tracking-tight text-foreground lg:text-5xl">
                  23
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Devenus pros
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}