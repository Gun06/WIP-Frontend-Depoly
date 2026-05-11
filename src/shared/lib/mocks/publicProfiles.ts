import type { PublicProfile } from "@/shared/types/domain";

const MOCK_PROFILES: PublicProfile[] = [
  {
    userId: "u1",
    nickname: "김준혁",
    isAnonymous: false,
    badges: ["Sub3", "인증", "풀완주"],
    pbRecords: [
      { category: "full", record: "02:41:08", eventName: "서울마라톤", year: 2026 },
      { category: "half", record: "01:14:22", eventName: "중앙서울마라톤", year: 2025 },
      { category: "10k", record: "00:36:44", eventName: "10K 챌린지", year: 2025 },
    ],
    raceHistory: [
      { eventName: "서울마라톤", year: 2026, category: "full", record: "02:41:08", rank: 1 },
      { eventName: "JTBC마라톤", year: 2025, category: "full", record: "02:44:33", rank: 3 },
      { eventName: "중앙서울마라톤", year: 2025, category: "half", record: "01:14:22", rank: 2 },
      { eventName: "춘천마라톤", year: 2024, category: "full", record: "02:47:11" },
    ],
    recentPosts: [
      { id: "p1", title: "이번 주 한강 새벽 런 후기 🌅", author: "김준혁", createdAt: "2026-05-01" },
      { id: "p11", title: "Sub3 달성 후기 및 훈련 방법 공유", author: "김준혁", createdAt: "2026-03-15" },
    ],
  },
  {
    userId: "u2",
    nickname: "박서준",
    isAnonymous: false,
    badges: ["Sub3"],
    pbRecords: [
      { category: "full", record: "02:43:55", eventName: "제주마라톤", year: 2026 },
      { category: "half", record: "01:15:40", eventName: "서울하프마라톤", year: 2025 },
    ],
    raceHistory: [
      { eventName: "제주마라톤", year: 2026, category: "full", record: "02:43:55", rank: 2 },
      { eventName: "서울마라톤", year: 2025, category: "full", record: "02:46:22" },
      { eventName: "서울하프마라톤", year: 2025, category: "half", record: "01:15:40", rank: 5 },
    ],
    recentPosts: [
      { id: "p4", title: "인터벌 훈련 5월 커리큘럼 안내", author: "박서준", createdAt: "2026-05-02" },
    ],
  },
  {
    userId: "u3",
    nickname: "이민호",
    isAnonymous: false,
    badges: ["풀완주"],
    pbRecords: [
      { category: "full", record: "02:45:22", eventName: "JTBC마라톤", year: 2025 },
      { category: "half", record: "01:18:10", eventName: "인천하프마라톤", year: 2025 },
    ],
    raceHistory: [
      { eventName: "JTBC마라톤", year: 2025, category: "full", record: "02:45:22", rank: 3 },
      { eventName: "서울마라톤", year: 2025, category: "full", record: "02:48:55" },
      { eventName: "인천하프마라톤", year: 2025, category: "half", record: "01:18:10" },
    ],
    recentPosts: [
      { id: "p3", title: "서울마라톤 단체 참가 후기 및 기록 공유", author: "이민호", createdAt: "2026-04-20" },
    ],
  },
  {
    userId: "u4",
    nickname: "최지우",
    isAnonymous: false,
    badges: ["인증", "풀완주"],
    pbRecords: [
      { category: "full", record: "02:48:11", eventName: "서울마라톤", year: 2026 },
      { category: "half", record: "01:17:05", eventName: "경주마라톤", year: 2025 },
    ],
    raceHistory: [
      { eventName: "서울마라톤", year: 2026, category: "full", record: "02:48:11", rank: 4 },
      { eventName: "경주마라톤", year: 2025, category: "half", record: "01:17:05", rank: 1 },
      { eventName: "JTBC마라톤", year: 2024, category: "full", record: "02:52:40" },
    ],
    recentPosts: [
      { id: "p6", title: "강남 런닝 코스 추천 BEST 5", author: "최지우", createdAt: "2026-05-01" },
      { id: "p8", title: "5월 대회 단체 참가 신청 받습니다", author: "최지우", createdAt: "2026-04-18" },
    ],
  },
  {
    userId: "u6",
    nickname: "홍경훈",
    isAnonymous: false,
    badges: ["풀완주"],
    pbRecords: [
      { category: "full", record: "02:54:19", eventName: "경주마라톤", year: 2026 },
    ],
    raceHistory: [
      { eventName: "경주마라톤", year: 2026, category: "full", record: "02:54:19", rank: 6 },
      { eventName: "서울마라톤", year: 2025, category: "full", record: "02:58:44" },
    ],
    recentPosts: [],
  },
  {
    userId: "u7",
    nickname: "이수진",
    isAnonymous: false,
    badges: ["인증"],
    pbRecords: [
      { category: "full", record: "02:57:44", eventName: "서울마라톤", year: 2026 },
      { category: "half", record: "01:22:18", eventName: "중앙서울마라톤", year: 2025 },
    ],
    raceHistory: [
      { eventName: "서울마라톤", year: 2026, category: "full", record: "02:57:44", rank: 7 },
      { eventName: "중앙서울마라톤", year: 2025, category: "half", record: "01:22:18", rank: 3 },
    ],
    recentPosts: [
      { id: "p7", title: "4월 정기 런 사진 모음", author: "이수진", createdAt: "2026-04-22" },
    ],
  },
  {
    userId: "u8",
    nickname: "정도현",
    isAnonymous: false,
    badges: ["풀완주"],
    pbRecords: [
      { category: "full", record: "02:59:01", eventName: "JTBC마라톤", year: 2026 },
      { category: "half", record: "01:22:44", eventName: "부산하프마라톤", year: 2025 },
    ],
    raceHistory: [
      { eventName: "JTBC마라톤", year: 2026, category: "full", record: "02:59:01", rank: 8 },
      { eventName: "부산마라톤", year: 2026, category: "full", record: "03:02:15" },
      { eventName: "부산하프마라톤", year: 2025, category: "half", record: "01:22:44" },
    ],
    recentPosts: [
      { id: "p9", title: "부산마라톤 2026 단체 후기", author: "정도현", createdAt: "2026-04-30" },
    ],
  },
  {
    userId: "u9",
    nickname: "오상욱",
    isAnonymous: false,
    badges: [],
    pbRecords: [
      { category: "full", record: "03:01:22", eventName: "제주마라톤", year: 2026 },
    ],
    raceHistory: [
      { eventName: "제주마라톤", year: 2026, category: "full", record: "03:01:22", rank: 9 },
      { eventName: "서울마라톤", year: 2025, category: "full", record: "03:05:10" },
    ],
    recentPosts: [],
  },
  {
    userId: "u10",
    nickname: "신예지",
    isAnonymous: false,
    badges: ["인증"],
    pbRecords: [
      { category: "full", record: "03:04:55", eventName: "춘천마라톤", year: 2025 },
      { category: "10k", record: "00:42:10", eventName: "10K 챌린지", year: 2025 },
    ],
    raceHistory: [
      { eventName: "춘천마라톤", year: 2025, category: "full", record: "03:04:55", rank: 10 },
      { eventName: "10K 챌린지", year: 2025, category: "10k", record: "00:42:10", rank: 5 },
    ],
    recentPosts: [],
  },
  {
    userId: "u11",
    nickname: "장민석",
    isAnonymous: false,
    badges: [],
    pbRecords: [
      { category: "full", record: "03:07:33", eventName: "대구마라톤", year: 2026 },
    ],
    raceHistory: [
      { eventName: "대구마라톤", year: 2026, category: "full", record: "03:07:33", rank: 11 },
    ],
    recentPosts: [],
  },
];

export function getMockPublicProfile(userId: string): PublicProfile | null {
  return MOCK_PROFILES.find((p) => p.userId === userId) ?? null;
}
