"use client";

import { useState } from "react";
import Link from "next/link";
import { WORKERS } from "@/lib/mock-data";
import { Card, Badge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatPKR } from "@/lib/utils";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Users,
  Lock,
  Search,
  Sparkles,
  FileText,
  PhoneCall,
  Scale,
} from "lucide-react";

export default function AdminDashboard() {
  const [activeQueueTab, setActiveQueueTab] = useState<"verifications" | "vouches" | "disputes" | "fraud">("verifications");

  // Sample pending verification items
  const [pendingWorkers, setPendingWorkers] = useState([
    {
      id: "w-pen-1",
      name: "Muhammad Tariq",
      category: "Solar Technician",
      city: "Swat",
      area: "Mingora",
      cnic: "15602-9812731-5",
      elderName: "Malik Farooq",
      elderPhone: "0301-8821990",
      submittedAt: "2 hours ago",
      cnicFront: "https://picsum.photos/seed/cnic1/400/250",
      selfie: "https://picsum.photos/seed/selfie1/250/250",
      status: "pending",
    },
    {
      id: "w-pen-2",
      name: "Naseem Jan",
      category: "AC Technician",
      city: "Mardan",
      area: "Gujar Garhi",
      cnic: "16101-4419203-1",
      elderName: "Qari Sanaullah (Jamia Masjid)",
      elderPhone: "0333-9182341",
      submittedAt: "5 hours ago",
      cnicFront: "https://picsum.photos/seed/cnic2/400/250",
      selfie: "https://picsum.photos/seed/selfie2/250/250",
      status: "pending",
    },
  ]);

  const [disputes, setDisputes] = useState([
    {
      id: "dsp-101",
      bookingId: "bk-992144",
      customerName: "Kashif Afridi",
      workerName: "Gulzar Ustad (Plumber)",
      issue: "Customer claims water pressure pump pipe seal leaked after 2 days; worker states old galvanized pipe ruptured elsewhere.",
      amount: 4200,
      assignedElder: "Malik Amanullah Khan (Jirga Member)",
      status: "Mediation in Progress",
    },
  ]);

  const handleApproveWorker = (id: string) => {
    setPendingWorkers((prev) => prev.filter((w) => w.id !== id));
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e4d5b8] dark:border-[#2c433d] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-3xl text-[#201a14] dark:text-[#f1ead9]">
              Admin Trust & Jirga Control Room
            </h1>
            <Badge tone="maroon">Super Admin</Badge>
          </div>
          <p className="text-xs text-[#6b5f4f] dark:text-[#afa491] mt-0.5">
            Identity verification queues, Elder vouches auditing, and escrow dispute settlements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge tone="brass">System Status: 100% Operational</Badge>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-[#fffbf3] dark:bg-[#1c2e2a]">
          <span className="text-[11px] font-bold uppercase text-[#6b5f4f] dark:text-[#afa491] block">
            Pending Identity Reviews
          </span>
          <span className="font-mono text-2xl font-bold text-[#0f4c4c] dark:text-[#2c8b84]">
            {pendingWorkers.length} Applications
          </span>
        </Card>

        <Card className="p-4 bg-[#fffbf3] dark:bg-[#1c2e2a]">
          <span className="text-[11px] font-bold uppercase text-[#6b5f4f] dark:text-[#afa491] block">
            Total Escrow Vault Balance
          </span>
          <span className="font-mono text-2xl font-bold text-[#c97f1e]">
            Rs 482,500
          </span>
        </Card>

        <Card className="p-4 bg-[#fffbf3] dark:bg-[#1c2e2a]">
          <span className="text-[11px] font-bold uppercase text-[#6b5f4f] dark:text-[#afa491] block">
            Active Jirga Disputes
          </span>
          <span className="font-mono text-2xl font-bold text-[#a63a2e]">
            {disputes.length} Open Case
          </span>
        </Card>

        <Card className="p-4 bg-[#fffbf3] dark:bg-[#1c2e2a]">
          <span className="text-[11px] font-bold uppercase text-[#6b5f4f] dark:text-[#afa491] block">
            AI Fraud Flags
          </span>
          <span className="font-mono text-2xl font-bold text-emerald-700 dark:text-emerald-400">
            0 Critical Flags
          </span>
        </Card>
      </div>

      {/* Navigation tabs */}
      <div className="flex border-b border-[#e4d5b8] dark:border-[#2c433d] gap-4">
        {[
          { id: "verifications", label: "CNIC & Worker Queue", count: pendingWorkers.length },
          { id: "disputes", label: "Jirga Dispute Panel", count: disputes.length },
          { id: "fraud", label: "AI Fraud Detector", count: 0 },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveQueueTab(t.id as any)}
            className={`pb-3 font-bold text-xs sm:text-sm transition relative ${
              activeQueueTab === t.id
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

      {/* Tab: Worker Queue */}
      {activeQueueTab === "verifications" && (
        <div className="space-y-4">
          {pendingWorkers.map((pw) => (
            <Card key={pw.id} className="p-6 space-y-4 border-2 border-[#e4d5b8] dark:border-[#2c433d]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-xl text-[#201a14] dark:text-[#f1ead9]">{pw.name}</h3>
                    <Badge tone="brass">{pw.category}</Badge>
                  </div>
                  <p className="text-xs text-[#6b5f4f] dark:text-[#afa491] mt-0.5">
                    Location: <strong>{pw.area}, {pw.city}</strong> · CNIC: <span className="font-mono">{pw.cnic}</span>
                  </p>
                </div>
                <span className="text-xs text-[#6b5f4f]">{pw.submittedAt}</span>
              </div>

              {/* Elder Contact Snippet */}
              <div className="p-3.5 bg-[#efe4cf]/50 dark:bg-[#11201d]/50 rounded-xl text-xs space-y-1">
                <span className="font-bold text-[#0f4c4c] dark:text-[#2c8b84] flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Vouching Elder Contact Details</span>
                </span>
                <p className="text-[#201a14] dark:text-[#f1ead9]">
                  Elder: <strong>{pw.elderName}</strong> · Phone: <span className="font-mono">{pw.elderPhone}</span> (Confirmed via SMS OTP)
                </p>
              </div>

              <div className="flex gap-2 justify-end pt-2 border-t border-[#e4d5b8] dark:border-[#2c433d]">
                <Button
                  variant="outline"
                  onClick={() => handleApproveWorker(pw.id)}
                  className="!py-2 !px-4 text-xs font-bold text-[#a63a2e] hover:bg-red-50"
                >
                  Reject Application
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleApproveWorker(pw.id)}
                  className="!py-2 !px-5 text-xs font-bold flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve & Grant Elder Verified Badge</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Tab: Disputes */}
      {activeQueueTab === "disputes" && (
        <div className="space-y-4">
          {disputes.map((d) => (
            <Card key={d.id} className="p-6 space-y-4 border-2 border-[#a63a2e]/40">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Badge tone="maroon">Dispute #{d.id}</Badge>
                  <h3 className="font-display text-lg text-[#201a14] dark:text-[#f1ead9] mt-1">
                    Booking: {d.bookingId} ({formatPKR(d.amount)} in Escrow)
                  </h3>
                  <p className="text-xs text-[#6b5f4f] dark:text-[#afa491]">
                    Customer: <strong>{d.customerName}</strong> vs Worker: <strong>{d.workerName}</strong>
                  </p>
                </div>
                <Badge tone="brass">{d.status}</Badge>
              </div>

              <p className="text-xs sm:text-sm text-[#201a14] dark:text-[#f1ead9] bg-[#efe4cf]/50 dark:bg-[#11201d]/50 p-4 rounded-xl leading-relaxed">
                &ldquo;{d.issue}&rdquo;
              </p>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="font-bold text-[#0f4c4c] dark:text-[#2c8b84] flex items-center gap-1">
                  <Scale className="w-4 h-4" />
                  <span>Assigned Jirga Mediator: {d.assignedElder}</span>
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" className="!py-1.5 !px-3 text-xs font-bold">
                    Split 50/50 Settlement
                  </Button>
                  <Button variant="primary" className="!py-1.5 !px-3 text-xs font-bold">
                    Resolve Dispute
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Tab: AI Fraud Detector */}
      {activeQueueTab === "fraud" && (
        <Card className="p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto text-xl">
            ✓
          </div>
          <h3 className="font-display text-xl text-[#201a14] dark:text-[#f1ead9]">
            AI Anomaly & Sybil Defense: All Clean
          </h3>
          <p className="text-xs text-[#6b5f4f] dark:text-[#afa491] max-w-md mx-auto">
            Zero multi-account ring vouches or fake location spoofing detected across the network in the last 24 hours.
          </p>
        </Card>
      )}
    </main>
  );
}
