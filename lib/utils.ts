import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(number: number) {
  if (number < 1000) return number.toFixed(1) + "K";
  else if (number < 1_000_000) return (number / 1000).toFixed(1) + "K";
  else if (number < 1_000_000_000) return (number / 1_000_000).toFixed(2) + "M";
}

export const getStatusColor_order = (status: string) => {
  status = status.toLowerCase();
  switch (status) {
    case "paid":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "processing":
    case "shipped":
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    case "pending":
      return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    default:
      return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
  }
};
