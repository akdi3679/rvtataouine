import type { CSSProperties } from "react";

export type TeamId = "group" | "valladolid" | "ennour" | "avenir";

// ─── Icons ───
export type IconName =
  | "users" | "zap" | "trophy" | "target" | "shield"
  | "flame" | "heart" | "sparkles" | "file-check" | "star"
  | "map-pin" | "dumbbell" | "video";

// ─── Social ───
export type SocialIconName =
  | "facebook" | "instagram" | "youtube" | "twitter"
  | "tiktok" | "linkedin" | "pinterest";

export interface SocialLink {
  name: string;
  href: string;
  icon: SocialIconName;
}

// ─── Team contact ───
export interface TeamContact {
  email: string;
  phone: string;   // also used for WhatsApp link
  address: { street: string; city: string; country: string };
}

// ─── Data interfaces ───
export interface TeamStat { icon: IconName; value: string; label: string; }
export interface TeamValue { number?: string; icon?: IconName; title: string; description: string; }
export interface TeamGalleryItem { id: string; label: string; span: string; }
export interface TeamMission { kicker: string; title: string; titleLine2?: string;  paragraphs: string[];
  cards?: { title: string; description: string }[]; }
export interface TeamVision { kicker: string; titleLine1: string; titleLine2: string; paragraph: string; }
export interface TeamCTA { title: string; paragraph: string; buttonLabel: string; }
export interface TeamPromise {
  badge: string;          // e.g. "Notre promesse"
  ctaLabel: string;
  ctaHref: string;        // without locale — component prepends
}

export interface TeamStory {
  kicker: string;
  titleLine1: string;
  titleLine2: string;
  paragraph: string;
  pillars: { icon: IconName; label: string; value: string }[];
  ctaLabel: string;
  ctaHref: string;
  yearFrom: string;
  yearTo: string;
  yearParagraph: string;
  stat1: { value: string; label: string };
  stat2: { value: string; label: string };
}
export interface ClubFeature { icon: IconName; title: string; description: string; features: string[]; }
export interface ClubStat { value: string; label: string; }
export interface ClubContent {
  heroKicker: string; heroTitle1: string; heroTitle2: string;
  heroParagraph: string; heroImage: string;
  historyKicker: string; historyYearFrom: string; historyYearTo: string;
  historyparagraphs: string[];
  cards?: { title: string; description: string }[];
  philosophyKicker: string; philosophyTitle: string; philosophy: TeamValue[];
  stadeKicker: string; stadeTitle1: string; stadeTitle2: string;
  stadeParagraph: string; stadeStats: ClubStat[];
  installationsKicker: string; installationsTitle: string; installations: ClubFeature[];
}
export interface FinalCtaContent {
  title: string;
  subtitle: string;
  ctaLabel: string;
  secondaryLabel: string;
  secondaryHref: string;
  // Optional: override the section background (default: bg-white)
  sectionBgClass?: string;
  titleShiftClass?: string;
  ctaButtonClass?: string;
}
export interface TeamContent {
  subtitle?: string;
  shortDescription: string;
  mission?: TeamMission;
  vision?: TeamVision;
  valuesKicker?: string;
  valuesTitle?: string;
  values?: TeamValue[];
  galleryKicker?: string;
  galleryTitle?: string;
  gallerySubtitle?: string;
  galleryIcon?: IconName;
  promise?: TeamPromise;
  story?: TeamStory;
  gallery?: TeamGalleryItem[];
  stats?: TeamStat[];
  cta?: TeamCTA;
  entitiesKicker?: string;
  entitiesTitle?: string;
  alumniStats?: TeamStat[];
  club?: ClubContent;
  missionImage?: string;
  history?: { milestones: { year: string; title: string; description?: string }[] };
 process?: { steps: { title: string; description: string }[] };
  finalCta?: FinalCtaContent;
}

export interface NavLink { label: string; href: string; }
export interface NavDropdown { label: string; links: NavLink[]; }
export interface MobileNavGroup { title: string; links: NavLink[]; }
export interface FooterColumn { title: string; links: NavLink[]; }

export interface TeamVars {
  primary: string; primaryDark: string; primaryLight: string;
  accent: string; accentDark: string; accentLight: string;
}

export interface TeamConfig {
  id: TeamId;
  name: string;
  shortName: string;
  initials: string;

  hex: string;
  hexDark: string;
  hexLight: string;
  bgClass: string;
  textClass: string;
  bgSoftClass: string;
  borderClass: string;

  heroGradient: string;
  heroOverlayR?: string;

  logoPath: string;

  carousel: { button: string; progress: string };
  vars: TeamVars;
  promiseButton?: string;

  nav: {
    dropdowns?: NavDropdown[];
    primaryLinks: NavLink[];
    mobileGroups: MobileNavGroup[];
  };

