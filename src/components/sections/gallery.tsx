"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { GALLERY } from "@/data/gallery";
import { getTeamFromPath, TEAMS, type TeamId } from "@/data/team-theme";
import { TeamIcon } from "@/components/global/icon";

interface GalleryProps {
  team?: TeamId;
}

export function Gallery({ team }: GalleryProps = {}) {
  const pathname = usePathname();
  const activeTeam = team ?? getTeamFromPath(pathname);
  const theme = TEAMS[activeTeam];
  const c = theme.content;

  // Filter images by team
  const teamImages = GALLERY.filter((g) => g.team === activeTeam).slice(0, 6);

  // Get team-specific labels if available
  const teamLabels = c.gallery ?? [];
  const getLabel = (id: string, defaultLabel: string) => {
    const found = teamLabels.find((l) => l.id === id);
    return found?.label ?? defaultLabel;
  };

  return (
    <section id="gallery" className="bg-secondary/30 py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8">
          <p className={`inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] ${theme.textClass}`}>
            {c.galleryIcon && (
              <TeamIcon name={c.galleryIcon} className="h-3.5 w-3.5" style={{ color: theme.hex }} />
            )}
            {c.galleryKicker ?? "En images"}
          </p>
          <h2 className="mt-2 text-2xl font-black text-foreground sm:text-3xl">
            {c.galleryTitle ?? "Galerie"}
          </h2>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            {c.gallerySubtitle ?? "Les moments forts de la saison, sur et en dehors du terrain."}
          </p>
        </div>

        {teamImages.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-white py-16 text-center">
            <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl ${theme.bgSoftClass}`}>
              <TeamIcon
                name={c.galleryIcon ?? "video"}
                className="h-6 w-6"
                style={{ color: theme.hex }}
              />
            </div>
            <p className="mt-4 text-base font-semibold text-foreground">
              Les photos arrivent bientôt
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Les moments forts de {theme.shortName} seront publiés ici prochainement.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {teamImages.map((item, i) => {
              const big = item.span.includes("row-span-2");
              const wide = !big && item.span.includes("col-span-2");
              const box = big
                ? "col-span-2 row-span-2 aspect-square sm:aspect-auto sm:min-h-[440px]"
                : wide
                  ? "col-span-2 aspect-[2/1]"
                  : "aspect-square";
              const label = getLabel(item.id, item.label);
              return (
                <div key={item.id} className={`group relative overflow-hidden rounded-2xl ${box}`}>
                  <Image
                    src={item.image}
                    alt={label}
                    fill
                    priority={i === 0}
                    sizes={big || wide ? "(max-width: 640px) 100vw, 50vw" : "(max-width: 640px) 50vw, 25vw"}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                    <p className={`font-semibold text-white ${big || wide ? "text-sm sm:text-base" : "text-xs sm:text-sm"}`}>
                      {label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}