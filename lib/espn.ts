import type { Game } from "../data/types";

export const SCOREBOARD =
  "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard";
export const TEAMS_BASE =
  "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams";

// ESPN abbreviations that differ from the NBA tricodes used for team logos
const tricodeMap: Record<string, string> = {
  GS: "GSW",
  NY: "NYK",
  NO: "NOP",
  SA: "SAS",
  UTAH: "UTA",
  WSH: "WAS",
};

// NBA tricodes that ESPN's team endpoints don't accept as-is
const espnCodeMap: Record<string, string> = {
  NOP: "no",
  UTA: "utah",
};

export const espnCode = (tricode: string) =>
  espnCodeMap[tricode] ?? tricode.toLowerCase();

const statusMap: Record<string, 1 | 2 | 3> = {
  pre: 1,
  in: 2,
  post: 3,
};

// Scoreboard scores are strings, team schedule scores are { value, displayValue }
const scoreOf = (score: any) => {
  const raw = score && typeof score === "object" ? score.value : score;
  return Number(raw ?? 0) || 0;
};

const normalizeTeam = (competitor: any) => ({
  teamName: competitor.team.name ?? competitor.team.shortDisplayName,
  teamCity: competitor.team.location,
  teamTricode:
    tricodeMap[competitor.team.abbreviation] ?? competitor.team.abbreviation,
  score: scoreOf(competitor.score),
});

export const normalizeEvent = (event: any): Game => {
  const comp = event.competitions[0];
  const home = comp.competitors.find((c) => c.homeAway === "home");
  const away = comp.competitors.find((c) => c.homeAway === "away");
  const type = (event.status ?? comp.status).type;
  const postponed = type.name === "STATUS_POSTPONED";
  return {
    gameId: event.id,
    gameStatus: statusMap[type.state] ?? 1,
    gameStatusText: postponed ? "PPD" : type.shortDetail,
    gameDateTimeUTC: event.date,
    homeTeam: normalizeTeam(home),
    awayTeam: normalizeTeam(away),
  };
};
