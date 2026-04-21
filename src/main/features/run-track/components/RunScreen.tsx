"use client";

import { RunHud } from "./RunHud";
import { RunMap } from "./RunMap";

export function RunScreen() {
  return (
    <div className="relative min-h-dvh w-full overflow-hidden bg-run-bg">
      <header className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-center justify-between px-5 pt-[max(1rem,env(safe-area-inset-top))]">
        <div className="pointer-events-auto flex items-center gap-3">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60"
            aria-label="뒤로"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-run-muted">
              Outdoor Run
            </p>
            <p className="font-display text-lg font-semibold tracking-wide">
              오늘의 러닝
            </p>
          </div>
        </div>
        <button
          type="button"
          className="pointer-events-auto rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md transition hover:bg-black/60"
        >
          설정
        </button>
      </header>

      <RunMap />
      <RunHud />
    </div>
  );
}
