import Image from "next/image";
import { PARTNERS } from "@/data/partners";

export function PartnersStrip() {
  return (
    <section className="border-y border-border bg-white py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="mb-8 text-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Nos partenaires officiels
        </p>
        <div className="grid grid-cols-2 items-center gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {PARTNERS.map((partner) => (
            <div
              key={partner.id}
              className="flex h-16 items-center justify-center"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={160}
                height={80}
                className="h-10 w-auto max-w-full object-contain sm:h-12"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}