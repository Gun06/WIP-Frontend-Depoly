"use client";

import { useEffect, useState } from "react";
import { PillFilter } from "@/main/features/rankings/components/common/PillFilter";
import { GroupRankList } from "@/main/features/rankings/components/group/GroupRankList";
import { MOCK_GROUP_RANKINGS } from "@/shared/lib/mocks/rankings";
import type { GroupType, GroupRankItem } from "@/shared/types/domain";

const GROUP_TYPE_OPTIONS = [
  { value: "all", label: "전체" },
  { value: "crew", label: "크루" },
  { value: "team", label: "훈련팀" },
] as const;

export function GroupRankingPanel() {
  const [groupType, setGroupType] = useState<GroupType>("all");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(t);
  }, [groupType]);

  const filtered: GroupRankItem[] =
    groupType === "all"
      ? MOCK_GROUP_RANKINGS
      : MOCK_GROUP_RANKINGS.filter((g) => g.type === groupType);

  return (
    <div className="space-y-5">
      <PillFilter
        options={GROUP_TYPE_OPTIONS}
        value={groupType}
        onChange={(v) => setGroupType(v as GroupType)}
      />

      <GroupRankList items={filtered} isLoading={isLoading} />
    </div>
  );
}
