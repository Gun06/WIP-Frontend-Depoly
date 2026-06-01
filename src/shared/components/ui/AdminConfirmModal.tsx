"use client";

import type { ReactNode } from "react";
import { cn } from "@/shared/lib/utils/cn";

type Props = {
  title: string;
  description: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function AdminConfirmModal({
  title,
  description,
  confirmLabel = "확인",
  cancelLabel = "취소",
  onConfirm,
  onCancel,
}: Props) {
  return (
    <div className="admin-modal-overlay absolute inset-0 z-50 flex items-start justify-center p-4 pt-16">
      <div
        className="admin-modal w-full max-w-sm rounded-2xl border border-run-border bg-run-surface p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-modal-title"
      >
        <h2 id="admin-modal-title" className="font-display text-lg font-bold text-white">
          {title}
        </h2>
        <div className="mt-2 text-sm leading-relaxed text-run-muted">{description}</div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button type="button" className="admin-modal-cancel" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            type="button"
            className={cn(
              "admin-modal-danger w-full rounded-full py-2.5 text-sm font-semibold transition",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500",
            )}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
