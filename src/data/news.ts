export interface Article {
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
  team?: string;
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
    title: "Victoire ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©clatante des U15 au tournoi rÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©gional de Sfax",
    excerpt:
      "Nos jeunes talents ont remportÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© le tournoi rÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©gional de Sfax face ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â  12 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©quipes, dÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©montrant la qualitÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© de notre formation technique et tactique.",
    image: "/images/news/victoire-u15-tournoi-sfax.jpg",
    category: "match",
    categoryLabel: "CompÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©tition",
    team: "valladolid",
    author: { name: "Karim Trabelsi", role: "Directeur Technique", initials: "KT" },
    publishedAt: "2026-11-05T10:00:00Z",
    readTime: 4,
    featured: true,
    tags: ["U15", "tournoi", "Sfax", "victoire"],
    content: [
      {
        type: "paragraph",
        text: "Ce week-end, notre ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©quipe U15 a brillÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© lors du tournoi rÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©gional de Sfax en remportant la finale face ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â  l'AS GabÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨s sur le score de 3-1. Une performance qui couronne six mois de travail intensif.",
      },
      { type: "heading", text: "Un parcours sans faute" },
      {
        type: "paragraph",
        text: "AprÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨s une phase de poule parfaite (3 victoires, 0 dÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©faite), nos joueurs ont enchaÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â®nÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© avec une demi-finale maÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â®trisÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©e avant de s'imposer en finale devant plus de 500 spectateurs.",
      },
      {
        type: "quote",
        text: "Ce qui me rend le plus fier, ce n'est pas la victoire elle-mÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âªme, mais la maniÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨re dont ces jeunes ont appliquÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© les principes tactiques travaillÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©s ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â  l'entraÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â®nement. Ils ont jouÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© comme une vraie ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©quipe.",
      },
      { type: "heading", text: "Les points clÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©s de la formation" },
      {
        type: "list",
        text: "Les facteurs de cette rÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©ussite :",
        items: [
          "Une maÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â®trise technique supÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©rieure dans les duels",
          "Une occupation intelligente de l'espace",
          "Une solidaritÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© exemplaire entre les lignes",
          "Une gestion mature du score en deuxiÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨me mi-temps",
        ],
      },
      {
        type: "paragraph",
        text: "Bravo ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â  tous les joueurs et ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â  leur encadrement. Cette victoire est celle de toute une acadÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©mie.",
      },
    ],
  },
  {
    slug: "stage-estival-real-valladolid-2027",
    title: "Stage d'ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©tÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© 2027 au Real Valladolid : inscriptions ouvertes",
    excerpt:
      "Dix de nos joueurs sÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©lectionnÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©s participeront ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â  un stage de deux semaines dans les installations du Real Valladolid CF en Espagne.",
    image: "/images/news/stage-estival-real-valladolid-2027.jpg",
    category: "stage",
    categoryLabel: "Stage",
    team: "valladolid",
    author: { name: "Leila Hamdi", role: "Coordinatrice PÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©dagogique", initials: "LH" },
    publishedAt: "2026-11-02T08:00:00Z",
    readTime: 5,
    featured: false,
    tags: ["Espagne", "Real Valladolid", "stage", "U16"],
    content: [
      {
        type: "paragraph",
        text: "GrÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ce ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â  notre partenariat officiel avec le Real Valladolid CF, dix joueurs de notre acadÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©mie ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢gÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©s de 15 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â  17 ans auront l'opportunitÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© unique de participer ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â  un stage de perfectionnement en Espagne du 15 au 29 juillet 2027.",
      },
      { type: "heading", text: "Un programme d'exception" },
      {
        type: "paragraph",
        text: "Pendant deux semaines, les jeunes footballeurs s'entraÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â®neront dans les installations de la Ciudad Real Madrid de Valladolid, encadrÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©s par des entraÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â®neurs diplÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â´mÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©s UEFA du club espagnol.",
      },
      {
        type: "list",
        text: "Le programme comprend :",
        items: [
          "3 sÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©ances d'entraÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â®nement quotidiennes",
          "Analyses vidÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©o individuelles",
          "Matchs amicaux contre des ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©quipes locales",
          "Visite du stade JosÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© Zorrilla",
          "Immersion culturelle et linguistique",
        ],
      },
      { type: "heading", text: "CritÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨res de sÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©lection" },
      {
        type: "paragraph",
        text: "Les joueurs seront sÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©lectionnÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©s sur la base de leurs performances sportives, de leur assiduitÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© aux entraÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â®nements et de leur comportement exemplaire. Les inscriptions sont ouvertes jusqu'au 31 janvier 2027.",
      },
    ],
  },
    {
    slug: "ennour-tournoi-regional-feminin-2026",
    title: "Ennour Sportif remporte le tournoi régional féminin",
    excerpt: "Nos joueuses ont décroché le titre régional à Tataouine, une première dans l'histoire du club.",
    image: "/images/news/victoire-u15-tournoi-sfax.jpg",
    category: "match",
    categoryLabel: "Compétition",
    team: "ennour",
    author: { name: "Leila Hamdi", role: "Coordinatrice", initials: "LH" },
    publishedAt: "2026-11-12T10:00:00Z",
    readTime: 3,
    featured: true,
    tags: ["Ennour", "régional", "victoire"],
    content: [{ type: "paragraph", text: "À remplacer par le contenu réel de l'équipe Ennour." }],
  },
  {
    slug: "ennour-nouvelle-saison-2027",
    title: "Ennour Sportif prépare la saison 2026-2027",
    excerpt: "Objectifs ambitieux et nouvelles recrues pour la section féminine.",
    image: "/images/news/resultats-u12-championnat-regional.jpg",
    category: "academie",
    categoryLabel: "Académie",
    team: "ennour",
    author: { name: "Leila Hamdi", role: "Coordinatrice", initials: "LH" },
    publishedAt: "2026-11-08T10:00:00Z",
    readTime: 2,
    featured: false,
    tags: ["Ennour", "saison"],
    content: [{ type: "paragraph", text: "À remplacer par le contenu réel." }],
  },
  {
    slug: "avenir-futsal-champion-regional-2026",
    title: "Avenir Sportif champion régional de futsal U15",
    excerpt: "Nos futsaleurs ont dominé la finale régionale à Sfax.",
    image: "/images/news/victoire-u15-tournoi-sfax.jpg",
    category: "match",
    categoryLabel: "Compétition",
    team: "avenir",
    author: { name: "Mehdi Gharbi", role: "Entraîneur", initials: "MG" },
    publishedAt: "2026-11-11T15:00:00Z",
    readTime: 3,
    featured: true,
    tags: ["Avenir", "futsal", "champion"],
    content: [{ type: "paragraph", text: "À remplacer par le contenu réel de l'équipe Avenir." }],
  },
  {
    slug: "avenir-nouveau-programme-futsal",
    title: "Avenir lance son programme futsal structuré",
    excerpt: "Nouveau cursus complet pour former les futsaleurs de demain.",
    image: "/images/news/nouveaux-equipements-salle-analyse.jpg",
    category: "academie",
    categoryLabel: "Académie",
    team: "avenir",
    author: { name: "Mehdi Gharbi", role: "Entraîneur", initials: "MG" },
    publishedAt: "2026-11-05T10:00:00Z",
    readTime: 3,
    featured: false,
    tags: ["Avenir", "futsal", "programme"],
    content: [{ type: "paragraph", text: "À remplacer par le contenu réel." }],
  },
  {
    slug: "ahmed-ben-alui-signe-esperance",
    title: "Ahmed Ben Ali signe son premier contrat professionnel ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â  l'EspÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©rance",
    excerpt:
      "Ancien joueur de notre acadÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©mie, Ahmed Ben Ali a signÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© son premier contrat professionnel avec l'EspÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©rance Sportive de Tunis.",
    image: "/images/news/ahmed-ben-alui-signe-esperance.jpg",
    category: "alumni",
    categoryLabel: "Alumni",
    team: "valladolid",
    author: { name: "Karim Trabelsi", role: "Directeur Technique", initials: "KT" },
    publishedAt: "2026-10-28T14:00:00Z",
    readTime: 3,
    featured: false,
    tags: ["alumni", "professionnel", "EspÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©rance"],
    content: [
      {
        type: "paragraph",
        text: "C'est avec une immense fiertÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© que nous annonÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ons la signature d'Ahmed Ben Ali, promotion 2020 de notre acadÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©mie, avec l'EspÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©rance Sportive de Tunis, l'un des plus grands clubs d'Afrique.",
      },
      {
        type: "quote",
        text: "Tout a commencÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© ici, ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â  Tataouine. Les entraÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â®neurs m'ont appris la rigueur, la discipline et l'amour du maillot. Je n'oublie pas d'oÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¹ je viens.",
      },
      {
        type: "paragraph",
        text: "Ahmed a rejoint l'acadÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©mie ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â  l'ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ge de 10 ans et l'a quittÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©e ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â  16 ans pour intÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©grer le centre de formation de l'EST. Son parcours est la preuve que la formation de qualitÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© existe aussi dans le sud tunisien.",
      },
    ],
  },
  {
    slug: "nouveaux-equipements-salle-analyse",
    title: "Inauguration de notre nouvelle salle d'analyse vidÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©o",
    excerpt:
      "L'acadÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©mie se dote d'une salle d'analyse vidÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©o ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©quipÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©e des derniÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨res technologies pour accompagner la progression de nos joueurs.",
    image: "/images/news/nouveaux-equipements-salle-analyse.jpg",
    category: "academie",
    categoryLabel: "AcadÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©mie",
    team: "valladolid",
    author: { name: "Tarek Bouazizi", role: "Analyste VidÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©o", initials: "TB" },
    publishedAt: "2026-10-22T09:00:00Z",
    readTime: 4,
    featured: false,
    tags: ["installations", "technologie", "analyse"],
    content: [
      {
        type: "paragraph",
        text: "Nous avons le plaisir d'inaugurer notre nouvelle salle d'analyse vidÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©o, un investissement majeur dans la modernisation de nos installations.",
      },
      { type: "heading", text: "Un outil au service de la performance" },
      {
        type: "paragraph",
        text: "ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â°quipÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©e d'ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©crans 4K, de logiciels professionnels d'analyse tactique et d'un systÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨me de replay instantanÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©, cette salle permettra ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â  nos entraÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â®neurs et joueurs d'analyser en dÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©tail les matchs et les sÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©ances d'entraÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â®nement.",
      },
      {
        type: "list",
        text: "FonctionnalitÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©s principales :",
        items: [
          "Analyse individuelle des gestes techniques",
          "DÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©cryptage tactique des adversaires",
          "Sessions de feedback en petit groupe",
          "Archivage et suivi de la progression",
        ],
      },
      {
        type: "paragraph",
        text: "Cette salle s'inscrit dans notre volontÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© d'offrir un environnement d'apprentissage de niveau professionnel ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â  tous nos joueurs.",
      },
    ],
  },
  {
    slug: "conseils-nutrition-jeune-footballeur",
    title: "5 conseils nutrition pour le jeune footballeur",
    excerpt:
      "Notre kinÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©sithÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©rapeute partage ses conseils pour une alimentation adaptÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©e ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â  la pratique intensive du football chez les jeunes.",
    image: "/images/news/conseils-nutrition-jeune-footballeur.jpg",
    category: "conseil",
    categoryLabel: "Conseil",
    author: { name: "Dr. Amira Mansour", role: "KinÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©sithÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©rapeute", initials: "AM" },
    publishedAt: "2026-10-15T11:00:00Z",
    readTime: 6,
    featured: false,
    tags: ["nutrition", "santÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©", "conseils"],
    content: [
      {
        type: "paragraph",
        text: "L'alimentation est un pilier fondamental de la performance sportive, surtout chez les jeunes en pleine croissance. Voici cinq conseils essentiels pour nos joueurs.",
      },
      { type: "heading", text: "1. L'hydratation avant tout" },
      {
        type: "paragraph",
        text: "Un jeune footballeur doit boire au minimum 1,5 litre d'eau par jour, et jusqu'ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â  2,5 litres les jours d'entraÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â®nement. L'eau reste la meilleure boisson, loin devant les sodas.",
      },
      { type: "heading", text: "2. Le petit-dÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©jeuner, non nÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©gociable" },
      {
        type: "paragraph",
        text: "Un petit-dÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©jeuner ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©quilibrÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© (fÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©culents, protÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©ines, fruits) est essentiel pour tenir la matinÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©e scolaire et ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âªtre performant ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â  l'entraÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â®nement du soir.",
      },
      { type: "heading", text: "3. Le repas d'avant-match" },
      {
        type: "paragraph",
        text: "3 heures avant le match, privilÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©giez un repas riche en glucides complexes (pÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢tes, riz) et modÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©rÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© en protÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©ines. ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â°vitez les graisses et les fibres qui ralentissent la digestion.",
      },
      { type: "heading", text: "4. La rÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©cupÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©ration aprÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨s l'effort" },
      {
        type: "paragraph",
        text: "Dans les 30 minutes aprÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨s l'effort, une collation associant glucides et protÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©ines (banane + yaourt, ou barre de rÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©cupÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©ration) optimise la reconstruction musculaire.",
      },
      { type: "heading", text: "5. Le sommeil, le meilleur carburant" },
      {
        type: "paragraph",
        text: "Un adolescent sportif a besoin de 9 ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â  10 heures de sommeil par nuit. Le sommeil est le moment oÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¹ le corps rÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©cupÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨re et oÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¹ la mÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©moire musculaire se consolide.",
      },
    ],
  },
  {
    slug: "resultats-u12-championnat-regional",
    title: "Championnat rÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©gional U12 : un dÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©but de saison prometteur",
    excerpt:
      "Nos U12 ont entamÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© leur championnat rÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©gional avec deux victoires et un match nul, montrant de belles promesses pour la suite.",
    image: "/images/news/resultats-u12-championnat-regional.jpg",
    category: "match",
    categoryLabel: "CompÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©tition",
    team: "valladolid",
    author: { name: "Mehdi Gharbi", role: "EntraÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â®neur U11-U13", initials: "MG" },
    publishedAt: "2026-10-08T16:00:00Z",
    readTime: 3,
    featured: false,
    tags: ["U12", "championnat", "rÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©sultats"],
    content: [
      {
        type: "paragraph",
        text: "AprÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨s trois journÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©es de championnat rÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©gional, notre ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©quipe U12 occupe la deuxiÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨me place du classement avec 7 points, derriÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨re l'US Tataouine mais devant nos rivaux directs.",
      },
      { type: "heading", text: "Les rÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©sultats" },
      {
        type: "list",
        text: "Bilan des trois premiÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨res journÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©es :",
        items: [
          "J1 : ARV 4 - 1 AS Chenini (victoire)",
          "J2 : ES Ghomrassen 2 - 2 ARV (match nul)",
          "J3 : ARV 3 - 0 JS Tataouine (victoire)",
        ],
      },
      {
        type: "paragraph",
        text: "Les joueurs montrent une belle progression dans la circulation du ballon et dans leur capacitÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â  construire le jeu depuis la dÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©fense. Le travail paie.",
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
}