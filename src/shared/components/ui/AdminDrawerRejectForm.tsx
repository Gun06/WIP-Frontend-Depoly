"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/shared/lib/utils/cn";

type Props = {
  open: boolean;
  /** 반려 버튼을 누를 때마다 증가시켜 스크롤 재실행 */
  scrollKey?: number;
  reason: string;
  onReasonChange: (value: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
  placeholder: string;
};

/** 드로어 내 상태 행 아래 슬라이드되는 반려 사유 입력 */
export function AdminDrawerRejectForm({
  open,
  scrollKey = 0,
  reason,
  onReasonChange,
  onCancel,
  onConfirm,
  placeholder,
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!open) return;

    const scrollToInput = () => {
      const section = sectionRef.current;
      const body = section?.closest(".admin-drawer-body");
      if (!section || !(body instanceof HTMLElement)) return;

      const top =
        body.scrollTop + section.getBoundingClientRect().top - body.getBoundingClientRect().top - 8;
      body.scrollTo({ top, behavior: "smooth" });
      textareaRef.current?.focus({ preventScroll: true });
    };

    // 슬라이드 애니메이션(300ms) 후 스크롤
    const timer = window.setTimeout(scrollToInput, 320);
    return () => window.clearTimeout(timer);
  }, [open, scrollKey]);

  return (
    <div
      ref={sectionRef}
      className={cn(
        "scroll-mt-4 grid transition-[grid-template-rows] duration-300 ease-out",
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
      )}
      aria-hidden={!open}
    >
      <div className="overflow-hidden">
        <div
          className={cn(
            "border-t border-run-border pt-4 transition-[opacity,transform] duration-300 ease-out",
            open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
          )}
        >
          <p className="text-xs font-medium text-run-muted">반려 사유 (필수)</p>
          <textarea
            ref={textareaRef}
            value={reason}
            onChange={(e) => onReasonChange(e.target.value)}
            placeholder={placeholder}
            rows={4}
            className="wip-admin-field mt-2 w-full resize-none rounded-xl border border-run-border bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-run-muted focus:outline-none"
          />
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button type="button" className="admin-modal-cancel" onClick={onCancel}>
              취소
            </button>
            <button
              type="button"
              className="admin-modal-danger w-full rounded-full py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50"
              onClick={onConfirm}
              disabled={!reason.trim()}
            >
              반려 확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
