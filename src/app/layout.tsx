import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { TopNav } from "@/components/nav/top-nav";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PeakPath — Your incentive cockpit",
  description:
    "Track earnings, hit tiers, and stay one step ahead of every payout.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <Providers>
          <TopNav />
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-20">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
