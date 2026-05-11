"use client";

import Link from "next/link";
import type { PublicProfile } from "@/shared/types/domain";
import { RankBadges } from "@/main/features/rankings/components/common/RankBadges";

const EVENT_LABEL: Record<string, string> = {
  full: "풀마라톤",
  half: "하프마라톤",
  "10k": "10K",
  "5k": "5K",
};

function PbCard({
  category,
  record,
  eventName,
  year,
}: {
  category: string;
  record: string;
  eventName: string;
  year: number;
}) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-run-border bg-run-surface p-4">
      <span className="text-xs text-run-muted">{EVENT_LABEL[category] ?? category}</span>
      <span className="font-mono text-xl font-bold text-white">{record}</span>
      <span className="text-xs text-run-muted">
        {eventName} {year}
      </span>
    </div>
  );
}

type Props = {
  profile: PublicProfile;
  backHref?: string;
};

export function PublicProfileScreen({ profile, backHref = "/ranking" }: Props) {
  const initials = profile.nickname.slice(0, 2);

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
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-run-border text-lg font-bold text-white">
          {initials}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">{profile.nickname}</h1>
          {profile.badges.length > 0 && (
            <div className="mt-2">
              <RankBadges badges={profile.badges} />
            </div>
          )}
        </div>
      </div>

      {/* 종목별 PB */}
      {profile.pbRecords.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-semibold text-run-muted uppercase tracking-wider">
            종목별 PB
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {profile.pbRecords.map((pb) => (
              <PbCard
                key={pb.category}
                category={pb.category}
                record={pb.record}
                eventName={pb.eventName}
                year={pb.year}
              />
            ))}
          </div>
        </section>
      )}

      {/* 대회 참가 이력 */}
      {profile.raceHistory.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-semibold text-run-muted uppercase tracking-wider">
            대회 참가 이력
          </h2>
          <div className="flex flex-col gap-2">
            {profile.raceHistory.map((race, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-2xl border border-run-border bg-run-surface px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    {race.eventName} {race.year}
                  </p>
                  <p className="mt-0.5 text-xs text-run-muted">
                    {EVENT_LABEL[race.category] ?? race.category}
                    {race.rank != null && ` · ${race.rank}위`}
                  </p>
                </div>
                <span className="ml-4 shrink-0 font-mono text-sm font-semibold text-white">
                  {race.record}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 작성한 게시글 */}
      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold text-run-muted uppercase tracking-wider">
          작성한 게시글
        </h2>
        {profile.recentPosts.length === 0 ? (
          <p className="rounded-2xl border border-run-border bg-run-surface p-6 text-center text-sm text-run-muted">
            작성한 게시글이 없습니다.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {profile.recentPosts.map((post) => (
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
