import React, { useState } from "react";
import { Cog6ToothIcon } from "@heroicons/react/20/solid";
import ThemeToggle, { DarkModeSwitch } from "./ThemeToggle";
import Switch from "./Switch";
import Sheet from "./Sheet";

export type View = "day" | "following";

interface Props {
  revealAll: boolean;
  onToggleRevealAll: () => void;
  view: View;
  onChangeView: (view: View) => void;
}

const views: { id: View; label: string }[] = [
  { id: "day", label: "Day" },
  { id: "following", label: "Following" },
];

const Header = ({ revealAll, onToggleRevealAll, view, onChangeView }: Props) => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-canvas/90 backdrop-blur">
      <div className="mx-auto max-w-2xl px-4 pb-3 pt-2">
        <div className="flex items-center justify-between gap-3">
          <div className="text-lg font-bold tracking-tight">
            NoSpoil<span className="text-hot">NBA</span>
          </div>

          {/* Desktop: controls inline */}
          <div className="hidden items-center gap-1 sm:flex">
            <ThemeToggle />
            <Switch
              label="Show all scores"
              checked={revealAll}
              onChange={onToggleRevealAll}
              className="text-mute"
            />
          </div>

          {/* Mobile: controls tucked into a settings sheet */}
          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            aria-label="Settings"
            className="flex size-11 items-center justify-center rounded-full text-mute hover:text-ink sm:hidden">
            <Cog6ToothIcon className="size-5" aria-hidden="true" />
          </button>
        </div>
        <div
          role="group"
          aria-label="View"
          className="mt-1 flex rounded-full bg-track p-1">
          {views.map((v) => (
            <button
              key={v.id}
              type="button"
              aria-pressed={view === v.id}
              onClick={() => onChangeView(v.id)}
              className={`min-h-10 flex-1 rounded-full text-sm font-semibold transition-colors ${
                view === v.id
                  ? "bg-surface text-ink shadow-sm"
                  : "text-mute hover:text-ink"
              }`}>
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <Sheet open={settingsOpen} onClose={() => setSettingsOpen(false)} label="Settings">
        <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-line md:hidden" />
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold tracking-tight">Settings</h2>
          <button
            type="button"
            onClick={() => setSettingsOpen(false)}
            className="min-h-11 rounded-full bg-accent px-5 text-sm font-bold text-on-accent">
            Done
          </button>
        </div>
        <div className="mt-2 flex flex-col divide-y divide-line">
          <DarkModeSwitch />
          <Switch
            label="Show all scores"
            checked={revealAll}
            onChange={onToggleRevealAll}
            className="w-full justify-between"
          />
        </div>
      </Sheet>
    </header>
  );
};

export default Header;
