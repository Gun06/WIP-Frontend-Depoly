"use client";

import { useEffect, useState } from "react";
import { PillFilter } from "@/main/features/rankings/components/common/PillFilter";
import { InfluencerRankList } from "@/main/features/rankings/components/influencer/InfluencerRankList";
import { MOCK_INFLUENCER_RANKINGS } from "@/shared/lib/mocks/rankings";
import type { RankPeriod, VoteType } from "@/shared/types/domain";

const PERIOD_OPTIONS = [
  { value: "week", label: "이번 주" },
  { value: "lastweek", label: "지난 주" },
  { value: "month", label: "월간" },
] as const;

type Props = {
  isLoggedIn: boolean;
};

export function InfluencerRankingPanel({ isLoggedIn }: Props) {
  const [period, setPeriod] = useState<RankPeriod>("week");
  const [isLoading, setIsLoading] = useState(false);
  const [loginToast, setLoginToast] = useState(false);

  const [votes, setVotes] = useState<Record<string, VoteType | null>>(() =>
    Object.fromEntries(
      MOCK_INFLUENCER_RANKINGS.map((i) => [i.influencerId, i.myVote]),
    ),
  );

  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(t);
  }, [period]);

  function handleVote(id: string, type: VoteType) {
    if (!isLoggedIn) {
      setLoginToast(true);
      setTimeout(() => setLoginToast(false), 3000);
      return;
    }

    setVotes((prev) => {
      const current = prev[id];
      // 같은 버튼 다시 누르면 취소
      return { ...prev, [id]: current === type ? null : type };
    });

    // 실제 API: POST /api/ranking/influencer/:id/vote { type }
  }

  return (
    <div className="space-y-5">
      <PillFilter
        options={PERIOD_OPTIONS}
        value={period}
        onChange={(v) => setPeriod(v as RankPeriod)}
      />

      <p className="text-xs text-run-muted">
        마음에 드는 러닝 인플루언서에게 투표하세요.{" "}
        <span className="text-emerald-400">▲</span> 좋아요 ·{" "}
        <span className="text-rose-400">▼</span> 별로예요 · 매주 월요일 집계
      </p>

      <InfluencerRankList
        items={MOCK_INFLUENCER_RANKINGS}
        votes={votes}
        isLoading={isLoading}
        onVote={handleVote}
      />

      {loginToast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-run-border bg-run-surface px-5 py-2.5 text-sm text-white shadow-xl">
          로그인 후 투표할 수 있습니다
        </div>
      )}
    </div>
  );
}
