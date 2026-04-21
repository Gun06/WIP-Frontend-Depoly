import type { CompetitionSummary, PostSummary } from "@/shared/types/domain";

export const MOCK_COMPETITIONS: CompetitionSummary[] = [
  {
    id: "1",
    name: "2026 서울 마라톤",
    date: "2026-03-15",
    location: "광화문",
  },
  {
    id: "2",
    name: "제주 국제관광마라톤",
    date: "2026-05-10",
    location: "제주시",
  },
];

export const MOCK_POSTS: PostSummary[] = [
  {
    id: "101",
    title: "첫 풀코스 완주 후기",
    author: "러너A",
    createdAt: "2026-04-10",
  },
  {
    id: "102",
    title: "페이스 조절 팁 공유",
    author: "익명",
    createdAt: "2026-04-12",
  },
];

export function getMockPostTitle(id: string): string {
  const p = MOCK_POSTS.find((x) => x.id === id);
  return p?.title ?? "게시글";
}
