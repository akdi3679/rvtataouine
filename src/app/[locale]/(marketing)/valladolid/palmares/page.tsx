import type { Metadata } from "next";
import Image from "next/image";
import { Trophy, Users, Medal, Star } from "lucide-react";
import { Timeline } from "@/components/interactive/timeline";
import {
  seasons,
  totalTrophies,
  totalPlayers,
  totalProPlayers,
} from "@/data/trophies";

export const metadata: Metadata = {
  title: "Palmarès | ARV Tataouine",
  description:
    "Tous les trophées de l'Académie Real Valladolid Tataouine depuis 2016.",
};

export default function PalmaresPage() {
  const stats = [
    { icon: Trophy, label: "Trophées", value: totalTrophies },
    { icon: Users, label: "Joueurs formés", value: totalPlayers + "+" },
    { icon: Medal, label: "Devenus pros", value: totalProPlayers },
    { icon: Star, label: "Saisons", value: seasons.length },
  ];

  return (
    <div className="flex flex-col bg-white">
      {/* Hero — texte à gauche, image grande à droite */}
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            {/* Left: content */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
                Notre histoire
              </p>
              <h1 className="mt-3 text-4xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Palmarès
              </h1>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                Chaque trophée raconte une saison de travail, de discipline et
                de passion. Retrouvez les victoires qui ont construit
                l&apos;académie depuis 2016.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={s.label}
                      className="rounded-xl border border-border bg-white p-4"
                    >
                      <Icon className="h-4 w-4 text-primary" />
                      <p className="mt-2 text-2xl font-black tabular-nums text-foreground">
                        {s.value}
                      </p>
                      <p className="mt-1 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">
                        {s.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: big image, no card, full */}
            <div className="flex justify-center lg:justify-end">
             <Image
  src="/images/academy/palmares.jpg"
  alt="Trophées remportés par l'académie"
  width={800}
  height={1000}
  sizes="(max-width: 1024px) 100vw, 50vw"
  className="h-auto w-full max-w-[560px]"
  priority
/>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-2xl font-black text-foreground sm:text-3xl">
              Saison par saison
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {totalTrophies} trophées remportés en {seasons.length} saisons.
            </p>
          </div>
          <Timeline seasons={seasons} />
        </div>
      </section>
    </div>
  );
}