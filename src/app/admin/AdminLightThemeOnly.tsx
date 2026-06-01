"use client";

import { useEffect } from "react";

const STORAGE_KEY = "wip-theme";

/** 관리자 영역에서는 항상 라이트 모드만 사용 */
export function AdminLightThemeOnly() {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = "light";

    const observer = new MutationObserver(() => {
      if (root.dataset.theme !== "light") {
        root.dataset.theme = "light";
      }
    });
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      observer.disconnect();
      const saved = localStorage.getItem(STORAGE_KEY);
      root.dataset.theme = saved === "dark" ? "dark" : "light";
    };
  }, []);

  return null;
}
