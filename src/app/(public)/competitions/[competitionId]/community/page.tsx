import { CommunityListScreen } from "@/main/features/community/components/CommunityListScreen";

type Props = { params: Promise<{ competitionId: string }> };

export default async function CompetitionCommunityPage({ params }: Props) {
  const { competitionId } = await params;
  return (
    <CommunityListScreen scope="competition" competitionId={competitionId} />
  );
}