  footerColumns: FooterColumn[];

  // Per-team contact + socials (no fallback — each team owns its own)
  contact: TeamContact;
  socials: SocialLink[];

  formTagline: string;
  formIcon: "shield" | "heart" | "zap" | "star";
  hasLogin?: boolean;
selectionBg: string;
 selectionText: string;
 newsletterAccent?: {
    bg: string;           // hex — polygon shape
    text: string;         // hex — polygon text
    buttonClass: string;  // full tailwind classes for the CTA button
 };
  content: TeamContent;
}

// ─── Teams ───
export const TEAMS: Record<TeamId, TeamConfig> = {
  // ════════════════════════════════════════════════════════════
  // GROUP
  // ════════════════════════════════════════════════════════════
  group: {
    id: "group",
    name: "Groupe ARV",
    shortName: "Groupe",
    initials: "ARV",
    hex: "#00cd23",
    hexDark: "#00cd23",
    hexLight: "#00cd23",
    bgClass: "bg-[#00cd23]",
    textClass: "text-[#00cd23]",
    bgSoftClass: "bg-[#00cd23]/10",
    borderClass: "border-[#00cd23]",
    heroGradient: "from-[#00cd23] via-[#00cd23] to-[#00cd23]",
    heroOverlayR: "from-[#00cd23]/70 via-transparent to-[#00cd23]/60",
    logoPath: "/images/logo/logo.png",
    carousel: {
      button: "bg-white text-[#00cd23] hover:bg-white/90",
      progress: "bg-[#F0C419]",
    },
    promiseButton: "bg-[#00cd23] text-white hover:bg-[#00cd23]/90",
    vars: {
      primary: "130 100% 40%", primaryDark: "130 100% 40%", primaryLight: "130 100% 40%",
      accent: "130 100% 40%", accentDark: "130 100% 40%", accentLight: "130 100% 40%",
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
        { label: "À propos", href: "/#mission" },
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
            { label: "À propos", href: "/#mission" },
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
        title: "Actualités",
        links: [
          { label: "TV", href: "/tv" },
          { label: "Actualités", href: "/actualites" },
        ],
      },
      {
        title: "Boutique",
        links: [
          { label: "Boutique", href: "/boutique" },
          { label: "Wallpaper", href: "/boutique#wallpaper" },
        ],
      },
      {
        title: "Contact",
        links: [
          { label: "Contact", href: "/contact" },
          { label: "Inscription", href: "/inscription" },
        ],
      },
    ],
    contact: {
      email: "contact@arv-tataouine.tn",
      phone: "+216 75 854 717",
      address: { street: "Siège du Groupe", city: "Tataouine", country: "Tunisia" },
    },
    socials: [
       { name: "Facebook",  href: "https://facebook.com/arvtataouine",          icon: "facebook"  },
       { name: "Instagram", href: "https://instagram.com/arvtataouine",         icon: "instagram" },
       { name: "YouTube",   href: "https://youtube.com/@arvtataouine",          icon: "youtube"   },
       { name: "Twitter",   href: "https://twitter.com/arvtataouine",           icon: "twitter"   },
       { name: "TikTok",    href: "https://tiktok.com/@arvtataouine",           icon: "tiktok"    },
       { name: "LinkedIn",  href: "https://linkedin.com/company/arvtataouine",  icon: "linkedin"  },
       { name: "Pinterest", href: "https://pinterest.com/arvtataouine",         icon: "pinterest" },
    ],
    formTagline: "Toutes les équipes du groupe",
    formIcon: "shield",
        selectionBg: "#00cd23",    // orange — matches group CTA
    selectionText: "#FFFFFF",  // navy — matches group CTA text
    content: {
      shortDescription:
        "Un projet éducatif, social et sportif qui accompagne les jeunes de Tataouine dans leur développement personnel et sportif.",
      vision: {
        kicker: "Notre vision",
        titleLine1: "Former des champions,",
        titleLine2: "sur et en dehors du terrain.",
        paragraph:
          "Le Groupe Sportif ARV Tataouine n'est pas qu'un club de football. C'est un projet éducatif, social et sportif qui accompagne les jeunes de Tataouine dans leur développement personnel et sportif.",
      },
      
      entitiesKicker: "Nos entités",
      entitiesTitle: "Trois équipes, une famille",
            values: [
        { icon: "trophy", title: "Excellence", description: "Recherche constante du haut niveau technique et tactique." },
        { icon: "heart",  title: "Famille",    description: "Un esprit collectif qui unit joueurs, staff et familles." },
        { icon: "flame",  title: "Passion",    description: "L'amour du football, le respect de l'adversaire, la joie de jouer." },
        { icon: "shield", title: "Discipline", description: "Sérieux, ponctualité et respect sur et en dehors du terrain." },
      ],
      promise: {
        badge: "Notre promesse",
        ctaLabel: "Découvrir nos équipes",
        ctaHref: "/#entities",
      },
      story: {
        kicker: "Notre histoire",
        titleLine1: "Plus qu'un groupe,",
        titleLine2: "une famille",
        paragraph:
          "Fondé en 2016, le Groupe Sportif ARV Tataouine réunit trois équipes autour d'une même vision : offrir aux jeunes du sud tunisien un cadre d'excellence pour grandir, sur et en dehors du terrain.",
        pillars: [
          { icon: "trophy", label: "Trois équipes",   value: "Valladolid · Ennour · Avenir" },
          { icon: "target", label: "Méthodologie",    value: "Partenariat Real Valladolid" },
          { icon: "heart",  label: "Valeurs",         value: "Excellence et respect" },
        ],
        ctaLabel: "Découvrir nos équipes",
        ctaHref: "/#entities",
        yearFrom: "2016",
        yearTo: "2026",
        yearParagraph:
          "Dix ans d'engagement au service de la jeunesse de Tataouine.",
        stat1: { value: "150+", label: "Joueurs formés" },
        stat2: { value: "23",   label: "Devenus pros" },
      },
            history: {
        milestones: [
          { year: "2016", title: "Fondation", description: "Naissance du groupe à Tataouine" },
          { year: "2020", title: "Partenariat RV", description: "Méthodologie espagnole officielle" },
          { year: "2024", title: "Nouveau campus", description: "Installations modernes" },
          { year: "2026", title: "Aujourd'hui", description: "150+ jeunes formés" },
        ],
      },
      process: {
        steps: [
          { title: "Séance d'essai", description: "Une séance gratuite pour découvrir l'académie" },
          { title: "Évaluation", description: "Nos coachs déterminent la catégorie adaptée" },
          { title: "Inscription", description: "Formalités et début de l'aventure" },
        ],
      },
            finalCta: {
        title: "Prêt à rejoindre l'aventure ?",
        subtitle: "Inscrivez votre enfant dès aujourd'hui",
        ctaLabel: "Inscription",
        secondaryLabel: "Essai gratuit",
        secondaryHref: "/contact",
      },
            mission: {
        kicker: "Notre vision",
        title: "Former des champions,",
        titleLine2: "sur et en dehors du terrain.",
        paragraphs: [
          "Le Groupe Sportif ARV Tataouine n'est pas qu'un club de football. C'est un projet éducatif, social et sportif qui accompagne les jeunes de Tataouine dans leur développement personnel et sportif.",
          "Trois équipes, un seul esprit : offrir à chaque jeune du sud tunisien un cadre d'excellence pour grandir, sur et en dehors du terrain.",
        ],
      },
      missionImage: "/images/academy/club.jpg",

    },
  },

  // ════════════════════════════════════════════════════════════
  // VALLADOLID
  // ════════════════════════════════════════════════════════════
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
    vars: {
      primary: "271 55% 37%", primaryDark: "271 55% 25%", primaryLight: "271 55% 50%",
      accent: "355 100% 45%", accentDark: "355 100% 35%", accentLight: "355 100% 55%",
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
        { label: "Contact", href: "/contact?team=valladolid" },
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
          { label: "Alumni", href: "/valladolid/alumni" },
        ],
      },
      {
        title: "Actualités",
        links: [
          { label: "Matchs", href: "/valladolid/matchs" },
          { label: "TV", href: "/tv?team=valladolid" },
          { label: "Actualités", href: "/actualites?team=valladolid" },
        ],
      },
      {
        title: "Boutique",
        links: [
          { label: "Boutique", href: "/boutique?team=valladolid" },
          { label: "Wallpaper", href: "/boutique?team=valladolid#wallpaper" },
        ],
      },
      {
        title: "Contact",
        links: [
          { label: "Contact", href: "/contact" },
         { label: "Inscription", href: "/inscription?team=valladolid" },
        ],
      },
    ],
    contact: {
      email: "valladolid@arv-tataouine.tn",
      phone: "+216 75 854 717",
      address: { street: "Campus Principal", city: "Tataouine", country: "Tunisia" },
    },
     socials: [
       { name: "Facebook",  href: "https://facebook.com/arvtataouine",          icon: "facebook"  },
       { name: "Instagram", href: "https://instagram.com/arvtataouine",         icon: "instagram" },
       { name: "YouTube",   href: "https://youtube.com/@arvtataouine",          icon: "youtube"   },
       { name: "Twitter",   href: "https://twitter.com/arvtataouine",           icon: "twitter"   },
       { name: "TikTok",    href: "https://tiktok.com/@arvtataouine",           icon: "tiktok"    },
       { name: "LinkedIn",  href: "https://linkedin.com/company/arvtataouine",  icon: "linkedin"  },
       { name: "Pinterest", href: "https://pinterest.com/arvtataouine",         icon: "pinterest" },
     ],
    formTagline: "Football masculin · académie historique",
    formIcon: "shield",
    hasLogin: true,
       
    selectionBg: "#E7001C",    // red — matches Valladolid CTA
    selectionText: "#FFFFFF",  // white — matches Valladolid CTA text
  
    content: {
      subtitle: "Football masculin",
      shortDescription:
        "L'académie historique. Méthodologie espagnole, encadrement professionnel, formation des champions de demain.",
      stats: [
        { icon: "users",  value: "150+", label: "Joueurs" },
        { icon: "trophy", value: "4",    label: "Catégories" },
        { icon: "star",   value: "10",   label: "Ans" },
      ],
      club: {
        heroKicker: "Notre club",
        heroTitle1: "Une académie,",
        heroTitle2: "une famille",
        heroParagraph:
          "Fondée en 2016, l'Académie Real Valladolid Tataouine forme les jeunes talents du sud tunisien avec une méthodologie espagnole et un encadrement professionnel.",
        heroImage: "/images/academy/club.jpg",
        historyKicker: "Notre histoire",
        historyYearFrom: "2016",
        historyYearTo: "2026",
        historyparagraphs: [
          "Une passion née à Tataouine. Fondée en 2016 par des passionnés de football, l'académie est née d'une vision : apporter l'excellence du football européen au sud de la Tunisie.",
          "Grâce à notre partenariat officiel avec le Real Valladolid CF, nous intégrons une méthodologie structurée tout en valorisant le talent local. Aujourd'hui, nous accompagnons des jeunes joueurs dans leur progression sportive, éducative et humaine.",
        ],
        philosophyKicker: "Notre philosophie",
        philosophyTitle: "Les 4 piliers de la formation",
        philosophy: [
          { number: "01", icon: "target", title: "Excellence technique",  description: "Maîtrise du ballon, précision des gestes et intelligence de jeu." },
          { number: "02", icon: "users",  title: "Esprit d'équipe",       description: "Le collectif prime sur l'individuel. Apprendre à jouer ensemble." },
          { number: "03", icon: "heart",  title: "Passion et respect",    description: "Respect des entraîneurs, des arbitres, des adversaires et du jeu." },
          { number: "04", icon: "shield", title: "Discipline",            description: "Ponctualité, effort constant et sérieux sur le terrain comme à l'école." },
        ],
        stadeKicker: "Notre stade",
        stadeTitle1: "Un lieu pour apprendre,",
        stadeTitle2: "progresser et gagner",
        stadeParagraph:
          "Notre stade est le cœur de l'académie. C'est là que les joueurs développent leur technique, leur discipline et leur esprit d'équipe dans un cadre sécurisé et professionnel.",
        stadeStats: [
          { value: "150+", label: "Jeunes accueillis" },
          { value: "4",    label: "Catégories" },
          { value: "6j/7", label: "Activité" },
        ],
        installationsKicker: "Nos installations",
        installationsTitle: "Des équipements pour progresser",
        installations: [
          { icon: "map-pin",  title: "Terrain principal",     description: "Surface synthétique moderne pour entraînements et matchs.",        features: ["Surface stable", "Éclairage adapté"] },
          { icon: "dumbbell", title: "Préparation physique",  description: "Espace dédié au renforcement, à la mobilité et à la récupération.", features: ["Travail physique", "Prévention blessures"] },
          { icon: "video",    title: "Analyse vidéo",         description: "Outils vidéo pour comprendre le jeu et corriger les détails.",      features: ["Feedback individuel", "Analyse collective"] },
        ],
      },
      alumniStats: [
        { icon: "users",  value: "150+", label: "Joueurs formés" },
        { icon: "trophy", value: "23",   label: "Devenus pros" },
        { icon: "star",   value: "5",    label: "Bourses NCAA" },
        { icon: "zap",    value: "30+",  label: "Stages en Espagne" },
      ],
            values: [
        { icon: "target",  title: "Méthode espagnole", description: "Philosophie Real Valladolid" },
        { icon: "users",   title: "Encadrement pro",   description: "Entraîneurs diplômés UEFA" },
        { icon: "map-pin", title: "Infrastructures",   description: "Terrains, salle, analyse vidéo" },
        { icon: "trophy",  title: "Opportunités",      description: "Détection, stages en Espagne" },
      ],
      promise: {
        badge: "Notre promesse",
        ctaLabel: "Inscrire mon enfant",
        ctaHref: "/inscription?team=valladolid",
      },
      story: {
        kicker: "Notre histoire",
        titleLine1: "Plus qu'un club,",
        titleLine2: "une famille",
        paragraph:
          "Fondée en 2016, notre académie est née d'une vision : apporter l'excellence du football européen au sud de la Tunisie. Grâce à notre partenariat avec le Real Valladolid CF, nous formons les champions de demain avec une méthodologie éprouvée.",
        pillars: [
          { icon: "target",  label: "Philosophie",   value: "4 piliers de formation" },
          { icon: "map-pin", label: "Installations", value: "Qualité professionnelle" },
          { icon: "heart",   label: "Valeurs",       value: "Respect et excellence" },
        ],
        ctaLabel: "Découvrir notre club",
        ctaHref: "/valladolid/club",
        yearFrom: "2016",
        yearTo: "2026",
        yearParagraph:
          "Dix ans d'excellence et de formation au service des jeunes talents du sud tunisien.",
        stat1: { value: "150+", label: "Joueurs formés" },
        stat2: { value: "23",   label: "Devenus pros" },
      },
            finalCta: {
        title: "Rejoignez Real Valladolid",
        subtitle: "Formez votre enfant à l'excellence espagnole",
        ctaLabel: "Inscrire mon enfant",
        secondaryLabel: "Visiter le club",
        secondaryHref: "/valladolid/club",
      },
    },
  },

  // ════════════════════════════════════════════════════════════
  // ENNOUR
  // ════════════════════════════════════════════════════════════
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
      button: "bg-white text-[#7A1F2B] hover:bg-white/90",
      progress: "bg-[#F0C419]",
    },
    newsletterAccent: {
      bg: "#7A1F2B",
      text: "#FFFFFF",
      buttonClass: "bg-[#7A1F2B] text-white hover:bg-[#5C1620]",
    },
    vars: {
      primary: "352 59% 30%", primaryDark: "352 59% 20%", primaryLight: "352 59% 45%",
      accent: "353 58% 40%", accentDark: "352 59% 30%", accentLight: "353 58% 51%",
    },
    promiseButton: "bg-[#7A1F2B] text-white hover:bg-[#5C1620]",
    nav: {
      primaryLinks: [
        { label: "À propos", href: "/ennour#mission" },
        { label: "TV", href: "/tv?team=ennour" },
        { label: "Actualités", href: "/actualites?team=ennour" },
        { label: "Boutique", href: "/boutique?team=ennour" },
        { label: "Contact", href: "/contact?team=ennour" },
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
        title: "Club",
        links: [
          { label: "À propos", href: "/ennour#mission" },
          { label: "Galerie", href: "/ennour#gallery" },
        ],
      },
      {
        title: "Actualités",
        links: [
          { label: "TV", href: "/tv?team=ennour" },
          { label: "Actualités", href: "/actualites?team=ennour" },
        ],
      },
      {
        title: "Boutique",
        links: [
          { label: "Boutique", href: "/boutique?team=ennour" },
          { label: "Wallpaper", href: "/boutique?team=ennour#wallpaper" },
        ],
      },
      {
        title: "Contact",
        links: [
          { label: "Contact", href: "/contact" },
         { label: "Inscription", href: "/inscription?team=ennour" },
        ],
      },
    ],
    contact: {
      email: "ennour@arv-tataouine.tn",
      phone: "+216 75 854 717",
      address: { street: "Tataouine", city: "Tataouine", country: "Tunisia" },
    },
   socials: [
       { name: "Facebook",  href: "https://facebook.com/arvtataouine",          icon: "facebook"  },
       { name: "Instagram", href: "https://instagram.com/arvtataouine",         icon: "instagram" },
       { name: "YouTube",   href: "https://youtube.com/@arvtataouine",          icon: "youtube"   },
       { name: "Twitter",   href: "https://twitter.com/arvtataouine",           icon: "twitter"   },
       { name: "TikTok",    href: "https://tiktok.com/@arvtataouine",           icon: "tiktok"    },
       { name: "LinkedIn",  href: "https://linkedin.com/company/arvtataouine",  icon: "linkedin"  },
       { name: "Pinterest", href: "https://pinterest.com/arvtataouine",         icon: "pinterest" },
     ],
    formTagline: "Football féminin",
    formIcon: "heart",
        selectionBg: "#FFFFFF",    // white — matches Ennour CTA
    selectionText: "#7A1F2B",  // burgundy — matches Ennour CTA text
    content: {
      subtitle: "Football féminin",
      shortDescription:
        "La section féminine dédiée à la formation et à l'épanouissement des jeunes filles dans le football.",
      mission: {
        kicker: "Notre mission",
        title: "Faire grandir le football féminin",
        paragraphs: [
          "Ennour Sportif Tataouine est la section féminine du groupe. Fondée pour offrir aux jeunes filles de la région un cadre structuré pour pratiquer le football, elle incarne notre engagement pour l'égalité des chances dans le sport.",
          "Nos joueuses bénéficient du même encadrement professionnel, des mêmes installations et de la même exigence que les équipes masculines. Un projet ambitieux, porté par des entraîneuses passionnées et des familles engagées.",
        ],
      cards: [
        { title: "Formation", description: "Entraînements adaptés et encadrement de qualité" },
        { title: "Accompagnement", description: "Suivi scolaire et développement personnel" },
        { title: "Compétition", description: "Participation aux tournois et championnats" },
        { title: "Communauté", description: "Esprit d'équipe et valeurs partagées" }
      ],
      cards: [
        { title: "Formation", description: "Entraînements adaptés au football féminin" },
        { title: "Accompagnement", description: "Suivi scolaire et développement personnel" },
        { title: "Compétition", description: "Participation aux tournois régionaux" },
        { title: "Communauté", description: "Esprit d'équipe et valeurs partagées" },
      ],
      },
       missionImage: "/images/academy/kids-trophy.jpg",
      galleryKicker: "En images",
      galleryTitle: "Galerie",
      gallerySubtitle: "Les moments forts de la saison, en images",
      galleryIcon: "heart",
      gallery: [
        { id: "g1", label: "Entraînement collectif", span: "col-span-2 row-span-2" },
        { id: "g2", label: "Match officiel",          span: "col-span-2" },
        { id: "g3", label: "Échauffement",            span: "" },
        { id: "g4", label: "Célébration",             span: "" },
        { id: "g5", label: "Esprit d'équipe",         span: "col-span-2" },
        { id: "g6", label: "Coulisses",               span: "col-span-2" },
      ],
      stats: [
        { icon: "users",  value: "40+", label: "Joueuses" },
        { icon: "trophy", value: "3",   label: "Catégories" },
        { icon: "heart",  value: "1",   label: "Équipe" },
      ],
      cta: {
        title: "Rejoignez Ennour Sportif",
        paragraph:
          "Vous êtes une jeune joueuse ou un parent ? Contactez-nous pour découvrir nos programmes et venir essayer.",
        buttonLabel: "Inscrire ma fille",
      },
            promise: {
        badge: "Notre promesse",
        ctaLabel: "Inscrire ma fille",
        ctaHref: "/inscription?team=ennour",
      },
      story: {
        kicker: "Notre histoire",
        titleLine1: "Plus qu'une équipe,",
        titleLine2: "une famille",
        paragraph:
          "Fondée en 2019, Ennour Sportif est née de la volonté d'offrir aux jeunes filles de Tataouine un cadre structuré pour pratiquer leur passion. Un projet porté par des entraîneuses engagées et des familles qui croient au football féminin.",
        pillars: [
          { icon: "sparkles", label: "Excellence",    value: "Même niveau que les équipes masculines" },
          { icon: "heart",    label: "Bienveillance", value: "Un cadre qui fait grandir" },
          { icon: "users",    label: "Sororité",      value: "Une famille soudée" },
        ],
        ctaLabel: "Découvrir Ennour",
        ctaHref: "/ennour#mission",
        yearFrom: "2019",
        yearTo: "2026",
        yearParagraph:
          "Sept ans d'engagement pour le football féminin dans le sud tunisien.",
        stat1: { value: "40+", label: "Joueuses formées" },
        stat2: { value: "1",   label: "Devenue pro" },
      },
            history: {
        milestones: [
          { year: "2019", title: "Création", description: "Première équipe féminine" },
          { year: "2022", title: "Finale régionale", description: "Nos U15 atteignent la finale" },
          { year: "2025", title: "Première pro", description: "Une joueuse signe en Ligue 1" },
          { year: "2026", title: "Aujourd'hui", description: "40+ joueuses formées" },
        ],
      },
      process: {
        steps: [
          { title: "Séance d'essai", description: "Encadrée par nos entraîneuses" },
          { title: "Évaluation", description: "Positionnement dans la catégorie adaptée" },
          { title: "Inscription", description: "Rejoindre la famille Ennour" },
        ],
      },
                 finalCta: {
        title: "Rejoignez Ennour Sportif",
        subtitle: "Vous êtes une jeune joueuse ou un parent ?",
        ctaLabel: "Inscrire ma fille",
        secondaryLabel: "Nous contacter",
        secondaryHref: "/contact",
      },
    },
  },

  // ════════════════════════════════════════════════════════════
  // AVENIR
  // ════════════════════════════════════════════════════════════
  avenir: {
    id: "avenir",
    name: "Avenir Sportif",
    shortName: "Avenir",
    initials: "AV",
    hex: "#1E3A8A",
    hexDark: "#081A2E",
    hexLight: "#1E3B66",
    bgClass: "bg-[#00cd23]",
    textClass: "text-[#00cd23]",
    bgSoftClass: "bg-[#00cd23]/10",
    borderClass: "border-[#00cd23]",
    heroGradient: "from-[#00cd23] via-[#1E3B66] to-[#00cd23]",
    logoPath: "/images/logo/avenir.png",
    carousel: {
      button: "bg-[#F0C419] text-[#081A2E] hover:bg-[#F0C419]/90",
      progress: "bg-[#F0C419]",
    },
    vars: {
      primary: "211 65% 17%", primaryDark: "211 65% 12%", primaryLight: "211 65% 27%",
      accent: "216 55% 26%", accentDark: "211 65% 17%", accentLight: "216 55% 37%",
    },
    nav: {
      primaryLinks: [
        { label: "À propos", href: "/avenir#mission" },
        { label: "TV", href: "/tv?team=avenir" },
        { label: "Actualités", href: "/actualites?team=avenir" },
        { label: "Boutique", href: "/boutique?team=avenir" },
        { label: "Contact", href: "/contact?team=avenir" },
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
        title: "Club",
        links: [
          { label: "À propos", href: "/avenir#mission" },
          { label: "Galerie", href: "/avenir#gallery" },
        ],
      },
      {
        title: "Actualités",
        links: [
          { label: "TV", href: "/tv?team=avenir" },
          { label: "Actualités", href: "/actualites?team=avenir" },
        ],
      },
      {
        title: "Boutique",
        links: [
          { label: "Boutique", href: "/boutique?team=avenir" },
          { label: "Wallpaper", href: "/boutique?team=avenir#wallpaper" },
        ],
      },
      {
        title: "Contact",
        links: [
          { label: "Contact", href: "/contact" },
          { label: "Inscription", href: "/inscription?team=avenir" },

        ],
      },
    ],
    contact: {
      email: "avenir@arv-tataouine.tn",
      phone: "+216 75 854 717",
      address: { street: "Tataouine", city: "Tataouine", country: "Tunisia" },
    },
    socials: [
       { name: "Facebook",  href: "https://facebook.com/arvtataouine",          icon: "facebook"  },
       { name: "Instagram", href: "https://instagram.com/arvtataouine",         icon: "instagram" },
       { name: "YouTube",   href: "https://youtube.com/@arvtataouine",          icon: "youtube"   },
       { name: "Twitter",   href: "https://twitter.com/arvtataouine",           icon: "twitter"   },
       { name: "TikTok",    href: "https://tiktok.com/@arvtataouine",           icon: "tiktok"    },
       { name: "LinkedIn",  href: "https://linkedin.com/company/arvtataouine",  icon: "linkedin"  },
       { name: "Pinterest", href: "https://pinterest.com/arvtataouine",         icon: "pinterest" },
     ],
    formTagline: "Football & Futsal",
    formIcon: "zap",
        selectionBg: "#F0C419",    // gold — matches Avenir CTA
    selectionText: "#00cd23",  // navy — matches Avenir CTA text
     newsletterAccent: {
      bg: "#38BDF8",                                    // light blue
      text: "#081A2E",                                  // Avenir dark navy
      buttonClass: "bg-[#38BDF8] text-[#081A2E] hover:bg-[#38BDF8]/90",
    },
    content: {
      subtitle: "Football & Futsal",
      shortDescription:
        "Football à 11 et futsal, avec un programme complet pour former des joueurs polyvalents.",
      mission: {
        kicker: "Notre mission",
        title: "Former des joueurs complets",
        paragraphs: [
          "Avenir Sportif Tataouine est la section football à 11 et futsal du groupe. Elle complète l'offre sportive en proposant aux joueurs une formation polyvalente, adaptée aux différentes disciplines du football moderne.",
          "Le futsal apporte une technique individuelle affinée, une lecture de jeu rapide et une intelligence tactique que le football à 11 valorise. Nos joueurs bénéficient du meilleur des deux mondes.",
        ],
      cards: [
        { title: "Football à 11", description: "Formation complète sur grand terrain" },
        { title: "Futsal", description: "Technique et rapidité en salle" },
        { title: "Polyvalence", description: "Joueurs adaptables à tous les postes" },
        { title: "Progression", description: "Parcours structuré de développement" },
      ],
      },
      missionImage: "/images/academy/kids-trophy.jpg",
      galleryKicker: "En images",
      galleryTitle: "Galerie",
      gallerySubtitle: "Les moments forts de la saison, en images",
      galleryIcon: "zap",
      gallery: [
        { id: "g1", label: "Match de football", span: "col-span-2 row-span-2" },
        { id: "g2", label: "Futsal en action",  span: "col-span-2" },
        { id: "g3", label: "Entraînement",      span: "" },
        { id: "g4", label: "Victoire",          span: "" },
        { id: "g5", label: "Esprit collectif",  span: "col-span-2" },
        { id: "g6", label: "Coulisses",         span: "col-span-2" },
      ],
      stats: [
        { icon: "users",  value: "80+", label: "Joueurs" },
        { icon: "zap",    value: "2",   label: "Disciplines" },
        { icon: "trophy", value: "5",   label: "Catégories" },
      ],
      cta: {
        title: "Rejoignez Avenir Sportif",
        paragraph:
          "Football à 11 ou futsal — nos portes sont ouvertes à tous les joueurs motivés, quel que soit leur niveau de départ.",
        buttonLabel: "Inscrire mon enfant",
      },
            promise: {
        badge: "Notre promesse",
        ctaLabel: "Inscrire mon enfant",
        ctaHref: "/inscription?team=avenir",
      },
      story: {
        kicker: "Notre histoire",
        titleLine1: "Plus qu'un sport,",
        titleLine2: "deux disciplines",
        paragraph:
          "Fondé en 2020, Avenir Sportif complète l'offre sportive du groupe en réunissant football à 11 et futsal. Une double formation qui prépare des joueurs complets, adaptables, prêts pour tous les terrains.",
        pillars: [
          { icon: "zap",    label: "Deux disciplines", value: "Football à 11 + Futsal" },
          { icon: "target", label: "Polyvalence",      value: "Formation complète" },
          { icon: "trophy", label: "Compétition",      value: "Championnats régionaux" },
        ],
        ctaLabel: "Découvrir Avenir",
        ctaHref: "/avenir#mission",
        yearFrom: "2020",
        yearTo: "2026",
        yearParagraph:
          "Six ans de formation et deux disciplines structurées au plus haut niveau régional.",
        stat1: { value: "80+", label: "Joueurs formés" },
        stat2: { value: "2",   label: "Disciplines" },
      },
            history: {
        milestones: [
          { year: "2020", title: "Création", description: "Section football & futsal" },
          { year: "2023", title: "Lancement futsal", description: "Nouvelle discipline structurée" },
          { year: "2025", title: "Premier titre", description: "Champion régional futsal U15" },
          { year: "2026", title: "Aujourd'hui", description: "80+ joueurs formés" },
        ],
      },
      process: {
        steps: [
          { title: "Séance d'essai", description: "Football à 11 ou futsal, au choix" },
          { title: "Évaluation", description: "Test technique et placement" },
          { title: "Inscription", description: "Début de la formation" },
        ],
      },
                     finalCta: {
        title: "Rejoignez Avenir Sportif",
        subtitle: "Football à 11 ou futsal — nos portes sont ouvertes",
        ctaLabel: "Inscrire mon enfant",
        secondaryLabel: "Nous contacter",
        secondaryHref: "/contact",
      },
    },
  },
};

