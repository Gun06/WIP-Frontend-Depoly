import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";

export function InfluencerApprovalsScreen() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white">인플루언서 승인</h1>
      <Card className="mt-6 text-sm text-run-muted">신청 목록·승인·반려 (데모)</Card>
      <Button type="button" className="mt-6" variant="outline">
        반려 사유 입력
      </Button>
    </div>
  );
}
