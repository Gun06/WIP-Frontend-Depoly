"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/shared/lib/utils/cn";

const items = [
  { href: "/competitions", label: "대회" },
  { href: "/community", label: "커뮤니티" },
  { href: "/ranking", label: "랭킹" },
  { href: "/run", label: "러닝" },
  { href: "/login", label: "로그인" },
] as const;

/** PORTFOLIO index.html `.header` — 전폭, 좌 브랜딩 / 우 텍스트 링크·슬래시 구분 */
export function LandingFloatingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "pointer-events-auto fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-4 transition-colors duration-500 md:px-10 md:py-5",
        scrolled
          ? "border-b border-white/[0.08] bg-black/55 backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-black/50 to-transparent",
      )}
    >
      <Link href="/" className="group flex flex-col gap-0.5">
        <span className="font-display text-xl font-semibold tracking-[0.04em] text-white md:text-2xl">
          WIP
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/40 transition group-hover:text-white/60">
          Runner Community
        </span>
      </Link>

      <nav
        className="flex flex-wrap items-center justify-end gap-y-1"
        aria-label="주요 메뉴"
      >
        {items.map((it, idx) => (
          <span key={it.href} className="flex items-center">
            {idx > 0 ? (
              <span className="mx-2 text-[10px] text-white/20 select-none" aria-hidden>
                /
              </span>
            ) : null}
            <Link
              href={it.href}
              className="text-[11px] font-normal uppercase tracking-[0.14em] text-white/45 transition hover:text-white/95"
            >
              {it.label}
            </Link>
          </span>
        ))}
      </nav>
    </header>
  );
}
