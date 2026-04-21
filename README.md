# WIP-Frontend

러너 커뮤니티·기록·대회 기능을 담는 프론트엔드입니다.

## 기술 스택

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Linting**: ESLint
- **Formatting**: Prettier
- **Package Manager**: PNPM

---

## 권한/라우트 기준

- **비회원**: 로그인/회원가입, 공개 페이지 접근
- **회원**: 마이페이지, 기록 신청, 단체/인플루언서 기능
- **관리자**: `/admin/*` 운영 기능

라우트 그룹:
- `(auth)` 계정 진입
- `(public)` 공개 구간
- `(member)` 회원 전용
- `admin` 관리자 전용

---

## 설치 및 실행

```bash
pnpm install
pnpm dev
```

주요 경로:
- `/` — 랜딩(풀스크린 지도 + 랭킹 + 스크롤 섹션)
- `/login`, `/register`, `/forgot-password`
- `/competitions`, `/community`, `/ranking`, `/run`
- `/mypage`, `/records/apply`, `/groups`, `/influencer` (회원)
- `/admin/*` (관리자)

데모 인증:
- `POST /api/auth/login` → `wip-demo` 쿠키(`member`/`admin`)
- `POST /api/auth/logout`

---

## 권장 폴더 구조 (팀 합의용)

```
src/
├── app/
│   ├── layout.tsx
│   ├── globals.css                    # 또는 styles/와 연결
│   ├── not-found.tsx
│   ├── error.tsx
│   ├── loading.tsx
│   │
│   ├── (auth)/                        # 계정 진입 — 주로 비회원 (레이아웃 분리 가능)
│   │   ├── login/
│   │   │   └── page.tsx               # → main/features/auth
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── forgot-password/           # 아이디/비밀번호 찾기 등
│   │       └── page.tsx
│   │
│   ├── (public)/                      # 비회원·회원 공통 — 기획 「비회원 포함 전체」
│   │   ├── layout.tsx
│   │   ├── page.tsx                   # 홈
│   │   │
│   │   ├── competitions/              # 대회 (동료 구조의 races와 동일 역할 시 이름만 통일)
│   │   │   ├── page.tsx               # 목록 → main/features/competitions
│   │   │   └── [competitionId]/
│   │   │       ├── page.tsx           # 상세
│   │   │       ├── community/         # 구현은 main/features/community (비회원 익명 포함)
│   │   │       │   ├── page.tsx
│   │   │       │   └── [postId]/
│   │   │       │       └── page.tsx
│   │   │       └── leaderboard/       # Top100 조회 등 → main/features/rankings
│   │   │           └── page.tsx
│   │   │
│   │   ├── community/                 # 전체 커뮤니티
│   │   │   ├── page.tsx
│   │   │   └── [postId]/
│   │   │       └── page.tsx
│   │   │
│   │   └── ranking/                   # 랭킹 조회(읽기) — 비회원 포함 전체
│   │       ├── page.tsx
│   │       ├── influencer/
│   │       │   └── page.tsx
│   │       └── team/                  # 크루/팀 등 IA에 맞게 조정
│   │           └── page.tsx
│   │
│   ├── (member)/                      # 회원 전용 — 기획 「회원」 (미들웨어로 세션 필수)
│   │   ├── layout.tsx
│   │   ├── mypage/                    # 프로필·뱃지·설정 → main/features/account, badges …
│   │   │   ├── page.tsx
│   │   │   ├── records/
│   │   │   │   └── page.tsx           # 내 기록 → main/features/records
│   │   │   └── badges/
│   │   │       └── page.tsx
│   │   ├── records/                   # 기록 신청 등
│   │   │   └── apply/
│   │   │       └── page.tsx           # → main/features/records
│   │   ├── groups/                    # 단체 (회원)
│   │   │   └── ...
│   │   └── influencer/                # 신청·추천 등 (회원)
│   │       └── ...
│   │
│   └── admin/                         # 관리자 URL 전부
│       ├── layout.tsx
│       ├── page.tsx
│       ├── competitions/
│       │   └── page.tsx               # → admin/features/competitions
│       ├── leaderboard/
│       │   └── page.tsx               # → admin/features/top100-upload
│       ├── records/
│       │   └── page.tsx               # → admin/features/record-approvals
│       ├── influencer/
│       │   └── page.tsx               # → admin/features/influencer-approvals
│       └── users/
│           └── page.tsx               # → admin/features/users (회원 관리)
│
├── main/
│   └── features/
│       ├── auth/
│       ├── account/
│       ├── badges/
│       ├── groups/
│       ├── influencer/
│       ├── community/
│       ├── records/
│       ├── rankings/
│       └── competitions/
│
├── admin/
│   └── features/
│       ├── competitions/              # 대회·종목 CRUD
│       ├── record-approvals/
│       ├── top100-upload/
│       ├── ranking-jobs/
│       ├── influencer-approvals/
│       └── users/
│
├── shared/
│   ├── components/
│   │   └── ui/                        # Button, Input, Modal, Badge …
│   ├── hooks/                         # useAuth 등 2곳 이상에서만
│   ├── lib/
│   │   ├── api/                       # races.ts, records.ts … 도메인별 HTTP 클라이언트
│   │   └── utils/                     # date, format …
│   ├── types/                         # user, race, record, badge … DTO
│   └── constants/                     # 뱃지 조건, 거리 종류 등
│
├── styles/                            # 전역 스타일 (팀 컨벤션에 따라 app/globals.css만 써도 됨)
└── middleware.ts                      # (member)·/admin 세션·역할 검사, (public)·(auth)는 정책에 맞게 예외 처리
```

---

## 기여 가이드

1. 이슈 확인 또는 생성
2. `develop` 기준으로 기능 브랜치 생성
3. 커밋 후 Pull Request 생성
