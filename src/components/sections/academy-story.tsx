"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Target, Users, MapPin, Trophy, Sparkles } from "lucide-react";

const VALUE_PROPS = [
  { icon: Target, title: "Méthode espagnole", desc: "Philosophie Real Valladolid" },
  { icon: Users, title: "Encadrement pro", desc: "Entraîneurs diplômés UEFA" },
  { icon: MapPin, title: "Infrastructures", desc: "Terrains, salle, analyse vidéo" },
  { icon: Trophy, title: "Opportunités", desc: "Détection, stages en Espagne" },
];

export function AcademyStorySection() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Desktop image — full visible, faded into content on left */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] lg:flex lg:items-center lg:justify-end lg:py-10 lg:pr-6">
        <div className="relative h-full w-full">
          <Image
            src="/images/academy/kids-trophy.jpg"
            alt="Enfants de l'académie avec le trophée"
            fill
            sizes="55vw"
            className="object-contain object-right"
            priority={false}
          />
        </div>
        <div
          className="absolute inset-y-0 left-0 w-2/5"
          style={{
            background:
              "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0.4) 65%, rgba(255,255,255,0) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="lg:max-w-[42%]">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-accent">
            <Sparkles className="h-3 w-3" />
            Notre promesse
          </span>

          {/* Title */}
          <h2 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
            Former des champions,
            <span className="block text-accent">
              sur et en dehors du terrain
            </span>
          </h2>

          {/* Mobile image — edge-to-edge, overlaps title, no frame */}
          <div className="relative z-10 -mx-6 -mt-8 lg:hidden">
            <Image
              src="/images/academy/kids-trophy.jpg"
              alt="Enfants de l'académie avec le trophée"
              width={1400}
              height={1000}
              sizes="100vw"
              className="w-full h-auto"
            />
          </div>

          {/* Description */}
          <p className="mt-6 text-base leading-relaxed text-muted-foreground lg:mt-5">
            Depuis 2016, nous accompagnons les jeunes talents du sud tunisien
            avec une méthodologie espagnole éprouvée, un encadrement
            professionnel et des infrastructures modernes.
          </p>

          {/* Cards */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            {VALUE_PROPS.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="group rounded-xl border border-border bg-white p-4 transition-all hover:border-accent/40 hover:shadow-md"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="mt-3 text-sm font-bold leading-tight text-foreground">
                    {v.title}
                  </h3>
                  <p className="mt-1 text-xs leading-snug text-muted-foreground">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* CTA — centered in the left half */}
          <div className="mt-8 flex justify-center">
            <Link
              href="/inscription"
              className="inline-flex items-center gap-3 rounded-md bg-accent px-10 py-4 text-base font-bold text-white shadow-xl shadow-accent/25 transition-all hover:bg-accent/90 hover:shadow-2xl hover:shadow-accent/30 hover:-translate-y-0.5"
            >
              Inscrire mon enfant
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}