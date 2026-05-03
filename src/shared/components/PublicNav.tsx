import Link from "next/link";
import type { DemoSession } from "@/shared/lib/auth/constants";
import { ScrollProgressBar } from "./ScrollProgressBar";

const link = "wip-public-link";

export function PublicNav({ session }: { session: DemoSession }) {
  const isMember = session === "member";

  return (
    <header className="wip-public-header">
      <div className="wip-public-header-inner">
        <Link href="/" className="wip-public-logo">
          WIP RUN
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-x-7 gap-y-2">
          <Link className={link} href="/competitions">
            대회
          </Link>
          <Link className={link} href="/community">
            커뮤니티
          </Link>
          <Link className={link} href="/ranking">
            랭킹
          </Link>
          <Link className={link} href="/run">
            러닝
          </Link>
          {isMember ? (
            <Link className={link} href="/mypage">
              마이
            </Link>
          ) : null}
          <Link className={link} href="/login">
            {isMember ? "계정" : "로그인"}
          </Link>
        </nav>
      </div>
      <ScrollProgressBar />
    </header>
  );
}
