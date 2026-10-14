import React, { useEffect, useState } from "react";
import axios from "axios";
import GameCard from "./GameCard";
import Skeleton from "./Skeleton";
import { localDayOf } from "../data/DateFunctions";
import type { Game } from "../data/types";

interface Props {
  date: string;
  revealAll: boolean;
  followed: string[];
  onCount: (count: number | null) => void;
}

const DayGames = ({ date, revealAll, followed, onCount }: Props) => {
  const [games, setGames] = useState<Game[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setGames(null);
    onCount(null);

    const fetchGames = async () => {
      try {
        const res = await axios.get<Game[]>("/api/getgames", { params: { date } });
        if (cancelled) return;
        // The API returns neighbouring schedule days too; keep the local day
        const day = res.data.filter((g) => localDayOf(g.gameDateTimeUTC) === date);
        setGames(day);
        setFailed(false);
        onCount(day.length);
      } catch {
        if (cancelled) return;
        setGames((prev) => prev ?? []);
        setFailed(true);
      }
    };

    fetchGames();
    // Refresh scores periodically
    const timer = setInterval(fetchGames, 15000);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
    // eslint-disable-next-line
  }, [date]);

  if (games === null) return <Skeleton />;

  if (games.length === 0) {
    return (
      <p className="py-12 text-center text-mute">
        {failed ? "Unable to load games. Please try again." : "No games on this day"}
      </p>
    );
  }

  // Games with a followed team first
  const involves = (g: Game) =>
    followed.includes(g.homeTeam.teamTricode) || followed.includes(g.awayTeam.teamTricode);
  const sorted = [...games].sort((a, b) => Number(involves(b)) - Number(involves(a)));

  return (
    <div className="flex flex-col gap-3">
      {sorted.map((game) => (
        <GameCard
          key={game.gameId}
          game={game}
          revealAll={revealAll}
        />
      ))}
    </div>
  );
};

export default DayGames;
