"use client";

import { ThemeProvider } from "next-themes";
import { PersonaProvider } from "@/lib/persona-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="peakpath-theme"
      themes={["dark", "light"]}
    >
      <PersonaProvider>{children}</PersonaProvider>
    </ThemeProvider>
  );
}
