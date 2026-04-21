"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { AUTH_API_PATHS } from "@/shared/constants/auth";
import { ROUTES } from "@/shared/constants/routes";
import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";
import { Input } from "@/shared/components/ui/Input";

export function LoginScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? ROUTES.mypage;
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    await fetch(AUTH_API_PATHS.login, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: "member" }),
    });
    setPending(false);
    router.push(next);
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-run-muted">
        WIP
      </p>
      <h1 className="font-display text-3xl font-bold text-white">로그인</h1>
      <p className="mt-2 text-sm text-run-muted">
        프로토타입: 아이디·비밀번호 입력 후 로그인하면 회원 세션이 열립니다.
      </p>
      <Card className="mt-8 space-y-4">
        <form className="space-y-4" onSubmit={onSubmit}>
          <Input label="아이디" name="userId" autoComplete="username" required />
          <Input
            label="비밀번호"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "처리 중…" : "로그인"}
          </Button>
        </form>
        <div className="flex flex-wrap justify-between gap-2 text-xs">
          <Link href={ROUTES.register} className="text-run-muted underline hover:text-white">
            회원가입
          </Link>
          <Link
            href={ROUTES.forgotPassword}
            className="text-run-muted underline hover:text-white"
          >
            아이디 / 비밀번호 찾기
          </Link>
        </div>
      </Card>
    </div>
  );
}
