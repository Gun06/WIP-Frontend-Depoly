"use client";

import { useEffect, useState } from "react";

type ThemeMode = "dark" | "light";
const STORAGE_KEY = "wip-theme";

function setTheme(mode: ThemeMode) {
  document.documentElement.dataset.theme = mode;
}

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("dark");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const next: ThemeMode = saved === "light" ? "light" : "dark";
    setMode(next);
    setTheme(next);
  }, []);

  const isLight = mode === "light";

  return (
    <button
      type="button"
      className="wip-theme-toggle"
      onClick={() => {
        const next: ThemeMode = mode === "dark" ? "light" : "dark";
        setMode(next);
        setTheme(next);
        localStorage.setItem(STORAGE_KEY, next);
      }}
      aria-label={isLight ? "다크 모드로 전환" : "라이트 모드로 전환"}
      title={isLight ? "다크 모드" : "라이트 모드"}
    >
      {isLight ? "DARK" : "LIGHT"}
    </button>
  );
}

