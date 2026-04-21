export default function RunLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-dvh bg-run-bg">{children}</div>;
}
