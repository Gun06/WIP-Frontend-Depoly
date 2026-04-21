import Link from "next/link";
import { Card } from "@/shared/components/ui/Card";

export function MypageBadgesScreen() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/mypage" className="text-xs text-run-muted hover:text-white">
        ← 마이페이지
      </Link>
      <h1 className="mt-4 font-display text-2xl font-bold text-white">뱃지</h1>
      <Card className="mt-6 text-sm text-run-muted">자동 부여·표시 on/off·필터 (데모)</Card>
    </div>
  );
}
