import Link from "next/link";
import { FileText, Users, Calendar, CheckCircle2, ArrowRight } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    { step: "1", title: "Pré-inscription", desc: "Remplissez le formulaire ou contactez-nous pour réserver une place à un essai.", icon: FileText },
    { step: "2", title: "Séance d'Évaluation", desc: "Votre enfant participe à une séance d'essai gratuite pour évaluer son niveau.", icon: Users },
    { step: "3", title: "Entretien", desc: "Échange avec les entraîneurs et parents pour valider les objectifs.", icon: Calendar },
    { step: "4", title: "Inscription Finale", desc: "Validation administrative et remise du kit de démarrage.", icon: CheckCircle2 },
  ];

  return (
    <section className="bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <CheckCircle2 className="h-4 w-4" />
            Processus simple
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Comment ça marche ?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            4 étapes pour rejoindre l'académie
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, i) => (
            <div key={i} className="relative rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="absolute -top-4 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-base font-bold text-white shadow-lg">
                {item.step}
              </div>
              <item.icon className="mt-4 h-8 w-8 text-primary" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/valladolid/inscription"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-base font-semibold text-white transition-all hover:bg-primary/90 hover:scale-105"
          >
            Commencer l'inscription
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}