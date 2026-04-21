import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";

export function RecordApprovalsScreen() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white">기록 인증</h1>
      <p className="mt-2 text-sm text-run-muted">PASS / FAIL, 반려 사유, 증빙 PDF 검토</p>
      <Card className="mt-6 text-sm text-run-muted">신청 큐 (데모)</Card>
      <div className="mt-4 flex gap-2">
        <Button type="button">승인</Button>
        <Button type="button" variant="outline">
          반려
        </Button>
      </div>
    </div>
  );
}
