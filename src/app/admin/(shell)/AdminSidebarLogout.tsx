"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AUTH_API_PATHS } from "@/shared/constants/auth";

export function AdminSidebarLogout() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function logout() {
    setPending(true);
    await fetch(AUTH_API_PATHS.logout, { method: "POST" });
    setPending(false);
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      className="admin-sidebar-logout"
      onClick={logout}
      disabled={pending}
    >
      {pending ? "로그아웃 중…" : "로그아웃"}
    </button>
  );
}
