"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, Pause, Play } from "lucide-react";
import { heroSlides, heroFallbackGradients } from "@/data/hero";

type Direction = "next" | "prev" | null;

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<Direction>(null);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const elapsedRef = useRef(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const transitionTimer = useRef<NodeJS.Timeout | null>(null);

  const slide = heroSlides[current];
  const duration = slide.duration * 1000;

  // Slide change with direction + exit tracking
  const changeSlide = useCallback(
    (newIndex: number, dir: "next" | "prev") => {
      if (newIndex === current) return;
      setPrevIndex(current);
      setDirection(dir);
      setCurrent(newIndex);
      elapsedRef.current = 0;
      setProgress(0);

      if (transitionTimer.current) clearTimeout(transitionTimer.current);
      transitionTimer.current = setTimeout(() => {
        setPrevIndex(null);
        setDirection(null);
      }, 700);
    },
    [current],
  );

  const goNext = useCallback(() => {
    changeSlide((current + 1) % heroSlides.length, "next");
  }, [current, changeSlide]);

  const goPrev = useCallback(() => {
    changeSlide((current - 1 + heroSlides.length) % heroSlides.length, "prev");
  }, [current, changeSlide]);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === current) return;
      changeSlide(index, index > current ? "next" : "prev");
    },
    [current, changeSlide],
  );

  // Keep latest goNext in a ref so the interval never fires a stale closure
  const goNextRef = useRef(goNext);
  useEffect(() => {
    goNextRef.current = goNext;
  });

  // Auto-advance timer — resumes from where it paused (no reset on pause)
  useEffect(() => {
    if (isPaused) return;

    const startTime = Date.now();
    const baseElapsed = elapsedRef.current;

    const interval = setInterval(() => {
      const elapsed = baseElapsed + (Date.now() - startTime);
      elapsedRef.current = elapsed;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      if (newProgress >= 100) {
        goNextRef.current();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [current, isPaused, duration]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (Math.abs(distance) >= 50) {
      if (distance > 0) goNextRef.current();
      else goPrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleImageError = (key: string) => {
    setImageErrors((prev) => new Set(prev).add(key));
  };

  return (
    <>
      <section
        className="relative h-[100svh] w-full overflow-hidden bg-black"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        aria-roledescription="carousel"
      >
        {/* Slides — image-only layers that slide in/out */}
        {heroSlides.map((s, index) => {
          const isActive = index === current;
          const isExiting = index === prevIndex;
          const visible = isActive || isExiting;
          const useFallback =
            imageErrors.has(`${s.id}-desktop`) &&
            imageErrors.has(`${s.id}-mobile`);

          let animClass = "";
          if (isActive && direction === "next") animClass = "hero-slide-in-right";
          else if (isActive && direction === "prev") animClass = "hero-slide-in-left";
          else if (isExiting && direction === "next") animClass = "hero-slide-out-left";
          else if (isExiting && direction === "prev") animClass = "hero-slide-out-right";

          return (
            <div
              key={s.id}
              className={`absolute inset-0 ${visible ? "" : "opacity-0 pointer-events-none"} ${animClass}`}
              style={{ zIndex: isActive ? 20 : isExiting ? 10 : 0 }}
              aria-hidden={!isActive}
            >
              {useFallback ? (
                <div
                  className="absolute inset-0"
                  style={{ background: heroFallbackGradients[index] }}
                />
              ) : (
                <>
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="eager"
                    onError={() => handleImageError(`${s.id}-desktop`)}
                    className="absolute inset-0 hidden h-full w-full object-cover transition-transform duration-[8s] ease-out md:block"
                    style={{ transform: isActive ? "scale(1.05)" : "scale(1)" }}
                  />
                  <img
                    src={s.imageMobile}
                    alt={s.title}
                    loading="eager"
                    onError={() => handleImageError(`${s.id}-mobile`)}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[8s] ease-out md:hidden"
                    style={{ transform: isActive ? "scale(1.05)" : "scale(1)" }}
                  />
                </>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            </div>
          );
        })}

        {/* Content — fades on every slide change */}
        <div className="relative z-30 flex h-full flex-col justify-end pb-9">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <div
              key={current}
              className="max-w-xl space-y-3 hero-content-fade md:max-w-2xl md:space-y-6"
            >
              <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-white md:text-sm">
                {slide.category}
              </span>

              <h1 className="text-3xl font-black leading-tight tracking-tight text-white md:text-3xl lg:text-5xl">
                {slide.title}
              </h1>

              <div className="flex items-center gap-4 md:gap-6">
                <Link
                  href={slide.ctaHref}
                  className="inline-flex items-center gap-2 rounded bg-accent px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-accent-light md:px-8 md:py-4 md:text-base"
                >
                  {slide.ctaLabel}
                  <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                </Link>

                <div className="max-w-[130px] flex-1 md:max-w-xs">
                  <div className="h-0.5 w-full overflow-hidden rounded-full bg-white/20">
                    <div
                      className="h-full bg-gold transition-all duration-75 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pause / Play — top-right, below header */}
        <button
          onClick={() => setIsPaused((p) => !p)}
          className="absolute top-20 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 transition-colors"
          aria-label={isPaused ? "Reprendre le diaporama" : "Mettre en pause"}
        >
          {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </button>
      </section>

      {/* Thumbnail strip — black base, dark-gray when active/hovered */}
      <section className="relative bg-black pt-0 pb-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="scrollbar-hide flex gap-2 overflow-x-auto py-2">
            {heroSlides.map((s, index) => {
              const isActive = index === current;
              const useFallback =
                imageErrors.has(`${s.id}-desktop`) &&
                imageErrors.has(`${s.id}-mobile`);

              return (
                <button
                  key={s.id}
                  onClick={() => goToSlide(index)}
                  className={`group relative flex-shrink-0 overflow-hidden rounded-lg border transition-all duration-300 ${
                    isActive
                      ? "bg-neutral-800 border-white/20"
                      : "bg-black border-white/10 hover:bg-neutral-800 hover:border-white/20 focus-visible:bg-neutral-800 focus-visible:border-white/20"
                  }`}
                  aria-label={`Aller au slide ${index + 1}`}
                >
                  <div className="flex w-[170px] items-center gap-2 p-2 md:w-[210px]">
                    <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md md:h-16 md:w-16">
                      {useFallback ? (
                        <div
                          className="absolute inset-0"
                          style={{ background: heroFallbackGradients[index] }}
                        />
                      ) : (
                        <>
                          <img
                            src={s.image}
                            alt=""
                            loading="lazy"
                            onError={() => handleImageError(`${s.id}-desktop`)}
                            className="absolute inset-0 hidden h-full w-full object-cover md:block"
                          />
                          <img
                            src={s.imageMobile}
                            alt=""
                            loading="lazy"
                            onError={() => handleImageError(`${s.id}-mobile`)}
                            className="absolute inset-0 h-full w-full object-cover md:hidden"
                          />
                        </>
                      )}
                    </div>

                    <div className="min-w-0 flex-1 text-left">
                      <p className="line-clamp-2 text-[11px] font-medium leading-tight text-white md:text-xs">
                        {s.title}
                      </p>
                      <p className="mt-1 text-[9px] text-white/60 md:text-[10px]">
                        {s.category}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}