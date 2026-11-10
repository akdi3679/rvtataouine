/**
 * Partner logos — fichiers dans public/images/partners/
 *
 * Vérifie les noms exacts avec :
 *   Get-ChildItem public\images\partners\
 *
 * Puis mets à jour les `logo` ci-dessous.
 */

export interface Partner {
  id: string;
  name: string;
  logo: string;
}

export const PARTNERS: Partner[] = [
  {
    id: "ooredoo",
    name: "Ooredoo",
    logo: "/images/partners/ooredoo.png",
  },
  {
    id: "tunisair",
    name: "Tunisair",
    logo: "/images/partners/tunisair.png",
  },
  {
    id: "bna",
    name: "Bna",
    logo: "/images/partners/bna.png",
  },
  {
    id: "sabrine",
    name: "Sabrine",
    logo: "/images/partners/sabrine.png",
  },
  {
    id: "carte-assur",
    name: "Carte Assurance",
    logo: "/images/partners/carte-assur.png",
  },
  {
    id: "kappa",
    name: "Kappa",
    logo: "/images/partners/kappa.png",
  },
];