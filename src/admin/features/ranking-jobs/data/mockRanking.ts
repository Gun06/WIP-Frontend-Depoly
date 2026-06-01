export type RankingLogStatus = "SUCCESS" | "FAIL";

export type RankingLog = {
  id: string;
  datetime: string;
  type: string;
  status: RankingLogStatus;
};

export type LastUpdated = {
  record: string;
  influencer: string;
  group: string;
};

export type RecalcKind = "record" | "influencer" | "group" | "all";

export type JobStatus = "idle" | "REQUESTING" | "SUCCESS" | "FAIL";

export type InfluencerRankingRow = {
  id: string;
  rank: number;
  name: string;
  platform: "YouTube" | "Instagram" | "기타";
  upCount: number;
  downCount: number;
  subscriptionActive: boolean;
};

export type GroupRankingRow = {
  id: string;
  rank: number;
  name: string;
  type: "크루" | "훈련팀";
  memberCount: number;
  score: number;
  subscriptionActive: boolean;
};

export const INITIAL_RANKING_LOGS: RankingLog[] = [
  { id: "1", datetime: "2026-06-01 15:00", type: "전체", status: "SUCCESS" },
  { id: "2", datetime: "2026-05-25 15:00", type: "인플루언서", status: "SUCCESS" },
  { id: "3", datetime: "2026-05-18 15:00", type: "전체", status: "FAIL" },
  { id: "4", datetime: "2026-05-11 15:00", type: "기록", status: "SUCCESS" },
  { id: "5", datetime: "2026-05-04 15:00", type: "전체", status: "SUCCESS" },
];

export const INITIAL_LAST_UPDATED: LastUpdated = {
  record: "2026-06-01 15:00",
  influencer: "2026-06-01 15:00",
  group: "2026-05-25 15:00",
};

export const INITIAL_INFLUENCER_RANKING: InfluencerRankingRow[] = [
  {
    id: "1",
    rank: 1,
    name: "런닝유어라이프",
    platform: "YouTube",
    upCount: 1240,
    downCount: 88,
    subscriptionActive: true,
  },
  {
    id: "2",
    rank: 2,
    name: "마라토너리뷰",
    platform: "YouTube",
    upCount: 980,
    downCount: 102,
    subscriptionActive: true,
  },
  {
    id: "3",
    rank: 3,
    name: "서브3러너",
    platform: "Instagram",
    upCount: 741,
    downCount: 55,
    subscriptionActive: true,
  },
  {
    id: "4",
    rank: 4,
    name: "김*선",
    platform: "YouTube",
    upCount: 620,
    downCount: 40,
    subscriptionActive: false,
  },
  {
    id: "5",
    rank: 5,
    name: "기어리뷰채널",
    platform: "YouTube",
    upCount: 510,
    downCount: 71,
    subscriptionActive: true,
  },
];

export const INITIAL_GROUP_RANKING: GroupRankingRow[] = [
  {
    id: "1",
    rank: 1,
    name: "한강런너스",
    type: "크루",
    memberCount: 142,
    score: 9841,
    subscriptionActive: true,
  },
  {
    id: "2",
    rank: 2,
    name: "서울페이서",
    type: "훈련팀",
    memberCount: 87,
    score: 8720,
    subscriptionActive: true,
  },
  {
    id: "3",
    rank: 3,
    name: "강남런닝클럽",
    type: "크루",
    memberCount: 203,
    score: 7650,
    subscriptionActive: true,
  },
  {
    id: "4",
    rank: 4,
    name: "대*러닝팀",
    type: "훈련팀",
    memberCount: 34,
    score: 4210,
    subscriptionActive: false,
  },
  {
    id: "5",
    rank: 5,
    name: "대구레이서",
    type: "크루",
    memberCount: 56,
    score: 3890,
    subscriptionActive: true,
  },
];

export const RECALC_TYPE_LABEL: Record<RecalcKind, string> = {
  record: "기록",
  influencer: "인플루언서",
  group: "단체",
  all: "전체",
};

// async function fetchRankingLogs(): Promise<RankingLog[]> { /* TODO: API 연동 */ }
// async function requestRankingRecalc(_kind: RecalcKind): Promise<void> { /* TODO: API 연동 */ }
