import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEMO_SESSION_COOKIE } from "@/shared/lib/auth/constants";
import { MEMBER_PROTECTED_PATHS } from "@/shared/constants/auth";
import { ROUTES } from "@/shared/constants/routes";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get(DEMO_SESSION_COOKIE)?.value;

  if (pathname.startsWith(ROUTES.adminLogin)) {
    return NextResponse.next();
  }

  if (pathname.startsWith(ROUTES.admin)) {
    if (session !== "admin") {
      return NextResponse.redirect(new URL(ROUTES.adminLogin, request.url));
    }
    return NextResponse.next();
  }

  const needsMember = MEMBER_PROTECTED_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

  if (needsMember && session !== "member") {
    const url = new URL(ROUTES.login, request.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/mypage/:path*",
    "/records/apply",
    "/groups/:path*",
    "/influencer",
    "/influencer/:path*",
  ],
};
