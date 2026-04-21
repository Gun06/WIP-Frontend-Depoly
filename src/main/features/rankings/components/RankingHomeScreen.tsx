import Link from "next/link";
import { Card } from "@/shared/components/ui/Card";

export function RankingHomeScreen() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold text-white">랭킹</h1>
      <p className="mt-2 text-sm text-run-muted">주간 갱신·대회/인플루언서 탭·내부 상하 집계 버튼 자리</p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <Link href="/ranking/influencer">
          <Card className="h-full transition hover:border-run-volt/40">
            <p className="font-semibold text-white">인플루언서 랭킹</p>
            <p className="mt-1 text-xs text-run-muted">비회원 포함 전체 조회</p>
          </Card>
        </Link>
        <Link href="/ranking/team">
          <Card className="h-full transition hover:border-run-volt/40">
            <p className="font-semibold text-white">팀 / 크루 랭킹</p>
            <p className="mt-1 text-xs text-run-muted">IA에 맞게 이름 조정</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
