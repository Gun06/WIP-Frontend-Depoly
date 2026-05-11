import { cookies } from "next/headers";
import { DEMO_SESSION_COOKIE } from "@/shared/lib/auth/constants";
import { RankingScreen } from "@/main/features/rankings/components/RankingScreen";

export default async function RankingPage() {
  const raw = (await cookies()).get(DEMO_SESSION_COOKIE)?.value;
  const isLoggedIn = raw === "member" || raw === "admin";

  return <RankingScreen isLoggedIn={isLoggedIn} />;
}
