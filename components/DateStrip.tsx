import React from "react";
import moment from "moment";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { DATE_FORMAT, addDays, todayKey } from "../data/DateFunctions";

interface Props {
  date: string;
  onChange: (date: string) => void;
}

const arrow =
  "hidden h-11 w-11 flex-none items-center justify-center rounded-full border border-line bg-surface text-ink hover:bg-track md:flex";

// Seven days centered on the selected one
const DateStrip = ({ date, onChange }: Props) => {
  const today = todayKey();
  const days = [-3, -2, -1, 0, 1, 2, 3].map((n) => addDays(date, n));

  return (
    <nav aria-label="Choose a day" className="flex items-center gap-2">
      <button
        type="button"
        aria-label="Previous day"
        onClick={() => onChange(addDays(date, -1))}
        className={arrow}>
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <div className="flex flex-1 gap-1.5 md:gap-2">
        {days.map((day) => {
          const m = moment(day, DATE_FORMAT);
          const selected = day === date;
          return (
            <button
              key={day}
              type="button"
              aria-pressed={selected}
              aria-label={m.format("dddd, MMMM D")}
              onClick={() => onChange(day)}
              className={`flex min-h-16 min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl border transition-colors ${
                selected
                  ? "border-accent bg-accent text-on-accent"
                  : "border-line bg-surface hover:bg-track"
              }`}>
              <span className="text-[9px] md:text-[11px] font-semibold uppercase tracking-wider opacity-80">
                {m.format("ddd")}
              </span>
              <span className="text-sm md:text-lg font-bold tabular-nums">{m.format("D")}</span>
              <span
                className={`h-1 w-1 rounded-full ${
                  day === today
                    ? selected
                      ? "bg-on-accent"
                      : "bg-accent"
                    : "bg-transparent"
                }`}
              />
            </button>
          );
        })}
      </div>
      <button
        type="button"
        aria-label="Next day"
        onClick={() => onChange(addDays(date, 1))}
        className={arrow}>
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </nav>
  );
};

export default DateStrip;
