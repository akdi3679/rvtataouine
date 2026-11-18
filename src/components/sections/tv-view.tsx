"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { videoCategories, type Video } from "@/data/videos";
import { GALLERY } from "@/data/gallery";
import { TeamFilter } from "@/components/global/team-filter";
import { TEAMS, type TeamId } from "@/data/team-theme";

// --- Netflix-style Video Card ---
function NetflixVideoCard({ video, onPlay, theme }: { video: Video; onPlay: () => void; theme: any }) {
  return (
    <button
      onClick={onPlay}
      className="group relative flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[360px] overflow-hidden rounded-lg text-left transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-2xl"
      aria-label={`Regarder : ${video.title}`}
    >
      <div className="relative aspect-video overflow-hidden rounded-lg bg-foreground">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          sizes="360px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Play button on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-2xl transition-transform group-hover:scale-110">
            <Play className="h-6 w-6 ml-0.5" style={{ color: theme.hex, fill: theme.hex }} />
          </div>
        </div>

        {/* Duration badge (always visible) */}
        <span className="absolute right-2 top-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur">
          {video.duration}
        </span>

        {/* Info overlay on hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <span className={`inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white mb-1.5`} style={{ backgroundColor: theme.hex }}>
            {video.categoryLabel}
          </span>
          <h3 className="line-clamp-2 text-sm font-bold text-white leading-tight">
            {video.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-[11px] text-white/80">
            {video.description}
          </p>
        </div>
      </div>
    </button>
  );
}

// --- Netflix-style Horizontal Row ---
function NetflixRow({ 
  title, 
  videos, 
  onPlay, 
  theme 
}: { 
  title: string; 
  videos: Video[]; 
  onPlay: (v: Video) => void; 
  theme: any;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (videos.length === 0) return null;

  return (
    <section className="relative py-6 group/row">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Row title */}
        <div className="mb-4 flex items-center gap-3">
          <h2 className="text-xl font-black text-foreground sm:text-2xl">
            {title}
          </h2>
          <span className="text-xs font-medium text-muted-foreground">
            {videos.length} {videos.length === 1 ? "vidéo" : "vidéos"}
          </span>
        </div>

        {/* Scrollable row */}
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-0 bottom-0 z-20 hidden w-12 items-center justify-center bg-gradient-to-r from-white via-white/80 to-transparent opacity-0 transition-opacity group-hover/row:opacity-100 lg:flex"
            aria-label="Défiler à gauche"
          >
            <ChevronLeft className="h-8 w-8 text-foreground" />
          </button>

          {/* Videos container */}
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto scroll-smooth scrollbar-hide pb-2"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {videos.map((v) => (
              <div key={v.id} className="flex-shrink-0" style={{ scrollSnapAlign: "start" }}>
                <NetflixVideoCard video={v} onPlay={() => onPlay(v)} theme={theme} />
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-0 bottom-0 z-20 hidden w-12 items-center justify-center bg-gradient-to-l from-white via-white/80 to-transparent opacity-0 transition-opacity group-hover/row:opacity-100 lg:flex"
            aria-label="Défiler à droite"
          >
            <ChevronRight className="h-8 w-8 text-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
}

// --- Hero Section (Featured Video) ---
function TvHero({ video, onPlay, team }: { video: Video; onPlay: () => void; team: TeamId | "all" }) {
  const teamTheme = team !== "all" ? TEAMS[team] : TEAMS.group;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-8 lg:px-8 lg:pt-14 lg:pb-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex-1">
            <div className="mb-4 flex items-center gap-3">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-white shadow-sm">
                <Image src={teamTheme.logoPath} alt={teamTheme.name} fill className="object-contain p-1" />
              </div>
              <span className={`text-sm font-bold uppercase tracking-widest ${teamTheme.textClass}`}>
                {teamTheme.shortName} TV
              </span>
            </div>
            <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${teamTheme.textClass}`}>
              ARV TV
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              En vidéo
            </h1>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
              Les meilleurs moments, interviews et coulisses de l&apos;académie.
            </p>
          </div>
          <div className="shrink-0">
            <TeamFilter currentTeam={team} />
          </div>
        </div>

        {/* Featured video hero */}
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
                  <h2 className="mt-1.5 text-2xl font-black leading-tight text-white sm:text-3xl lg:text-4xl">
                    {video.title}
                  </h2>
                  <p className="mt-2 hidden max-w-xl text-sm text-white/80 sm:line-clamp-2 sm:block">
                    {video.description}
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

// --- Gallery Section ---
function Gallery({ team }: { team: TeamId | "all" }) {
  const teamTheme = team !== "all" ? TEAMS[team] : TEAMS.group;

  return (
    <section className="bg-secondary/30 py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8">
          <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${teamTheme.textClass}`}>
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
          <div className="group relative col-span-2 row-span-2 aspect-square overflow-hidden rounded-2xl sm:aspect-auto sm:min-h-[440px]">
            <Image src={GALLERY[0].image} alt={GALLERY[0].label} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <p className="text-sm font-semibold text-white sm:text-base">{GALLERY[0].label}</p>
            </div>
          </div>
          <div className="group relative col-span-2 aspect-[2/1] overflow-hidden rounded-2xl">
            <Image src={GALLERY[1].image} alt={GALLERY[1].label} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <p className="text-sm font-semibold text-white">{GALLERY[1].label}</p>
            </div>
          </div>
          <div className="group relative aspect-square overflow-hidden rounded-2xl">
            <Image src={GALLERY[2].image} alt={GALLERY[2].label} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-3">
              <p className="text-xs font-semibold text-white sm:text-sm">{GALLERY[2].label}</p>
            </div>
          </div>
          <div className="group relative aspect-square overflow-hidden rounded-2xl">
            <Image src={GALLERY[3].image} alt={GALLERY[3].label} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-3">
              <p className="text-xs font-semibold text-white sm:text-sm">{GALLERY[3].label}</p>
            </div>
          </div>
          <div className="group relative col-span-2 aspect-[2.4/1] overflow-hidden rounded-2xl">
            <Image src={GALLERY[4].image} alt={GALLERY[4].label} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <p className="text-sm font-semibold text-white">{GALLERY[4].label}</p>
            </div>
          </div>
          <div className="group relative col-span-2 aspect-[2.4/1] overflow-hidden rounded-2xl">
            <Image src={GALLERY[5].image} alt={GALLERY[5].label} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
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

// --- Video Player Modal ---
function VideoPlayer({ video, onClose }: { video: Video; onClose: () => void }) {
  useState(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
      <button onClick={onClose} className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20" aria-label="Fermer">
        <X className="h-5 w-5" />
      </button>
      <div className="w-full max-w-5xl">
        <div className="relative w-full overflow-hidden rounded-xl bg-black" style={{ aspectRatio: "16/9" }}>
          <iframe src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`} title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 h-full w-full" />
        </div>
        <div className="mt-4 px-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/60">{video.categoryLabel}</p>
          <h3 className="mt-1 text-lg font-black text-white sm:text-2xl">{video.title}</h3>
          <p className="mt-2 hidden text-sm text-white/70 sm:block">{video.description}</p>
        </div>
      </div>
    </div>
  );
}

// --- Main TV View ---
export function TvView({ videos, team }: { videos: Video[]; team: TeamId | "all" }) {
  const [active, setActive] = useState<Video | null>(null);
  const theme = team !== "all" ? TEAMS[team] : TEAMS.group;

  const featured = videos.find((v) => v.featured) ?? videos[0];

  // Group videos by category (Netflix-style)
  const videosByCategory = videoCategories
    .map((cat) => ({
      ...cat,
      videos: videos.filter((v) => v.category === cat.id),
    }))
    .filter((cat) => cat.videos.length > 0);

  return (
    <>
      <div className="bg-white">
        {featured && <TvHero video={featured} onPlay={() => setActive(featured)} team={team} />}

        {/* Netflix-style category rows */}
        <div className="pb-14 lg:pb-20">
          {videosByCategory.length === 0 ? (
            <div className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-8">
              <Play className="mx-auto h-12 w-12 text-muted-foreground/30" />
              <p className="mt-4 text-base font-semibold text-foreground">Aucune vidéo disponible</p>
              <p className="mt-1 text-sm text-muted-foreground">Les vidéos de cette équipe arrivent bientôt.</p>
            </div>
          ) : (
            videosByCategory.map((cat) => (
              <NetflixRow
                key={cat.id}
                title={cat.label}
                videos={cat.videos}
                onPlay={setActive}
                theme={theme}
              />
            ))
          )}
        </div>

        <Gallery team={team} />
      </div>

      {active && <VideoPlayer video={active} onClose={() => setActive(null)} />}
    </>
  );
}