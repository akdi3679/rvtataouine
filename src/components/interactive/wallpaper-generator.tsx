"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { Download, Loader2, Check } from "lucide-react";
import {
  logos,
  backgrounds,
  resolutions,
  type WallpaperTemplate,
} from "@/data/wallpapers";

interface WallpaperGeneratorProps {
  template: WallpaperTemplate;
}

function useImageLoader(src: string | null) {
  const [img, setImg] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!src) {
      setImg(null);
      return;
    }
    const image = new window.Image();
    // NO crossOrigin — same-origin, prevents canvas tainting
    image.onload = () => setImg(image);
    image.onerror = () => {
      console.warn("Failed to load image:", src);
      setImg(null);
    };
    image.src = src;
  }, [src]);

  return img;
}

export function WallpaperGenerator({ template }: WallpaperGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [selectedLogo, setSelectedLogo] = useState(
    template.availableLogos?.[0] ?? "",
  );
  const [selectedBg, setSelectedBg] = useState(
    template.availableBackgrounds?.[0] ?? "",
  );
  const [selectedResolution, setSelectedResolution] = useState(
    resolutions[0].id,
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const availableLogos = useMemo(
    () => logos.filter((l) => template.availableLogos?.includes(l.id)),
    [template.availableLogos],
  );
  const availableBackgrounds = useMemo(
    () =>
      backgrounds.filter((b) => template.availableBackgrounds?.includes(b.id)),
    [template.availableBackgrounds],
  );

  const logo =
    availableLogos.find((l) => l.id === selectedLogo) ?? availableLogos[0];
  const bg =
    availableBackgrounds.find((b) => b.id === selectedBg) ??
    availableBackgrounds[0];
  const res =
    resolutions.find((r) => r.id === selectedResolution) ?? resolutions[0];

  const logoImg = useImageLoader(logo?.path ?? null);
  const bgImg = useImageLoader(bg?.path ?? null);

  // Preview
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const previewW = 640;
    const previewH = Math.round((previewW * res.height) / res.width);
    canvas.width = previewW;
    canvas.height = previewH;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (bgImg) {
      ctx.drawImage(bgImg, 0, 0, previewW, previewH);
    } else {
      const grad = ctx.createLinearGradient(0, 0, previewW, previewH);
      grad.addColorStop(0, "#5E2D91");
      grad.addColorStop(1, "#E7001C");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, previewW, previewH);
    }

    if (logoImg) {
      const size = previewW * 0.32;
      const x = (previewW - size) / 2;
      const y = (previewH - size) / 2;
      ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
      ctx.shadowBlur = 24;
      ctx.shadowOffsetY = 8;
      ctx.drawImage(logoImg, x, y, size, size);
      ctx.shadowColor = "transparent";
    }
  }, [bgImg, logoImg, res]);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = res.width;
      canvas.height = res.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas non supporté");

      if (bgImg) {
        ctx.drawImage(bgImg, 0, 0, res.width, res.height);
      } else {
        const grad = ctx.createLinearGradient(0, 0, res.width, res.height);
        grad.addColorStop(0, "#5E2D91");
        grad.addColorStop(1, "#E7001C");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, res.width, res.height);
      }

      if (logoImg) {
        const size = res.width * 0.32;
        const x = (res.width - size) / 2;
        const y = (res.height - size) / 2;
        ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
        ctx.shadowBlur = 60;
        ctx.shadowOffsetY = 20;
        ctx.drawImage(logoImg, x, y, size, size);
        ctx.shadowColor = "transparent";
      } else {
        // Fallback: draw ARV text
        ctx.fillStyle = "rgba(255,255,255,0.95)";
        ctx.font = `900 ${Math.round(res.width * 0.15)}px system-ui, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("ARV", res.width / 2, res.height / 2);
      }

      // toBlob + createObjectURL — reliable download
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png", 1.0),
      );
      if (!blob) throw new Error("Blob generation failed");

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `arv-wallpaper-${bg?.id ?? "default"}-${res.id}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      console.error("Download failed:", err);
      alert(
        `Le téléchargement a échoué : ${
          err instanceof Error ? err.message : "erreur inconnue"
        }`,
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      {/* Preview */}
      <div className="flex items-center justify-center bg-secondary/40 p-6">
        <canvas
          ref={canvasRef}
          className="block h-auto max-h-[420px] w-auto max-w-full rounded-lg shadow-lg"
        />
      </div>

      <div className="space-y-6 p-6">
        {/* Background picker */}
        <div>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Fond d&apos;écran
          </p>
          <div className="grid grid-cols-4 gap-2">
            {availableBackgrounds.map((b) => {
              const active = selectedBg === b.id;
              return (
                <button
                  key={b.id}
                  onClick={() => setSelectedBg(b.id)}
                  className={`group relative aspect-[3/4] overflow-hidden rounded-lg border-2 transition-all ${
                    active
                      ? "border-foreground"
                      : "border-transparent hover:border-foreground/30"
                  }`}
                  aria-label={b.name}
                  aria-pressed={active}
                >
                  <Image
                    src={b.path}
                    alt={b.name}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-1 pb-1 pt-3 text-center text-[9px] font-semibold text-white">
                    {b.name}
                  </span>
                  {active && (
                    <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-background">
                      <Check className="h-2.5 w-2.5" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Logo picker */}
        <div>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Logo
          </p>
          <div className="flex flex-wrap gap-2">
            {availableLogos.map((l) => {
              const active = selectedLogo === l.id;
              return (
                <button
                  key={l.id}
                  onClick={() => setSelectedLogo(l.id)}
                  className={`relative flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all ${
                    active
                      ? "border-foreground bg-foreground/5"
                      : "border-border hover:border-foreground/30"
                  }`}
                  aria-label={l.name}
                  aria-pressed={active}
                >
                  <Image
                    src={l.path}
                    alt={l.name}
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain"
                  />
                  {active && (
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-background">
                      <Check className="h-2.5 w-2.5" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Resolution picker */}
        <div>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Format
          </p>
          <div className="flex flex-wrap gap-1.5">
            {resolutions.map((r) => {
              const active = selectedResolution === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setSelectedResolution(r.id)}
                  className={`rounded-md px-3 py-1.5 text-[11px] font-medium transition-colors ${
                    active
                      ? "bg-foreground text-background"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                  aria-pressed={active}
                >
                  {r.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Download — always clickable now (falls back if images missing) */}
        <div>
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent/90 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Génération...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Télécharger · {res.label} ({res.width}×{res.height})
              </>
            )}
          </button>
          <p className="mt-3 text-center text-[10px] text-muted-foreground">
            Gratuit · Usage personnel · PNG haute résolution
          </p>
        </div>
      </div>
    </div>
  );
}