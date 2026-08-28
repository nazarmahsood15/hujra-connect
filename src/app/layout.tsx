import type { Metadata } from "next";
import { Rozha_One, Mukta, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Rozha_One({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const body = Mukta({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--font-body" });
const mono = JetBrains_Mono({ weight: ["500", "700"], subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Hujra Connect",
  description: "A neighbourhood service marketplace where every worker is vouched for by an elder or imam.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${mono.variable} font-body`}>
        {children}
      </body>
    </html>
  );
}
