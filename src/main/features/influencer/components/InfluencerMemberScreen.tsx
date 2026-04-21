import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";
import { Input } from "@/shared/components/ui/Input";

export function InfluencerMemberScreen() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold text-white">인플루언서</h1>
      <p className="mt-2 text-sm text-run-muted">신청·1:1 추천·좋아요 토글 (회원)</p>
      <Card className="mt-8 space-y-4">
        <Input label="메시지" name="msg" />
        <Input label="채널 링크" name="url" type="url" />
        <Button type="button">신청하기 (데모)</Button>
      </Card>
    </div>
  );
}
