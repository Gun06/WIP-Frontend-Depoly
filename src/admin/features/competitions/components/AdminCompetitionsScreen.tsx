"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AdminConfirmModal } from "@/shared/components/ui/AdminConfirmModal";
import { AdminPageShell } from "@/shared/components/ui/AdminPageShell";
import { AdminFilterBar } from "@/shared/components/ui/AdminFilterBar";
import { AdminPagination } from "@/shared/components/ui/AdminPagination";
import { adminPillBadge } from "@/admin/shared/adminPillBadges";
import { useCompetitions } from "../hooks/useCompetitions";
import { STATUSES, type CompStatus } from "../types";

const STATUS_BADGE: Record<CompStatus, string> = {
  접수전: adminPillBadge.before,
  접수중: adminPillBadge.approved,
  마감: adminPillBadge.pending,
  종료: adminPillBadge.ended,
};

export function AdminCompetitionsScreen() {
  const router = useRouter();
  const { competitions, ready, remove } = useCompetitions();
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchQ, setSearchQ] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 5;

  const filtered = competitions.filter((c) => {
    const matchStatus = !statusFilter || c.status === statusFilter;
    const matchSearch =
      !searchQ ||
      c.name.includes(searchQ) ||
      c.place.includes(searchQ) ||
      c.host.includes(searchQ);
    return matchStatus && matchSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function handleFilterChange() {
    setCurrentPage(1);
  }

  function handleDelete(id: string) {
    remove(id);
    setDeleteConfirmId(null);
  }

  return (
    <AdminPageShell
      header={
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-white">대회·종목 관리</h1>
            <p className="mt-1 text-sm text-run-muted">대회 일정과 종목 정보를 등록·수정합니다.</p>
          </div>
          <Link
            href="/admin/competitions/new"
            className="inline-flex items-center justify-center rounded-full border border-run-border bg-run-surface px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/30"
          >
            + 새 대회
          </Link>
        </div>
      }
    >
      <AdminFilterBar
        className="mt-5"
        fields={[
          {
            label: "접수 상태",
            options: STATUSES.map((s) => ({ value: s, label: s })),
            placeholder: "전체",
            tone: "neutral",
          },
        ]}
        showSearch
        showReset
        searchPlaceholder="대회명, 장소, 주최 검색"
        onFieldChange={(_, v) => { setStatusFilter(v); handleFilterChange(); }}
        onSearch={(q) => { setSearchQ(q); handleFilterChange(); }}
        onReset={() => { setStatusFilter(""); setSearchQ(""); setCurrentPage(1); }}
      />

      <div className="relative mt-4">
        <div className="admin-table-wrap overflow-x-auto">
        <table className="admin-table w-full table-fixed border-collapse text-sm">
          <colgroup>
            <col className="w-[24%]" />
            <col className="w-[11%]" />
            <col className="w-[16%]" />
            <col className="w-[27%]" />
            <col className="admin-table-col-status" />
            <col className="admin-table-col-edit" />
            <col className="admin-table-col-delete" />
          </colgroup>
          <thead>
            <tr className="admin-table-head border-b border-run-border text-left text-xs font-medium uppercase tracking-wider text-run-muted">
              <th className="py-3 pr-4">대회명</th>
              <th className="py-3 pr-4 whitespace-nowrap">개최일</th>
              <th className="py-3 pr-4">장소</th>
              <th className="py-3 pr-4">종목</th>
              <th className="py-3 pr-4 whitespace-nowrap">접수 상태</th>
              <th className="py-3 pr-4 whitespace-nowrap">수정</th>
              <th className="py-3 whitespace-nowrap">삭제</th>
            </tr>
          </thead>
          <tbody className="admin-table-body">
            {!ready ? (
              <tr className="admin-table-row">
                <td colSpan={7} className="py-16 text-center text-run-muted">
                  불러오는 중…
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr className="admin-table-row">
                <td colSpan={7} className="py-16 text-center text-run-muted">
                  데이터가 없습니다
                </td>
              </tr>
            ) : (
              paginated.map((comp) => (
                <tr
                  key={comp.id}
                  className="admin-table-row admin-table-row-clickable transition cursor-pointer"
                  onClick={() => router.push(`/admin/competitions/${comp.id}/edit`)}
                >
                  <td className="py-3.5 pr-4 font-medium text-white">{comp.name}</td>
                  <td className="py-3.5 pr-4 whitespace-nowrap text-run-muted">{comp.date}</td>
                  <td className="py-3.5 pr-4 text-run-muted">{comp.place}</td>
                  <td className="py-3.5 pr-4">
                    <div className="flex flex-wrap gap-1">
                      {comp.categories.map((cat) => (
                        <span
                          key={cat}
                          className="admin-category-tag rounded px-1.5 py-0.5 text-xs"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 pr-4 whitespace-nowrap">
                    <span className={STATUS_BADGE[comp.status]}>
                      {comp.status}
                    </span>
                  </td>
                  <td className="py-3.5 pr-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <Link
                      href={`/admin/competitions/${comp.id}/edit`}
                      className="admin-action-link text-xs text-run-muted transition hover:text-white"
                    >
                      수정
                    </Link>
                  </td>
                  <td className="py-3.5 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      className="admin-action-delete text-xs transition"
                      onClick={() => setDeleteConfirmId(comp.id)}
                    >
                      삭제
                    </button>
                  </td>
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
          itemLabel="대회"
          onPageChange={setCurrentPage}
        />

        {deleteConfirmId && (
          <AdminConfirmModal
          title="대회 삭제"
          description={
            <>
              <span className="font-medium text-white">
                {competitions.find((c) => c.id === deleteConfirmId)?.name ?? "이 대회"}
              </span>
              를 삭제하시겠습니까?
              <br />
              이 작업은 되돌릴 수 없습니다.
            </>
          }
          confirmLabel="삭제"
          onCancel={() => setDeleteConfirmId(null)}
          onConfirm={() => handleDelete(deleteConfirmId)}
        />
        )}
      </div>
    </AdminPageShell>
  );
}
