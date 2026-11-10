export interface Video {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  category: "match" | "training" | "interview" | "behind-scenes" | "tutorial";
  categoryLabel: string;
  duration: string;
  publishedAt: string;
  featured: boolean;
  thumbnail: string;
}

export const videos: Video[] = [
  {
    id: "v-001",
    title: "Finale du Tournoi de Sfax — Highlights U15",
    description: "Les meilleurs moments de notre victoire en finale du tournoi régional de Sfax.",
    youtubeId: "dQw4w9WgXcQ",
    category: "match",
    categoryLabel: "Match",
    duration: "8:42",
    publishedAt: "2026-11-06",
    featured: true,
    thumbnail: "/images/tv/thumb1.jpg",
  },
  {
    id: "v-002",
    title: "Séance d'entraînement — Travail technique",
    description: "Immersion dans une séance de travail technique avec nos U12.",
    youtubeId: "dQw4w9WgXcQ",
    category: "training",
    categoryLabel: "Entraînement",
    duration: "12:15",
    publishedAt: "2026-11-01",
    featured: false,
    thumbnail: "/images/tv/thumb2.jpg",
  },
  {
    id: "v-003",
    title: "Interview — Ahmed Ben Ali, promotion 2020",
    description: "Notre alumni aujourd'hui à l'Espérance de Tunis revient sur sa formation à l'académie.",
    youtubeId: "dQw4w9WgXcQ",
    category: "interview",
    categoryLabel: "Interview",
    duration: "6:30",
    publishedAt: "2026-10-28",
    featured: true,
    thumbnail: "/images/tv/thumb3.jpg",
  },
  {
    id: "v-004",
    title: "Les coulisses du stage en Espagne",
    description: "Découvrez comment s'est déroulé notre stage estival au Real Valladolid CF.",
    youtubeId: "dQw4w9WgXcQ",
    category: "behind-scenes",
    categoryLabel: "Coulisses",
    duration: "15:20",
    publishedAt: "2026-10-15",
    featured: false,
    thumbnail: "/images/tv/thumb4.jpg",
  },
  {
    id: "v-005",
    title: "Tutoriel — Le contrôle orienté",
    description: "Notre directeur technique explique les bases du contrôle orienté.",
    youtubeId: "dQw4w9WgXcQ",
    category: "tutorial",
    categoryLabel: "Tutoriel",
    duration: "4:15",
    publishedAt: "2026-10-10",
    featured: false,
    thumbnail: "/images/tv/thumb5.jpg",
  },
  {
    id: "v-006",
    title: "Match complet — ARV vs AS Gabès (finale)",
    description: "Le match dans son intégralité, pour revivre la victoire.",
    youtubeId: "dQw4w9WgXcQ",
    category: "match",
    categoryLabel: "Match",
    duration: "92:00",
    publishedAt: "2026-11-07",
    featured: false,
    thumbnail: "/images/tv/thumb6.jpg",
  },
];

export const videoCategories = [
  { id: "all", label: "Toutes" },
  { id: "match", label: "Matchs" },
  { id: "training", label: "Entraînements" },
  { id: "interview", label: "Interviews" },
  { id: "behind-scenes", label: "Coulisses" },
  { id: "tutorial", label: "Tutoriels" },
] as const;

export function getFeaturedVideos(limit = 3): Video[] {
  return videos.filter((v) => v.featured).slice(0, limit);
}