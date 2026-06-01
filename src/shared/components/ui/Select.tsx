"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/shared/lib/utils/cn";

export interface SelectOption {
  value: string;
  label: string;
}

type Props = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  tone?: "brand" | "neutral";
};

export function Select({
  label,
  value,
  onChange,
  options,
  placeholder = "선택하세요",
  className,
  disabled,
  tone = "brand",
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value) ?? null;

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isOpen]);

  return (
    <div className={cn("space-y-1.5 text-sm", className)}>
      {label && (
        <span className="block text-xs font-medium uppercase tracking-wider text-run-muted">
          {label}
        </span>
      )}
      <div ref={containerRef} className="relative">
        {/* 트리거 버튼 */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm transition",
            "bg-run-surface focus:outline-none",
            isOpen
              ? tone === "neutral"
                ? "border-run-border text-white"
                : "border-run-volt text-white"
              : "border-run-border hover:border-white/20",
            selected ? "text-white" : "text-run-muted",
            disabled && "cursor-not-allowed opacity-50",
          )}
        >
          <span>{selected ? selected.label : placeholder}</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className={cn(
              "ml-3 shrink-0 text-run-muted transition-transform duration-200",
              isOpen && "rotate-180",
              isOpen && tone === "brand" && "text-run-volt",
            )}
          >
            <path
              d="M3 5L7 9L11 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* 드롭다운 패널 */}
        {isOpen && (
          <div className="wip-select-panel absolute left-0 top-[calc(100%+6px)] z-50 w-full overflow-hidden rounded-xl border border-run-border bg-run-surface">
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-2.5 px-4 py-2.5 text-sm transition",
                    isSelected
                      ? tone === "neutral"
                        ? "bg-white/10 text-white"
                        : "bg-run-volt/10 text-run-volt"
                      : "text-white hover:bg-white/5",
                  )}
                >
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                    {isSelected && (
                      <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                        <path
                          d="M1 5L4.5 8.5L11 1.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  {option.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
