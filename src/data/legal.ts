export const legal = {
  publisher: {
    name: "Académie Real Valladolid Tataouine",
    type: "Association à but non lucratif",
    registrationNumber: "En cours d'immatriculation",
    address: "Stade Municipal, Tataouine, Tunisie",
    phone: "+216 75 854 717",
    email: "contact@arv-tataouine.tn",
    director: "M. Karim Trabelsi",
    directorTitle: "Directeur Technique",
  },
  host: {
    name: "Vercel Inc.",
    address: "440 N Barranca Ave #4133, Covina, CA 91723, USA",
    phone: "+1 (559) 288-7060",
    website: "https://vercel.com",
  },
  dataController: {
    name: "Académie Real Valladolid Tataouine",
    address: "Stade Municipal, Tataouine, Tunisie",
    email: "privacy@arv-tataouine.tn",
    dpo: "Non applicable (structure < 250 employés)",
  },
  userRights: [
    "Droit d'accès à vos données personnelles",
    "Droit de rectification des données inexactes",
    "Droit à l'effacement (« droit à l'oubli »)",
    "Droit à la limitation du traitement",
    "Droit à la portabilité des données",
    "Droit d'opposition au traitement",
    "Droit de retirer votre consentement à tout moment",
  ],
  retentionPeriods: [
    { category: "Données de contact (formulaires)", duration: "3 ans après le dernier contact" },
    { category: "Données des joueurs inscrits", duration: "Durée de l'inscription + 5 ans" },
    { category: "Données de navigation", duration: "13 mois (recommandation CNIL)" },
  ],
  securityMeasures: [
    "Chiffrement HTTPS/TLS de bout en bout",
    "Mots de passe hashés avec Argon2id",
    "Sessions sécurisées (HttpOnly, Secure, SameSite)",
    "Protection contre les attaques CSRF",
    "Rate limiting sur les formulaires et API",
  ],
};

export const mentionsLegales = {
  title: "Mentions Légales",
  sections: [
    { heading: "Éditeur du site", content: `Le site arv-tataouine.tn est édité par :\n\n${legal.publisher.name}\n${legal.publisher.type}\n${legal.publisher.address}\n\nTéléphone : ${legal.publisher.phone}\nEmail : ${legal.publisher.email}\n\nDirecteur de la publication : ${legal.publisher.director}, ${legal.publisher.directorTitle}\n\nNuméro d'identification : ${legal.publisher.registrationNumber}` },
    { heading: "Hébergeur", content: `Le site est hébergé par :\n\n${legal.host.name}\n${legal.host.address}\nTéléphone : ${legal.host.phone}\nSite web : ${legal.host.website}` },
    { heading: "Propriété intellectuelle", content: `L'ensemble du contenu de ce site est protégé par les lois en vigueur sur la propriété intellectuelle. Toute reproduction est interdite sans autorisation écrite préalable. Le logo "Real Valladolid CF" est utilisé dans le cadre d'un partenariat officiel.` },
    { heading: "Limitation de responsabilité", content: `L'éditeur s'efforce d'assurer l'exactitude des informations. Toutefois, l'éditeur décline toute responsabilité pour toute imprécision, inexactitude ou omission, ainsi que pour les dommages découlant d'une intrusion frauduleuse.` },
    { heading: "Droit applicable", content: `Les présentes mentions légales sont régies par le droit tunisien. En cas de litige, les tribunaux tunisiens seront seuls compétents.` },
  ],
};

export const privacyPolicy = {
  title: "Politique de Confidentialité",
  lastUpdated: "2026-11-08",
  sections: [
    { heading: "Introduction", content: `Cette politique informe les utilisateurs sur les données collectées, leurs finalités et leurs droits, conformément au RGPD et à la loi tunisienne n°2004-63.` },
    { heading: "Responsable du traitement", content: `${legal.dataController.name}\n${legal.dataController.address}\nEmail : ${legal.dataController.email}` },
    { heading: "Données collectées", content: `1. Données de contact (nom, email, téléphone, message).\n2. Données des joueurs (nom, date de naissance, certificat médical).\n3. Données de navigation (adresse IP, type de navigateur).` },
    { heading: "Finalités du traitement", content: `Gestion des demandes, inscription et suivi des joueurs, communication avec les familles, et respect des obligations légales.` },
    { heading: "Durée de conservation", content: legal.retentionPeriods.map(r => `- ${r.category} : ${r.duration}`).join("\n") },
    { heading: "Vos droits", content: `Vous disposez des droits suivants :\n${legal.userRights.map(r => `- ${r}`).join("\n")}\n\nPour les exercer, contactez-nous à : ${legal.dataController.email}` },
    { heading: "Sécurité", content: `Nous mettons en œuvre :\n${legal.securityMeasures.map(m => `- ${m}`).join("\n")}` },
  ],
};

export const cookiePolicy = {
  title: "Politique de Cookies",
  lastUpdated: "2026-11-08",
  sections: [
    { heading: "Qu'est-ce qu'un cookie ?", content: `Un cookie est un petit fichier texte déposé sur votre terminal lors de la visite d'un site web.` },
    { heading: "Cookies utilisés", content: `Notre site utilise uniquement des cookies strictement nécessaires au fonctionnement (session, sécurité CSRF). Aucun cookie de mesure d'audience ou de publicité n'est utilisé sans votre consentement explicite.` },
    { heading: "Gestion des cookies", content: `Vous pouvez configurer votre navigateur pour refuser les cookies. Attention : la désactivation des cookies strictement nécessaires peut empêcher le bon fonctionnement du site.` },
  ],
};

export const cgv = {
  title: "Conditions Générales de Vente",
  lastUpdated: "2026-11-08",
  sections: [
    { heading: "Objet", content: `Les présentes CGV régissent les relations entre l'Académie Real Valladolid Tataouine et les parents/tuteurs des joueurs inscrits.` },
    { heading: "Inscription", content: `L'inscription implique l'acceptation des présentes CGV. Elle est validée après : formulaire, séance d'évaluation, signature du règlement intérieur et paiement.` },
    { heading: "Tarifs et paiement", content: `Les tarifs sont fixés par trimestre. Le paiement s'effectue par virement, chèque ou espèces. Un échéancier peut être mis en place sur demande.` },
    { heading: "Assurance", content: `Tous les joueurs sont couverts par une assurance sportive incluse dans les frais. Un certificat médical de non-contre-indication est obligatoire.` },
    { heading: "Règlement intérieur", content: `Le joueur et ses parents s'engagent à respecter le règlement : assiduité, respect des entraîneurs et arbitres, comportement exemplaire.` },
    { heading: "Résiliation", content: `L'inscription peut être résiliée par les parents avec un préavis d'un mois, ou par l'académie en cas de non-respect du règlement. Aucun remboursement en cours de trimestre, sauf force majeure.` },
    { heading: "Droit à l'image", content: `L'inscription vaut autorisation pour l'académie d'utiliser les photos/vidéos des joueurs dans le cadre de sa communication, sauf opposition écrite des parents.` },
  ],
};