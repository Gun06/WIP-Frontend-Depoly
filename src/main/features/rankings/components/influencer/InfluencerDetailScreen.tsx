"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/shared/lib/utils/cn";
import { RankChange } from "@/main/features/rankings/components/common/RankChange";
import { RankAvatar } from "@/main/features/rankings/components/common/RankAvatar";
import type { InfluencerDetail, VoteType } from "@/shared/types/domain";

const RANK_COLOR: Record<number, string> = {
  1: "text-yellow-400",
  2: "text-slate-400",
  3: "text-orange-500",
};

function formatCount(n: number): string {
  if (n >= 10000) {
    const man = n / 10000;
    return `${man % 1 === 0 ? man : man.toFixed(1)}만`;
  }
  return n.toLocaleString();
}

function formatSubscriber(n: number): string {
  if (n >= 10000) {
    const man = n / 10000;
    return `${man % 1 === 0 ? man : man.toFixed(1)}만 구독자`;
  }
  return `${n.toLocaleString()} 구독자`;
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-run-border bg-run-surface px-4 py-3 text-center">
      <span className="text-xs text-run-muted">{label}</span>
      <span className="text-lg font-bold text-white">{value}</span>
      {sub && <span className="text-xs text-run-muted">{sub}</span>}
    </div>
  );
}

type Props = {
  influencer: InfluencerDetail;
  isLoggedIn: boolean;
  backHref?: string;
};

export function InfluencerDetailScreen({ influencer, isLoggedIn, backHref = "/ranking" }: Props) {
  const [myVote, setMyVote] = useState<VoteType | null>(null);
  const [loginToast, setLoginToast] = useState(false);

  const upCount = influencer.weeklyUpCount + (myVote === "up" ? 1 : 0);
  const downCount = influencer.weeklyDownCount + (myVote === "down" ? 1 : 0);

  function handleVote(type: VoteType) {
    if (!isLoggedIn) {
      setLoginToast(true);
      setTimeout(() => setLoginToast(false), 3000);
      return;
    }
    setMyVote((prev) => (prev === type ? null : type));
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* 뒤로가기 */}
      <Link
        href={backHref}
        className="mb-6 inline-flex items-center gap-1 text-sm text-run-muted transition hover:text-white"
      >
        ← 랭킹으로
      </Link>

      {/* 구독 미납 배너 */}
      {influencer.isMasked && (
        <div className="mb-5 flex items-start gap-3 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3">
          <span className="mt-0.5 text-rose-400">⚠</span>
          <p className="text-sm text-rose-300">
            랭킹 노출을 위해 구독이 필요합니다. 현재 이름이 마스킹 처리된 상태입니다.
          </p>
        </div>
      )}

      {/* 헤더 */}
      <div className="flex items-start gap-4">
        <RankAvatar nickname={influencer.name} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold text-white">{influencer.name}</h1>
            {influencer.isMasked && (
              <span className="rounded-full border border-rose-500/30 bg-rose-500/15 px-2.5 py-0.5 text-xs text-rose-400">
                구독 미납
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-run-muted">
            {influencer.platform} · {formatSubscriber(influencer.subscriberCount)}
          </p>
          {influencer.channelUrl && (
            <a
              href={influencer.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 rounded-lg border border-run-border bg-run-surface px-3 py-1.5 text-xs text-run-muted transition hover:border-white/20 hover:text-white"
            >
              채널 바로가기 ↗
            </a>
          )}
        </div>

        {/* 현재 순위 */}
        <div className="flex shrink-0 flex-col items-end gap-1">
          <span
            className={cn(
              "text-3xl font-bold",
              RANK_COLOR[influencer.rank] ?? "text-white",
            )}
          >
            {influencer.rank}위
          </span>
          <RankChange current={influencer.rank} previous={influencer.previousRank} />
        </div>
      </div>

      {/* 투표 버튼 */}
      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={() => handleVote("up")}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-2xl border py-3 text-sm font-semibold transition active:scale-[0.98]",
            myVote === "up"
              ? "border-emerald-500 bg-emerald-500 text-white"
              : "border-emerald-500/40 bg-transparent text-emerald-400 hover:border-emerald-500 hover:bg-emerald-500/10",
          )}
        >
          ▲ 좋아요 <span className="font-mono">{formatCount(upCount)}</span>
        </button>
        <button
          onClick={() => handleVote("down")}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-2xl border py-3 text-sm font-semibold transition active:scale-[0.98]",
            myVote === "down"
              ? "border-rose-500 bg-rose-500 text-white"
              : "border-rose-500/40 bg-transparent text-rose-400 hover:border-rose-500 hover:bg-rose-500/10",
          )}
        >
          ▼ 별로예요 <span className="font-mono">{formatCount(downCount)}</span>
        </button>
      </div>
      <p className="mt-2 text-center text-xs text-run-muted">매주 월요일 집계</p>

      {/* 통계 */}
      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-run-muted">
          통계
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <StatCard
            label="이번 주 ▲"
            value={influencer.weeklyUpCount.toLocaleString()}
          />
          <StatCard
            label="이번 주 ▼"
            value={influencer.weeklyDownCount.toLocaleString()}
          />
          <StatCard
            label="누적 ▲"
            value={influencer.cumulativeUpCount.toLocaleString()}
          />
        </div>
      </section>

      {/* WIP 게시글 */}
      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-run-muted">
          WIP 게시글
        </h2>
        {!influencer.isWipMember ? (
          <p className="rounded-2xl border border-run-border bg-run-surface p-6 text-center text-sm text-run-muted">
            WIP 회원이 아닙니다.
          </p>
        ) : influencer.recentPosts.length === 0 ? (
          <p className="rounded-2xl border border-run-border bg-run-surface p-6 text-center text-sm text-run-muted">
            작성한 게시글이 없습니다.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {influencer.recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/community/${post.id}`}
                className="flex items-start justify-between rounded-2xl border border-run-border bg-run-surface p-4 transition hover:border-white/10"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">{post.title}</p>
                  <p className="mt-0.5 text-xs text-run-muted">{post.author}</p>
                </div>
                <span className="ml-3 shrink-0 text-xs text-run-muted">{post.createdAt}</span>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 로그인 토스트 */}
      {loginToast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-run-border bg-run-surface px-5 py-2.5 text-sm text-white shadow-xl">
          로그인 후 투표할 수 있습니다
        </div>
      )}
    </div>
  );
}
