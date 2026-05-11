import { cn } from "@/shared/lib/utils/cn";

const MAX_VISIBLE = 3;

const BADGE_STYLE: Record<string, string> = {
  Sub3: "border-run-volt/40 bg-run-volt/15 text-run-volt",
  인증: "border-blue-500/40 bg-blue-500/15 text-blue-400",
  풀완주: "border-emerald-500/40 bg-emerald-500/15 text-emerald-400",
  "10K 40분": "border-purple-500/40 bg-purple-500/15 text-purple-400",
};

const DEFAULT_STYLE = "border-white/20 bg-white/10 text-white/60";

type Props = {
  badges: string[];
};

export function RankBadges({ badges }: Props) {
  if (badges.length === 0) return null;

  const visible = badges.slice(0, MAX_VISIBLE);
  const extra = badges.length - MAX_VISIBLE;

  return (
    <div className="flex flex-wrap gap-1">
      {visible.map((b) => (
        <span
          key={b}
          className={cn(
            "rank-badge rounded-full border px-2 py-0.5 text-xs font-medium",
            BADGE_STYLE[b] ?? DEFAULT_STYLE,
          )}
        >
          {b}
        </span>
      ))}
      {extra > 0 && (
        <span className={cn("rank-badge rounded-full border px-2 py-0.5 text-xs font-medium", DEFAULT_STYLE)}>
          +{extra}
        </span>
      )}
    </div>
  );
}
