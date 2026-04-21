"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useInViewReveal } from "@/shared/hooks/useInViewReveal";
import { HomeScrollSections } from "./HomeScrollSections";
import { LandingFloatingNav } from "./LandingFloatingNav";
import { RankingOverlayPanel } from "./RankingOverlayPanel";

const HomeFullscreenMap = dynamic(
  () =>
    import("./HomeFullscreenMap").then((m) => m.HomeFullscreenMap),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-run-bg" /> },
);

export function HomeExperience() {
  useInViewReveal();
  const [showScrollCue, setShowScrollCue] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      setShowScrollCue(y < vh * 0.45);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="pointer-events-auto absolute inset-0">
          <HomeFullscreenMap />
        </div>
        {/* 오른쪽 랭킹이 읽히도록 좌측은 밝게, 우측으로 갈수록 딤 */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/88 via-black/35 to-black/15"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-0 flex flex-col justify-end md:flex-row md:items-center md:justify-end">
          <div className="hidden flex-1 md:block" aria-hidden />
          <div className="pointer-events-auto w-full max-w-[min(100%,420px)] shrink-0 self-end p-4 pb-8 pt-[5.5rem] md:max-w-[min(100%,400px)] md:self-auto md:p-0 md:pr-6 lg:pr-10">
            <RankingOverlayPanel />
          </div>
        </div>

        {showScrollCue ? (
          <div
            className="pointer-events-none fixed bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 transition-opacity duration-700 md:bottom-10"
            aria-hidden
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/45">
              Scroll to explore
            </span>
            <span className="relative h-12 w-px overflow-hidden bg-white/12">
              <span className="wip-scroll-bar" />
            </span>
          </div>
        ) : null}
      </div>

      <LandingFloatingNav />

      <div className="h-[100dvh] shrink-0" aria-hidden />

      <div className="relative z-10">
        <HomeScrollSections />
      </div>
    </>
  );
}
