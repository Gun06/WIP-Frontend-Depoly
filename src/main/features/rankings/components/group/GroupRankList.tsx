import { RankingSkeleton } from "@/main/features/rankings/components/common/RankingSkeleton";
import { GroupRankRow } from "@/main/features/rankings/components/group/GroupRankRow";
import type { GroupRankItem } from "@/shared/types/domain";

type Props = {
  items: GroupRankItem[];
  isLoading: boolean;
};

export function GroupRankList({ items, isLoading }: Props) {
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
        <GroupRankRow key={item.organizationId} item={item} />
      ))}
    </div>
  );
}
