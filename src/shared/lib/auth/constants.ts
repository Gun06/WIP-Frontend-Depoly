import { AUTH_COOKIE_KEY } from "@/shared/constants/auth";

/** 프로토타입용 세션 쿠키 (실서비스 시 교체) */
export const DEMO_SESSION_COOKIE = AUTH_COOKIE_KEY;
export type DemoSession = "member" | "admin" | undefined;
