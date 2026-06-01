import { AdminSidebarLogout } from "./AdminSidebarLogout";
import { AdminSidebarNav } from "./AdminSidebarNav";

export default function AdminShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-shell flex min-h-dvh flex-col overflow-hidden lg:h-dvh lg:flex-row">
      <aside className="admin-sidebar flex shrink-0 flex-col border-b border-white/10 lg:h-dvh lg:w-56 lg:overflow-y-auto lg:border-b-0 lg:border-r">
        <div className="px-4 py-4">
          <p className="admin-sidebar-brand font-display text-lg font-semibold">Admin</p>
        </div>

        <AdminSidebarNav />

        <div className="admin-sidebar-footer mt-auto border-t border-run-border px-4 py-3">
          <AdminSidebarLogout />
        </div>
      </aside>
      <div className="admin-main flex min-h-0 flex-1 flex-col overflow-hidden px-4 py-8 lg:px-10">
        {children}
      </div>
    </div>
  );
}
