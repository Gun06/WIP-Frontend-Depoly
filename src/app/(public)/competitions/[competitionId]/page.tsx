import { CompetitionDetailScreen } from "@/main/features/competitions/components/CompetitionDetailScreen";

type Props = { params: Promise<{ competitionId: string }> };

export default async function CompetitionDetailPage({ params }: Props) {
  const { competitionId } = await params;
  return <CompetitionDetailScreen id={competitionId} />;
}
