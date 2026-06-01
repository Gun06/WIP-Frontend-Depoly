"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/admin", label: "홈" },
  { href: "/admin/competitions", label: "대회" },
  { href: "/admin/leaderboard", label: "Top100" },
  { href: "/admin/records", label: "기록" },
  { href: "/admin/ranking-jobs", label: "랭킹" },
  { href: "/admin/influencer", label: "인플루언서" },
  { href: "/admin/users", label: "회원" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-2 px-4 pb-4 lg:flex-1 lg:flex-col lg:gap-1">
      {nav.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={
              active
                ? "admin-sidebar-link admin-sidebar-link--active px-3 py-2 text-xs font-semibold uppercase tracking-wider"
                : "admin-sidebar-link px-3 py-2 text-xs font-semibold uppercase tracking-wider"
            }
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
