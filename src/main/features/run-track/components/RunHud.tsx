import {
  MOCK_DISTANCE_KM,
  MOCK_DURATION,
  MOCK_PACE,
} from "../lib/mockRoute";

export function RunHud() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20">
      <div className="pointer-events-auto bg-gradient-to-t from-run-bg via-run-bg/95 to-transparent px-5 pb-10 pt-24">
        <div className="mx-auto max-w-md">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-run-muted">
                거리
              </p>
              <p className="font-display text-6xl font-bold leading-none tracking-tight text-white tabular-nums">
                {MOCK_DISTANCE_KM.toFixed(2)}
                <span className="ml-1 text-2xl font-semibold text-run-muted">
                  km
                </span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-run-muted">
                시간
              </p>
              <p className="font-display text-3xl font-semibold tabular-nums text-run-volt">
                {MOCK_DURATION}
              </p>
            </div>
          </div>

          <div className="mb-8 flex items-center justify-between rounded-2xl border border-run-border bg-run-surface/80 px-4 py-3 backdrop-blur-md">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-run-muted">
                평균 페이스
              </p>
              <p className="font-display text-lg font-medium tabular-nums">
                {MOCK_PACE}
              </p>
            </div>
            <div className="h-10 w-px bg-run-border" />
            <div className="text-right">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-run-muted">
                칼로리
              </p>
              <p className="font-display text-lg font-medium tabular-nums">312</p>
            </div>
          </div>

          <button
            type="button"
            className="flex w-full items-center justify-center rounded-full bg-run-volt py-4 text-base font-semibold uppercase tracking-widest text-black shadow-[0_0_40px_rgba(223,255,79,0.25)] transition hover:brightness-110 active:scale-[0.99]"
          >
            시작
          </button>
        </div>
      </div>
    </div>
  );
}
