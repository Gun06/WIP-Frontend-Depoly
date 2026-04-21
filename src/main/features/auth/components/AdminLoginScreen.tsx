"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AUTH_API_PATHS } from "@/shared/constants/auth";
import { ROUTES } from "@/shared/constants/routes";
import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";
import { Input } from "@/shared/components/ui/Input";

export function AdminLoginScreen() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    await fetch(AUTH_API_PATHS.login, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: "admin" }),
    });
    setPending(false);
    router.push(ROUTES.admin);
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-4">
      <h1 className="font-display text-2xl font-bold text-white">관리자 로그인</h1>
      <p className="mt-2 text-sm text-run-muted">데모: 제출 시 관리자 세션 쿠키가 설정됩니다.</p>
      <Card className="mt-8 space-y-4">
        <form className="space-y-4" onSubmit={onSubmit}>
          <Input label="관리자 아이디" name="id" autoComplete="username" />
          <Input label="비밀번호" name="password" type="password" autoComplete="current-password" />
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "처리 중…" : "관리자로 로그인"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
