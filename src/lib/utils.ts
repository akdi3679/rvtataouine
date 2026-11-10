export function formatDate(dateString: string, locale: "fr" | "ar" | "en" = "fr"): string {
  const date = new Date(dateString);
  const locales = {
    fr: "fr-FR",
    ar: "ar-TN",
    en: "en-US",
  };
  return date.toLocaleDateString(locales[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Aujourd'hui";
  if (diffDays === 1) return "Hier";
  if (diffDays < 7) return `Il y a ${diffDays} jours`;
  if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaines`;
  if (diffDays < 365) return `Il y a ${Math.floor(diffDays / 30)} mois`;
  return `Il y a ${Math.floor(diffDays / 365)} ans`;
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    match: "bg-accent/10 text-accent border-accent/20",
    stage: "bg-primary/10 text-primary border-primary/20",
    academie: "bg-info/10 text-info border-info/20",
    alumni: "bg-warning/10 text-warning border-warning/20",
    conseil: "bg-success/10 text-success border-success/20",
  };
  return colors[category] || "bg-muted text-muted-foreground border-border";
}