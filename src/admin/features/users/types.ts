export type UserStatus = "ACTIVE" | "SUSPENDED";
export type UserGender = "M" | "F";

export type UserBadge = {
  name: string;
  grantedAt: string;
};

export type UserStats = {
  eventCount: number;
  recordCount: number;
  articleCount: number;
};

export type AdminUser = {
  id: string;
  nickname: string;
  email: string;
  gender: UserGender;
  birth: string;
  footSize: number;
  joinedAt: string;
  status: UserStatus;
  badges: UserBadge[];
  stats: UserStats;
};
