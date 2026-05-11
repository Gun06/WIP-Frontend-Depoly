"use client";

import { cn } from "@/shared/lib/utils/cn";

type PillOption = {
  value: string;
  label: string;
};

type Props = {
  options: readonly PillOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export function PillFilter({ options, value, onChange, className }: Props) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            "rounded-full border px-3.5 py-1 text-sm font-medium transition",
            value === opt.value
              ? "border-run-volt bg-run-volt text-black"
              : "border-run-border bg-run-surface text-run-muted hover:border-white/30 hover:text-white",
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
