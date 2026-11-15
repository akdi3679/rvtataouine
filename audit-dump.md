me ( look what we did now is perfect but i have issue i wont to write on each file the variable like our teams can be changed or added so i dont like never t write inline on the files the teams i prefer one file as source fo truth instead of thinsg like ( const TEAM_STYLES: Record<TeamId, { button: string; progress: string }> = { group: { button: "bg-[#F0C419] text-[#1F5F8B] hover:bg-[#F0C419]/90", progress: "bg-[#F0C419]", }, valladolid: { button: "bg-accent text-white hover:bg-accent-light", progress: "bg-gold", }, ennour: { button: "bg-[#F0C419] text-[#7A1F2B] hover:bg-[#F0C419]/90", progress: "bg-[#F0C419]", }, avenir: { button: "bg-[#F0C419] text-[#0F2A47] hover:bg-[#F0C419]/90", progress: "bg-[#F0C419]", }, }; ) that bad right ? we wnana propre work , u know what all files have changed or verify to fix them)
  u ( # Refactor — source unique pour tous les teams

Tu as raison. Le code actuel a `TEAM_STYLES`, `SECTIONS`, `getFooterColumns`, `TEAM_OPTIONS`, `OPTIONS` éparpillés dans 7+ fichiers. Un seul fichier doit contenir TOUT ce qui est spécifique aux équipes.

## Diagnostic — où sont les données team dispersées

| Fichier | Données team inline |
|---|---|
| `src/data/team-theme.ts` | `TEAM_THEME` (basique) |
| `hero-carousel.tsx` | `TEAM_STYLES` (button/progress) |
| `navbar.tsx` | `SECTIONS` (dropdowns, primaryLinks, mobileGroups) |
| `footer.tsx` | `getFooterColumns()` |
| `page.tsx` (group) | hex codes `#0B3E5C`, `#1F5F8B`, `#0F2A47` + `ENTITIES`, `VALUES` |
| `ennour/page.tsx` | gradients bordeaux `#7A1F2B`, `#5C1620`, `#141414` |
| `avenir/page.tsx` | gradients navy `#0F2A47`, `#1E3B66` |
| `inscription/page.tsx` | `TEAM_OPTIONS` (labels + taglines) |
| `contact/page.tsx` | `TEAM_OPTIONS` (labels) |
| `team-filter.tsx` | `OPTIONS` (labels) |

**Total : ~10 endroits à modifier pour ajouter une équipe.**

---

## 1. `src/data/team-theme.ts` — le fichier unique

Remplace **tout** :

```ts
export type TeamId = "group" | "valladolid" | "ennour" | "avenir";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavDropdown {
  label: string;
  links: NavLink[];
}

export interface MobileNavGroup {
  title: string;
  links: NavLink[];
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export interface TeamConfig {
  id: TeamId;
  name: string;
  shortName: string;
  initials: string;

  // Colors — hex + Tailwind classes
  hex: string;
  hexDark: string;
  hexLight: string;
  bgClass: string;
  textClass: string;
  bgSoftClass: string;
  borderClass: string;

  // Hero gradient for full-bg heroes (Ennour, Avenir, Group fallback)
  heroGradient: string;
  // Optional overlay used on Group hero (image + gradient overlay)
  heroOverlayR?: string;

  // Logo
  logoPath: string;

  // Hero carousel button + progress colors
  carousel: {
    button: string;
    progress: string;
  };

  // Navbar configuration
  nav: {
    dropdowns?: NavDropdown[];
    primaryLinks: NavLink[];
    mobileGroups: MobileNavGroup[];
  };

  // Footer columns
  footerColumns: FooterColumn[];

  // Inscription/contact form metadata
  formTagline: string;
  formIcon: "shield" | "heart" | "zap" | "star";
}

export const TEAMS: Record<TeamId, TeamConfig> = {
  group: {
    id: "group",
    name: "Groupe ARV",
    shortName: "Groupe",
    initials: "ARV",
    hex: "#0B3E5C",
    hexDark: "#082B42",
    hexLight: "#155C8A",
    bgClass: "bg-[#0B3E5C]",
    textClass: "text-[#0B3E5C]",
    bgSoftClass: "bg-[#0B3E5C]/10",
    borderClass: "border-[#0B3E5C]",
    heroGradient: "from-[#0B3E5C] via-[#0B3E5C] to-[#0F2A47]",
    heroOverlayR: "from-[#0B3E5C]/70 via-transparent to-[#0F2A47]/60",
    logoPath: "/images/logo/logo.png",
    carousel: {
      button: "bg-[#F0C419] text-[#0B3E5C] hover:bg-[#F0C419]/90",
      progress: "bg-[#F0C419]",
    },
    nav: {
      dropdowns: [
        {
          label: "Nos équipes",
          links: [
            { label: "Real Valladolid", href: "/valladolid" },
            { label: "Ennour Sportif", href: "/ennour" },
            { label: "Avenir Sportif", href: "/avenir" },
          ],
        },
      ],
      primaryLinks: [
        { label: "TV", href: "/tv" },
        { label: "Actualités", href: "/actualites" },
        { label: "Boutique", href: "/boutique" },
        { label: "Contact", href: "/contact" },
      ],
      mobileGroups: [
        {
          title: "Nos équipes",
          links: [
            { label: "Real Valladolid", href: "/valladolid" },
            { label: "Ennour Sportif", href: "/ennour" },
            { label: "Avenir Sportif", href: "/avenir" },
          ],
        },
        {
          title: "Le groupe",
          links: [
            { label: "TV", href: "/tv" },
            { label: "Actualités", href: "/actualites" },
            { label: "Boutique", href: "/boutique" },
          ],
        },
        {
          title: "Contact",
          links: [{ label: "Nous contacter", href: "/contact" }],
        },
      ],
    },
    footerColumns: [
      {
        title: "Le Groupe",
        links: [
          { label: "Real Valladolid", href: "/valladolid" },
          { label: "Ennour Sportif", href: "/ennour" },
          { label: "Avenir Sportif", href: "/avenir" },
        ],
      },
      {
        title: "Contact",
        links: [
          { label: "Nous contacter", href: "/contact" },
          { label: "Inscription", href: "/inscription" },
        ],
      },
      {
        title: "Légal",
        links: [
          { label: "Mentions légales", href: "/valladolid/mentions-legales" },
          { label: "Confidentialité", href: "/valladolid/politique-confidentialite" },
          { label: "Cookies", href: "/valladolid/cookies" },
          { label: "CGV", href: "/valladolid/cgv" },
        ],
      },
    ],
    formTagline: "Toutes les équipes du groupe",
    formIcon: "shield",
  },

  valladolid: {
    id: "valladolid",
    name: "Real Valladolid",
    shortName: "Valladolid",
    initials: "RV",
    hex: "#5E2D91",
    hexDark: "#422068",
    hexLight: "#7B3FB8",
    bgClass: "bg-primary",
    textClass: "text-primary",
    bgSoftClass: "bg-primary/10",
    borderClass: "border-primary",
    heroGradient: "from-primary via-primary-dark to-accent-dark",
    logoPath: "/images/logo/valladolid.png",
    carousel: {
      button: "bg-accent text-white hover:bg-accent-light",
      progress: "bg-gold",
    },
    nav: {
      dropdowns: [
        {
          label: "Club",
          links: [
            { label: "Club", href: "/valladolid/club" },
            { label: "Palmarès", href: "/valladolid/palmares" },
            { label: "Alumni", href: "/valladolid/alumni" },
          ],
        },
      ],
      primaryLinks: [
        { label: "Matchs", href: "/valladolid/matchs" },
        { label: "TV", href: "/tv?team=valladolid" },
        { label: "Actualités", href: "/actualites?team=valladolid" },
        { label: "Boutique", href: "/boutique?team=valladolid" },
        { label: "Contact", href: "/contact" },
      ],
      mobileGroups: [
        {
          title: "Club",
          links: [
            { label: "Notre Club", href: "/valladolid/club" },
            { label: "Palmarès", href: "/valladolid/palmares" },
            { label: "Alumni", href: "/valladolid/alumni" },
          ],
        },
        {
          title: "Compétition",
          links: [
            { label: "Matchs", href: "/valladolid/matchs" },
            { label: "TV", href: "/tv?team=valladolid" },
            { label: "Actualités", href: "/actualites?team=valladolid" },
          ],
        },
        {
          title: "Boutique",
          links: [{ label: "Boutique", href: "/boutique?team=valladolid" }],
        },
        {
          title: "Contact",
          links: [{ label: "Contact", href: "/contact" }],
        },
      ],
    },
    footerColumns: [
      {
        title: "Club",
        links: [
          { label: "Notre histoire", href: "/valladolid/club" },
          { label: "Palmarès", href: "/valladolid/palmares" },
          { label: "TV", href: "/tv?team=valladolid" },
        ],
      },
      {
        title: "Compétition",
        links: [
          { label: "Matchs", href: "/valladolid/matchs" },
          { label: "Alumni", href: "/valladolid/alumni" },
          { label: "Actualités", href: "/actualites?team=valladolid" },
          { label: "Inscription", href: "/inscription" },
        ],
      },
      {
        title: "Boutique",
        links: [
          { label: "Maillots", href: "/boutique?team=valladolid" },
          { label: "Équipement", href: "/boutique?team=valladolid" },
        ],
      },
      {
        title: "Légal",
        links: [
          { label: "Mentions légales", href: "/valladolid/mentions-legales" },
          { label: "Confidentialité", href: "/valladolid/politique-confidentialite" },
          { label: "Cookies", href: "/valladolid/cookies" },
          { label: "CGV", href: "/valladolid/cgv" },
        ],
      },
    ],
    formTagline: "Football masculin · académie historique",
    formIcon: "shield",
  },

  ennour: {
    id: "ennour",
    name: "Ennour Sportif",
    shortName: "Ennour",
    initials: "EN",
    hex: "#7A1F2B",
    hexDark: "#5C1620",
    hexLight: "#A02A38",
    bgClass: "bg-[#7A1F2B]",
    textClass: "text-[#7A1F2B]",
    bgSoftClass: "bg-[#7A1F2B]/10",
    borderClass: "border-[#7A1F2B]",
    heroGradient: "from-[#7A1F2B] via-[#5C1620] to-[#141414]",
    logoPath: "/images/logo/ennour.png",
    carousel: {
      button: "bg-[#F0C419] text-[#7A1F2B] hover:bg-[#F0C419]/90",
      progress: "bg-[#F0C419]",
    },
    nav: {
      primaryLinks: [
        { label: "À propos", href: "/ennour#mission" },
        { label: "TV", href: "/tv?team=ennour" },
        { label: "Actualités", href: "/actualites?team=ennour" },
        { label: "Boutique", href: "/boutique?team=ennour" },
        { label: "Contact", href: "/contact" },
      ],
      mobileGroups: [
        {
          title: "Ennour Sportif",
          links: [
            { label: "À propos", href: "/ennour#mission" },
            { label: "Galerie", href: "/ennour#gallery" },
            { label: "TV", href: "/tv?team=ennour" },
            { label: "Actualités", href: "/actualites?team=ennour" },
            { label: "Boutique", href: "/boutique?team=ennour" },
          ],
        },
        {
          title: "Le Groupe",
          links: [{ label: "Retour au groupe", href: "/" }],
        },
        {
          title: "Contact",
          links: [{ label: "Nous contacter", href: "/contact" }],
        },
      ],
    },
    footerColumns: [
      {
        title: "Le Groupe",
        links: [
          { label: "Real Valladolid", href: "/valladolid" },
          { label: "Ennour Sportif", href: "/ennour" },
          { label: "Avenir Sportif", href: "/avenir" },
        ],
      },
      {
        title: "Contact",
        links: [
          { label: "Nous contacter", href: "/contact" },
          { label: "Inscription", href: "/inscription" },
        ],
      },
      {
        title: "Légal",
        links: [
          { label: "Mentions légales", href: "/valladolid/mentions-legales" },
          { label: "Confidentialité", href: "/valladolid/politique-confidentialite" },
          { label: "Cookies", href: "/valladolid/cookies" },
          { label: "CGV", href: "/valladolid/cgv" },
        ],
      },
    ],
    formTagline: "Football féminin",
    formIcon: "heart",
  },

  avenir: {
    id: "avenir",
    name: "Avenir Sportif",
    shortName: "Avenir",
    initials: "AV",
    hex: "#0F2A47",
    hexDark: "#081A2E",
    hexLight: "#1E3B66",
    bgClass: "bg-[#0F2A47]",
    textClass: "text-[#0F2A47]",
    bgSoftClass: "bg-[#0F2A47]/10",
    borderClass: "border-[#0F2A47]",
    heroGradient: "from-[#0F2A47] via-[#1E3B66] to-[#0F2A47]",
    logoPath: "/images/logo/avenir.png",
    carousel: {
      button: "bg-[#F0C419] text-[#0F2A47] hover:bg-[#F0C419]/90",
      progress: "bg-[#F0C419]",
    },
    nav: {
      primaryLinks: [
        { label: "À propos", href: "/avenir#mission" },
        { label: "TV", href: "/tv?team=avenir" },
        { label: "Actualités", href: "/actualites?team=avenir" },
        { label: "Boutique", href: "/boutique?team=avenir" },
        { label: "Contact", href: "/contact" },
      ],
      mobileGroups: [
        {
          title: "Avenir Sportif",
          links: [
            { label: "À propos", href: "/avenir#mission" },
            { label: "Galerie", href: "/avenir#gallery" },
            { label: "TV", href: "/tv?team=avenir" },
            { label: "Actualités", href: "/actualites?team=avenir" },
            { label: "Boutique", href: "/boutique?team=avenir" },
          ],
        },
        {
          title: "Le Groupe",
          links: [{ label: "Retour au groupe", href: "/" }],
        },
        {
          title: "Contact",
          links: [{ label: "Nous contacter", href: "/contact" }],
        },
      ],
    },
    footerColumns: [
      {
        title: "Le Groupe",
        links: [
          { label: "Real Valladolid", href: "/valladolid" },
          { label: "Ennour Sportif", href: "/ennour" },
          { label: "Avenir Sportif", href: "/avenir" },
        ],
      },
      {
        title: "Contact",
        links: [
          { label: "Nous contacter", href: "/contact" },
          { label: "Inscription", href: "/inscription" },
        ],
      },
      {
        title: "Légal",
        links: [
          { label: "Mentions légales", href: "/valladolid/mentions-legales" },
          { label: "Confidentialité", href: "/valladolid/politique-confidentialite" },
          { label: "Cookies", href: "/valladolid/cookies" },
          { label: "CGV", href: "/valladolid/cgv" },
        ],
      },
    ],
    formTagline: "Football & Futsal",
    formIcon: "zap",
  },
};

// Legacy aliases for backwards compatibility
export const TEAM_THEME = TEAMS;

// All team ids (group + entities)
export const TEAM_IDS: TeamId[] = ["group", "valladolid", "ennour", "avenir"];

// Entity ids only (excludes group)
export const ENTITY_IDS: TeamId[] = ["valladolid", "ennour", "avenir"];

// Full list of entities for iteration
export const ENTITY_LIST = ENTITY_IDS.map((id) => TEAMS[id]);

// ============================================================================
// Helpers
// ============================================================================

export function getTeamFromPath(pathname: string): TeamId {
  if (pathname.includes("/valladolid")) return "valladolid";
  if (pathname.includes("/ennour")) return "ennour";
  if (pathname.includes("/avenir")) return "avenir";
  return "group";
}

// Legacy alias
export const getSectionFromPath = getTeamFromPath;

export function getTeamLogoPath(team: TeamId): string {
  return TEAMS[team].logoPath;
}
```

**À partir de maintenant : ajouter une équipe = ajouter 1 entrée dans `TEAMS` + l'id dans `TeamId` type. C'est tout.**

---

## 2. `tailwind.config.ts` — vérifier `src/data`

Doit contenir `./src/data/**/*.{js,ts}` dans `content`. Si absent :

```ts
content: [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/data/**/*.{js,ts}",
],
```

**Indispensable** — sinon les classes arbitraires `bg-[#0B3E5C]` ne compilent pas.

---

## 3. `src/components/sections/hero-carousel.tsx` — patch minimal

**Supprime** le bloc `const TEAM_STYLES: Record<TeamId, ...> = {...}` en entier.

**Change** les 2 usages :

Trouve :
```tsx
const activeTeam = team ?? getSectionFromPath(pathname);
const styles = TEAM_STYLES[activeTeam];
```

Remplace :
```tsx
const activeTeam = team ?? getTeamFromPath(pathname);
const styles = TEAMS[activeTeam].carousel;
```

**Change l'import** :
```tsx
import { getSectionFromPath, type TeamId } from "@/data/team-theme";
```
→
```tsx
import { getTeamFromPath, TEAMS, type TeamId } from "@/data/team-theme";
```

---

## 4. `src/components/layout/navbar.tsx` — supprime `SECTIONS`

**A.** Supprime **tout le bloc** `const SECTIONS: Record<TeamId, SectionConfig> = {...}` (lignes ~40–200).

**B.** Supprime aussi **les interfaces** `DropdownConfig` et `SectionConfig` (lignes ~30–40).

**C.** Change l'import :
```tsx
import { TEAM_THEME, type TeamId } from "@/data/team-theme";
```
→
```tsx
import { TEAMS, getTeamFromPath, type TeamId } from "@/data/team-theme";
```

**D.** Dans le composant, trouve :
```tsx
const team = useActiveTeam();
const section = SECTIONS[team];
const theme = TEAM_THEME[team];
```

Remplace :
```tsx
const team = useActiveTeam();
const theme = TEAMS[team];
const section = theme.nav;
```

Tous les usages `section.dropdowns`, `section.primaryLinks`, `section.mobileGroups`, `section.bgClass` **deviennent** :
- `section.dropdowns` → OK (section = theme.nav)
- `section.primaryLinks` → OK
- `section.mobileGroups` → OK
- `section.bgClass` → **devient** `theme.bgClass` (bgClass est sur le theme, pas sur nav)

Cherche les occurrences `section.bgClass` dans le fichier (2 endroits : le `<nav>` et le dropdown container). Remplace par `theme.bgClass`.

**E.** `MobileMenu` reçoit déjà `bgClass={section.bgClass}` — remplace par `bgClass={theme.bgClass}`.

---

## 5. `src/components/layout/footer.tsx` — supprime `getFooterColumns`

**A.** Supprime la fonction `function getFooterColumns(section: TeamId) {...}` entière (lignes ~230–320 environ).

**B.** Change l'import :
```tsx
import { getSectionFromPath, TEAM_THEME, type TeamId } from "@/data/team-theme";
```
→
```tsx
import { getTeamFromPath, TEAMS } from "@/data/team-theme";
```

**C.** Dans le composant :
```tsx
const section = getSectionFromPath(pathname);
const theme = TEAM_THEME[section];
```
→
```tsx
const section = getTeamFromPath(pathname);
const theme = TEAMS[section];
```

**D.** Remplace :
```tsx
const columns = getFooterColumns(section);
```
→
```tsx
const columns = theme.footerColumns;
```

---

## 6. `src/components/global/team-filter.tsx` — itère `ENTITY_LIST`

Remplace tout le fichier :

```tsx
"use client";

import { useRouter, usePathname } from "next/navigation";
import { ChevronDown, Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { TEAMS, ENTITY_LIST, type TeamId } from "@/data/team-theme";

export function TeamFilter({ currentTeam }: { currentTeam: TeamId | "all" }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const allLabel = "Toutes les équipes";
  const current =
    currentTeam === "all" ? null : TEAMS[currentTeam];

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleSelect = (id: TeamId | "all") => {
    const url = id === "all" ? pathname : `${pathname}?team=${id}`;
    router.push(url, { scroll: false });
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2.5 rounded-md border border-border bg-white px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-foreground/30 hover:bg-secondary/50"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {current && (
          <span
            className="h-2 w-2 rounded-full shrink-0"
            style={{ backgroundColor: current.hex }}
          />
        )}
        <span className="whitespace-nowrap">
          {current ? current.name : allLabel}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-lg border border-border bg-white shadow-xl"
          role="listbox"
        >
          <button
            onClick={() => handleSelect("all")}
            className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors ${
              currentTeam === "all"
                ? "bg-secondary font-semibold text-foreground"
                : "text-foreground hover:bg-secondary/50"
            }`}
            role="option"
            aria-selected={currentTeam === "all"}
          >
            <span className="flex-1">{allLabel}</span>
            {currentTeam === "all" && <Check className="h-4 w-4" />}
          </button>

          {ENTITY_LIST.map((team) => {
            const active = currentTeam === team.id;
            return (
              <button
                key={team.id}
                onClick={() => handleSelect(team.id)}
                className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors ${
                  active
                    ? "bg-secondary font-semibold text-foreground"
                    : "text-foreground hover:bg-secondary/50"
                }`}
                role="option"
                aria-selected={active}
              >
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: team.hex }}
                />
                <span className="flex-1">{team.name}</span>
                {active && <Check className="h-4 w-4" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
```

---

## 7. `inscription/page.tsx` — itère `ENTITY_LIST`

Remplace **uniquement le bloc `TEAM_OPTIONS` + son rendu** :

**A.** Supprime :
```tsx
const TEAM_OPTIONS: { id: TeamId; icon: typeof Shield; tagline: string }[] = [...]
```

**B.** Change l'import :
```tsx
import { TEAM_THEME, type TeamId } from "@/data/team-theme";
```
→
```tsx
import { TEAMS, ENTITY_LIST, type TeamId } from "@/data/team-theme";
import { Shield, Heart, Zap } from "lucide-react";
```

**C.** Ajoute une map d'icônes (lucide est presentation, ok inline) :
```tsx
const FORM_ICONS = { shield: Shield, heart: Heart, zap: Zap, star: Shield };
```

**D.** Remplace le bloc `<TEAM_OPTIONS.map(...)>` par :
```tsx
{ENTITY_LIST.map((team) => {
  const active = form.team === team.id;
  const Icon = FORM_ICONS[team.formIcon];
  return (
    <button
      key={team.id}
      type="button"
      onClick={() => setForm((prev) => ({ ...prev, team: team.id }))}
      className={`group relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all ${
        active
          ? `${team.borderClass} bg-white shadow-md`
          : "border-border hover:border-foreground/30 hover:bg-secondary/30"
      }`}
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-lg"
        style={{ backgroundColor: `${team.hex}15` }}
      >
        <Icon className="h-5 w-5" style={{ color: team.hex }} />
      </div>
      <p className="text-sm font-bold leading-tight text-foreground">{team.name}</p>
      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {team.formTagline}
      </p>
      {active && (
        <span
          className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-white"
          style={{ backgroundColor: team.hex }}
        >
          <CheckCircle2 className="h-3 w-3" />
        </span>
      )}
    </button>
  );
})}
```

Et dans le résumé de succès :
```tsx
const selectedTheme = form.team ? TEAM_THEME[form.team] : null;
```
→
```tsx
const selectedTheme = form.team ? TEAMS[form.team as TeamId] : null;
```

---

## 8. `contact/page.tsx` — itère `ENTITY_LIST`

**A.** Supprime :
```tsx
const TEAM_OPTIONS: { id: TeamId | "group"; label: string }[] = [...]
```

**B.** Change l'import :
```tsx
import { TEAM_THEME, type TeamId } from "@/data/team-theme";
```
→
```tsx
import { TEAMS, TEAM_IDS, type TeamId } from "@/data/team-theme";
```

**C.** Remplace la boucle `<select>` :
```tsx
{TEAM_OPTIONS.map((t) => (
  <option key={t.id} value={t.id}>{t.label}</option>
))}
```
→
```tsx
{TEAM_IDS.map((id) => (
  <option key={id} value={id}>
    {TEAMS[id].name} — {TEAMS[id].formTagline}
  </option>
))}
```

**D.** L'affichage "message sera transmis à X" :
```tsx
const selectedTeamTheme = form.team !== "group" ? TEAM_THEME[form.team] : null;
```
→
```tsx
const selectedTeamTheme = form.team !== "group" ? TEAMS[form.team as TeamId] : null;
```

---

## 9. `page.tsx` (group home) — remplace les hex inline

**A.** GroupHero — remplace les hex :
```tsx
<div className="absolute inset-0 bg-gradient-to-r from-[#1F5F8B]/70 via-transparent to-[#0F2A47]/60" />
```
→
```tsx
<div className={`absolute inset-0 bg-gradient-to-r ${TEAMS.group.heroOverlayR}`} />
```

**B.** VisionSection — remplace `text-[#0B3E5C]` et `text-[#1F5F8B]` :
```tsx
<p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#0B3E5C]">
```
→
```tsx
<p className={`text-[10px] font-bold uppercase tracking-[0.4em] ${TEAMS.group.textClass}`}>
```

```tsx
<span className="text-[#0B3E5C]">
```
→
```tsx
<span className={TEAMS.group.textClass}>
```

**C.** EntitiesSection — kicker `text-[#1F5F8B]` → `text-[#0B3E5C]` (tu avais oublié ce fix) :
```tsx
<p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1F5F8B]">
  Nos entités
</p>
```
→
```tsx
<p className={`text-[10px] font-bold uppercase tracking-[0.3em] ${TEAMS.group.textClass}`}>
  Nos entités
</p>
```

**D.** Import :
```tsx
import { TEAM_THEME, type TeamId } from "@/data/team-theme";
```
→
```tsx
import { TEAMS, type TeamId } from "@/data/team-theme";
```

Puis partout où tu as `TEAM_THEME[entity.id]` → `TEAMS[entity.id]`.

**E.** GroupHero bg fallback :
```tsx
<section className="relative -mt-16 h-[85svh] min-h-[560px] w-full overflow-hidden text-white">
```
Reste comme ça — l'image fait le fond. Si tu veux un fallback coloré :
```tsx
<section className={`relative -mt-16 h-[85svh] min-h-[560px] w-full overflow-hidden text-white ${TEAMS.group.bgClass}`}>
```

**F.** `groupVars` — les CSS vars restent (elles override Tailwind `primary`), mais documente :
```tsx
// Override CSS vars for group identity (blue + gold)
// Values derived from TEAMS.group.hex
const groupVars = {
  "--color-primary": "202 79% 20%",
  "--color-primary-dark": "202 79% 14%",
  "--color-primary-light": "202 79% 30%",
  "--color-accent": "43 100% 60%",
  "--color-accent-dark": "43 100% 50%",
  "--color-accent-light": "43 100% 70%",
} as React.CSSProperties;
```

---

## 10. `ennour/page.tsx` — utilise `TEAMS.ennour.heroGradient`

**A.** Import :
```tsx
import { TEAMS } from "@/data/team-theme";
```

**B.** Hero gradient :
```tsx
<div className="absolute inset-0 bg-gradient-to-br from-[#7A1F2B] via-[#5C1620] to-[#141414]" />
```
→
```tsx
<div className={`absolute inset-0 bg-gradient-to-br ${TEAMS.ennour.heroGradient}`} />
```

**C.** Toutes les occurrences `text-[#7A1F2B]` → `${TEAMS.ennour.textClass}` (via template literal)
**D.** Toutes les occurrences `bg-[#7A1F2B]/10` → `${TEAMS.ennour.bgSoftClass}`
**E.** Galerie tiles `from-[#7A1F2B] to-[#141414]` → `bg-gradient-to-br ${TEAMS.ennour.heroGradient}`
**F.** CTA section `from-[#7A1F2B] via-[#5C1620] to-[#141414]` → `bg-gradient-to-br ${TEAMS.ennour.heroGradient}`
**G.** Bouton blanc + texte bordeaux : `text-[#7A1F2B]` → `style={{ color: TEAMS.ennour.hex }}` (le bouton est inline, on peut utiliser hex directement)

---

## 11. `avenir/page.tsx` — même chose

Remplacer :
- `from-[#0F2A47] via-[#1E3B66] to-[#0F2A47]` → `bg-gradient-to-br ${TEAMS.avenir.heroGradient}`
- `text-[#0F2A47]` → `${TEAMS.avenir.textClass}`
- `bg-[#0F2A47]/10` → `${TEAMS.avenir.bgSoftClass}`
- `text-[#F0C419]` (kicker) → garder comme accent
- Bouton `bg-[#F0C419] text-[#0F2A47]` → `style={{ backgroundColor: "#F0C419", color: TEAMS.avenir.hex }}`

---

## 12. Script de vérification

Enregistre `verify-teams-centralization.ps1` :

```powershell
$ErrorActionPreference = 'Continue'
$root = (Get-Location).Path

Write-Host ""
Write-Host "=== Vérification centralisation TEAMS ===" -ForegroundColor Cyan
Write-Host ""

# Patterns interdits hors de team-theme.ts
$forbiddenPatterns = @(
    @{ Pattern = 'TEAM_STYLES';         Label = "TEAM_STYLES inline" }
    @{ Pattern = 'const SECTIONS';      Label = "SECTIONS inline" }
    @{ Pattern = 'getFooterColumns';    Label = "getFooterColumns inline" }
    @{ Pattern = 'const TEAM_OPTIONS';  Label = "TEAM_OPTIONS inline" }
    @{ Pattern = 'const OPTIONS.*TeamId'; Label = "OPTIONS inline" }
)

$badHits = 0
$files = Get-ChildItem -Path "src" -Recurse -Include *.tsx,*.ts -ErrorAction SilentlyContinue
foreach ($f in $files) {
    $rel = $f.FullName.Substring($root.Length).TrimStart('\','/')
    if ($rel -eq "src\data\team-theme.ts") { continue }
    $c = [System.IO.File]::ReadAllText($f.FullName)
    foreach ($p in $forbiddenPatterns) {
        if ($c -match $p.Pattern) {
            Write-Host "  [BAD] $rel → $($p.Label)" -ForegroundColor Red
            $badHits++
        }
    }
}

if ($badHits -eq 0) {
    Write-Host "  Tous les teams sont centralisés dans team-theme.ts" -ForegroundColor Green
} else {
    Write-Host "  $badHits occurrences inline à nettoyer" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Appuie sur Entree..." -ForegroundColor Cyan
$null = Read-Host
```

---

## Après refactor — ajouter une équipe = 1 seul endroit

```ts
// team-theme.ts
export type TeamId = "group" | "valladolid" | "ennour" | "avenir" | "nouvelle-equipe";

TEAMS["nouvelle-equipe"] = {
  id: "nouvelle-equipe",
  name: "Nouvelle Équipe",
  // ... toute la config ici
};
```

**Aucun autre fichier à toucher.** Navbar, footer, hero-carousel, filter, forms, pages — tout se met à jour automatiquement.

---

## Build + push

```powershell
Remove-Item -Recurse -Force .next
npm run build
```

Si vert :

```powershell
git add .
git commit -m "Refactor: single source of truth for all team config in team-theme.ts"
git push
```

Ensuite lance `.\verify-teams-centralization.ps1` → tu dois voir **"Tous les teams sont centralisés"** ✅

---

## Résumé

| Fichier | Avant | Après |
|---|---|---|
| `team-theme.ts` | 40 lignes | **~450 lignes** (source unique) |
| `hero-carousel.tsx` | `TEAM_STYLES` inline | `TEAMS[team].carousel` |
| `navbar.tsx` | `SECTIONS` inline (160 lignes) | `TEAMS[team].nav` |
| `footer.tsx` | `getFooterColumns()` inline | `TEAMS[team].footerColumns` |
| `page.tsx` | hex `#0B3E5C` etc. | `TEAMS.group.*` |
| `ennour/page.tsx` | hex bordeaux | `TEAMS.ennour.*` |
| `avenir/page.tsx` | hex navy | `TEAMS.avenir.*` |
| `inscription/page.tsx` | `TEAM_OPTIONS` | `ENTITY_LIST` iteration |
| `contact/page.tsx` | `TEAM_OPTIONS` | `TEAM_IDS` iteration |
| `team-filter.tsx` | `OPTIONS` | `ENTITY_LIST` iteration |)

me ( listen i do almost but looks still miss and also looks there pages u didnt apply like i see tv have also inline u know , first give me script to chec what all files still have inline then tell me + what files u wanna see after my edit to paste to u all to verify , $ErrorActionPreference = 'Continue'
PS C:\Users\user\desktop\academie-real-valladolid-tataouine> $root = (Get-Location).Path
PS C:\Users\user\desktop\academie-real-valladolid-tataouine>
PS C:\Users\user\desktop\academie-real-valladolid-tataouine> Write-Host ""

PS C:\Users\user\desktop\academie-real-valladolid-tataouine> Write-Host "=== Vérification centralisation TEAMS ===" -ForegroundColor Cyan
=== Vérification centralisation TEAMS ===
PS C:\Users\user\desktop\academie-real-valladolid-tataouine> Write-Host ""

PS C:\Users\user\desktop\academie-real-valladolid-tataouine>
PS C:\Users\user\desktop\academie-real-valladolid-tataouine> # Patterns interdits hors de team-theme.ts
PS C:\Users\user\desktop\academie-real-valladolid-tataouine> $forbiddenPatterns = @(
>>     @{ Pattern = 'TEAM_STYLES';         Label = "TEAM_STYLES inline" }
>>     @{ Pattern = 'const SECTIONS';      Label = "SECTIONS inline" }
>>     @{ Pattern = 'getFooterColumns';    Label = "getFooterColumns inline" }
>>     @{ Pattern = 'const TEAM_OPTIONS';  Label = "TEAM_OPTIONS inline" }
>>     @{ Pattern = 'const OPTIONS.*TeamId'; Label = "OPTIONS inline" }
>> )
PS C:\Users\user\desktop\academie-real-valladolid-tataouine>
PS C:\Users\user\desktop\academie-real-valladolid-tataouine> $badHits = 0
PS C:\Users\user\desktop\academie-real-valladolid-tataouine> $files = Get-ChildItem -Path "src" -Recurse -Include *.tsx,*.ts -ErrorAction SilentlyContinue
PS C:\Users\user\desktop\academie-real-valladolid-tataouine> foreach ($f in $files) {
>>     $rel = $f.FullName.Substring($root.Length).TrimStart('\','/')
>>     if ($rel -eq "src\data\team-theme.ts") { continue }
>>     $c = [System.IO.File]::ReadAllText($f.FullName)
>>     foreach ($p in $forbiddenPatterns) {
>>         if ($c -match $p.Pattern) {
>>             Write-Host "  [BAD] $rel → $($p.Label)" -ForegroundColor Red
>>             $badHits++
>>         }
>>     }
>> }
PS C:\Users\user\desktop\academie-real-valladolid-tataouine>
PS C:\Users\user\desktop\academie-real-valladolid-tataouine> if ($badHits -eq 0) {
>>     Write-Host "  Tous les teams sont centralisés dans team-theme.ts" -ForegroundColor Green
>> } else {
>>     Write-Host "  $badHits occurrences inline à nettoyer" -ForegroundColor Yellow
>> }
  Tous les teams sont centralisés dans team-theme.ts
PS C:\Users\user\desktop\academie-real-valladolid-tataouine>
PS C:\Users\user\desktop\academie-real-valladolid-tataouine> Write-Host ""

PS C:\Users\user\desktop\academie-real-valladolid-tataouine> Write-Host "Appuie sur Entree..." -ForegroundColor Cyan
Appuie sur Entree...
PS C:\Users\user\desktop\academie-real-valladolid-tataouine> $null = Read-Host

PS C:\Users\user\desktop\academie-real-valladolid-tataouine>
PS C:\Users\user\desktop\academie-real-valladolid-tataouine>
PS C:\Users\user\desktop\academie-real-valladolid-tataouine>

 )

 u ( # Script de détection — inline team data partout

Le script précédent ne cherchait que 5 patterns. Il n'a pas détecté les hex codes hardcodés, les gradients, les noms d'équipes en string, ou la logique `=== "valladolid"`. Voici un vrai détecteur.

## `detect-inline-teams.ps1`

```powershell
$ErrorActionPreference = 'Continue'
$root = (Get-Location).Path

Write-Host ""
Write-Host "=============================================" -ForegroundColor Magenta
Write-Host "  DETECTION INLINE TEAM DATA" -ForegroundColor Magenta
Write-Host "=============================================" -ForegroundColor Magenta
Write-Host ""
Write-Host "Scan: $root\src" -ForegroundColor Cyan
Write-Host "Exclude: src\data\team-theme.ts (source of truth)" -ForegroundColor DarkGray
Write-Host ""

# Palette de hex à détecter (lowercase)
$teamHexes = @{
    "group"      = @("#0B3E5C", "#082B42", "#155C8A", "#1F5F8B")
    "valladolid" = @("#5E2D91", "#422068", "#7B3FB8")
    "ennour"     = @("#7A1F2B", "#5C1620", "#A02A38")
    "avenir"     = @("#0F2A47", "#081A2E", "#1E3B66")
}

# Noms d'équipes à détecter (string literals)
$teamNames = @("Real Valladolid", "Ennour Sportif", "Avenir Sportif", "Groupe ARV")

# Slugs à détecter dans la logique
$teamSlugs = @('"valladolid"', '"ennour"', '"avenir"', '"group"')

# Helpers obsolètes
$obsoleteHelpers = @(
    "TEAM_STYLES"
    "const SECTIONS"
    "function SECTIONS"
    "getFooterColumns"
    "const TEAM_OPTIONS"
    "const TEAM_STYLES"
    "const CATEGORY_GRADIENT.*team"
)

# Détection gradients hardcodés
$gradientPatterns = @(
    'from-\[#[0-9A-Fa-f]{6}\]'
    'via-\[#[0-9A-Fa-f]{6}\]'
    'to-\[#[0-9A-Fa-f]{6}\]'
    'bg-\[#[0-9A-Fa-f]{6}\]'
    'text-\[#[0-9A-Fa-f]{6}\]'
    'border-\[#[0-9A-Fa-f]{6}\]'
)

$files = Get-ChildItem -Path "src" -Recurse -Include *.tsx,*.ts -ErrorAction SilentlyContinue |
    Where-Object { $_.FullName -notmatch '\\src\\data\\team-theme\.ts$' }

$results = @()

foreach ($f in $files) {
    $rel = $f.FullName.Substring($root.Length).TrimStart('\','/')
    $c = [System.IO.File]::ReadAllText($f.FullName)
    $lines = $c -split "`r?`n"
    $issues = @()

    # 1. Hex codes
    foreach ($teamKey in $teamHexes.Keys) {
        foreach ($hex in $teamHexes[$teamKey]) {
            $pattern = [regex]::Escape($hex.ToLower())
            foreach ($line in $lines) {
                if ($line.ToLower() -match $pattern) {
                    # Skip comments only
                    if ($line.TrimStart() -match '^\s*(//|/\*|\*)') { continue }
                    $issues += [pscustomobject]@{
                        Type   = "HEX"
                        Detail = "$hex ($teamKey)"
                        Line   = $line.Trim()
                    }
                }
            }
        }
    }

    # 2. Team names in string literals
    foreach ($name in $teamNames) {
        $pattern = '"' + [regex]::Escape($name) + '"'
        $matches = [regex]::Matches($c, $pattern)
        if ($matches.Count -gt 0) {
            $issues += [pscustomobject]@{
                Type   = "NAME"
                Detail = "`"$name`" as string"
                Line   = "$($matches.Count) occurrence(s)"
            }
        }
    }

    # 3. Team slug conditionals
    foreach ($slug in $teamSlugs) {
        $pattern = '(===|!==|==|!=)\s*' + [regex]::Escape($slug)
        $matches = [regex]::Matches($c, $pattern)
        if ($matches.Count -gt 0) {
            $issues += [pscustomobject]@{
                Type   = "SLUG-LOGIC"
                Detail = "Comparaison avec $slug"
                Line   = "$($matches.Count) occurrence(s) — should use getTeamFromPath()"
            }
        }
    }

    # 4. Hardcoded gradients / bg / text
    foreach ($gp in $gradientPatterns) {
        $matches = [regex]::Matches($c, $gp)
        if ($matches.Count -gt 0) {
            # Filter team-specific hex only
            $teamHits = $matches | Where-Object {
                $hexInMatch = [regex]::Match($_.Value, '#[0-9A-Fa-f]{6}').Value
                if (-not $hexInMatch) { return $false }
                $hexLower = $hexInMatch.ToLower()
                $isTeamHex = $false
                foreach ($k in $teamHexes.Keys) {
                    if ($teamHexes[$k] -contains $hexLower) { $isTeamHex = $true; break }
                }
                return $isTeamHex
            }
            if ($teamHits.Count -gt 0) {
                $samples = ($teamHits | Select-Object -First 2 | ForEach-Object { $_.Value }) -join ', '
                $issues += [pscustomobject]@{
                    Type   = "GRADIENT"
                    Detail = "Tailwind hardcodé (team colors)"
                    Line   = "$($teamHits.Count) occurrence(s) — ex: $samples"
                }
            }
        }
    }

    # 5. Obsolete helpers
    foreach ($helper in $obsoleteHelpers) {
        if ($c -match $helper) {
            $issues += [pscustomobject]@{
                Type   = "HELPER"
                Detail = "Helper obsolète : $helper"
                Line   = "doit utiliser TEAMS[X].carousel / .nav / .footerColumns"
            }
        }
    }

    # 6. Inline team arrays like ["valladolid","ennour","avenir"]
    $arrayMatch = [regex]::Match($c, '\[\s*["''](?:valladolid|ennour|avenir|group)["''].*?\]')
    if ($arrayMatch.Success -and $arrayMatch.Value -match 'valladolid') {
        $issues += [pscustomobject]@{
            Type   = "ARRAY"
            Detail = "Array team ids hardcodé"
            Line   = $arrayMatch.Value.Substring(0, [Math]::Min(60, $arrayMatch.Value.Length))
        }
    }

    if ($issues.Count -gt 0) {
        $results += [pscustomobject]@{
            File   = $rel
            Issues = $issues
        }
    }
}

# === AFFICHAGE ===
if ($results.Count -eq 0) {
    Write-Host "Aucune donnée team inline détectée." -ForegroundColor Green
    Write-Host "Refactor terminé." -ForegroundColor Green
} else {
    Write-Host "=== $($results.Count) FICHIERS AVEC DONNÉES INLINE ===" -ForegroundColor Yellow
    Write-Host ""

    $totalIssues = 0
    foreach ($r in $results) {
        Write-Host "▶ $($r.File)" -ForegroundColor Cyan
        foreach ($i in $r.Issues) {
            $color = switch ($i.Type) {
                "HEX"        { "Red" }
                "NAME"       { "Red" }
                "SLUG-LOGIC" { "Magenta" }
                "GRADIENT"   { "Red" }
                "HELPER"     { "Red" }
                "ARRAY"      { "Yellow" }
                default      { "White" }
            }
            Write-Host "    [$($i.Type)] $($i.Detail)" -ForegroundColor $color
            if ($i.Line -and $i.Line.Length -lt 100) {
                Write-Host "           → $($i.Line)" -ForegroundColor DarkGray
            }
            $totalIssues++
        }
        Write-Host ""
    }

    Write-Host "=== RÉSUMÉ ===" -ForegroundColor Magenta
    Write-Host "  Fichiers  : $($results.Count)"
    Write-Host "  Problèmes : $totalIssues"
    Write-Host ""
    Write-Host "=== QUICK FIX GUIDE ===" -ForegroundColor Yellow
    Write-Host "  HEX/GRADIENT  → use TEAMS[team].hex / .bgClass / .heroGradient"
    Write-Host "  NAME          → iterate ENTITY_LIST or use TEAMS[team].name"
    Write-Host "  SLUG-LOGIC    → use getTeamFromPath(pathname)"
    Write-Host "  HELPER        → use TEAMS[team].carousel / .nav / .footerColumns"
    Write-Host "  ARRAY         → use TEAM_IDS or ENTITY_IDS"
}

Write-Host ""
Write-Host "Appuie sur Entree..." -ForegroundColor Cyan
$null = Read-Host
```

Lance :

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\detect-inline-teams.ps1
```

---

## Ce que le script détecte (6 catégories)

| Type | Cherche | Fichiers typiques |
|---|---|---|
| **HEX** | `#7A1F2B`, `#0F2A47`, `#0B3E5C`, `#5E2D91`, `#1F5F8B`, etc. | `tv-view.tsx`, `page.tsx`, `ennour/page.tsx` |
| **NAME** | `"Real Valladolid"`, `"Ennour Sportif"`, `"Avenir Sportif"`, `"Groupe ARV"` | `inscription/page.tsx`, `contact/page.tsx`, `team-filter.tsx` |
| **SLUG-LOGIC** | `=== "valladolid"`, `=== "ennour"`, `=== "avenir"`, `!== "group"` | `tv/page.tsx`, `boutique/page.tsx`, `actualites/page.tsx` (le fameux `parseTeam`) |
| **GRADIENT** | `from-[#...]`, `bg-[#...]`, `text-[#...]` avec hex équipe | `ennour/page.tsx`, `avenir/page.tsx`, `page.tsx` |
| **HELPER** | `TEAM_STYLES`, `SECTIONS`, `getFooterColumns`, `TEAM_OPTIONS` | `navbar.tsx`, `footer.tsx`, `hero-carousel.tsx` |
| **ARRAY** | `["valladolid", "ennour", "avenir"]` | `team-filter.tsx`, `inscription/page.tsx` |

---

## Fichiers que je veux voir après ton edit

Une fois que tu as corrigé ce que le script flag, **paste-moi dans cet ordre** (un par un, je peux traiter à chaque step) :

### Priorité 1 — Le fameux "TV inline" que tu vois

1. **`src/app/[locale]/(marketing)/tv/page.tsx`** — probablement la fonction `parseTeam` inline
2. **`src/components/sections/tv-view.tsx`** — si `CATEGORY_GRADIENT` ou autre contient du team

### Priorité 2 — Les autres pages partagées

3. **`src/app/[locale]/(marketing)/boutique/page.tsx`**
4. **`src/app/[locale]/(marketing)/actualites/page.tsx`**

### Priorité 3 — Les pages team

5. **`src/app/[locale]/(marketing)/page.tsx`** (group home)
6. **`src/app/[locale]/(marketing)/ennour/page.tsx`**
7. **`src/app/[locale]/(marketing)/avenir/page.tsx`**

### Priorité 4 — Les forms

8. **`src/app/[locale]/(marketing)/inscription/page.tsx`**
9. **`src/app/[locale]/(marketing)/contact/page.tsx`**

### Priorité 5 — Les components critiques

10. **`src/components/global/team-filter.tsx`**
11. **`src/components/sections/hero-carousel.tsx`**
12. **`src/components/layout/navbar.tsx`**
13. **`src/components/layout/footer.tsx`**

### Priorité 6 — Autres

14. **`src/data/team-theme.ts`** — vérifier qu'il est complet et bien structuré
15. **`src/components/global/inscription-popup.tsx`** — si détecté
16. **`src/components/global/floating-buttons.tsx`** — si détecté
17. **`src/components/global/cookie-banner.tsx`** — si détecté

**Si un fichier ne remonte rien dans le script**, pas besoin de le paster — il est propre.

---

## Process recommandé

1. **Lance `detect-inline-teams.ps1`**
2. **Colle-moi la sortie** → je vois exactement quels fichiers restent à nettoyer
3. **Envoie-moi les fichiers flaggés + `team-theme.ts`** (pour que je vérifie la config source)
4. **Je te fais un patch par fichier** avec les imports et remplacements exacts
5. **Re-lance le script** → si 0 issues, c'est fini

**Ne paste pas tout d'un coup** — commence par TV + team-theme.ts. Si le script flag 15 fichiers et que TV est le plus urgent, on règle TV, tu rebuild, tu recheck, on avance.

---

## Note — ce que "TV inline" est probablement

Dans `tv/page.tsx`, tu as sûrement :

```tsx
function parseTeam(value: string | undefined): TeamId | "all" {
  if (value === "valladolid" || value === "ennour" || value === "avenir") return value;
  return "all";
}
```

C'est **exactement ce que mon nouveau script va flagger** (pattern `SLUG-LOGIC`). Le fix : importer `getTeamFromPath` depuis `team-theme.ts`, mais cette fonction travaille sur `pathname`, pas sur query params. On va devoir ajouter un helper `parseTeamQuery()` dans `team-theme.ts` :

```ts
export function parseTeamQuery(value: string | undefined | null): TeamId | "all" {
  if (value === "valladolid" || value === "ennour" || value === "avenir") {
    return value;
  }
  return "all";
}
```

Comme ça, tous les `parseTeam` locaux dans TV/boutique/actualités deviennent un seul import. Ça sera mon premier patch après que tu m'envoies les fichiers. )













//////////////////////////////////////////////////////












me ( import type { Metadata } from "next";
import { videos, type Video } from "@/data/videos";
import { TvView } from "@/components/sections/tv-view";
import { TeamFilter } from "@/components/global/team-filter";
import type { TeamId } from "@/data/team-theme";

export const metadata: Metadata = {
  title: "ARV TV | ARV Tataouine",
  description: "Toutes les vidéos de l'Académie Real Valladolid Tataouine.",
};

type SearchParams = Promise<{ team?: string }>;

function parseTeam(value: string | undefined): TeamId | "all" {
  if (value === "valladolid" || value === "ennour" || value === "avenir") return value;
  return "all";
}

export default async function TvPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const team = parseTeam(params.team);

  const filtered: Video[] =
    team === "all" ? videos : videos.filter((v) => v.team === team);

  return <TvView videos={filtered} team={team} />;
} ,   import type { Metadata } from "next";
import { articles, type Article } from "@/data/news";
import { ActualitesView } from "@/components/sections/actualites-view";
import type { TeamId } from "@/data/team-theme";

export const metadata: Metadata = {
  title: "Actualités | ARV Tataouine",
  description: "Les dernières nouvelles de l'Académie Real Valladolid Tataouine.",
};

type SearchParams = Promise<{ team?: string }>;

function parseTeam(value: string | undefined): TeamId | "all" {
  if (value === "valladolid" || value === "ennour" || value === "avenir") return value;
  return "all";
}

export default async function ActualitesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const team = parseTeam(params.team);

  const filtered: Article[] =
    team === "all" ? articles : articles.filter((a) => a.team === team);

  return <ActualitesView articles={filtered} team={team} />;
} ,     import Image from "next/image";
import { getTeamLogo, getTeamInitials } from "@/data/teams";

