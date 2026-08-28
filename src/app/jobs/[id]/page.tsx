"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { JOBS, WORKERS } from "@/lib/mock-data";
import type { Job, JobOffer } from "@/types";
import { formatPKR, stars } from "@/lib/utils";
import { Card, Badge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Clock,
  Mic,
  Globe2,
  Lock,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Send,
  Volume2,
  UserCheck,
  Languages,
} from "lucide-react";

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();

  const [job, setJob] = useState<Job | undefined>(() => JOBS.find((j) => j.id === resolvedParams.id));
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);

  // Proposal Submission State (Worker mode)
  const [quoteAmount, setQuoteAmount] = useState(job ? String(job.budget) : "2500");
  const [estTime, setEstTime] = useState("2 hours");
  const [proposalMsg, setProposalMsg] = useState("");
  const [submittingQuote, setSubmittingQuote] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);

  // Escrow Acceptance Modal State (Customer mode)
  const [selectedOffer, setSelectedOffer] = useState<JobOffer | null>(null);
  const [acceptingEscrow, setAcceptingEscrow] = useState(false);
  const [escrowDeposited, setEscrowDeposited] = useState<string | null>(null);

  if (!job) {
    return notFound();
  }

  const handleTranslate = async (targetLang: "English" | "Urdu" | "Pashto") => {
    setIsTranslating(true);
    try {
      const res = await fetch("/api/ai/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: job.description,
          targetLanguage: targetLang,
        }),
      });
      const data = await res.json();
      if (data.translation) {
        setTranslatedText(data.translation);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingQuote(true);

    setTimeout(() => {
      const newOffer: JobOffer = {
        id: `off-${Date.now()}`,
        workerId: "w1",
        workerName: "Rahim Gul",
        workerAvatar: "/avatars/rahim.jpg",
        workerRating: 4.95,
        workerTrustScore: 96,
        workerVouchesCount: 4,
        bidAmount: Number(quoteAmount),
        estimatedTime: estTime,
        message: proposalMsg || "I have genuine tools and 15+ years experience. Ready to start immediately.",
        createdAt: "Just now",
      };

      const updatedJob = {
        ...job,
        offersCount: job.offersCount + 1,
        offers: [newOffer, ...(job.offers || [])],
      };

      setJob(updatedJob);
      setSubmittingQuote(false);
      setQuoteSuccess(true);
    }, 600);
  };

  const handleAcceptOffer = async (offer: JobOffer) => {
    setAcceptingEscrow(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workerId: offer.workerId,
          customerName: job.customerName,
          serviceTitle: job.title,
          amount: offer.bidAmount || offer.price || 2500,
          city: job.customerCity,
          address: job.customerArea,
          scheduledDate: "Today",
          paymentMethod: "JazzCash",
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setEscrowDeposited(data.booking.id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAcceptingEscrow(false);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Back Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/jobs"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6b5f4f] dark:text-[#afa491] hover:text-[#0f4c4c] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Jobs</span>
        </Link>
        <span className="text-xs text-[#6b5f4f] dark:text-[#afa491]">
          Job ID: <span className="font-mono">{job.id}</span>
        </span>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Job Details, Audio Note & Translation (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="p-6 sm:p-8 space-y-6 border-2 border-[#e4d5b8] dark:border-[#2c433d]">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Badge tone="teal">{job.category}</Badge>
                <Badge
                  tone={
                    job.urgency === "Emergency"
                      ? "maroon"
                      : job.urgency === "Standard"
                      ? "brass"
                      : "teal"
                  }
                >
                  {job.urgency} Urgency
                </Badge>
              </div>

              <h1 className="font-display text-2xl sm:text-3xl text-[#201a14] dark:text-[#f1ead9]">
                {job.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#6b5f4f] dark:text-[#afa491] pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#c97f1e]" />
                  <span>{job.customerArea}, {job.customerCity}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Posted {job.createdAt}</span>
                </span>
                <span className="flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-[#0f4c4c]" />
                  <span>By {job.customerName}</span>
                </span>
              </div>
            </div>

            {/* Diaspora indicator */}
            {job.isDiaspora && (
              <div className="p-3 bg-[#0f4c4c]/10 dark:bg-[#2c8b84]/15 rounded-xl border border-[#0f4c4c]/20 flex items-center gap-2 text-xs text-[#0f4c4c] dark:text-[#2c8b84] font-semibold">
                <Globe2 className="w-4 h-4 text-[#c97f1e] shrink-0" />
                <span>
                  Diaspora Sponsored Request: Remote funding from <strong>{job.diasporaCountry}</strong> for local family.
                </span>
              </div>
            )}

            {/* Audio Note player if present */}
            {job.voiceNoteUrl && (
              <div className="p-4 rounded-2xl bg-[#efe4cf]/60 dark:bg-[#11201d]/60 border border-[#c9a227]/40 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#0f4c4c] dark:text-[#2c8b84] flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4" />
                    <span>Customer Voice Note (Urdu/Pashto)</span>
                  </span>
                  <span className="text-[11px] font-mono text-[#6b5f4f]">0:22</span>
                </div>
                <div className="flex items-center gap-3 bg-[#fffbf3] dark:bg-[#172a26] p-2.5 rounded-xl border border-[#e4d5b8] dark:border-[#2c433d]">
                  <button
                    type="button"
                    className="w-8 h-8 rounded-full bg-[#0f4c4c] text-white flex items-center justify-center text-xs shadow"
                  >
                    ▶
                  </button>
                  <div className="flex-1 flex items-center gap-1 h-4">
                    {[6, 12, 8, 16, 14, 10, 18, 12, 16, 8, 14, 10, 16, 8].map((h, i) => (
                      <span
                        key={i}
                        className="w-1 bg-[#0f4c4c] dark:bg-[#2c8b84] rounded-full"
                        style={{ height: `${h}px` }}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-[#6b5f4f]">1x</span>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#6b5f4f] dark:text-[#afa491]">
                Job Scope & Problem Description
              </h3>
              <p className="text-xs sm:text-sm text-[#201a14] dark:text-[#f1ead9] leading-relaxed whitespace-pre-line bg-[#fffbf3] dark:bg-[#1c2e2a] p-4 rounded-xl border border-[#e4d5b8] dark:border-[#2c433d]">
                {job.description}
              </p>
            </div>

            {/* AI Translation Toolbar */}
            <div className="pt-2 border-t border-[#e4d5b8] dark:border-[#2c433d] flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold text-[#6b5f4f] dark:text-[#afa491] flex items-center gap-1">
                <Languages className="w-3.5 h-3.5 text-[#0f4c4c]" />
                <span>AI Translate Scope:</span>
              </span>
              <div className="flex gap-1.5">
                {(["English", "Urdu", "Pashto"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleTranslate(lang)}
                    disabled={isTranslating}
                    className="px-2.5 py-1 rounded-lg bg-[#efe4cf] dark:bg-[#11201d] text-[11px] font-bold hover:bg-[#e4d5b8] transition"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {translatedText && (
              <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 rounded-xl text-xs text-[#201a14] dark:text-[#f1ead9] space-y-1">
                <span className="font-bold text-[#c97f1e] block">✨ AI Translation:</span>
                <p className="leading-relaxed">{translatedText}</p>
              </div>
            )}
          </Card>

          {/* Proposals & Quotes Received from Ustads */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl text-[#201a14] dark:text-[#f1ead9] flex items-center gap-2">
                <span>Vouched Ustad Proposals</span>
                <Badge tone="brass">{job.offers?.length || 0} Quotes</Badge>
              </h3>
              <span className="text-xs text-[#6b5f4f]">Escrow protected</span>
            </div>

            {job.offers && job.offers.length > 0 ? (
              <div className="space-y-3">
                {job.offers.map((offer) => (
                  <Card
                    key={offer.id}
                    className="p-5 space-y-3 border-2 border-[#e4d5b8] dark:border-[#2c433d] hover:border-[#0f4c4c] transition"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#0f4c4c] text-[#e8a23d] flex items-center justify-center font-bold text-sm shadow">
                          {offer.workerName[0]}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-[#201a14] dark:text-[#f1ead9]">
                              {offer.workerName}
                            </h4>
                            <Badge tone="brass" className="!text-[10px]">
                              ★ {offer.workerTrustScore} Trust
                            </Badge>
                          </div>
                          <p className="text-[11px] text-[#6b5f4f] dark:text-[#afa491]">
                            {stars(offer.workerRating)} ({offer.workerRating}) · {offer.workerVouchesCount || 3} Elder Vouches
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-lg font-bold text-[#0f4c4c] dark:text-[#2c8b84]">
                          {formatPKR(offer.bidAmount || offer.price || 0)}
                        </span>
                        <span className="text-[10px] text-[#6b5f4f] block">Est: {offer.estimatedTime}</span>
                      </div>
                    </div>

                    <p className="text-xs text-[#201a14] dark:text-[#f1ead9] leading-relaxed bg-[#efe4cf]/40 dark:bg-[#11201d]/40 p-3 rounded-xl">
                      &ldquo;{offer.message}&rdquo;
                    </p>

                    <div className="pt-2 flex items-center justify-between border-t border-[#e4d5b8] dark:border-[#2c433d]">
                      <span className="text-[11px] text-[#6b5f4f]">Submitted {offer.createdAt}</span>
                      <Button
                        variant="primary"
                        onClick={() => handleAcceptOffer(offer)}
                        disabled={acceptingEscrow}
                        className="!py-1.5 !px-4 !text-xs font-bold flex items-center gap-1.5 shadow"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Accept & Lock Escrow</span>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center bg-[#fffbf3] dark:bg-[#1c2e2a] space-y-2">
                <p className="text-xs text-[#6b5f4f] dark:text-[#afa491]">
                  No proposals submitted yet. Nearby vouched workers are being notified via SMS and App.
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Right Column: Worker Proposal Submission Form & Escrow Info (5 cols) */}
        <div className="lg:col-span-5 space-y-5 sticky top-24">
          {/* Worker Quote Form Card */}
          <Card className="p-6 space-y-4 border-2 border-[#0f4c4c] dark:border-[#2c8b84] bg-[#fffbf3] dark:bg-[#1c2e2a] shadow-xl">
            <div>
              <span className="text-xs font-bold text-[#0f4c4c] dark:text-[#2c8b84] uppercase tracking-wider block">
                Tradesman Action Box
              </span>
              <h3 className="font-display text-xl text-[#201a14] dark:text-[#f1ead9] mt-0.5">
                Send a Proposal to Customer
              </h3>
              <p className="text-xs text-[#6b5f4f] dark:text-[#afa491]">
                Customer Budget: <strong className="font-mono text-[#0f4c4c]">{formatPKR(job.budget)}</strong>
              </p>
            </div>

            {quoteSuccess ? (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 rounded-2xl text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-lg">
                  ✓
                </div>
                <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-200">
                  Quote Sent Successfully!
                </h4>
                <p className="text-xs text-emerald-800 dark:text-emerald-300">
                  The customer has been notified with your quote and Elder Vouch reputation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendQuote} className="space-y-3.5">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#6b5f4f] dark:text-[#afa491] block mb-1">
                    Your Labor Quote (PKR)
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-[#0f4c4c]">Rs</span>
                    <input
                      type="number"
                      value={quoteAmount}
                      onChange={(e) => setQuoteAmount(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#efe4cf] dark:bg-[#11201d] border border-[#e4d5b8] dark:border-[#2c433d] font-mono text-sm font-bold focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#6b5f4f] dark:text-[#afa491] block mb-1">
                    Estimated Time to Complete
                  </label>
                  <select
                    value={estTime}
                    onChange={(e) => setEstTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#efe4cf] dark:bg-[#11201d] border border-[#e4d5b8] dark:border-[#2c433d] text-xs font-semibold"
                  >
                    <option>1 hour</option>
                    <option>2 hours</option>
                    <option>Half Day (4 hours)</option>
                    <option>Full Day (8 hours)</option>
                    <option>2-3 Days</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#6b5f4f] dark:text-[#afa491] block mb-1">
                    Message / Explanation of Approach
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. I have experience with this specific breaker model and can inspect in 40 minutes..."
                    value={proposalMsg}
                    onChange={(e) => setProposalMsg(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#efe4cf] dark:bg-[#11201d] border border-[#e4d5b8] dark:border-[#2c433d] text-xs focus:outline-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={submittingQuote}
                  className="w-full !py-2.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow"
                >
                  <Send className="w-4 h-4" />
                  <span>{submittingQuote ? "Sending Quote..." : "Submit Quote with Vouch Credentials"}</span>
                </Button>
              </form>
            )}
          </Card>

          {/* Escrow Guarantee Details */}
          <div className="p-4 rounded-2xl bg-[#efe4cf]/50 dark:bg-[#11201d]/50 border border-[#e4d5b8] dark:border-[#2c433d] text-xs text-[#6b5f4f] dark:text-[#afa491] space-y-2">
            <h4 className="font-bold text-[#201a14] dark:text-[#f1ead9] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0f4c4c]" />
              <span>Hujra Escrow Safeguards</span>
            </h4>
            <p className="text-[11px] leading-relaxed">
              When the customer accepts an offer, the funds are deposited into an escrow vault. The worker is paid immediately once the job is approved.
            </p>
          </div>
        </div>
      </div>

      {/* Escrow Deposited Success Modal */}
      {escrowDeposited && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#fffbf3] dark:bg-[#1c2e2a] border-2 border-[#0f4c4c] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto text-3xl">
              ✓
            </div>
            <h3 className="font-display text-2xl text-[#201a14] dark:text-[#f1ead9]">
              Offer Accepted & Escrow Locked!
            </h3>
            <p className="text-xs sm:text-sm text-[#6b5f4f] dark:text-[#afa491]">
              Booking ID: <strong className="font-mono text-[#0f4c4c]">{escrowDeposited}</strong>. The craftsman has been dispatched and payment is securely held.
            </p>
            <div className="pt-3 flex gap-2">
              <Link href={`/bookings/${escrowDeposited}`} className="flex-1">
                <Button variant="primary" className="w-full !py-2.5 text-xs font-bold">
                  Go to Live Job Tracker →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
