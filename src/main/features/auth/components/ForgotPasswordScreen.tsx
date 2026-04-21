import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";
import { Input } from "@/shared/components/ui/Input";

export function ForgotPasswordScreen() {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="font-display text-3xl font-bold text-white">계정 찾기</h1>
      <p className="mt-2 text-sm text-run-muted">
        이메일·전화 본인 확인 후 아이디 찾기 / 비밀번호 재설정(이중 입력) 플로우를 여기에 연결합니다.
      </p>
      <Card className="mt-8 space-y-4">
        <Input label="이메일" name="email" type="email" />
        <Input label="전화번호" name="phone" type="tel" />
        <Button type="button" className="w-full">
          인증 코드 보내기 (데모)
        </Button>
      </Card>
    </div>
  );
}
