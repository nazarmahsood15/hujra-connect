"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BOOKINGS } from "@/lib/mock-data";
import type { Booking } from "@/types";
import { formatPKR } from "@/lib/utils";
import { Card, Badge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  Clock,
  MapPin,
  Globe2,
  CheckCircle2,
  Calendar,
} from "lucide-react";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(BOOKINGS);
  const [filter, setFilter] = useState<"all" | "in_progress" | "completed">("all");

  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        if (data.bookings) setBookings(data.bookings);
      })
      .catch(console.error);
  }, []);

  const filtered = bookings.filter((b) => {
    if (filter === "all") return true;
    return b.status === filter;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-3xl sm:text-4xl text-[#201a14] dark:text-[#f1ead9]">
              Active Bookings & Escrow Vaults
            </h1>
            <Badge tone="teal">{filtered.length} Orders</Badge>
          </div>
          <p className="text-xs sm:text-sm text-[#6b5f4f] dark:text-[#afa491] mt-1">
            Track real-time technician arrival, photo verification milestones, and escrow release status.
          </p>
        </div>

        <Link href="/jobs/create">
          <Button variant="primary" className="!px-4 !py-2.5 text-xs sm:text-sm font-bold shadow-sm">
            Book New Service
          </Button>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-[#e4d5b8] dark:border-[#2c433d] pb-2">
        {[
          { id: "all", label: "All Bookings", count: bookings.length },
          {
            id: "in_progress",
            label: "In Progress / Active",
            count: bookings.filter((b) => b.status === "in_progress" || b.status === "work_submitted").length,
          },
          {
            id: "completed",
            label: "Completed & Released",
            count: bookings.filter((b) => b.status === "completed").length,
          },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setFilter(t.id as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              filter === t.id
                ? "bg-[#0f4c4c] text-white shadow-sm"
                : "bg-[#fffbf3] dark:bg-[#1c2e2a] border border-[#e4d5b8] dark:border-[#2c433d] text-[#201a14] dark:text-[#f1ead9] hover:bg-[#efe4cf]"
            }`}
          >
            <span>{t.label}</span>
            <span className="text-[10px] opacity-80 font-mono">({t.count})</span>
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filtered.map((b) => (
          <Card
            key={b.id}
            className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-2 border-[#e4d5b8] dark:border-[#2c433d] hover:border-[#0f4c4c] transition"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-display text-lg text-[#201a14] dark:text-[#f1ead9]">
                  {b.serviceTitle}
                </h3>
                <Badge tone={b.status === "completed" ? "teal" : "brass"}>
                  {b.status.replace("_", " ").toUpperCase()}
                </Badge>
                {b.isDiaspora && (
                  <span className="text-[10px] font-bold bg-[#e8a23d]/20 text-[#c97f1e] px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Globe2 className="w-3 h-3" />
                    <span>Diaspora Care</span>
                  </span>
                )}
              </div>

              <p className="text-xs text-[#6b5f4f] dark:text-[#afa491]">
                Technician: <strong className="text-[#201a14] dark:text-[#f1ead9]">{b.workerName}</strong> ({b.workerCategory}) · Scheduled: {b.scheduledDate}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#6b5f4f] dark:text-[#afa491] pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#c97f1e]" />
                  <span>{b.address}, {b.city}</span>
                </span>
                <span className="flex items-center gap-1 font-mono font-bold text-[#0f4c4c] dark:text-[#2c8b84]">
                  <Lock className="w-3.5 h-3.5" />
                  <span>{formatPKR(b.amount)} held in Escrow</span>
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link href={`/bookings/${b.id}`}>
                <Button variant="primary" className="!py-2 !px-4 text-xs font-bold flex items-center gap-1.5 shadow">
                  <span>Open Live Tracker</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
              <Link href={`/messages?to=${b.workerId}`}>
                <Button variant="outline" className="!py-2 !px-3 text-xs font-bold">
                  Chat with Ustad
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
