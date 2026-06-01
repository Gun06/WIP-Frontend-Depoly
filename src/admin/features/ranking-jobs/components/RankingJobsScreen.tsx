"use client";

import { useState } from "react";
import { AdminPageShell } from "@/shared/components/ui/AdminPageShell";
import { cn } from "@/shared/lib/utils/cn";
import { GroupRankingAdjustSection } from "./GroupRankingAdjustSection";
import { InfluencerRankingAdjustSection } from "./InfluencerRankingAdjustSection";
import { RankingRecalcSection } from "./RankingRecalcSection";

type TabId = "recalc" | "influencer" | "group";

const TABS: { id: TabId; label: string }[] = [
  { id: "recalc", label: "재계산" },
  { id: "influencer", label: "인플루언서 순위" },
  { id: "group", label: "단체 순위" },
];

export function RankingJobsScreen() {
  const [activeTab, setActiveTab] = useState<TabId>("recalc");

  return (
    <AdminPageShell
      header={
        <div>
          <h1 className="font-display text-2xl font-bold text-white">랭킹 관리</h1>
          <p className="mt-1 text-sm text-run-muted">랭킹을 재계산하고 순위를 수동 조정합니다.</p>
        </div>
      }
      tabs={
        <div className="mt-6 flex border-b border-run-border">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-2.5 text-sm font-medium transition",
                activeTab === tab.id
                  ? "border-b-2 border-run-volt text-white"
                  : "text-run-muted hover:text-white",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      }
    >
      <div className="mt-6">
        {activeTab === "recalc" && <RankingRecalcSection />}
        {activeTab === "influencer" && <InfluencerRankingAdjustSection />}
        {activeTab === "group" && <GroupRankingAdjustSection />}
      </div>
    </AdminPageShell>
  );
}
