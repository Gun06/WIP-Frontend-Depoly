"use client";

import { cn } from "@/shared/lib/utils/cn";

interface AdminPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  itemLabel?: string;
  onPageChange: (page: number) => void;
  className?: string;
}

function getPageNumbers(currentPage: number, totalPages: number): (number | string)[] {
  const pages: (number | string)[] = [];
  const maxVisible = 5;

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }

  pages.push(1);

  let start = Math.max(2, currentPage - 1);
  let end = Math.min(totalPages - 1, currentPage + 1);

  if (currentPage <= 3) end = Math.min(4, totalPages - 1);
  else if (currentPage >= totalPages - 2) start = Math.max(totalPages - 3, 2);

  if (start > 2) pages.push("...");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < totalPages - 1) pages.push("...");
  pages.push(totalPages);

  return pages;
}

const IconFirst = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
    <path d="M2 2v10M5.5 7l4-4M5.5 7l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconLast = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
    <path d="M12 2v10M8.5 7l-4-4M8.5 7l-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconPrev = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
    <path d="M8.5 3.5L5 7l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconNext = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
    <path d="M5.5 3.5L9 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function AdminPagination({
  currentPage,
  totalPages,
  totalItems,
  itemLabel = "개",
  onPageChange,
  className,
}: AdminPaginationProps) {
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  const navBtn =
    "admin-pagination-nav flex h-8 w-8 items-center justify-center rounded-full transition disabled:opacity-30 disabled:cursor-not-allowed";

  return (
    <div className={cn("flex items-center justify-between mt-8", className)}>
      {/* 좌: 총 개수 */}
      <span className="admin-pagination-info text-sm">
        {totalItems !== undefined ? `총 ${totalItems.toLocaleString()}개의 ${itemLabel}` : ""}
      </span>

      {/* 가운데: 네비게이션 */}
      <div className="flex items-center gap-1">
        {/* 처음 */}
        <button
          type="button"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={navBtn}
          aria-label="첫 페이지"
        >
          <IconFirst />
        </button>

        {/* 이전 */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={navBtn}
          aria-label="이전 페이지"
        >
          <IconPrev />
        </button>

        {/* 페이지 번호 */}
        <div className="flex items-center gap-1 mx-1">
          {pageNumbers.map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="admin-pagination-ellipsis flex h-8 w-8 items-center justify-center text-sm"
                >
                  ···
                </span>
              );
            }

            const pageNum = page as number;
            const isActive = pageNum === currentPage;

            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => onPageChange(pageNum)}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                  isActive
                    ? "admin-pagination-page-active"
                    : "admin-pagination-page-idle",
                )}
                aria-label={`페이지 ${pageNum}`}
                aria-current={isActive ? "page" : undefined}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* 다음 */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={navBtn}
          aria-label="다음 페이지"
        >
          <IconNext />
        </button>

        {/* 마지막 */}
        <button
          type="button"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={navBtn}
          aria-label="마지막 페이지"
        >
          <IconLast />
        </button>
      </div>

      {/* 우: 페이지 정보 */}
      <span className="admin-pagination-info text-sm">
        페이지 {currentPage}/{totalPages}
      </span>
    </div>
  );
}
