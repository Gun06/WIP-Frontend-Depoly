import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";
import { Input } from "@/shared/components/ui/Input";

export function RegisterScreen() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <h1 className="font-display text-3xl font-bold text-white">회원가입</h1>
      <p className="mt-2 text-sm text-run-muted">
        기획 필드(이름·생년월일·성별·신발 사이즈·닉네임·전화·이메일·아이디·비밀번호·이메일 인증) UI
        스켈레톤입니다.
      </p>
      <Card className="mt-8 grid gap-4 sm:grid-cols-2">
        <Input label="이름" name="name" />
        <Input label="닉네임" name="nickname" />
        <Input label="생년월일" name="dob" type="date" />
        <Input label="성별" name="gender" placeholder="선택" />
        <Input label="신발 사이즈" name="shoe" />
        <Input label="전화" name="phone" type="tel" />
        <Input label="이메일" name="email" type="email" className="sm:col-span-2" />
        <Input label="아이디" name="loginId" className="sm:col-span-2" />
        <Input label="비밀번호" name="password" type="password" />
        <Input label="비밀번호 확인" name="password2" type="password" />
      </Card>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button type="button">가입 요청 (데모)</Button>
        <Link
          href="/login"
          className="inline-flex items-center rounded-full border border-run-border px-5 py-2.5 text-sm font-semibold text-run-muted hover:text-white"
        >
          로그인으로
        </Link>
      </div>
    </div>
  );
}
