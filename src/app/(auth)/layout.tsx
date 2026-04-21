import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-run-bg">
      <div className="mx-auto flex max-w-lg justify-end px-4 pt-4">
        <Link
          href="/"
          className="text-xs font-semibold uppercase tracking-wider text-run-muted hover:text-white"
        >
          홈
        </Link>
      </div>
      {children}
    </div>
  );
}
