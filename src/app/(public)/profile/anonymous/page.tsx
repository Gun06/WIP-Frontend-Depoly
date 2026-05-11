import Link from "next/link";

export default function AnonymousProfilePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link
        href="/ranking"
        className="mb-6 inline-flex items-center gap-1 text-sm text-run-muted transition hover:text-white"
      >
        ← 랭킹으로
      </Link>

      <div className="flex flex-col items-center py-20 text-center">
        <span className="text-5xl">🔒</span>
        <h1 className="mt-5 text-xl font-bold text-white">비공개 프로필입니다</h1>
        <p className="mt-2 text-sm text-run-muted">
          이 사용자는 익명으로 설정되어 있어 프로필을 확인할 수 없습니다.
        </p>
      </div>
    </div>
  );
}
