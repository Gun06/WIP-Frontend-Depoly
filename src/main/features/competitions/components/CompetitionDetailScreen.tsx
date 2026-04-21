import Link from "next/link";
import { Card } from "@/shared/components/ui/Card";
import { MOCK_COMPETITIONS } from "@/shared/lib/mocks/competitions";

export function CompetitionDetailScreen({ id }: { id: string }) {
  const c = MOCK_COMPETITIONS.find((x) => x.id === id);
  if (!c) {
    return (
      <div className="px-4 py-16 text-run-muted">
        대회를 찾을 수 없습니다. <Link className="text-run-volt underline" href="/competitions">목록</Link>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-xs font-semibold uppercase tracking-wider text-run-muted">대회 상세</p>
      <h1 className="mt-2 font-display text-3xl font-bold text-white">{c.name}</h1>
      <p className="mt-2 text-sm text-run-muted">
        {c.date} · {c.location}
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <Link href={`/competitions/${c.id}/community`}>
          <Card className="h-full transition hover:border-run-volt/40">
            <p className="text-sm font-semibold text-white">대회 커뮤니티</p>
            <p className="mt-1 text-xs text-run-muted">비회원 익명·비밀번호 포함</p>
          </Card>
        </Link>
        <Link href={`/competitions/${c.id}/leaderboard`}>
          <Card className="h-full transition hover:border-run-volt/40">
            <p className="text-sm font-semibold text-white">리더보드 / Top100</p>
            <p className="mt-1 text-xs text-run-muted">조회 전용</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
