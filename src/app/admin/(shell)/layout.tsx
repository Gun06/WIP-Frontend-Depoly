import Link from "next/link";
import { LogoutButton } from "@/shared/components/LogoutButton";

const nav = [
  { href: "/admin", label: "홈" },
  { href: "/admin/competitions", label: "대회" },
  { href: "/admin/leaderboard", label: "Top100" },
  { href: "/admin/records", label: "기록" },
  { href: "/admin/ranking-jobs", label: "랭킹" },
  { href: "/admin/influencer", label: "인플루언서" },
  { href: "/admin/users", label: "회원" },
] as const;

export default function AdminShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh lg:flex">
      <aside className="border-b border-run-border lg:w-56 lg:border-b-0 lg:border-r lg:border-run-border">
        <div className="flex items-center justify-between gap-2 px-4 py-4 lg:flex-col lg:items-stretch">
          <p className="font-display text-lg font-bold text-white">Admin</p>
          <LogoutButton redirectTo="/admin/login" label="로그아웃" />
        </div>
        <nav className="flex flex-wrap gap-2 px-4 pb-4 lg:flex-col lg:gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wider text-run-muted hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex-1 px-4 py-8 lg:px-10">{children}</div>
    </div>
  );
}
