import { Target, Users, MapPin, Trophy } from "lucide-react";

export function ValuePropsSection() {
  const props = [
    { icon: Target, title: "Méthodologie Espagnole", desc: "Formation basée sur la philosophie du Real Valladolid" },
    { icon: Users, title: "Encadrement Pro", desc: "Entraîneurs diplômés UEFA, suivi personnalisé" },
    { icon: MapPin, title: "Infrastructures Modernes", desc: "Terrains synthétiques, salle de fitness, analyse vidéo" },
    { icon: Trophy, title: "Opportunités", desc: "Détection pour clubs pro, stages en Espagne" },
  ];

  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Pourquoi nous choisir</h2>
          <p className="mt-4 text-lg text-muted-foreground">Une formation d'excellence pour les footballeurs de demain</p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {props.map((v, i) => (
            <div key={i} className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-xl hover:-translate-y-1">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <v.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}