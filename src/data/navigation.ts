export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

export const mainNavigation: NavItem[] = [
  { label: "Club", href: "/club" },
  { label: "Palmarès", href: "/palmares" },
  { label: "Matchs", href: "/matchs" },
  { label: "TV", href: "/tv" },
  { label: "Boutique", href: "/boutique" },
  { label: "Alumni", href: "/alumni" },
  { label: "Actualités", href: "/actualites" },
  { label: "Contact", href: "/contact" },
];

export const footerNavigation = {
  club: {
    title: "Club",
    links: [
      { label: "Notre histoire", href: "/club" },
      { label: "Équipe", href: "/equipe" },
      { label: "Palmarès", href: "/palmares" },
      { label: "TV", href: "/tv" },
    ],
  },
  competition: {
    title: "Compétition",
    links: [
      { label: "Matchs", href: "/matchs" },
      { label: "Alumni", href: "/alumni" },
      { label: "Actualités", href: "/actualites" },
      { label: "Inscription", href: "/inscription" },
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
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Confidentialité", href: "/politique-confidentialite" },
      { label: "Cookies", href: "/cookies" },
      { label: "CGV", href: "/cgv" },
    ],
  },
};

export const languageOptions = [
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "ar", label: "العربية", flag: "🇹🇳" },
  { code: "en", label: "English", flag: "🇬🇧" },
] as const;