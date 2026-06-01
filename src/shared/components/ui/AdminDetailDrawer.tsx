"use client";

import type { ReactNode } from "react";
import { cn } from "@/shared/lib/utils/cn";

type AdminDetailDrawerProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  headerActions?: ReactNode;
  children: ReactNode;
  className?: string;
};

/** 관리자 상세 슬라이드 패널 (오른쪽 드로어 + 배경 딤) */
export function AdminDetailDrawer({
  open,
  onClose,
  title,
  headerActions,
  children,
  className,
}: AdminDetailDrawerProps) {
  if (!open) return null;

  return (
    <>
      <button
        type="button"
        className="admin-drawer-overlay fixed inset-0 z-40 lg:left-56"
        onClick={onClose}
        aria-label="패널 닫기"
      />
      <aside
        className={cn(
          "admin-drawer fixed right-0 top-0 z-50 flex h-dvh w-full max-w-[21rem] flex-col border-l border-run-border bg-run-surface shadow-2xl sm:max-w-96",
          className,
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "admin-drawer-title" : undefined}
      >
        <div className="flex shrink-0 items-start justify-between gap-2 border-b border-run-border px-4 py-3">
          <div className="flex min-w-0 flex-1 flex-wrap items-center justify-end gap-2">
            {headerActions}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="admin-icon-close admin-icon-close--no-hover shrink-0"
            aria-label="닫기"
          >
            <span aria-hidden>×</span>
          </button>
        </div>

        <div className="admin-drawer-body min-h-0 flex-1 overflow-y-auto scroll-smooth px-4 py-4">
          {title ? (
            <h2 id="admin-drawer-title" className="mb-4 font-display text-lg font-bold text-white">
              {title}
            </h2>
          ) : null}
          {children}
        </div>
      </aside>
    </>
  );
}

export function AdminDrawerDetailRow({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "admin-drawer-row grid grid-cols-[6.5rem_1fr] gap-3 border-b border-run-border py-3.5 text-sm last:border-b-0",
        className,
      )}
    >
      <dt className="text-run-muted">{label}</dt>
      <dd className="min-w-0 break-words font-medium text-white">{children}</dd>
    </div>
  );
}
