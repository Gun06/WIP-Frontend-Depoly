import type { InputHTMLAttributes } from "react";
import { cn } from "@/shared/lib/utils/cn";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Input({ className, label, id, ...props }: Props) {
  const inputId = id ?? props.name;
  return (
    <label className="block space-y-1.5 text-sm">
      {label ? (
        <span className="text-xs font-medium uppercase tracking-wider text-run-muted">
          {label}
        </span>
      ) : null}
      <input
        id={inputId}
        className={cn(
          "w-full rounded-xl border border-run-border bg-black/40 px-4 py-3 text-white placeholder:text-run-muted focus:border-run-volt focus:outline-none",
          className,
        )}
        {...props}
      />
    </label>
  );
}
