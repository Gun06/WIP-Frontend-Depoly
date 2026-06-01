import type { AdminUser, UserStatus } from "../types";

/** 회원 목록 조회 — TODO: API 연동 */
export async function fetchAdminUsers(): Promise<AdminUser[]> {
  return [];
}

/** 계정 상태 변경 — TODO: API 연동 */
export async function updateUserStatus(userId: string, status: UserStatus): Promise<void> {
  void userId;
  void status;
}

/** 뱃지 부여 — TODO: API 연동 */
export async function grantUserBadge(userId: string, badgeName: string): Promise<void> {
  void userId;
  void badgeName;
}

/** 뱃지 회수 — TODO: API 연동 */
export async function revokeUserBadge(userId: string, badgeName: string): Promise<void> {
  void userId;
  void badgeName;
}
