import { PostDetailScreen } from "@/main/features/community/components/PostDetailScreen";
import { getMockPostTitle } from "@/shared/lib/mocks/competitions";

type Props = { params: Promise<{ postId: string }> };

export default async function CommunityPostPage({ params }: Props) {
  const { postId } = await params;
  return (
    <PostDetailScreen
      postId={postId}
      title={getMockPostTitle(postId)}
      backHref="/community"
    />
  );
}
