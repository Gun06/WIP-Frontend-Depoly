import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";

export function RankingJobsScreen() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white">랭킹 수동 최신화</h1>
      <p className="mt-2 text-sm text-run-muted">대용량·비동기 재계산 트리거 (관리자)</p>
      <Card className="mt-6 text-sm text-run-muted">작업 상태 로그 자리 (데모)</Card>
      <Button type="button" className="mt-6">
        재계산 요청
      </Button>
    </div>
  );
}
