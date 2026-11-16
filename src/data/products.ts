export type ProductCategory = "maillot" | "equipment" | "merch" | "wallpaper";

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  stock: number;
  attributes: Record<string, string>;
}

export interface Product {
  slug: string;
  name: string;
  description: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  images: string[];
  variants: ProductVariant[];
  featured: boolean;
  isNew?: boolean;
  details: string[];
  care?: string[];
  team?: string;    // Ã¢â€ Â AJOUTER
}

export const products: Product[] = [
  {
    slug: "maillot-domicile-2026",
    name: "Maillot Domicile 2026/27",
    description:
      "Le maillot officiel de l'AcadÃƒÂ©mie pour la saison 2026/27. Tissu respirant, coupe athlÃƒÂ©tique et ÃƒÂ©cusson brodÃƒÂ©.",
    category: "maillot",
    categoryLabel: "Maillots",
     team: "valladolid",    
    price: 85,
    images: ["/images/boutique/wear1.png"],
    featured: true,
    isNew: true,
    variants: [
      { id: "md-s", name: "Taille S", price: 85, stock: 15, attributes: { size: "S" } },
      { id: "md-m", name: "Taille M", price: 85, stock: 25, attributes: { size: "M" } },
      { id: "md-l", name: "Taille L", price: 85, stock: 20, attributes: { size: "L" } },
      { id: "md-xl", name: "Taille XL", price: 85, stock: 10, attributes: { size: "XL" } },
    ],
    details: [
      "100% polyester recyclÃƒÂ©",
      "Technologie Dri-FIT",
      "Ãƒâ€°cusson officiel brodÃƒÂ©",
      "Coupe athlÃƒÂ©tique ajustÃƒÂ©e",
    ],
    care: ["Lavage machine 30Ã‚Â°C", "Ne pas javelliser", "Repassage faible tempÃƒÂ©rature"],
  },
  {
    slug: "maillot-exterieur-2026",
    name: "Maillot ExtÃƒÂ©rieur 2026/27",
    description:
      "Le maillot extÃƒÂ©rieur de la saison. Design moderne avec des dÃƒÂ©tails dorÃƒÂ©s. Confort optimal pour les matchs et l'entraÃƒÂ®nement.",
    category: "maillot",
    categoryLabel: "Maillots",
    team: "valladolid",
    price: 85,
    images: ["/images/boutique/wear2.png"],
    featured: true,
    isNew: true,
    variants: [
      { id: "me-s", name: "Taille S", price: 85, stock: 12, attributes: { size: "S" } },
      { id: "me-m", name: "Taille M", price: 85, stock: 18, attributes: { size: "M" } },
      { id: "me-l", name: "Taille L", price: 85, stock: 15, attributes: { size: "L" } },
      { id: "me-xl", name: "Taille XL", price: 85, stock: 8, attributes: { size: "XL" } },
    ],
    details: [
      "100% polyester recyclÃƒÂ©",
      "Design exclusif avec dÃƒÂ©tails dorÃƒÂ©s",
      "Ãƒâ€°cusson officiel brodÃƒÂ©",
      "Coupe regular confortable",
    ],
    care: ["Lavage machine 30Ã‚Â°C", "Ne pas javelliser", "SÃƒÂ©chage ÃƒÂ  l'air libre"],
  },
  {
    slug: "maillot-third-2026",
    name: "Maillot Third 2026/27",
    description:
      "Le maillot third de la saison, ÃƒÂ©dition limitÃƒÂ©e. Design audacieux aux couleurs de l'acadÃƒÂ©mie pour les supporters.",
    category: "maillot",
    categoryLabel: "Maillots",
    team: "valladolid",
    price: 85,
    images: ["/images/boutique/wear3.png"],
    featured: true,
    isNew: true,
    variants: [
      { id: "mt-s", name: "Taille S", price: 85, stock: 10, attributes: { size: "S" } },
      { id: "mt-m", name: "Taille M", price: 85, stock: 15, attributes: { size: "M" } },
      { id: "mt-l", name: "Taille L", price: 85, stock: 12, attributes: { size: "L" } },
      { id: "mt-xl", name: "Taille XL", price: 85, stock: 6, attributes: { size: "XL" } },
    ],
    details: [
      "100% polyester recyclÃƒÂ©",
      "Ãƒâ€°dition limitÃƒÂ©e",
      "Ãƒâ€°cusson officiel brodÃƒÂ©",
      "Coupe athlÃƒÂ©tique",
    ],
    care: ["Lavage machine 30Ã‚Â°C", "Ne pas javelliser", "Repassage faible tempÃƒÂ©rature"],
  },
    {
    slug: "maillot-ennour-2026",
    name: "Maillot Ennour 2026/27",
    description: "Le maillot officiel de la section féminine, aux couleurs Ennour.",
    category: "maillot",
    categoryLabel: "Maillots",
    team: "ennour",
    price: 75,
    images: ["/images/boutique/wear1.png"],
    featured: true,
    variants: [
      { id: "en-s", name: "Taille S", price: 75, stock: 10, attributes: { size: "S" } },
      { id: "en-m", name: "Taille M", price: 75, stock: 15, attributes: { size: "M" } },
    ],
    details: ["Écusson Ennour brodé", "Coupe féminine ajustée"],
    care: ["Lavage 30°C"],
  },
  {
    slug: "maillot-avenir-2026",
    name: "Maillot Avenir 2026/27",
    description: "Le maillot officiel de la section football & futsal.",
    category: "maillot",
    categoryLabel: "Maillots",
    team: "avenir",
    price: 75,
    images: ["/images/boutique/wear2.png"],
    featured: true,
    variants: [
      { id: "av-s", name: "Taille S", price: 75, stock: 12, attributes: { size: "S" } },
      { id: "av-m", name: "Taille M", price: 75, stock: 18, attributes: { size: "M" } },
    ],
    details: ["Écusson Avenir brodé", "Coupe athlétique"],
    care: ["Lavage 30°C"],
  },
];

export const productCategories = [
  { id: "all", label: "Tous" },
  { id: "maillot", label: "Maillots" },
] as const;

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(limit = 4): Product[] {
  return products.filter((p) => p.featured).slice(0, limit);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}

export function formatPrice(price: number): string {
  return `${price} TND`;
}
export function getProductsByTeam(team: string): Product[] {
  if (team === "all") return products;
  return products.filter((p) => p.team === team);
}