import Link from "next/link";
import { HelpCircle, ArrowRight } from "lucide-react";

export function FAQSection() {
  const faqs = [
    { q: "À partir de quel âge mon enfant peut-il s'inscrire ?", a: "Nous acceptons les jeunes footballeurs à partir de 8 ans (catégorie U8). Des programmes d'initiation sont disponibles pour les débutants." },
    { q: "Les séances d'essai sont-elles vraiment gratuites ?", a: "Oui, la première séance d'évaluation est entièrement gratuite et sans engagement. Elle nous permet de déterminer la catégorie la plus adaptée." },
    { q: "Mon enfant n'a jamais joué au football, est-ce un problème ?", a: "Absolument pas. Notre méthodologie accueille tous les niveaux, des débutants aux confirmés, avec un accent sur le plaisir et la progression." },
    { q: "Que se passe-t-il en cas de mauvais temps ?", a: "Nos terrains synthétiques permettent de maintenir les entraînements dans la plupart des conditions. En cas de force majeure, les séances sont reportées." },
  ];

  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <HelpCircle className="h-4 w-4" />
            Questions fréquentes
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Vous avez des questions ?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Voici les réponses aux questions les plus courantes
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 open:border-primary/50 open:shadow-md"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                <h3 className="text-lg font-semibold text-foreground">{faq.q}</h3>
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-open:rotate-45">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </summary>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Vous avez d'autres questions ?{" "}
            <Link href="/contact" className="font-semibold text-primary hover:text-primary/80">
              Contactez-nous <ArrowRight className="inline h-4 w-4" />
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}