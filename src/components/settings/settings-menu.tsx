"use client";

import * as Popover from "@radix-ui/react-popover";
import { Settings, Info } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { usePersona, personas, type PersonaId } from "@/lib/persona-context";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

export function SettingsMenu() {
  const { theme, setTheme } = useTheme();
  const { personaId, setPersona } = usePersona();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className="h-9 w-9 rounded-full flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-bg-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
          aria-label={copy.settings.title}
        >
          <Settings className="w-4 h-4" />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="end"
          sideOffset={12}
          className="card-surface w-72 p-4 z-50"
        >
          <SectionLabel>{copy.settings.themeLabel}</SectionLabel>
          <Segmented
            value={mounted ? (theme as string) : "dark"}
            options={[
              { value: "dark", label: copy.settings.themeDark },
              { value: "light", label: copy.settings.themeLight },
            ]}
            onChange={(v) => setTheme(v)}
          />

          <div className="h-px bg-border-subtle my-4" />

          <SectionLabel>{copy.settings.profileLabel}</SectionLabel>
          <Segmented
            value={personaId}
            options={[
              {
                value: "alex",
                label: personas.alex.fullName,
                avatar: personas.alex.avatarSrc,
              },
              {
                value: "maya",
                label: personas.maya.fullName,
                avatar: personas.maya.avatarSrc,
              },
            ]}
            onChange={(v) => setPersona(v as PersonaId)}
          />

          <div className="h-px bg-border-subtle my-4" />

          <p className="flex items-center gap-2 text-xs text-text-muted">
            <Info className="w-3.5 h-3.5" />
            {copy.settings.footerNote}
          </p>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] uppercase tracking-[0.12em] text-text-muted font-medium mb-2">
      {children}
    </p>
  );
}

type SegmentedOption = { value: string; label: string; avatar?: string };

function Segmented({
  value,
  options,
  onChange,
}: {
  value: string;
  options: SegmentedOption[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative grid grid-cols-2 gap-1 p-1 rounded-xl bg-bg-base/60 border border-border-subtle">
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "relative flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              active
                ? "bg-brand-gradient text-white shadow-sm"
                : "text-text-muted hover:text-text-primary",
            )}
          >
            {opt.avatar && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={opt.avatar}
                alt=""
                className="w-5 h-5 rounded-full ring-1 ring-white/20"
              />
            )}
            <span className="truncate">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
