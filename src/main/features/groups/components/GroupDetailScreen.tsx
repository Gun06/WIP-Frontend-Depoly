"use client";

import Link from "next/link";
import type { GroupDetail, GroupMember } from "@/shared/types/domain";
import { RankAvatar } from "@/main/features/rankings/components/common/RankAvatar";

const EVENT_LABEL: Record<string, string> = {
  full: "풀마라톤",
  half: "하프마라톤",
  "10k": "10K",
  "5k": "5K",
};

const TYPE_LABEL: Record<string, string> = {
  crew: "크루",
  team: "훈련팀",
};

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl border border-run-border bg-run-surface px-4 py-3 text-center">
      <span className="text-xs text-run-muted">{label}</span>
      <span className="font-mono text-sm font-bold text-white">{value}</span>
    </div>
  );
}

function MemberRow({ member }: { member: GroupMember }) {
  const pbEntries = Object.entries(member.pbRecords);
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-run-border bg-run-surface p-4">
      <RankAvatar nickname={member.nickname} isAnonymous={false} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-white">{member.nickname}</span>
          {member.role === "LEADER" && (
            <span className="rank-badge rounded-full border border-run-volt/40 bg-run-volt/15 px-2 py-0.5 text-xs font-medium text-run-volt">
              리더
            </span>
          )}
        </div>
        {pbEntries.length > 0 && (
          <p className="mt-1 text-xs text-run-muted">
            {pbEntries
              .map(([cat, rec]) => `${EVENT_LABEL[cat] ?? cat} ${rec}`)
              .join(" · ")}
          </p>
        )}
      </div>
    </div>
  );
}

type Props = {
  group: GroupDetail;
  isLoggedIn: boolean;
  backHref?: string;
};

export function GroupDetailScreen({ group, isLoggedIn, backHref = "/ranking" }: Props) {
  const avgEntries = Object.entries(group.avgRecords);
  const isMasked = group.organizationId === "g5";

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* 뒤로가기 */}
      <Link
        href={backHref}
        className="mb-6 inline-flex items-center gap-1 text-sm text-run-muted transition hover:text-white"
      >
        ← 랭킹으로
      </Link>

      {/* 헤더 */}
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-run-border text-lg font-bold text-white">
          {group.name.replace(/^\[/, "").slice(0, 2)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold text-white">{group.name}</h1>
            <span className="rounded-full border border-run-border px-2.5 py-0.5 text-xs text-run-muted">
              {TYPE_LABEL[group.type] ?? group.type}
            </span>
            {isMasked && (
              <span className="rounded-full bg-rose-500/15 px-2.5 py-0.5 text-xs text-rose-400 border border-rose-500/30">
                구독 미납
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-run-muted">단체원 {group.memberCount}명</p>
        </div>
      </div>

      {/* 소개 */}
      {group.description && (
        <p className="mt-5 rounded-2xl border border-run-border bg-run-surface p-4 text-sm leading-relaxed text-white/80">
          {group.description}
        </p>
      )}

      {/* 가입 신청 버튼 (비소속 유저) */}
      {isLoggedIn && (
        <button className="my-rank-bar mt-5 w-full rounded-2xl border border-run-volt/40 bg-run-volt/15 py-3 text-sm font-semibold transition hover:brightness-105 active:scale-[0.99]">
          <span className="my-rank-volt">가입 신청</span>
        </button>
      )}
      {!isLoggedIn && (
        <Link
          href="/login"
          className="mt-5 flex w-full items-center justify-center rounded-2xl border border-run-border bg-run-surface py-3 text-sm font-semibold text-run-muted transition hover:border-white/20 hover:text-white"
        >
          로그인 후 가입 신청
        </Link>
      )}

      {/* 종목별 평균 기록 */}
      {avgEntries.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-semibold text-run-muted uppercase tracking-wider">
            종목별 평균 기록
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {avgEntries.map(([cat, rec]) => (
              <StatCard key={cat} label={EVENT_LABEL[cat] ?? cat} value={rec} />
            ))}
          </div>
        </section>
      )}

      {/* 단체원 목록 */}
      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold text-run-muted uppercase tracking-wider">
          단체원 ({group.memberCount}명)
        </h2>
        {group.members.length === 0 ? (
          <p className="rounded-2xl border border-run-border bg-run-surface p-6 text-center text-sm text-run-muted">
            단체원 정보가 비공개입니다.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {group.members.map((m) => (
              <MemberRow key={m.userId} member={m} />
            ))}
            {group.memberCount > group.members.length && (
              <p className="text-center text-xs text-run-muted pt-1">
                외 {group.memberCount - group.members.length}명
              </p>
            )}
          </div>
        )}
      </section>

      {/* 커뮤니티 글 */}
      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold text-run-muted uppercase tracking-wider">
          커뮤니티 글
        </h2>
        {group.recentPosts.length === 0 ? (
          <p className="rounded-2xl border border-run-border bg-run-surface p-6 text-center text-sm text-run-muted">
            작성한 게시글이 없습니다.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {group.recentPosts.map((post) => (
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
    </div>
  );
}
