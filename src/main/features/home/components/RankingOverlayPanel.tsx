"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  MOCK_RANKING_INFLUENCER,
  MOCK_RANKING_MARATHON,
  type RankingRow,
} from "@/shared/lib/mocks/homeLanding";
import { cn } from "@/shared/lib/utils/cn";

type Tab = "marathon" | "influencer";

function DeltaIcon({ delta }: { delta: RankingRow["delta"] }) {
  if (delta === "up")
    return <span className="text-emerald-400" aria-label="상승">▲</span>;
  if (delta === "down")
    return <span className="text-rose-400" aria-label="하락">▼</span>;
  return <span className="text-white/25">—</span>;
}

export function RankingOverlayPanel() {
  const [tab, setTab] = useState<Tab>("marathon");
  const rows = useMemo(
    () => (tab === "marathon" ? MOCK_RANKING_MARATHON : MOCK_RANKING_INFLUENCER),
    [tab],
  );

  return (
    <div className="flex h-full min-h-0 max-h-[min(72dvh,640px)] flex-col rounded-2xl border border-white/10 bg-black/45 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl md:max-h-[min(78dvh,720px)]">
      <div className="flex items-start justify-between gap-3 md:flex-row-reverse md:text-right">
        <Link
          href="/ranking"
          className="shrink-0 rounded-full border border-white/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/70 transition hover:border-run-volt/50 hover:text-white md:mt-0.5"
        >
          전체
        </Link>
        <div className="min-w-0 flex-1 md:text-right">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-run-volt">
            Weekly ranking
          </p>
          <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
            랭킹
          </h2>
          <p className="mt-1 text-xs text-white/45">더미 데이터 · 주간 갱신 UI 자리</p>
        </div>
      </div>

      <div className="mt-4 flex rounded-full bg-black/40 p-1">
        {(
          [
            { id: "marathon" as const, label: "대회" },
            { id: "influencer" as const, label: "인플루언서" },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "flex-1 rounded-full py-2 text-center text-[11px] font-semibold uppercase tracking-wider transition",
              tab === t.id
                ? "bg-run-volt text-black"
                : "text-white/45 hover:text-white/80",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <ul className="mt-4 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto pr-1">
        {rows.map((r) => (
          <li
            key={`${tab}-${r.rank}`}
            className="flex items-center gap-3 rounded-xl border border-transparent px-2 py-2.5 transition hover:border-white/10 hover:bg-white/5"
          >
            <span className="w-6 text-center font-display text-lg text-white/35">
              {r.rank}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-white">{r.name}</p>
              <p className="text-[11px] text-white/40">{r.score}</p>
            </div>
            <span className="flex w-6 justify-center text-xs">
              <DeltaIcon delta={r.delta} />
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-3 border-t border-white/10 pt-3 text-[10px] leading-relaxed text-white/35">
        관리자·Top100·재계산은{" "}
        <span className="text-white/55">별도 운영 사이트</span>에서 다룹니다.
      </p>
    </div>
  );
}
