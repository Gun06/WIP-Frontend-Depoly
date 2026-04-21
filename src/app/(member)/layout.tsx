import Link from "next/link";
import { LogoutButton } from "@/shared/components/LogoutButton";

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-run-bg">
      <header className="sticky top-0 z-30 border-b border-run-border/80 bg-run-bg/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <Link
            href="/mypage"
            className="text-xs font-semibold uppercase tracking-wider text-run-muted hover:text-white"
          >
            마이 구역
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-semibold uppercase tracking-wider text-run-muted hover:text-white"
            >
              서비스 홈
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
