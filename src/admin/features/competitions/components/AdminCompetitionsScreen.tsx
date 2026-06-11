import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";

export function AdminCompetitionsScreen() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white">대회·종목 관리</h1>
      <p className="mt-2 text-sm text-run-muted">일정 등록·수정, 종목 CRUD</p>
      <Card className="mt-6 text-sm text-run-muted">테이블 / 폼 (데모)</Card>
      <Button type="button" className="mt-6" variant="outline">
        새 대회
      </Button>
    </div>
  );
}
