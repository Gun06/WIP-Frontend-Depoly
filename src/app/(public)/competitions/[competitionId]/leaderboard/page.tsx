import { CompetitionLeaderboardScreen } from "@/main/features/competitions/components/CompetitionLeaderboardScreen";

type Props = { params: Promise<{ competitionId: string }> };

export default async function CompetitionLeaderboardPage({ params }: Props) {
  const { competitionId } = await params;
  return <CompetitionLeaderboardScreen id={competitionId} />;
}
