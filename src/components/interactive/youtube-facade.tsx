"use client";

import { useState } from "react";
import { Play } from "lucide-react";

interface YouTubeFacadeProps {
  videoId: string;
  title: string;
  aspectRatio?: "16/9" | "4/3";
}

export function YouTubeFacade({ videoId, title, aspectRatio = "16/9" }: YouTubeFacadeProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // High-res thumbnail from YouTube
  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
  const fallbackThumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  if (isLoaded) {
    return (
      <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio }}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
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
      style={{ aspectRatio }}
      aria-label={`Lire la vidéo : ${title}`}
    >
      {/* Thumbnail with fallback */}
      <img
        src={thumbnailUrl}
        alt={title}
        loading="lazy"
        onError={(e) => {
          (e.target as HTMLImageElement).src = fallbackThumbnail;
        }}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white sm:h-20 sm:w-20">
          <Play className="h-7 w-7 fill-primary text-primary sm:h-8 sm:w-8 ml-1" />
        </div>
      </div>

      {/* Title at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
        <p className="text-sm font-medium text-white/90 line-clamp-2 sm:text-base">{title}</p>
      </div>
    </button>
  );
}