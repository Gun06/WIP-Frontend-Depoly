"use client";

import { useState } from "react";
import { RankingTabs } from "@/main/features/rankings/components/RankingTabs";
import { RecordRankingPanel } from "@/main/features/rankings/components/record/RecordRankingPanel";
import { InfluencerRankingPanel } from "@/main/features/rankings/components/influencer/InfluencerRankingPanel";
import { GroupRankingPanel } from "@/main/features/rankings/components/group/GroupRankingPanel";
import type { TabId } from "@/main/features/rankings/components/RankingTabs";

type Props = {
  isLoggedIn: boolean;
};

export function RankingScreen({ isLoggedIn }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>("record");

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-2 flex items-baseline justify-between">
        <h1 className="font-display text-3xl font-bold text-white">랭킹</h1>
        <p className="text-xs text-run-muted">매주 월요일 갱신</p>
      </div>

      <RankingTabs activeTab={activeTab} onChange={setActiveTab} />

      <div className="mt-6">
        {/* 탭별 패널: hidden으로 마운트 유지 → 필터 상태 보존 */}
        <div className={activeTab === "record" ? "" : "hidden"}>
          <RecordRankingPanel isLoggedIn={isLoggedIn} />
        </div>
        <div className={activeTab === "influencer" ? "" : "hidden"}>
          <InfluencerRankingPanel isLoggedIn={isLoggedIn} />
        </div>
        <div className={activeTab === "group" ? "" : "hidden"}>
          <GroupRankingPanel />
        </div>
      </div>
    </div>
  );
}
