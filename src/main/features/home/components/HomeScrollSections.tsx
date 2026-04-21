import Link from "next/link";
import {
  MOCK_COMMUNITY_FEED,
  MOCK_UPCOMING_RACES,
} from "@/shared/lib/mocks/homeLanding";
import { Card } from "@/shared/components/ui/Card";
import { ScrambleMegaTitle } from "./ScrambleMegaTitle";

export function HomeScrollSections() {
  return (
    <div className="border-t border-run-border/80 bg-run-bg">
      <section className="wip-section">
        <div className="wip-section-inner">
          <div className="wip-headline-wrap">
            <p className="wip-eyebrow" data-wip-reveal>
              Competitions
            </p>
            <ScrambleMegaTitle text="RACES" />
            <p className="wip-lead" data-wip-reveal data-wip-delay="1">
              대회 일정·종목·대회별 커뮤니티·리더보드로 이어지는 IA입니다.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {MOCK_UPCOMING_RACES.map((r) => (
              <Link key={r.id} href={`/competitions/${r.id}`} data-wip-reveal>
                <Card className="h-full min-h-[140px] border-run-border/80 transition hover:border-run-volt/40">
                  <p className="font-display text-lg text-white">{r.name}</p>
                  <p className="mt-2 text-xs text-run-muted">
                    {r.date} · {r.place}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="wip-section border-t border-run-border/60">
        <div className="wip-section-inner">
          <div className="wip-headline-wrap">
            <p className="wip-eyebrow" data-wip-reveal>
              Community
            </p>
            <ScrambleMegaTitle text="RUN TALK" />
            <p className="wip-lead" data-wip-reveal data-wip-delay="1">
              게시글·댓글·익명·비밀번호·추천(회원) 요구사항을 아래 카드에 녹여 둔 더미입니다.
            </p>
          </div>
          <ul className="mt-10 space-y-2">
            {MOCK_COMMUNITY_FEED.map((row, i) => (
              <li
                key={row.id}
                data-wip-reveal
                data-wip-delay={String(Math.min(2 + i, 6))}
              >
                <Link href={`/community/${row.id}`}>
                  <Card className="flex flex-wrap items-center justify-between gap-3 border-run-border/80 py-4 transition hover:border-run-volt/35">
                    <div>
                      <p className="font-medium text-white">{row.title}</p>
                      <p className="mt-1 text-xs text-run-muted">
                        #{row.tag} · 댓글 {row.replies}
                      </p>
                    </div>
                    <span className="text-run-muted">→</span>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wip-section border-t border-run-border/60 pb-24">
        <div className="wip-section-inner">
          <div className="wip-headline-wrap">
            <p className="wip-eyebrow" data-wip-reveal>
              Records
            </p>
            <ScrambleMegaTitle text="PROOF" />
            <p className="wip-lead" data-wip-reveal data-wip-delay="1">
              개인 기록 수동·자동 신청, 증빙 PDF, 관리자 승인 플로우는 회원 영역에서 이어집니다.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-4" data-wip-reveal data-wip-delay="2">
            <Link
              href="/records/apply"
              className="rounded-full bg-run-volt px-8 py-3 text-sm font-semibold uppercase tracking-wider text-black transition hover:brightness-110"
            >
              기록 신청하기
            </Link>
            <Link
              href="/ranking"
              className="rounded-full border border-run-border px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white/70 transition hover:border-run-volt/40 hover:text-white"
            >
              랭킹 더보기
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-run-border/60 py-6 text-center text-[10px] uppercase tracking-[0.2em] text-run-muted">
        WIP Runner · 운영(관리자)은 별도 사이트
      </footer>
    </div>
  );
}
