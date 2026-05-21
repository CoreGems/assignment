import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatUSD(amount: number, opts?: { decimals?: number }) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: opts?.decimals ?? 0,
    minimumFractionDigits: opts?.decimals ?? 0,
  }).format(amount);
}

export function formatNumber(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}

const TODAY = new Date("2026-05-21T12:00:00");

export function relativeTime(iso: string) {
  const then = new Date(iso);
  const diffMs = then.getTime() - TODAY.getTime();
  const diffMin = Math.round(diffMs / 60000);
  const diffHr = Math.round(diffMs / 3600000);
  const diffDay = Math.round(diffMs / 86400000);

  const rtf = new Intl.RelativeTimeFormat("en-US", { numeric: "auto" });
  if (Math.abs(diffMin) < 60) return rtf.format(diffMin, "minute");
  if (Math.abs(diffHr) < 24) return rtf.format(diffHr, "hour");
  if (Math.abs(diffDay) < 30) return rtf.format(diffDay, "day");
  return rtf.format(Math.round(diffDay / 30), "month");
}
