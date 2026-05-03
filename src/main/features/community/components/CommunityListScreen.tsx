import Link from "next/link";
import { MOCK_POSTS } from "@/shared/lib/mocks/competitions";

type Props = { scope?: "global" | "competition"; competitionId?: string };

export function CommunityListScreen({ scope = "global", competitionId }: Props) {
  const base = scope === "competition" && competitionId ? `/competitions/${competitionId}/community` : "/community";
  const posts = MOCK_POSTS.map((post, index) => ({
    ...post,
    views: 230 + index * 128,
    likes: 12 + index * 5,
    comments: 4 + index * 3,
    tags: index % 2 === 0 ? ["풀코스", "후기", "훈련"] : ["페이스", "영양", "팁"],
    anonymous: post.author === "익명",
    badge: index % 2 === 0 ? "완주 인증" : "질문",
    pinned: index === 0,
  }));

  return (
    <div>
      {/* ── 상단 타이틀 영역 ── */}
      <div className="bg-[#f3f4f1] pb-14 pt-16 text-center">
        <p className="text-xs tracking-wide text-[#9ca3af]">
          홈 &gt; 커뮤니티 &gt; 게시판
        </p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-[#111827]">
          {scope === "competition" ? "대회 커뮤니티" : "커뮤니티"}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#6b7280]">
          게시글과 댓글로 자유롭게 소통하고, 회원 추천 및 비회원 비밀번호 인증으로
          안전하게 수정/삭제할 수 있습니다.
        </p>

        {/* 탭 */}
        <nav className="mt-10 flex items-center justify-center gap-8 border-b border-[#dde0da] text-sm text-[#6b7280]">
          {["전체", "자유", "질문", "후기", "대회정보"].map((tab, i) => (
            <button
              key={tab}
              type="button"
              className={
                i === 0
                  ? "-mb-px border-b-2 border-[#1f3b8f] pb-3 font-semibold text-[#1f3b8f]"
                  : "pb-3 transition hover:text-[#111827]"
              }
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* ── 안내 문구 ── */}
      <div className="bg-[#f3f4f1] pb-10 pt-8 text-center">
        <p className="mx-auto max-w-2xl text-sm leading-7 text-[#374151]">
          서로의 훈련 경험과 대회 정보를 나누며 건강한 러닝 문화를 만들어갑니다.
          <br />
          커뮤니티 운영 원칙을 지키는 범위에서 자유롭게 의견을 남겨 주세요.
        </p>
      </div>

      {/* ── 본문 콘텐츠 영역 ── */}
      <div className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-10">

          {/* 검색 바 */}
          <div className="flex flex-wrap items-end gap-3">
            <label className="block flex-1 space-y-1.5 text-sm">
              <span className="text-xs font-medium text-[#6b7280]">검색</span>
              <input
                className="w-full rounded-md border border-[#d1d5db] px-4 py-2 text-sm text-[#111827] placeholder:text-[#9ca3af] focus:border-[#1f3b8f] focus:outline-none"
                placeholder="제목, 해시태그, 작성자 검색"
              />
            </label>
            <label className="block w-36 space-y-1.5 text-sm">
              <span className="text-xs font-medium text-[#6b7280]">정렬</span>
              <select className="w-full rounded-md border border-[#d1d5db] px-3 py-2 text-sm text-[#111827] focus:border-[#1f3b8f] focus:outline-none">
                <option>최신순</option>
                <option>추천순</option>
                <option>댓글순</option>
              </select>
            </label>
            <button
              type="button"
              className="h-[38px] rounded-md bg-[#1f3b8f] px-6 text-sm font-medium text-white transition hover:bg-[#162d6b]"
            >
              검색
            </button>
            <Link
              href={`${base}/write`}
              className="h-[38px] rounded-md border border-[#1f3b8f] px-6 text-sm font-medium text-[#1f3b8f] transition hover:bg-[#f3f6ff] flex items-center"
            >
              글쓰기
            </Link>
          </div>

          {/* 게시판 목록 */}
          <div className="mt-6">
            <div className="grid grid-cols-[1fr_80px_90px_60px_60px] border-b border-t border-[#d1d5db] bg-[#f9fafb] px-3 py-2.5 text-xs font-medium text-[#6b7280]">
              <span>제목</span>
              <span className="text-center">작성자</span>
              <span className="text-center">작성일</span>
              <span className="text-center">추천</span>
              <span className="text-center">조회</span>
            </div>

            <ul>
              {posts.map((p) => (
                <li key={`${base}-${p.id}`} className="border-b border-[#e5e7eb] last:border-b-0">
                  <Link href={`${base}/${p.id}`} className="block px-3 py-3.5 transition hover:bg-[#f8faff]">
                    <div className="grid items-center gap-2 md:grid-cols-[1fr_80px_90px_60px_60px]">
                      <div className="min-w-0">
                        <div className="mb-1 flex items-center gap-1.5">
                          {p.pinned ? (
                            <span className="rounded-sm bg-[#1f3b8f] px-1.5 py-0.5 text-[10px] font-semibold text-white">공지</span>
                          ) : null}
                          <span className="rounded-sm border border-[#d1d5db] px-1.5 py-0.5 text-[10px] text-[#6b7280]">
                            {p.badge}
                          </span>
                        </div>
                        <p className="truncate text-[14px] font-medium text-[#111827]">{p.title}</p>
                        <p className="mt-0.5 truncate text-xs text-[#9ca3af]">
                          {p.tags.map((tag) => `#${tag}`).join(" · ")} · 댓글 {p.comments}
                        </p>
                      </div>
                      <p className="text-xs text-[#6b7280] md:text-center">{p.anonymous ? "익명" : p.author}</p>
                      <p className="text-xs text-[#6b7280] md:text-center">{p.createdAt}</p>
                      <p className="text-xs text-[#6b7280] md:text-center">{p.likes}</p>
                      <p className="text-xs text-[#6b7280] md:text-center">{p.views}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 페이지네이션 */}
          <div className="mt-6 flex items-center justify-center gap-1">
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                type="button"
                className={`h-8 w-8 rounded text-xs transition ${
                  page === 1
                    ? "border border-[#1f3b8f] bg-[#1f3b8f] font-semibold text-white"
                    : "border border-[#d1d5db] text-[#6b7280] hover:border-[#1f3b8f] hover:text-[#1f3b8f]"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* ── 하단 정보 섹션 ── */}
          <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-[#d1d5db] bg-[#d1d5db] lg:grid-cols-3">
            <div className="bg-white">
              <div className="border-b border-[#e5e7eb] bg-[#f9fafb] px-4 py-2">
                <p className="text-xs font-semibold text-[#374151]">이용안내</p>
              </div>
              <ul className="space-y-1.5 px-4 py-3 text-xs leading-relaxed text-[#6b7280]">
                <li>· 게시글/댓글 등록 및 수정은 회원·비회원 모두 가능합니다.</li>
                <li>· 비회원 작성 시 6자리 비밀번호를 등록해야 수정/삭제할 수 있습니다.</li>
                <li>· 게시글 추천은 회원만 가능하며 게시글당 1회 처리됩니다.</li>
                <li>· 모든 댓글 하단에 대댓글을 작성할 수 있습니다.</li>
              </ul>
            </div>

            <div className="bg-white">
              <div className="border-b border-[#e5e7eb] bg-[#f9fafb] px-4 py-2">
                <p className="text-xs font-semibold text-[#374151]">실시간 인기글</p>
              </div>
              <ol className="px-4 py-2">
                {posts.map((p, idx) => (
                  <li key={`hot-${p.id}`} className="border-b border-[#f3f4f6] last:border-0">
                    <Link
                      href={`${base}/${p.id}`}
                      className="flex items-center gap-2.5 py-2 text-xs text-[#4b5563] hover:text-[#1f3b8f]"
                    >
                      <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-sm bg-[#eef2ff] text-[10px] font-bold text-[#1f3b8f]">
                        {idx + 1}
                      </span>
                      <span className="truncate">{p.title}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-white">
              <div className="border-b border-[#e5e7eb] bg-[#f9fafb] px-4 py-2">
                <p className="text-xs font-semibold text-[#374151]">운영상태</p>
              </div>
              <dl className="grid grid-cols-2 divide-x divide-[#f3f4f6]">
                <div className="px-4 py-5">
                  <dt className="text-xs text-[#9ca3af]">오늘 게시글</dt>
                  <dd className="mt-1.5 text-2xl font-semibold text-[#111827]">38</dd>
                </div>
                <div className="px-4 py-5">
                  <dt className="text-xs text-[#9ca3af]">오늘 댓글</dt>
                  <dd className="mt-1.5 text-2xl font-semibold text-[#111827]">124</dd>
                </div>
              </dl>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
