/** 인플루언서 상태·플랫폼 뱃지와 동일한 소프트 필 스타일 (종목 태그 제외) */
const pill = "inline-flex rounded-full px-2.5 py-1 text-xs font-medium";

export const adminPillBadge = {
  pending: `${pill} bg-yellow-500/20 text-yellow-400`,
  approved: `${pill} bg-green-500/20 text-green-400`,
  rejected: `${pill} bg-red-500/20 text-red-400`,
  before: `${pill} bg-blue-500/20 text-blue-400`,
  ended: `${pill} bg-run-border text-run-muted`,
} as const;

export const adminPlatformPillBadge = {
  YouTube: `${pill} bg-red-500/20 text-red-400`,
  Instagram: `${pill} bg-purple-500/20 text-purple-400`,
  기타: `${pill} bg-run-border text-run-muted`,
} as const;
