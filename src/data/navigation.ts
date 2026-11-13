export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

export const mainNavigation: NavItem[] = [
  { label: "Club", href: "/valladolid/club" },
  { label: "Palmarès", href: "/valladolid/palmares" },
  { label: "Matchs", href: "/valladolid/matchs" },
  { label: "TV", href: "/valladolid/tv" },
  { label: "Boutique", href: "/valladolid/boutique" },
  { label: "Alumni", href: "/valladolid/alumni" },
  { label: "Actualités", href: "/valladolid/actualites" },
  { label: "Contact", href: "/contact" },
];

export const footerNavigation = {
  club: {
    title: "Club",
    links: [
      { label: "Notre histoire", href: "/valladolid/club" },
      { label: "Équipe", href: "/equipe" },
      { label: "Palmarès", href: "/valladolid/palmares" },
      { label: "TV", href: "/valladolid/tv" },
    ],
  },
  competition: {
    title: "Compétition",
    links: [
      { label: "Matchs", href: "/valladolid/matchs" },
      { label: "Alumni", href: "/valladolid/alumni" },
      { label: "Actualités", href: "/valladolid/actualites" },
      { label: "Inscription", href: "/valladolid/inscription" },
    ],
  },
  boutique: {
    title: "Boutique",
    links: [
      { label: "Maillots", href: "/boutique#maillots" },
      { label: "Équipement", href: "/boutique#equipement" },
      { label: "Merchandising", href: "/boutique#merchandising" },
      { label: "Wallpapers", href: "/boutique#wallpapers" },
    ],
  },
  legal: {
    title: "Légal",
    links: [
      { label: "Mentions légales", href: "/valladolid/mentions-legales" },
      { label: "Confidentialité", href: "/valladolid/politique-confidentialite" },
      { label: "Cookies", href: "/valladolid/cookies" },
      { label: "CGV", href: "/valladolid/cgv" },
    ],
  },
};

export const languageOptions = [
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "ar", label: "العربية", flag: "🇹🇳" },
  { code: "en", label: "English", flag: "🇬🇧" },
] as const;