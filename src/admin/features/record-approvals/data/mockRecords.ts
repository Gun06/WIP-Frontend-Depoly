type Status = "PENDING" | "PASS" | "NON-PASS";

export interface RecordItem {
  id: string;
  submittedAt: string;
  nickname: string;
  eventName: string;
  category: string;
  record: string;
  status: Status;
  proofImageUrl: string;
  rejectReason?: string;
}

const NAMES = [
  "김준혁", "박지성", "이현우", "최수연", "정민재", "한소희", "오세훈", "윤도현",
  "강미래", "임태양", "서지우", "노하늘", "배성민", "류지원", "문채원", "송현석",
  "황예린", "조민호", "신다은", "권태영", "유서연", "홍길동", "장미래", "남궁민", "설윤아",
];

const EVENTS = [
  "서울마라톤 2026", "동아마라톤 2026", "춘천마라톤 2025", "JTBC마라톤 2026",
  "경주마라톤 2026", "대구마라톤 2026", "인천마라톤 2026", "부산마라톤 2026",
];

const CATEGORIES = ["풀마라톤", "하프", "10K", "5K"] as const;

const STATUSES: Status[] = ["PENDING", "PASS", "NON-PASS"];

const RECORDS_BY_CATEGORY: Record<(typeof CATEGORIES)[number], string[]> = {
  풀마라톤: ["02:54:12", "03:12:05", "03:45:33", "02:38:19"],
  하프: ["01:28:33", "01:45:02", "01:52:18", "01:35:44"],
  "10K": ["00:48:21", "00:52:07", "00:55:33", "00:46:12"],
  "5K": ["00:22:15", "00:24:48", "00:26:03", "00:21:37"],
};

export const INITIAL_RECORDS: RecordItem[] = Array.from({ length: 25 }, (_, i) => {
  const category = CATEGORIES[i % CATEGORIES.length];
  const status = STATUSES[i % STATUSES.length];
  const day = String(28 - (i % 28)).padStart(2, "0");

  return {
    id: String(i + 1),
    submittedAt: `2026-05-${day}`,
    nickname: NAMES[i],
    eventName: EVENTS[i % EVENTS.length],
    category,
    record: RECORDS_BY_CATEGORY[category][i % RECORDS_BY_CATEGORY[category].length],
    status,
    proofImageUrl: `https://placehold.co/600x400?text=기록증+${i + 1}`,
    ...(status === "NON-PASS"
      ? { rejectReason: "기록증 이미지가 흐려 판독 불가" }
      : {}),
  };
});
