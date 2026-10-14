import React from "react";
import { CheckIcon } from "@heroicons/react/20/solid";
import Sheet from "./Sheet";
import TeamLogo from "./TeamLogo";
import teams from "../data/teams";

interface Props {
  open: boolean;
  onClose: () => void;
  followed: string[];
  onToggleFollow: (tricode: string) => void;
}

const TeamPicker = ({ open, onClose, followed, onToggleFollow }: Props) => (
  <Sheet open={open} onClose={onClose} label="Choose teams">
    <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-line md:hidden" />
    <div className="flex items-center justify-between gap-3">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Choose teams</h2>
        <div className="text-[13px] text-mute">
          {followed.length === 0 ? "Tap a team to follow it" : `${followed.length} following`}
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="min-h-11 rounded-full bg-accent px-5 text-sm font-bold text-on-accent">
        Done
      </button>
    </div>

    <div className="-mx-1 mt-3 grid max-h-[60dvh] grid-cols-3 gap-2.5 overflow-y-auto p-1">
      {teams.map((team) => {
        const on = followed.includes(team.tricode);
        return (
          <button
            key={team.tricode}
            type="button"
            aria-pressed={on}
            onClick={() => onToggleFollow(team.tricode)}
            className={`relative flex min-h-26 flex-col items-center justify-center gap-2 rounded-2xl border-2 px-1 py-2.5 ${
              on ? "border-accent" : "border-line hover:bg-track"
            }`}>
            <span className="relative block h-11 w-11">
              <TeamLogo tricode={team.tricode} />
            </span>
            <span className="text-center text-[13px] font-semibold leading-tight">
              {team.name}
            </span>
            {on && (
              <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-on-accent">
                <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            )}
          </button>
        );
      })}
    </div>
  </Sheet>
);

export default TeamPicker;
