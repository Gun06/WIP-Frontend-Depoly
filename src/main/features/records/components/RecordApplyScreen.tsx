import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";
import { Input } from "@/shared/components/ui/Input";

export function RecordApplyScreen() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold text-white">개인 기록 등록 신청</h1>
      <p className="mt-2 text-sm text-run-muted">수동 입력·증빙 PDF·자동 API 매칭 신청 UI가 들어갈 자리입니다.</p>
      <Card className="mt-8 grid gap-4 sm:grid-cols-2">
        <Input label="대회명" name="raceName" />
        <Input label="코스" name="course" />
        <Input label="기록" name="time" placeholder="HH:MM:SS" />
        <Input label="연령대" name="ageGroup" />
        <Input label="증빙 파일" name="file" type="file" className="sm:col-span-2" />
      </Card>
      <Button type="button" className="mt-8">
        신청 제출 (데모)
      </Button>
    </div>
  );
}
