import Image from "next/image";
import { GALLERY } from "@/data/gallery";

export function Gallery() {
  return (
    <section id="gallery" className="bg-secondary/30 py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
            En images
          </p>
          <h2 className="mt-2 text-2xl font-black text-foreground sm:text-3xl">
            Galerie
          </h2>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            Les moments forts de la saison, sur et en dehors du terrain.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {/* g1 — huge 2x2 */}
          <div className="group relative col-span-2 row-span-2 aspect-square overflow-hidden rounded-2xl sm:aspect-auto sm:min-h-[440px]">
            <Image
              src={GALLERY[0].image}
              alt={GALLERY[0].label}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <p className="text-sm font-semibold text-white sm:text-base">
                {GALLERY[0].label}
              </p>
            </div>
          </div>

          {/* g2 — wide 2x1 */}
          <div className="group relative col-span-2 aspect-[2/1] overflow-hidden rounded-2xl">
            <Image
              src={GALLERY[1].image}
              alt={GALLERY[1].label}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <p className="text-sm font-semibold text-white">{GALLERY[1].label}</p>
            </div>
          </div>

          {/* g3 + g4 — small squares */}
          <div className="group relative aspect-square overflow-hidden rounded-2xl">
            <Image
              src={GALLERY[2].image}
              alt={GALLERY[2].label}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-3">
              <p className="text-xs font-semibold text-white sm:text-sm">{GALLERY[2].label}</p>
            </div>
          </div>

          <div className="group relative aspect-square overflow-hidden rounded-2xl">
            <Image
              src={GALLERY[3].image}
              alt={GALLERY[3].label}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-3">
              <p className="text-xs font-semibold text-white sm:text-sm">{GALLERY[3].label}</p>
            </div>
          </div>

          {/* g5 — full-width wide */}
          <div className="group relative col-span-2 aspect-[2.4/1] overflow-hidden rounded-2xl">
            <Image
              src={GALLERY[4].image}
              alt={GALLERY[4].label}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <p className="text-sm font-semibold text-white">{GALLERY[4].label}</p>
            </div>
          </div>

          {/* g6 — full-width wide */}
          <div className="group relative col-span-2 aspect-[2.4/1] overflow-hidden rounded-2xl">
            <Image
              src={GALLERY[5].image}
              alt={GALLERY[5].label}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <p className="text-sm font-semibold text-white">{GALLERY[5].label}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}