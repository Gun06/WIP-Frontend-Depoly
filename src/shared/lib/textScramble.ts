/**
 * PORTFOLIO/script.js 의 TextScramble (sabum.kr) 로직을 React용으로 포팅.
 */

const CHARSET = "!<>-_\\/[]{}—=+*^?#________";

export type ScrambleChar = { ch: string; dud: boolean };

export type QueueItem = {
  from: string;
  to: string;
  start: number;
  end: number;
  char?: string;
};

function buildQueue(from: string, to: string): QueueItem[] {
  const len = Math.max(from.length, to.length);
  const queue: QueueItem[] = [];
  for (let i = 0; i < len; i++) {
    const start = Math.floor(Math.random() * 40);
    const end = start + Math.floor(Math.random() * 40);
    queue.push({
      from: from[i] ?? "",
      to: to[i] ?? "",
      start,
      end,
    });
  }
  return queue;
}

export function createScrambleQueue(target: string): QueueItem[] {
  const from = Array.from({ length: target.length }, () =>
    CHARSET[Math.floor(Math.random() * CHARSET.length)]!,
  ).join("");
  return buildQueue(from, target);
}

export function getScrambleFrame(
  queue: QueueItem[],
  frame: number,
): { parts: ScrambleChar[]; done: boolean } {
  let complete = 0;
  const parts: ScrambleChar[] = [];

  for (let i = 0; i < queue.length; i++) {
    const item = queue[i]!;
    if (frame >= item.end) {
      complete++;
      parts.push({ ch: item.to === "" ? "\u00a0" : item.to, dud: false });
    } else if (frame >= item.start) {
      if (!item.char || Math.random() < 0.28) {
        item.char = CHARSET[Math.floor(Math.random() * CHARSET.length)]!;
      }
      parts.push({ ch: item.char, dud: true });
    } else {
      parts.push({
        ch: item.from === "" ? "\u00a0" : item.from,
        dud: false,
      });
    }
  }

  return { parts, done: complete === queue.length };
}
