import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-run-bg px-4 text-center">
      <p className="font-display text-4xl font-bold text-white">404</p>
      <p className="text-sm text-run-muted">페이지를 찾을 수 없습니다.</p>
      <Link
        href="/"
        className="rounded-full border border-run-border px-6 py-2 text-sm font-semibold text-white hover:border-run-volt/50"
      >
        홈으로
      </Link>
    </div>
  );
}
