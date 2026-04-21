import Link from "next/link";
import { Card } from "@/shared/components/ui/Card";

export function CompetitionLeaderboardScreen({ id }: { id: string }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href={`/competitions/${id}`} className="text-xs text-run-muted hover:text-white">
        ← 대회 상세
      </Link>
      <h1 className="mt-4 font-display text-2xl font-bold text-white">Top100 · 리더보드</h1>
      <p className="mt-2 text-sm text-run-muted">관리자 업로드 데이터 / 개인 기록과 분리된 랭킹 표 자리입니다.</p>
      <Card className="mt-8 text-sm text-run-muted">표 컴포넌트 (데모)</Card>
    </div>
  );
}
