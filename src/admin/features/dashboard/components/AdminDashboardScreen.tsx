import type { ReactNode } from "react";
import Link from "next/link";
import { Card } from "@/shared/components/ui/Card";
import { AdminPageShell } from "@/shared/components/ui/AdminPageShell";
import { cn } from "@/shared/lib/utils/cn";
import { adminPillBadge } from "@/admin/shared/adminPillBadges";
import { MOCK_DASHBOARD, MOCK_RECENT_RECORDS } from "../data/mockDashboard";
import {
  AdminDashboardQuickLink,
  IconChart,
  IconShieldCheck,
  IconStar,
  IconTrophy,
  IconUpload,
  IconUsers,
  type QuickLinkTone,
} from "./AdminDashboardQuickLink";

const QUICK_LINKS: {
  href: string;
  label: string;
  description: string;
  tone: QuickLinkTone;
  icon: ReactNode;
}[] = [
  {
    href: "/admin/competitions",
    label: "대회·종목",
    description: "일정 등록·종목 관리",
    tone: "orange",
    icon: <IconTrophy />,
  },
  {
    href: "/admin/leaderboard",
    label: "Top100 업로드",
    description: "엑셀 업로드·미리보기",
    tone: "green",
    icon: <IconUpload />,
  },
  {
    href: "/admin/records",
    label: "기록 인증",
    description: "PASS·반려 검토",
    tone: "blue",
    icon: <IconShieldCheck />,
  },
  {
    href: "/admin/ranking-jobs",
    label: "랭킹 재계산",
    description: "재계산·순위 조정",
    tone: "indigo",
    icon: <IconChart />,
  },
  {
    href: "/admin/influencer",
    label: "인플루언서 승인",
    description: "신청 승인·구독 관리",
    tone: "purple",
    icon: <IconStar />,
  },
  {
    href: "/admin/users",
    label: "회원 관리",
    description: "검색·정지·뱃지",
    tone: "teal",
    icon: <IconUsers />,
  },
];

const RECORD_STATUS_LABEL = {
  PENDING: "대기중",
} as const;

function queueValueClass(count: number): string {
  return count >= 1 ? "admin-dashboard-stat--alert" : "admin-dashboard-stat--ok";
}

type StatCardProps = {
  label: string;
  value: string;
  valueClassName?: string;
  href?: string;
};

function StatCard({ label, value, valueClassName, href }: StatCardProps) {
  const card = (
    <Card
      className={cn(
        "admin-dashboard-stat-card h-full",
        href && "admin-dashboard-stat-card--clickable",
      )}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-run-muted">{label}</p>
      <p
        className={cn(
          "admin-dashboard-stat-value mt-2 font-display text-2xl font-bold text-white",
          valueClassName,
        )}
      >
        {value}
      </p>
    </Card>
  );

  if (href) {
    return (
      <Link href={href} className="admin-dashboard-stat-link block h-full">
        {card}
      </Link>
    );
  }

  return card;
}

export function AdminDashboardScreen() {
  const { pendingRecords, pendingInfluencers, totalUsers, lastRankingUpdate } =
    MOCK_DASHBOARD;

  return (
    <AdminPageShell
      header={
        <div>
          <h1 className="font-display text-2xl font-bold text-white">관리자 홈</h1>
          <p className="mt-2 text-sm text-run-muted">
            처리 대기 건수와 최근 기록 인증 신청을 확인합니다.
          </p>
        </div>
      }
    >
      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="기록 인증 대기"
          value={`${pendingRecords}건`}
          valueClassName={queueValueClass(pendingRecords)}
          href="/admin/records"
        />
        <StatCard
          label="인플루언서 승인 대기"
          value={`${pendingInfluencers}건`}
          valueClassName={queueValueClass(pendingInfluencers)}
          href="/admin/influencer"
        />
        <StatCard
          label="전체 회원"
          value={`${totalUsers.toLocaleString("ko-KR")}명`}
        />
        <StatCard
          label="랭킹 마지막 갱신"
          value={lastRankingUpdate}
          href="/admin/ranking-jobs"
        />
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {QUICK_LINKS.map((l) => (
          <AdminDashboardQuickLink
            key={l.href}
            href={l.href}
            label={l.label}
            description={l.description}
            tone={l.tone}
            icon={l.icon}
          />
        ))}
      </div>

      <section className="mt-10">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-lg font-semibold text-white">
            최근 기록 인증 신청
          </h2>
          <Link
            href="/admin/records"
            className="admin-dashboard-more inline-flex items-center justify-center rounded-md border border-run-border px-4 py-2 text-sm font-medium text-white transition hover:border-white/30"
          >
            더보기
          </Link>
        </div>

        <div className="admin-table-wrap mt-4 overflow-x-auto">
          <table className="admin-table w-full table-fixed border-collapse text-sm">
            <colgroup>
              <col className="w-[14%]" />
              <col className="w-[12%]" />
              <col className="w-[28%]" />
              <col className="w-[12%]" />
              <col className="admin-table-col-record" />
              <col className="admin-table-col-status" />
            </colgroup>
            <thead>
              <tr className="admin-table-head border-b border-run-border text-left text-xs font-medium uppercase tracking-wider text-run-muted">
                <th className="py-3 pr-4 whitespace-nowrap">제출일</th>
                <th className="py-3 pr-4 whitespace-nowrap">이름</th>
                <th className="py-3 pr-4">대회명</th>
                <th className="py-3 pr-4 whitespace-nowrap">종목</th>
                <th className="py-3 pr-4 whitespace-nowrap">기록</th>
                <th className="py-3 whitespace-nowrap">상태</th>
              </tr>
            </thead>
            <tbody className="admin-table-body">
              {MOCK_RECENT_RECORDS.map((row) => (
                <tr key={`${row.submittedAt}-${row.nickname}`} className="admin-table-row transition">
                  <td className="py-3.5 pr-4 whitespace-nowrap text-run-muted">
                    {row.submittedAt}
                  </td>
                  <td className="py-3.5 pr-4 font-medium text-white">{row.nickname}</td>
                  <td className="py-3.5 pr-4 truncate text-run-muted">{row.eventName}</td>
                  <td className="py-3.5 pr-4">
                    <span className="admin-category-tag rounded px-1.5 py-0.5 text-xs">
                      {row.category}
                    </span>
                  </td>
                  <td className="admin-table-col-record py-3.5 pr-4 font-mono text-white">
                    {row.record}
                  </td>
                  <td className="py-3.5 whitespace-nowrap">
                    <span className={adminPillBadge.pending}>
                      {RECORD_STATUS_LABEL[row.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AdminPageShell>
  );
}
