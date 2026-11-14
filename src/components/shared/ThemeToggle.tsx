"use client";

import { Moon, Sun } from "lucide-react";

const THEME_STORAGE_KEY = "gadget-grove-theme";

export default function ThemeToggle() {
  function toggleTheme() {
    const root = document.documentElement;
    const isDark =
      root.classList.contains("dark") ||
      (!root.classList.contains("light") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    const nextTheme = isDark ? "light" : "dark";

    root.classList.toggle("dark", nextTheme === "dark");
    root.classList.toggle("light", nextTheme === "light");

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch (error) {
      console.error("Could not save the Gadget Grove theme preference.", error);
    }
  }

  return (
    <button
      aria-label="Toggle light and dark theme"
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-text-primary transition-colors hover:bg-surface-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:size-10"
      onClick={toggleTheme}
      title="Toggle light and dark theme"
      type="button"
    >
      <Moon aria-hidden="true" className="size-4 dark:hidden" />
      <Sun aria-hidden="true" className="hidden size-4 dark:block" />
    </button>
  );
}
