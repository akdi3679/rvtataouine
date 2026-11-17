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
];