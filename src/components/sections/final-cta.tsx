import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function FinalCTASection() {
  return (
<section className="relative overflow-x-clip bg-white pt-28 pb-24 lg:py-24">
      {/* Image — inchangée */}
      <div className="pointer-events-none absolute left-0 -bottom-10 z-0 h-[130%]">
        <Image
          src="/images/cta/kids.png"
          alt=""
          aria-hidden="true"
          width={800}
          height={1200}
          className="h-full w-auto object-contain object-bottom"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Textes — remontent de 120px sur mobile, reste naturel sur desktop */}
        <div className="-translate-y-[120px] lg:translate-y-0">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Prêt à rejoindre l&apos;aventure ?
          </h2>
          <p className="mt-6 text-xl text-muted-foreground">
            Inscrivez votre enfant dès aujourd&apos;hui
          </p>
        </div>

        {/* Boutons — mt-28 mobile (compense la translation), mt-10 desktop (position d'origine) */}
        <div className="mt-28 flex flex-col items-center justify-center gap-4 sm:flex-row lg:mt-10">
          <Link
            href="/valladolid/inscription"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-gold transition-all hover:bg-accent/90 hover:scale-105"
          >
            Inscription <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border-2 border-foreground/15 bg-transparent px-8 py-4 text-base font-semibold text-foreground transition-all hover:border-foreground/40 hover:bg-foreground/5"
          >
            Essai gratuit
          </Link>
        </div>
      </div>
    </section>
  );
}