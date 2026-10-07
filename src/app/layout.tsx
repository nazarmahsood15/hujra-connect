import type { Metadata } from "next";
import { Rozha_One, Mukta, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const display = Rozha_One({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const body = Mukta({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--font-body" });
const mono = JetBrains_Mono({ weight: ["500", "700"], subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Connecta — Trusted Local Services & Elder Vouch Network",
  description: "A neighbourhood service marketplace for Pakistan where every worker is vouched for by an elder or imam. Electricians, plumbers, AC technicians, solar specialists, and more.",
  openGraph: {
    title: "Connecta — Community Vouched Services",
    description: "Trusted local workers backed by community elders, imams, and escrow protection across Pakistan.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${mono.variable} font-body bg-app-bg text-app-ink min-h-screen flex flex-col antialiased`}>
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
