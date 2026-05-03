"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export type RaceCarouselItem = {
  id: string;
  name: string;
  date: string;
  place: string;
  image: string;
};

const BLURBS = [
  "풀·하프 일정과 접수 정보를 한곳에서 확인하세요.",
  "대회별 커뮤니티에서 러너들과 소통할 수 있습니다.",
  "코스·교통·기상 정보까지 정리된 상세 페이지입니다.",
  "기록 인증과 랭킹 연동을 준비 중입니다.",
  "즐겨찾기로 관심 대회만 모아 볼 수 있습니다.",
  "접수 마감 알림으로 놓치는 일정을 줄입니다.",
  "지역별·거리별 필터로 원하는 대회를 찾습니다.",
  "후기와 팁을 남기고 다음 러너에게 도움을 주세요.",
  "크루·클럽 단위 참가 정보도 다룹니다.",
  "새로 등록된 대회는 홈에서 바로 노출됩니다.",
] as const;

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function RaceWorksCarousel({ races }: { races: readonly RaceCarouselItem[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ left: true, right: false });

  const syncEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const noOverflow = scrollWidth <= clientWidth + 2;
    setEdge({
      left: scrollLeft <= 2 || noOverflow,
      right: scrollLeft + clientWidth >= scrollWidth - 2 || noOverflow,
    });
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    syncEdges();
    el.addEventListener("scroll", syncEdges, { passive: true });
    const ro = new ResizeObserver(syncEdges);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", syncEdges);
      ro.disconnect();
    };
  }, [syncEdges, races]);

  const scrollStep = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-race-card]");
    const gap = 16;
    const w = card ? card.offsetWidth + gap : 340;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <div className="min-w-0">
      {/* MUBL Works: 좌측 큰 타이틀 + 우측 원형 네비 */}
      <div className="mb-8 flex items-end justify-between gap-6 border-b border-white/[0.07] pb-7 md:mb-10 md:pb-8">
        <h3 className="font-display text-[clamp(2.75rem,7vw,4.25rem)] font-normal uppercase leading-[0.95] tracking-tight text-white">
          Races
        </h3>
        <div className="flex shrink-0 gap-2.5">
          <button
            type="button"
            aria-label="이전 대회"
            disabled={edge.left}
            onClick={() => scrollStep(-1)}
            className="mubl-carousel-nav-btn flex h-12 w-12 items-center justify-center rounded-full transition disabled:pointer-events-none disabled:opacity-25"
          >
            <ChevronLeft className="opacity-90" />
          </button>
          <button
            type="button"
            aria-label="다음 대회"
            disabled={edge.right}
            onClick={() => scrollStep(1)}
            className="mubl-carousel-nav-btn flex h-12 w-12 items-center justify-center rounded-full transition disabled:pointer-events-none disabled:opacity-25"
          >
            <ChevronRight className="opacity-90" />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="race-carousel-track -mx-[clamp(1.5rem,3vw,2.5rem)] flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-[clamp(1.5rem,3vw,2.5rem)] pb-2 md:gap-6"
      >
        {races.map((r, i) => (
          <Link
            key={r.id}
            data-race-card
            href={`/competitions/${r.id}`}
            className="mubl-works-card group relative flex min-h-[300px] w-[min(85vw,308px)] shrink-0 snap-start flex-col md:min-h-[320px] md:w-[min(78vw,336px)] lg:w-[360px]"
          >
            <div className="relative z-10 flex flex-1 flex-col p-6 pt-7 md:p-8 md:pt-9">
              <div className="flex items-start justify-between gap-4">
                <div className="relative h-[84px] w-[84px] shrink-0 overflow-hidden rounded-full ring-1 ring-white/[0.08] md:h-[100px] md:w-[100px]">
                  <Image
                    src={r.image}
                    alt={r.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    sizes="100px"
                  />
                </div>
                <p className="mubl-works-card-blurb max-w-[48%] text-right">
                  {BLURBS[i % BLURBS.length]}
                </p>
              </div>
              <div className="mt-auto pt-10 md:pt-12">
                <p className="mubl-works-card-title pr-16">{r.name}</p>
                <p className="mubl-works-card-meta mt-2">{r.date} · {r.place}</p>
              </div>
            </div>
            <span className="mubl-works-index pointer-events-none absolute bottom-4 right-5 select-none font-display text-[clamp(3.5rem,12vw,4.75rem)] font-extralight leading-none tabular-nums tracking-tighter transition duration-500 md:bottom-5 md:right-6 md:text-[5rem]">
              {String(i + 1).padStart(2, "0")}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
