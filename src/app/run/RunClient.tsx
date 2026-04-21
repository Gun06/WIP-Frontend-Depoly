"use client";

import dynamic from "next/dynamic";

const RunScreen = dynamic(
  () =>
    import("@/main/features/run-track/components/RunScreen").then(
      (m) => m.RunScreen,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-dvh items-center justify-center bg-run-bg text-sm text-run-muted">
        지도 불러오는 중…
      </div>
    ),
  },
);

export function RunClient() {
  return <RunScreen />;
}
