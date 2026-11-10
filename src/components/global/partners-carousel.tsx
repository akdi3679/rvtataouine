import Image from "next/image";
import { PARTNERS } from "@/data/partners";

export function PartnersCarousel() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {PARTNERS.map((partner) => (
        <div
          key={partner.id}
          className="flex h-14 items-center justify-center rounded-lg border border-background/10 bg-background/5 px-3"
        >
          <Image
            src={partner.logo}
            alt={partner.name}
            width={120}
            height={48}
            className="h-8 w-auto max-w-full object-contain opacity-70"
          />
        </div>
      ))}
    </div>
  );
}