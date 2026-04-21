import { NextResponse } from "next/server";
import { AUTH_COOKIE_KEY } from "@/shared/constants/auth";

type Body = { role?: "member" | "admin" };

export async function POST(request: Request) {
  let body: Body = {};
  try {
    body = (await request.json()) as Body;
  } catch {
    body = {};
  }
  const role = body.role === "admin" ? "admin" : "member";
  const res = NextResponse.json({ ok: true, role });
  res.cookies.set(AUTH_COOKIE_KEY, role, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
  });
  return res;
}
