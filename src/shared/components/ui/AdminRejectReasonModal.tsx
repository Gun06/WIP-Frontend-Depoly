"use client";

type Props = {
  reason: string;
  onReasonChange: (value: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
  placeholder: string;
};

/** 반려 사유 모달 — 현재 보이는 화면(뷰포트) 중앙보다 살짝 위. wip-admin-shell 안에 유지. */
export function AdminRejectReasonModal({
  reason,
  onReasonChange,
  onCancel,
  onConfirm,
  placeholder,
}: Props) {
  return (
    <div
      className="admin-modal-overlay fixed inset-0 z-[60] flex items-center justify-center p-4 lg:left-56"
      role="presentation"
    >
      <div
        className="admin-modal w-full max-w-sm -translate-y-8 rounded-2xl border border-run-border bg-run-surface p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-reject-modal-title"
      >
        <h2 id="admin-reject-modal-title" className="font-display text-lg font-bold text-white">
          반려 사유 입력
        </h2>
        <p className="mt-1 text-xs text-run-muted">반려 사유를 입력해주세요 (필수)</p>
        <textarea
          value={reason}
          onChange={(e) => onReasonChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="wip-admin-field mt-4 w-full resize-none rounded-xl border border-run-border bg-black/40 px-4 py-3 text-sm text-white placeholder:text-run-muted focus:outline-none"
        />
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button type="button" className="admin-modal-cancel" onClick={onCancel}>
            취소
          </button>
          <button
            type="button"
            className="admin-modal-danger w-full rounded-full py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50"
            onClick={onConfirm}
            disabled={!reason.trim()}
          >
            반려 확인
          </button>
        </div>
      </div>
    </div>
  );
}
