"use client";

import { useEffect, useState } from "react";
import {
  AdminDetailDrawer,
  AdminDrawerDetailRow,
} from "@/shared/components/ui/AdminDetailDrawer";
import { Select } from "@/shared/components/ui/Select";
import { cn } from "@/shared/lib/utils/cn";
import { adminPillBadge } from "@/admin/shared/adminPillBadges";
import { ALL_BADGES } from "../data/mockUsers";
import type { AdminUser } from "../types";

function formatToday(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function genderLabel(gender: AdminUser["gender"]): string {
  return gender === "M" ? "남" : "여";
}

type Props = {
  user: AdminUser | null;
  open: boolean;
  onClose: () => void;
  onUserChange: (user: AdminUser) => void;
  onRequestSuspend: () => void;
  onRequestUnsuspend: () => void;
};

export function AdminUserDetailPanel({
  user,
  open,
  onClose,
  onUserChange,
  onRequestSuspend,
  onRequestUnsuspend,
}: Props) {
  const [addBadgeOpen, setAddBadgeOpen] = useState(false);
  const [badgeToGrant, setBadgeToGrant] = useState("");

  const availableBadges = user
    ? ALL_BADGES.filter((name) => !user.badges.some((b) => b.name === name))
    : [];

  useEffect(() => {
    if (!open) {
      setAddBadgeOpen(false);
      setBadgeToGrant("");
    }
  }, [open, user?.id]);

  function handleRevokeBadge(name: string) {
    if (!user) return;
    onUserChange({
      ...user,
      badges: user.badges.filter((b) => b.name !== name),
    });
  }

  function handleGrantBadge() {
    if (!user || !badgeToGrant || user.badges.some((b) => b.name === badgeToGrant)) return;
    onUserChange({
      ...user,
      badges: [...user.badges, { name: badgeToGrant, grantedAt: formatToday() }],
    });
    setBadgeToGrant("");
    setAddBadgeOpen(false);
  }

  return (
    <AdminDetailDrawer
      open={open}
      onClose={onClose}
      title="회원 상세"
      headerActions={
        user ? (
          user.status === "ACTIVE" ? (
            <button
              type="button"
              className="admin-drawer-btn-reject"
              onClick={onRequestSuspend}
            >
              계정 정지
            </button>
          ) : (
            <button
              type="button"
              className="admin-drawer-btn-approve"
              onClick={onRequestUnsuspend}
            >
              정지 해제
            </button>
          )
        ) : undefined
      }
    >
      {user && (
        <>
          <dl>
            <AdminDrawerDetailRow label="닉네임">{user.nickname}</AdminDrawerDetailRow>
            <AdminDrawerDetailRow label="이메일">{user.email}</AdminDrawerDetailRow>
            <AdminDrawerDetailRow label="성별">{genderLabel(user.gender)}</AdminDrawerDetailRow>
            <AdminDrawerDetailRow label="생년월일">{user.birth}</AdminDrawerDetailRow>
            <AdminDrawerDetailRow label="발 사이즈">{user.footSize}mm</AdminDrawerDetailRow>
            <AdminDrawerDetailRow label="가입일">{user.joinedAt}</AdminDrawerDetailRow>
            <AdminDrawerDetailRow label="계정 상태" className="border-b-0">
              <span
                className={
                  user.status === "ACTIVE" ? adminPillBadge.approved : adminPillBadge.rejected
                }
              >
                {user.status === "ACTIVE" ? "정상" : "정지"}
              </span>
            </AdminDrawerDetailRow>
          </dl>

          <section className="mt-6 border-t border-run-border pt-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-run-muted">
              보유 뱃지
            </h3>
            {user.badges.length === 0 ? (
              <p className="mt-3 text-sm text-run-muted">보유 뱃지가 없습니다</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {user.badges.map((badge) => (
                  <li
                    key={badge.name}
                    className="flex items-center justify-between gap-2 rounded-lg border border-run-border bg-black/20 px-3 py-2"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white">{badge.name}</p>
                      <p className="text-xs text-run-muted">부여일 {badge.grantedAt}</p>
                    </div>
                    <button
                      type="button"
                      className="admin-badge-revoke-btn shrink-0"
                      onClick={() => handleRevokeBadge(badge.name)}
                      aria-label={`${badge.name} 뱃지 회수`}
                    >
                      <span aria-hidden>×</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {addBadgeOpen ? (
              <div className="mt-3 space-y-2 rounded-lg border border-run-border bg-black/20 p-3">
                <Select
                  label="뱃지 선택"
                  value={badgeToGrant}
                  onChange={setBadgeToGrant}
                  placeholder={
                    availableBadges.length === 0 ? "부여 가능한 뱃지 없음" : "뱃지를 선택하세요"
                  }
                  options={availableBadges.map((name) => ({ value: name, label: name }))}
                  disabled={availableBadges.length === 0}
                  tone="neutral"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="admin-drawer-btn-approve flex-1"
                    disabled={!badgeToGrant}
                    onClick={handleGrantBadge}
                  >
                    부여
                  </button>
                  <button
                    type="button"
                    className="admin-modal-cancel flex-1"
                    onClick={() => {
                      setAddBadgeOpen(false);
                      setBadgeToGrant("");
                    }}
                  >
                    취소
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                className={cn(
                  "mt-3 w-full rounded-md border border-run-border px-3 py-2 text-sm font-medium text-white transition",
                  "hover:border-white/30 hover:bg-white/5",
                  availableBadges.length === 0 && "cursor-not-allowed opacity-50",
                )}
                disabled={availableBadges.length === 0}
                onClick={() => setAddBadgeOpen(true)}
              >
                뱃지 추가
              </button>
            )}
          </section>

          <section className="mt-6 border-t border-run-border pt-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-run-muted">
              활동 요약
            </h3>
            <dl className="mt-3">
              <AdminDrawerDetailRow label="참가 대회">
                {user.stats.eventCount}회
              </AdminDrawerDetailRow>
              <AdminDrawerDetailRow label="인증 기록">
                {user.stats.recordCount}건
              </AdminDrawerDetailRow>
              <AdminDrawerDetailRow label="작성 글" className="border-b-0">
                {user.stats.articleCount}개
              </AdminDrawerDetailRow>
            </dl>
          </section>
        </>
      )}
    </AdminDetailDrawer>
  );
}
