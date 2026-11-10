export interface HeroSlide {
  id: string;
  image: string;
  imageMobile: string;
  category: string;
  title: string;
  ctaLabel: string;
  ctaHref: string;
  duration: number;
}

export const heroSlides: HeroSlide[] = [
  {
    id: "slide-1",
    image: "/images/hero/hero1.jpg",
    imageMobile: "/images/hero/hero1.jpg",
    category: "Actualité",
    title: "Victoire éclatante des U15 au tournoi de Sfax",
    ctaLabel: "En savoir plus",
    ctaHref: "/actualites/victoire-u15-tournoi-sfax",
    duration: 6,
  },
    {
    id: "slide-2",
    image: "/images/hero/hero2.jpg",
    imageMobile: "/images/hero/hero2.jpg",
    category: "Événement International",
    title: "International U13 Cup — L'Europe à Tataouine, mars 2027",
    ctaLabel: "Découvrir le tournoi",
    ctaHref: "/actualites/international-u13-cup-2027-tataouine",
    duration: 6,
  },
  {
    id: "slide-3",
    image: "/images/hero/hero3.jpg",
    imageMobile: "/images/hero/hero3.jpg",
    category: "Produit",
    title: "Nouveau maillot domicile 2026/2027",
    ctaLabel: "Voir la boutique",
    ctaHref: "/boutique",
    duration: 6,
  },
  {
    id: "slide-4",
    image: "/images/hero/hero4.jpg",
    imageMobile: "/images/hero/hero4.jpg",
    category: "Club",
    title: "Nos nouvelles installations d'analyse vidéo",
    ctaLabel: "Visiter le club",
    ctaHref: "/club",
    duration: 6,
  },
];

export const heroFallbackGradients = [
  "linear-gradient(135deg, #5E2D91 0%, #E7001C 100%)",
  "linear-gradient(135deg, #E7001C 0%, #5E2D91 100%)",
  "linear-gradient(135deg, #5E2D91 0%, #EDBB4A 100%)",
  "linear-gradient(135deg, #1A1F3A 0%, #5E2D91 100%)",
];