interface TeamCrestProps {
  teamName: string;
  sizeClass?: string;
  textSizeClass?: string;
  className?: string;
  variant?: "light" | "dark";
}

export function TeamCrest({
  teamName,
  sizeClass = "h-10 w-10",
  textSizeClass = "text-[10px]",
  className = "",
  variant = "light",
}: TeamCrestProps) {
  const logo = getTeamLogo(teamName);
  const initials = getTeamInitials(teamName);

  // ── Has a logo → white circle with image
  if (logo) {
    return (
      <div
        className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-0.5 ${
          variant === "dark" ? "ring-1 ring-white/30" : "ring-1 ring-border/50"
        } ${sizeClass} ${className}`}
      >
        <Image
          src={logo}
          alt={teamName}
          width={120}
          height={120}
          className="h-full w-full rounded-full object-contain"
        />
      </div>
    );
  }

  // ── No logo, dark variant → glass circle with white initials
  if (variant === "dark") {
    return (
      <div
        className={`flex shrink-0 items-center justify-center rounded-full bg-white/15 font-black text-white ring-1 ring-white/30 backdrop-blur ${textSizeClass} ${sizeClass} ${className}`}
      >
        {initials}
      </div>
    );
  }

  // ── No logo, light variant → gray circle with dark initials
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-secondary font-bold text-foreground ${textSizeClass} ${sizeClass} ${className}`}
    >
      {initials}
    </div>
  );
} ,export const brand = {
  name: "Académie Real Valladolid Tataouine",
  shortName: "ARV Tataouine",
  tagline: "Développer les Champions de Demain",
  taglineAr: "تطوير أبطال الغد",
  taglineEn: "Developing Tomorrow's Champions",
  
  // Contact
  email: "contact@arv-tataouine.tn",
  phone: "+216 75 854 717",
  whatsapp: "+216 75 854 717",
  address: {
    street: "Tataouine",
    city: "Tataouine",
    country: "Tunisia",
  },

  // Social
  social: {
    facebook: "https://facebook.com/arvtataouine",
    instagram: "https://instagram.com/arvtataouine",
    youtube: "https://youtube.com/@arvtataouine",
  },

  // Partnership
  partnership: {
    club: "Real Valladolid CF",
    status: "Partenaire Officiel",
    logo: "/images/logo/real-valladolid.png",
  },

  // Colors (for reference)
  colors: {
    primary: "#5E2D91",
    accent: "#E7001C",
    white: "#FFFFFF",
  },
};

