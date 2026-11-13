export type TeamId = "group" | "valladolid" | "ennour" | "avenir";

export interface TeamTheme {
  id: TeamId;
  name: string;
  shortName: string;
  hex: string;
  bgClass: string;
  textClass: string;
  bgSoftClass: string;
  borderClass: string;
  logoPath: string;
}

export const TEAM_THEME: Record<TeamId, TeamTheme> = {
  group: {
    id: "group",
    name: "Groupe ARV",
    shortName: "Groupe",
    hex: "#1F5F8B",
    bgClass: "bg-[#1F5F8B]",
    textClass: "text-[#1F5F8B]",
    bgSoftClass: "bg-[#1F5F8B]/10",
    borderClass: "border-[#1F5F8B]",
    logoPath: "/images/logo/logo.png",
  },
  valladolid: {
    id: "valladolid",
    name: "Real Valladolid",
    shortName: "Valladolid",
    hex: "#5E2D91",
    bgClass: "bg-primary",
    textClass: "text-primary",
    bgSoftClass: "bg-primary/10",
    borderClass: "border-primary",
    logoPath: "/images/logo/valladolid.png",
  },
  ennour: {
    id: "ennour",
    name: "Ennour Sportif",
    shortName: "Ennour",
    hex: "#7A1F2B",
    bgClass: "bg-[#7A1F2B]",
    textClass: "text-[#7A1F2B]",
    bgSoftClass: "bg-[#7A1F2B]/10",
    borderClass: "border-[#7A1F2B]",
    logoPath: "/images/logo/ennour.png",
  },
  avenir: {
    id: "avenir",
    name: "Avenir Sportif",
    shortName: "Avenir",
    hex: "#0F2A47",
    bgClass: "bg-[#0F2A47]",
    textClass: "text-[#0F2A47]",
    bgSoftClass: "bg-[#0F2A47]/10",
    borderClass: "border-[#0F2A47]",
    logoPath: "/images/logo/avenir.png",
  },
};

const FALLBACK_LOGO = "/images/logo/logo.png";

export function getSectionFromPath(pathname: string): TeamId {
  if (pathname.includes("/valladolid")) return "valladolid";
  if (pathname.includes("/ennour")) return "ennour";
  if (pathname.includes("/avenir")) return "avenir";
  return "group";
}

export function getLogoPath(team: TeamId): string {
  return TEAM_THEME[team]?.logoPath ?? FALLBACK_LOGO;
}

export { FALLBACK_LOGO };