// ─── Legacy aliases ───
// ARV-RV-PROMISE-FIX - align Valladolid content shape with the other 3 teams.
// Reuses existing copy, adds no new wording. Delete this block to revert.
const _rv = TEAMS.valladolid;
const _rvClub = _rv.content.club!;
_rv.content.mission = {
  kicker: "Notre mission",
  title: _rvClub.heroTitle1,
  titleLine2: _rvClub.heroTitle2,
  paragraphs: _rvClub.historyparagraphs,
};
_rv.content.missionImage = _rvClub.heroImage;
_rv.content.valuesKicker = _rvClub.philosophyKicker;
_rv.content.valuesTitle = _rvClub.philosophyTitle;
export const TEAM_THEME = TEAMS;
export const TEAM_IDS: TeamId[] = ["group", "valladolid", "ennour", "avenir"];
export const ENTITY_IDS: TeamId[] = ["valladolid", "ennour", "avenir"];
export const ENTITY_LIST = ENTITY_IDS.map((id) => TEAMS[id]);

// ─── Helpers ───
export function getTeamFromPath(pathname: string): TeamId {
  if (pathname.includes("/valladolid")) return "valladolid";
  if (pathname.includes("/ennour")) return "ennour";
  if (pathname.includes("/avenir")) return "avenir";
  return "group";
}

export const getSectionFromPath = getTeamFromPath;

export function getTeamLogoPath(team: TeamId): string {
  return TEAMS[team].logoPath;
}

export function parseTeamQuery(value: string | undefined | null): TeamId | "all" {
  if (!value) return "all";
  return (ENTITY_IDS as readonly string[]).includes(value)
    ? (value as TeamId)
    : "all";
}

export function getTeamVars(team: TeamId): CSSProperties {
  const v = TEAMS[team].vars;
  return {
    "--color-primary": v.primary,
    "--color-primary-dark": v.primaryDark,
    "--color-primary-light": v.primaryLight,
    "--color-accent": v.accent,
    "--color-accent-dark": v.accentDark,
    "--color-accent-light": v.accentLight,
  } as CSSProperties;
}