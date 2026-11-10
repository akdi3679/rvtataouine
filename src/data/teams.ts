/**
 * Team logos — 4 images dans public/images/teams/
 *
 * Tu as 4 fichiers :
 *   1. Logo ARV Tataouine
 *   2. Logo adversaire 1
 *   3. Logo adversaire 2
 *   4. Logo adversaire 3
 *
 * Renomme tes 4 fichiers pour qu'ils correspondent à :
 *   - arv.png
 *   - opponent-1.png
 *   - opponent-2.png
 *   - opponent-3.png
 *
 * OU change simplement les paths ci-dessous pour pointer vers tes noms actuels.
 */

// Notre équipe
export const ARV_LOGO = "/images/teams/arv.png";

// 3 adversaires — mappe chaque nom d'équipe à son logo
// Les équipes NON listées ici (JS Tataouine, AS Chenini, ES Zarzis)
// afficheront leurs initiales en fallback
export const OPPONENT_LOGOS: Record<string, string> = {
  "Phoenix Baka Academy": "/images/teams/adv1.png",
  "APUA": "/images/teams/adv2.png",
  "E.S.B": "/images/teams/adv3.png",
};

export function isArv(teamName: string): boolean {
  return teamName.toLowerCase().includes("arv");
}

export function getTeamLogo(teamName: string): string | null {
  if (isArv(teamName)) return ARV_LOGO;
  return OPPONENT_LOGOS[teamName] ?? null;
}

export function getTeamInitials(teamName: string): string {
  return teamName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}