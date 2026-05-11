import type { GroupDetail } from "@/shared/types/domain";

const MOCK_POSTS = [
  {
    id: "p1",
    title: "이번 주 한강 새벽 런 후기 🌅",
    author: "김준혁",
    createdAt: "2026-05-01",
  },
  {
    id: "p2",
    title: "5월 정기 훈련 일정 공지",
    author: "박서준",
    createdAt: "2026-04-28",
  },
  {
    id: "p3",
    title: "서울마라톤 단체 참가 후기 및 기록 공유",
    author: "이민호",
    createdAt: "2026-04-20",
  },
];

const MOCK_GROUP_DETAILS: GroupDetail[] = [
  {
    organizationId: "g1",
    name: "한강런너스",
    type: "crew",
    memberCount: 142,
    description:
      "한강변을 따라 달리는 서울 대표 러닝 크루입니다. 매주 수·토 새벽 6시에 모여 함께 달립니다. Sub3를 목표로 하는 러너부터 첫 마라톤을 준비하는 초보까지 누구나 환영해요!",
    members: [
      {
        userId: "u1",
        nickname: "김준혁",
        role: "LEADER",
        pbRecords: { full: "02:41:08", half: "01:14:22" },
      },
      {
        userId: "u3",
        nickname: "이민호",
        role: "MEMBER",
        pbRecords: { full: "02:45:22", half: "01:18:10" },
      },
      {
        userId: "u9",
        nickname: "오상욱",
        role: "MEMBER",
        pbRecords: { full: "03:01:22", "10k": "00:40:55" },
      },
      {
        userId: "u11",
        nickname: "장민석",
        role: "MEMBER",
        pbRecords: { full: "03:07:33" },
      },
    ],
    avgRecords: { full: "02:53:46", half: "01:18:44", "10k": "00:43:12" },
    recentPosts: MOCK_POSTS,
  },
  {
    organizationId: "g2",
    name: "서울페이서",
    type: "team",
    memberCount: 87,
    description:
      "전문 코치진이 이끄는 기록 단축 전문 훈련팀입니다. 체계적인 인터벌 훈련과 장거리 주행으로 목표 기록 달성을 함께 합니다.",
    members: [
      {
        userId: "u2",
        nickname: "박서준",
        role: "LEADER",
        pbRecords: { full: "02:43:55", half: "01:15:40" },
      },
      {
        userId: "u6",
        nickname: "홍경훈",
        role: "MEMBER",
        pbRecords: { full: "02:54:19", half: "01:20:55" },
      },
      {
        userId: "u10",
        nickname: "신예지",
        role: "MEMBER",
        pbRecords: { full: "03:04:55", "10k": "00:42:10" },
      },
    ],
    avgRecords: { full: "02:57:43", half: "01:18:47", "10k": "00:41:55" },
    recentPosts: [
      {
        id: "p4",
        title: "인터벌 훈련 5월 커리큘럼 안내",
        author: "박서준",
        createdAt: "2026-05-02",
      },
      {
        id: "p5",
        title: "제주마라톤 단체 참가 결과 보고",
        author: "홍경훈",
        createdAt: "2026-04-25",
      },
    ],
  },
  {
    organizationId: "g3",
    name: "강남런닝클럽",
    type: "crew",
    memberCount: 203,
    description:
      "강남 지역 최대 러닝 커뮤니티! 주 3회 정기 런과 월 1회 대회 참가를 함께 합니다. 레벨별 그룹 운영으로 초보자도 부담 없이 참여하세요.",
    members: [
      {
        userId: "u4",
        nickname: "최지우",
        role: "LEADER",
        pbRecords: { full: "02:48:11", half: "01:17:05" },
      },
      {
        userId: "u7",
        nickname: "이수진",
        role: "MEMBER",
        pbRecords: { full: "02:57:44", half: "01:22:18" },
      },
    ],
    avgRecords: { full: "03:05:20", half: "01:24:33", "10k": "00:45:50", "5k": "00:22:10" },
    recentPosts: [
      {
        id: "p6",
        title: "강남 런닝 코스 추천 BEST 5",
        author: "최지우",
        createdAt: "2026-05-01",
      },
      {
        id: "p7",
        title: "4월 정기 런 사진 모음",
        author: "이수진",
        createdAt: "2026-04-22",
      },
      {
        id: "p8",
        title: "5월 대회 단체 참가 신청 받습니다",
        author: "최지우",
        createdAt: "2026-04-18",
      },
    ],
  },
  {
    organizationId: "g4",
    name: "부산갈매기런",
    type: "crew",
    memberCount: 65,
    description: "광안리, 해운대를 달리는 부산 최고의 러닝 크루. 바다 바람과 함께 달려요!",
    members: [
      {
        userId: "u8",
        nickname: "정도현",
        role: "LEADER",
        pbRecords: { full: "02:59:01", half: "01:22:44" },
      },
    ],
    avgRecords: { full: "03:12:05", half: "01:28:10" },
    recentPosts: [
      {
        id: "p9",
        title: "부산마라톤 2026 단체 후기",
        author: "정도현",
        createdAt: "2026-04-30",
      },
    ],
  },
  {
    organizationId: "g5",
    name: "박*스팀",
    type: "team",
    memberCount: 34,
    description: "비공개 훈련팀입니다. 단체 정보는 회원에게만 공개됩니다.",
    members: [],
    avgRecords: {},
    recentPosts: [],
  },
  {
    organizationId: "g6",
    name: "대구레이서",
    type: "crew",
    memberCount: 56,
    description: "대구 지역 기반 러닝 크루. 팔공산, 두류공원 코스를 주로 달립니다.",
    members: [],
    avgRecords: { full: "03:08:44", half: "01:26:20" },
    recentPosts: [
      {
        id: "p10",
        title: "대구마라톤 2026 참가 모집",
        author: "레이서관리자",
        createdAt: "2026-04-29",
      },
    ],
  },
  {
    organizationId: "g7",
    name: "제주런닝크루",
    type: "crew",
    memberCount: 48,
    description: "제주 올레길과 해안 도로를 달리는 크루. 제주 거주자 또는 장기 방문자 모집 중!",
    members: [],
    avgRecords: { full: "03:15:22", half: "01:30:40", "10k": "00:47:33" },
    recentPosts: [],
  },
  {
    organizationId: "g8",
    name: "인천마라톤팀",
    type: "team",
    memberCount: 72,
    description: "인천 내 공식 마라톤 훈련팀. 인천국제마라톤 공식 파트너 단체입니다.",
    members: [],
    avgRecords: { full: "03:10:15", half: "01:27:05" },
    recentPosts: [],
  },
];

export function getMockGroupDetail(organizationId: string): GroupDetail | null {
  return MOCK_GROUP_DETAILS.find((g) => g.organizationId === organizationId) ?? null;
}
