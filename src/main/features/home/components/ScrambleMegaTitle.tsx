"use client";

import { useEffect, useRef, useState } from "react";
import {
  createScrambleQueue,
  getScrambleFrame,
  type QueueItem,
  type ScrambleChar,
} from "@/shared/lib/textScramble";
import { cn } from "@/shared/lib/utils/cn";

type Props = {
  text: string;
  className?: string;
};

/**
 * PORTFOLIO TextScramble 스타일. 하이드레이션 일치를 위해 첫 페인트는 고정 텍스트.
 */
export function ScrambleMegaTitle({ text, className }: Props) {
  const wrapRef = useRef<HTMLHeadingElement>(null);
  const queueRef = useRef<QueueItem[] | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [parts, setParts] = useState<ScrambleChar[]>([]);
  const ran = useRef(false);
  const rafRef = useRef(0);

  useEffect(() => {
    setHydrated(true);
    queueRef.current = createScrambleQueue(text);
    setParts(getScrambleFrame(queueRef.current, 0).parts);
    ran.current = false;
  }, [text]);

  useEffect(() => {
    if (!hydrated) return;
    const el = wrapRef.current;
    if (!el || !queueRef.current) return;

    const run = (frame: number) => {
      const q = queueRef.current;
      if (!q) return;
      const { parts: next, done } = getScrambleFrame(q, frame);
      setParts(next);
      if (done) return;
      rafRef.current = requestAnimationFrame(() => run(frame + 1));
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || ran.current) return;
        ran.current = true;
        run(1);
      },
      { root: null, rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [text, hydrated]);

  return (
    <h2 ref={wrapRef} className={cn("wip-mega", className)} aria-label={text}>
      {!hydrated
        ? text
        : parts.map((p, i) =>
          p.dud ? (
            <span key={`${i}-${p.ch}`} className="wip-scramble-dud">
              {p.ch}
            </span>
          ) : (
            <span key={i}>{p.ch === " " ? "\u00a0" : p.ch}</span>
          ),
        )}
    </h2>
  );
}
