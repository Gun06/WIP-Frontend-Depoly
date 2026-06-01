import { AdminLightThemeOnly } from "./AdminLightThemeOnly";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="wip-admin-shell min-h-dvh bg-run-bg">
      <AdminLightThemeOnly />
      {children}
    </div>
  );
}
