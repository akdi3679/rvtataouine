export type MatchStatus = "upcoming" | "live" | "finished";
export type MatchResult = "win" | "draw" | "loss";

export interface Match {
  id: string;
  date: string;
  time: string;
  competition: string;
  category: string;
  homeTeam: { name: string; logo?: string; score?: number };
  awayTeam: { name: string; logo?: string; score?: number };
  location: string;
  status: MatchStatus;
  result?: MatchResult;
}

export const upcomingMatches: Match[] = [
  {
    id: "m-001",
    date: "2026-11-15",
    time: "15:00",
    competition: "Championnat Régional U15",
    category: "U15",
    homeTeam: { name: "ARV Tataouine" },
    awayTeam: { name: "Phoenix Baka Academy" },
    location: "Stade Municipal, Tataouine",
    status: "upcoming",
  },
  {
    id: "m-002",
    date: "2026-11-16",
    time: "10:00",
    competition: "Championnat Régional U12",
    category: "U12",
    homeTeam: { name: "APUA" },
    awayTeam: { name: "ARV Tataouine" },
    location: "Stade Municipal, Tataouine",
    status: "upcoming",
  },
  {
    id: "m-003",
    date: "2026-11-22",
    time: "14:00",
    competition: "Coupe de la Ligue U18",
    category: "U18",
    homeTeam: { name: "E.S.B" },
    awayTeam: { name: "ARV Tataouine" },
    location: "Stade Olympique, Tataouine",
    status: "upcoming",
  },
];

export const recentMatches: Match[] = [
  {
    id: "m-100",
    date: "2026-11-05",
    time: "15:00",
    competition: "Championnat Régional U15",
    category: "U15",
    homeTeam: { name: "ARV Tataouine", score: 3 },
    awayTeam: { name: "Phoenix Baka Academy", score: 1 },
    location: "Stade Municipal, Tataouine",
    status: "finished",
    result: "win",
  },
  {
    id: "m-101",
    date: "2026-11-02",
    time: "10:00",
    competition: "Championnat Régional U12",
    category: "U12",
    homeTeam: { name: "ARV Tataouine", score: 4 },
    awayTeam: { name: "APUA", score: 1 },
    location: "Stade Municipal, Tataouine",
    status: "finished",
    result: "win",
  },
  {
    id: "m-102",
    date: "2026-10-29",
    time: "14:00",
    competition: "Championnat Régional U18",
    category: "U18",
    homeTeam: { name: "E.S.B", score: 2 },
    awayTeam: { name: "ARV Tataouine", score: 2 },
    location: "Stade Olympique, Tataouine",
    status: "finished",
    result: "draw",
  },
  {
    id: "m-103",
    date: "2026-10-25",
    time: "15:00",
    competition: "Championnat Régional U15",
    category: "U15",
    homeTeam: { name: "ARV Tataouine", score: 1 },
    awayTeam: { name: "E.S.B", score: 2 },
    location: "Stade Municipal, Tataouine",
    status: "finished",
    result: "loss",
  },
];

export function getNextMatch(): Match | undefined {
  return upcomingMatches[0];
}