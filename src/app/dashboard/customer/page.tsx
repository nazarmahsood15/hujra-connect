"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BOOKINGS, JOBS, WORKERS } from "@/lib/mock-data";
import type { Booking, Job } from "@/types";
import { formatPKR, stars } from "@/lib/utils";
import { Card, Badge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  UserCheck,
  Lock,
  Clock,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  Globe2,
  Calendar,
  MessageSquare,
  Plus,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function CustomerDashboard() {
  const [bookings, setBookings] = useState<Booking[]>(BOOKINGS);
  const [jobs, setJobs] = useState<Job[]>(JOBS);
  const [activeTab, setActiveTab] = useState<"bookings" | "jobs" | "diaspora">("bookings");

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e4d5b8] dark:border-[#2c433d] pb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#0f4c4c] text-[#e8a23d] flex items-center justify-center font-display text-2xl font-bold shadow-md">
            A
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl sm:text-3xl text-[#201a14] dark:text-[#f1ead9]">
                Ayesha Bibi
              </h1>
              <Badge tone="teal">Verified Resident</Badge>
            </div>
            <p className="text-xs text-[#6b5f4f] dark:text-[#afa491] mt-0.5">
              Hayatabad Phase 4, Peshawar · 8 completed household repairs
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Link href="/jobs/create">
            <Button variant="primary" className="!py-2 !px-4 text-xs sm:text-sm font-bold flex items-center gap-1.5">
              <Plus className="w-4 h-4" />
              <span>Post New Request</span>
            </Button>
          </Link>
          <Link href="/marketplace">
            <Button variant="outline" className="!py-2 !px-4 text-xs sm:text-sm font-bold">
              Find Workers
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Metric Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-[#fffbf3] dark:bg-[#1c2e2a]">
          <span className="text-[11px] font-bold uppercase text-[#6b5f4f] dark:text-[#afa491] block">
            Active Bookings
          </span>
          <span className="font-mono text-2xl font-bold text-[#0f4c4c] dark:text-[#2c8b84]">
            {bookings.filter((b) => b.status === "in_progress" || b.status === "work_submitted").length}
          </span>
        </Card>

        <Card className="p-4 bg-[#fffbf3] dark:bg-[#1c2e2a]">
          <span className="text-[11px] font-bold uppercase text-[#6b5f4f] dark:text-[#afa491] block">
            Escrow Protected
          </span>
          <span className="font-mono text-2xl font-bold text-[#c97f1e]">
            {formatPKR(
              bookings
                .filter((b) => b.escrow?.status === "funds_held")
                .reduce((acc, b) => acc + (b.escrow?.amount || 0), 0)
            )}
          </span>
        </Card>

        <Card className="p-4 bg-[#fffbf3] dark:bg-[#1c2e2a]">
          <span className="text-[11px] font-bold uppercase text-[#6b5f4f] dark:text-[#afa491] block">
            Open Job Posts
          </span>
          <span className="font-mono text-2xl font-bold text-[#201a14] dark:text-[#f1ead9]">
            {jobs.length}
          </span>
        </Card>

        <Card className="p-4 bg-[#fffbf3] dark:bg-[#1c2e2a]">
          <span className="text-[11px] font-bold uppercase text-[#6b5f4f] dark:text-[#afa491] block">
            Community Trust Standing
          </span>
          <span className="font-mono text-2xl font-bold text-emerald-700 dark:text-emerald-400">
            99% Prompt Signoff
          </span>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#e4d5b8] dark:border-[#2c433d] gap-4">
        {[
          { id: "bookings", label: "My Bookings & Escrow Vault", count: bookings.length },
          { id: "jobs", label: "My Posted Job Requests", count: jobs.length },
          { id: "diaspora", label: "Diaspora Overseas Care", count: bookings.filter((b) => b.isDiaspora).length },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`pb-3 font-bold text-xs sm:text-sm transition relative ${
              activeTab === t.id
                ? "text-[#0f4c4c] dark:text-[#2c8b84] border-b-2 border-[#0f4c4c] dark:border-[#2c8b84]"
                : "text-[#6b5f4f] dark:text-[#afa491] hover:text-[#201a14]"
            }`}
          >
            <span>{t.label}</span>
            <span className="ml-1.5 text-xs bg-[#efe4cf] dark:bg-[#11201d] px-2 py-0.5 rounded-full font-mono">
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "bookings" && (
        <div className="space-y-4">
          {bookings.map((b) => (
            <Card
              key={b.id}
              className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-2 border-[#e4d5b8] dark:border-[#2c433d] hover:border-[#0f4c4c] transition"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-base text-[#201a14] dark:text-[#f1ead9]">{b.serviceTitle}</h3>
                  <Badge tone={b.status === "completed" ? "teal" : "brass"}>
                    {b.status.replace("_", " ").toUpperCase()}
                  </Badge>
                  {b.isDiaspora && (
                    <span className="text-[10px] font-bold bg-[#e8a23d]/20 text-[#c97f1e] px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Globe2 className="w-3 h-3" />
                      <span>Overseas Sponsored</span>
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#6b5f4f] dark:text-[#afa491]">
                  Worker: <strong className="text-[#201a14] dark:text-[#f1ead9]">{b.workerName}</strong> ({b.workerCategory}) · Scheduled: {b.scheduledDate}
                </p>

                <div className="flex items-center gap-3 text-xs">
                  <span className="font-mono font-bold text-[#0f4c4c] dark:text-[#2c8b84]">
                    {formatPKR(b.amount)}
                  </span>
                  <span className="text-[#6b5f4f] dark:text-[#afa491]">
                    Escrow: <strong>{b.escrow?.status === "released" ? "Released" : "Funds Held Safely"}</strong>
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Link href={`/bookings/${b.id}`}>
                  <Button variant="primary" className="!py-2 !px-4 text-xs font-bold flex items-center gap-1">
                    <span>Open Live Job & Escrow Tracker</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
                <Link href={`/messages?to=${b.workerId}`}>
                  <Button variant="outline" className="!py-2 !px-3 text-xs font-bold">
                    Chat
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "jobs" && (
        <div className="space-y-4">
          {jobs.map((j) => (
            <Card key={j.id} className="p-6 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Badge tone="teal">{j.category}</Badge>
                  <h3 className="font-display text-lg text-[#201a14] dark:text-[#f1ead9] mt-1">{j.title}</h3>
                  <p className="text-xs text-[#6b5f4f] dark:text-[#afa491]">{j.customerArea}, {j.customerCity} · Budget: {formatPKR(j.budget)}</p>
                </div>
                <Badge tone="brass">{j.offersCount} Quotes Received</Badge>
              </div>
              <p className="text-xs text-[#201a14]/80 dark:text-[#f1ead9]/80 line-clamp-2">{j.description}</p>
              <div className="pt-2 flex justify-end">
                <Link href={`/jobs/${j.id}`}>
                  <Button variant="primary" className="!py-1.5 !px-3 text-xs font-bold">
                    Review Vouched Offers ({j.offersCount}) →
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "diaspora" && (
        <div className="space-y-4">
          <Card className="p-6 bg-gradient-to-r from-[#0f4c4c] to-[#17706b] text-white space-y-2">
            <h3 className="font-display text-xl">Overseas Family Care Account</h3>
            <p className="text-xs text-white/80">
              Manage home repair services booked for family in Peshawar and KP while living abroad.
            </p>
            <div className="pt-2">
              <Link href="/diaspora">
                <Button variant="primary" className="!py-2 text-xs font-bold">
                  Explore Diaspora Care Mode →
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      )}
    </main>
  );
}
