export const AUTH_API_PATHS = {
  login: "/api/auth/login",
  logout: "/api/auth/logout",
} as const;

export const AUTH_COOKIE_KEY = "wip-demo";

export const MEMBER_PROTECTED_PATHS = [
  "/mypage",
  "/records/apply",
  "/groups",
  "/influencer",
] as const;
