/** 홈 랜딩·랭킹 패널용 더미 */

export type RankingRow = {
  rank: number;
  name: string;
  score: string;
  delta: "up" | "down" | "same";
};

export const MOCK_RANKING_MARATHON: RankingRow[] = [
  { rank: 1, name: "김서울", score: "2:09:14", delta: "same" },
  { rank: 2, name: "박제주", score: "2:10:02", delta: "up" },
  { rank: 3, name: "이부산", score: "2:11:48", delta: "down" },
  { rank: 4, name: "최대구", score: "2:12:33", delta: "up" },
  { rank: 5, name: "정광주", score: "2:13:01", delta: "same" },
];

export const MOCK_RANKING_INFLUENCER: RankingRow[] = [
  { rank: 1, name: "@pace_kr", score: "98.2k", delta: "up" },
  { rank: 2, name: "@run_daily", score: "92.1k", delta: "down" },
  { rank: 3, name: "@marathon_tv", score: "88.4k", delta: "up" },
  { rank: 4, name: "@crew_seoul", score: "81.0k", delta: "same" },
  { rank: 5, name: "@track_log", score: "76.3k", delta: "down" },
];

export const MOCK_COMMUNITY_FEED = [
  { id: "1", title: "서울 풀코스 첫 완주 후기", tag: "후기", replies: 42 },
  { id: "2", title: "족저근막염 회복 러닝 질문", tag: "질문", replies: 18 },
  { id: "3", title: "봄 시즌 대회 일정 정리", tag: "정보", replies: 56 },
] as const;

export const MOCK_UPCOMING_RACES = [
  { id: "1", name: "2026 서울 마라톤", date: "2026-03-15", place: "광화문" },
  { id: "2", name: "제주 국제관광마라톤", date: "2026-05-10", place: "제주" },
  { id: "3", name: "부산 국제마라톤", date: "2026-11-02", place: "해운대" },
] as const;
