import type { Metadata } from "next";
import {
  Award,
  Users,
  GraduationCap,
  Plane,
  Star,
  Quote,
  Trophy,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Alumni | ARV Tataouine",
  description: "Nos anciens joueurs et les témoignages des familles.",
};

const stats = [
  { icon: Users, value: "150+", label: "Joueurs formés" },
  { icon: Trophy, value: "23", label: "Devenus pros" },
  { icon: GraduationCap, value: "5", label: "Bourses NCAA" },
  { icon: Plane, value: "30+", label: "Stages en Espagne" },
];

const alumni = [
  { name: "Ahmed Ben Ali", promo: "2020", current: "Espérance de Tunis", role: "Milieu de terrain" },
  { name: "Mohamed Trabelsi", promo: "2019", current: "Université de Californie", role: "Défenseur" },
  { name: "Yassine Hamdi", promo: "2021", current: "Real Valladolid CF", role: "Attaquant" },
];

const testimonials = [
  { name: "Fatma Khelifi", initials: "FK", role: "Parent, U12", quote: "Mon fils a progressé incroyablement en 6 mois. Les entraîneurs sont professionnels et attentionnés." },
  { name: "Mohamed Bouazizi", initials: "MB", role: "Parent, U15", quote: "L'académie offre des opportunités incroyables. Mon fils a participé à un stage en Espagne." },
  { name: "Sami Amara", initials: "SA", role: "Parent, U10", quote: "Les installations sont modernes et bien entretenues. Mon fils adore venir aux entraînements." },
];

export default function AlumniPage() {
  return (
    <div className="flex flex-col bg-white">
      <section className="pt-16 lg:pt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">
            Alumni &amp; témoignages
          </h1>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">
            Ils ont commencé à Tataouine. Découvrez leurs parcours et les
            retours des familles.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="rounded-xl border border-border bg-white p-5"
                >
                  <Icon className="h-5 w-5 text-accent" />
                  <p className="mt-3 text-3xl font-black tabular-nums text-foreground">
                    {s.value}
                  </p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl font-black text-foreground sm:text-3xl">
            Ils ont commencé ici
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {alumni.map((a) => (
              <div
                key={a.name}
                className="overflow-hidden rounded-2xl border border-border bg-white"
              >
                <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-accent/15 to-primary/15">
                  <Award className="h-16 w-16 text-accent/50" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground">{a.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Promotion {a.promo} · {a.role}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-accent">
                    {a.current}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/30 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl font-black text-foreground sm:text-3xl">
            Ce que disent les parents
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-border bg-white p-6"
              >
                <Quote className="h-6 w-6 text-accent/30" />
                <div className="mt-3 flex items-center gap-1 text-accent">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-sm text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                    <span className="text-sm font-semibold text-accent">
                      {t.initials}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      {t.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}