import Link from "next/link";
import { cn } from "@/shared/lib/utils/cn";
import { RankAvatar } from "@/main/features/rankings/components/common/RankAvatar";
import { RankBadges } from "@/main/features/rankings/components/common/RankBadges";
import { RankChange } from "@/main/features/rankings/components/common/RankChange";
import type { RecordRankItem } from "@/shared/types/domain";

const RANK_COLOR: Record<number, string> = {
  1: "text-yellow-400",
  2: "text-slate-400",
  3: "text-orange-500",
};

type Props = {
  item: RecordRankItem;
  isMyRow?: boolean;
  id?: string;
};

export function RecordRankRow({ item, isMyRow, id }: Props) {
  const href = item.isAnonymous || item.userId === null
    ? "/profile/anonymous"
    : `/profile/${item.userId}`;

  const inner = (
    <>
      <span
        className={cn(
          "mt-0.5 w-6 shrink-0 text-center text-base font-bold",
          RANK_COLOR[item.rank] ?? "text-white",
        )}
      >
        {item.rank}
      </span>

      <RankAvatar nickname={item.nickname} isAnonymous={item.isAnonymous} />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-white">{item.nickname}</span>
          <RankBadges badges={item.badges} />
        </div>
        <p className="mt-1 truncate text-xs text-run-muted">
          {item.eventName} {item.eventYear} · {item.gender === "M" ? "남" : "여"}
        </p>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-1">
        <span className="font-mono text-sm font-semibold text-white">{item.record}</span>
        <RankChange current={item.rank} previous={item.previousRank} />
      </div>
    </>
  );

  const baseClass = cn(
    "flex items-start gap-3 rounded-2xl border p-4 transition hover:border-white/10 active:scale-[0.995] cursor-pointer",
    isMyRow
      ? "border-blue-500/40 bg-blue-500/10"
      : "border-run-border bg-run-surface",
  );

  return (
    <Link id={id} href={href} className={baseClass}>
      {inner}
    </Link>
  );
}
