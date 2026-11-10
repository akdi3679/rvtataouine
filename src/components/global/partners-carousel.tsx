import Image from "next/image";
import { PARTNERS } from "@/data/partners";

export function PartnersCarousel() {
  return (
    <div className="grid grid-cols-2 items-center gap-6 sm:grid-cols-3 lg:grid-cols-6">
      {PARTNERS.map((partner) => (
        <div
          key={partner.id}
          className="flex h-12 items-center justify-center"
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