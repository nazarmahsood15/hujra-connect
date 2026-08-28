import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
}

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  const base = "rounded-xl font-bold transition disabled:opacity-50 disabled:cursor-not-allowed";
  const styles = {
    primary: "bg-marigold text-[#241703] px-5 py-2.5 shadow-[0_3px_0_var(--marigold-2)] hover:translate-y-[1px]",
    outline: "border-2 border-teal text-teal px-4 py-2 hover:bg-teal hover:text-white",
    ghost: "border border-app-border px-3 py-1.5 text-sm hover:bg-app-bgSoft",
  };
  return <button className={cn(base, styles[variant], className)} {...props} />;
}
