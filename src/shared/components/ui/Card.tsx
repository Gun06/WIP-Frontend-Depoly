import type { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/utils/cn";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-run-border bg-run-surface/80 p-5 backdrop-blur-md",
        className,
      )}
      {...props}
    />
  );
}