export const ageGroups = [
  {
    id: "u8",
    name: "U8-U10",
    nameAr: "تحت 8-10",
    nameEn: "U8-U10",
    description: "Initiation et plaisir du jeu",
    ages: "8-10 ans",
  },
  {
    id: "u12",
    name: "U11-U13",
    nameAr: "تحت 11-13",
    nameEn: "U11-U13",
    description: "Technique et compréhension du jeu",
    ages: "11-13 ans",
  },
  {
    id: "u15",
    name: "U14-U15",
    nameAr: "تحت 14-15",
    nameEn: "U14-U15",
    description: "Tactique et compétition",
    ages: "14-15 ans",
  },
  {
    id: "u18",
    name: "U16-U18",
    nameAr: "تحت 16-18",
    nameEn: "U16-U18",
    description: "Préparation professionnelle",
    ages: "16-18 ans",
  },
];
 ,  export interface HeroSlide {
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
    ctaHref: "/valladolid/actualites/victoire-u15-tournoi-sfax",
    duration: 6,
  },
    {
    id: "slide-2",
    image: "/images/hero/hero2.jpg",
    imageMobile: "/images/hero/hero2.jpg",
    category: "Événement International",
    title: "International U13 Cup — L'Europe à Tataouine, mars 2027",
    ctaLabel: "Découvrir le tournoi",
    ctaHref: "/valladolid/actualites/international-u13-cup-2027-tataouine",
    duration: 6,
  },
  {
    id: "slide-3",
    image: "/images/hero/hero3.jpg",
    imageMobile: "/images/hero/hero3.jpg",
    category: "Produit",
    title: "Nouveau maillot domicile 2026/2027",
    ctaLabel: "Voir la boutique",
    ctaHref: "/valladolid/boutique",
    duration: 6,
  },
  {
    id: "slide-4",
    image: "/images/hero/hero4.jpg",
    imageMobile: "/images/hero/hero4.jpg",
    category: "Club",
    title: "Nos nouvelles installations d'analyse vidéo",
    ctaLabel: "Visiter le club",
    ctaHref: "/valladolid/club",
    duration: 6,
  },
];

export const heroFallbackGradients = [
  "linear-gradient(135deg, #5E2D91 0%, #E7001C 100%)",
  "linear-gradient(135deg, #E7001C 0%, #5E2D91 100%)",
  "linear-gradient(135deg, #5E2D91 0%, #EDBB4A 100%)",
  "linear-gradient(135deg, #1A1F3A 0%, #5E2D91 100%)",
];   ,                       
















"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Play, X, Camera } from "lucide-react";
import { videoCategories, type Video } from "@/data/videos";
import { GALLERY } from "@/data/gallery";
import { TeamFilter } from "@/components/global/team-filter";
import type { TeamId } from "@/data/team-theme";
const CATEGORY_GRADIENT: Record<string, string> = {
  match: "from-accent via-accent/80 to-accent-dark",
  training: "from-primary via-primary/80 to-primary-dark",
  interview: "from-info via-info/80 to-primary/70",
  "behind-scenes": "from-warning via-warning/80 to-accent/70",
  tutorial: "from-success via-success/80 to-primary/70",
};

function TvHero({ video, onPlay, team }: { video: Video; onPlay: () => void; team: TeamId | "all" }) {
  const c = CATEGORY_GRADIENT[video.category] ?? CATEGORY_GRADIENT.match;
  return (
    <section className="bg-white">
           <div className="mx-auto max-w-7xl px-6 pt-10 pb-8 lg:px-8 lg:pt-14 lg:pb-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
              ARV TV
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              En vidéo
            </h1>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
              Les meilleurs moments, interviews et coulisses de l&apos;académie.
            </p>
          </div>
          <div className="shrink-0">
            <TeamFilter currentTeam={team} />
          </div>
        </div>

        <button
          onClick={onPlay}
          className="group relative mt-8 block w-full overflow-hidden rounded-2xl text-left"
          aria-label={`Regarder : ${video.title}`}
        >
          <div className="relative aspect-[4/5] sm:aspect-[21/9]">
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1280px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="absolute right-4 top-4 z-10 flex items-center gap-2 sm:right-6 sm:top-6">
              <span className="rounded-md bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
                {video.categoryLabel}
              </span>
              <span className="rounded-md bg-black/40 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur">
                {video.duration}
              </span>
            </div>

            <div className="absolute inset-0 z-10 flex items-center justify-center pb-20 sm:hidden">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-2xl transition-transform group-hover:scale-105">
                <Play className="ml-1 h-7 w-7 fill-foreground text-foreground" />
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7 lg:p-10">
              <div className="flex items-end justify-between gap-4">
                <div className="min-w-0 max-w-2xl">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">
                    À la une
                  </p>
                  <h2 className="mt-1.5 text-2xl font-black leading-tight text-white sm:text-2xl lg:text-4xl">
                    {video.title}
                  </h2>
                  <p className="mt-2 hidden max-w-xl text-sm text-white/80 sm:line-clamp-2 sm:block">
                    {video.description}
                  </p>
                  <p className="mt-2 text-[11px] font-medium text-white/60 sm:hidden">
                    {video.publishedAt} · {video.duration}
                  </p>
                </div>
                <div className="hidden shrink-0 sm:block">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-foreground shadow-xl transition-transform group-hover:scale-105">
                    <Play className="h-4 w-4 fill-foreground" />
                    Regarder
                  </span>
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>
    </section>
  );
}

