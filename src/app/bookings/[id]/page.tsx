"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BOOKINGS } from "@/lib/mock-data";
import type { Booking } from "@/types";
import { formatPKR } from "@/lib/utils";
import { Card, Badge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  Clock,
  MapPin,
  Camera,
  MessageSquare,
  PhoneCall,
  AlertTriangle,
  ArrowLeft,
  Share2,
  Sparkles,
  Award,
} from "lucide-react";

export default function BookingTrackerPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [booking, setBooking] = useState<Booking | undefined>(() =>
    BOOKINGS.find((b) => b.id === resolvedParams.id)
  );

  const [isSubmittingProof, setIsSubmittingProof] = useState(false);
  const [isReleasingEscrow, setIsReleasingEscrow] = useState(false);
  const [releaseSuccess, setReleaseSuccess] = useState(false);

  // Form for proof
  const [proofNotes, setProofNotes] = useState("Replaced main 63A circuit breaker and balanced 3-phase load across inverter.");
  const [beforeUrl, setBeforeUrl] = useState("https://picsum.photos/seed/broken-breaker/600/400");
  const [afterUrl, setAfterUrl] = useState("https://picsum.photos/seed/fixed-breaker/600/400");

  if (!booking) {
    return notFound();
  }

  const handleUploadWorkProof = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingProof(true);

    try {
      const res = await fetch(`/api/bookings/${booking.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workProof: {
            beforePhotos: [beforeUrl],
            afterPhotos: [afterUrl],
            completionNotes: proofNotes,
            gpsCheckInTime: "Verified at customer location",
          },
        }),
      });
      const data = await res.json();
      if (res.ok && data.booking) {
        setBooking(data.booking);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingProof(false);
    }
  };

  const handleReleaseEscrow = async () => {
    setIsReleasingEscrow(true);
    try {
      const res = await fetch(`/api/bookings/${booking.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ releaseEscrow: true }),
      });
      const data = await res.json();
      if (res.ok && data.booking) {
        setBooking(data.booking);
        setReleaseSuccess(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsReleasingEscrow(false);
    }
  };

  const steps = [
    { title: "Booking Confirmed", desc: "Craftsman accepted the job", done: true },
    {
      title: "Escrow Deposit Locked",
      desc: `${booking.escrow?.paymentMethod || "JazzCash"} Ref: ${booking.escrow?.paymentRef || "ESC-99214"}`,
      done: booking.escrow?.status === "funds_held" || booking.escrow?.status === "released",
    },
    {
      title: "Worker On Site & GPS Verified",
      desc: `${booking.workerName} checked in at ${booking.address}`,
      done: true,
    },
    {
      title: "Work Proof Submitted",
      desc: booking.workProof ? "Before & after photos uploaded" : "Awaiting technician completion proof",
      done: Boolean(booking.workProof),
    },
    {
      title: "Customer Approval & Payout",
      desc: booking.status === "completed" ? "Escrow funds disbursed to worker" : "Pending your satisfaction signoff",
      done: booking.status === "completed",
    },
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/dashboard/customer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6b5f4f] dark:text-[#afa491] hover:text-[#0f4c4c] transition mb-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Customer Dashboard</span>
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl sm:text-3xl text-[#201a14] dark:text-[#f1ead9]">
              Booking Tracker & Escrow Vault
            </h1>
            <Badge tone="brass">{booking.status.replace("_", " ").toUpperCase()}</Badge>
          </div>
          <p className="text-xs text-[#6b5f4f] dark:text-[#afa491]">
            Ref ID: <strong className="font-mono text-[#0f4c4c]">{booking.id}</strong> · Scheduled: {booking.scheduledDate}
          </p>
        </div>

        {/* WhatsApp Share for Family / Diaspora */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                navigator.clipboard?.writeText(window.location.href);
                alert("Booking tracker link copied! Share with family on WhatsApp.");
              }
            }}
            className="px-3 py-2 rounded-xl bg-[#efe4cf] dark:bg-[#1c2e2a] border border-[#e4d5b8] dark:border-[#2c433d] text-xs font-bold flex items-center gap-1.5 hover:bg-[#e4d5b8]"
          >
            <Share2 className="w-3.5 h-3.5 text-[#0f4c4c]" />
            <span>Share Tracker</span>
          </button>
          <Link href={`/messages?to=${booking.workerId}`}>
            <Button variant="outline" className="!py-1.5 !px-3 text-xs font-bold flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5 text-[#c97f1e]" />
              <span>Chat</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Milestones & Work Proof Photos (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Milestone Step Tracker Card */}
          <Card className="p-6 sm:p-8 space-y-6 border-2 border-[#e4d5b8] dark:border-[#2c433d]">
            <h3 className="font-display text-xl text-[#201a14] dark:text-[#f1ead9] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#0f4c4c] dark:text-[#2c8b84]" />
              <span>Job Milestones & Security Checkpoints</span>
            </h3>

            <div className="space-y-4">
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-3.5 items-start">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-xs ${
                      step.done
                        ? "bg-[#0f4c4c] text-white"
                        : "bg-[#efe4cf] dark:bg-[#11201d] text-[#6b5f4f] border border-[#e4d5b8]"
                    }`}
                  >
                    {step.done ? "✓" : idx + 1}
                  </div>
                  <div className="flex-1">
                    <h4
                      className={`text-xs sm:text-sm font-bold ${
                        step.done
                          ? "text-[#201a14] dark:text-[#f1ead9]"
                          : "text-[#6b5f4f] dark:text-[#afa491]"
                      }`}
                    >
                      {step.title}
                    </h4>
                    <p className="text-xs text-[#6b5f4f] dark:text-[#afa491] mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Work Proof (Before & After Photos) */}
          <Card className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-[#e4d5b8] dark:border-[#2c433d] pb-3">
              <h3 className="font-display text-xl text-[#201a14] dark:text-[#f1ead9] flex items-center gap-2">
                <Camera className="w-5 h-5 text-[#c97f1e]" />
                <span>Technician Work Proof & Photos</span>
              </h3>
              {booking.workProof && <Badge tone="teal">Submitted & GPS Timestamped</Badge>}
            </div>

            {booking.workProof ? (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#6b5f4f] block mb-1.5">
                      Before Repair:
                    </span>
                    <div className="relative h-44 rounded-xl overflow-hidden border border-[#e4d5b8]">
                      <Image
                        src={booking.workProof.beforePhotos[0] || beforeUrl}
                        alt="Before repair"
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#0f4c4c] dark:text-[#2c8b84] block mb-1.5">
                      After Repair (Fixed):
                    </span>
                    <div className="relative h-44 rounded-xl overflow-hidden border border-emerald-500">
                      <Image
                        src={booking.workProof.afterPhotos[0] || afterUrl}
                        alt="After repair"
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-[#efe4cf]/50 dark:bg-[#11201d]/50 rounded-xl text-xs space-y-1">
                  <span className="font-bold text-[#201a14] dark:text-[#f1ead9]">Completion Report:</span>
                  <p className="text-[#6b5f4f] dark:text-[#afa491]">{booking.workProof.completionNotes}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleUploadWorkProof} className="space-y-4 bg-[#efe4cf]/30 dark:bg-[#11201d]/30 p-4 rounded-2xl border border-dashed border-[#e4d5b8] dark:border-[#2c433d]">
                <div className="text-xs space-y-1">
                  <p className="font-bold text-[#201a14] dark:text-[#f1ead9]">
                    🔧 Craftsman Action: Upload On-Site Repair Proof
                  </p>
                  <p className="text-[#6b5f4f] dark:text-[#afa491]">
                    Take photos of the fixed wiring/pipes to allow customer or diaspora sponsor to verify.
                  </p>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-[#6b5f4f] block mb-1">
                    Completion Notes
                  </label>
                  <input
                    type="text"
                    value={proofNotes}
                    onChange={(e) => setProofNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#fffbf3] dark:bg-[#1c2e2a] border border-[#e4d5b8] dark:border-[#2c433d] text-xs font-medium"
                  />
                </div>

                <Button
                  type="submit"
                  variant="outline"
                  disabled={isSubmittingProof}
                  className="!py-2 text-xs font-bold flex items-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5 text-[#0f4c4c]" />
                  <span>{isSubmittingProof ? "Uploading Proof..." : "Submit Photo Proof & Request Release"}</span>
                </Button>
              </form>
            )}
          </Card>
        </div>

        {/* Right Column: Escrow Vault Status & Action Release (5 cols) */}
        <div className="lg:col-span-5 space-y-5 sticky top-24">
          <Card className="p-6 space-y-5 border-2 border-[#0f4c4c] dark:border-[#2c8b84] bg-[#fffbf3] dark:bg-[#1c2e2a] shadow-xl">
            <div className="flex items-center justify-between border-b border-[#e4d5b8] dark:border-[#2c433d] pb-3">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#c97f1e]" />
                <span className="font-bold text-sm text-[#201a14] dark:text-[#f1ead9]">Escrow Vault</span>
              </div>
              <Badge tone={booking.escrow?.status === "released" ? "teal" : "brass"}>
                {booking.escrow?.status === "released" ? "PAID OUT" : "FUNDS LOCKED"}
              </Badge>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase text-[#6b5f4f] dark:text-[#afa491]">
                Protected Amount
              </span>
              <div className="font-mono text-3xl font-bold text-[#0f4c4c] dark:text-[#2c8b84]">
                {formatPKR(booking.amount)}
              </div>
              <p className="text-[11px] text-[#6b5f4f] dark:text-[#afa491]">
                Method: <strong>{booking.escrow?.paymentMethod || "JazzCash"}</strong> · Ref:{" "}
                <span className="font-mono">{booking.escrow?.paymentRef || "ESC-81921"}</span>
              </p>
            </div>

            {/* Release Escrow Button */}
            {booking.status === "completed" || releaseSuccess ? (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 rounded-2xl text-center space-y-1">
                <p className="font-bold text-sm text-emerald-900 dark:text-emerald-200">
                  ✓ Escrow Released Successfully!
                </p>
                <p className="text-xs text-emerald-800 dark:text-emerald-300">
                  {formatPKR(booking.amount)} has been credited to {booking.workerName}&apos;s account.
                </p>
              </div>
            ) : (
              <div className="space-y-2 pt-2">
                <Button
                  variant="primary"
                  onClick={handleReleaseEscrow}
                  disabled={isReleasingEscrow}
                  className="w-full !py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isReleasingEscrow ? "Processing Payout..." : "I Inspect & Approve Work (Release Funds)"}</span>
                </Button>

                <p className="text-[11px] text-center text-[#6b5f4f] dark:text-[#afa491]">
                  Only release once you test the repair. If unsatisfied, request corrections or mediation.
                </p>
              </div>
            )}

            {/* Dispute resolution link */}
            <div className="pt-3 border-t border-[#e4d5b8] dark:border-[#2c433d] flex items-center justify-between text-xs">
              <span className="text-[#6b5f4f] dark:text-[#afa491]">Disagreement with repair?</span>
              <Link href="/disputes" className="font-bold text-[#a63a2e] hover:underline flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Call Elder Jirga</span>
              </Link>
            </div>
          </Card>

          {/* Worker Info Card */}
          <div className="p-4 rounded-2xl bg-[#efe4cf]/50 dark:bg-[#11201d]/50 border border-[#e4d5b8] dark:border-[#2c433d] flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#0f4c4c] text-[#e8a23d] flex items-center justify-center font-bold text-sm">
              {booking.workerName[0]}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-xs sm:text-sm text-[#201a14] dark:text-[#f1ead9]">
                {booking.workerName}
              </h4>
              <p className="text-[11px] text-[#6b5f4f] dark:text-[#afa491]">{booking.workerCategory}</p>
            </div>
            <Link href={`/workers/${booking.workerId}`}>
              <Button variant="ghost" className="!py-1.5 !px-2.5 !text-xs font-bold">
                Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
