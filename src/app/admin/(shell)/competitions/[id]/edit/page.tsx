import { AdminCompetitionFormScreen } from "@/admin/features/competitions/components/AdminCompetitionFormScreen";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminCompetitionEditPage({ params }: Props) {
  const { id } = await params;
  return <AdminCompetitionFormScreen mode="edit" competitionId={id} />;
}
