export function RankingSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl border border-run-border bg-run-surface p-4"
        >
          <div className="flex items-center gap-4">
            <div className="h-5 w-5 rounded bg-run-border" />
            <div className="h-10 w-10 rounded-full bg-run-border" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-1/3 rounded bg-run-border" />
              <div className="h-3 w-1/2 rounded bg-run-border" />
            </div>
            <div className="h-4 w-16 rounded bg-run-border" />
          </div>
        </div>
      ))}
    </div>
  );
}
