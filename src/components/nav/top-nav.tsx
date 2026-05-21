"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePersona } from "@/lib/persona-context";
import { copy } from "@/lib/copy";
import { SettingsMenu } from "@/components/settings/settings-menu";
import { cn } from "@/lib/utils";

export function TopNav() {
  const pathname = usePathname();
  const { persona } = usePersona();

  const linkClass = (active: boolean) =>
    cn(
      "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
      active
        ? "text-text-primary bg-bg-surface"
        : "text-text-muted hover:text-text-primary",
    );

  const isTodayActive = pathname === "/";
  const isProgramsActive = pathname.startsWith("/programs");

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-bg-base/70 border-b border-border-subtle">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Logomark />
            <span className="font-display font-bold text-lg tracking-tight">
              <span className="text-brand-gradient">Peak</span>
              <span className="text-text-primary">Path</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link href="/" className={linkClass(isTodayActive)}>
              {copy.nav.today}
            </Link>
            <Link
              href={`/programs/q2-enterprise-renewals`}
              className={linkClass(isProgramsActive)}
            >
              {copy.nav.programs}
            </Link>
            <span
              className="px-3 py-1.5 rounded-full text-sm font-medium text-text-muted/60 cursor-not-allowed"
              title={copy.nav.leaderboardDisabled}
            >
              {copy.nav.leaderboard}
            </span>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <SettingsMenu />
          <div className="h-9 w-9 rounded-full overflow-hidden border border-border-subtle bg-bg-elevated">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={persona.avatarSrc}
              alt={persona.fullName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

function Logomark() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="logomark-gradient" x1="0" y1="0" x2="28" y2="28">
          <stop offset="0%" stopColor="var(--accent-indigo)" />
          <stop offset="50%" stopColor="var(--accent-magenta)" />
          <stop offset="100%" stopColor="var(--accent-coral)" />
        </linearGradient>
      </defs>
      <path
        d="M4 22 L11 11 L16 17 L24 6"
        stroke="url(#logomark-gradient)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="24" cy="6" r="2.5" fill="url(#logomark-gradient)" />
    </svg>
  );
}
