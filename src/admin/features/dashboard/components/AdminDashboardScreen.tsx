import Link from "next/link";
import { Card } from "@/shared/components/ui/Card";

const links = [
  { href: "/admin/competitions", label: "대회·종목" },
  { href: "/admin/leaderboard", label: "Top100 업로드" },
  { href: "/admin/records", label: "기록 인증" },
  { href: "/admin/ranking-jobs", label: "랭킹 재계산" },
  { href: "/admin/influencer", label: "인플루언서 승인" },
  { href: "/admin/users", label: "회원 관리" },
] as const;

export function AdminDashboardScreen() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white">관리자 홈</h1>
      <p className="mt-2 text-sm text-run-muted">README의 admin 하위 경로와 대응합니다.</p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((l) => (
          <Link key={l.href} href={l.href}>
            <Card className="transition hover:border-run-volt/40">
              <p className="font-semibold text-white">{l.label}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
