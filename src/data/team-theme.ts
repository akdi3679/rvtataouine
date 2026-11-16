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
export interface TeamMission { kicker: string; title: string; titleLine2?: string;  paragraphs: string[]; }
export interface TeamVision { kicker: string; titleLine1: string; titleLine2: string; paragraph: string; }
export interface TeamCTA { title: string; paragraph: string; buttonLabel: string; }
export interface ClubFeature { icon: IconName; title: string; description: string; features: string[]; }
export interface ClubStat { value: string; label: string; }
export interface ClubContent {
  heroKicker: string; heroTitle1: string; heroTitle2: string;
  heroParagraph: string; heroImage: string;
  historyKicker: string; historyYearFrom: string; historyYearTo: string;
  historyParagraphs: string[];
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
      button: "bg-[#F97316] text-[#082B42] hover:bg-[#F97316]/90",
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
        selectionBg: "#F97316",    // orange — matches group CTA
    selectionText: "#082B42",  // navy — matches group CTA text
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
      values: [
        { number: "01", title: "Excellence", description: "Recherche constante du haut niveau technique et tactique." },
        { number: "02", title: "Famille",    description: "Un esprit collectif qui unit joueurs, staff et familles." },
        { number: "03", title: "Passion",    description: "L'amour du football, le respect de l'adversaire, la joie de jouer." },
        { number: "04", title: "Discipline", description: "Sérieux, ponctualité et respect sur et en dehors du terrain." },
      ],
      entitiesKicker: "Nos entités",
      entitiesTitle: "Trois équipes, une famille",
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
        historyParagraphs: [
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
      },
       missionImage: "/images/academy/kids-trophy.jpg",
      valuesKicker: "Nos valeurs",
      valuesTitle: "Les 4 piliers d'Ennour",
      values: [
        { icon: "sparkles", title: "Excellence sportive", description: "Même niveau d'exigence technique et tactique que les équipes masculines." },
        { icon: "heart",    title: "Épanouissement",      description: "Un cadre bienveillant où chaque joueuse peut grandir à son rythme." },
        { icon: "users",    title: "Solidarité",          description: "L'esprit d'équipe et la sororité au cœur de chaque entraînement." },
        { icon: "shield",   title: "Combativité",         description: "Apprendre à se dépasser, sur et en dehors du terrain." },
      ],
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
      button: "bg-[#F0C419] text-[#081A2E] hover:bg-[#F0C419]/90",
      progress: "bg-[#F0C419]",
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
    selectionText: "#0F2A47",  // navy — matches Avenir CTA text
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
      },
      missionImage: "/images/academy/kids-trophy.jpg",
      valuesKicker: "Nos valeurs",
      valuesTitle: "Les 4 piliers d'Avenir",
      values: [
        { icon: "target", title: "Polyvalence",            description: "Football à 11 et futsal pour former des joueurs complets et adaptables." },
        { icon: "zap",    title: "Technique individuelle", description: "Le futsal affine le contrôle, la rapidité d'exécution et le dribble." },
        { icon: "flame",  title: "Intelligence tactique",  description: "Lire le jeu, prendre la bonne décision, anticiper sous pression." },
        { icon: "shield", title: "Discipline",             description: "Rigueur, ponctualité et sérieux dans les deux disciplines." },
      ],
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