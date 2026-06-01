"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AdminFilterBar } from "@/shared/components/ui/AdminFilterBar";
import { AdminPageShell } from "@/shared/components/ui/AdminPageShell";
import { AdminPagination } from "@/shared/components/ui/AdminPagination";
import {
  AdminDetailDrawer,
  AdminDrawerDetailRow,
} from "@/shared/components/ui/AdminDetailDrawer";
import { AdminDrawerRejectForm } from "@/shared/components/ui/AdminDrawerRejectForm";
import { cn } from "@/shared/lib/utils/cn";
import { adminPillBadge } from "@/admin/shared/adminPillBadges";
import { INITIAL_RECORDS, type RecordItem } from "../data/mockRecords";

type Status = RecordItem["status"];
type TabFilter = "ALL" | Status;

const TABS: { id: TabFilter; label: string }[] = [
  { id: "ALL", label: "전체" },
  { id: "PENDING", label: "대기중" },
  { id: "PASS", label: "승인됨" },
  { id: "NON-PASS", label: "반려됨" },
];

const STATUS_BADGE: Record<Status, string> = {
  PENDING: adminPillBadge.pending,
  PASS: adminPillBadge.approved,
  "NON-PASS": adminPillBadge.rejected,
};

const STATUS_LABEL: Record<Status, string> = {
  PENDING: "대기중",
  PASS: "승인됨",
  "NON-PASS": "반려됨",
};

const PAGE_SIZE = 20;

const CATEGORY_OPTIONS = ["풀마라톤", "하프", "10K", "5K"] as const;

// async function fetchRecords(): Promise<RecordItem[]> { /* TODO: API 연동 */ }

