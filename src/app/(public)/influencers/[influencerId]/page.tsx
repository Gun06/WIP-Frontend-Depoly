import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { DEMO_SESSION_COOKIE } from "@/shared/lib/auth/constants";
import { getMockInfluencerDetail } from "@/shared/lib/mocks/influencerDetails";
import { InfluencerDetailScreen } from "@/main/features/rankings/components/influencer/InfluencerDetailScreen";

type Props = { params: Promise<{ influencerId: string }> };

export default async function InfluencerDetailPage({ params }: Props) {
  const { influencerId } = await params;

  const influencer = getMockInfluencerDetail(influencerId);
  if (!influencer) notFound();

  const raw = (await cookies()).get(DEMO_SESSION_COOKIE)?.value;
  const isLoggedIn = raw === "member" || raw === "admin";

  return (
    <InfluencerDetailScreen
      influencer={influencer}
      isLoggedIn={isLoggedIn}
      backHref="/ranking"
    />
  );
}
