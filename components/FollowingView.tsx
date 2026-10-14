import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import GameCard from "./GameCard";
import Skeleton from "./Skeleton";
import TeamLogo from "./TeamLogo";
import TimezoneNote from "./TimezoneNote";
import { groupLabel, localDayOf } from "../data/DateFunctions";
import { teamByTricode } from "../data/teams";
import type { Game } from "../data/types";

interface Props {
  followed: string[];
  revealAll: boolean;
  onToggleFollow: (tricode: string) => void;
  onEditTeams: () => void;
}

type Tab = "upcoming" | "recent";

const MAX_GAMES_PER_TEAM = 8;

const FollowingView = ({ followed, revealAll, onToggleFollow, onEditTeams }: Props) => {
  const [tab, setTab] = useState<Tab>("upcoming");
  const [games, setGames] = useState<Game[] | null>(null);
  const [failed, setFailed] = useState(false);
  const key = followed.join(",");

  useEffect(() => {
    if (!key) {
      setGames([]);
      return;
    }
    let cancelled = false;

    const fetchGames = async () => {
      try {
        const res = await axios.get<Game[]>("/api/getteamgames", { params: { teams: key } });
        if (cancelled) return;
        setGames(res.data);
        setFailed(false);
      } catch {
        if (cancelled) return;
        setGames((prev) => prev ?? []);
        setFailed(true);
      }
    };

    fetchGames();
    const timer = setInterval(fetchGames, 60000);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [key]);

  // Only the teams that are currently followed, grouped by local date
  const groups = useMemo(() => {
    if (!games) return [];
    const mine = games.filter(
      (g) => followed.includes(g.homeTeam.teamTricode) || followed.includes(g.awayTeam.teamTricode)
    );
    const upcoming = tab === "upcoming";
    const inTab = mine.filter((g) => (g.gameStatus !== 3) === upcoming);

    // Cap per followed team, so the window doesn't shrink as more teams are added
    const keep = new Set<string>();
    followed.forEach((tricode) => {
      const teamGames = inTab.filter(
        (g) => g.homeTeam.teamTricode === tricode || g.awayTeam.teamTricode === tricode
      );
      (upcoming ? teamGames.slice(0, MAX_GAMES_PER_TEAM) : teamGames.slice(-MAX_GAMES_PER_TEAM)).forEach(
        (g) => keep.add(g.gameId)
      );
    });
    const kept = inTab.filter((g) => keep.has(g.gameId));
    const list = upcoming ? kept : kept.reverse();

    const byDay = new Map<string, Game[]>();
    list.forEach((g) => {
      const day = localDayOf(g.gameDateTimeUTC);
      byDay.set(day, [...(byDay.get(day) ?? []), g]);
    });
    return Array.from(byDay.entries()).map(([day, dayGames]) => ({
      day,
      label: groupLabel(day),
      games: dayGames,
    }));
  }, [games, followed, tab]);

  return (
    <div>
      {/* Followed teams */}
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {followed.map((tricode) => {
          const team = teamByTricode(tricode);
          if (!team) return null;
          return (
            <button
              key={tricode}
              type="button"
              aria-label={`Unfollow ${team.city} ${team.name}`}
              onClick={() => onToggleFollow(tricode)}
              className="flex min-h-11 flex-none items-center gap-2 rounded-full border border-line bg-surface py-0 pl-1.5 pr-3 text-sm font-semibold hover:bg-track">
              <span className="relative block h-8 w-8">
                <TeamLogo tricode={tricode} />
              </span>
              {team.name}
              <XMarkIcon className="h-3.5 w-3.5 text-mute" aria-hidden="true" />
            </button>
          );
        })}
        <button
          type="button"
          onClick={onEditTeams}
          className="flex min-h-11 flex-none items-center gap-1.5 rounded-full border border-dashed border-mute px-3.5 text-sm font-semibold text-accent">
          <PlusIcon className="h-3.5 w-3.5" aria-hidden="true" />
          {followed.length === 0 ? "Choose teams" : "Edit teams"}
        </button>
      </div>

      {followed.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-mute px-5 py-8 text-center">
          <div className="text-lg font-bold">No teams followed</div>
          <p className="mb-5 mt-2 text-sm leading-relaxed text-mute">
            Follow a team to see its schedule here, with scores hidden until you want them.
          </p>
          <button
            type="button"
            onClick={onEditTeams}
            className="min-h-12 rounded-full bg-accent px-6 text-[15px] font-bold text-on-accent">
            Choose teams
          </button>
        </div>
      ) : (
        <>
          {/* Upcoming | Recent */}
          <div className="mt-3 flex gap-5">
            {(["upcoming", "recent"] as Tab[]).map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={tab === t}
                onClick={() => setTab(t)}
                className={`min-h-11 border-b-2 text-base font-bold capitalize ${
                  tab === t ? "border-accent text-ink" : "border-transparent text-mute"
                }`}>
                {t}
              </button>
            ))}
          </div>

          <TimezoneNote className="mt-2" />

          <div className="mt-3">
            {games === null ? (
              <Skeleton />
            ) : groups.length === 0 ? (
              <p className="py-12 text-center text-mute">
                {failed
                  ? "Unable to load games. Please try again."
                  : tab === "upcoming"
                    ? "No upcoming games"
                    : "No recent games"}
              </p>
            ) : (
              <div className="flex flex-col gap-5">
                {groups.map((group) => (
                  <section key={group.day} className="flex flex-col gap-2.5">
                    <h2 className="pt-1.5 text-[13px] font-bold uppercase tracking-widest text-mute">
                      {group.label}
                    </h2>
                    {group.games.map((game) => (
                      <GameCard
                        key={game.gameId}
                        game={game}
                        revealAll={revealAll}
                      />
                    ))}
                  </section>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FollowingView;