function VideoGrid({
  items,
  onPlay,
}: {
  items: Video[];
  onPlay: (v: Video) => void;
}) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border py-20 text-center">
        <Play className="mx-auto h-10 w-10 text-muted-foreground/30" />
        <p className="mt-4 text-sm font-semibold text-foreground">
          Aucune vidéo dans cette catégorie
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((v) => (
        <button
          key={v.id}
          onClick={() => onPlay(v)}
          className="group flex flex-col text-left"
          aria-label={`Regarder : ${v.title}`}
        >
          <div className="relative aspect-video overflow-hidden rounded-xl bg-foreground">
            <Image
              src={v.thumbnail}
              alt={v.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-2xl">
                <Play className="ml-0.5 h-6 w-6 fill-foreground" />
              </span>
            </div>
            <span className="absolute right-2 top-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold text-white">
              {v.duration}
            </span>
          </div>
          <div className="mt-3">
            <span className="inline-flex rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-foreground">
              {v.categoryLabel}
            </span>
            <h3 className="mt-2 line-clamp-2 text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-accent">
              {v.title}
            </h3>
            <p className="mt-1 text-[11px] text-muted-foreground">
              {v.publishedAt}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}

function Gallery() {
  return (
    <section className="bg-secondary/30 py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
            En images
          </p>
          <h2 className="mt-2 text-2xl font-black text-foreground sm:text-3xl">
            Galerie
          </h2>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            Les moments forts de la saison, sur et en dehors du terrain.
          </p>
        </div>

        {/* Bento grid — tailles variées */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {/* g1 — huge 2x2 */}
          <div className="group relative col-span-2 row-span-2 aspect-square overflow-hidden rounded-2xl sm:aspect-auto sm:min-h-[440px]">
            <Image
              src={GALLERY[0].image}
              alt={GALLERY[0].label}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <p className="text-sm font-semibold text-white sm:text-base">
                {GALLERY[0].label}
              </p>
            </div>
          </div>

          {/* g2 — wide 2x1 */}
          <div className="group relative col-span-2 aspect-[2/1] overflow-hidden rounded-2xl sm:aspect-[2/1]">
            <Image
              src={GALLERY[1].image}
              alt={GALLERY[1].label}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <p className="text-sm font-semibold text-white">
                {GALLERY[1].label}
              </p>
            </div>
          </div>

          {/* g3 + g4 — small squares côte à côte */}
          <div className="group relative aspect-square overflow-hidden rounded-2xl">
            <Image
              src={GALLERY[2].image}
              alt={GALLERY[2].label}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-3">
              <p className="text-xs font-semibold text-white sm:text-sm">
                {GALLERY[2].label}
              </p>
            </div>
          </div>

          <div className="group relative aspect-square overflow-hidden rounded-2xl">
            <Image
              src={GALLERY[3].image}
              alt={GALLERY[3].label}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-3">
              <p className="text-xs font-semibold text-white sm:text-sm">
                {GALLERY[3].label}
              </p>
            </div>
          </div>

          {/* g5 — full-width wide */}
          <div className="group relative col-span-2 aspect-[2.4/1] overflow-hidden rounded-2xl">
            <Image
              src={GALLERY[4].image}
              alt={GALLERY[4].label}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <p className="text-sm font-semibold text-white">
                {GALLERY[4].label}
              </p>
            </div>
          </div>

          {/* g6 — full-width wide */}
          <div className="group relative col-span-2 aspect-[2.4/1] overflow-hidden rounded-2xl">
            <Image
              src={GALLERY[5].image}
              alt={GALLERY[5].label}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <p className="text-sm font-semibold text-white">
                {GALLERY[5].label}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoPlayer({
  video,
  onClose,
}: {
  video: Video;
  onClose: () => void;
}) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        aria-label="Fermer"
      >
        <X className="h-5 w-5" />
      </button>
      <div className="w-full max-w-5xl">
        <div
          className="relative w-full overflow-hidden rounded-xl bg-black"
          style={{ aspectRatio: "16/9" }}
        >
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
        <div className="mt-4 px-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/60">
            {video.categoryLabel}
          </p>
          <h3 className="mt-1 text-lg font-black text-white sm:text-2xl">
            {video.title}
          </h3>
          <p className="mt-2 hidden text-sm text-white/70 sm:block">
            {video.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function TvView({ videos, team }: { videos: Video[]; team: TeamId | "all" }) {
  const [active, setActive] = useState<Video | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const featured = videos.find((v) => v.featured) ?? videos[0];

  const filtered = useMemo(
    () =>
      filter === "all" ? videos : videos.filter((v) => v.category === filter),
    [filter],
  );

  const countFor = (id: string) =>
    id === "all"
      ? videos.length
      : videos.filter((v) => v.category === id).length;

  return (
    <>
      <div className="bg-white">
<TvHero video={featured} onPlay={() => setActive(featured)} team={team} />
        <section className="pb-14 lg:pb-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-foreground sm:text-3xl">
                  Toutes les vidéos
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  {filtered.length}{" "}
                  {filtered.length === 1 ? "vidéo" : "vidéos"}
                </p>
              </div>
            </div>

            <div className="-mx-6 mb-8 overflow-x-auto scrollbar-hide px-6 lg:mx-0 lg:px-0">
              <ul className="flex gap-1.5 whitespace-nowrap">
                {videoCategories.map((c) => {
                  const activeFilter = filter === c.id;
                  return (
                    <li key={c.id}>
                      <button
                        onClick={() => setFilter(c.id)}
                        className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-xs font-semibold transition-colors ${
                          activeFilter
                            ? "bg-foreground text-background"
                            : "border border-border bg-white text-foreground hover:border-foreground/30 hover:bg-secondary/50"
                        }`}
                      >
                        {c.label}
                        <span
                          className={`text-[10px] tabular-nums ${
                            activeFilter
                              ? "text-background/60"
                              : "text-muted-foreground"
                          }`}
                        >
                          {countFor(c.id)}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <VideoGrid items={filtered} onPlay={setActive} />
          </div>
        </section>

        <Gallery />
      </div>

      {active && <VideoPlayer video={active} onClose={() => setActive(null)} />}
    </>
  );
} , import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import {
  products,
  formatPrice,
  productCategories,
  type Product,
} from "@/data/products";
import { wallpaperTemplates } from "@/data/wallpapers";
import { WallpaperGenerator } from "@/components/interactive/wallpaper-generator";
import { TeamFilter } from "@/components/global/team-filter";
import type { TeamId } from "@/data/team-theme";

export const metadata: Metadata = {
  title: "Boutique | ARV Tataouine",
  description: "Maillots et équipements officiels de l'académie.",
};

type SearchParams = Promise<{ team?: string }>;

function parseTeam(value: string | undefined): TeamId | "all" {
  if (value === "valladolid" || value === "ennour" || value === "avenir") return value;
  return "all";
}

export default async function BoutiquePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const team = parseTeam(params.team);

  const filtered: Product[] =
    team === "all" ? products : products.filter((p) => p.team === team);

  return (
    <div className="flex flex-col bg-white">
           <section className="pt-10 lg:pt-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                Boutique
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-foreground sm:text-5xl">
                Boutique officielle
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
                Portez les couleurs de l&apos;académie avec nos maillots,
                équipements et merchandising officiels.
              </p>
            </div>
            <div className="shrink-0">
              <TeamFilter currentTeam={team} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border py-20 text-center">
              <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground/30" />
              <p className="mt-4 text-base font-semibold text-foreground">
                Aucun produit pour cette équipe
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Les produits de cette entité seront bientôt disponibles.
              </p>
            </div>
          ) : (
            <div className="space-y-16">
              {productCategories
                .filter((c) => c.id !== "all")
                .map((cat) => {
                  const catProducts = filtered.filter((p) => p.category === cat.id);
                  if (!catProducts.length) return null;
                  return (
                    <div key={cat.id}>
                      <h2 className="mb-6 text-2xl font-black text-foreground sm:text-3xl">
                        {cat.label}
                      </h2>
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {catProducts.map((p) => (
                          <Link
                            key={p.slug}
                            href={`/boutique/${p.slug}${team !== "all" ? `?team=${team}` : ""}`}
                            className="group flex flex-col"
                          >
                            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary/60">
                              {p.images[0] ? (
                                <Image
                                  src={p.images[0]}
                                  alt={p.name}
                                  fill
                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                              ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <ShoppingBag className="h-16 w-16 text-foreground/15" />
                                </div>
                              )}
                              {p.isNew && (
                                <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                                  Nouveau
                                </span>
                              )}
                            </div>
                            <div className="mt-3 flex items-start justify-between gap-3 px-1">
                              <div className="min-w-0">
                                <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                                  {p.categoryLabel}
                                </p>
                                <h3 className="mt-1 line-clamp-1 text-sm font-semibold text-foreground transition-opacity group-hover:opacity-60">
                                  {p.name}
                                </h3>
                              </div>
                              <span className="shrink-0 text-sm font-semibold tabular-nums text-foreground">
                                {formatPrice(p.price)}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </section>

      <section className="bg-secondary/30 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-black text-foreground sm:text-3xl">
              Générateur de wallpapers
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Personnalisez un wallpaper aux couleurs de l&apos;académie.
            </p>
          </div>
          <div className="mt-10 flex justify-center">
            <div className="w-full max-w-lg">
              {wallpaperTemplates.map((t) => (
                <WallpaperGenerator key={t.id} template={t} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} , import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap, Users, Trophy, Target, Shield, Flame } from "lucide-react";
import { PartnersStrip } from "@/components/sections/partners-strip";
import { FeaturedProductsSection } from "@/components/sections/featured-products";
import { FeaturedVideosSection } from "@/components/sections/featured-videos";
import { NewsSection } from "@/components/sections/news-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { HeroCarousel } from "@/components/sections/hero-carousel";
export const metadata: Metadata = {
  title: "Avenir Sportif Tataouine — Football & Futsal",
  description:
    "La section football à 11 et futsal du Groupe Sportif ARV Tataouine. Formation polyvalente pour les joueurs du sud tunisien.",
};

const STATS = [
  { icon: Users, value: "80+", label: "Joueurs" },
  { icon: Zap, value: "2", label: "Disciplines" },
  { icon: Trophy, value: "5", label: "Catégories" },
];

const VALUES = [
  {
    icon: Target,
    title: "Polyvalence",
    description:
      "Football à 11 et futsal pour former des joueurs complets et adaptables.",
  },
  {
    icon: Zap,
    title: "Technique individuelle",
    description:
      "Le futsal affine le contrôle, la rapidité d'exécution et le dribble.",
  },
  {
    icon: Flame,
    title: "Intelligence tactique",
    description:
      "Lire le jeu, prendre la bonne décision, anticiper sous pression.",
  },
  {
    icon: Shield,
    title: "Discipline",
    description:
      "Rigueur, ponctualité et sérieux dans les deux disciplines.",
  },
];

const GALLERY = [
  { id: "g1", label: "Match de football", span: "col-span-2 row-span-2" },
  { id: "g2", label: "Futsal en action", span: "col-span-2" },
  { id: "g3", label: "Entraînement", span: "" },
  { id: "g4", label: "Victoire", span: "" },
  { id: "g5", label: "Esprit collectif", span: "col-span-2" },
  { id: "g6", label: "Coulisses", span: "col-span-2" },
];

export default function AvenirPage() {
  return (
    <div className="flex flex-col bg-white">
      {/* 1. HERO */}
            <HeroCarousel team="avenir" />


      {/* 2. MISSION */}
            <section id="mission" className="py-16 lg:py-24">

        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0F2A47]">
            Notre mission
          </p>
          <h2 className="mt-4 text-3xl font-black leading-tight text-foreground sm:text-4xl lg:text-5xl">
            Former des joueurs complets
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <p className="text-base leading-relaxed text-foreground">
              Avenir Sportif Tataouine est la section football à 11 et futsal
              du groupe. Elle complète l&apos;offre sportive en proposant aux
              joueurs une formation polyvalente, adaptée aux différentes
              disciplines du football moderne.
            </p>
            <p className="text-base leading-relaxed text-foreground">
              Le futsal apporte une technique individuelle affinée, une
              lecture de jeu rapide et une intelligence tactique que le
              football à 11 valorise. Nos joueurs bénéficient du meilleur des
              deux mondes.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {STATS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="rounded-2xl border border-border bg-white p-6 text-center"
                >
                  <Icon className="mx-auto h-6 w-6 text-[#0F2A47]" />
                  <p className="mt-3 text-3xl font-black tabular-nums text-foreground">
                    {s.value}
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. VALEURS */}
      <section className="border-y border-border bg-secondary/30 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0F2A47]">
              Nos valeurs
            </p>
            <h2 className="mt-4 text-3xl font-black text-foreground sm:text-4xl lg:text-5xl">
              Les 4 piliers d&apos;Avenir
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F2A47]/10">
                    <Icon className="h-6 w-6 text-[#0F2A47]" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-foreground">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. GALERIE */}
      <section id="gallery" className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0F2A47]">
              En images
            </p>
            <h2 className="mt-4 text-3xl font-black text-foreground sm:text-4xl">
              Galerie
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Les moments forts de la saison, en images
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {GALLERY.map((item) => (
              <div
                key={item.id}
                className={`group relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-[#0F2A47] via-[#1E3B66] to-[#F0C419] ${item.span}`}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <Zap className="h-12 w-12 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-xs font-semibold text-white sm:text-sm">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PARTNERS */}
      <PartnersStrip />

      {/* 6. BOUTIQUE */}
      <section id="boutique">
        <FeaturedProductsSection team="avenir" />
      </section>

      {/* 7. TV */}
      <section id="tv">
        <FeaturedVideosSection team="avenir" />
      </section>

      {/* 8. ACTUALITÉS */}
      <section id="news">
        <NewsSection team="avenir" />
      </section>

      {/* 9. NEWSLETTER */}
      <NewsletterSection />

      {/* 10. CTA FINAL */}
      <section className="bg-gradient-to-br from-[#0F2A47] via-[#1E3B66] to-[#0F2A47] py-16 text-white lg:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-black sm:text-4xl lg:text-5xl">
            Rejoignez Avenir Sportif
          </h2>
          <p className="mt-4 text-white/85 sm:text-lg">
            Football à 11 ou futsal — nos portes sont ouvertes à tous les
            joueurs motivés, quel que soit leur niveau de départ.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/inscription"
              className="inline-flex items-center gap-2 rounded-md bg-[#F0C419] px-6 py-3 text-sm font-bold text-[#0F2A47] shadow-lg transition-all hover:scale-[1.02] hover:bg-[#F0C419]/90"
            >
              Inscrire mon enfant
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition-all hover:bg-white/20"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} , 
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Heart, Users, Trophy, Sparkles, Shield } from "lucide-react";
import { PartnersStrip } from "@/components/sections/partners-strip";
import { FeaturedProductsSection } from "@/components/sections/featured-products";
import { FeaturedVideosSection } from "@/components/sections/featured-videos";
import { NewsSection } from "@/components/sections/news-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { HeroCarousel } from "@/components/sections/hero-carousel";
import { TEAMS } from "@/data/team-theme";
export const metadata: Metadata = {
  title: "Ennour Sportif Tataouine — Football féminin",
  description:
    "La section féminine du Groupe Sportif ARV Tataouine. Formation, accompagnement et célébration du football féminin dans le sud tunisien.",
};

const STATS = [
  { icon: Users, value: "40+", label: "Joueuses" },
  { icon: Trophy, value: "3", label: "Catégories" },
  { icon: Heart, value: "1", label: "Équipe" },
];

const VALUES = [
  {
    icon: Sparkles,
    title: "Excellence sportive",
    description:
      "Même niveau d'exigence technique et tactique que les équipes masculines.",
  },
  {
    icon: Heart,
    title: "Épanouissement",
    description:
      "Un cadre bienveillant où chaque joueuse peut grandir à son rythme.",
  },
  {
    icon: Users,
    title: "Solidarité",
    description:
      "L'esprit d'équipe et la sororité au cœur de chaque entraînement.",
  },
  {
    icon: Shield,
    title: "Combativité",
    description:
      "Apprendre à se dépasser, sur et en dehors du terrain.",
  },
];

const GALLERY = [
  { id: "g1", label: "Entraînement collectif", span: "col-span-2 row-span-2" },
  { id: "g2", label: "Match officiel", span: "col-span-2" },
  { id: "g3", label: "Échauffement", span: "" },
  { id: "g4", label: "Célébration", span: "" },
  { id: "g5", label: "Esprit d'équipe", span: "col-span-2" },
  { id: "g6", label: "Coulisses", span: "col-span-2" },
];

export default function EnnourPage() {
  return (
    <div className="flex flex-col bg-white">
      {/* 1. HERO */}
          <HeroCarousel team="ennour" />


      {/* 2. MISSION */}
           <section id="mission" className="py-16 lg:py-24">

        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#7A1F2B]">
            Notre mission
          </p>
          <h2 className="mt-4 text-3xl font-black leading-tight text-foreground sm:text-4xl lg:text-5xl">
            Faire grandir le football féminin à Tataouine
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <p className="text-base leading-relaxed text-foreground">
              Ennour Sportif Tataouine est la section féminine du groupe.
              Fondée pour offrir aux jeunes filles de la région un cadre
              structuré pour pratiquer le football, elle incarne notre
              engagement pour l&apos;égalité des chances dans le sport.
            </p>
            <p className="text-base leading-relaxed text-foreground">
              Nos joueuses bénéficient du même encadrement professionnel, des
              mêmes installations et de la même exigence que les équipes
              masculines. Un projet ambitieux, porté par des entraîneuses
              passionnées et des familles engagées.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {STATS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="rounded-2xl border border-border bg-white p-6 text-center"
                >
                  <Icon className="mx-auto h-6 w-6 text-[#7A1F2B]" />
                  <p className="mt-3 text-3xl font-black tabular-nums text-foreground">
                    {s.value}
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. VALEURS */}
      <section className="border-y border-border bg-secondary/30 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#7A1F2B]">
              Nos valeurs
            </p>
            <h2 className="mt-4 text-3xl font-black text-foreground sm:text-4xl lg:text-5xl">
              Les 4 piliers d&apos;Ennour
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#7A1F2B]/10">
                    <Icon className="h-6 w-6 text-[#7A1F2B]" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-foreground">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. GALERIE */}
      <section id="gallery" className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#7A1F2B]">
              En images
            </p>
            <h2 className="mt-4 text-3xl font-black text-foreground sm:text-4xl">
              Galerie
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Les moments forts de la saison, en images
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {GALLERY.map((item) => (
              <div
                key={item.id}
                className={`group relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-[#7A1F2B] to-[#141414] ${item.span}`}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <Heart className="h-12 w-12 text-white" />
                </div>
              <div className={`absolute inset-0 bg-gradient-to-br ${TEAMS.ennour.heroGradient}`} />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-xs font-semibold text-white sm:text-sm">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PARTNERS */}
      <PartnersStrip />

      {/* 6. BOUTIQUE (filtered — empty state for now) */}
      <section id="boutique">
        <FeaturedProductsSection team="ennour" />
      </section>

      {/* 7. TV (filtered — empty state for now) */}
      <section id="tv">
        <FeaturedVideosSection team="ennour" />
      </section>

      {/* 8. ACTUALITÉS (filtered — empty state for now) */}
      <section id="news">
        <NewsSection team="ennour" />
      </section>

      {/* 9. NEWSLETTER */}
      <NewsletterSection />

      {/* 10. CTA FINAL */}
      <section className="bg-gradient-to-br from-[#7A1F2B] via-[#5C1620] to-[#141414] py-16 text-white lg:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-black sm:text-4xl lg:text-5xl">
            Rejoignez Ennour Sportif
          </h2>
          <p className="mt-4 text-white/85 sm:text-lg">
            Vous êtes une jeune joueuse ou un parent ? Contactez-nous pour
            découvrir nos programmes et venir essayer.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/inscription"
              className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-bold text-[#7A1F2B] shadow-lg transition-all hover:scale-[1.02] hover:bg-white/90"
            >
              Inscrire ma fille
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition-all hover:bg-white/20"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

 ,

 import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PartnersStrip } from "@/components/sections/partners-strip";
import { FeaturedProductsSection } from "@/components/sections/featured-products";
import { FeaturedVideosSection } from "@/components/sections/featured-videos";
import { NewsSection } from "@/components/sections/news-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { FinalCTASection } from "@/components/sections/final-cta";
import { TEAMS, type TeamId } from "@/data/team-theme";
import { HeroCarousel } from "@/components/sections/hero-carousel";
export const metadata: Metadata = {
  title: "Groupe Sportif ARV Tataouine",
  description:
    "Un projet, trois équipes, une même passion. Découvrez le groupe sportif ARV Tataouine.",
};

interface Entity {
  id: TeamId;
  href: string;
  subtitle: string;
  description: string;
  stats: { value: string; label: string }[];
}

const ENTITIES: Entity[] = [
  {
    id: "valladolid",
    href: "/valladolid",
    subtitle: "Football masculin",
    description:
      "L'académie historique. Méthodologie espagnole, encadrement professionnel, formation des champions de demain.",
    stats: [
      { value: "150+", label: "Joueurs" },
      { value: "4", label: "Catégories" },
      { value: "10", label: "Ans" },
    ],
  },
  {
    id: "ennour",
    href: "/ennour",
    subtitle: "Football féminin",
    description:
      "La section féminine dédiée à la formation et à l'épanouissement des jeunes filles dans le football.",
    stats: [
      { value: "40+", label: "Joueuses" },
      { value: "3", label: "Catégories" },
      { value: "1", label: "Équipe" },
    ],
  },
  {
    id: "avenir",
    href: "/avenir",
    subtitle: "Football & Futsal",
    description:
      "Football à 11 et futsal, avec un programme complet pour former des joueurs polyvalents.",
    stats: [
      { value: "80+", label: "Joueurs" },
      { value: "2", label: "Disciplines" },
      { value: "5", label: "Catégories" },
    ],
  },
];

const VALUES = [
  { number: "01", title: "Excellence", description: "Recherche constante du haut niveau technique et tactique." },
  { number: "02", title: "Famille", description: "Un esprit collectif qui unit joueurs, staff et familles." },
  { number: "03", title: "Passion", description: "L'amour du football, le respect de l'adversaire, la joie de jouer." },
  { number: "04", title: "Discipline", description: "Sérieux, ponctualité et respect sur et en dehors du terrain." },
];



function EntitiesSection() {
  return (
    <section
      id="entities"
      className="border-y border-border bg-secondary/30 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
        <p className={`text-[10px] font-bold uppercase tracking-[0.3em] ${TEAMS.group.textClass}`}>
  Nos entités
</p>
          <h2 className="mt-4 text-3xl font-black text-foreground sm:text-4xl lg:text-5xl">
            Trois équipes, une famille
          </h2>
        </div>

        <div className="grid gap-8 gap-y-24 pt-12 lg:grid-cols-3">
          {ENTITIES.map((entity) => {
            const theme = TEAMS[entity.id];
            return (
              <Link
                key={entity.id}
                href={entity.href}
                className="group relative flex flex-col"
              >
                {/* Logo — no bg, no ring — slides up + scales on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${TEAMS.group.heroOverlayR}`} />
                  <div className="transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-110">
                    <Image
                      src={theme.logoPath}
                      alt={theme.name}
                      width={96}
                      height={96}
                      className="h-24 w-24 object-contain drop-shadow-xl"
                    />
                  </div>
                </div>

                <div className="flex flex-1 flex-col rounded-2xl border border-border bg-white pt-16 overflow-hidden">
                  <div className="px-6 text-center">
                   <p className={`text-[10px] font-bold uppercase tracking-[0.4em] ${TEAMS.group.textClass}`}>
                      {entity.subtitle}
                    </p>
                    <h3 className="mt-2 text-2xl font-black text-foreground">
                      {theme.name}
                     
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {entity.description}
                    </p>
                  </div>

                  <div className="mt-6 px-6">
                    <div className="grid grid-cols-3 gap-2 border-t border-border pt-4">
                      {entity.stats.map((s) => (
                        <div key={s.label} className="text-center">
                          <p
                            className="text-lg font-black tabular-nums"
                            style={{ color: theme.hex }}
                          >
                            {s.value}
                          </p>
                          <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                            {s.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between bg-secondary/40 px-6 py-4 text-sm font-bold text-foreground">
                    Découvrir
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function VisionSection() {
  return (
    <section className="py-24 lg:py-40 bg-white">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#0B3E5C]">
          Notre vision
        </p>

        <h2 className="mt-16 text-3xl font-black leading-[1.05] tracking-tight text-foreground sm:text-4xl lg:text-6xl">
          Former des champions,
          <br />
          <span className={TEAMS.group.textClass}>
            sur et en dehors du terrain.
          </span>
        </h2>

        <p className="mt-14 mx-auto max-w-2xl text-base leading-[1.8] text-muted-foreground sm:text-lg lg:text-xl">
          Le Groupe Sportif ARV Tataouine n&apos;est pas qu&apos;un club de
          football. C&apos;est un projet éducatif, social et sportif qui
          accompagne les jeunes de Tataouine dans leur développement personnel
          et sportif.
        </p>
      </div>

      <div className="mx-auto max-w-5xl px-6 lg:px-8 mt-24">
        <div className="border-t border-border pt-16">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title}>
                <p className="text-xs font-bold tracking-[0.3em] text-muted-foreground/50">
                  {v.number}
                </p>
                <p className="mt-4 text-lg font-bold text-foreground">
                  {v.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function GroupHomePage() {
  // Override CSS vars so shared sections use group colors (blue + gold)
  const groupVars = {
  "--color-primary": "202 79% 20%",
  "--color-primary-dark": "202 79% 14%",
  "--color-primary-light": "202 79% 30%",
  "--color-accent": "43 100% 60%",
  "--color-accent-dark": "43 100% 50%",
  "--color-accent-light": "43 100% 70%",
} as React.CSSProperties;
  return (
    <div style={groupVars} className="flex flex-col">
           <HeroCarousel team="group" />

            <PartnersStrip />
      <VisionSection />

      <EntitiesSection />
      <NewsSection />
      <FeaturedVideosSection />
      <FeaturedProductsSection />
      <NewsletterSection />
      <FinalCTASection />
    </div>
  );
} , "use client";

import { useState } from "react";
import {
  CheckCircle2,
  Loader2,
  User,
  Users,
  FileCheck2,
  ChevronDown,
  Shield,
  Heart,
  Zap,
} from "lucide-react";
import { TEAMS, ENTITY_LIST, type TeamId } from "@/data/team-theme";
import { Shield, Heart, Zap } from "lucide-react";


const inputCls =
  "w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none transition-colors";

function Field({
  label,
  required,
  className = "",
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-xs font-semibold text-foreground">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      {children}
    </div>
  );
}

export default function InscriptionPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [form, setForm] = useState({
    team: "" as TeamId | "",
    childFirst: "",
    childLast: "",
    childDob: "",
    childGender: "",
    category: "",
    parentFirst: "",
    parentLast: "",
    parentEmail: "",
    parentPhone: "",
    parentRelation: "",
    message: "",
    consent: false,
  });
const FORM_ICONS = { shield: Shield, heart: Heart, zap: Zap, star: Shield };
  const set =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const value =
        e.target.type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : e.target.value;
      setForm((prev) => ({ ...prev, [key]: value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.team) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  };

  if (status === "success") {
const selectedTheme = form.team ? TEAMS[form.team as TeamId] : null;
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-white px-6 py-20">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
          <h1 className="mt-6 text-2xl font-black text-foreground">
            Demande envoyée
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Merci ! Nous avons bien reçu votre demande d&apos;inscription
            {selectedTheme && ` pour ${selectedTheme.name}`}. Notre équipe vous
            contactera sous 48h pour planifier la séance d&apos;évaluation
            gratuite.
          </p>
        </div>
      </div>
    );
  }

const selectedTheme = form.team ? TEAMS[form.team as TeamId] : null;
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-6 py-10 lg:px-8 lg:py-16">
        <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">
          Inscription
        </h1>
        <p className="mt-3 max-w-xl text-base text-muted-foreground">
          Rejoignez l&apos;une de nos trois équipes. Remplissez le formulaire,
          nous vous contacterons pour organiser une séance d&apos;évaluation
          gratuite.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-8">
          {/* 1. Team selection */}
          <fieldset className="rounded-2xl border border-border bg-white p-6">
            <legend className="flex items-center gap-2 px-2 text-sm font-bold text-foreground">
              <Shield className="h-4 w-4 text-accent" />
              Quelle équipe vous intéresse ?
            </legend>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {ENTITY_LIST.map((team) => {
  const active = form.team === team.id;
  const Icon = FORM_ICONS[team.formIcon];
  return (
    <button
      key={team.id}
      type="button"
      onClick={() => setForm((prev) => ({ ...prev, team: team.id }))}
      className={`group relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all ${
        active
          ? `${team.borderClass} bg-white shadow-md`
          : "border-border hover:border-foreground/30 hover:bg-secondary/30"
      }`}
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-lg"
        style={{ backgroundColor: `${team.hex}15` }}
      >
        <Icon className="h-5 w-5" style={{ color: team.hex }} />
      </div>
      <p className="text-sm font-bold leading-tight text-foreground">{team.name}</p>
      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {team.formTagline}
      </p>
      {active && (
        <span
          className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-white"
          style={{ backgroundColor: team.hex }}
        >
          <CheckCircle2 className="h-3 w-3" />
        </span>
      )}
    </button>
  );
})}
            </div>
          </fieldset>

          {/* 2. Child */}
          <fieldset className="rounded-2xl border border-border bg-white p-6">
            <legend className="flex items-center gap-2 px-2 text-sm font-bold text-foreground">
              <User className="h-4 w-4 text-accent" />
              Informations de l&apos;enfant
            </legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Prénom" required>
                <input
                  type="text"
                  required
                  value={form.childFirst}
                  onChange={set("childFirst")}
                  className={inputCls}
                />
              </Field>
              <Field label="Nom" required>
                <input
                  type="text"
                  required
                  value={form.childLast}
                  onChange={set("childLast")}
                  className={inputCls}
                />
              </Field>
              <Field label="Date de naissance" required>
                <input
                  type="date"
                  required
                  value={form.childDob}
                  onChange={set("childDob")}
                  className={inputCls}
                />
              </Field>
              <Field label="Genre" required>
                <select
                  required
                  value={form.childGender}
                  onChange={set("childGender")}
                  className={inputCls}
                >
                  <option value="">Sélectionner</option>
                  <option value="M">Garçon</option>
                  <option value="F">Fille</option>
                </select>
              </Field>
              <Field
                label="Catégorie souhaitée"
                required
                className="sm:col-span-2"
              >
                <select
                  required
                  value={form.category}
                  onChange={set("category")}
                  className={inputCls}
                >
                  <option value="">Sélectionner une catégorie</option>
                  <option value="u8">U8-U10 (8-10 ans)</option>
                  <option value="u12">U11-U13 (11-13 ans)</option>
                  <option value="u15">U14-U15 (14-15 ans)</option>
                  <option value="u18">U16-U18 (16-18 ans)</option>
                </select>
              </Field>
            </div>
          </fieldset>

          {/* 3. Parent */}
          <fieldset className="rounded-2xl border border-border bg-white p-6">
            <legend className="flex items-center gap-2 px-2 text-sm font-bold text-foreground">
              <Users className="h-4 w-4 text-accent" />
              Informations du parent / tuteur
            </legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Prénom" required>
                <input
                  type="text"
                  required
                  value={form.parentFirst}
                  onChange={set("parentFirst")}
                  className={inputCls}
                />
              </Field>
              <Field label="Nom" required>
                <input
                  type="text"
                  required
                  value={form.parentLast}
                  onChange={set("parentLast")}
                  className={inputCls}
                />
              </Field>
              <Field label="Email" required>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={form.parentEmail}
                  onChange={set("parentEmail")}
                  className={inputCls}
                />
              </Field>
              <Field label="Téléphone" required>
                <input
                  type="tel"
                  required
                  autoComplete="tel"
                  value={form.parentPhone}
                  onChange={set("parentPhone")}
                  className={inputCls}
                  placeholder="+216 ..."
                />
              </Field>
              <Field
                label="Relation avec l'enfant"
                required
                className="sm:col-span-2"
              >
                <select
                  required
                  value={form.parentRelation}
                  onChange={set("parentRelation")}
                  className={inputCls}
                >
                  <option value="">Sélectionner</option>
                  <option value="father">Père</option>
                  <option value="mother">Mère</option>
                  <option value="guardian">Tuteur légal</option>
                  <option value="other">Autre</option>
                </select>
              </Field>
            </div>
          </fieldset>

          {/* 4. Complementary */}
          <fieldset className="rounded-2xl border border-border bg-white p-6">
            <legend className="flex items-center gap-2 px-2 text-sm font-bold text-foreground">
              <FileCheck2 className="h-4 w-4 text-accent" />
              Informations complémentaires
            </legend>
            <div className="mt-4">
              <Field label="Message (optionnel)">
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={set("message")}
                  className={inputCls}
                  placeholder="Questions, remarques, expérience du football..."
                />
              </Field>
              <label className="mt-6 flex items-start gap-3 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  required
                  checked={form.consent}
                  onChange={set("consent")}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-foreground"
                />
                <span>
                  J&apos;accepte que mes données soient utilisées pour le
                  traitement de cette demande, conformément à la politique de
                  confidentialité. *
                </span>
              </label>
            </div>
          </fieldset>

          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              * Champs obligatoires
              {selectedTheme && (
                <span className="ml-2 inline-flex items-center gap-1">
                  · Équipe :{" "}
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ backgroundColor: selectedTheme.hex }}
                  />
                  <strong>{selectedTheme.name}</strong>
                </span>
              )}
            </p>
            <button
              type="submit"
              disabled={status === "loading" || !form.team}
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Envoi...
                </>
              ) : (
                "Envoyer la demande"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} , 
"use client";

import { useState } from "react";
import {
  Phone, Mail, MapPin, MessageCircle, ArrowRight,
  Loader2, CheckCircle2, HelpCircle, ChevronDown,
} from "lucide-react";
import { brand } from "@/data/brand";
import { TEAMS, TEAM_IDS, type TeamId } from "@/data/team-theme";


const SUBJECTS = [
  { value: "general", label: "Question générale" },
  { value: "inscription", label: "Inscription" },
  { value: "partenariat", label: "Partenariat" },
  { value: "sponsoring", label: "Sponsoring" },
  { value: "other", label: "Autre" },
];

const FAQ = [
  {
    q: "À partir de quel âge mon enfant peut-il s'inscrire ?",
    a: "Nous accueillons les jeunes footballeurs à partir de 8 ans (catégorie U8). Des programmes d'initiation existent pour les débutants.",
  },
  {
    q: "Les séances d'essai sont-elles vraiment gratuites ?",
    a: "Oui, la première séance d'évaluation est entièrement gratuite et sans engagement. Elle nous permet de déterminer la catégorie la plus adaptée.",
  },
  {
    q: "Comment se déroule un partenariat ou sponsoring ?",
    a: "Nous proposons plusieurs formules adaptées à vos objectifs. Contactez-nous via le formulaire en sélectionnant Partenariat ou Sponsoring, nous vous envoyons notre dossier sous 48h.",
  },
  {
    q: "Que se passe-t-il en cas de mauvais temps ?",
    a: "Nos terrains synthétiques permettent de maintenir les entraînements dans la plupart des conditions. En cas de force majeure, les séances sont reportées.",
  },
];

const inputCls =
  "w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none transition-colors";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-foreground">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      {children}
    </div>
  );
}

function ContactCard({
  icon: Icon,
  label,
  value,
  sub,
  href,
  target,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  sub: string;
  href?: string;
  target?: boolean;
}) {
  const inner = (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-white p-4 transition-colors hover:border-foreground/30">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 truncate text-sm font-semibold text-foreground">
          {value}
        </p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">{sub}</p>
      </div>
    </div>
  );
  if (href)
    return (
      <a
        href={href}
        target={target ? "_blank" : undefined}
        rel={target ? "noopener noreferrer" : undefined}
      >
        {inner}
      </a>
    );
  return inner;
}

export default function ContactPage() {
  const phone = brand.phone.replace(/\s+/g, "");
  const whatsapp = brand.whatsapp.replace(/\s+/g, "");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [form, setForm] = useState({
    team: "group" as TeamId | "group",
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
  });

  const set =
    <K extends keyof typeof form>(k: K) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setForm((p) => ({ ...p, [k]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
  };

const selectedTeamTheme = form.team !== "group" ? TEAMS[form.team as TeamId] : null;
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8 lg:py-16">
        <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">
          Contact
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground">
          Une question ? Envie d&apos;inscrire votre enfant ou de devenir
          partenaire ? Nous répondons sous 24h.
        </p>

        {/* Contact cards */}
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <ContactCard
            icon={Phone}
            label="Téléphone"
            value={brand.phone}
            sub="Lun-Sam · 8h-20h"
            href={"tel:" + phone}
          />
          <ContactCard
            icon={Mail}
            label="Email"
            value={brand.email}
            sub="Réponse sous 24h"
            href={"mailto:" + brand.email}
          />
          <ContactCard
            icon={MessageCircle}
            label="WhatsApp"
            value="Discuter maintenant"
            sub="Réponse rapide"
            href={"https://wa.me/" + whatsapp}
            target
          />
          <ContactCard
            icon={MapPin}
            label="Adresse"
            value={brand.address.city}
            sub={brand.address.country}
          />
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-black text-foreground sm:text-3xl">
              Envoyez-nous un message
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Indiquez à quelle équipe votre message est destiné, puis
              choisissez le sujet.
            </p>

            {status === "success" ? (
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-success/20 bg-success/5 p-5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                <div>
                  <p className="font-semibold text-foreground">Message envoyé</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Merci, nous vous répondons sous 24h.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {/* "Ce message concerne" — the selector */}
                <Field label="Ce message concerne" required>
                  <div className="relative">
                    <select
                      required
                      value={form.team}
                      onChange={set("team")}
                      className={`${inputCls} appearance-none pr-10`}
                    >
                      {TEAM_IDS.map((id) => (
  <option key={id} value={id}>
    {TEAMS[id].name} — {TEAMS[id].formTagline}
  </option>
))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                  {selectedTeamTheme && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: selectedTeamTheme.hex }}
                      />
                      Votre message sera transmis à {selectedTeamTheme.name}
                    </p>
                  )}
                </Field>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Nom" required>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={set("name")}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Email" required>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={set("email")}
                      className={inputCls}
                    />
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Téléphone">
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={set("phone")}
                      className={inputCls}
                      placeholder="+216 ..."
                    />
                  </Field>
                  <Field label="Sujet" required>
                    <select
                      required
                      value={form.subject}
                      onChange={set("subject")}
                      className={inputCls}
                    >
                      {SUBJECTS.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Message" required>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={set("message")}
                    className={inputCls}
                    placeholder="Votre message..."
                  />
                </Field>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent/90 disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Envoi...
                    </>
                  ) : (
                    <>
                      Envoyer
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-black text-foreground sm:text-3xl">
              Questions fréquentes
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Les réponses aux questions les plus posées.
            </p>
            <div className="mt-6 space-y-3">
              {FAQ.map((f, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-border bg-white p-4"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-foreground">
                      {f.q}
                    </span>
                    <HelpCircle className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-45" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} , "use client";

import { useRouter, usePathname } from "next/navigation";
import { ChevronDown, Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { TEAMS, ENTITY_LIST, type TeamId } from "@/data/team-theme";

export function TeamFilter({ currentTeam }: { currentTeam: TeamId | "all" }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const allLabel = "Toutes les équipes";
  const current =
    currentTeam === "all" ? null : TEAMS[currentTeam];

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleSelect = (id: TeamId | "all") => {
    const url = id === "all" ? pathname : `${pathname}?team=${id}`;
    router.push(url, { scroll: false });
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2.5 rounded-md border border-border bg-white px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-foreground/30 hover:bg-secondary/50"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {current && (
          <span
            className="h-2 w-2 rounded-full shrink-0"
            style={{ backgroundColor: current.hex }}
          />
        )}
        <span className="whitespace-nowrap">
          {current ? current.name : allLabel}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-lg border border-border bg-white shadow-xl"
          role="listbox"
        >
          <button
            onClick={() => handleSelect("all")}
            className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors ${
              currentTeam === "all"
                ? "bg-secondary font-semibold text-foreground"
                : "text-foreground hover:bg-secondary/50"
            }`}
            role="option"
            aria-selected={currentTeam === "all"}
          >
            <span className="flex-1">{allLabel}</span>
            {currentTeam === "all" && <Check className="h-4 w-4" />}
          </button>

          {ENTITY_LIST.map((team) => {
            const active = currentTeam === team.id;
            return (
              <button
                key={team.id}
                onClick={() => handleSelect(team.id)}
                className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors ${
                  active
                    ? "bg-secondary font-semibold text-foreground"
                    : "text-foreground hover:bg-secondary/50"
                }`}
                role="option"
                aria-selected={active}
              >
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: team.hex }}
                />
                <span className="flex-1">{team.name}</span>
                {active && <Check className="h-4 w-4" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
} , 

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Pause, Play } from "lucide-react";
import { heroSlides, heroFallbackGradients } from "@/data/hero";
import { getTeamFromPath, TEAMS, type TeamId } from "@/data/team-theme";
type Direction = "next" | "prev" | null;


interface HeroCarouselProps {
  team?: TeamId;
}

export function HeroCarousel({ team }: HeroCarouselProps = {}) {
  const pathname = usePathname();
  const activeTeam = team ?? getTeamFromPath(pathname);
const styles = TEAMS[activeTeam].carousel;

  const [current, setCurrent] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<Direction>(null);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const elapsedRef = useRef(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const transitionTimer = useRef<NodeJS.Timeout | null>(null);

  const slide = heroSlides[current];
  const duration = slide.duration * 1000;

  const changeSlide = useCallback(
    (newIndex: number, dir: "next" | "prev") => {
      if (newIndex === current) return;
      setPrevIndex(current);
      setDirection(dir);
      setCurrent(newIndex);
      elapsedRef.current = 0;
      setProgress(0);

      if (transitionTimer.current) clearTimeout(transitionTimer.current);
      transitionTimer.current = setTimeout(() => {
        setPrevIndex(null);
        setDirection(null);
      }, 700);
    },
    [current],
  );

  const goNext = useCallback(() => {
    changeSlide((current + 1) % heroSlides.length, "next");
  }, [current, changeSlide]);

  const goPrev = useCallback(() => {
    changeSlide((current - 1 + heroSlides.length) % heroSlides.length, "prev");
  }, [current, changeSlide]);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === current) return;
      changeSlide(index, index > current ? "next" : "prev");
    },
    [current, changeSlide],
  );

  const goNextRef = useRef(goNext);
  useEffect(() => {
    goNextRef.current = goNext;
  });

  useEffect(() => {
    if (isPaused) return;

    const startTime = Date.now();
    const baseElapsed = elapsedRef.current;

    const interval = setInterval(() => {
      const elapsed = baseElapsed + (Date.now() - startTime);
      elapsedRef.current = elapsed;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      if (newProgress >= 100) {
        goNextRef.current();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [current, isPaused, duration]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (Math.abs(distance) >= 50) {
      if (distance > 0) goNextRef.current();
      else goPrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleImageError = (key: string) => {
    setImageErrors((prev) => new Set(prev).add(key));
  };

  return (
    <>
      <section
        className="relative -mt-16 h-[100svh] w-full overflow-hidden bg-black"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        aria-roledescription="carousel"
      >
        {heroSlides.map((s, index) => {
          const isActive = index === current;
          const isExiting = index === prevIndex;
          const visible = isActive || isExiting;
          const useFallback =
            imageErrors.has(`${s.id}-desktop`) &&
            imageErrors.has(`${s.id}-mobile`);

          let animClass = "";
          if (isActive && direction === "next") animClass = "hero-slide-in-right";
          else if (isActive && direction === "prev") animClass = "hero-slide-in-left";
          else if (isExiting && direction === "next") animClass = "hero-slide-out-left";
          else if (isExiting && direction === "prev") animClass = "hero-slide-out-right";

          return (
            <div
              key={s.id}
              className={`absolute inset-0 ${visible ? "" : "opacity-0 pointer-events-none"} ${animClass}`}
              style={{ zIndex: isActive ? 20 : isExiting ? 10 : 0 }}
              aria-hidden={!isActive}
            >
              {useFallback ? (
                <div
                  className="absolute inset-0"
                  style={{ background: heroFallbackGradients[index] }}
                />
              ) : (
                <>
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="eager"
                    onError={() => handleImageError(`${s.id}-desktop`)}
                    className="absolute inset-0 hidden h-full w-full object-cover transition-transform duration-[8s] ease-out md:block"
                    style={{ transform: isActive ? "scale(1.05)" : "scale(1)" }}
                  />
                  <img
                    src={s.imageMobile}
                    alt={s.title}
                    loading="eager"
                    onError={() => handleImageError(`${s.id}-mobile`)}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[8s] ease-out md:hidden"
                    style={{ transform: isActive ? "scale(1.05)" : "scale(1)" }}
                  />
                </>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            </div>
          );
        })}

        <div className="relative z-30 flex h-full flex-col justify-end pb-9">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <div
              key={current}
              className="max-w-xl space-y-3 hero-content-fade md:max-w-2xl md:space-y-6"
            >
              <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-white md:text-sm">
                {slide.category}
              </span>

              <h1 className="text-3xl font-black leading-tight tracking-tight text-white md:text-3xl lg:text-5xl">
                {slide.title}
              </h1>

              <div className="flex items-center gap-4 md:gap-6">
                <Link
                  href={slide.ctaHref}
                  className={`inline-flex items-center gap-2 rounded px-5 py-2.5 text-sm font-bold shadow-lg transition-all hover:scale-105 md:px-8 md:py-4 md:text-base ${styles.button}`}
                >
                  {slide.ctaLabel}
                  <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                </Link>

                <div className="max-w-[130px] flex-1 md:max-w-xs">
                  <div className="h-0.5 w-full overflow-hidden rounded-full bg-white/20">
                    <div
                      className={`h-full transition-all duration-75 ease-linear ${styles.progress}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsPaused((p) => !p)}
          className="absolute top-20 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 transition-colors"
          aria-label={isPaused ? "Reprendre le diaporama" : "Mettre en pause"}
        >
          {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </button>
      </section>

      <section className="relative bg-black pt-0 pb-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="scrollbar-hide flex gap-2 overflow-x-auto py-2">
            {heroSlides.map((s, index) => {
              const isActive = index === current;
              const useFallback =
                imageErrors.has(`${s.id}-desktop`) &&
                imageErrors.has(`${s.id}-mobile`);

              return (
                <button
                  key={s.id}
                  onClick={() => goToSlide(index)}
                  className={`group relative flex-shrink-0 overflow-hidden rounded-lg border transition-all duration-300 ${
                    isActive
                      ? "bg-neutral-800 border-white/20"
                      : "bg-black border-white/10 hover:bg-neutral-800 hover:border-white/20 focus-visible:bg-neutral-800 focus-visible:border-white/20"
                  }`}
                  aria-label={`Aller au slide ${index + 1}`}
                >
                  <div className="flex w-[170px] items-center gap-2 p-2 md:w-[210px]">
                    <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md md:h-16 md:w-16">
                      {useFallback ? (
                        <div
                          className="absolute inset-0"
                          style={{ background: heroFallbackGradients[index] }}
                        />
                      ) : (
                        <>
                          <img
                            src={s.image}
                            alt=""
                            loading="lazy"
                            onError={() => handleImageError(`${s.id}-desktop`)}
                            className="absolute inset-0 hidden h-full w-full object-cover md:block"
                          />
                          <img
                            src={s.imageMobile}
                            alt=""
                            loading="lazy"
                            onError={() => handleImageError(`${s.id}-mobile`)}
                            className="absolute inset-0 h-full w-full object-cover md:hidden"
                          />
                        </>
                      )}
                    </div>

                    <div className="min-w-0 flex-1 text-left">
                      <p className="line-clamp-2 text-[11px] font-medium leading-tight text-white md:text-xs">
                        {s.title}
                      </p>
                      <p className="mt-1 text-[9px] text-white/60 md:text-[10px]">
                        {s.category}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
} , 
"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Menu, ChevronDown, ChevronLeft, Search, User, X,
  FileText, ShoppingBag, Video,
} from "lucide-react";
import { languageOptions, mainNavigation } from "@/data/navigation";
import { articles } from "@/data/news";
import { products } from "@/data/products";
import { videos } from "@/data/videos";
import { CartButton } from "@/components/interactive/cart-button";
import { TEAMS, getTeamFromPath, type TeamId } from "@/data/team-theme";

const SCROLL_THRESHOLD = 20;
const DELTA_THRESHOLD = 8;
const TOP_THRESHOLD = 80;


function useActiveTeam(): TeamId {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (pathname.includes("/valladolid")) return "valladolid";
  if (pathname.includes("/ennour")) return "ennour";
  if (pathname.includes("/avenir")) return "avenir";

   const queryTeam = searchParams.get("team");
  if (queryTeam === "valladolid" || queryTeam === "ennour" || queryTeam === "avenir") {
    return queryTeam as TeamId;
  }

  return "group";
}

type SearchItem = {
  id: string;
  type: "page" | "article" | "product" | "video";
  title: string;
  subtitle?: string;
  href: string;
};

const SEARCH_INDEX: SearchItem[] = [
  ...mainNavigation.map((n) => ({
    id: `p-${n.href}`, type: "page" as const, title: n.label, href: n.href,
  })),
  ...articles.map((a) => ({
    id: `a-${a.slug}`, type: "article" as const, title: a.title,
    subtitle: a.categoryLabel, href: `/actualites/${a.slug}`,
  })),
  ...products.map((p) => ({
    id: `pr-${p.slug}`, type: "product" as const, title: p.name,
    subtitle: `${p.price} TND`, href: `/boutique/${p.slug}`,
  })),
  ...videos.map((v) => ({
    id: `v-${v.id}`, type: "video" as const, title: v.title,
    subtitle: v.categoryLabel, href: "/tv",
  })),
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "fr";
  const team = useActiveTeam();
const theme = TEAMS[team];
const section = theme.nav;
  const isBoutiquePage = pathname.includes("/boutique");
  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  // Reset logo error on team change
  useEffect(() => {
    setLogoError(false);
  }, [theme.logoPath]);

  // Hero pages → transparent navbar at top
   const navBgClass = theme.bgClass;
  // Logo redirects to the team's home
  const logoHref =
    team === "group" ? `/${currentLocale}` : `/${currentLocale}/${team}`;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > SCROLL_THRESHOLD);
      if (y < TOP_THRESHOLD) setHidden(false);
      else if (y > lastScrollY.current + DELTA_THRESHOLD) {
        setHidden(true);
        setOpenDropdown(null);
      } else if (y < lastScrollY.current - DELTA_THRESHOLD) {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setSearchOpen(false);
    setOpenDropdown(null);
    setMobileOpen(false);
  }, [pathname]);

  const headerHidden = hidden && !searchOpen && !mobileOpen && !searchFocused;

  // Logo render — image or initials fallback
  const LogoMark = ({ size = 40 }: { size?: number }) => {
    if (logoError) {
      return (
        <div
          className="flex h-10 items-center justify-center rounded-md bg-white px-2 text-sm font-black shadow-sm"
          style={{ color: theme.hex }}
        >
          {theme.initials}
        </div>
      );
    }
    return (
      <Image
        src={theme.logoPath}
        alt={theme.name}
        width={size}
        height={size}
        priority
        className="h-10 w-10 object-contain"
        onError={() => setLogoError(true)}
      />
    );
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out will-change-transform ${
          headerHidden ? "-translate-y-full" : "translate-y-0"
        }`}
        onFocus={() => setHidden(false)}
      >
        <nav
          className={`mx-auto flex h-16 max-w-7xl items-center px-3 md:px-4 lg:px-8 transition-all duration-300 ${navBgClass} ${
            scrolled ? "shadow-lg shadow-black/25" : ""
          }`}
        >
          {searchOpen ? (
            <div className="flex items-center gap-2 w-full">
              <button
                onClick={closeSearch}
                className="flex items-center justify-center p-2 -ml-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                aria-label="Fermer la recherche"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <InlineSearch
                autoFocus
                className="flex-1"
                inputClassName="w-full"
                onNavigate={closeSearch}
              />
            </div>
          ) : (
            <>
              <Link
                href={logoHref}
                className="flex shrink-0 items-center justify-center transition-opacity hover:opacity-80"
              >
                <LogoMark />
              </Link>

              <div className="flex-1 flex justify-center min-w-0 px-2">
                <div className="hidden md:flex items-center gap-0.5 lg:gap-1">
                  {section.dropdowns?.map((dd) => (
                    <div
                      key={dd.label}
                      className="relative"
                      onMouseEnter={() => setOpenDropdown(dd.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <button
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === dd.label ? null : dd.label,
                          )
                        }
                        className="flex items-center gap-1 px-2 lg:px-3 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                        aria-haspopup="true"
                        aria-expanded={openDropdown === dd.label}
                      >
                        {dd.label}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            openDropdown === dd.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openDropdown === dd.label && (
                        <div className="absolute top-full left-0 pt-1">
                          <div
                            className={`w-52 rounded-md border border-white/10 ${theme.bgClass} shadow-lg overflow-hidden`}
                            role="menu"
                          >
                            {dd.links.map((l) => {
                              const showLogo = team === "group";
                              const lt = showLogo
                                ? l.href.includes("/valladolid")
                                  ? TEAM_THEME.valladolid
                                  : l.href.includes("/ennour")
                                    ? TEAM_THEME.ennour
                                    : l.href.includes("/avenir")
                                      ? TEAM_THEME.avenir
                                      : null
                                : null;
                              return (
                                <Link
                                  key={l.href}
                                  href={`/${currentLocale}${l.href}`}
                                  className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                                  role="menuitem"
                                >
                                  {lt && (
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white p-0.5">
                                      <Image
                                        src={lt.logoPath}
                                        alt=""
                                        width={24}
                                        height={24}
                                        className="h-full w-full object-contain"
                                      />
                                    </span>
                                  )}
                                  <span>{l.label}</span>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {section.primaryLinks.map((l) => {
                    const href = `/${currentLocale}${l.href}`;
                    const basePath = l.href.split("?")[0];
                    const activePath = `/${currentLocale}${basePath}`;
                    const active =
                      pathname === href || pathname === activePath;
                    return (
                      <Link
                        key={l.href}
                        href={href}
                        className={`px-2 lg:px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                          active
                            ? "text-white bg-white/15"
                            : "text-white/90 hover:text-white hover:bg-white/10"
                        }`}
                        aria-current={active ? "page" : undefined}
                      >
                        {l.label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-1 lg:gap-2 shrink-0">
                <div className="hidden md:block">
                  <InlineSearch
                    inputClassName="w-32 lg:w-48"
                    onFocusChange={setSearchFocused}
                  />
                </div>

                <div className="relative hidden md:block">
                  <select
                    value={currentLocale}
                    onChange={(e) => {
                      window.location.href = pathname.replace(
                        `/${currentLocale}`,
                        `/${e.target.value}`,
                      );
                    }}
                    className="appearance-none bg-transparent text-sm font-medium text-white/90 hover:text-white border border-white/10 hover:border-white/25 rounded-md pl-3 pr-8 py-2 cursor-pointer focus:outline-none focus:ring-1 focus:ring-white/40 transition-colors"
                    aria-label="Choisir la langue"
                  >
                    {languageOptions.map((lang) => (
                      <option key={lang.code} value={lang.code} className="bg-white text-foreground">
                        {lang.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/70" />
                </div>

                {isBoutiquePage && (
                  <div className="hidden md:block"><CartButton /></div>
                )}

                {team === "valladolid" && (
                  <Link
                    href={`/${currentLocale}/login`}
                    className="hidden md:flex items-center justify-center p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                    aria-label="Profil"
                  >
                    <User className="h-5 w-5" />
                  </Link>
                )}

                {/* Inscription — ALL teams */}
                <Link
                  href={`/${currentLocale}/inscription`}
                  className="hidden md:inline-flex items-center rounded-md bg-accent px-3 py-2 text-xs font-bold text-white hover:bg-accent-light transition-colors whitespace-nowrap"
                >
                  Inscription
                </Link>

                <div className="flex md:hidden items-center gap-1">
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="flex items-center justify-center p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                    aria-label="Rechercher"
                  >
                    <Search className="h-5 w-5" />
                  </button>

                  {team === "valladolid" && (
                    <Link
                      href={`/${currentLocale}/login`}
                      className="flex items-center justify-center p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                      aria-label="Profil"
                    >
                      <User className="h-5 w-5" />
                    </Link>
                  )}

                  {isBoutiquePage && <CartButton />}

                  <Link
                    href={`/${currentLocale}/inscription`}
                    className="flex items-center justify-center rounded-md bg-accent px-2.5 py-1.5 text-[11px] font-bold text-white hover:bg-accent-light transition-colors whitespace-nowrap"
                  >
                    Inscription
                  </Link>

                  <button
                    onClick={() => setMobileOpen(true)}
                    className="flex items-center justify-center p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                    aria-label="Menu"
                  >
                    <Menu className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </>
          )}
        </nav>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={closeMobile}
        currentLang={currentLocale}
        bgClass={theme.bgClass}
        groups={section.mobileGroups}
        theme={theme}
        logoError={logoError}
        onLogoError={() => setLogoError(true)}
      />
    </>
  );
}

function MobileMenu({
  open,
  onClose,
  currentLang,
  bgClass,
  groups,
  theme,
  logoError,
  onLogoError,
}: {
  open: boolean;
  onClose: () => void;
  currentLang: string;
  bgClass: string;
  groups: { title: string; links: { label: string; href: string }[] }[];
  theme: typeof TEAM_THEME[TeamId];
  logoError: boolean;
  onLogoError: () => void;
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-sm ${bgClass} border-l border-white/10 shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Menu principal"
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <div className="flex items-center gap-3">
              {logoError ? (
                <div
                  className="flex h-9 items-center justify-center rounded-md bg-white px-2 text-xs font-black"
                  style={{ color: theme.hex }}
                >
                  {theme.initials}
                </div>
              ) : (
                <Image
                  src={theme.logoPath}
                  alt={theme.name}
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain"
                  onError={onLogoError}
                />
              )}
              <span className="font-bold text-white">Menu</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Fermer le menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto scrollbar-hide px-4 py-6">
            <ul className="space-y-1">
              {groups.map((group) => (
                <li key={group.title} className="mb-4">
                  <div className="px-4 py-2 text-xs font-semibold text-white/60 uppercase tracking-wider">
                    {group.title}
                  </div>
                  {group.links.map((l) => {
                    const href = `/${currentLang}${l.href}`;
                    const active = pathname === href;
                    return (
                      <Link
                        key={l.href}
                        href={href}
                        onClick={onClose}
                        className={`block rounded-md px-4 py-3 text-base font-medium transition-colors ${
                          active
                            ? "bg-white/15 text-white"
                            : "text-white/90 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {l.label}
                      </Link>
                    );
                  })}
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-white/10">
              <Link
                href={`/${currentLang}/inscription`}
                onClick={onClose}
                className="mx-4 flex items-center justify-center rounded-md bg-accent px-4 py-3 text-sm font-bold text-white hover:bg-accent-light transition-colors"
              >
                Inscription
              </Link>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="px-4 text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">
                Langue
              </div>
              <div className="mx-4 relative">
                <select
                  value={currentLang}
                  onChange={(e) => {
                    window.location.href = pathname.replace(
                      `/${currentLang}`,
                      `/${e.target.value}`,
                    );
                    onClose();
                  }}
                  className="appearance-none w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-md pl-4 pr-10 py-2.5 text-sm font-medium text-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-white/40 transition-colors"
                  aria-label="Choisir la langue"
                >
                  {languageOptions.map((lang) => (
                    <option key={lang.code} value={lang.code} className="bg-white text-foreground">
                      {lang.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
              </div>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}

function InlineSearch({
  autoFocus, className = "", inputClassName = "", onNavigate, onFocusChange,
}: {
  autoFocus?: boolean;
  className?: string;
  inputClassName?: string;
  onNavigate?: () => void;
  onFocusChange?: (f: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => { onFocusChange?.(focused); }, [focused, onFocusChange]);
  useEffect(() => { setQuery(""); setFocused(false); }, [pathname]);
  useEffect(() => {
    if (!autoFocus) return;
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [autoFocus]);

  useEffect(() => {
    if (!focused) return;
    const h = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setFocused(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [focused]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setFocused(false); inputRef.current?.blur(); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return SEARCH_INDEX.filter(
      (r) => r.title.toLowerCase().includes(q) || r.subtitle?.toLowerCase().includes(q),
    ).slice(0, 8);
  }, [query]);

  const showDropdown = focused && query.trim().length > 0;

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div className="flex items-center gap-2 rounded bg-white/95 border border-white/20 px-3 py-1.5 shadow-sm focus-within:ring-1 focus-within:ring-white/50 transition-all">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Rechercher..."
          className={`bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground text-foreground ${inputClassName}`}
          aria-label="Rechercher"
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
          autoComplete="off"
        />
        <Search className="h-4 w-4 text-muted-foreground shrink-0" />
      </div>

      {showDropdown && (
        <div
          className="absolute top-full mt-2 left-0 right-0 sm:left-auto sm:right-0 sm:w-[340px] rounded-lg border border-border bg-card shadow-2xl overflow-hidden z-[60]"
          role="listbox"
        >
          {filtered.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-muted-foreground">
              Aucun résultat pour « {query} »
            </div>
          ) : (
            <ul className="max-h-80 overflow-y-auto py-1">
              {filtered.map((r) => (
                <li key={r.id}>
                  <button
                    onClick={() => {
                      setQuery("");
                      setFocused(false);
                      onNavigate?.();
                      router.push(r.href);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-secondary transition-colors"
                    role="option"
                    aria-selected="false"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {r.type === "product" ? (
                        <ShoppingBag className="h-4 w-4" />
                      ) : r.type === "video" ? (
                        <Video className="h-4 w-4" />
                      ) : (
                        <FileText className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground truncate">{r.title}</div>
                      {r.subtitle && (
                        <div className="text-xs text-muted-foreground truncate">{r.subtitle}</div>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
} , "use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { getTeamFromPath, TEAMS } from "@/data/team-theme";

import { brand } from "@/data/brand";
import { PartnersCarousel } from "@/components/global/partners-carousel";
import Image from "next/image";
function TikTok({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

function Pinterest({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.4.04-3.44l1.4-5.96s-.36-.72-.36-1.78c0-1.67.97-2.92 2.17-2.92 1.02 0 1.52.77 1.52 1.69 0 1.03-.66 2.57-.99 4 .28 1.19 1.32 1.47 2.2 1.47 2.6 0 4.6-2.75 4.6-6.7 0-3.5-2.52-5.95-6.12-5.95-4.17 0-6.61 3.13-6.61 6.36 0 1.26.48 2.6 1.08 3.33.12.14.14.27.1.42l-.4 1.63c-.06.26-.21.32-.48.19-1.8-.84-2.92-3.46-2.92-5.57 0-4.54 3.29-8.7 9.48-8.7 4.97 0 8.84 3.54 8.84 8.27 0 4.94-3.11 8.91-7.42 8.91-1.45 0-2.81-.75-3.28-1.64l-.89 3.4c-.32 1.23-1.19 2.78-1.77 3.72A12 12 0 1 0 12 0z" />
    </svg>
  );
}

const socials = [
  { name: "Facebook", href: "https://facebook.com/arvtataouine", icon: Facebook },
  { name: "Instagram", href: "https://instagram.com/arvtataouine", icon: Instagram },
  { name: "YouTube", href: "https://youtube.com/@arvtataouine", icon: Youtube },
  { name: "Twitter", href: "https://twitter.com/arvtataouine", icon: Twitter },
  { name: "TikTok", href: "https://tiktok.com/@arvtataouine", icon: TikTok },
  { name: "LinkedIn", href: "https://linkedin.com/company/arvtataouine", icon: Linkedin },
  { name: "Pinterest", href: "https://pinterest.com/arvtataouine", icon: Pinterest },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const section = getTeamFromPath(pathname);
const theme = TEAMS[section];
  const [logoError, setLogoError] = useState(false);

  // Reset logo error when team changes
  useEffect(() => {
    setLogoError(false);
  }, [theme.logoPath]);

  const columns = theme.footerColumns;
  return (
    <footer className="relative bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-12 space-y-10">
        {/* 1 ─ Partners */}
        <section>
          <h3 className="mb-6 text-center text-xs font-bold uppercase tracking-widest text-background/50">
            Nos partenaires
          </h3>
          <PartnersCarousel />
        </section>

        {/* 2 ─ Nav columns */}
        <section>
         <div className={`mx-auto grid max-w-5xl grid-cols-2 gap-6 ${columns.length === 4 ? "sm:grid-cols-4" : "sm:grid-cols-3"}`}>
  {columns.map((col) => (
    <FooterColumn key={col.title} title={col.title} links={col.links} />
  ))}
</div>
        </section>

        {/* 3 ─ Centered logo + tagline */}
        <section className="text-center">
      <Link
  href="/"
  className="inline-flex items-center justify-center transition-opacity hover:opacity-80"
  aria-label={theme.name}
>
  {logoError ? (
    <div
      className="flex h-14 items-center justify-center rounded-xl bg-white px-3 text-lg font-black shadow-md"
      style={{ color: theme.hex }}
    >
      {theme.initials}
    </div>
  ) : (
       <Image
      src={theme.logoPath}
      onError={() => setLogoError(true)}
      alt={theme.name}
      width={56}
      height={56}
      className="h-14 w-14 object-contain"
    />
  )}
</Link>
          <div className="mt-3">
            <div className="text-sm font-bold text-background">{brand.name}</div>
            <div className="mt-1 text-xs text-background/60">{brand.tagline}</div>
          </div>
        </section>

        {/* 4 ─ Socials */}
        <section>
          <ul className="flex flex-wrap items-center justify-center gap-2">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    title={s.name}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-background/5 text-background/60"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              );
            })}
          </ul>
        </section>

        {/* 5 ─ Contact row */}
        <section>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-background/70">
            <a
              href={`tel:${brand.phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2"
            >
              <Phone className="h-3.5 w-3.5 text-gold" />
              {brand.phone}
            </a>
            <span aria-hidden className="text-background/20">·</span>
            <a
              href={`mailto:${brand.email}`}
              className="inline-flex items-center gap-2"
            >
              <Mail className="h-3.5 w-3.5 text-gold" />
              {brand.email}
            </a>
            <span aria-hidden className="text-background/20">·</span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-gold" />
              {brand.address.city}, {brand.address.country}
            </span>
          </div>
        </section>

        {/* 6 ─ Bottom bar */}
        <section className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-background/50">
            © {currentYear} {brand.name}. Tous droits réservés.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-background/50">
            <li>
             <Link href="/valladolid/mentions-legales">Mentions légales</Link>

            </li>
            <li>
<Link href="/valladolid/politique-confidentialite">Confidentialité</Link>
            </li>
            <li>
<Link href="/valladolid/cookies">Cookies</Link>
            </li>
            <li>
<Link href="/valladolid/cgv">CGV</Link>
            </li>
          </ul>
        </section>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-wider text-background/80">
        {title}
      </h3>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
           <li key={`${link.href}-${link.label}`}>

            <Link
              href={link.href}
              className="text-sm text-background/60"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
} , export type TeamId = "group" | "valladolid" | "ennour" | "avenir";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavDropdown {
  label: string;
  links: NavLink[];
}

export interface MobileNavGroup {
  title: string;
  links: NavLink[];
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export interface TeamConfig {
  id: TeamId;
  name: string;
  shortName: string;
  initials: string;

  // Colors — hex + Tailwind classes
  hex: string;
  hexDark: string;
  hexLight: string;
  bgClass: string;
  textClass: string;
  bgSoftClass: string;
  borderClass: string;

  // Hero gradient for full-bg heroes (Ennour, Avenir, Group fallback)
  heroGradient: string;
  // Optional overlay used on Group hero (image + gradient overlay)
  heroOverlayR?: string;

  // Logo
  logoPath: string;

  // Hero carousel button + progress colors
  carousel: {
    button: string;
    progress: string;
  };

  // Navbar configuration
  nav: {
    dropdowns?: NavDropdown[];
    primaryLinks: NavLink[];
    mobileGroups: MobileNavGroup[];
  };

  // Footer columns
  footerColumns: FooterColumn[];

  // Inscription/contact form metadata
  formTagline: string;
  formIcon: "shield" | "heart" | "zap" | "star";
}

export const TEAMS: Record<TeamId, TeamConfig> = {
  group: {
    id: "group",
    name: "Groupe ARV",
    shortName: "Groupe",
    initials: "ARV",
    hex: "#0B3E5C",
    hexDark: "#082B42",
    hexLight: "#155C8A",
    bgClass: "bg-[#0B3E5C]",
    textClass: "text-[#0B3E5C]",
    bgSoftClass: "bg-[#0B3E5C]/10",
    borderClass: "border-[#0B3E5C]",
    heroGradient: "from-[#0B3E5C] via-[#0B3E5C] to-[#0F2A47]",
    heroOverlayR: "from-[#0B3E5C]/70 via-transparent to-[#0F2A47]/60",
    logoPath: "/images/logo/logo.png",
    carousel: {
      button: "bg-[#F0C419] text-[#0B3E5C] hover:bg-[#F0C419]/90",
      progress: "bg-[#F0C419]",
    },
    nav: {
      dropdowns: [
        {
          label: "Nos équipes",
          links: [
            { label: "Real Valladolid", href: "/valladolid" },
            { label: "Ennour Sportif", href: "/ennour" },
            { label: "Avenir Sportif", href: "/avenir" },
          ],
        },
      ],
      primaryLinks: [
        { label: "TV", href: "/tv" },
        { label: "Actualités", href: "/actualites" },
        { label: "Boutique", href: "/boutique" },
        { label: "Contact", href: "/contact" },
      ],
      mobileGroups: [
        {
          title: "Nos équipes",
          links: [
            { label: "Real Valladolid", href: "/valladolid" },
            { label: "Ennour Sportif", href: "/ennour" },
            { label: "Avenir Sportif", href: "/avenir" },
          ],
        },
        {
          title: "Le groupe",
          links: [
            { label: "TV", href: "/tv" },
            { label: "Actualités", href: "/actualites" },
            { label: "Boutique", href: "/boutique" },
          ],
        },
        {
          title: "Contact",
          links: [{ label: "Nous contacter", href: "/contact" }],
        },
      ],
    },
    footerColumns: [
      {
        title: "Le Groupe",
        links: [
          { label: "Real Valladolid", href: "/valladolid" },
          { label: "Ennour Sportif", href: "/ennour" },
          { label: "Avenir Sportif", href: "/avenir" },
        ],
      },
      {
        title: "Contact",
        links: [
          { label: "Nous contacter", href: "/contact" },
          { label: "Inscription", href: "/inscription" },
        ],
      },
      {
        title: "Légal",
        links: [
          { label: "Mentions légales", href: "/valladolid/mentions-legales" },
          { label: "Confidentialité", href: "/valladolid/politique-confidentialite" },
          { label: "Cookies", href: "/valladolid/cookies" },
          { label: "CGV", href: "/valladolid/cgv" },
        ],
      },
    ],
    formTagline: "Toutes les équipes du groupe",
    formIcon: "shield",
  },

  valladolid: {
    id: "valladolid",
    name: "Real Valladolid",
    shortName: "Valladolid",
    initials: "RV",
    hex: "#5E2D91",
    hexDark: "#422068",
    hexLight: "#7B3FB8",
    bgClass: "bg-primary",
    textClass: "text-primary",
    bgSoftClass: "bg-primary/10",
    borderClass: "border-primary",
    heroGradient: "from-primary via-primary-dark to-accent-dark",
    logoPath: "/images/logo/valladolid.png",
    carousel: {
      button: "bg-accent text-white hover:bg-accent-light",
      progress: "bg-gold",
    },
    nav: {
      dropdowns: [
        {
          label: "Club",
          links: [
            { label: "Club", href: "/valladolid/club" },
            { label: "Palmarès", href: "/valladolid/palmares" },
            { label: "Alumni", href: "/valladolid/alumni" },
          ],
        },
      ],
      primaryLinks: [
        { label: "Matchs", href: "/valladolid/matchs" },
        { label: "TV", href: "/tv?team=valladolid" },
        { label: "Actualités", href: "/actualites?team=valladolid" },
        { label: "Boutique", href: "/boutique?team=valladolid" },
        { label: "Contact", href: "/contact" },
      ],
      mobileGroups: [
        {
          title: "Club",
          links: [
            { label: "Notre Club", href: "/valladolid/club" },
            { label: "Palmarès", href: "/valladolid/palmares" },
            { label: "Alumni", href: "/valladolid/alumni" },
          ],
        },
        {
          title: "Compétition",
          links: [
            { label: "Matchs", href: "/valladolid/matchs" },
            { label: "TV", href: "/tv?team=valladolid" },
            { label: "Actualités", href: "/actualites?team=valladolid" },
          ],
        },
        {
          title: "Boutique",
          links: [{ label: "Boutique", href: "/boutique?team=valladolid" }],
        },
        {
          title: "Contact",
          links: [{ label: "Contact", href: "/contact" }],
        },
      ],
    },
    footerColumns: [
      {
        title: "Club",
        links: [
          { label: "Notre histoire", href: "/valladolid/club" },
          { label: "Palmarès", href: "/valladolid/palmares" },
          { label: "TV", href: "/tv?team=valladolid" },
        ],
      },
      {
        title: "Compétition",
        links: [
          { label: "Matchs", href: "/valladolid/matchs" },
          { label: "Alumni", href: "/valladolid/alumni" },
          { label: "Actualités", href: "/actualites?team=valladolid" },
          { label: "Inscription", href: "/inscription" },
        ],
      },
      {
        title: "Boutique",
        links: [
          { label: "Maillots", href: "/boutique?team=valladolid" },
          { label: "Équipement", href: "/boutique?team=valladolid" },
        ],
      },
      {
        title: "Légal",
        links: [
          { label: "Mentions légales", href: "/valladolid/mentions-legales" },
          { label: "Confidentialité", href: "/valladolid/politique-confidentialite" },
          { label: "Cookies", href: "/valladolid/cookies" },
          { label: "CGV", href: "/valladolid/cgv" },
        ],
      },
    ],
    formTagline: "Football masculin · académie historique",
    formIcon: "shield",
  },

  ennour: {
    id: "ennour",
    name: "Ennour Sportif",
    shortName: "Ennour",
    initials: "EN",
    hex: "#7A1F2B",
    hexDark: "#5C1620",
    hexLight: "#A02A38",
    bgClass: "bg-[#7A1F2B]",
    textClass: "text-[#7A1F2B]",
    bgSoftClass: "bg-[#7A1F2B]/10",
    borderClass: "border-[#7A1F2B]",
    heroGradient: "from-[#7A1F2B] via-[#5C1620] to-[#141414]",
    logoPath: "/images/logo/ennour.png",
    carousel: {
      button: "bg-[#F0C419] text-[#7A1F2B] hover:bg-[#F0C419]/90",
      progress: "bg-[#F0C419]",
    },
    nav: {
      primaryLinks: [
        { label: "À propos", href: "/ennour#mission" },
        { label: "TV", href: "/tv?team=ennour" },
        { label: "Actualités", href: "/actualites?team=ennour" },
        { label: "Boutique", href: "/boutique?team=ennour" },
        { label: "Contact", href: "/contact" },
      ],
      mobileGroups: [
        {
          title: "Ennour Sportif",
          links: [
            { label: "À propos", href: "/ennour#mission" },
            { label: "Galerie", href: "/ennour#gallery" },
            { label: "TV", href: "/tv?team=ennour" },
            { label: "Actualités", href: "/actualites?team=ennour" },
            { label: "Boutique", href: "/boutique?team=ennour" },
          ],
        },
        {
          title: "Le Groupe",
          links: [{ label: "Retour au groupe", href: "/" }],
        },
        {
          title: "Contact",
          links: [{ label: "Nous contacter", href: "/contact" }],
        },
      ],
    },
    footerColumns: [
      {
        title: "Le Groupe",
        links: [
          { label: "Real Valladolid", href: "/valladolid" },
          { label: "Ennour Sportif", href: "/ennour" },
          { label: "Avenir Sportif", href: "/avenir" },
        ],
      },
      {
        title: "Contact",
        links: [
          { label: "Nous contacter", href: "/contact" },
          { label: "Inscription", href: "/inscription" },
        ],
      },
      {
        title: "Légal",
        links: [
          { label: "Mentions légales", href: "/valladolid/mentions-legales" },
          { label: "Confidentialité", href: "/valladolid/politique-confidentialite" },
          { label: "Cookies", href: "/valladolid/cookies" },
          { label: "CGV", href: "/valladolid/cgv" },
        ],
      },
    ],
    formTagline: "Football féminin",
    formIcon: "heart",
  },

  avenir: {
    id: "avenir",
    name: "Avenir Sportif",
    shortName: "Avenir",
    initials: "AV",
    hex: "#0F2A47",
    hexDark: "#081A2E",
    hexLight: "#1E3B66",
    bgClass: "bg-[#0F2A47]",
    textClass: "text-[#0F2A47]",
    bgSoftClass: "bg-[#0F2A47]/10",
    borderClass: "border-[#0F2A47]",
    heroGradient: "from-[#0F2A47] via-[#1E3B66] to-[#0F2A47]",
    logoPath: "/images/logo/avenir.png",
    carousel: {
      button: "bg-[#F0C419] text-[#0F2A47] hover:bg-[#F0C419]/90",
      progress: "bg-[#F0C419]",
    },
    nav: {
      primaryLinks: [
        { label: "À propos", href: "/avenir#mission" },
        { label: "TV", href: "/tv?team=avenir" },
        { label: "Actualités", href: "/actualites?team=avenir" },
        { label: "Boutique", href: "/boutique?team=avenir" },
        { label: "Contact", href: "/contact" },
      ],
      mobileGroups: [
        {
          title: "Avenir Sportif",
          links: [
            { label: "À propos", href: "/avenir#mission" },
            { label: "Galerie", href: "/avenir#gallery" },
            { label: "TV", href: "/tv?team=avenir" },
            { label: "Actualités", href: "/actualites?team=avenir" },
            { label: "Boutique", href: "/boutique?team=avenir" },
          ],
        },
        {
          title: "Le Groupe",
          links: [{ label: "Retour au groupe", href: "/" }],
        },
        {
          title: "Contact",
          links: [{ label: "Nous contacter", href: "/contact" }],
        },
      ],
    },
    footerColumns: [
      {
        title: "Le Groupe",
        links: [
          { label: "Real Valladolid", href: "/valladolid" },
          { label: "Ennour Sportif", href: "/ennour" },
          { label: "Avenir Sportif", href: "/avenir" },
        ],
      },
      {
        title: "Contact",
        links: [
          { label: "Nous contacter", href: "/contact" },
          { label: "Inscription", href: "/inscription" },
        ],
      },
      {
        title: "Légal",
        links: [
          { label: "Mentions légales", href: "/valladolid/mentions-legales" },
          { label: "Confidentialité", href: "/valladolid/politique-confidentialite" },
          { label: "Cookies", href: "/valladolid/cookies" },
          { label: "CGV", href: "/valladolid/cgv" },
        ],
      },
    ],
    formTagline: "Football & Futsal",
    formIcon: "zap",
  },
};

// Legacy aliases for backwards compatibility
export const TEAM_THEME = TEAMS;

// All team ids (group + entities)
export const TEAM_IDS: TeamId[] = ["group", "valladolid", "ennour", "avenir"];

// Entity ids only (excludes group)
export const ENTITY_IDS: TeamId[] = ["valladolid", "ennour", "avenir"];

// Full list of entities for iteration
export const ENTITY_LIST = ENTITY_IDS.map((id) => TEAMS[id]);

// ============================================================================
// Helpers
// ============================================================================

export function getTeamFromPath(pathname: string): TeamId {
  if (pathname.includes("/valladolid")) return "valladolid";
  if (pathname.includes("/ennour")) return "ennour";
  if (pathname.includes("/avenir")) return "avenir";
  return "group";
}

// Legacy alias
export const getSectionFromPath = getTeamFromPath;

export function getTeamLogoPath(team: TeamId): string {
  return TEAMS[team].logoPath;
} , "use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X, ArrowRight, Calendar } from "lucide-react";
import { usePathname } from "next/navigation";
import { getSectionFromPath } from "@/data/team-theme";
const STORAGE_KEY = "arv-inscription-popup-last-shown";
const INITIAL_DELAY_MS = 8000; // 8s avant la 1ère apparition (1er visit)
const REPEAT_AFTER_MS = 20 * 60 * 1000; // 20 minutes
const CHECK_INTERVAL_MS = 30 * 1000; // vérifie toutes les 30s

export function InscriptionPopup() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

const pathname = usePathname();
const section = getSectionFromPath(pathname);
  // Timer — 8s première fois, puis toutes les 20 min
  useEffect(() => {
  if (typeof window === "undefined") return;
  if (section === "group") return;   // ← ne pas afficher sur la page groupe

  const check = () => { /* ... */ };
  const initialTimer = setTimeout(check, INITIAL_DELAY_MS);
  const interval = setInterval(check, CHECK_INTERVAL_MS);
  return () => {
    clearTimeout(initialTimer);
    clearInterval(interval);
  };
}, [open, section]);

  // Lock scroll pendant l'ouverture
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // ESC pour fermer
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    setOpen(false);
  };

  const goToInscription = () => {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    setOpen(false);
    router.push("/valladolid/inscription");
  };
  if (!open) return null;
if (section === "group") return null;
  return (
    <div
      className="fixed inset-0 z-[95] flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inscription-popup-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={dismiss}
        aria-hidden="true"
      />

      {/* Card */}
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl animate-in slide-in-from-bottom-4 fade-in duration-300">
        {/* Close — sobre sur fond blanc */}
        <button
          onClick={dismiss}
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Fermer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Image — sans fond, sans gradient, taille naturelle */}
        <div className="flex justify-center px-8 pt-8">
          <Image
            src="/images/academy/popup.jpg"
            alt="Enfants de l'académie"
            width={400}
            height={400}
            priority
            className="h-auto w-full max-w-[240px] object-contain"
          />
        </div>

        {/* Body */}
        <div className="px-6 pb-6 pt-4 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent">
            Inscriptions 2026/27
          </span>

          <h2
            id="inscription-popup-title"
            className="mt-3 text-2xl font-black leading-tight text-foreground"
          >
            Rejoignez l&apos;académie
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Inscrivez votre enfant dès aujourd&apos;hui. Première séance
            d&apos;évaluation gratuite, sans engagement.
          </p>

          <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>Places limitées · Sessions dès septembre</span>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <button
              onClick={goToInscription}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent/90 hover:shadow-xl"
            >
              S&apos;inscrire maintenant
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={dismiss}
              className="w-full rounded-xl px-6 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Plus tard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} , "use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { getSectionFromPath, TEAM_THEME } from "@/data/team-theme";

export function FloatingButtons() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const pathname = usePathname();
  const section = getSectionFromPath(pathname);
  const theme = TEAM_THEME[section];

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <a
        href="https://wa.me/21675854717"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-4 sm:right-6 z-[80] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-500 ease-out hover:bg-[#20BD5A] hover:scale-110"
        style={{
          bottom: showBackToTop
            ? "calc(6rem + env(safe-area-inset-bottom, 0px))"
            : "calc(1.5rem + env(safe-area-inset-bottom, 0px))",
        }}
        aria-label="Nous contacter sur WhatsApp"
      >
        <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.152-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>

      <button
        onClick={scrollToTop}
        className="fixed right-4 sm:right-6 z-[80] flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-all duration-500 ease-out hover:scale-110"
        style={{
          backgroundColor: theme.hex,
          bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))",
          opacity: showBackToTop ? 1 : 0,
          transform: showBackToTop ? "translateY(0)" : "translateY(2.5rem)",
          pointerEvents: showBackToTop ? "auto" : "none",
        }}
        aria-label="Retour en haut de page"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </>
  );
} , "use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

const STORAGE_KEY = "arv-cookie-consent";
const RENEW_DAYS = 180;

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const daysSince =
          (Date.now() - Number(parsed.ts)) / (1000 * 60 * 60 * 24);
        if (daysSince < RENEW_DAYS) return;
      } catch {
        // old format "accepted"/"rejected" — ignore and re-show
      }
    }

    const timer = setTimeout(() => setShow(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const save = (choice: "accepted" | "rejected") => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ choice, ts: Date.now() }),
    );
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-2xl animate-in slide-in-from-bottom-4 fade-in duration-300 sm:inset-x-4 sm:bottom-4"
      role="dialog"
      aria-label="Préférences de cookies"
    >
      <div className="relative rounded-2xl border border-border bg-white shadow-xl">
        <button
          onClick={() => save("rejected")}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Refuser et fermer"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        <div className="flex flex-col gap-4 p-4 pr-10 sm:flex-row sm:items-center sm:gap-6 sm:p-5 sm:pr-12">
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">
              Votre vie privée
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Nous utilisons uniquement des cookies nécessaires au
              fonctionnement du site.{" "}
              <Link
                href="/valladolid/cookies"
                className="font-semibold text-foreground underline underline-offset-2 hover:opacity-70"
              >
                En savoir plus
              </Link>
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={() => save("rejected")}
              className="flex-1 rounded-lg border border-border bg-white px-4 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-secondary sm:flex-initial"
            >
              Refuser
            </button>
            <button
              onClick={() => save("accepted")}
              className="flex-1 rounded-lg bg-foreground px-4 py-2.5 text-xs font-semibold text-background transition-opacity hover:opacity-85 sm:flex-initial"
            >
              Accepter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} , "use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { Download, Loader2, Check } from "lucide-react";
import {
  logos,
  backgrounds,
  resolutions,
  type WallpaperTemplate,
} from "@/data/wallpapers";

interface WallpaperGeneratorProps {
  template: WallpaperTemplate;
}

function useImageLoader(src: string | null) {
  const [img, setImg] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!src) {
      setImg(null);
      return;
    }
    const image = new window.Image();
    // NO crossOrigin — same-origin, prevents canvas tainting
    image.onload = () => setImg(image);
    image.onerror = () => {
      console.warn("Failed to load image:", src);
      setImg(null);
    };
    image.src = src;
  }, [src]);

  return img;
}

export function WallpaperGenerator({ template }: WallpaperGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [selectedLogo, setSelectedLogo] = useState(
    template.availableLogos?.[0] ?? "",
  );
  const [selectedBg, setSelectedBg] = useState(
    template.availableBackgrounds?.[0] ?? "",
  );
  const [selectedResolution, setSelectedResolution] = useState(
    resolutions[0].id,
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const availableLogos = useMemo(
    () => logos.filter((l) => template.availableLogos?.includes(l.id)),
    [template.availableLogos],
  );
  const availableBackgrounds = useMemo(
    () =>
      backgrounds.filter((b) => template.availableBackgrounds?.includes(b.id)),
    [template.availableBackgrounds],
  );

  const logo =
    availableLogos.find((l) => l.id === selectedLogo) ?? availableLogos[0];
  const bg =
    availableBackgrounds.find((b) => b.id === selectedBg) ??
    availableBackgrounds[0];
  const res =
    resolutions.find((r) => r.id === selectedResolution) ?? resolutions[0];

  const logoImg = useImageLoader(logo?.path ?? null);
  const bgImg = useImageLoader(bg?.path ?? null);

  // Preview
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const previewW = 640;
    const previewH = Math.round((previewW * res.height) / res.width);
    canvas.width = previewW;
    canvas.height = previewH;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (bgImg) {
      ctx.drawImage(bgImg, 0, 0, previewW, previewH);
    } else {
      const grad = ctx.createLinearGradient(0, 0, previewW, previewH);
      grad.addColorStop(0, "#5E2D91");
      grad.addColorStop(1, "#E7001C");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, previewW, previewH);
    }

    if (logoImg) {
      const size = previewW * 0.32;
      const x = (previewW - size) / 2;
      const y = (previewH - size) / 2;
      ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
      ctx.shadowBlur = 24;
      ctx.shadowOffsetY = 8;
      ctx.drawImage(logoImg, x, y, size, size);
      ctx.shadowColor = "transparent";
    }
  }, [bgImg, logoImg, res]);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = res.width;
      canvas.height = res.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas non supporté");

      if (bgImg) {
        ctx.drawImage(bgImg, 0, 0, res.width, res.height);
      } else {
        const grad = ctx.createLinearGradient(0, 0, res.width, res.height);
        grad.addColorStop(0, "#5E2D91");
        grad.addColorStop(1, "#E7001C");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, res.width, res.height);
      }

      if (logoImg) {
        const size = res.width * 0.32;
        const x = (res.width - size) / 2;
        const y = (res.height - size) / 2;
        ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
        ctx.shadowBlur = 60;
        ctx.shadowOffsetY = 20;
        ctx.drawImage(logoImg, x, y, size, size);
        ctx.shadowColor = "transparent";
      } else {
        // Fallback: draw ARV text
        ctx.fillStyle = "rgba(255,255,255,0.95)";
        ctx.font = `900 ${Math.round(res.width * 0.15)}px system-ui, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("ARV", res.width / 2, res.height / 2);
      }

      // toBlob + createObjectURL — reliable download
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png", 1.0),
      );
      if (!blob) throw new Error("Blob generation failed");

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `arv-wallpaper-${bg?.id ?? "default"}-${res.id}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      console.error("Download failed:", err);
      alert(
        `Le téléchargement a échoué : ${
          err instanceof Error ? err.message : "erreur inconnue"
        }`,
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl  border border-border bg-white shadow-sm">
      {/* Preview */}
      <div className="flex items-center justify-center bg-secondary/40 p-6">
        <canvas
          ref={canvasRef}
          className="block h-auto max-h-[420px] w-auto max-w-full rounded-lg shadow-lg"
        />
      </div>

      <div className="space-y-6 p-6">
        {/* Background picker */}
        <div>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Fond d&apos;écran
          </p>
          <div className="grid grid-cols-4 gap-2">
            {availableBackgrounds.map((b) => {
              const active = selectedBg === b.id;
              return (
                <button
                  key={b.id}
                  onClick={() => setSelectedBg(b.id)}
                  className={`group relative aspect-[3/4] overflow-hidden rounded-lg border-2 transition-all ${
                    active
                      ? "border-foreground"
                      : "border-transparent hover:border-foreground/30"
                  }`}
                  aria-label={b.name}
                  aria-pressed={active}
                >
                  <Image
                    src={b.path}
                    alt={b.name}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-1 pb-1 pt-3 text-center text-[9px] font-semibold text-white">
                    {b.name}
                  </span>
                  {active && (
                    <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-background">
                      <Check className="h-2.5 w-2.5" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Logo picker */}
        <div>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Logo
          </p>
          <div className="flex flex-wrap gap-2">
            {availableLogos.map((l) => {
              const active = selectedLogo === l.id;
              return (
                <button
                  key={l.id}
                  onClick={() => setSelectedLogo(l.id)}
                  className={`relative flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all ${
                    active
                      ? "border-foreground bg-foreground/5"
                      : "border-border hover:border-foreground/30"
                  }`}
                  aria-label={l.name}
                  aria-pressed={active}
                >
                  <Image
                    src={l.path}
                    alt={l.name}
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain"
                  />
                  {active && (
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-background">
                      <Check className="h-2.5 w-2.5" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Resolution picker */}
        <div>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Format
          </p>
          <div className="flex flex-wrap gap-1.5">
            {resolutions.map((r) => {
              const active = selectedResolution === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setSelectedResolution(r.id)}
                  className={`rounded-md px-3 py-1.5 text-[11px] font-medium transition-colors ${
                    active
                      ? "bg-foreground text-background"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                  aria-pressed={active}
                >
                  {r.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Download — always clickable now (falls back if images missing) */}
        <div>
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent/90 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Génération...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Télécharger · {res.label} ({res.width}×{res.height})
              </>
            )}
          </button>
          <p className="mt-3 text-center text-[10px] text-muted-foreground">
            Gratuit · Usage personnel · PNG haute résolution
          </p>
        </div>
      </div>
    </div>
  );
} ,  export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: "match" | "stage" | "academie" | "alumni" | "conseil";
  categoryLabel: string;
  author: {
    name: string;
    role: string;
    initials: string;
  };
  team: string;
  publishedAt: string;
  readTime: number;
  featured: boolean;
  content: {
    type: "paragraph" | "heading" | "quote" | "list";
    text: string;
    items?: string[];
  }[];
  tags: string[];
}

export const articles: Article[] = [
  {
    slug: "victoire-u15-tournoi-sfax",
    title: "Victoire éclatante des U15 au tournoi régional de Sfax",
    excerpt:
      "Nos jeunes talents ont remporté le tournoi régional de Sfax face à 12 équipes, démontrant la qualité de notre formation technique et tactique.",
    image: "/images/news/victoire-u15-tournoi-sfax.jpg",
    category: "match",
    categoryLabel: "Compétition",
    author: { name: "Karim Trabelsi", role: "Directeur Technique", initials: "KT" },
    publishedAt: "2026-11-05T10:00:00Z",
    readTime: 4,
    featured: true,
    tags: ["U15", "tournoi", "Sfax", "victoire"],
    content: [
      {
        type: "paragraph",
        text: "Ce week-end, notre équipe U15 a brillé lors du tournoi régional de Sfax en remportant la finale face à l'AS Gabès sur le score de 3-1. Une performance qui couronne six mois de travail intensif.",
      },
      { type: "heading", text: "Un parcours sans faute" },
      {
        type: "paragraph",
        text: "Après une phase de poule parfaite (3 victoires, 0 défaite), nos joueurs ont enchaîné avec une demi-finale maîtrisée avant de s'imposer en finale devant plus de 500 spectateurs.",
      },
      {
        type: "quote",
        text: "Ce qui me rend le plus fier, ce n'est pas la victoire elle-même, mais la manière dont ces jeunes ont appliqué les principes tactiques travaillés à l'entraînement. Ils ont joué comme une vraie équipe.",
      },
      { type: "heading", text: "Les points clés de la formation" },
      {
        type: "list",
        text: "Les facteurs de cette réussite :",
        items: [
          "Une maîtrise technique supérieure dans les duels",
          "Une occupation intelligente de l'espace",
          "Une solidarité exemplaire entre les lignes",
          "Une gestion mature du score en deuxième mi-temps",
        ],
      },
      {
        type: "paragraph",
        text: "Bravo à tous les joueurs et à leur encadrement. Cette victoire est celle de toute une académie.",
      },
    ],
  },
  {
    slug: "stage-estival-real-valladolid-2027",
    title: "Stage d'été 2027 au Real Valladolid : inscriptions ouvertes",
    excerpt:
      "Dix de nos joueurs sélectionnés participeront à un stage de deux semaines dans les installations du Real Valladolid CF en Espagne.",
    image: "/images/news/stage-estival-real-valladolid-2027.jpg",
    category: "stage",
    categoryLabel: "Stage",
    author: { name: "Leila Hamdi", role: "Coordinatrice Pédagogique", initials: "LH" },
    publishedAt: "2026-11-02T08:00:00Z",
    readTime: 5,
    featured: false,
    tags: ["Espagne", "Real Valladolid", "stage", "U16"],
    content: [
      {
        type: "paragraph",
        text: "Grâce à notre partenariat officiel avec le Real Valladolid CF, dix joueurs de notre académie âgés de 15 à 17 ans auront l'opportunité unique de participer à un stage de perfectionnement en Espagne du 15 au 29 juillet 2027.",
      },
      { type: "heading", text: "Un programme d'exception" },
      {
        type: "paragraph",
        text: "Pendant deux semaines, les jeunes footballeurs s'entraîneront dans les installations de la Ciudad Real Madrid de Valladolid, encadrés par des entraîneurs diplômés UEFA du club espagnol.",
      },
      {
        type: "list",
        text: "Le programme comprend :",
        items: [
          "3 séances d'entraînement quotidiennes",
          "Analyses vidéo individuelles",
          "Matchs amicaux contre des équipes locales",
          "Visite du stade José Zorrilla",
          "Immersion culturelle et linguistique",
        ],
      },
      { type: "heading", text: "Critères de sélection" },
      {
        type: "paragraph",
        text: "Les joueurs seront sélectionnés sur la base de leurs performances sportives, de leur assiduité aux entraînements et de leur comportement exemplaire. Les inscriptions sont ouvertes jusqu'au 31 janvier 2027.",
      },
    ],
  },
  {
    slug: "ahmed-ben-alui-signe-esperance",
    title: "Ahmed Ben Ali signe son premier contrat professionnel à l'Espérance",
    excerpt:
      "Ancien joueur de notre académie, Ahmed Ben Ali a signé son premier contrat professionnel avec l'Espérance Sportive de Tunis.",
    image: "/images/news/ahmed-ben-alui-signe-esperance.jpg",
    category: "alumni",
    categoryLabel: "Alumni",
    team: "valladolid",
    author: { name: "Karim Trabelsi", role: "Directeur Technique", initials: "KT" },
    publishedAt: "2026-10-28T14:00:00Z",
    readTime: 3,
    featured: false,
    tags: ["alumni", "professionnel", "Espérance"],
    content: [
      {
        type: "paragraph",
        text: "C'est avec une immense fierté que nous annonçons la signature d'Ahmed Ben Ali, promotion 2020 de notre académie, avec l'Espérance Sportive de Tunis, l'un des plus grands clubs d'Afrique.",
      },
      {
        type: "quote",
        text: "Tout a commencé ici, à Tataouine. Les entraîneurs m'ont appris la rigueur, la discipline et l'amour du maillot. Je n'oublie pas d'où je viens.",
      },
      {
        type: "paragraph",
        text: "Ahmed a rejoint l'académie à l'âge de 10 ans et l'a quittée à 16 ans pour intégrer le centre de formation de l'EST. Son parcours est la preuve que la formation de qualité existe aussi dans le sud tunisien.",
      },
    ],
  },
  {
    slug: "nouveaux-equipements-salle-analyse",
    title: "Inauguration de notre nouvelle salle d'analyse vidéo",
    excerpt:
      "L'académie se dote d'une salle d'analyse vidéo équipée des dernières technologies pour accompagner la progression de nos joueurs.",
    image: "/images/news/nouveaux-equipements-salle-analyse.jpg",
    category: "academie",
    categoryLabel: "Académie",
    author: { name: "Tarek Bouazizi", role: "Analyste Vidéo", initials: "TB" },
    publishedAt: "2026-10-22T09:00:00Z",
    readTime: 4,
    featured: false,
    tags: ["installations", "technologie", "analyse"],
    content: [
      {
        type: "paragraph",
        text: "Nous avons le plaisir d'inaugurer notre nouvelle salle d'analyse vidéo, un investissement majeur dans la modernisation de nos installations.",
      },
      { type: "heading", text: "Un outil au service de la performance" },
      {
        type: "paragraph",
        text: "Équipée d'écrans 4K, de logiciels professionnels d'analyse tactique et d'un système de replay instantané, cette salle permettra à nos entraîneurs et joueurs d'analyser en détail les matchs et les séances d'entraînement.",
      },
      {
        type: "list",
        text: "Fonctionnalités principales :",
        items: [
          "Analyse individuelle des gestes techniques",
          "Décryptage tactique des adversaires",
          "Sessions de feedback en petit groupe",
          "Archivage et suivi de la progression",
        ],
      },
      {
        type: "paragraph",
        text: "Cette salle s'inscrit dans notre volonté d'offrir un environnement d'apprentissage de niveau professionnel à tous nos joueurs.",
      },
    ],
  },
  {
    slug: "conseils-nutrition-jeune-footballeur",
    title: "5 conseils nutrition pour le jeune footballeur",
    excerpt:
      "Notre kinésithérapeute partage ses conseils pour une alimentation adaptée à la pratique intensive du football chez les jeunes.",
    image: "/images/news/conseils-nutrition-jeune-footballeur.jpg",
    category: "conseil",
    categoryLabel: "Conseil",
    author: { name: "Dr. Amira Mansour", role: "Kinésithérapeute", initials: "AM" },
    publishedAt: "2026-10-15T11:00:00Z",
    readTime: 6,
    featured: false,
    tags: ["nutrition", "santé", "conseils"],
    content: [
      {
        type: "paragraph",
        text: "L'alimentation est un pilier fondamental de la performance sportive, surtout chez les jeunes en pleine croissance. Voici cinq conseils essentiels pour nos joueurs.",
      },
      { type: "heading", text: "1. L'hydratation avant tout" },
      {
        type: "paragraph",
        text: "Un jeune footballeur doit boire au minimum 1,5 litre d'eau par jour, et jusqu'à 2,5 litres les jours d'entraînement. L'eau reste la meilleure boisson, loin devant les sodas.",
      },
      { type: "heading", text: "2. Le petit-déjeuner, non négociable" },
      {
        type: "paragraph",
        text: "Un petit-déjeuner équilibré (féculents, protéines, fruits) est essentiel pour tenir la matinée scolaire et être performant à l'entraînement du soir.",
      },
      { type: "heading", text: "3. Le repas d'avant-match" },
      {
        type: "paragraph",
        text: "3 heures avant le match, privilégiez un repas riche en glucides complexes (pâtes, riz) et modéré en protéines. Évitez les graisses et les fibres qui ralentissent la digestion.",
      },
      { type: "heading", text: "4. La récupération après l'effort" },
      {
        type: "paragraph",
        text: "Dans les 30 minutes après l'effort, une collation associant glucides et protéines (banane + yaourt, ou barre de récupération) optimise la reconstruction musculaire.",
      },
      { type: "heading", text: "5. Le sommeil, le meilleur carburant" },
      {
        type: "paragraph",
        text: "Un adolescent sportif a besoin de 9 à 10 heures de sommeil par nuit. Le sommeil est le moment où le corps récupère et où la mémoire musculaire se consolide.",
      },
    ],
  },
  {
    slug: "resultats-u12-championnat-regional",
    title: "Championnat régional U12 : un début de saison prometteur",
    excerpt:
      "Nos U12 ont entamé leur championnat régional avec deux victoires et un match nul, montrant de belles promesses pour la suite.",
    image: "/images/news/resultats-u12-championnat-regional.jpg",
    category: "match",
    categoryLabel: "Compétition",
    author: { name: "Mehdi Gharbi", role: "Entraîneur U11-U13", initials: "MG" },
    publishedAt: "2026-10-08T16:00:00Z",
    readTime: 3,
    featured: false,
    tags: ["U12", "championnat", "résultats"],
    content: [
      {
        type: "paragraph",
        text: "Après trois journées de championnat régional, notre équipe U12 occupe la deuxième place du classement avec 7 points, derrière l'US Tataouine mais devant nos rivaux directs.",
      },
      { type: "heading", text: "Les résultats" },
      {
        type: "list",
        text: "Bilan des trois premières journées :",
        items: [
          "J1 : ARV 4 - 1 AS Chenini (victoire)",
          "J2 : ES Ghomrassen 2 - 2 ARV (match nul)",
          "J3 : ARV 3 - 0 JS Tataouine (victoire)",
        ],
      },
      {
        type: "paragraph",
        text: "Les joueurs montrent une belle progression dans la circulation du ballon et dans leur capacité à construire le jeu depuis la défense. Le travail paie.",
      },
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getRelatedArticles(slug: string, limit = 3): Article[] {
  const current = getArticleBySlug(slug);
  if (!current) return [];
  return articles
    .filter(
      (a) =>
        a.slug !== slug &&
        (a.category === current.category ||
          a.tags.some((t) => current.tags.includes(t))),
    )
    .slice(0, limit);
}

export function getArticlesByCategory(category: string): Article[] {
  return articles.filter((a) => a.category === category);
}

export function getFeaturedArticle(): Article | undefined {
  return articles.find((a) => a.featured);
}
export function getArticlesByTeam(team: string): Article[] {
  if (team === "all") return articles;
  return articles.filter((a) => a.team === team);
} , 13 FICHIERS AVEC DONNÉES INLINE ===

▶ src\app\[locale]\(marketing)\actualites\page.tsx
    [SLUG-LOGIC] Comparaison avec "valladolid"
           → 1 occurrence(s) — should use getTeamFromPath()
    [SLUG-LOGIC] Comparaison avec "ennour"
           → 1 occurrence(s) — should use getTeamFromPath()
    [SLUG-LOGIC] Comparaison avec "avenir"
           → 1 occurrence(s) — should use getTeamFromPath()

▶ src\app\[locale]\(marketing)\avenir\page.tsx
    [HEX] #0F2A47 (avenir)
           → <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0F2A47]">
    [HEX] #0F2A47 (avenir)
           → <Icon className="mx-auto h-6 w-6 text-[#0F2A47]" />
    [HEX] #0F2A47 (avenir)
           → <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0F2A47]">
    [HEX] #0F2A47 (avenir)
           → <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F2A47]/10">
    [HEX] #0F2A47 (avenir)
           → <Icon className="h-6 w-6 text-[#0F2A47]" />
    [HEX] #0F2A47 (avenir)
           → <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0F2A47]">
    [HEX] #0F2A47 (avenir)
    [HEX] #0F2A47 (avenir)
    [HEX] #0F2A47 (avenir)
    [HEX] #1E3B66 (avenir)
    [HEX] #1E3B66 (avenir)
    [GRADIENT] Tailwind hardcodé (team colors)
           → 2 occurrence(s) — ex: from-[#0F2A47], from-[#0F2A47]
    [GRADIENT] Tailwind hardcodé (team colors)
           → 2 occurrence(s) — ex: via-[#1E3B66], via-[#1E3B66]
    [GRADIENT] Tailwind hardcodé (team colors)
           → 1 occurrence(s) — ex: to-[#0F2A47]
    [GRADIENT] Tailwind hardcodé (team colors)
           → 1 occurrence(s) — ex: bg-[#0F2A47]
    [GRADIENT] Tailwind hardcodé (team colors)
           → 6 occurrence(s) — ex: text-[#0F2A47], text-[#0F2A47]

▶ src\app\[locale]\(marketing)\boutique\page.tsx
    [SLUG-LOGIC] Comparaison avec "valladolid"
           → 1 occurrence(s) — should use getTeamFromPath()
    [SLUG-LOGIC] Comparaison avec "ennour"
           → 1 occurrence(s) — should use getTeamFromPath()
    [SLUG-LOGIC] Comparaison avec "avenir"
           → 1 occurrence(s) — should use getTeamFromPath()

▶ src\app\[locale]\(marketing)\contact\page.tsx
    [SLUG-LOGIC] Comparaison avec "group"
           → 1 occurrence(s) — should use getTeamFromPath()

▶ src\app\[locale]\(marketing)\ennour\page.tsx
    [HEX] #7A1F2B (ennour)
           → <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#7A1F2B]">
    [HEX] #7A1F2B (ennour)
           → <Icon className="mx-auto h-6 w-6 text-[#7A1F2B]" />
    [HEX] #7A1F2B (ennour)
           → <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#7A1F2B]">
    [HEX] #7A1F2B (ennour)
           → <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#7A1F2B]/10">
    [HEX] #7A1F2B (ennour)
           → <Icon className="h-6 w-6 text-[#7A1F2B]" />
    [HEX] #7A1F2B (ennour)
           → <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#7A1F2B]">
    [HEX] #7A1F2B (ennour)
    [HEX] #7A1F2B (ennour)
    [HEX] #7A1F2B (ennour)
    [HEX] #5C1620 (ennour)
    [GRADIENT] Tailwind hardcodé (team colors)
           → 2 occurrence(s) — ex: from-[#7A1F2B], from-[#7A1F2B]
    [GRADIENT] Tailwind hardcodé (team colors)
           → 1 occurrence(s) — ex: via-[#5C1620]
    [GRADIENT] Tailwind hardcodé (team colors)
           → 1 occurrence(s) — ex: bg-[#7A1F2B]
    [GRADIENT] Tailwind hardcodé (team colors)
           → 6 occurrence(s) — ex: text-[#7A1F2B], text-[#7A1F2B]

▶ src\app\[locale]\(marketing)\tv\page.tsx
    [SLUG-LOGIC] Comparaison avec "valladolid"
           → 1 occurrence(s) — should use getTeamFromPath()
    [SLUG-LOGIC] Comparaison avec "ennour"
           → 1 occurrence(s) — should use getTeamFromPath()
    [SLUG-LOGIC] Comparaison avec "avenir"
           → 1 occurrence(s) — should use getTeamFromPath()

▶ src\app\[locale]\(marketing)\page.tsx
    [HEX] #0B3E5C (group)
           → <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#0B3E5C]">
    [GRADIENT] Tailwind hardcodé (team colors)
           → 1 occurrence(s) — ex: text-[#0B3E5C]

▶ src\components\global\inscription-popup.tsx
    [SLUG-LOGIC] Comparaison avec "group"
           → 2 occurrence(s) — should use getTeamFromPath()

▶ src\components\interactive\wallpaper-generator.tsx
    [HEX] #5E2D91 (valladolid)
           → grad.addColorStop(0, "#5E2D91");
▶ src\components\layout\navbar.tsx
           → 3 occurrence(s) — should use getTeamFromPath()
▶ src\data\brand.ts
    [HEX] #5E2D91 (valladolid)
           → primary: "#5E2D91",

▶ src\data\hero.ts
    [HEX] #5E2D91 (valladolid)
           → "linear-gradient(135deg, #5E2D91 0%, #E7001C 100%)",
    [HEX] #5E2D91 (valladolid)
           → "linear-gradient(135deg, #E7001C 0%, #5E2D91 100%)",
    [HEX] #5E2D91 (valladolid)
           → "linear-gradient(135deg, #5E2D91 0%, #EDBB4A 100%)",
    [HEX] #5E2D91 (valladolid)
           → "linear-gradient(135deg, #1A1F3A 0%, #5E2D91 100%)",

▶ src\data\news.ts
    [NAME] "Real Valladolid" as string
           → 1 occurrence(s)

=== RÉSUMÉ ===
  Fichiers  : 13
  Problèmes : 55

=== QUICK FIX GUIDE ===
  HEX/GRADIENT  → use TEAMS[team].hex / .bgClass / .heroGradient
  NAME          → iterate ENTITY_LIST or use TEAMS[team].name
  SLUG-LOGIC    → use getTeamFromPath(pathname)
  HELPER        → use TEAMS[team].carousel / .nav / .footerColumns
  ARRAY         → use TEAM_IDS or ENTITY_IDS
PS C:\Users\user\desktop\academie-real-valladolid-tataouine>
,
review deep and by the way also fix at same time the data of teams should be from data folder not inline never 
)