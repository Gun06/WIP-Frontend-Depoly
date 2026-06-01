import type { ReactNode } from "react";

type AdminPageShellProps = {
  /** 페이지 타이틀·부제·헤더 액션 등 (고정) */
  header: ReactNode;
  /** 탭 행이 있을 때만 전달 (고정) */
  tabs?: ReactNode;
  /** 탭 아래 스크롤 영역 */
  children: ReactNode;
};

/**
 * 관리자 페이지 공통 레이아웃: 타이틀(+탭) 고정, 본문만 스크롤.
 * `admin/(shell)/layout`의 main 영역 안에서 `flex-1`로 채웁니다.
 */
export function AdminPageShell({ header, tabs, children }: AdminPageShellProps) {
  return (
    <div className="admin-page flex min-h-0 flex-1 flex-col">
      <div className="admin-page-header shrink-0">{header}</div>
      {tabs ? <div className="admin-page-tabs shrink-0">{tabs}</div> : null}
      <div className="admin-page-body min-h-0 flex-1 overflow-y-auto overscroll-y-contain">
        {children}
      </div>
    </div>
  );
}
