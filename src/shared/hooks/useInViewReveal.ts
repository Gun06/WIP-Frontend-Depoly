"use client";

import { useEffect } from "react";

const SELECTOR = "[data-wip-reveal]";

/**
 * 포트폴리오 style.css 의 스크롤 리빌 패턴을 단순화.
 * 뷰포트에 들어오면 `data-visible="true"` 설정 후 unobserve.
 */
export function useInViewReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(SELECTOR);
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          (e.target as HTMLElement).dataset.visible = "true";
          io.unobserve(e.target);
        });
      },
      { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
}
