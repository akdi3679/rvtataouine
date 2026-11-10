"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, ArrowRight } from "lucide-react";
import { getFeaturedVideos, videos, type Video } from "@/data/videos";

function VideoCard({ video }: { video: Video }) {
  const [isLoaded, setIsLoaded] = useState(false);

  if (isLoaded) {
    return (
      <div
        className="relative w-full overflow-hidden rounded-2xl"
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
    );
  }

  return (
    <button
      onClick={() => setIsLoaded(true)}
      className="group relative w-full overflow-hidden rounded-2xl bg-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      style={{ aspectRatio: "16/9" }}
      aria-label={`Lire la vidéo : ${video.title}`}
    >
      <Image
        src={video.thumbnail}
        alt={video.title}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute bottom-4 left-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
          <Play className="h-5 w-5 fill-primary text-primary ml-0.5" />
        </div>
      </div>
    </button>
  );
}

export function FeaturedVideosSection() {
  const featuredRaw = getFeaturedVideos(3);
  const featured = featuredRaw.length >= 3 ? featuredRaw : videos.slice(0, 3);

  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
              <Play className="h-4 w-4" />
              ARV TV
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              En vidéo
            </h2>
          </div>
          <Link
            href="/tv"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80"
          >
            Voir toute la chaîne <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {featured.map((video) => (
            <div key={video.id}>
              <VideoCard video={video} />
              <div className="mt-3">
                <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  {video.categoryLabel}
                </span>
                <h3 className="mt-2 font-bold text-foreground line-clamp-2">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}