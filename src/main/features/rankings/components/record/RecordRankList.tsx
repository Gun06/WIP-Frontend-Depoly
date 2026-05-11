"use client";

import { useState } from "react";
import { RankingSkeleton } from "@/main/features/rankings/components/common/RankingSkeleton";
import { RecordRankRow } from "@/main/features/rankings/components/record/RecordRankRow";
import type { RecordRankItem } from "@/shared/types/domain";

const PAGE_SIZE = 20;

type Props = {
  items: RecordRankItem[];
  isLoading: boolean;
  isLoggedIn: boolean;
};

export function RecordRankList({ items, isLoading, isLoggedIn }: Props) {
  const [page, setPage] = useState(1);

  if (isLoading) return <RankingSkeleton rows={5} />;

  if (items.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-run-muted">
        아직 인증된 기록이 없습니다
      </p>
    );
  }

  const myItem = isLoggedIn ? items.find((i) => i.isMyRecord) ?? null : null;
  const displayItems = items.slice(0, page * PAGE_SIZE);
  const hasMore = items.length > page * PAGE_SIZE;

  return (
    <div className="space-y-2">
      {displayItems.map((item) => (
        <RecordRankRow
          key={item.userId ?? `anon-${item.rank}`}
          item={item}
          isMyRow={!!myItem && item.isMyRecord}
          // 내 row에 id 부여 → MyRankBar 클릭 시 스크롤 타겟
          id={myItem && item.isMyRecord ? "my-rank-row" : undefined}
        />
      ))}

      {hasMore && (
        <button
          onClick={() => setPage((p) => p + 1)}
          className="w-full rounded-2xl border border-run-border bg-run-surface py-3 text-sm text-run-muted transition hover:border-white/20 hover:text-white"
        >
          더 보기
        </button>
      )}
    </div>
  );
}
