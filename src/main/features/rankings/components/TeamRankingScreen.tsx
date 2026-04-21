import Link from "next/link";
import { Card } from "@/shared/components/ui/Card";

export function TeamRankingScreen() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/ranking" className="text-xs text-run-muted hover:text-white">
        ← 랭킹 홈
      </Link>
      <h1 className="mt-4 font-display text-2xl font-bold text-white">팀 랭킹</h1>
      <Card className="mt-6 text-sm text-run-muted">크루/단체 랭킹 표 (데모)</Card>
    </div>
  );
}
