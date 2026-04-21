"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-run-bg px-4 text-center">
      <p className="font-display text-2xl font-bold text-white">문제가 발생했습니다</p>
      <p className="max-w-md text-sm text-run-muted">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-run-volt px-6 py-2 text-sm font-semibold text-black"
      >
        다시 시도
      </button>
    </div>
  );
}
