"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Trophy, BookOpen, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Today", icon: Home, match: (p: string) => p === "/" },
  {
    href: "/programs/q2-enterprise-renewals",
    label: "Programs",
    icon: BarChart3,
    match: (p: string) => p.startsWith("/programs"),
  },
  {
    href: "/leaderboard",
    label: "Board",
    icon: Trophy,
    match: (p: string) => p === "/leaderboard",
  },
  {
    href: "/rules",
    label: "Rules",
    icon: BookOpen,
    match: (p: string) => p === "/rules",
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-bg-base/90 backdrop-blur-md border-t border-border-subtle"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-4 max-w-md mx-auto">
        {items.map((item) => {
          const active = item.match(pathname);
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] uppercase tracking-[0.08em] font-medium transition-colors",
                  active
                    ? "text-text-primary"
                    : "text-text-muted hover:text-text-primary",
                )}
              >
                <span
                  className={cn(
                    "relative flex items-center justify-center w-9 h-9 rounded-full transition-colors",
                    active && "bg-bg-surface",
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {active && (
                    <span className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-brand-gradient" />
                  )}
                </span>
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
