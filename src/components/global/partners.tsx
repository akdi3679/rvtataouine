import Link from "next/link";

const partners = [
  { name: "Real Valladolid CF", tier: "official", logo: "/images/partners/real-valladolid.png" },
  { name: "Fédération Tunisienne de Football", tier: "official", logo: "/images/partners/ftf.png" },
  { name: "Ligue du Sud", tier: "official", logo: "/images/partners/ligue-sud.png" },
  { name: "Nike Tunisia", tier: "sponsor", logo: "/images/partners/nike.png" },
  { name: "Red Bull", tier: "sponsor", logo: "/images/partners/redbull.png" },
  { name: "Gatorade", tier: "sponsor", logo: "/images/partners/gatorade.png" },
];

export function PartnersSection() {
  return (
    <section className="bg-background py-16 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Ils nous font confiance
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
            Nos Partenaires Officiels
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6 items-center">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="group flex items-center justify-center p-4 rounded-xl transition-all hover:bg-secondary"
            >
              <div className="relative h-16 w-full flex items-center justify-center">
                {/* Placeholder - replace with real logos */}
                <div className="flex h-full w-full items-center justify-center rounded-lg bg-secondary text-xs font-semibold text-muted-foreground text-center px-2 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                  {partner.name}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Devenir partenaire →
          </Link>
        </div>
      </div>
    </section>
  );
}