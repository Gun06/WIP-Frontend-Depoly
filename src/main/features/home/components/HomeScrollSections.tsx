import Link from "next/link";
import {
  MOCK_COMMUNITY_FEED,
  MOCK_NOTICES,
  MOCK_UPCOMING_RACES,
} from "@/shared/lib/mocks/homeLanding";
import { RaceWorksCarousel } from "./RaceWorksCarousel";
import { ScrambleMegaTitle } from "./ScrambleMegaTitle";

export function HomeScrollSections() {
  return (
    <div className="bg-run-bg">
      {/* ── RACES: 좌 카피·CTA / 우 대회 비주얼 (sufly 히어로 레이아웃) ── */}
      <section className="wip-section">
        <div className="wip-section-inner">
          {/* MUBL: OUR WORK SPEAKS FOR ITSELF 계열 섹션 키커 */}
          <p className="mubl-section-kicker mb-10 md:mb-14" data-wip-reveal>
            Our races speak for themselves
          </p>
          <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-0">
            {/* 왼쪽: 텍스트 + 버튼 (MUBL Features 카피 톤) */}
            <div className="order-2 lg:sticky lg:top-28 lg:order-1" data-wip-reveal>
              <p className="mubl-label-upper">Competitions</p>
              <h2
                className="mt-6 text-[clamp(1.65rem,4.2vw,3.25rem)] font-light leading-[1.12] tracking-[-0.03em] text-white"
                style={{ fontFamily: "'Pretendard Variable', Pretendard, sans-serif" }}
              >
                <span className="block">대회 일정부터</span>
                <span className="block font-semibold">커뮤니티·리더보드까지</span>
              </h2>
              <p className="mubl-body-lead mt-8 max-w-md">
                WIP Runner는 국내외 마라톤·하프·10K 등 대회 정보를 한곳에 모읍니다. 대회별 게시판과 기록 랭킹으로 이어지는 흐름을 설계했습니다.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/competitions"
                  className="mubl-btn-primary inline-flex items-center justify-center rounded-full px-8 py-3 text-[13px] font-semibold tracking-wide transition"
                >
                  대회 둘러보기
                </Link>
                <Link
                  href="/competitions"
                  className="mubl-btn-ghost inline-flex items-center justify-center rounded-full px-8 py-3 text-[13px] font-medium tracking-wide transition"
                >
                  전체 일정
                </Link>
              </div>
            </div>

            {/* 오른쪽: MUBL Works 가로 캐러셀 */}
            <div className="order-1 min-w-0 lg:order-2" data-wip-reveal data-wip-delay="1">
              <RaceWorksCarousel races={MOCK_UPCOMING_RACES} />
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMUNITY 섹션 ── */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundImage: "url('/images/background01.png')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        {/* 배경 오버레이 */}
        <div className="community-overlay pointer-events-none absolute inset-0 bg-black/55" />

        <div className="wip-section-inner relative z-10 py-20 md:py-28">

          {/* ── 섹션 헤더 ── */}
          <div className="mb-8 md:mb-14" data-wip-reveal>
            <p
              className="text-base md:text-2xl uppercase"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, color: "#ff6b3d" }}
            >
              COMMUNITY PLATFORM
            </p>

            <h2
              className="mt-3 text-[28px] leading-[36px] md:text-[50px] md:leading-[62px] tracking-[-0.02em] text-white"
              style={{ fontFamily: "'Pretendard Variable', Pretendard, sans-serif" }}
            >
              <span className="block font-normal">공지사항부터 커뮤니티까지</span>
              <span className="block font-bold">모든 소식을 한 눈에</span>
            </h2>

            <p
              className="mt-5 md:mt-8 max-w-lg text-[13px] md:text-[15px] leading-[1.8] md:leading-[1.9] text-white/45"
              style={{ fontFamily: "'Pretendard Variable', Pretendard, sans-serif" }}
            >
              WIP Runner의 최신 공지와 러너들의 이야기를 모아 보여드립니다.<br />
              질문, 후기, 대회 정보를 자유롭게 나눠보세요.
            </p>
          </div>

          {/* ── 두 패널 ── */}
          <div className="grid gap-5 lg:grid-cols-2" data-wip-reveal data-wip-delay="1">

            {/* ── 왼쪽 패널 : 공지사항 ── */}
            <div
              className="community-panel flex flex-col overflow-hidden rounded-[20px] border backdrop-blur-md"
              style={{ background: "rgba(0,0,0,0.6)", borderColor: "rgba(255,255,255,0.2)" }}
            >
              <div className="flex items-center justify-between px-4 pt-4 pb-2 md:px-7 md:pt-7">
                <div className="flex items-center gap-2 md:gap-3">
                  <span
                    className="text-[17px] md:text-[22px] font-bold tracking-tight text-white"
                    style={{ fontFamily: "'Pretendard Variable', Pretendard, sans-serif" }}
                  >
                    WIP<sup className="text-[10px] font-normal text-white/50">®</sup>
                    <span className="ml-1.5 text-white/90">공지사항</span>
                  </span>
                  <span
                    className="rounded-full border border-white/20 bg-white/[0.07] px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-[11px] font-semibold text-white/70"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    NOTICE✨
                  </span>
                </div>
              </div>

              <div className="mx-4 mt-4 mb-0 md:mx-7 md:mt-6 flex items-center rounded-full bg-[#00d4d0] px-4 md:px-6 py-1.5">
                <span
                  className="text-[13px] md:text-[15px] font-bold text-[#003c3a]"
                  style={{ fontFamily: "'Pretendard Variable', Pretendard, sans-serif" }}
                >
                  최신 공지사항
                </span>
              </div>

              <div className="mt-4 md:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-0 px-4 pb-4 md:px-7 md:pb-7">
                {MOCK_NOTICES.map((n) => (
                  <Link
                    key={n.id}
                    href={`/notices/${n.id}`}
                    className="group flex min-w-0 items-start gap-0 border-l-2 border-[#00d4d0]/40 pl-3 py-2 transition hover:border-[#00d4d0]"
                  >
                    <span
                      className="truncate text-[13px] md:text-[14px] leading-5 text-white/65 group-hover:text-white transition"
                      style={{ fontFamily: "'Pretendard Variable', Pretendard, sans-serif" }}
                    >
                      {n.title}
                    </span>
                  </Link>
                ))}
              </div>

              <div className="mt-auto flex justify-end border-t border-white/[0.06] px-4 py-3 md:px-7 md:py-4">
                <Link
                  href="/notices"
                  className="text-[13px] font-medium text-white/35 transition hover:text-white/70"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  전체 공지 보기 →
                </Link>
              </div>
            </div>

            {/* ── 오른쪽 패널 : 커뮤니티 ── */}
            <div
              className="community-panel flex flex-col overflow-hidden rounded-[20px] border backdrop-blur-md"
              style={{ background: "rgba(0,0,0,0.6)", borderColor: "rgba(255,255,255,0.2)" }}
            >
              <div className="flex items-center justify-between px-4 pt-4 pb-2 md:px-7 md:pt-7">
                <div className="flex items-center gap-2 md:gap-3">
                  <span
                    className="text-[17px] md:text-[22px] font-bold tracking-tight text-white"
                    style={{ fontFamily: "'Pretendard Variable', Pretendard, sans-serif" }}
                  >
                    WIP<sup className="text-[10px] font-normal text-white/50">®</sup>
                    <span className="ml-1.5 text-white/90">커뮤니티</span>
                  </span>
                  <span
                    className="rounded-full border border-white/20 bg-white/[0.07] px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-[11px] font-semibold text-white/70"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    COMMUNITY✨
                  </span>
                </div>
              </div>

              <div className="mx-4 mt-4 mb-0 md:mx-7 md:mt-6 flex items-center rounded-full bg-[#9b6dff] px-4 md:px-6 py-1.5">
                <span
                  className="text-[13px] md:text-[15px] font-bold text-[#1a0040]"
                  style={{ fontFamily: "'Pretendard Variable', Pretendard, sans-serif" }}
                >
                  인기 게시글
                </span>
              </div>

              <div className="mt-4 md:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-0 px-4 pb-4 md:px-7 md:pb-7">
                {MOCK_COMMUNITY_FEED.map((row) => (
                  <Link
                    key={row.id}
                    href={`/community/${row.id}`}
                    className="group flex min-w-0 items-start border-l-2 border-[#9b6dff]/40 pl-3 py-2 transition hover:border-[#9b6dff]"
                  >
                    <span
                      className="truncate text-[13px] md:text-[14px] leading-5 text-white/65 group-hover:text-white transition"
                      style={{ fontFamily: "'Pretendard Variable', Pretendard, sans-serif" }}
                    >
                      {row.title}
                    </span>
                  </Link>
                ))}
              </div>

              <div className="mt-auto flex justify-end border-t border-white/[0.06] px-4 py-3 md:px-7 md:py-4">
                <Link
                  href="/community"
                  className="text-[13px] font-medium text-white/35 transition hover:text-white/70"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  전체 커뮤니티 보기 →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── PROOF 섹션 ── */}
      <section className="wip-section pb-24">
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

      <footer className="py-6 text-center text-[10px] uppercase tracking-[0.2em] text-run-muted">
        WIP Runner · 운영(관리자)은 별도 사이트
      </footer>
    </div>
  );
}
