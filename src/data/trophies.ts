export interface Trophy {
  year: number;
  title: string;
  competition: string;
  category: string;
  description: string;
  image?: string;
}

export interface Season {
  year: string;
  trophies: Trophy[];
  highlights: string[];
}

export const seasons: Season[] = [
  {
    year: "2025-2026",
    trophies: [
      {
        year: 2026,
        title: "Champion Régional U15",
        competition: "Ligue du Sud",
        category: "U15",
        description:
          "Titre remporté après une saison parfaite avec 18 victoires en 20 matchs.",
        image: "/images/trophet/trophy1.png",
      },
      {
        year: 2026,
        title: "Tournoi de Sfax",
        competition: "Tournoi interrégional",
        category: "U15",
        description: "Victoire en finale face à l'AS Gabès (3-1).",
        image: "/images/trophet/trophy2.png",
      },
    ],
    highlights: [
      "150+ joueurs formés cette saison",
      "3 joueurs sélectionnés en équipe régionale",
      "Partenariat renouvelé avec Real Valladolid CF",
    ],
  },
  {
    year: "2024-2025",
    trophies: [
      {
        year: 2025,
        title: "Vice-Champion U18",
        competition: "Championnat National",
        category: "U18",
        description:
          "Performance historique en atteignant la finale nationale.",
        image: "/images/trophet/trophy3.png",
      },
      {
        year: 2025,
        title: "Fair-Play Award",
        competition: "Ligue du Sud",
        category: "Toutes catégories",
        description:
          "Récompense pour l'exemplarité de nos joueurs sur et en dehors du terrain.",
        image: "/images/trophet/trophy4.png",
      },
    ],
    highlights: [
      "Ahmed Ben Ali signe à l'Espérance de Tunis",
      "Inauguration de la salle d'analyse vidéo",
      "Premier stage en Espagne pour 10 joueurs",
    ],
  },
];

export const totalTrophies = seasons.reduce(
  (acc, s) => acc + s.trophies.length,
  0,
);
export const totalPlayers = 150;
export const totalProPlayers = 23;