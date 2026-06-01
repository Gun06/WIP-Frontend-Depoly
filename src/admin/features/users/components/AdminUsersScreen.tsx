"use client";

import { useMemo, useState } from "react";
import { AdminConfirmModal } from "@/shared/components/ui/AdminConfirmModal";
import { AdminFilterBar } from "@/shared/components/ui/AdminFilterBar";
import { AdminPageShell } from "@/shared/components/ui/AdminPageShell";
import { AdminPagination } from "@/shared/components/ui/AdminPagination";
import { cn } from "@/shared/lib/utils/cn";
import { adminPillBadge } from "@/admin/shared/adminPillBadges";
import { INITIAL_MOCK_USERS } from "../data/mockUsers";
import type { AdminUser, UserGender, UserStatus } from "../types";
import { AdminUserDetailPanel } from "./AdminUserDetailPanel";

const PAGE_SIZE = 10;

const STATUS_BADGE: Record<UserStatus, string> = {
  ACTIVE: adminPillBadge.approved,
  SUSPENDED: adminPillBadge.rejected,
};

const STATUS_LABEL: Record<UserStatus, string> = {
  ACTIVE: "정상",
  SUSPENDED: "정지",
};

function genderLabel(gender: UserGender): string {
  return gender === "M" ? "남" : "여";
}

type StatusConfirm =
  | { type: "suspend"; userId: string }
  | { type: "unsuspend"; userId: string };

export function AdminUsersScreen() {
  const [users, setUsers] = useState<AdminUser[]>(INITIAL_MOCK_USERS);
  const [searchQ, setSearchQ] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [statusConfirm, setStatusConfirm] = useState<StatusConfirm | null>(null);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchGender = !genderFilter || u.gender === genderFilter;
      const q = searchQ.trim().toLowerCase();
      const matchSearch =
        !q ||
        u.nickname.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q);
      return matchGender && matchSearch;
    });
  }, [users, genderFilter, searchQ]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const selectedUser = selectedId ? users.find((u) => u.id === selectedId) ?? null : null;

  function handleFilterChange() {
    setCurrentPage(1);
  }

  function handleSelectUser(id: string) {
    setSelectedId(id);
  }

  function closeDrawer() {
    setSelectedId(null);
  }

  function updateUser(updated: AdminUser) {
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  }

  function handleStatusConfirm() {
    if (!statusConfirm) return;
    const nextStatus: UserStatus =
      statusConfirm.type === "suspend" ? "SUSPENDED" : "ACTIVE";
    setUsers((prev) =>
      prev.map((u) =>
        u.id === statusConfirm.userId ? { ...u, status: nextStatus } : u,
      ),
    );
    setStatusConfirm(null);
  }

  const confirmUser = statusConfirm
    ? users.find((u) => u.id === statusConfirm.userId)
    : null;

  return (
    <>
      <AdminPageShell
        header={
          <div>
            <h1 className="font-display text-2xl font-bold text-white">회원 관리</h1>
            <p className="mt-1 text-sm text-run-muted">회원 정보를 조회하고 계정·뱃지를 관리합니다.</p>
          </div>
        }
      >
        <AdminFilterBar
          className="mt-5"
          fields={[
            {
              label: "성별",
              options: [
                { value: "M", label: "남" },
                { value: "F", label: "여" },
              ],
              placeholder: "전체",
              tone: "neutral",
            },
          ]}
          showSearch
          showReset
          searchPlaceholder="닉네임, 이메일 검색"
          onFieldChange={(_, v) => {
            setGenderFilter(v);
            handleFilterChange();
          }}
          onSearch={(q) => {
            setSearchQ(q);
            handleFilterChange();
          }}
          onReset={() => {
            setGenderFilter("");
            setSearchQ("");
            setCurrentPage(1);
          }}
        />

        <div className="relative mt-4">
          <div className="admin-table-wrap overflow-x-auto">
            <table className="admin-table w-full table-fixed border-collapse text-sm">
              <colgroup>
                <col className="w-[14%]" />
                <col className="w-[28%]" />
                <col className="w-[10%]" />
                <col className="w-[16%]" />
                <col className="w-[14%]" />
                <col className="admin-table-col-status" />
              </colgroup>
              <thead>
                <tr className="admin-table-head border-b border-run-border text-left text-xs font-medium uppercase tracking-wider text-run-muted">
                  <th className="py-3 pr-4">닉네임</th>
                  <th className="py-3 pr-4">이메일</th>
                  <th className="py-3 pr-4 whitespace-nowrap">성별</th>
                  <th className="py-3 pr-4 whitespace-nowrap">가입일</th>
                  <th className="py-3 pr-4 whitespace-nowrap">보유 뱃지</th>
                  <th className="py-3 whitespace-nowrap">상태</th>
                </tr>
              </thead>
              <tbody className="admin-table-body">
                {filtered.length === 0 ? (
                  <tr className="admin-table-row">
                    <td colSpan={6} className="py-16 text-center text-run-muted">
                      검색 결과가 없습니다
                    </td>
                  </tr>
                ) : (
                  paginated.map((user) => (
                    <tr
                      key={user.id}
                      onClick={() => handleSelectUser(user.id)}
                      className={cn(
                        "admin-table-row admin-table-row-clickable cursor-pointer transition",
                        user.status === "SUSPENDED" && "admin-table-row--suspended",
                        user.id === selectedId && "admin-table-row-selected",
                      )}
                    >
                      <td className="py-3.5 pr-4 font-medium text-white">{user.nickname}</td>
                      <td className="py-3.5 pr-4 truncate text-run-muted">{user.email}</td>
                      <td className="py-3.5 pr-4 whitespace-nowrap text-run-muted">
                        {genderLabel(user.gender)}
                      </td>
                      <td className="py-3.5 pr-4 whitespace-nowrap text-run-muted">
                        {user.joinedAt}
                      </td>
                      <td className="py-3.5 pr-4 whitespace-nowrap text-run-muted">
                        {user.badges.length}개
                      </td>
                      <td className="py-3.5 whitespace-nowrap">
                        <span className={STATUS_BADGE[user.status]}>
                          {STATUS_LABEL[user.status]}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {filtered.length > 0 && (
            <AdminPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filtered.length}
              itemLabel="회원"
              onPageChange={setCurrentPage}
            />
          )}

          {statusConfirm && confirmUser && (
            <AdminConfirmModal
              title={statusConfirm.type === "suspend" ? "계정 정지" : "정지 해제"}
              description={
                statusConfirm.type === "suspend" ? (
                  <>
                    <span className="font-medium text-white">{confirmUser.nickname}</span>
                    님의 계정을 정지하시겠습니까?
                    <br />
                    정말 정지하시겠습니까?
                  </>
                ) : (
                  <>
                    <span className="font-medium text-white">{confirmUser.nickname}</span>
                    님의 계정 정지를 해제하시겠습니까?
                  </>
                )
              }
              confirmLabel={statusConfirm.type === "suspend" ? "정지" : "해제"}
              onCancel={() => setStatusConfirm(null)}
              onConfirm={handleStatusConfirm}
            />
          )}
        </div>
      </AdminPageShell>

      <AdminUserDetailPanel
        user={selectedUser}
        open={!!selectedUser}
        onClose={closeDrawer}
        onUserChange={updateUser}
        onRequestSuspend={() =>
          selectedUser && setStatusConfirm({ type: "suspend", userId: selectedUser.id })
        }
        onRequestUnsuspend={() =>
          selectedUser && setStatusConfirm({ type: "unsuspend", userId: selectedUser.id })
        }
      />
    </>
  );
}