export function RecordApprovalsScreen() {
  const [records, setRecords] = useState<RecordItem[]>(INITIAL_RECORDS);
  const [activeTab, setActiveTab] = useState<TabFilter>("PENDING");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [rejectFormOpen, setRejectFormOpen] = useState(false);
  const [rejectScrollKey, setRejectScrollKey] = useState(0);
  const [rejectReason, setRejectReason] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchQ, setSearchQ] = useState("");

  const counts: Record<TabFilter, number> = {
    ALL: records.length,
    PENDING: records.filter((r) => r.status === "PENDING").length,
    PASS: records.filter((r) => r.status === "PASS").length,
    "NON-PASS": records.filter((r) => r.status === "NON-PASS").length,
  };

  const tabFiltered =
    activeTab === "ALL" ? records : records.filter((r) => r.status === activeTab);

  const filtered = tabFiltered.filter((r) => {
    const matchCategory = !categoryFilter || r.category === categoryFilter;
    const matchSearch =
      !searchQ ||
      r.nickname.includes(searchQ) ||
      r.eventName.includes(searchQ) ||
      r.category.includes(searchQ);
    return matchCategory && matchSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const selected = records.find((r) => r.id === selectedId) ?? null;
  const showActionColumns = activeTab === "ALL" || activeTab === "PENDING";
  const colCount = showActionColumns ? 8 : 6;

  function handleTabChange(tab: TabFilter) {
    setActiveTab(tab);
    setSelectedId(null);
    setPreviewOpen(false);
    setCurrentPage(1);
  }

  function handleFilterChange() {
    setCurrentPage(1);
    setSelectedId(null);
    setPreviewOpen(false);
  }

  function handleApprove(id: string) {
    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "PASS" as Status } : r)),
    );
    setSelectedId(null);
    setPreviewOpen(false);
  }

  function openRejectForm(id: string) {
    setSelectedId(id);
    setRejectFormOpen(true);
    setRejectReason("");
    setRejectScrollKey((k) => k + 1);
    setPreviewOpen(false);
  }

  function closeRejectForm() {
    setRejectFormOpen(false);
    setRejectReason("");
  }

  function handleRejectConfirm() {
    if (!selectedId || !rejectReason.trim()) return;
    setRecords((prev) =>
      prev.map((r) =>
        r.id === selectedId
          ? { ...r, status: "NON-PASS" as Status, rejectReason: rejectReason.trim() }
          : r,
      ),
    );
    setSelectedId(null);
    setRejectFormOpen(false);
    setRejectReason("");
    setPreviewOpen(false);
  }

  function handleSelectRecord(id: string) {
    setSelectedId(id);
    setRejectFormOpen(false);
    setRejectReason("");
    setPreviewOpen(false);
  }

  function closeDrawer() {
    setSelectedId(null);
    setRejectFormOpen(false);
    setRejectReason("");
    setPreviewOpen(false);
  }

  return (
    <>
    <AdminPageShell
      header={
        <div>
          <h1 className="font-display text-2xl font-bold text-white">기록 인증</h1>
          <p className="mt-1 text-sm text-run-muted">제출된 기록 증빙을 검토하고 승인·반려합니다.</p>
        </div>
      }
      tabs={
        <div className="mt-6 flex border-b border-run-border">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                "px-4 py-2.5 text-sm font-medium transition",
                activeTab === tab.id
                  ? "border-b-2 border-run-volt text-white"
                  : "text-run-muted hover:text-white",
              )}
            >
              {tab.label}
              <span
                className={cn(
                  "ml-1.5 rounded-full px-1.5 py-0.5 text-xs",
                  activeTab === tab.id
                    ? "bg-run-volt text-black"
                    : "bg-run-border text-run-muted",
                )}
              >
                {counts[tab.id]}
              </span>
            </button>
          ))}
        </div>
      }
    >
      <AdminFilterBar
        className="mt-5"
        fields={[
          {
            label: "종목",
            options: CATEGORY_OPTIONS.map((c) => ({ value: c, label: c })),
            placeholder: "전체",
            tone: "neutral",
          },
        ]}
        showSearch
        showReset
        searchPlaceholder="이름, 대회명, 종목 검색"
        onFieldChange={(_, v) => {
          setCategoryFilter(v);
          handleFilterChange();
        }}
        onSearch={(q) => {
          setSearchQ(q);
          handleFilterChange();
        }}
        onReset={() => {
          setCategoryFilter("");
          setSearchQ("");
          setCurrentPage(1);
          setSelectedId(null);
          setPreviewOpen(false);
        }}
      />

      <div className="relative mt-4">
            <div className="admin-table-wrap overflow-x-auto">
              <table className="admin-table w-full table-fixed border-collapse text-sm">
                <colgroup>
                  <col className={showActionColumns ? "w-[11%]" : "w-[12%]"} />
                  <col className={showActionColumns ? "w-[10%]" : "w-[12%]"} />
                  <col className={showActionColumns ? "w-[22%]" : "w-[28%]"} />
                  <col className={showActionColumns ? "w-[12%]" : "w-[14%]"} />
                  <col className={showActionColumns ? "w-[11%]" : "w-[14%]"} />
                  <col className="admin-table-col-status" />
                  {showActionColumns && (
                    <>
                      <col className="admin-table-col-edit" />
                      <col className="admin-table-col-delete" />
                    </>
                  )}
                </colgroup>
                <thead>
                  <tr className="admin-table-head border-b border-run-border text-left text-xs font-medium uppercase tracking-wider text-run-muted">
                    <th className="py-3 pr-4 whitespace-nowrap">제출일</th>
                    <th className="py-3 pr-4 whitespace-nowrap">이름</th>
                    <th className="py-3 pr-4 whitespace-nowrap">대회명</th>
                    <th className="py-3 pr-4 whitespace-nowrap">종목</th>
                    <th className="admin-table-col-record py-3 pr-4 whitespace-nowrap">기록</th>
                    <th className="py-3 pr-4 whitespace-nowrap">상태</th>
                    {showActionColumns && (
                      <>
                        <th className="py-3 pr-4 whitespace-nowrap">승인</th>
                        <th className="py-3 whitespace-nowrap">반려</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="admin-table-body">
                  {filtered.length === 0 ? (
                    <tr className="admin-table-row">
                      <td colSpan={colCount} className="py-16 text-center text-run-muted">
                        데이터가 없습니다
                      </td>
                    </tr>
                  ) : (
                    paginated.map((rec) => (
                      <tr
                        key={rec.id}
                        onClick={() => handleSelectRecord(rec.id)}
                        className={cn(
                          "admin-table-row admin-table-row-clickable cursor-pointer transition",
                          rec.id === selectedId && "admin-table-row-selected",
                        )}
                      >
                        <td className="py-3.5 pr-4 whitespace-nowrap text-run-muted">
                          {rec.submittedAt}
                        </td>
                        <td className="py-3.5 pr-4 font-medium text-white">{rec.nickname}</td>
                        <td className="py-3.5 pr-4 text-white">{rec.eventName}</td>
                        <td className="py-3.5 pr-4">
                          <span className="admin-category-tag rounded px-1.5 py-0.5 text-xs">
                            {rec.category}
                          </span>
                        </td>
                        <td className="admin-table-col-record py-3.5 pr-4 text-white">{rec.record}</td>
                        <td className="py-3.5 pr-4 whitespace-nowrap">
                          <span className={STATUS_BADGE[rec.status]}>
                            {STATUS_LABEL[rec.status]}
                          </span>
                        </td>
                        {showActionColumns && (
                          <>
                            <td
                              className="py-3.5 pr-4 whitespace-nowrap"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {rec.status === "PENDING" && (
                                <button
                                  type="button"
                                  className="admin-action-link text-xs text-run-muted transition hover:text-white"
                                  onClick={() => handleApprove(rec.id)}
                                >
                                  승인
                                </button>
                              )}
                            </td>
                            <td
                              className="py-3.5 whitespace-nowrap"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {rec.status === "PENDING" && (
                                <button
                                  type="button"
                                  className="admin-action-delete text-xs transition"
                                  onClick={() => openRejectForm(rec.id)}
                                >
                                  반려
                                </button>
                              )}
                            </td>
                          </>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <AdminPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filtered.length}
              itemLabel="기록"
              onPageChange={setCurrentPage}
            />

        {/* 기록증 크게 보기 — 전체 화면(헤더·사이드바 포함) 어두운 오버레이 */}
        {previewOpen &&
          selected &&
          typeof document !== "undefined" &&
          createPortal(
            <div
              className="admin-image-lightbox-overlay fixed inset-0 z-[100] flex items-center justify-center p-4"
              onClick={() => setPreviewOpen(false)}
              role="dialog"
              aria-modal="true"
              aria-label="기록증 크게 보기"
            >
              <div
                className="relative max-h-[85vh] max-w-3xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setPreviewOpen(false)}
                  className="admin-icon-close absolute -right-2 -top-2 z-10"
                  aria-label="닫기"
                >
                  <span aria-hidden>×</span>
                </button>
                <div className="relative max-h-[85vh] w-full overflow-hidden rounded-2xl border border-run-border bg-run-surface">
                  <Image
                    src={selected.proofImageUrl}
                    alt="기록증 원본"
                    width={900}
                    height={600}
                    className="h-auto max-h-[85vh] w-auto max-w-full object-contain"
                    unoptimized
                  />
                </div>
              </div>
            </div>,
            document.body,
          )}

      </div>
    </AdminPageShell>

    <AdminDetailDrawer
      open={!!selected}
      onClose={closeDrawer}
      title="기록 상세"
      headerActions={
        selected?.status === "PENDING" ? (
          <>
            <button
              type="button"
              className="admin-drawer-btn-reject"
              onClick={() => openRejectForm(selected.id)}
            >
              반려
            </button>
            <button
              type="button"
              className="admin-drawer-btn-approve"
              onClick={() => handleApprove(selected.id)}
            >
              승인
            </button>
          </>
        ) : undefined
      }
    >
      {selected && (
        <>
          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            className="relative mx-auto mb-4 block aspect-[2/3] w-full max-w-xs overflow-hidden rounded-xl border border-run-border transition hover:opacity-90"
            aria-label="기록증 크게 보기"
          >
            <Image
              src={selected.proofImageUrl}
              alt="기록증"
              fill
              className="object-cover"
              unoptimized
            />
          </button>
          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            className="mb-4 block w-full text-center text-xs text-run-muted transition hover:text-run-volt"
          >
            크게 보기 ↗
          </button>

          <dl>
            <AdminDrawerDetailRow label="이름">{selected.nickname}</AdminDrawerDetailRow>
            <AdminDrawerDetailRow label="대회">{selected.eventName}</AdminDrawerDetailRow>
            <AdminDrawerDetailRow label="종목">
              <span className="admin-category-tag rounded px-1.5 py-0.5 text-xs font-normal">
                {selected.category}
              </span>
            </AdminDrawerDetailRow>
            <AdminDrawerDetailRow label="기록">{selected.record}</AdminDrawerDetailRow>
            <AdminDrawerDetailRow label="제출일">{selected.submittedAt}</AdminDrawerDetailRow>
            <AdminDrawerDetailRow
              label="상태"
              className={rejectFormOpen && selected.status === "PENDING" ? "border-b-0" : undefined}
            >
              <span className={STATUS_BADGE[selected.status]}>{STATUS_LABEL[selected.status]}</span>
            </AdminDrawerDetailRow>
            {selected.rejectReason && selected.status !== "PENDING" ? (
              <AdminDrawerDetailRow label="반려 사유">
                <span className="font-normal text-red-400">{selected.rejectReason}</span>
              </AdminDrawerDetailRow>
            ) : null}
          </dl>

          {selected.status === "PENDING" && (
            <AdminDrawerRejectForm
              open={rejectFormOpen}
              scrollKey={rejectScrollKey}
              reason={rejectReason}
              onReasonChange={setRejectReason}
              onCancel={closeRejectForm}
              onConfirm={handleRejectConfirm}
              placeholder="예: 기록증 이미지가 흐려 판독 불가"
            />
          )}
        </>
      )}
    </AdminDetailDrawer>
    </>
  );
}
