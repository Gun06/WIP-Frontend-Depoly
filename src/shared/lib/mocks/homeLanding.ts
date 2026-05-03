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
  { id: "4", title: "레이스 당일 페이스 전략 공유", tag: "훈련", replies: 31 },
  { id: "5", title: "신발 교체 주기 얼마나 되나요?", tag: "질문", replies: 24 },
] as const;

export const MOCK_NOTICES = [
  { id: "n1", title: "2026 시즌 대회 일정 안내", date: "2026-04-28", category: "공지" },
  { id: "n2", title: "커뮤니티 이용 규칙 업데이트", date: "2026-04-20", category: "운영" },
  { id: "n3", title: "기록 신청 시스템 점검 안내", date: "2026-04-15", category: "점검" },
  { id: "n4", title: "신규 대회 등록 기능 오픈", date: "2026-04-10", category: "업데이트" },
  { id: "n5", title: "회원 등급제 도입 예정 안내", date: "2026-04-05", category: "예정" },
] as const;

export const MOCK_UPCOMING_RACES = [
  { id: "1",  name: "2026 서울 마라톤",       date: "2026-03-15", place: "광화문",   image: "/images/race01.png" },
  { id: "2",  name: "제주 국제관광마라톤",     date: "2026-05-10", place: "제주",     image: "/images/race02.jpg" },
  { id: "3",  name: "부산 국제마라톤",         date: "2026-06-22", place: "해운대",   image: "/images/race03.jpg" },
  { id: "4",  name: "춘천 마라톤",             date: "2026-07-05", place: "춘천",     image: "/images/race04.jpg" },
  { id: "5",  name: "동아 서울 마라톤",         date: "2026-08-18", place: "잠실",     image: "/images/race05.jpg" },
  { id: "6",  name: "인천 국제마라톤",         date: "2026-09-06", place: "인천",     image: "/images/race01.png" },
  { id: "7",  name: "경주 국제마라톤",         date: "2026-09-27", place: "경주",     image: "/images/race02.jpg" },
  { id: "8",  name: "대구 국제마라톤",         date: "2026-10-11", place: "대구",     image: "/images/race03.jpg" },
  { id: "9",  name: "광주 마라톤",             date: "2026-10-25", place: "광주",     image: "/images/race04.jpg" },
  { id: "10", name: "강릉 마라톤",             date: "2026-11-08", place: "강릉",     image: "/images/race05.jpg" },
];
