"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AUTH_API_PATHS } from "@/shared/constants/auth";
import { ROUTES } from "@/shared/constants/routes";
import { Button } from "@/shared/components/ui/Button";

type Props = {
  redirectTo?: string;
  label?: string;
  className?: string;
  variant?: "primary" | "ghost" | "outline";
};

export function LogoutButton({
  redirectTo = ROUTES.home,
  label = "로그아웃",
  className,
  variant = "ghost",
}: Props) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function logout() {
    setPending(true);
    await fetch(AUTH_API_PATHS.logout, { method: "POST" });
    setPending(false);
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <Button type="button" variant={variant} className={className} onClick={logout} disabled={pending}>
      {pending ? "로그아웃 중…" : label}
    </Button>
  );
}
