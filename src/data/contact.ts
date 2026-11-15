export const contactSubjects = [
  { value: "general",     label: "Question générale" },
  { value: "inscription", label: "Inscription" },
  { value: "partenariat", label: "Partenariat" },
  { value: "sponsoring",  label: "Sponsoring" },
  { value: "other",       label: "Autre" },
] as const;

export const contactFaq = [
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
] as const;