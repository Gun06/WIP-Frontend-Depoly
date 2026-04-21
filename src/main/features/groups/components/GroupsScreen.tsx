import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";

export function GroupsScreen() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold text-white">단체</h1>
      <p className="mt-2 text-sm text-run-muted">생성·초대 링크·리더 권한·단체별 뱃지</p>
      <Card className="mt-8 text-sm text-run-muted">단체 목록 / 생성 CTA (데모)</Card>
      <Button type="button" className="mt-6" variant="outline">
        단체 만들기
      </Button>
    </div>
  );
}
