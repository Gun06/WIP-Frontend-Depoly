import { getMockPublicProfile } from "@/shared/lib/mocks/publicProfiles";
import { PublicProfileScreen } from "@/main/features/account/components/PublicProfileScreen";

type Props = { params: Promise<{ userId: string }> };

export default async function PublicProfilePage({ params }: Props) {
  const { userId } = await params;

  const profile = getMockPublicProfile(userId);

  // 익명 유저거나 프로필이 없을 경우 비공개 처리
  if (!profile || profile.isAnonymous) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-4xl">🔒</p>
        <h1 className="mt-4 text-xl font-bold text-white">비공개 프로필입니다</h1>
        <p className="mt-2 text-sm text-run-muted">
          이 사용자는 프로필을 비공개로 설정했습니다.
        </p>
      </div>
    );
  }

  return <PublicProfileScreen profile={profile} backHref="/ranking" />;
}
