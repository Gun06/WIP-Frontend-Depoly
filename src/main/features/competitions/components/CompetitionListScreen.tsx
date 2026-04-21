import Link from "next/link";
import { Card } from "@/shared/components/ui/Card";
import { MOCK_COMPETITIONS } from "@/shared/lib/mocks/competitions";

export function CompetitionListScreen() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold text-white">대회</h1>
      <p className="mt-2 text-sm text-run-muted">일정·장소·상세·대회별 커뮤니티·리더보드로 이어집니다.</p>
      <ul className="mt-8 space-y-3">
        {MOCK_COMPETITIONS.map((c) => (
          <li key={c.id}>
            <Link href={`/competitions/${c.id}`}>
              <Card className="transition hover:border-run-volt/40">
                <p className="font-display text-xl font-semibold text-white">{c.name}</p>
                <p className="mt-1 text-sm text-run-muted">
                  {c.date} · {c.location}
                </p>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
