import { Star } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    { name: "Fatma Khelifi", initials: "FK", role: "Parent, U12", quote: "Mon fils a progressé incroyablement en 6 mois. Les entraîneurs sont professionnels et attentionnés." },
    { name: "Mohamed Bouazizi", initials: "MB", role: "Parent, U15", quote: "L'académie offre des opportunités incroyables. Mon fils a participé à un stage en Espagne." },
    { name: "Sami Amara", initials: "SA", role: "Parent, U10", quote: "Les installations sont modernes et bien entretenues. Mon fils adore venir aux entraînements." },
  ];

  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Ce que disent les parents</h2>
          <p className="mt-4 text-lg text-muted-foreground">La confiance des familles</p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-lg">
              <div className="flex items-center gap-1 text-gold">
                {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-4 text-sm text-foreground">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-sm font-semibold text-primary">{t.initials}</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}