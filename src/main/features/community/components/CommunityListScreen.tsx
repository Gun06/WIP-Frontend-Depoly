import Link from "next/link";
import { Card } from "@/shared/components/ui/Card";
import { MOCK_POSTS } from "@/shared/lib/mocks/competitions";

type Props = { scope?: "global" | "competition"; competitionId?: string };

export function CommunityListScreen({ scope = "global", competitionId }: Props) {
  const base = scope === "competition" && competitionId ? `/competitions/${competitionId}/community` : "/community";
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold text-white">
        {scope === "competition" ? "대회 커뮤니티" : "커뮤니티"}
      </h1>
      <p className="mt-2 text-sm text-run-muted">게시글·댓글·추천(회원)·비회원 익명·6자리 비밀번호</p>
      <ul className="mt-8 space-y-3">
        {MOCK_POSTS.map((p) => (
          <li key={`${base}-${p.id}`}>
            <Link href={`${base}/${p.id}`}>
              <Card className="transition hover:border-run-volt/40">
                <p className="font-semibold text-white">{p.title}</p>
                <p className="mt-1 text-xs text-run-muted">
                  {p.author} · {p.createdAt}
                </p>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
