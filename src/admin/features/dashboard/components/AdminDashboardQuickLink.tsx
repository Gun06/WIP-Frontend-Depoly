import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/utils/cn";

export type QuickLinkTone = "orange" | "green" | "blue" | "indigo" | "purple" | "teal";

type Props = {
  href: string;
  label: string;
  description: string;
  tone: QuickLinkTone;
  icon: ReactNode;
};

const TONE_CLASS: Record<QuickLinkTone, string> = {
  orange: "admin-quick-link-icon--orange",
  green: "admin-quick-link-icon--green",
  blue: "admin-quick-link-icon--blue",
  indigo: "admin-quick-link-icon--indigo",
  purple: "admin-quick-link-icon--purple",
  teal: "admin-quick-link-icon--teal",
};

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="shrink-0">
      <path
        d="M6 3.5 10.5 8 6 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AdminDashboardQuickLink({ href, label, description, tone, icon }: Props) {
  return (
    <Link href={href} className="admin-quick-link group block">
      <div className="admin-quick-link-card flex items-center gap-3 rounded-xl border border-run-border bg-run-surface/80 p-4">
        <span className={cn("admin-quick-link-icon flex shrink-0 items-center justify-center", TONE_CLASS[tone])}>
          {icon}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-white">{label}</span>
          <span className="mt-0.5 block text-xs text-run-muted">{description}</span>
        </span>
        <span className="admin-quick-link-arrow text-run-muted transition group-hover:translate-x-0.5 group-hover:text-white">
          <ArrowIcon />
        </span>
      </div>
    </Link>
  );
}

export function IconTrophy() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 4h8v3a4 4 0 0 1-8 0V4ZM6 4H4v2a2 2 0 0 0 2 2M18 4h2v2a2 2 0 0 1-2 2M12 11v3M9 20h6M10 14h4l1 6H9l1-6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconUpload() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 16V6m0 0 4 4m-4-4-4 4M5 20h14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconShieldCheck() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3 19 6v6c0 3.5-2.5 6.5-7 9-4.5-2.5-7-5.5-7-9V6l7-3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="m9 12 2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconChart() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 19V5M4 19h16M8 17V12M12 17V8M16 17v-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconStar() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="m12 3 2.2 5.5L20 9.3l-4.5 4.2 1.2 6.5L12 17.8 7.3 20l1.2-6.5L4 9.3l5.8-.8L12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconUsers() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M16 19v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM20 19v-1a3 3 0 0 0-2-2.8M16 4.2a3 3 0 0 1 0 5.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
