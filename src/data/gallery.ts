export interface GalleryImage {
  team: string;
  id: string;
  label: string;
  image: string;
  span: string;
}

export const GALLERY: GalleryImage[] = [
  {
    id: "g1", team: "valladolid",
    label: "Tournoi de Sfax — finale U15",
    image: "/images/tv/gal1.jpg",
    span: "col-span-2 row-span-2",
  },
  {
    id: "g2", team: "valladolid",
    label: "Séance technique U12",
    image: "/images/tv/gal2.jpg",
    span: "col-span-2",
  },
  {
    id: "g3", team: "valladolid",
    label: "Stage en Espagne",
    image: "/images/tv/gal3.jpg",
    span: "col-span-1",
  },
  {
    id: "g4", team: "valladolid",
    label: "Remise des trophées",
    image: "/images/tv/gal4.jpg",
    span: "col-span-1",
  },
  {
    id: "g5", team: "valladolid",
    label: "Entraînement au stade",
    image: "/images/tv/gal5.jpg",
    span: "col-span-2",
  },
  {
    id: "g6", team: "valladolid",
    label: "Coulisses du tournoi",
    image: "/images/tv/gal6.jpg",
    span: "col-span-2",
  },

  // Ennour (women's football) - test images
  { id: "en1", team: "ennour", label: "Formation féminine", image: "/images/academy/kids-trophy.jpg", span: "col-span-2 row-span-2" },
  { id: "en2", team: "ennour", label: "Entraînement", image: "/images/hero/hero1.jpg", span: "col-span-2" },
  { id: "en3", team: "ennour", label: "Esprit d'équipe", image: "/images/academy/club.jpg", span: "col-span-1" },
  { id: "en4", team: "ennour", label: "Compétition", image: "/images/hero/hero2.jpg", span: "col-span-1" },
  { id: "en5", team: "ennour", label: "Victoire", image: "/images/academy/palmares.jpg", span: "col-span-2" },
  { id: "en6", team: "ennour", label: "Célébration", image: "/images/hero/hero3.jpg", span: "col-span-2" },

  // Avenir (futsal + football) - test images
  { id: "av1", team: "avenir", label: "Football à 11", image: "/images/hero/hero4.jpg", span: "col-span-2 row-span-2" },
  { id: "av2", team: "avenir", label: "Futsal", image: "/images/hero/hero1.jpg", span: "col-span-2" },
  { id: "av3", team: "avenir", label: "Technique", image: "/images/academy/club.jpg", span: "col-span-1" },
  { id: "av4", team: "avenir", label: "Action", image: "/images/hero/hero2.jpg", span: "col-span-1" },
  { id: "av5", team: "avenir", label: "Trophée", image: "/images/academy/palmares.jpg", span: "col-span-2" },
  { id: "av6", team: "avenir", label: "Victoire", image: "/images/hero/hero3.jpg", span: "col-span-2" },
];