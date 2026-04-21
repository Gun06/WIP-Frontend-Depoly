import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";

export function Top100UploadScreen() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white">Top100 엑셀 업로드</h1>
      <Card className="mt-6 space-y-4 text-sm text-run-muted">
        <p>엑셀 파일 선택 후 업로드. 사용자 계정과 무관한 단독 랭킹 데이터.</p>
        <input type="file" accept=".xlsx,.xls" className="text-xs" />
      </Card>
      <Button type="button" className="mt-6" variant="outline">
        업로드 (데모)
      </Button>
    </div>
  );
}
