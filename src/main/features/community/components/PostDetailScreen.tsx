import Link from "next/link";

type Props = {
  postId: string;
  backHref: string;
  title: string;
};

export function PostDetailScreen({ postId, backHref, title }: Props) {
  const comments = [
    {
      id: "c1",
      author: "러닝덕후",
      isAnonymous: false,
      createdAt: "2026-04-15 08:23",
      text: "훈련 루틴이 깔끔하네요. 평일 조깅 거리도 공유해주실 수 있나요?",
      reply: "평일은 6~8km 이지런, 주말은 LSD 18~24km로 했어요.",
    },
    {
      id: "c2",
      author: "익명",
      isAnonymous: true,
      createdAt: "2026-04-15 10:11",
      text: "보급 젤 타이밍 참고됐습니다. 감사합니다!",
      reply: undefined,
    },
  ];

  return (
    <div>
      {/* ── 상단 타이틀 영역 ── */}
      <div className="bg-[#f3f4f1] pb-14 pt-16 text-center">
        <p className="text-xs tracking-wide text-[#9ca3af]">
          커뮤니티 &gt; 게시판 &gt; 게시글
        </p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-[#111827]">
          게시글
        </h1>

        {/* 탭 */}
        <nav className="mt-10 flex items-center justify-center gap-8 border-b border-[#dde0da] text-sm text-[#6b7280]">
          {["게시글 보기", "댓글 보기", "관련글"].map((tab, i) => (
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
      <div className="bg-[#f3f4f1] pb-8 pt-6 text-center">
        <p className="mx-auto max-w-2xl text-sm leading-7 text-[#374151]">
          커뮤니티 이용 규칙에 맞는 건강한 대화 문화를 지향합니다.
          <br />
          예의를 지키는 댓글과 정확한 정보 공유에 동참해 주세요.
        </p>
      </div>

      {/* ── 본문 콘텐츠 영역 ── */}
      <div className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-10">

          {/* 목록으로 */}
          <Link
            href={backHref}
            className="inline-flex items-center gap-1 text-sm text-[#6b7280] hover:text-[#111827]"
          >
            ← 목록으로
          </Link>

          <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_260px]">

            {/* 메인 컬럼 */}
            <div className="min-w-0 space-y-4">

              {/* 게시글 본문 */}
              <article>
                {/* 메타 바 */}
                <div className="border-b border-t border-[#d1d5db] px-0 py-3">
                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    <span className="rounded-sm bg-[#1f3b8f] px-1.5 py-0.5 font-semibold text-white">완주 인증</span>
                    <span className="rounded-sm border border-[#d1d5db] px-1.5 py-0.5 text-[#6b7280]">#풀코스</span>
                    <span className="rounded-sm border border-[#d1d5db] px-1.5 py-0.5 text-[#6b7280]">#훈련</span>
                  </div>
                  <h2 className="mt-3 text-xl font-semibold text-[#111827]">{title}</h2>
                  <p className="mt-1.5 text-xs text-[#9ca3af]">
                    러너A &nbsp;·&nbsp; 2026-04-15 07:14 &nbsp;·&nbsp; 조회 582 &nbsp;·&nbsp; 댓글 {comments.length} &nbsp;·&nbsp; #{postId}
                  </p>
                </div>

                {/* 본문 */}
                <div className="space-y-4 py-8 text-[15px] leading-7 text-[#374151]">
                  <p>이번 시즌 첫 풀코스를 준비하면서 기록한 훈련 루틴과 레이스 운영 전략을 공유합니다.</p>
                  <p>중반 이후 페이스가 무너지지 않도록 보급 타이밍을 일정하게 유지한 점이 가장 효과적이었습니다.</p>
                  <p>코스별 컨디션 차이가 있었던 구간도 함께 남겨두니 비슷한 목표를 가진 분들께 참고가 되면 좋겠습니다.</p>
                </div>

                {/* 액션 바 */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e5e7eb] pt-4">
                  <button
                    type="button"
                    className="rounded border border-[#1f3b8f] bg-[#f3f6ff] px-5 py-2 text-sm font-medium text-[#1f3b8f] transition hover:bg-[#e8edff]"
                  >
                    추천 39
                  </button>
                  <div className="flex gap-2 text-xs text-[#9ca3af]">
                    <button type="button" className="hover:text-[#111827]">수정</button>
                    <span>|</span>
                    <button type="button" className="hover:text-[#111827]">삭제</button>
                    <span>|</span>
                    <button type="button" className="hover:text-[#111827]">공유</button>
                    <span>|</span>
                    <button type="button" className="hover:text-[#111827]">신고</button>
                  </div>
                </div>
              </article>

              {/* 댓글 영역 */}
              <section className="border-t border-[#e5e7eb] pt-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-[#111827]">댓글 {comments.length}</p>
                  <div className="flex gap-2 text-xs text-[#9ca3af]">
                    <button type="button" className="hover:text-[#111827]">최신순</button>
                    <span>|</span>
                    <button type="button" className="hover:text-[#111827]">공감순</button>
                  </div>
                </div>

                <ul className="mt-3 divide-y divide-[#e5e7eb]">
                  {comments.map((comment) => (
                    <li key={comment.id} className="py-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-[#111827]">
                          {comment.isAnonymous ? "익명(비회원)" : comment.author}
                        </p>
                        <p className="text-xs text-[#9ca3af]">{comment.createdAt}</p>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-[#374151]">{comment.text}</p>
                      <div className="mt-2 flex gap-2 text-xs text-[#9ca3af]">
                        <button type="button" className="hover:text-[#111827]">수정</button>
                        <span>|</span>
                        <button type="button" className="hover:text-[#111827]">삭제</button>
                        <span>|</span>
                        <button type="button" className="hover:text-[#111827]">답글</button>
                      </div>
                      {comment.reply ? (
                        <div className="mt-3 border-l-2 border-[#d1d5db] bg-[#f9fafb] pl-4 py-2.5">
                          <p className="text-xs font-medium text-[#6b7280]">↳ 답글</p>
                          <p className="mt-1 text-sm leading-6 text-[#374151]">{comment.reply}</p>
                        </div>
                      ) : null}
                    </li>
                  ))}
                </ul>

                {/* 댓글 작성 */}
                <div className="mt-4 border-t border-[#e5e7eb] pt-4">
                  <p className="text-sm font-semibold text-[#111827]">댓글 작성</p>
                  <div className="mt-3 space-y-2">
                    <textarea
                      className="min-h-[100px] w-full rounded-md border border-[#d1d5db] px-4 py-3 text-sm text-[#111827] placeholder:text-[#9ca3af] focus:border-[#1f3b8f] focus:outline-none"
                      placeholder="내용을 입력하세요."
                    />
                    <div className="flex flex-wrap items-end gap-2">
                      <label className="flex items-center gap-1.5 text-xs text-[#6b7280]">
                        <input type="checkbox" className="h-3.5 w-3.5 accent-[#1f3b8f]" />
                        뱃지 표시
                      </label>
                      <label className="flex items-center gap-1.5 text-xs text-[#6b7280]">
                        <input type="checkbox" className="h-3.5 w-3.5 accent-[#1f3b8f]" />
                        익명(비회원)
                      </label>
                      <input
                        maxLength={6}
                        className="h-8 flex-1 rounded-md border border-[#d1d5db] px-3 text-xs text-[#111827] placeholder:text-[#9ca3af] focus:border-[#1f3b8f] focus:outline-none"
                        placeholder="비회원 비밀번호 6자리(선택)"
                      />
                      <button
                        type="button"
                        className="h-8 rounded-md bg-[#1f3b8f] px-5 text-xs font-medium text-white transition hover:bg-[#162d6b]"
                      >
                        댓글 등록
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* 우측 패널 */}
            <aside className="space-y-0 divide-y divide-[#e5e7eb] rounded-md border border-[#d1d5db] bg-white lg:sticky lg:top-20 lg:self-start">
              {/* 작성자 */}
              <div className="px-4 py-4">
                <p className="text-xs font-semibold text-[#374151]">작성자</p>
                <p className="mt-2 text-sm font-medium text-[#111827]">러너A</p>
                <p className="mt-0.5 text-xs text-[#9ca3af]">러닝 4년차 · 풀코스 3회 완주</p>
                <button
                  type="button"
                  className="mt-3 w-full rounded border border-[#d1d5db] py-1.5 text-xs text-[#4b5563] hover:border-[#1f3b8f] hover:text-[#1f3b8f]"
                >
                  작성글 더보기
                </button>
              </div>

              {/* 비회원 인증 */}
              <div className="px-4 py-4">
                <p className="text-xs font-semibold text-[#374151]">비회원 수정/삭제 인증</p>
                <p className="mt-1.5 text-xs leading-5 text-[#9ca3af]">
                  비회원 작성 글은 등록한 6자리 비밀번호 입력 후 수정/삭제할 수 있습니다.
                </p>
                <input
                  maxLength={6}
                  className="mt-2 h-8 w-full rounded border border-[#d1d5db] px-3 text-xs text-[#111827] placeholder:text-[#9ca3af] focus:border-[#1f3b8f] focus:outline-none"
                  placeholder="비밀번호 6자리"
                />
                <button
                  type="button"
                  className="mt-2 h-8 w-full rounded bg-[#1f3b8f] text-xs font-medium text-white transition hover:bg-[#162d6b]"
                >
                  인증
                </button>
              </div>

              {/* 게시글 관리 */}
              <div className="px-4 py-4">
                <p className="text-xs font-semibold text-[#374151]">게시글 관리</p>
                <div className="mt-2 space-y-1.5">
                  <button
                    type="button"
                    className="w-full rounded border border-[#d1d5db] py-1.5 text-xs text-[#4b5563] hover:border-[#1f3b8f] hover:text-[#1f3b8f]"
                  >
                    신고하기
                  </button>
                  <button
                    type="button"
                    className="w-full rounded border border-[#d1d5db] py-1.5 text-xs text-[#4b5563] hover:border-[#1f3b8f] hover:text-[#1f3b8f]"
                  >
                    링크 복사
                  </button>
                </div>
              </div>
            </aside>
          </div>

        </div>
      </div>
    </div>
  );
}
