"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Play, X, Camera } from "lucide-react";
import { videos, videoCategories, type Video } from "@/data/videos";
import { GALLERY } from "@/data/gallery";

const CATEGORY_GRADIENT: Record<string, string> = {
  match: "from-accent via-accent/80 to-accent-dark",
  training: "from-primary via-primary/80 to-primary-dark",
  interview: "from-info via-info/80 to-primary/70",
  "behind-scenes": "from-warning via-warning/80 to-accent/70",
  tutorial: "from-success via-success/80 to-primary/70",
};

function TvHero({ video, onPlay }: { video: Video; onPlay: () => void }) {
  const c = CATEGORY_GRADIENT[video.category] ?? CATEGORY_GRADIENT.match;
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-8 lg:px-8 lg:pt-14 lg:pb-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
          ARV TV
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          En vidéo
        </h1>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
          Les meilleurs moments, interviews et coulisses de l&apos;académie.
        </p>

        <button
          onClick={onPlay}
          className="group relative mt-8 block w-full overflow-hidden rounded-2xl text-left"
          aria-label={`Regarder : ${video.title}`}
        >
          <div className="relative aspect-[4/5] sm:aspect-[21/9]">
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1280px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="absolute right-4 top-4 z-10 flex items-center gap-2 sm:right-6 sm:top-6">
              <span className="rounded-md bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
                {video.categoryLabel}
              </span>
              <span className="rounded-md bg-black/40 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur">
                {video.duration}
              </span>
            </div>

            <div className="absolute inset-0 z-10 flex items-center justify-center pb-20 sm:hidden">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-2xl transition-transform group-hover:scale-105">
                <Play className="ml-1 h-7 w-7 fill-foreground text-foreground" />
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7 lg:p-10">
              <div className="flex items-end justify-between gap-4">
                <div className="min-w-0 max-w-2xl">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">
                    À la une
                  </p>
                  <h2 className="mt-1.5 text-2xl font-black leading-tight text-white sm:text-2xl lg:text-4xl">
                    {video.title}
                  </h2>
                  <p className="mt-2 hidden max-w-xl text-sm text-white/80 sm:line-clamp-2 sm:block">
                    {video.description}
                  </p>
                  <p className="mt-2 text-[11px] font-medium text-white/60 sm:hidden">
                    {video.publishedAt} · {video.duration}
                  </p>
                </div>
                <div className="hidden shrink-0 sm:block">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-foreground shadow-xl transition-transform group-hover:scale-105">
                    <Play className="h-4 w-4 fill-foreground" />
                    Regarder
                  </span>
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>
    </section>
  );
}

function VideoGrid({
  items,
  onPlay,
}: {
  items: Video[];
  onPlay: (v: Video) => void;
}) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border py-20 text-center">
        <Play className="mx-auto h-10 w-10 text-muted-foreground/30" />
        <p className="mt-4 text-sm font-semibold text-foreground">
          Aucune vidéo dans cette catégorie
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((v) => (
        <button
          key={v.id}
          onClick={() => onPlay(v)}
          className="group flex flex-col text-left"
          aria-label={`Regarder : ${v.title}`}
        >
          <div className="relative aspect-video overflow-hidden rounded-xl bg-foreground">
            <Image
              src={v.thumbnail}
              alt={v.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-2xl">
                <Play className="ml-0.5 h-6 w-6 fill-foreground" />
              </span>
            </div>
            <span className="absolute right-2 top-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold text-white">
              {v.duration}
            </span>
          </div>
          <div className="mt-3">
            <span className="inline-flex rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-foreground">
              {v.categoryLabel}
            </span>
            <h3 className="mt-2 line-clamp-2 text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-accent">
              {v.title}
            </h3>
            <p className="mt-1 text-[11px] text-muted-foreground">
              {v.publishedAt}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}

function Gallery() {
  return (
    <section className="bg-secondary/30 py-14 lg:py-20">
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

        {/* Bento grid — tailles variées */}
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
          <div className="group relative col-span-2 aspect-[2/1] overflow-hidden rounded-2xl sm:aspect-[2/1]">
            <Image
              src={GALLERY[1].image}
              alt={GALLERY[1].label}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <p className="text-sm font-semibold text-white">
                {GALLERY[1].label}
              </p>
            </div>
          </div>

          {/* g3 + g4 — small squares côte à côte */}
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
              <p className="text-xs font-semibold text-white sm:text-sm">
                {GALLERY[2].label}
              </p>
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
              <p className="text-xs font-semibold text-white sm:text-sm">
                {GALLERY[3].label}
              </p>
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
              <p className="text-sm font-semibold text-white">
                {GALLERY[4].label}
              </p>
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
              <p className="text-sm font-semibold text-white">
                {GALLERY[5].label}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoPlayer({
  video,
  onClose,
}: {
  video: Video;
  onClose: () => void;
}) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        aria-label="Fermer"
      >
        <X className="h-5 w-5" />
      </button>
      <div className="w-full max-w-5xl">
        <div
          className="relative w-full overflow-hidden rounded-xl bg-black"
          style={{ aspectRatio: "16/9" }}
        >
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
        <div className="mt-4 px-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/60">
            {video.categoryLabel}
          </p>
          <h3 className="mt-1 text-lg font-black text-white sm:text-2xl">
            {video.title}
          </h3>
          <p className="mt-2 hidden text-sm text-white/70 sm:block">
            {video.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function TvView() {
  const [active, setActive] = useState<Video | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const featured = videos.find((v) => v.featured) ?? videos[0];

  const filtered = useMemo(
    () =>
      filter === "all" ? videos : videos.filter((v) => v.category === filter),
    [filter],
  );

  const countFor = (id: string) =>
    id === "all"
      ? videos.length
      : videos.filter((v) => v.category === id).length;

  return (
    <>
      <div className="bg-white">
        <TvHero video={featured} onPlay={() => setActive(featured)} />

        <section className="pb-14 lg:pb-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-foreground sm:text-3xl">
                  Toutes les vidéos
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  {filtered.length}{" "}
                  {filtered.length === 1 ? "vidéo" : "vidéos"}
                </p>
              </div>
            </div>

            <div className="-mx-6 mb-8 overflow-x-auto scrollbar-hide px-6 lg:mx-0 lg:px-0">
              <ul className="flex gap-1.5 whitespace-nowrap">
                {videoCategories.map((c) => {
                  const activeFilter = filter === c.id;
                  return (
                    <li key={c.id}>
                      <button
                        onClick={() => setFilter(c.id)}
                        className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-xs font-semibold transition-colors ${
                          activeFilter
                            ? "bg-foreground text-background"
                            : "border border-border bg-white text-foreground hover:border-foreground/30 hover:bg-secondary/50"
                        }`}
                      >
                        {c.label}
                        <span
                          className={`text-[10px] tabular-nums ${
                            activeFilter
                              ? "text-background/60"
                              : "text-muted-foreground"
                          }`}
                        >
                          {countFor(c.id)}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <VideoGrid items={filtered} onPlay={setActive} />
          </div>
        </section>

        <Gallery />
      </div>

      {active && <VideoPlayer video={active} onClose={() => setActive(null)} />}
    </>
  );
}