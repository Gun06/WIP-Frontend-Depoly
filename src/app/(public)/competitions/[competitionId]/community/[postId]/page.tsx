import { PostDetailScreen } from "@/main/features/community/components/PostDetailScreen";
import { getMockPostTitle } from "@/shared/lib/mocks/competitions";

type Props = { params: Promise<{ competitionId: string; postId: string }> };

export default async function CompetitionPostPage({ params }: Props) {
  const { competitionId, postId } = await params;
  const title = getMockPostTitle(postId);
  return (
    <PostDetailScreen
      postId={postId}
      title={title}
      backHref={`/competitions/${competitionId}/community`}
    />
  );
}
