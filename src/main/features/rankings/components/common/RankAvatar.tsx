import { cn } from "@/shared/lib/utils/cn";

type Props = {
  nickname: string;
  isAnonymous?: boolean;
  size?: "sm" | "md";
  className?: string;
};

export function RankAvatar({ nickname, isAnonymous, size = "md", className }: Props) {
  const initial = isAnonymous ? "익" : (nickname.replace(/^\[/, "").slice(0, 1) || "?");
  const sizeClass = size === "sm" ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm";

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-run-border font-semibold text-white",
        sizeClass,
        className,
      )}
    >
      {initial}
    </div>
  );
}
