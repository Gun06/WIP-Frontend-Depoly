import Link from "next/link";
import { cn } from "@/shared/lib/utils/cn";
import { RankChange } from "@/main/features/rankings/components/common/RankChange";
import type { GroupRankItem } from "@/shared/types/domain";

const RANK_COLOR: Record<number, string> = {
  1: "text-yellow-400",
  2: "text-slate-400",
  3: "text-orange-500",
};

const TYPE_LABEL: Record<string, string> = {
  crew: "크루",
  team: "훈련팀",
};

type Props = {
  item: GroupRankItem;
};

export function GroupRankRow({ item }: Props) {
  const initial = item.name.replace(/^\[/, "").slice(0, 2);

  return (
    <Link
      href={`/groups/${item.organizationId}`}
      className="flex items-start gap-3 rounded-2xl border border-run-border bg-run-surface p-4 transition hover:border-white/10 active:scale-[0.995]"
    >
      <span
        className={cn(
          "mt-0.5 w-6 shrink-0 text-center text-base font-bold",
          RANK_COLOR[item.rank] ?? "text-white",
        )}
      >
        {item.rank}
      </span>

      {/* 아바타: 단체명 앞 2글자 */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-run-border text-xs font-bold text-white">
        {initial}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="truncate font-semibold text-white">{item.name}</span>
          {item.isMasked && (
            <span className="whitespace-nowrap text-xs text-rose-400">구독 미납</span>
          )}
        </div>
        <p className="mt-1 truncate text-xs text-run-muted">
          {TYPE_LABEL[item.type] ?? item.type} · {item.memberCount}명
        </p>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-1">
        <span className="text-sm font-bold text-white">
          {item.score.toLocaleString()}점
        </span>
        <RankChange current={item.rank} previous={item.previousRank} />
      </div>
    </Link>
  );
}
