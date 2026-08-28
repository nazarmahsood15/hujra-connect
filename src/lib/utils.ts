import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPKR(amount: number): string {
  return `Rs ${amount.toLocaleString("en-PK")}`;
}

export function avatarUrl(name: string, bg = "0f4c4c", color = "e8a23d"): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bg}&color=${color}&size=128&bold=true`;
}

export function stars(rating: number): string {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(empty);
}

export function getTrustLevel(score: number): { label: string; tone: "emerald" | "amber" | "rose" | "teal" } {
  if (score >= 95) return { label: "Exceptional Community Trust", tone: "teal" };
  if (score >= 90) return { label: "Verified & Highly Trusted", tone: "emerald" };
  if (score >= 80) return { label: "Good Standing", tone: "amber" };
  return { label: "Under Observation", tone: "rose" };
}
