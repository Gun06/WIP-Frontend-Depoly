import { RankingSkeleton } from "@/main/features/rankings/components/common/RankingSkeleton";
import { InfluencerRankRow } from "@/main/features/rankings/components/influencer/InfluencerRankRow";
import type { InfluencerRankItem, VoteType } from "@/shared/types/domain";

type Props = {
  items: InfluencerRankItem[];
  votes: Record<string, VoteType | null>;
  isLoading: boolean;
  onVote: (id: string, type: VoteType) => void;
};

export function InfluencerRankList({ items, votes, isLoading, onVote }: Props) {
  if (isLoading) return <RankingSkeleton rows={5} />;

  if (items.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-run-muted">
        랭킹 데이터가 없습니다
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <InfluencerRankRow
          key={item.influencerId}
          item={item}
          myVote={votes[item.influencerId] ?? null}
          onVote={onVote}
        />
      ))}
    </div>
  );
}
