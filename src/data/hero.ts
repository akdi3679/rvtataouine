export interface HeroSlide {
  id: string;
  image: string;           // Desktop image
  imageMobile: string;     // Mobile image
  category: string;
  title: string;
  ctaLabel: string;
  ctaHref: string;
  duration: number;
}

export const heroSlides: HeroSlide[] = [
  {
    id: "slide-1",
    image: "/images/hero/slide-1-desktop.jpg",
    imageMobile: "/images/hero/slide-1-mobile.jpg",
    category: "Actualité",
    title: "Victoire éclatante des U15 au tournoi de Sfax",
    ctaLabel: "En savoir plus",
    ctaHref: "/actualites",
    duration: 6,
  },
  {
    id: "slide-2",
    image: "/images/hero/slide-2-desktop.jpg",
    imageMobile: "/images/hero/slide-2-mobile.jpg",
    category: "Événement",
    title: "Stage d'été 2027 au Real Valladolid",
    ctaLabel: "Découvrir le stage",
    ctaHref: "/actualites",
    duration: 6,
  },
  {
    id: "slide-3",
    image: "/images/hero/slide-3-desktop.jpg",
    imageMobile: "/images/hero/slide-3-mobile.jpg",
    category: "Produit",
    title: "Nouveau maillot domicile 2026/2027",
    ctaLabel: "Voir la boutique",
    ctaHref: "/boutique",
    duration: 6,
  },
  {
    id: "slide-4",
    image: "/images/hero/slide-4-desktop.jpg",
    imageMobile: "/images/hero/slide-4-mobile.jpg",
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