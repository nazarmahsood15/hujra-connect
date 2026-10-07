import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("card-hujra p-5 shadow-[0_8px_30px_rgba(21,55,47,0.05)] transition-shadow duration-200 hover:shadow-[0_12px_36px_rgba(21,55,47,0.09)]", className)} {...props} />;
}

export function Badge({
  className,
  tone = "brass",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: "brass" | "teal" | "marigold" | "maroon" }) {
  const tones = {
    brass: "bg-brass text-[#241703]",
    teal: "bg-teal text-white",
    marigold: "bg-marigold text-[#241703]",
    maroon: "bg-maroon text-white",
  };
  return (
    <span
      className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold", tones[tone], className)}
      {...props}
    />
  );
}
