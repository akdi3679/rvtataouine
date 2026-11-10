export interface WallpaperTemplate {
  id: string;
  name: string;
  description: string;
  availableLogos: string[];
  availableBackgrounds: string[];
}

export const logos = [
  { id: "arv-primary", name: "ARV", path: "/images/logos/arv-primary.png" },
  { id: "arv-gold", name: "ARV Or", path: "/images/logos/arv-gold.png" },
  { id: "arv-white", name: "ARV Blanc", path: "/images/logos/arv-white.png" },
  {
    id: "real-valladolid",
    name: "Real Valladolid",
    path: "/images/logos/real-valladolid.png",
  },
  {
    id: "partnership",
    name: "Partenariat",
    path: "/images/logos/partnership.png",
  },
];

export const backgrounds = [
  {
    id: "stadium",
    name: "Stade",
    path: "/images/wallpapers/bg-stadium.jpg",
  },
  {
    id: "pitch",
    name: "Terrain",
    path: "/images/wallpapers/bg-pitch.jpg",
  },
  {
    id: "training",
    name: "Entraînement",
    path: "/images/wallpapers/bg-training.jpg",
  },
  {
    id: "dark",
    name: "Nuit",
    path: "/images/wallpapers/bg-dark.jpg",
  },
];

export const resolutions = [
  { id: "mobile", label: "Mobile", width: 1080, height: 1920 },
  { id: "tablet", label: "Tablette", width: 2048, height: 2732 },
  { id: "full-hd", label: "Full HD", width: 1920, height: 1080 },
  { id: "2k", label: "2K", width: 2560, height: 1440 },
  { id: "4k", label: "4K", width: 3840, height: 2160 },
];

export const wallpaperTemplates: WallpaperTemplate[] = [
  {
    id: "official",
    name: "Wallpaper officiel",
    description: "Personnalisez votre fond d'écran aux couleurs de l'académie",
    availableLogos: [
      "arv-primary",
      "arv-gold",
      "arv-white",
      "real-valladolid",
      "partnership",
    ],
    availableBackgrounds: ["stadium", "pitch", "training", "dark"],
  },
];

export function getTemplateById(id: string): WallpaperTemplate | undefined {
  return wallpaperTemplates.find((t) => t.id === id);
}