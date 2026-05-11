import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { DEMO_SESSION_COOKIE } from "@/shared/lib/auth/constants";
import { getMockGroupDetail } from "@/shared/lib/mocks/groupDetails";
import { GroupDetailScreen } from "@/main/features/groups/components/GroupDetailScreen";

type Props = { params: Promise<{ organizationId: string }> };

export default async function GroupDetailPage({ params }: Props) {
  const { organizationId } = await params;

  const group = getMockGroupDetail(organizationId);
  if (!group) notFound();

  const raw = (await cookies()).get(DEMO_SESSION_COOKIE)?.value;
  const isLoggedIn = raw === "member" || raw === "admin";

  return (
    <GroupDetailScreen group={group} isLoggedIn={isLoggedIn} backHref="/ranking" />
  );
}
