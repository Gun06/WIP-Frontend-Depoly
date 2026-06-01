"use client";

import { useMemo, useState } from "react";
import { adminPillBadge } from "@/admin/shared/adminPillBadges";
import { cn } from "@/shared/lib/utils/cn";
import { INITIAL_GROUP_RANKING, type GroupRankingRow } from "../data/mockRanking";
import { orderSignature, reorderByRank } from "../lib/reorderRanking";

const subscriptionBadge = {
  active: adminPillBadge.approved,
  inactive: adminPillBadge.rejected,
};

export function GroupRankingAdjustSection() {
  const [rows, setRows] = useState<GroupRankingRow[]>(INITIAL_GROUP_RANKING);
  const [savedOrder, setSavedOrder] = useState(() => orderSignature(INITIAL_GROUP_RANKING));

  const isDirty = useMemo(() => orderSignature(rows) !== savedOrder, [rows, savedOrder]);

  const dirtyIds = useMemo(() => {
    const savedIds = savedOrder.split(",");
    const ids = new Set<string>();
    rows.forEach((row, index) => {
      if (savedIds[index] !== row.id) ids.add(row.id);
    });
    return ids;
  }, [rows, savedOrder]);

  function move(id: string, direction: "up" | "down") {
    setRows((prev) => reorderByRank(prev, id, direction));
  }

  function handleSave() {
    console.log("[ranking] group order save", rows);
    setSavedOrder(orderSignature(rows));
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-run-muted">
        단체 랭킹 순위를 수동으로 조정합니다. 변경 후 저장해야 반영됩니다.
      </p>

      {isDirty && (
        <p className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-3 py-2 text-xs text-yellow-400">
          저장되지 않은 순위 변경이 있습니다.
        </p>
      )}

      <div className="admin-table-wrap overflow-x-auto">
        <table className="admin-table w-full table-fixed border-collapse text-sm">
          <colgroup>
            <col className="w-[8%]" />
            <col className="w-[18%]" />
            <col className="w-[12%]" />
            <col className="w-[12%]" />
            <col className="w-[12%]" />
            <col className="admin-table-col-status" />
            <col className="admin-table-col-edit" />
          </colgroup>
          <thead>
            <tr className="admin-table-head border-b border-run-border text-left text-xs font-medium uppercase tracking-wider text-run-muted">
              <th className="py-3 pr-4 whitespace-nowrap">순위</th>
              <th className="py-3 pr-4 whitespace-nowrap">단체명</th>
              <th className="py-3 pr-4 whitespace-nowrap">유형</th>
              <th className="py-3 pr-4 whitespace-nowrap">단체원 수</th>
              <th className="py-3 pr-4 whitespace-nowrap">스코어</th>
              <th className="py-3 pr-4 whitespace-nowrap">납부</th>
              <th className="py-3 whitespace-nowrap">조정</th>
            </tr>
          </thead>
          <tbody className="admin-table-body">
            {rows.map((row, index) => (
              <tr
                key={row.id}
                className={cn(
                  "admin-table-row transition",
                  !row.subscriptionActive && "admin-table-row--unpaid",
                  dirtyIds.has(row.id) && "admin-table-row--rank-changed",
                )}
              >
                <td className="py-3.5 pr-4 font-medium text-white">{row.rank}</td>
                <td className="py-3.5 pr-4 font-medium text-white">{row.name}</td>
                <td className="py-3.5 pr-4">
                  <span className="admin-category-tag rounded px-1.5 py-0.5 text-xs">
                    {row.type}
                  </span>
                </td>
                <td className="py-3.5 pr-4 text-white">{row.memberCount.toLocaleString()}명</td>
                <td className="py-3.5 pr-4 font-mono text-white">
                  {row.score.toLocaleString()}
                </td>
                <td className="py-3.5 pr-4 whitespace-nowrap">
                  <span
                    className={
                      row.subscriptionActive
                        ? subscriptionBadge.active
                        : subscriptionBadge.inactive
                    }
                  >
                    {row.subscriptionActive ? "납부완료" : "미납"}
                  </span>
                </td>
                <td className="py-3.5 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="admin-rank-btn"
                      disabled={index === 0}
                      onClick={() => move(row.id, "up")}
                      aria-label={`${row.name} 순위 올리기`}
                    >
                      ▲
                    </button>
                    <button
                      type="button"
                      className="admin-rank-btn"
                      disabled={index === rows.length - 1}
                      onClick={() => move(row.id, "down")}
                      aria-label={`${row.name} 순위 내리기`}
                    >
                      ▼
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="admin-drawer-btn-approve"
          disabled={!isDirty}
          onClick={handleSave}
        >
          순위 저장
        </button>
      </div>
    </div>
  );
}
