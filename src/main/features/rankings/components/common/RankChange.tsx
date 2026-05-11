import { cn } from "@/shared/lib/utils/cn";

type Props = {
  current: number;
  previous: number | null;
  className?: string;
};

export function RankChange({ current, previous, className }: Props) {
  if (previous === null) {
    return (
      <span className={cn("text-xs font-medium text-run-muted", className)}>
        NEW
      </span>
    );
  }

  const diff = previous - current;

  if (diff > 0) {
    return (
      <span className={cn("text-xs font-medium text-emerald-400", className)}>
        ▲ {diff}
      </span>
    );
  }

  if (diff < 0) {
    return (
      <span className={cn("text-xs font-medium text-rose-400", className)}>
        ▼ {Math.abs(diff)}
      </span>
    );
  }

  return (
    <span className={cn("text-xs font-medium text-run-muted", className)}>
      — 유지
    </span>
  );
}
