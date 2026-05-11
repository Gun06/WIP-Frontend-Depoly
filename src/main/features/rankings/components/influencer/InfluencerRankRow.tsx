"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/shared/lib/utils/cn";
import { RankAvatar } from "@/main/features/rankings/components/common/RankAvatar";
import type { InfluencerRankItem, VoteType } from "@/shared/types/domain";

const RANK_COLOR: Record<number, string> = {
  1: "text-yellow-400",
  2: "text-slate-400",
  3: "text-orange-500",
};

function formatCount(n: number): string {
  if (n >= 10000) {
    const man = n / 10000;
    return `${man % 1 === 0 ? man : man.toFixed(1)}만`;
  }
  return n.toLocaleString();
}

type Props = {
  item: InfluencerRankItem;
  myVote: VoteType | null;
  onVote: (id: string, type: VoteType) => void;
};

export function InfluencerRankRow({ item, myVote, onVote }: Props) {
  const router = useRouter();
  const upCount = item.upCount + (myVote === "up" && !item.myVote ? 1 : 0);
  const downCount = item.downCount + (myVote === "down" && !item.myVote ? 1 : 0);

  const voteButtons = (
    <div className="flex items-center gap-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onVote(item.influencerId, "up");
        }}
        className={cn(
          "flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold transition active:scale-95",
          myVote === "up"
            ? "border-emerald-500 bg-emerald-500 text-white"
            : "border-emerald-500/40 bg-transparent text-emerald-400 hover:border-emerald-500 hover:bg-emerald-500/10",
        )}
      >
        ▲ <span>{formatCount(upCount)}</span>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onVote(item.influencerId, "down");
        }}
        className={cn(
          "flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold transition active:scale-95",
          myVote === "down"
            ? "border-rose-500 bg-rose-500 text-white"
            : "border-rose-500/40 bg-transparent text-rose-400 hover:border-rose-500 hover:bg-rose-500/10",
        )}
      >
        ▼ <span>{formatCount(downCount)}</span>
      </button>
    </div>
  );

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => router.push(`/influencers/${item.influencerId}`)}
      onKeyDown={(e) => e.key === "Enter" && router.push(`/influencers/${item.influencerId}`)}
      className="cursor-pointer rounded-2xl border border-run-border bg-run-surface p-4 transition hover:border-white/10 active:scale-[0.995]"
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "w-6 shrink-0 text-center text-base font-bold",
            RANK_COLOR[item.rank] ?? "text-white",
          )}
        >
          {item.rank}
        </span>

        <RankAvatar nickname={item.name} />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="truncate font-semibold text-white">{item.name}</span>
            {item.isMasked && (
              <span className="whitespace-nowrap text-xs text-rose-400">구독 미납</span>
            )}
          </div>
          <p className="mt-1 truncate text-xs text-run-muted">
            {item.platform} · {formatCount(item.subscriberCount)} 구독자
          </p>
        </div>

        {/* 데스크탑: 오른쪽 인라인 */}
        <div className="hidden shrink-0 sm:flex">
          {voteButtons}
        </div>
      </div>

      {/* 모바일: 아랫줄 */}
      <div className="mt-3 flex justify-end pl-9 sm:hidden">
        {voteButtons}
      </div>
    </div>
  );
}
