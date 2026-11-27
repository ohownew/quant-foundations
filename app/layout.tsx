import type { Metadata } from "next";
import { IBM_Plex_Mono, Noto_Sans_SC, Source_Sans_3 } from "next/font/google";
import { course } from "@/content/curriculum";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-source-sans",
  display: "swap",
});

const notoSans = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-noto-sans-sc",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-ibm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "量化原理：数学、经济学与金融学",
    template: "%s · 量化原理",
  },
  description: course.tagline + course.labNote + "这不是投资建议。",
  applicationName: "量化原理",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hans"
      className={`${sourceSans.variable} ${notoSans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper font-sans text-ink">{children}</body>
    </html>
  );
}
