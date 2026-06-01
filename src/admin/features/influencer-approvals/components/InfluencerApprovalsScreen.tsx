"use client";

import { useState } from "react";
import { adminPillBadge, adminPlatformPillBadge } from "@/admin/shared/adminPillBadges";
import {
  AdminDetailDrawer,
  AdminDrawerDetailRow,
} from "@/shared/components/ui/AdminDetailDrawer";
import { AdminDrawerRejectForm } from "@/shared/components/ui/AdminDrawerRejectForm";
import { AdminPageShell } from "@/shared/components/ui/AdminPageShell";
import { cn } from "@/shared/lib/utils/cn";

type InfluencerStatus = "PENDING" | "PASS" | "NON-PASS";
type TabId = "PENDING" | "PASS" | "NON-PASS";

interface InfluencerRequest {
  id: string;
  requestedAt: string;
  nickname: string;
  channelUrl: string;
  platform: "YouTube" | "Instagram" | "기타";
  message: string;
  status: InfluencerStatus;
  subscriberCount?: number;
  subscriptionActive?: boolean;
  rejectReason?: string;
}

const INITIAL_REQUESTS: InfluencerRequest[] = [
  {
    id: "1",
    requestedAt: "2026-05-25",
    nickname: "런닝유어라이프",
    channelUrl: "https://youtube.com/@runningyourlife",
    platform: "YouTube",
    message: "러닝 유튜브 채널 운영 중입니다. 구독자 48만명입니다.",
    status: "PENDING",
  },
  {
    id: "2",
    requestedAt: "2026-05-20",
    nickname: "마라토너리뷰",
    channelUrl: "https://youtube.com/@marathonerreview",
    platform: "YouTube",
    message: "마라톤 장비 리뷰 채널입니다.",
    status: "PASS",
    subscriberCount: 221000,
    subscriptionActive: true,
  },
  {
    id: "3",
    requestedAt: "2026-05-18",
    nickname: "서브3러너",
    channelUrl: "https://instagram.com/sub3runner",
    platform: "Instagram",
    message: "인스타 팔로워 9.4만입니다.",
    status: "NON-PASS",
    rejectReason: "채널 활동이 6개월 이상 없음",
  },
  {
    id: "4",
    requestedAt: "2026-05-29",
    nickname: "기어리뷰채널",
    channelUrl: "https://youtube.com/@gearreview",
    platform: "YouTube",
    message: "러닝화 전문 리뷰 채널입니다.",
    status: "PENDING",
  },
];

const TABS: { id: TabId; label: string }[] = [
  { id: "PENDING", label: "신청 대기" },
  { id: "PASS", label: "승인됨" },
  { id: "NON-PASS", label: "반려됨" },
];

const STATUS_BADGE: Record<InfluencerStatus, string> = {
  PENDING: adminPillBadge.pending,
  PASS: adminPillBadge.approved,
  "NON-PASS": adminPillBadge.rejected,
};

const STATUS_LABEL: Record<InfluencerStatus, string> = {
  PENDING: "대기중",
  PASS: "승인됨",
  "NON-PASS": "반려됨",
};

// async function fetchInfluencerRequests(): Promise<InfluencerRequest[]> { /* TODO: API 연동 */ }

