export type ProductCategory = "maillot" | "equipment" | "merch" | "wallpaper";

export interface ProductVariant {
  id: string;
  name: string;
  price: number; // in TND
  stock: number;
  attributes: Record<string, string>; // e.g., { size: "M", color: "Blaugrana" }
}

export interface Product {
  slug: string;
  name: string;
  description: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number; // starting price in TND
  images: string[]; // paths
  variants: ProductVariant[];
  featured: boolean;
  isNew?: boolean;
  details: string[];
  care?: string[];
}

export const products: Product[] = [
  {
    slug: "maillot-domicile-2026",
    name: "Maillot Domicile 2026/27",
    description: "Le maillot officiel de l'Académie pour la saison 2026/27. Design inspiré du Real Valladolid avec les couleurs Blaugrana. Tissu respirant et coupe athlétique.",
    category: "maillot",
    categoryLabel: "Maillots",
    price: 85,
    images: ["/images/products/maillot-domicile-1.jpg"],
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
      "Technologie Dri-FIT pour l'évacuation de l'humidité",
      "Écusson officiel de l'académie brodé",
      "Coupe athlétique ajustée",
      "Logo Real Valladolid sur la manche",
    ],
    care: ["Lavage en machine à 30°C", "Ne pas javelliser", "Repassage à faible température"],
  },
  {
    slug: "maillot-exterieur-2026",
    name: "Maillot Extérieur 2026/27",
    description: "Le maillot extérieur de la saison. Design moderne avec des touches dorées qui rappellent nos trophées. Confort optimal pour les matchs et l'entraînement.",
    category: "maillot",
    categoryLabel: "Maillots",
    price: 85,
    images: ["/images/products/maillot-exterieur-1.jpg"],
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
      "Design exclusif avec touches dorées",
      "Écusson officiel brodé",
      "Coupe regular confortable",
    ],
    care: ["Lavage en machine à 30°C", "Ne pas javelliser", "Séchage à l'air libre"],
  },
  {
    slug: "sac-entrainement",
    name: "Sac d'Entraînement Pro",
    description: "Sac spacieux et résistant pour transporter tout votre équipement. Compartiments séparés pour chaussures et vêtements humides.",
    category: "equipment",
    categoryLabel: "Équipement",
    price: 65,
    images: ["/images/products/sac-1.jpg"],
    featured: false,
    variants: [
      { id: "sac-noir", name: "Noir", price: 65, stock: 30, attributes: { color: "Noir" } },
      { id: "sac-bleu", name: "Bleu Blaugrana", price: 65, stock: 20, attributes: { color: "Bleu" } },
    ],
    details: [
      "Capacité 40L",
      "Compartiment chaussures séparé",
      "Poche ventilée pour vêtements humides",
      "Bretelles rembourrées ajustables",
      "Logo brodé",
    ],
  },
  {
    slug: "gourde-officielle",
    name: "Gourde Officielle 750ml",
    description: "Gourde isotherme en acier inoxydable avec le logo de l'académie. Garde vos boissons froides pendant 12h ou chaudes pendant 6h.",
    category: "equipment",
    categoryLabel: "Équipement",
    price: 35,
    images: ["/images/products/gourde-1.jpg"],
    featured: false,
    variants: [
      { id: "gourde-bleu", name: "Bleu Blaugrana", price: 35, stock: 50, attributes: { color: "Bleu" } },
      { id: "gourde-or", name: "Or Champion", price: 35, stock: 30, attributes: { color: "Or" } },
    ],
    details: [
      "Acier inoxydable 18/8",
      "Double paroi isotherme",
      "Sans BPA",
      "Capacité 750ml",
      "Logo gravé au laser",
    ],
  },
  {
    slug: "casquette-arv",
    name: "Casquette ARV",
    description: "Casquette ajustable avec l'écusson de l'académie brodée. Parfaite pour supporter l'équipe au stade ou au quotidien.",
    category: "merch",
    categoryLabel: "Merchandising",
    price: 25,
    images: ["/images/products/casquette-1.jpg"],
    featured: false,
    variants: [
      { id: "casq-bleu", name: "Bleu", price: 25, stock: 40, attributes: { color: "Bleu" } },
      { id: "casq-noir", name: "Noir", price: 25, stock: 35, attributes: { color: "Noir" } },
    ],
    details: [
      "100% coton",
      "Écusson brodé",
      "Fermeture ajustable",
      "Taille unique",
    ],
  },
  {
    slug: "echarpe-supporter",
    name: "Écharpe de Supporter",
    description: "L'écharpe officielle aux couleurs de l'académie. Indispensable pour encourager l'équipe dans les tribunes.",
    category: "merch",
    categoryLabel: "Merchandising",
    price: 20,
    images: ["/images/products/echarpe-1.jpg"],
    featured: false,
    variants: [
      { id: "ech-std", name: "Standard", price: 20, stock: 60, attributes: {} },
    ],
    details: [
      "100% acrylique",
      "Couleurs officielles",
      "Dimensions 150 x 20 cm",
      "Logo tissé",
    ],
  },
];

export const productCategories = [
  { id: "all", label: "Tous" },
  { id: "maillot", label: "Maillots" },
  { id: "equipment", label: "Équipement" },
  { id: "merch", label: "Merchandising" },
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