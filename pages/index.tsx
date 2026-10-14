import React, { useEffect, useState } from "react";
import Head from "next/head";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Header, { View } from "../components/Header";
import DateStrip from "../components/DateStrip";
import DateSheet from "../components/DateSheet";
import TimezoneNote from "../components/TimezoneNote";
import DayGames from "../components/DayGames";
import FollowingView from "../components/FollowingView";
import TeamPicker from "../components/TeamPicker";
import Skeleton from "../components/Skeleton";
import { longLabel, todayKey } from "../data/DateFunctions";
import { useLocalStorage } from "../data/hooks";

function App() {
  const [date, setDate] = useState("");
  const [view, setView] = useLocalStorage<View>("view", "day");
  const [revealAll, setRevealAll] = useLocalStorage<boolean>("revealAll", false);
  const [followed, setFollowed] = useLocalStorage<string[]>("followedTeams", []);
  const [count, setCount] = useState<number | null>(null);
  const [dateSheetOpen, setDateSheetOpen] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  // Restore the last day viewed this session, otherwise today
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = sessionStorage.getItem("lastSetDay");
    } catch {}
    setDate(saved || todayKey());
  }, []);

  const changeDate = (next: string) => {
    setDate(next);
    try {
      sessionStorage.setItem("lastSetDay", next);
    } catch {}
  };

  const toggleFollow = (tricode: string) =>
    setFollowed((prev) =>
      prev.includes(tricode) ? prev.filter((t) => t !== tricode) : [...prev, tricode]
    );

  return (
    <>
      <Head>
        <title>No-Spoiler NBA Schedule</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header
        revealAll={revealAll}
        onToggleRevealAll={() => setRevealAll(!revealAll)}
        view={view}
        onChangeView={setView}
      />

      <div className="mx-auto max-w-2xl px-4 pb-16 pt-4">
        {view === "day" ? (
          date ? (
            <>
              <DateStrip date={date} onChange={changeDate} />

              <div className="flex items-baseline justify-between gap-3 pb-3 pt-5">
                <button
                  type="button"
                  onClick={() => setDateSheetOpen(true)}
                  className="-ml-1 flex min-h-11 items-center gap-1.5 rounded-xl px-1 text-left text-2xl font-bold tracking-tight md:text-3xl">
                  {longLabel(date)}
                  <ChevronDownIcon className="h-5 w-5 flex-none" aria-hidden="true" />
                </button>
                {count !== null && (
                  <span className="flex-none text-sm text-mute">
                    {count} {count === 1 ? "game" : "games"}
                  </span>
                )}
              </div>
              <TimezoneNote className="-mt-2 pb-3" />

              <DayGames
                date={date}
                revealAll={revealAll}
                followed={followed}
                onCount={setCount}
              />
            </>
          ) : (
            <Skeleton />
          )
        ) : (
          <FollowingView
            followed={followed}
            revealAll={revealAll}
            onToggleFollow={toggleFollow}
            onEditTeams={() => setPickerOpen(true)}
          />
        )}
      </div>

      {date && (
        <DateSheet
          open={dateSheetOpen}
          onClose={() => setDateSheetOpen(false)}
          selected={date}
          onSelect={changeDate}
        />
      )}
      <TeamPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        followed={followed}
        onToggleFollow={toggleFollow}
      />
    </>
  );
}

export default App;
