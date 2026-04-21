import Link from "next/link";
import { Card } from "@/shared/components/ui/Card";

export function MypageHomeScreen() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold text-white">마이페이지</h1>
      <p className="mt-2 text-sm text-run-muted">프로필·신발·공개 설정·참가 기록 요약</p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <Link href="/mypage/records">
          <Card className="transition hover:border-run-volt/40">
            <p className="font-semibold text-white">내 대회 기록</p>
          </Card>
        </Link>
        <Link href="/mypage/badges">
          <Card className="transition hover:border-run-volt/40">
            <p className="font-semibold text-white">뱃지</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
