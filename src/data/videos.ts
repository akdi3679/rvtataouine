export interface Video {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  category: "match" | "training" | "interview" | "behind-scenes" | "tutorial";
  categoryLabel: string;
  duration: string;
  team?: string;
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
    team: "valladolid",
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
    team: "valladolid",
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
    team: "valladolid",
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
    team: "valladolid",
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
    team: "valladolid",
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
    team: "valladolid",
    duration: "92:00",
    publishedAt: "2026-11-07",
    featured: false,
    thumbnail: "/images/tv/thumb6.jpg",
  },
    {
    id: "v-007",
    title: "Ennour — Résumé du tournoi régional",
    description: "Les meilleurs moments du sacre d'Ennour au tournoi régional.",
    youtubeId: "dQw4w9WgXcQ",
    category: "match",
    categoryLabel: "Match",
    duration: "6:20",
    team: "ennour",
    publishedAt: "2026-11-12",
    featured: true,
    thumbnail: "/images/tv/thumb1.jpg",
  },
  {
    id: "v-008",
    title: "Ennour — Entraînement U15 féminines",
    description: "Immersion dans une séance d'entraînement.",
    youtubeId: "dQw4w9WgXcQ",
    category: "training",
    categoryLabel: "Entraînement",
    duration: "8:45",
    team: "ennour",
    publishedAt: "2026-11-08",
    featured: false,
    thumbnail: "/images/tv/thumb2.jpg",
  },
  {
    id: "v-009",
    title: "Avenir — Finale régionale futsal U15",
    description: "Le match complet de notre victoire en finale.",
    youtubeId: "dQw4w9WgXcQ",
    category: "match",
    categoryLabel: "Match",
    duration: "10:15",
    team: "avenir",
    publishedAt: "2026-11-11",
    featured: true,
    thumbnail: "/images/tv/thumb3.jpg",
  },
  {
    id: "v-010",
    title: "Avenir — Techniques de futsal",
    description: "Tutoriel sur les bases du contrôle orienté en futsal.",
    youtubeId: "dQw4w9WgXcQ",
    category: "tutorial",
    categoryLabel: "Tutoriel",
    duration: "5:30",
    team: "avenir",
    publishedAt: "2026-11-05",
    featured: false,
    thumbnail: "/images/tv/thumb5.jpg",
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
export function getVideosByTeam(team: string): Video[] {
  if (team === "all") return videos;
  return videos.filter((v) => v.team === team);
}