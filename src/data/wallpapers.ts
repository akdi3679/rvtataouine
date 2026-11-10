export interface WallpaperTemplate {
  id: string;
  name: string;
  description: string;
  availableLogos: string[];
  availableBackgrounds: string[];
}

export const logos = [
  {
    id: "logo1",
    name: "Logo 1",
    path: "/images/wallpaper/logo1.png",
  },
  {
    id: "logo2",
    name: "Logo 2",
    path: "/images/wallpaper/logo2.png",
  },
];

export const backgrounds = [
  {
    id: "wal1",
    name: "Fond 1",
    path: "/images/wallpaper/wal1.jpg",
  },
  {
    id: "wal2",
    name: "Fond 2",
    path: "/images/wallpaper/wal2.jpg",
  },
  {
    id: "wal3",
    name: "Fond 3",
    path: "/images/wallpaper/wal3.jpg",
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
    availableLogos: ["logo1", "logo2"],
    availableBackgrounds: ["wal1", "wal2", "wal3"],
  },
];

export function getTemplateById(id: string): WallpaperTemplate | undefined {
  return wallpaperTemplates.find((t) => t.id === id);
}