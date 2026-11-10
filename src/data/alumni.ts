export interface Alumni {
  id: string;
  name: string;
  promo: string;
  current: string;
  role: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  initials: string;
  role: string;
  quote: string;
}

export const alumni: Alumni[] = [
  {
    id: "ahmed-ben-ali",
    name: "Ahmed Ben Ali",
    promo: "2020",
    current: "Espérance de Tunis",
    role: "Milieu de terrain",
    image: "/images/graduated/grad1.png",
  },
  {
    id: "mohamed-trabelsi",
    name: "Mohamed Trabelsi",
    promo: "2019",
    current: "Université de Californie",
    role: "Défenseur",
    image: "/images/graduated/grad2.png",
  },
  {
    id: "yassine-hamdi",
    name: "Yassine Hamdi",
    promo: "2021",
    current: "Real Valladolid CF",
    role: "Attaquant",
    image: "/images/graduated/grad3.png",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "fatma-khelifi",
    name: "Fatma Khelifi",
    initials: "FK",
    role: "Parent, U12",
    quote:
      "Mon fils a progressé incroyablement en 6 mois. Les entraîneurs sont professionnels et attentionnés.",
  },
  {
    id: "mohamed-bouazizi",
    name: "Mohamed Bouazizi",
    initials: "MB",
    role: "Parent, U15",
    quote:
      "L'académie offre des opportunités incroyables. Mon fils a participé à un stage en Espagne.",
  },
  {
    id: "sami-amara",
    name: "Sami Amara",
    initials: "SA",
    role: "Parent, U10",
    quote:
      "Les installations sont modernes et bien entretenues. Mon fils adore venir aux entraînements.",
  },
];