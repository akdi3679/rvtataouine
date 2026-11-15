import { TEAMS } from "./team-theme";

// Re-export social types for backward compatibility.
// They are defined in team-theme.ts (where they're actually used).
export type { SocialLink, SocialIconName } from "./team-theme";

export interface LegalLink {
  label: string;
  href: string;
}

export const brand = {
  name: "Académie Real Valladolid Tataouine",
  shortName: "ARV Tataouine",
  tagline: "Développer les Champions de Demain",
  taglineAr: "تطوير أبطال الغد",
  taglineEn: "Developing Tomorrow's Champions",

  // Publisher / legal entity (used in copyright, legal pages, GDPR notices)
  email: "contact@arv-tataouine.tn",
  phone: "+216 75 854 717",
  whatsapp: "+216 75 854 717",
  address: {
    street: "Tataouine",
    city: "Tataouine",
    country: "Tunisia",
  },

  partnership: {
    club: "Real Valladolid CF",
    status: "Partenaire Officiel",
    logo: "/images/logo/real-valladolid.png",
  },

  colors: {
    primary: TEAMS.valladolid.hex,
    accent: "#E7001C",
    white: "#FFFFFF",
  },

  // Legal pages — one set for the whole club, at root
  legalLinks: [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "Confidentialité", href: "/politique-confidentialite" },
    { label: "Cookies", href: "/cookies" },
    { label: "CGV", href: "/cgv" },
  ] satisfies LegalLink[],
};