"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type ThemeMode = "dark" | "light";
const STORAGE_KEY = "wip-theme";

function setTheme(mode: ThemeMode) {
  const root = document.documentElement;
  root.classList.add("no-transition");
  root.dataset.theme = mode;
  // reflow 강제 후 다음 프레임에 transition 복원
  void root.getBoundingClientRect();
  requestAnimationFrame(() => {
    root.classList.remove("no-transition");
  });
}

export function ThemeToggle() {
  const pathname = usePathname();
  const [mode, setMode] = useState<ThemeMode>("light");

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;
    const saved = localStorage.getItem(STORAGE_KEY);
    const next: ThemeMode = saved === "dark" ? "dark" : "light";
    setMode(next);
    setTheme(next);
  }, [pathname]);

  const isLight = mode === "light";

  if (pathname?.startsWith("/admin")) {
    return null;
  }

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

