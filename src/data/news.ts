export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: "match" | "stage" | "academie" | "alumni" | "conseil";
  categoryLabel: string;
  author: {
    name: string;
    role: string;
    initials: string;
  };
  publishedAt: string; // ISO date
  readTime: number; // minutes
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
    excerpt: "Nos jeunes talents ont remporté le tournoi régional de Sfax face à 12 équipes, démontrant la qualité de notre formation technique et tactique.",
    category: "match",
    categoryLabel: "Compétition",
    author: { name: "Karim Trabelsi", role: "Directeur Technique", initials: "KT" },
    publishedAt: "2026-11-05T10:00:00Z",
    readTime: 4,
    featured: true,
    tags: ["U15", "tournoi", "Sfax", "victoire"],
    content: [
      { type: "paragraph", text: "Ce week-end, notre équipe U15 a brillé lors du tournoi régional de Sfax en remportant la finale face à l'AS Gabès sur le score de 3-1. Une performance qui couronne six mois de travail intensif." },
      { type: "heading", text: "Un parcours sans faute" },
      { type: "paragraph", text: "Après une phase de poule parfaite (3 victoires, 0 défaite), nos joueurs ont enchaîné avec une demi-finale maîtrisée avant de s'imposer en finale devant plus de 500 spectateurs." },
      { type: "quote", text: "Ce qui me rend le plus fier, ce n'est pas la victoire elle-même, mais la manière dont ces jeunes ont appliqué les principes tactiques travaillés à l'entraînement. Ils ont joué comme une vraie équipe." },
      { type: "heading", text: "Les points clés de la formation" },
      { type: "list", text: "Les facteurs de cette réussite :", items: [
        "Une maîtrise technique supérieure dans les duels",
        "Une occupation intelligente de l'espace",
        "Une solidarité exemplaire entre les lignes",
        "Une gestion mature du score en deuxième mi-temps"
      ]},
      { type: "paragraph", text: "Bravo à tous les joueurs et à leur encadrement. Cette victoire est celle de toute une académie." }
    ]
  },
  {
    slug: "stage-estival-real-valladolid-2027",
    title: "Stage d'été 2027 au Real Valladolid : inscriptions ouvertes",
    excerpt: "Dix de nos joueurs sélectionnés participeront à un stage de deux semaines dans les installations du Real Valladolid CF en Espagne.",
    category: "stage",
    categoryLabel: "Stage",
    author: { name: "Leila Hamdi", role: "Coordinatrice Pédagogique", initials: "LH" },
    publishedAt: "2026-11-02T08:00:00Z",
    readTime: 5,
    featured: false,
    tags: ["Espagne", "Real Valladolid", "stage", "U16"],
    content: [
      { type: "paragraph", text: "Grâce à notre partenariat officiel avec le Real Valladolid CF, dix joueurs de notre académie âgés de 15 à 17 ans auront l'opportunité unique de participer à un stage de perfectionnement en Espagne du 15 au 29 juillet 2027." },
      { type: "heading", text: "Un programme d'exception" },
      { type: "paragraph", text: "Pendant deux semaines, les jeunes footballeurs s'entraîneront dans les installations de la Ciudad Real Madrid de Valladolid, encadrés par des entraîneurs diplômés UEFA du club espagnol." },
      { type: "list", text: "Le programme comprend :", items: [
        "3 séances d'entraînement quotidiennes",
        "Analyses vidéo individuelles",
        "Matchs amicaux contre des équipes locales",
        "Visite du stade José Zorrilla",
        "Immersion culturelle et linguistique"
      ]},
      { type: "heading", text: "Critères de sélection" },
      { type: "paragraph", text: "Les joueurs seront sélectionnés sur la base de leurs performances sportives, de leur assiduité aux entraînements et de leur comportement exemplaire. Les inscriptions sont ouvertes jusqu'au 31 janvier 2027." }
    ]
  },
  {
    slug: "ahmed-ben-alui-signe-esperance",
    title: "Ahmed Ben Ali signe son premier contrat professionnel à l'Espérance",
    excerpt: "Ancien joueur de notre académie, Ahmed Ben Ali a signé son premier contrat professionnel avec l'Espérance Sportive de Tunis.",
    category: "alumni",
    categoryLabel: "Alumni",
    author: { name: "Karim Trabelsi", role: "Directeur Technique", initials: "KT" },
    publishedAt: "2026-10-28T14:00:00Z",
    readTime: 3,
    featured: false,
    tags: ["alumni", "professionnel", "Espérance"],
    content: [
      { type: "paragraph", text: "C'est avec une immense fierté que nous annonçons la signature d'Ahmed Ben Ali, promotion 2020 de notre académie, avec l'Espérance Sportive de Tunis, l'un des plus grands clubs d'Afrique." },
      { type: "quote", text: "Tout a commencé ici, à Tataouine. Les entraîneurs m'ont appris la rigueur, la discipline et l'amour du maillot. Je n'oublie pas d'où je viens." },
      { type: "paragraph", text: "Ahmed a rejoint l'académie à l'âge de 10 ans et l'a quittée à 16 ans pour intégrer le centre de formation de l'EST. Son parcours est la preuve que la formation de qualité existe aussi dans le sud tunisien." }
    ]
  },
  {
    slug: "nouveaux-equipements-salle-analyse",
    title: "Inauguration de notre nouvelle salle d'analyse vidéo",
    excerpt: "L'académie se dote d'une salle d'analyse vidéo équipée des dernières technologies pour accompagner la progression de nos joueurs.",
    category: "academie",
    categoryLabel: "Académie",
    author: { name: "Tarek Bouazizi", role: "Analyste Vidéo", initials: "TB" },
    publishedAt: "2026-10-22T09:00:00Z",
    readTime: 4,
    featured: false,
    tags: ["installations", "technologie", "analyse"],
    content: [
      { type: "paragraph", text: "Nous avons le plaisir d'inaugurer notre nouvelle salle d'analyse vidéo, un investissement majeur dans la modernisation de nos installations." },
      { type: "heading", text: "Un outil au service de la performance" },
      { type: "paragraph", text: "Équipée d'écrans 4K, de logiciels professionnels d'analyse tactique et d'un système de replay instantané, cette salle permettra à nos entraîneurs et joueurs d'analyser en détail les matchs et les séances d'entraînement." },
      { type: "list", text: "Fonctionnalités principales :", items: [
        "Analyse individuelle des gestes techniques",
        "Décryptage tactique des adversaires",
        "Sessions de feedback en petit groupe",
        "Archivage et suivi de la progression"
      ]},
      { type: "paragraph", text: "Cette salle s'inscrit dans notre volonté d'offrir un environnement d'apprentissage de niveau professionnel à tous nos joueurs." }
    ]
  },
  {
    slug: "conseils-nutrition-jeune-footballeur",
    title: "5 conseils nutrition pour le jeune footballeur",
    excerpt: "Notre kinésithérapeute partage ses conseils pour une alimentation adaptée à la pratique intensive du football chez les jeunes.",
    category: "conseil",
    categoryLabel: "Conseil",
    author: { name: "Dr. Amira Mansour", role: "Kinésithérapeute", initials: "AM" },
    publishedAt: "2026-10-15T11:00:00Z",
    readTime: 6,
    featured: false,
    tags: ["nutrition", "santé", "conseils"],
    content: [
      { type: "paragraph", text: "L'alimentation est un pilier fondamental de la performance sportive, surtout chez les jeunes en pleine croissance. Voici cinq conseils essentiels pour nos joueurs." },
      { type: "heading", text: "1. L'hydratation avant tout" },
      { type: "paragraph", text: "Un jeune footballeur doit boire au minimum 1,5 litre d'eau par jour, et jusqu'à 2,5 litres les jours d'entraînement. L'eau reste la meilleure boisson, loin devant les sodas." },
      { type: "heading", text: "2. Le petit-déjeuner, non négociable" },
      { type: "paragraph", text: "Un petit-déjeuner équilibré (féculents, protéines, fruits) est essentiel pour tenir la matinée scolaire et être performant à l'entraînement du soir." },
      { type: "heading", text: "3. Le repas d'avant-match" },
      { type: "paragraph", text: "3 heures avant le match, privilégiez un repas riche en glucides complexes (pâtes, riz) et modéré en protéines. Évitez les graisses et les fibres qui ralentissent la digestion." },
      { type: "heading", text: "4. La récupération après l'effort" },
      { type: "paragraph", text: "Dans les 30 minutes après l'effort, une collation associant glucides et protéines (banane + yaourt, ou barre de récupération) optimise la reconstruction musculaire." },
      { type: "heading", text: "5. Le sommeil, le meilleur carburant" },
      { type: "paragraph", text: "Un adolescent sportif a besoin de 9 à 10 heures de sommeil par nuit. Le sommeil est le moment où le corps récupère et où la mémoire musculaire se consolide." }
    ]
  },
  {
    slug: "resultats-u12-championnat-regional",
    title: "Championnat régional U12 : un début de saison prometteur",
    excerpt: "Nos U12 ont entamé leur championnat régional avec deux victoires et un match nul, montrant de belles promesses pour la suite.",
    category: "match",
    categoryLabel: "Compétition",
    author: { name: "Mehdi Gharbi", role: "Entraîneur U11-U13", initials: "MG" },
    publishedAt: "2026-10-08T16:00:00Z",
    readTime: 3,
    featured: false,
    tags: ["U12", "championnat", "résultats"],
    content: [
      { type: "paragraph", text: "Après trois journées de championnat régional, notre équipe U12 occupe la deuxième place du classement avec 7 points, derrière l'US Tataouine mais devant nos rivaux directs." },
      { type: "heading", text: "Les résultats" },
      { type: "list", text: "Bilan des trois premières journées :", items: [
        "J1 : ARV 4 - 1 AS Chenini (victoire)",
        "J2 : ES Ghomrassen 2 - 2 ARV (match nul)",
        "J3 : ARV 3 - 0 JS Tataouine (victoire)"
      ]},
      { type: "paragraph", text: "Les joueurs montrent une belle progression dans la circulation du ballon et dans leur capacité à construire le jeu depuis la défense. Le travail paie." }
    ]
  }
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getRelatedArticles(slug: string, limit = 3): Article[] {
  const current = getArticleBySlug(slug);
  if (!current) return [];
  return articles
    .filter((a) => a.slug !== slug && (a.category === current.category || a.tags.some((t) => current.tags.includes(t))))
    .slice(0, limit);
}

export function getArticlesByCategory(category: string): Article[] {
  return articles.filter((a) => a.category === category);
}

export function getFeaturedArticle(): Article | undefined {
  return articles.find((a) => a.featured);
}