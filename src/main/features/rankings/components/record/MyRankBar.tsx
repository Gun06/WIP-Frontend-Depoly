import { RankChange } from "@/main/features/rankings/components/common/RankChange";
import type { MyRecordRank } from "@/shared/types/domain";

type Props = {
  myRank: MyRecordRank;
  onScrollToRow: () => void;
};

export function MyRankBar({ myRank, onScrollToRow }: Props) {
  return (
    <button
      onClick={onScrollToRow}
      className="my-rank-bar group flex w-full items-center gap-3 rounded-2xl border border-run-volt/30 bg-run-volt/10 px-4 py-3 transition hover:brightness-105 active:scale-[0.99]"
    >
      <span className="shrink-0 text-xs text-run-muted">내 순위</span>
      <span className="my-rank-volt font-bold text-run-volt">{myRank.rank}위</span>
      <span className="font-mono text-sm font-semibold text-white">{myRank.record}</span>
      <div className="ml-auto">
        <RankChange current={myRank.rank} previous={myRank.previousRank} />
      </div>
    </button>
  );
}
