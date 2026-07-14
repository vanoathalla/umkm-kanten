"use client";
import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext({
  dark: false,
  toggle: () => {},
});

export const useDarkMode = () => useContext(DarkModeContext);

export default function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // Read preference: localStorage first, then system preference
    const stored = localStorage.getItem("darkMode");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldDark = stored !== null ? stored === "true" : prefersDark;
    setDark(shouldDark);
    // Apply to <html> so Tailwind's dark: classes work everywhere
    if (shouldDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggle = () => {
    setDark((prev) => {
      const next = !prev;
      localStorage.setItem("darkMode", String(next));
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  };

  // No wrapper div — dark class lives on <html>, children render normally
  return (
    <DarkModeContext.Provider value={{ dark, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
}
