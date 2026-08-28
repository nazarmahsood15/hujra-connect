"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, Badge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Scale, HeartHandshake, ShieldCheck, AlertTriangle, CheckCircle2, PhoneCall } from "lucide-react";

export default function DisputesPage() {
  const [ticketId, setTicketId] = useState("");
  const [complaintText, setComplaintText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      <div className="max-w-2xl space-y-3">
        <Badge tone="maroon">Fair Tribal Mediation</Badge>
        <h1 className="font-display text-3xl sm:text-4xl text-[#201a14] dark:text-[#f1ead9]">
          The Hujra Jirga Dispute Resolution Process
        </h1>
        <p className="text-xs sm:text-sm text-[#6b5f4f] dark:text-[#afa491] leading-relaxed">
          In case of unexpected damage, substandard craftsmanship, or price disagreements, your funds remain frozen in escrow while a 3-member community elder council reviews the evidence.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { step: "1", title: "Escrow Auto-Freeze", desc: "The customer or worker halts the payout timer with 1 click." },
          { step: "2", title: "Elder Evidence Review", desc: "Before & after photos, timestamps, and quotes are evaluated." },
          { step: "3", title: "Binding Jirga Settlement", desc: "Settlement issued in 24-48 hours: 100% refund, rework, or split payout." },
        ].map((s) => (
          <Card key={s.step} className="p-5 space-y-2 bg-[#fffbf3] dark:bg-[#1c2e2a]">
            <span className="w-8 h-8 rounded-full bg-[#0f4c4c] text-white font-bold text-xs flex items-center justify-center">
              {s.step}
            </span>
            <h3 className="font-bold text-sm text-[#201a14] dark:text-[#f1ead9]">{s.title}</h3>
            <p className="text-xs text-[#6b5f4f] dark:text-[#afa491]">{s.desc}</p>
          </Card>
        ))}
      </div>

      <Card className="p-6 sm:p-8 space-y-6 border-2 border-[#e4d5b8] dark:border-[#2c433d]">
        <h2 className="font-display text-2xl text-[#201a14] dark:text-[#f1ead9]">
          Submit a Dispute to the Elder Council
        </h2>

        {submitted ? (
          <div className="p-6 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 rounded-2xl text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-xl">
              ✓
            </div>
            <h3 className="font-bold text-base text-emerald-900 dark:text-emerald-200">
              Dispute Case Logged with Peshawar Jirga Council
            </h3>
            <p className="text-xs text-emerald-800 dark:text-emerald-300 max-w-md mx-auto">
              Case Ref: <strong className="font-mono">JRG-8812</strong>. Both parties will be contacted by the Union Council elder within 12 hours. Escrow funds are secured.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#6b5f4f] block mb-1">
                Booking ID / Job Reference
              </label>
              <input
                type="text"
                placeholder="e.g. bk-001248"
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#efe4cf] dark:bg-[#11201d] border border-[#e4d5b8] text-xs font-semibold"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#6b5f4f] block mb-1">
                Reason for Disagreement
              </label>
              <textarea
                rows={4}
                placeholder="Explain the incomplete work, unexpected cost, or material defect..."
                value={complaintText}
                onChange={(e) => setComplaintText(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#efe4cf] dark:bg-[#11201d] border border-[#e4d5b8] text-xs font-medium"
                required
              />
            </div>

            <Button type="submit" variant="primary" className="!py-2.5 !px-6 text-xs font-bold">
              Submit Case for Elder Mediation
            </Button>
          </form>
        )}
      </Card>
    </main>
  );
}
