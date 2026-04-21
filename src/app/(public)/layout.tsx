import { cookies } from "next/headers";
import { PublicNav } from "@/shared/components/PublicNav";
import type { DemoSession } from "@/shared/lib/auth/constants";
import { DEMO_SESSION_COOKIE } from "@/shared/lib/auth/constants";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const raw = (await cookies()).get(DEMO_SESSION_COOKIE)?.value;
  const session: DemoSession =
    raw === "member" || raw === "admin" ? raw : undefined;

  return (
    <>
      <PublicNav session={session} />
      <main className="min-h-[60dvh]">{children}</main>
    </>
  );
}