export function InfluencerApprovalsScreen() {
  const [requests, setRequests] = useState<InfluencerRequest[]>(INITIAL_REQUESTS);
  const [activeTab, setActiveTab] = useState<TabId>("PENDING");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [rejectFormOpen, setRejectFormOpen] = useState(false);
  const [rejectScrollKey, setRejectScrollKey] = useState(0);
  const [rejectReason, setRejectReason] = useState("");
  const [editingSubscriberId, setEditingSubscriberId] = useState<string | null>(null);
  const [subscriberInput, setSubscriberInput] = useState("");

  const counts: Record<TabId, number> = {
    PENDING: requests.filter((r) => r.status === "PENDING").length,
    PASS: requests.filter((r) => r.status === "PASS").length,
    "NON-PASS": requests.filter((r) => r.status === "NON-PASS").length,
  };

  const filtered = requests.filter((r) => r.status === activeTab);
  const selected = requests.find((r) => r.id === selectedId) ?? null;

  function closeDrawer() {
    setSelectedId(null);
    setRejectFormOpen(false);
    setRejectReason("");
    setEditingSubscriberId(null);
    setSubscriberInput("");
  }

  function closeRejectForm() {
    setRejectFormOpen(false);
    setRejectReason("");
  }

  function handleTabChange(tab: TabId) {
    setActiveTab(tab);
    closeDrawer();
  }

  function handleSelectRequest(id: string) {
    setSelectedId(id);
    setRejectFormOpen(false);
    setRejectReason("");
    setEditingSubscriberId(null);
    setSubscriberInput("");
  }

  function handleApprove(id: string) {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: "PASS" as InfluencerStatus, subscriberCount: 0, subscriptionActive: true }
          : r,
      ),
    );
    closeDrawer();
  }

  function openRejectForm(id: string) {
    setSelectedId(id);
    setRejectFormOpen(true);
    setRejectReason("");
    setRejectScrollKey((k) => k + 1);
  }

  function handleRejectConfirm() {
    if (!selectedId || !rejectReason.trim()) return;
    setRequests((prev) =>
      prev.map((r) =>
        r.id === selectedId
          ? { ...r, status: "NON-PASS" as InfluencerStatus, rejectReason: rejectReason.trim() }
          : r,
      ),
    );
    closeDrawer();
  }

  function handleToggleSubscription(id: string) {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, subscriptionActive: !r.subscriptionActive } : r,
      ),
    );
  }

  function handleDelete(id: string) {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    closeDrawer();
  }

  function startEditSubscriber(id: string, current: number) {
    setEditingSubscriberId(id);
    setSubscriberInput(String(current));
  }

  function saveSubscriberCount(id: string) {
    const count = parseInt(subscriberInput, 10);
    if (!isNaN(count) && count >= 0) {
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, subscriberCount: count } : r)),
      );
    }
    setEditingSubscriberId(null);
    setSubscriberInput("");
  }

  function formatSubscriberCount(count: number) {
    if (count >= 10000) return `${(count / 10000).toFixed(1)}만`;
    return count.toLocaleString();
  }

  return (
    <>
    <AdminPageShell
      header={
    <div>
      <h1 className="font-display text-2xl font-bold text-white">인플루언서 승인</h1>
          <p className="mt-1 text-sm text-run-muted">인플루언서 신청을 검토하고 승인·반려합니다.</p>
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
      <div className="relative mt-4">
        {/* 신청 대기 / 반려됨 */}
        {(activeTab === "PENDING" || activeTab === "NON-PASS") && (
          <div className="admin-table-wrap overflow-x-auto">
            <table className="admin-table w-full table-fixed border-collapse text-sm">
              <colgroup>
                <col className="w-[11%]" />
                <col className="w-[10%]" />
                <col className="w-[18%]" />
                <col className="w-[10%]" />
                <col className="w-[22%]" />
                <col className="admin-table-col-status" />
                {activeTab === "PENDING" ? (
                  <>
                    <col className="admin-table-col-edit" />
                    <col className="admin-table-col-delete" />
                  </>
                ) : (
                  <col className="w-[18%]" />
                )}
              </colgroup>
              <thead>
                <tr className="admin-table-head border-b border-run-border text-left text-xs font-medium uppercase tracking-wider text-run-muted">
                  <th className="py-3 pr-4 whitespace-nowrap">신청일</th>
                  <th className="py-3 pr-4 whitespace-nowrap">닉네임</th>
                  <th className="py-3 pr-4 whitespace-nowrap">채널</th>
                  <th className="py-3 pr-4 whitespace-nowrap">플랫폼</th>
                  <th className="py-3 pr-4 whitespace-nowrap">신청 메시지</th>
                  <th className="py-3 pr-4 whitespace-nowrap">상태</th>
                  {activeTab === "PENDING" ? (
                    <>
                      <th className="py-3 pr-4 whitespace-nowrap">승인</th>
                      <th className="py-3 whitespace-nowrap">반려</th>
                    </>
                  ) : (
                    <th className="py-3 whitespace-nowrap">반려 사유</th>
                  )}
                </tr>
              </thead>
              <tbody className="admin-table-body">
                {filtered.length === 0 ? (
                  <tr className="admin-table-row">
                    <td
                      colSpan={activeTab === "PENDING" ? 8 : 7}
                      className="py-16 text-center text-run-muted"
                    >
                      데이터가 없습니다
                    </td>
                  </tr>
                ) : (
                  filtered.map((req) => (
                    <tr
                      key={req.id}
                      onClick={() => handleSelectRequest(req.id)}
                      className={cn(
                        "admin-table-row admin-table-row-clickable cursor-pointer transition",
                        req.id === selectedId && "admin-table-row-selected",
                      )}
                    >
                      <td className="py-3.5 pr-4 whitespace-nowrap text-run-muted">
                        {req.requestedAt}
                      </td>
                      <td className="py-3.5 pr-4 font-medium text-white">{req.nickname}</td>
                      <td className="py-3.5 pr-4" onClick={(e) => e.stopPropagation()}>
                        <a
                          href={req.channelUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="admin-action-link block max-w-full truncate text-xs"
                        >
                          {req.channelUrl}
                        </a>
                      </td>
                      <td className="py-3.5 pr-4">
                        <span className={adminPlatformPillBadge[req.platform]}>
                          {req.platform}
                        </span>
                      </td>
                      <td className="py-3.5 pr-4">
                        <p className="truncate text-xs text-run-muted" title={req.message}>
                          {req.message}
                        </p>
                      </td>
                      <td className="py-3.5 pr-4 whitespace-nowrap">
                        <span className={STATUS_BADGE[req.status]}>
                          {STATUS_LABEL[req.status]}
                        </span>
                      </td>
                      {activeTab === "PENDING" ? (
                        <>
                          <td
                            className="py-3.5 pr-4 whitespace-nowrap"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              type="button"
                              className="admin-action-link text-xs"
                              onClick={() => handleApprove(req.id)}
                            >
                              승인
                            </button>
                          </td>
                          <td
                            className="py-3.5 whitespace-nowrap"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              type="button"
                              className="admin-action-delete text-xs"
                              onClick={() => openRejectForm(req.id)}
                            >
                              반려
                            </button>
                          </td>
                        </>
                      ) : (
                        <td className="py-3.5">
                          <p className="truncate text-xs text-red-400" title={req.rejectReason ?? undefined}>
                            {req.rejectReason ?? "—"}
                          </p>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* 승인됨 */}
        {activeTab === "PASS" && (
          <div className="admin-table-wrap overflow-x-auto">
            <table className="admin-table w-full table-fixed border-collapse text-sm">
              <colgroup>
                <col className="w-[12%]" />
                <col className="w-[20%]" />
                <col className="w-[10%]" />
                <col className="w-[12%]" />
                <col className="w-[22%]" />
                <col className="admin-table-col-delete" />
              </colgroup>
              <thead>
                <tr className="admin-table-head border-b border-run-border text-left text-xs font-medium uppercase tracking-wider text-run-muted">
                  <th className="py-3 pr-4 whitespace-nowrap">닉네임</th>
                  <th className="py-3 pr-4 whitespace-nowrap">채널</th>
                  <th className="py-3 pr-4 whitespace-nowrap">플랫폼</th>
                  <th className="py-3 pr-4 whitespace-nowrap">구독자 수</th>
                  <th className="py-3 pr-4 whitespace-nowrap">납부 상태</th>
                  <th className="py-3 whitespace-nowrap">삭제</th>
                </tr>
              </thead>
              <tbody className="admin-table-body">
                {filtered.length === 0 ? (
                  <tr className="admin-table-row">
                    <td colSpan={6} className="py-16 text-center text-run-muted">
                      데이터가 없습니다
                    </td>
                  </tr>
                ) : (
                  filtered.map((req) => (
                    <tr
                      key={req.id}
                      onClick={() => handleSelectRequest(req.id)}
                      className={cn(
                        "admin-table-row admin-table-row-clickable cursor-pointer transition",
                        req.id === selectedId && "admin-table-row-selected",
                      )}
                    >
                      <td className="py-3.5 pr-4 font-medium text-white">
                        {req.subscriptionActive ? (
                          req.nickname
                        ) : (
                          <span className="text-run-muted">
                            {req.nickname.slice(0, 1)}
                            {"*".repeat(Math.max(req.nickname.length - 1, 1))}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 pr-4" onClick={(e) => e.stopPropagation()}>
                        <a
                          href={req.channelUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="admin-action-link block max-w-full truncate text-xs"
                        >
                          {req.channelUrl}
                        </a>
                      </td>
                      <td className="py-3.5 pr-4">
                        <span className={adminPlatformPillBadge[req.platform]}>
                          {req.platform}
                        </span>
                      </td>
                      <td className="py-3.5 pr-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        {editingSubscriberId === req.id ? (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              value={subscriberInput}
                              onChange={(e) => setSubscriberInput(e.target.value)}
                              className="wip-admin-field w-24 rounded-lg border border-run-border bg-black/40 px-2 py-1 text-xs text-white focus:outline-none"
                              onKeyDown={(e) => {
                                if (e.key === "Enter") saveSubscriberCount(req.id);
                                if (e.key === "Escape") setEditingSubscriberId(null);
                              }}
                              autoFocus
                            />
                            <button
                              type="button"
                              onClick={() => saveSubscriberCount(req.id)}
                              className="admin-action-link text-xs"
                            >
                              저장
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              startEditSubscriber(req.id, req.subscriberCount ?? 0)
                            }
                            className="group flex items-center gap-1.5 text-white"
                          >
                            <span className="text-sm">
                              {req.subscriberCount !== undefined
                                ? formatSubscriberCount(req.subscriberCount)
                                : "—"}
                            </span>
                            <span className="text-xs text-run-muted opacity-0 transition group-hover:opacity-100">
                              ✏️
                            </span>
                          </button>
                        )}
                      </td>
                      <td
                        className="py-3.5 pr-4 whitespace-nowrap"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => handleToggleSubscription(req.id)}
                          className={cn(
                            "admin-toggle-track relative mr-2 inline-flex h-5 w-9 items-center rounded-full transition",
                            req.subscriptionActive ? "bg-run-volt" : "bg-run-border",
                          )}
                          aria-label={
                            req.subscriptionActive ? "정상 노출" : "이름 마스킹"
                          }
                        >
                          <span
                            className={cn(
                              "inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition",
                              req.subscriptionActive ? "translate-x-4" : "translate-x-1",
                            )}
                          />
                        </button>
                        <span
                          className={
                            req.subscriptionActive
                              ? adminPillBadge.approved
                              : adminPillBadge.ended
                          }
                        >
                          {req.subscriptionActive ? "정상 노출" : "이름 마스킹"}
                        </span>
                      </td>
                      <td className="py-3.5 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          className="admin-action-delete text-xs"
                          onClick={() => handleDelete(req.id)}
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
        )}

      </div>
    </AdminPageShell>

    <AdminDetailDrawer
      open={!!selected}
      onClose={closeDrawer}
      title="인플루언서 상세"
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
        ) : selected?.status === "PASS" ? (
          <button
            type="button"
            className="admin-drawer-btn-reject"
            onClick={() => handleDelete(selected.id)}
          >
            삭제
          </button>
        ) : undefined
      }
    >
      {selected && (
        <>
        <dl>
          {selected.status !== "PASS" && (
            <AdminDrawerDetailRow label="신청일">{selected.requestedAt}</AdminDrawerDetailRow>
          )}
          <AdminDrawerDetailRow label="닉네임">{selected.nickname}</AdminDrawerDetailRow>
          <AdminDrawerDetailRow label="채널">
            <a
              href={selected.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="admin-action-link break-all font-normal"
            >
              {selected.channelUrl}
            </a>
          </AdminDrawerDetailRow>
          <AdminDrawerDetailRow label="플랫폼">
            <span className={adminPlatformPillBadge[selected.platform]}>{selected.platform}</span>
          </AdminDrawerDetailRow>
          {selected.status !== "PASS" && (
            <>
              <AdminDrawerDetailRow label="신청 메시지">
                <span className="font-normal text-run-muted">{selected.message}</span>
              </AdminDrawerDetailRow>
              <AdminDrawerDetailRow
                label="상태"
                className={
                  rejectFormOpen && selected.status === "PENDING" ? "border-b-0" : undefined
                }
              >
                <span className={STATUS_BADGE[selected.status]}>{STATUS_LABEL[selected.status]}</span>
              </AdminDrawerDetailRow>
            </>
          )}
          {selected.status === "NON-PASS" && selected.rejectReason ? (
            <AdminDrawerDetailRow label="반려 사유">
              <span className="font-normal text-red-400">{selected.rejectReason}</span>
            </AdminDrawerDetailRow>
          ) : null}
          {selected.status === "PASS" && (
            <>
              <AdminDrawerDetailRow label="구독자 수">
                {editingSubscriberId === selected.id ? (
                  <div className="flex flex-wrap items-center gap-2 font-normal">
                    <input
                      type="number"
                      value={subscriberInput}
                      onChange={(e) => setSubscriberInput(e.target.value)}
                      className="wip-admin-field w-28 rounded-lg border border-run-border bg-black/40 px-2 py-1 text-sm text-white focus:outline-none"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveSubscriberCount(selected.id);
                        if (e.key === "Escape") setEditingSubscriberId(null);
                      }}
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => saveSubscriberCount(selected.id)}
                      className="admin-action-link text-xs"
                    >
                      저장
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      startEditSubscriber(selected.id, selected.subscriberCount ?? 0)
                    }
                    className="group flex items-center gap-1.5 font-normal"
                  >
                    <span>
                      {selected.subscriberCount !== undefined
                        ? formatSubscriberCount(selected.subscriberCount)
                        : "—"}
                    </span>
                    <span className="text-xs text-run-muted opacity-70 group-hover:opacity-100">
                      수정
                    </span>
                  </button>
                )}
              </AdminDrawerDetailRow>
              <AdminDrawerDetailRow label="납부 상태">
                <div className="flex flex-wrap items-center gap-2 font-normal">
                  <button
                    type="button"
                    onClick={() => handleToggleSubscription(selected.id)}
                    className={cn(
                      "admin-toggle-track relative inline-flex h-5 w-9 items-center rounded-full transition",
                      selected.subscriptionActive ? "bg-run-volt" : "bg-run-border",
                    )}
                    aria-label={selected.subscriptionActive ? "정상 노출" : "이름 마스킹"}
                  >
                    <span
                      className={cn(
                        "inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition",
                        selected.subscriptionActive ? "translate-x-4" : "translate-x-1",
                      )}
                    />
                  </button>
                  <span
                    className={
                      selected.subscriptionActive
                        ? adminPillBadge.approved
                        : adminPillBadge.ended
                    }
                  >
                    {selected.subscriptionActive ? "정상 노출" : "이름 마스킹"}
                  </span>
    </div>
              </AdminDrawerDetailRow>
            </>
          )}
        </dl>

        {selected.status === "PENDING" && (
          <AdminDrawerRejectForm
            open={rejectFormOpen}
            scrollKey={rejectScrollKey}
            reason={rejectReason}
            onReasonChange={setRejectReason}
            onCancel={closeRejectForm}
            onConfirm={handleRejectConfirm}
            placeholder="예: 채널 활동이 6개월 이상 없음"
          />
        )}
        </>
      )}
    </AdminDetailDrawer>
    </>
  );
}
