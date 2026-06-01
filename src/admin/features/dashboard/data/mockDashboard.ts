export type RecentRecordStatus = "PENDING";

export type RecentRecordRow = {
  submittedAt: string;
  nickname: string;
  eventName: string;
  category: string;
  record: string;
  status: RecentRecordStatus;
};

export const MOCK_DASHBOARD = {
  pendingRecords: 9,
  pendingInfluencers: 2,
  totalUsers: 1240,
  lastRankingUpdate: "2026-06-01",
} as const;

export const MOCK_RECENT_RECORDS: RecentRecordRow[] = [
  {
    submittedAt: "2026-06-01",
    nickname: "김준혁",
    eventName: "서울마라톤 2026",
    category: "풀마라톤",
    record: "02:54:12",
    status: "PENDING",
  },
  {
    submittedAt: "2026-05-31",
    nickname: "최수연",
    eventName: "JTBC마라톤 2026",
    category: "5K",
    record: "00:21:37",
    status: "PENDING",
  },
  {
    submittedAt: "2026-05-30",
    nickname: "오세훈",
    eventName: "인천마라톤 2026",
    category: "10K",
    record: "00:55:33",
    status: "PENDING",
  },
  {
    submittedAt: "2026-05-29",
    nickname: "임태양",
    eventName: "동아마라톤 2026",
    category: "하프",
    record: "01:45:02",
    status: "PENDING",
  },
  {
    submittedAt: "2026-05-28",
    nickname: "배성민",
    eventName: "경주마라톤 2026",
    category: "풀마라톤",
    record: "02:54:12",
    status: "PENDING",
  },
];
