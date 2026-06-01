"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { cn } from "@/shared/lib/utils/cn";
import { Select, type SelectOption } from "@/shared/components/ui/Select";
import { Button } from "@/shared/components/ui/Button";

export type FilterField = {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  tone?: "brand" | "neutral";
};

export type FilterAction = {
  label: string;
  variant?: "primary" | "outline" | "ghost";
  onClick?: () => void;
  disabled?: boolean;
};

type Props = {
  fields?: FilterField[];
  searchPlaceholder?: string;
  showSearch?: boolean;
  showReset?: boolean;
  actions?: FilterAction[];
  initialValues?: string[];
  initialSearch?: string;
  onFieldChange?: (label: string, value: string) => void;
  onSearch?: (q: string) => void;
  onReset?: () => void;
  className?: string;
  children?: ReactNode;
};

export function AdminFilterBar({
  fields = [],
  searchPlaceholder = "검색어를 입력해주세요.",
  showSearch = false,
  showReset = false,
  actions = [],
  initialValues,
  initialSearch = "",
  onFieldChange,
  onSearch,
  onReset,
  className,
  children,
}: Props) {
  const [values, setValues] = useState<string[]>(
    initialValues?.length === fields.length ? initialValues : fields.map(() => ""),
  );
  const [q, setQ] = useState(initialSearch);

  useEffect(() => {
    setValues(
      initialValues?.length === fields.length ? initialValues : fields.map(() => ""),
    );
  }, [fields, initialValues]);

  useEffect(() => {
    setQ(initialSearch);
  }, [initialSearch]);

  function handleChange(i: number, v: string) {
    setValues((prev) => {
      const next = [...prev];
      next[i] = v;
      return next;
    });
    onFieldChange?.(fields[i].label, v);
  }

  function handleReset() {
    setValues(fields.map(() => ""));
    setQ("");
    onReset?.();
  }

  return (
    <div className={cn("flex flex-wrap items-end gap-3", className)}>
      {/* 필터 셀렉트 */}
      {fields.map((f, i) => (
        <Select
          key={`${f.label}-${i}`}
          label={f.label}
          value={values[i]}
          onChange={(v) => handleChange(i, v)}
          options={f.options}
          placeholder={f.placeholder ?? "전체"}
          tone={f.tone ?? "neutral"}
          className="w-40"
        />
      ))}

      {/* 검색창 */}
      {showSearch && (
        <div className="flex min-w-48 flex-1 flex-col gap-1.5">
          <span className="text-xs font-medium uppercase tracking-wider text-run-muted opacity-0 select-none">
            search
          </span>
          <div className="admin-filter-search flex items-center overflow-hidden rounded-xl border border-run-border bg-run-surface transition focus-within:border-run-border">
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSearch?.(q)}
              placeholder={searchPlaceholder}
              className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-run-muted focus:outline-none"
            />
            <button
              type="button"
              onClick={() => onSearch?.(q)}
              className="flex h-full shrink-0 items-center px-3 text-run-muted transition hover:text-white"
              aria-label="검색"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* 초기화 */}
      {showReset && (
        <div className="flex flex-col gap-1.5">
          <span className="text-xs opacity-0 select-none">reset</span>
          <button
            type="button"
            onClick={handleReset}
            className="admin-filter-reset flex items-center gap-1.5 rounded-xl border border-run-border bg-run-surface px-4 py-3 text-sm text-run-muted transition hover:text-white"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1.5 7A5.5 5.5 0 1 0 3.5 3M1.5 1v2.5H4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            초기화
          </button>
        </div>
      )}

      {/* 액션 버튼들 */}
      {actions.map((a, i) => (
        <div key={`${a.label}-${i}`} className="flex flex-col gap-1.5">
          <span className="text-xs opacity-0 select-none">btn</span>
          <Button
            type="button"
            variant={a.variant ?? "outline"}
            disabled={a.disabled}
            onClick={a.onClick}
          >
            {a.label}
          </Button>
        </div>
      ))}

      {children}
    </div>
  );
}
