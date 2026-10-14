import React, { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import Switch from "./Switch";

type Theme = "light" | "dark";

// The inline script in _document has already set data-theme; sync state to it.
export function useTheme() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return { theme, toggle };
}

// Icon button for the desktop header.
export const ThemeToggle = () => {
  const { theme, toggle } = useTheme();
  const Icon = theme === "dark" ? SunIcon : MoonIcon;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="flex size-11 items-center justify-center rounded-full text-mute hover:text-ink">
      {theme && <Icon className="size-5" />}
    </button>
  );
};

// Labeled switch for the settings sheet.
export const DarkModeSwitch = () => {
  const { theme, toggle } = useTheme();
  return <Switch label="Dark mode" checked={theme === "dark"} onChange={toggle} className="w-full justify-between" />;
};

export default ThemeToggle;
