"use client";

import { cn } from "@/shared/lib/utils/cn";
import type { RankSeason } from "@/shared/types/domain";

const SEASONS: { value: RankSeason; label: string }[] = [
  { value: "pb", label: "통산 PB" },
  { value: "2026", label: "2026 시즌" },
];

type Props = {
  value: RankSeason;
  onChange: (v: RankSeason) => void;
};

export function SeasonToggle({ value, onChange }: Props) {
  return (
    <div className="inline-flex rounded-full border border-run-border bg-run-surface p-0.5">
      {SEASONS.map((s) => (
        <button
          key={s.value}
          onClick={() => onChange(s.value)}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-semibold transition",
            value === s.value
              ? "bg-run-volt text-black"
              : "text-run-muted hover:text-white",
          )}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
