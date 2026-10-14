import React, { useState } from "react";
import moment from "moment";
import { EyeIcon, EyeSlashIcon, GlobeAltIcon } from "@heroicons/react/20/solid";
import TeamLogo from "./TeamLogo";
import getLink from "../data/GetLink";
import type { Game, GameTeam } from "../data/types";

interface Props {
  game: Game;
  revealAll: boolean;
}

interface TeamRowProps {
  team: GameTeam;
  shown: boolean;
  winner: boolean;
}

const TeamRow = ({ team, shown, winner }: TeamRowProps) => {
  return (
    <div className="flex min-h-11 min-w-0 items-center gap-3">
      <span className="relative block h-9 w-9 flex-none">
        <TeamLogo tricode={team.teamTricode} />
      </span>
      <span className={`min-w-0 truncate text-[17px] ${winner ? "font-bold" : "font-semibold"}`}>
        {team.teamName}
      </span>
      <span
        className={`ml-auto min-w-11 text-right text-2xl font-semibold tabular-nums ${
          shown && winner ? "text-ink" : "text-mute"
        }`}>
        {shown ? team.score : "–"}
      </span>
    </div>
  );
};

const statusLabel = (game: Game) => {
  if (game.gameStatus === 3) return "Final";
  if (game.gameStatus === 2) return game.gameStatusText;
  if (game.gameStatusText === "PPD") return "Postponed";
  return moment(game.gameDateTimeUTC).format("LT");
};

const GameCard = ({ game, revealAll }: Props) => {
  const [open, setOpen] = useState(false);
  const { gameStatus, homeTeam, awayTeam } = game;
  const canReveal = gameStatus !== 1;
  const shown = canReveal && (revealAll || open);
  const isFinal = gameStatus === 3;

  const dot =
    gameStatus === 2
      ? "animate-pulse bg-hot"
      : isFinal
        ? "bg-emerald-600"
        : "bg-mute/60";

  return (
    <article
      className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-5 rounded-3xl border border-line bg-surface px-4 pb-4 pt-1.5">
      <div className="flex min-h-11 items-center gap-2 text-xs font-semibold uppercase tracking-widest text-mute">
        <span className={`block h-2 w-2 flex-none rounded-full ${dot}`} />
        {statusLabel(game)}
      </div>

      <div className="flex items-center justify-end gap-2">
        <a
          href={getLink(game.gameId)}
          target="_blank"
          rel="noreferrer"
          aria-label="View on ESPN"
          className="flex size-8 items-center justify-center rounded-full border border-line text-mute hover:bg-track hover:text-ink">
          <GlobeAltIcon className="size-4" aria-hidden="true" />
        </a>
        {canReveal && (
          <button
            type="button"
            aria-pressed={shown}
            disabled={revealAll}
            onClick={() => setOpen(!open)}
            className="flex min-h-8 items-center gap-1.5 rounded-full border border-line px-2.5 text-xs font-semibold text-accent hover:bg-track disabled:opacity-50">
            {shown ? (
              <EyeSlashIcon className="size-3.5" aria-hidden="true" />
            ) : (
              <EyeIcon className="size-3.5" aria-hidden="true" />
            )}
            {shown ? "Hide score" : "Show score"}
          </button>
        )}
      </div>

      <div className="col-span-2 flex flex-col gap-0.5">
        <TeamRow
          team={awayTeam}
          shown={shown}
          winner={shown && isFinal && awayTeam.score > homeTeam.score}
        />
        <TeamRow
          team={homeTeam}
          shown={shown}
          winner={shown && isFinal && homeTeam.score > awayTeam.score}
        />
      </div>
    </article>
  );
};

export default GameCard;
