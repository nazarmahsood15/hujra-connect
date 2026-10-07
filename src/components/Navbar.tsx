"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ShieldCheck,
  Search,
  Mic,
  Globe2,
  Bell,
  UserCheck,
  Menu,
  X,
  Sparkles,
  Layers,
  HeartHandshake,
  MessageSquare,
  Briefcase,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Card";
import { ConnectaLogo } from "@/components/ConnectaLogo";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [role, setRole] = useState<"customer" | "worker" | "admin" | "diaspora">("customer");
  const [lang, setLang] = useState<"EN" | "UR" | "PS">("EN");
  const [notifOpen, setNotifOpen] = useState(false);

  const navLinks = [
    { href: "/marketplace", label: "Marketplace", icon: Search },
    { href: "/jobs/create", label: "Post a Job", icon: Briefcase, highlight: true },
    { href: "/vouches", label: "Vouch Chain", icon: HeartHandshake },
    { href: "/diaspora", label: "Diaspora Mode", icon: Globe2 },
    { href: "/categories", label: "Categories", icon: Layers },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#fffbf3]/95 dark:bg-[#11201d]/95 backdrop-blur border-b border-[#e4d5b8] dark:border-[#2c433d] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 min-h-[4.5rem] flex items-center justify-between gap-3">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <ConnectaLogo size="md" className="group-hover:scale-105" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display text-2xl tracking-tight text-[#201a14] dark:text-[#f1ead9]">
                Connecta
              </span>
              <span className="hidden sm:inline-block text-[10px] bg-[#e8a23d]/20 text-[#c97f1e] dark:text-[#e8a23d] font-bold px-1.5 py-0.5 rounded border border-[#e8a23d]/40">
                PK
              </span>
            </div>
            <p className="text-[11px] text-[#6b5f4f] dark:text-[#afa491] -mt-1 font-medium hidden md:block">
              Community Vouched Services
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition ${
                  isActive
                    ? "bg-[#0f4c4c] text-white shadow-sm"
                    : link.highlight
                    ? "text-[#0f4c4c] dark:text-[#2c8b84] hover:bg-[#efe4cf] dark:hover:bg-[#1c2e2a]"
                    : "text-[#201a14] dark:text-[#f1ead9] hover:bg-[#efe4cf] dark:hover:bg-[#1c2e2a]"
                }`}
              >
                <Icon className={`w-4 h-4 ${link.highlight && !isActive ? "text-[#e8a23d]" : ""}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls & Role Switcher */}
        <div className="flex items-center gap-2">
          {/* Language Simulation Switcher */}
          <div className="hidden sm:flex items-center bg-[#efe4cf] dark:bg-[#1c2e2a] rounded-lg p-0.5 border border-[#e4d5b8] dark:border-[#2c433d] text-xs">
            {(["EN", "UR", "PS"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2 py-1 rounded font-bold transition ${
                  lang === l
                    ? "bg-[#0f4c4c] text-white shadow-xs"
                    : "text-[#6b5f4f] dark:text-[#afa491] hover:text-[#201a14]"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Role Switcher */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as any)}
            className="hidden md:block bg-[#efe4cf] dark:bg-[#1c2e2a] border border-[#e4d5b8] dark:border-[#2c433d] text-xs font-semibold rounded-xl px-2.5 py-1.5 text-[#201a14] dark:text-[#f1ead9] cursor-pointer"
            title="Switch User Mode"
          >
            <option value="customer">👤 Customer View</option>
            <option value="worker">🔧 Worker View</option>
            <option value="diaspora">🌍 Diaspora View</option>
            <option value="admin">🛡️ Admin View</option>
          </select>

          {/* Quick Dashboard Link based on chosen Role */}
          <Link
            href={
              role === "admin"
                ? "/dashboard/admin"
                : role === "worker"
                ? "/dashboard/worker"
                : role === "diaspora"
                ? "/diaspora"
                : "/dashboard/customer"
            }
            className="hidden sm:inline-flex"
          >
            <Button variant="ghost" className="!px-3 !py-1.5 text-xs font-bold gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-[#c97f1e]" />
              Dashboard
            </Button>
          </Link>

          {/* Messages Link */}
          <Link href="/messages" className="relative p-2 rounded-xl hover:bg-[#efe4cf] dark:hover:bg-[#1c2e2a] text-[#201a14] dark:text-[#f1ead9]">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#e8a23d] rounded-full ring-2 ring-[#fffbf3] dark:ring-[#11201d]" />
          </Link>

          {/* Post a Job Fast CTA */}
          <Link href="/jobs/create">
            <Button variant="primary" className="!px-4 !py-2 text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span>Post a Job</span>
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#201a14] dark:text-[#f1ead9] hover:bg-[#efe4cf] dark:hover:bg-[#1c2e2a]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#e4d5b8] dark:border-[#2c433d] bg-[#fffbf3] dark:bg-[#11201d] px-4 py-4 flex flex-col gap-2 shadow-lg">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm hover:bg-[#efe4cf] dark:hover:bg-[#1c2e2a] text-[#201a14] dark:text-[#f1ead9]"
              >
                <Icon className="w-5 h-5 text-[#e8a23d]" />
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-[#e4d5b8] dark:border-[#2c433d] flex flex-col gap-2">
            <Link
              href="/dashboard/customer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#efe4cf] dark:bg-[#1c2e2a] text-sm font-bold"
            >
              <span>Customer Dashboard</span>
              <span className="text-xs text-[#6b5f4f]">View →</span>
            </Link>
            <Link
              href="/dashboard/worker"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#efe4cf] dark:bg-[#1c2e2a] text-sm font-bold"
            >
              <span>Worker Dashboard</span>
              <span className="text-xs text-[#6b5f4f]">View →</span>
            </Link>
            <Link
              href="/dashboard/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#efe4cf] dark:bg-[#1c2e2a] text-sm font-bold"
            >
              <span>Admin & Verification Queue</span>
              <span className="text-xs text-[#6b5f4f]">View →</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
