export type CompetitionSummary = {
  id: string;
  name: string;
  date: string;
  location: string;
};

export type PostSummary = {
  id: string;
  title: string;
  author: string;
  createdAt: string;
};

// ─── Ranking ───────────────────────────────────────────────────────────────

export type RankEvent = "full" | "half" | "10k" | "5k";
export type RankGender = "all" | "M" | "F";
export type RankSeason = "pb" | "2026";
export type RankPeriod = "week" | "lastweek" | "month";
export type GroupType = "all" | "crew" | "team";
export type VoteType = "up" | "down";

export type RecordRankItem = {
  rank: number;
  previousRank: number | null;
  userId: string | null;
  nickname: string;
  isAnonymous: boolean;
  badges: string[];
  eventName: string;
  eventYear: number;
  gender: "M" | "F";
  record: string;
  isMyRecord: boolean;
};

export type InfluencerRankItem = {
  rank: number;
  influencerId: string;
  name: string;
  isMasked: boolean;
  platform: string;
  subscriberCount: number;
  upCount: number;
  downCount: number;
  myVote: VoteType | null;
};

export type GroupRankItem = {
  rank: number;
  previousRank: number | null;
  organizationId: string;
  name: string;
  isMasked: boolean;
  type: "crew" | "team";
  memberCount: number;
  score: number;
};

export type MyRecordRank = {
  rank: number;
  previousRank: number | null;
  record: string;
};

// ─── Influencer Detail ──────────────────────────────────────────────────────

export type InfluencerDetail = {
  influencerId: string;
  name: string;
  isMasked: boolean;
  platform: string;
  subscriberCount: number;
  channelUrl: string;
  rank: number;
  previousRank: number | null;
  upCount: number;
  downCount: number;
  weeklyUpCount: number;
  weeklyDownCount: number;
  cumulativeUpCount: number;
  isWipMember: boolean;
  recentPosts: PostSummary[];
};

// ─── Group Detail ───────────────────────────────────────────────────────────

export type GroupMember = {
  userId: string;
  nickname: string;
  role: "LEADER" | "MEMBER";
  pbRecords: Partial<Record<RankEvent, string>>;
};

export type GroupDetail = {
  organizationId: string;
  name: string;
  type: "crew" | "team";
  memberCount: number;
  description: string;
  members: GroupMember[];
  avgRecords: Partial<Record<RankEvent, string>>;
  recentPosts: PostSummary[];
};

// ─── Public Profile ─────────────────────────────────────────────────────────

export type PbRecord = {
  category: RankEvent;
  record: string;
  eventName: string;
  year: number;
};

export type RaceHistory = {
  eventName: string;
  year: number;
  category: RankEvent;
  record: string;
  rank?: number;
};

export type PublicProfile = {
  userId: string;
  nickname: string;
  isAnonymous: boolean;
  badges: string[];
  pbRecords: PbRecord[];
  raceHistory: RaceHistory[];
  recentPosts: PostSummary[];
};
