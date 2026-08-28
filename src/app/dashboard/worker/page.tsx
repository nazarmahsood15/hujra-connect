"use client";

import { useState } from "react";
import Link from "next/link";
import { WORKERS, JOBS, BOOKINGS } from "@/lib/mock-data";
import { formatPKR, stars } from "@/lib/utils";
import { Card, Badge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { VouchChain } from "@/components/VouchChain";
import {
  Briefcase,
  Wallet,
  HeartHandshake,
  ShieldCheck,
  Zap,
  ArrowRight,
  Clock,
  CheckCircle2,
  Camera,
  MessageSquare,
  Plus,
  Radio,
  Send,
  Lock,
} from "lucide-react";

export default function WorkerDashboard() {
  const worker = WORKERS[0]; // Rahim Gul as logged in worker
  const [emergencyActive, setEmergencyActive] = useState(worker.emergencyService);
  const [availableForJobs, setAvailableForJobs] = useState(true);
  const [withdrawing, setWithdrawing] = useState(false);
  const [withdrawnSuccess, setWithdrawnSuccess] = useState(false);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [invitePhone, setInvitePhone] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviteSuccess, setInviteSuccess] = useState(false);

  const handleWithdraw = () => {
    setWithdrawing(true);
    setTimeout(() => {
      setWithdrawing(false);
      setWithdrawnSuccess(true);
      setTimeout(() => setWithdrawnSuccess(false), 4000);
    }, 1200);
  };

  const handleSendVouchInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setInviteSuccess(true);
    setTimeout(() => {
      setInviteSuccess(false);
      setInviteModalOpen(false);
      setInviteName("");
      setInvitePhone("");
    }, 2000);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Worker Header Card */}
      <Card className="p-6 sm:p-8 bg-gradient-to-br from-[#fffbf3] to-[#efe4cf] dark:from-[#1c2e2a] dark:to-[#11201d] border-2 border-[#e4d5b8] dark:border-[#2c433d] space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-[#0f4c4c] text-[#e8a23d] flex items-center justify-center font-display text-2xl font-bold ring-4 ring-[#e8a23d]/40 shadow-lg">
              {worker.name[0]}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-display text-2xl sm:text-3xl text-[#201a14] dark:text-[#f1ead9]">
                  {worker.name} (Ustad)
                </h1>
                <Badge tone="brass">★ {worker.trustScore} Trust Score</Badge>
                {worker.cnicVerified && (
                  <Badge tone="teal" className="gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>NADRA Cleared</span>
                  </Badge>
                )}
              </div>
              <p className="text-xs font-bold text-[#0f4c4c] dark:text-[#2c8b84] mt-0.5">
                {worker.category} · {worker.area}, {worker.city}
              </p>
              <p className="text-[11px] text-[#6b5f4f] dark:text-[#afa491]">
                {stars(worker.rating)} {worker.rating} rating · {worker.jobsCompleted} lifetime jobs completed
              </p>
            </div>
          </div>

          {/* Availability Toggles */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setEmergencyActive(!emergencyActive)}
              className={`px-4 py-2.5 rounded-2xl border text-xs font-bold flex items-center gap-2 transition ${
                emergencyActive
                  ? "bg-amber-100 dark:bg-amber-950/60 border-amber-400 text-amber-950 dark:text-amber-200"
                  : "bg-[#fffbf3] dark:bg-[#1c2e2a] border-[#e4d5b8] text-[#6b5f4f]"
              }`}
            >
              <Zap className={`w-4 h-4 ${emergencyActive ? "text-amber-500 fill-current" : ""}`} />
              <span>{emergencyActive ? "24/7 Emergency Dispatch ON" : "24/7 Emergency OFF"}</span>
            </button>

            <button
              onClick={() => setAvailableForJobs(!availableForJobs)}
              className={`px-4 py-2.5 rounded-2xl border text-xs font-bold flex items-center gap-2 transition ${
                availableForJobs
                  ? "bg-emerald-100 dark:bg-emerald-950/60 border-emerald-400 text-emerald-950 dark:text-emerald-200"
                  : "bg-[#fffbf3] dark:bg-[#1c2e2a] border-[#e4d5b8] text-[#6b5f4f]"
              }`}
            >
              <Radio className={`w-4 h-4 ${availableForJobs ? "text-emerald-600 animate-pulse" : ""}`} />
              <span>{availableForJobs ? "Online: Receiving Quotes" : "Offline / Busy"}</span>
            </button>
          </div>
        </div>
      </Card>

      {/* Financial & Earnings Overview */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 bg-[#fffbf3] dark:bg-[#1c2e2a] space-y-1">
          <span className="text-[11px] font-bold uppercase text-[#6b5f4f] dark:text-[#afa491] flex items-center justify-between">
            <span>Available to Withdraw</span>
            <Wallet className="w-4 h-4 text-emerald-600" />
          </span>
          <div className="font-mono text-2xl font-bold text-[#0f4c4c] dark:text-[#2c8b84]">
            Rs 24,500
          </div>
          <button
            onClick={handleWithdraw}
            disabled={withdrawing}
            className="text-xs font-bold text-[#c97f1e] hover:underline pt-1 block"
          >
            {withdrawing ? "Transferring..." : "Instant Transfer to JazzCash →"}
          </button>
        </Card>

        <Card className="p-5 bg-[#fffbf3] dark:bg-[#1c2e2a] space-y-1">
          <span className="text-[11px] font-bold uppercase text-[#6b5f4f] dark:text-[#afa491] flex items-center justify-between">
            <span>Locked in Escrow</span>
            <Lock className="w-4 h-4 text-[#c97f1e]" />
          </span>
          <div className="font-mono text-2xl font-bold text-[#c97f1e]">
            Rs 8,500
          </div>
          <span className="text-[11px] text-[#6b5f4f] block">
            Releases upon customer inspection
          </span>
        </Card>

        <Card className="p-5 bg-[#fffbf3] dark:bg-[#1c2e2a] space-y-1">
          <span className="text-[11px] font-bold uppercase text-[#6b5f4f] dark:text-[#afa491] flex items-center justify-between">
            <span>Elder Vouch Weight</span>
            <HeartHandshake className="w-4 h-4 text-[#a63a2e]" />
          </span>
          <div className="font-mono text-2xl font-bold text-[#201a14] dark:text-[#f1ead9]">
            {worker.vouches.length} Endorsements
          </div>
          <button
            onClick={() => setInviteModalOpen(true)}
            className="text-xs font-bold text-[#0f4c4c] dark:text-[#2c8b84] hover:underline pt-1 block"
          >
            + Invite Elder / Imam to Vouch
          </button>
        </Card>

        <Card className="p-5 bg-[#fffbf3] dark:bg-[#1c2e2a] space-y-1">
          <span className="text-[11px] font-bold uppercase text-[#6b5f4f] dark:text-[#afa491] flex items-center justify-between">
            <span>This Month Earnings</span>
            <Briefcase className="w-4 h-4 text-[#0f4c4c]" />
          </span>
          <div className="font-mono text-2xl font-bold text-[#201a14] dark:text-[#f1ead9]">
            Rs 72,000
          </div>
          <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold block">
            +18% from last month
          </span>
        </Card>
      </div>

      {withdrawnSuccess && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 rounded-2xl text-xs font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Success! Rs 24,500 has been transferred to your registered JazzCash account (0300-9876543).</span>
        </div>
      )}

      {/* Main Action Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Active Bookings & Assigned Work (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-[#201a14] dark:text-[#f1ead9]">
              Active Jobs & Work Proof Submission
            </h2>
            <Badge tone="teal">1 Active Order</Badge>
          </div>

          <Card className="p-6 space-y-4 border-2 border-[#0f4c4c] dark:border-[#2c8b84]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <Badge tone="maroon">In Progress · On Site</Badge>
                <h3 className="font-display text-lg text-[#201a14] dark:text-[#f1ead9] mt-1">
                  Main DB Breaker Tripping & Inverter Setup
                </h3>
                <p className="text-xs text-[#6b5f4f] dark:text-[#afa491]">
                  Customer: <strong>Ayesha Bibi</strong> · Hayatabad Phase 4, Peshawar
                </p>
              </div>
              <span className="font-mono text-lg font-bold text-[#0f4c4c] dark:text-[#2c8b84]">
                Rs 3,500
              </span>
            </div>

            <div className="p-3 bg-[#efe4cf]/50 dark:bg-[#11201d]/50 rounded-xl text-xs space-y-1">
              <span className="font-bold text-[#c97f1e]">Task Status:</span>
              <p className="text-[#6b5f4f] dark:text-[#afa491]">
                Escrow is funded. Upload before & after photos to allow customer to release payment.
              </p>
            </div>

            <div className="flex gap-2">
              <Link href={`/bookings/${BOOKINGS[0].id}`} className="flex-1">
                <Button variant="primary" className="w-full !py-2.5 text-xs font-bold flex items-center justify-center gap-1.5">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Upload Work Proof Photos</span>
                </Button>
              </Link>
              <Link href={`/messages?to=${BOOKINGS[0].customerId}`}>
                <Button variant="outline" className="!py-2.5 text-xs font-bold">
                  Chat
                </Button>
              </Link>
            </div>
          </Card>

          {/* Vouch Chain Details */}
          <Card className="p-6 space-y-4 bg-[#fffbf3] dark:bg-[#1c2e2a]">
            <div className="flex items-center justify-between border-b border-[#e4d5b8] dark:border-[#2c433d] pb-3">
              <h3 className="font-display text-xl text-[#201a14] dark:text-[#f1ead9]">
                Your Community Vouch Chain
              </h3>
              <Badge tone="brass">{worker.vouches.length} Vouchers</Badge>
            </div>
            <VouchChain vouches={worker.vouches} workerName={worker.name} interactive={true} />
          </Card>
        </div>

        {/* Right Column: Nearby Open Job Leads Radar (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-[#201a14] dark:text-[#f1ead9]">
              Nearby Job Leads
            </h2>
            <span className="text-xs text-[#0f4c4c] dark:text-[#2c8b84] font-bold">
              {JOBS.length} New Requests
            </span>
          </div>

          <div className="space-y-3">
            {JOBS.map((job) => (
              <Card
                key={job.id}
                className="p-4 space-y-2 border border-[#e4d5b8] dark:border-[#2c433d] hover:border-[#0f4c4c] transition"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0f4c4c] dark:text-[#2c8b84]">
                      {job.category}
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm text-[#201a14] dark:text-[#f1ead9]">
                      {job.title}
                    </h4>
                  </div>
                  <Badge
                    tone={
                      job.urgency === "Emergency"
                        ? "maroon"
                        : "brass"
                    }
                    className="!text-[9px]"
                  >
                    {job.urgency}
                  </Badge>
                </div>

                <p className="text-xs text-[#6b5f4f] dark:text-[#afa491] line-clamp-2">
                  {job.description}
                </p>

                <div className="pt-2 border-t border-[#e4d5b8] dark:border-[#2c433d] flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-[#0f4c4c] dark:text-[#2c8b84]">
                    {formatPKR(job.budget)}
                  </span>
                  <Link href={`/jobs/${job.id}`}>
                    <Button variant="primary" className="!py-1.5 !px-3 text-xs font-bold">
                      Send Quote →
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Invite Elder Modal */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#fffbf3] dark:bg-[#1c2e2a] border-2 border-[#0f4c4c] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-display text-2xl text-[#201a14] dark:text-[#f1ead9]">
              Request an Elder / Imam Vouch
            </h3>
            <p className="text-xs text-[#6b5f4f] dark:text-[#afa491]">
              Enter the name and mobile number of your local mosque Imam, tribal elder, or Union Council member. We will send them an SMS verification link to vouch for your trade skills.
            </p>

            {inviteSuccess ? (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 rounded-xl text-center text-xs font-bold text-emerald-900 dark:text-emerald-200">
                ✓ Verification invitation sent via SMS to {inviteName}!
              </div>
            ) : (
              <form onSubmit={handleSendVouchInvite} className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold uppercase text-[#6b5f4f] block mb-1">
                    Elder / Imam Name & Role
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Qari Bilal, Jamia Mosque"
                    value={inviteName}
                    onChange={(e) => setInviteName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#efe4cf] dark:bg-[#11201d] border border-[#e4d5b8] text-xs font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-[#6b5f4f] block mb-1">
                    Mobile Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="0300-XXXXXXX"
                    value={invitePhone}
                    onChange={(e) => setInvitePhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#efe4cf] dark:bg-[#11201d] border border-[#e4d5b8] text-xs font-semibold"
                    required
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <Button type="submit" variant="primary" className="flex-1 !py-2 text-xs font-bold">
                    Send SMS Vouch Request
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setInviteModalOpen(false)}
                    className="!py-2 text-xs font-bold"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
