import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Quote } from "lucide-react";
import { alumni, testimonials } from "@/data/alumni";

export function AlumniSpotlightSection() {
  return (
    <section className="bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ils ont commencé ici
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            La preuve que notre formation fonctionne
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {alumni.map((a) => (
            <div
              key={a.id}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                <Image
                  src={a.image}
                  alt={a.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-foreground">{a.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Promotion {a.promo} · {a.role}
                </p>
                <p className="mt-3 text-sm font-semibold text-primary">
                  {a.current}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <div className="text-center">
            <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Ce que disent les parents
            </h3>
            <p className="mt-3 text-muted-foreground">La confiance des familles</p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <Quote className="h-6 w-6 text-primary/30" />
                <div className="mt-3 flex items-center gap-1 text-gold">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-sm text-foreground">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-sm font-semibold text-primary">
                      {t.initials}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      {t.name}
                    </div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/valladolid/alumni"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80"
          >
            Voir tous nos alumni et témoignages <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}