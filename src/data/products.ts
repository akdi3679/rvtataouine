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
  team: string;    // ← AJOUTER
}

export const products: Product[] = [
  {
    slug: "maillot-domicile-2026",
    name: "Maillot Domicile 2026/27",
    description:
      "Le maillot officiel de l'Académie pour la saison 2026/27. Tissu respirant, coupe athlétique et écusson brodé.",
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
      "100% polyester recyclé",
      "Technologie Dri-FIT",
      "Écusson officiel brodé",
      "Coupe athlétique ajustée",
    ],
    care: ["Lavage machine 30°C", "Ne pas javelliser", "Repassage faible température"],
  },
  {
    slug: "maillot-exterieur-2026",
    name: "Maillot Extérieur 2026/27",
    description:
      "Le maillot extérieur de la saison. Design moderne avec des détails dorés. Confort optimal pour les matchs et l'entraînement.",
    category: "maillot",
    categoryLabel: "Maillots",
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
      "100% polyester recyclé",
      "Design exclusif avec détails dorés",
      "Écusson officiel brodé",
      "Coupe regular confortable",
    ],
    care: ["Lavage machine 30°C", "Ne pas javelliser", "Séchage à l'air libre"],
  },
  {
    slug: "maillot-third-2026",
    name: "Maillot Third 2026/27",
    description:
      "Le maillot third de la saison, édition limitée. Design audacieux aux couleurs de l'académie pour les supporters.",
    category: "maillot",
    categoryLabel: "Maillots",
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
      "100% polyester recyclé",
      "Édition limitée",
      "Écusson officiel brodé",
      "Coupe athlétique",
    ],
    care: ["Lavage machine 30°C", "Ne pas javelliser", "Repassage faible température"],
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