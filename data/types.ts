export interface GameTeam {
  teamName: string;
  teamCity: string;
  teamTricode: string;
  score: number;
}

export interface Game {
  gameId: string;
  // 1 = scheduled, 2 = in progress, 3 = final
  gameStatus: 1 | 2 | 3;
  gameStatusText: string;
  gameDateTimeUTC: string;
  homeTeam: GameTeam;
  awayTeam: GameTeam;
}
