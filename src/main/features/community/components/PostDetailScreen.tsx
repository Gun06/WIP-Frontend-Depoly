import Link from "next/link";
import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";

type Props = {
  postId: string;
  backHref: string;
  title: string;
};

export function PostDetailScreen({ postId, backHref, title }: Props) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href={backHref} className="text-xs text-run-muted hover:text-white">
        ← 목록
      </Link>
      <h1 className="mt-4 font-display text-2xl font-bold text-white">{title}</h1>
      <p className="mt-2 text-xs text-run-muted">postId: {postId}</p>
      <Card className="mt-6 text-sm leading-relaxed text-run-muted">
        본문·사진·링크·해시태그·뱃지 표시·익명 여부·비회원 비밀번호 수정 플로우가 들어갈 영역입니다.
      </Card>
      <div className="mt-8 flex flex-wrap gap-2">
        <Button type="button" variant="outline">
          추천 (회원)
        </Button>
        <Button type="button" variant="ghost">
          댓글 쓰기
        </Button>
      </div>
    </div>
  );
}
