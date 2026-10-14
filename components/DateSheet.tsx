import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Sheet from "./Sheet";
import { DATE_FORMAT, localDaysForScheduleDay, todayKey } from "../data/DateFunctions";

interface Props {
  open: boolean;
  onClose: () => void;
  selected: string;
  onSelect: (date: string) => void;
}

const nav =
  "flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink hover:bg-track";

const DateSheet = ({ open, onClose, selected, onSelect }: Props) => {
  const [month, setMonth] = useState(() => moment(selected, DATE_FORMAT));
  const [pending, setPending] = useState(selected);
  const [gameDays, setGameDays] = useState<Set<string>>(new Set());

  // Start from the selected day every time the sheet opens
  useEffect(() => {
    if (open) {
      setMonth(moment(selected, DATE_FORMAT));
      setPending(selected);
    }
  }, [open, selected]);

  // Which days have games, for the dots
  useEffect(() => {
    if (!open || gameDays.size > 0) return;
    axios
      .get<string[]>("/api/getcalendar")
      .then((res) => setGameDays(new Set(res.data.flatMap(localDaysForScheduleDay))))
      .catch(() => {});
  }, [open, gameDays.size]);

  const today = todayKey();
  const first = month.clone().startOf("month");
  const blanks = Array.from({ length: first.day() });
  const days = Array.from({ length: month.daysInMonth() }, (_, i) =>
    first.clone().add(i, "days").format(DATE_FORMAT)
  );

  const confirm = (date: string) => {
    onSelect(date);
    onClose();
  };

  return (
    <Sheet open={open} onClose={onClose} label="Pick a date">
      <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-line md:hidden" />

      <div className="flex items-center justify-between gap-2 pb-2">
        <button
          type="button"
          aria-label="Previous month"
          onClick={() => setMonth(month.clone().subtract(1, "month"))}
          className={nav}>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <h2 className="text-lg font-bold tracking-tight">{month.format("MMMM YYYY")}</h2>
        <button
          type="button"
          aria-label="Next month"
          onClick={() => setMonth(month.clone().add(1, "month"))}
          className={nav}>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="grid grid-cols-7 pb-1 text-center text-[11px] font-semibold uppercase tracking-wider text-mute">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-0.5">
        {blanks.map((_, i) => (
          <div key={`b${i}`} />
        ))}
        {days.map((day) => {
          const sel = day === pending;
          const hasGames = gameDays.has(day);
          return (
            <div key={day} className="flex justify-center">
              <button
                type="button"
                aria-pressed={sel}
                aria-label={`${moment(day, DATE_FORMAT).format("MMMM D")}${
                  hasGames ? ", games scheduled" : ""
                }`}
                onClick={() => setPending(day)}
                className={`flex h-11.5 w-11 flex-col items-center justify-center gap-0.5 rounded-2xl border-[1.5px] text-base font-semibold tabular-nums transition-colors ${
                  sel
                    ? "border-accent bg-accent text-on-accent"
                    : day === today
                      ? "border-accent"
                      : "border-transparent hover:bg-track"
                } ${!sel && !hasGames ? "text-mute" : ""}`}>
                {moment(day, DATE_FORMAT).format("D")}
                <span
                  className={`h-1 w-1 rounded-full ${
                    hasGames ? (sel ? "bg-on-accent" : "bg-accent") : "bg-transparent"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 px-1 pb-3 pt-2.5 text-xs text-mute">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        Days with games
      </div>

      <div className="flex gap-2.5">
        <button
          type="button"
          onClick={() => confirm(today)}
          className="min-h-12 flex-1 rounded-full border border-line text-[15px] font-semibold hover:bg-track">
          Today
        </button>
        <button
          type="button"
          onClick={() => confirm(pending)}
          className="min-h-12 flex-[2] rounded-full bg-accent text-[15px] font-bold text-on-accent">
          Show {moment(pending, DATE_FORMAT).format("MMM D")}
        </button>
      </div>
    </Sheet>
  );
};

export default DateSheet;
