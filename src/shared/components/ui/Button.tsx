import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/lib/utils/cn";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
  variant?: "primary" | "ghost" | "outline";
  type?: "button" | "submit" | "reset";
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-run-volt disabled:opacity-50";
  const styles = {
    primary: "bg-run-volt text-black hover:brightness-110",
    ghost: "bg-transparent text-white hover:bg-white/10",
    outline: "border border-run-border bg-run-surface text-white hover:border-run-volt/50",
  }[variant];
  return <button type={type} className={cn(base, styles, className)} {...props} />;
}
