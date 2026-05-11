"use client";

import { cn } from "@/shared/lib/utils/cn";

type TabId = "record" | "influencer" | "group";

const TABS: { id: TabId; label: string }[] = [
  { id: "record", label: "기록 랭킹" },
  { id: "influencer", label: "인플루언서" },
  { id: "group", label: "단체" },
];

type Props = {
  activeTab: TabId;
  onChange: (tab: TabId) => void;
};

export function RankingTabs({ activeTab, onChange }: Props) {
  return (
    <div className="flex border-b border-run-border">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "relative px-4 pb-3 pt-1 text-sm font-semibold transition",
            activeTab === tab.id
              ? "text-white after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-run-volt"
              : "text-run-muted hover:text-white",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export type { TabId };
