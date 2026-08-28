"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { WORKERS } from "@/lib/mock-data";
import { avatarUrl, stars, formatPKR } from "@/lib/utils";
import { VouchChain } from "@/components/VouchChain";
import { Card, Badge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  ShieldCheck,
  Award,
  Clock,
  MapPin,
  PhoneCall,
  MessageSquare,
  Sparkles,
  Calendar,
  Lock,
  CheckCircle2,
  AlertCircle,
  Play,
  Volume2,
  Zap,
  ArrowLeft,
  X,
} from "lucide-react";

export default function WorkerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const shouldOpenBook = searchParams.get("book") === "true";

  const worker = WORKERS.find((w) => w.id === resolvedParams.id);

  // Booking Modal State
  const [bookModalOpen, setBookModalOpen] = useState(shouldOpenBook);
  const [bookingType, setBookingType] = useState<"scheduled" | "instant" | "emergency">("scheduled");
  const [serviceType, setServiceType] = useState("standard");
  const [selectedDate, setSelectedDate] = useState("Today, 3:00 PM");
  const [customerAddress, setCustomerAddress] = useState(worker?.area || "");
  const [customerPhone, setCustomerPhone] = useState("0300-5912345");
  const [paymentMethod, setPaymentMethod] = useState<"JazzCash" | "Easypaisa" | "Bank Transfer" | "Stripe Card">("JazzCash");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  // Audio Review simulation
  const [playingReviewId, setPlayingReviewId] = useState<string | null>(null);

  if (!worker) {
    return notFound();
  }

  const calculateTotal = () => {
    if (serviceType === "fixed") {
      return 2500;
    }
    const base = worker.hourlyRate * 3;
    return bookingType === "emergency" ? base + 800 : base;
  };

  const handleCreateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workerId: worker.id,
          customerName: "Ayesha Bibi",
          customerPhone,
          serviceTitle: `${worker.category} (${serviceType === "fixed" ? "Fixed Package" : "Standard 3hr Service"})`,
          type: bookingType,
          amount: calculateTotal(),
          city: worker.city,
          address: customerAddress,
          scheduledDate: selectedDate,
          paymentMethod,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setBookingSuccess(data.booking.id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Back Link */}
      <div className="flex items-center justify-between">
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6b5f4f] dark:text-[#afa491] hover:text-[#0f4c4c] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </Link>
        <span className="text-xs text-[#6b5f4f] dark:text-[#afa491]">
          Worker ID: <span className="font-mono">{worker.id}</span>
        </span>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Comprehensive Profile & Verification (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Hero Card */}
          <Card className="p-6 sm:p-8 space-y-6 border-2 border-[#e4d5b8] dark:border-[#2c433d]">
            <div className="flex flex-col sm:flex-row gap-5 items-start">
              <div className="relative shrink-0">
                <Image
                  src={worker.avatar || avatarUrl(worker.name)}
                  alt={worker.name}
                  width={96}
                  height={96}
                  className="rounded-3xl object-cover ring-4 ring-[#e8a23d]/50 shadow-md"
                />
                {worker.cnicVerified && (
                  <span className="absolute -bottom-1 -right-1 bg-[#0f4c4c] text-[#e8a23d] rounded-full p-1 shadow border-2 border-white">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                )}
              </div>

              <div className="flex-1 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-2xl sm:text-3xl text-[#201a14] dark:text-[#f1ead9]">
                    {worker.name}
                  </h1>
                  <Badge tone="brass" className="gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Elder Verified Ustad</span>
                  </Badge>
                  {worker.emergencyService && (
                    <Badge tone="maroon" className="gap-1">
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      <span>24/7 Emergency</span>
                    </Badge>
                  )}
                </div>

                <p className="text-sm font-bold text-[#0f4c4c] dark:text-[#2c8b84]">
                  {worker.category} · Specialised Tradesman
                </p>

                <p className="text-xs text-[#6b5f4f] dark:text-[#afa491] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#c97f1e]" />
                  <span>{worker.area}, {worker.city} ({worker.district} District)</span>
                </p>

                {/* Rating & Response meta */}
                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-[#6b5f4f] dark:text-[#afa491]">
                  <span className="text-[#c97f1e] font-bold flex items-center gap-1">
                    {stars(worker.rating)} <span className="text-[#201a14] dark:text-[#f1ead9]">{worker.rating}</span> ({worker.jobsCompleted} jobs completed)
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#0f4c4c]" />
                    <span>{worker.responseTimeMin} min avg response</span>
                  </span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                    ✓ {worker.responseRate}% response rate
                  </span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="border-t border-[#e4d5b8] dark:border-[#2c433d] pt-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#6b5f4f] dark:text-[#afa491] mb-1.5">
                About the Craftsman
              </h3>
              <p className="text-xs sm:text-sm text-[#201a14] dark:text-[#f1ead9] leading-relaxed">
                {worker.bio}
              </p>
            </div>

            {/* Languages & Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#e4d5b8] dark:border-[#2c433d]">
              <span className="text-xs font-bold text-[#6b5f4f] dark:text-[#afa491] mr-1">Languages:</span>
              {worker.languages.map((l) => (
                <span
                  key={l}
                  className="px-2.5 py-1 rounded-lg bg-[#efe4cf] dark:bg-[#11201d] text-xs font-semibold text-[#201a14] dark:text-[#f1ead9]"
                >
                  🗣️ {l}
                </span>
              ))}
            </div>
          </Card>

          {/* Interactive Vouch Chain Inspector Card */}
          <Card className="p-6 sm:p-8 space-y-4 bg-[#fffbf3] dark:bg-[#1c2e2a]">
            <div className="flex items-center justify-between border-b border-[#e4d5b8] dark:border-[#2c433d] pb-3">
              <div>
                <h3 className="font-display text-xl text-[#201a14] dark:text-[#f1ead9] flex items-center gap-2">
                  <span>Community Vouch Chain</span>
                  <Badge tone="brass">{worker.vouches.length} Verified Vouchers</Badge>
                </h3>
                <p className="text-xs text-[#6b5f4f] dark:text-[#afa491] mt-0.5">
                  Click any elder or imam below to view their guarantee statement and union standing.
                </p>
              </div>
              <span className="font-mono text-xl font-bold text-[#0f4c4c] dark:text-[#2c8b84]">
                {worker.trustScore}/100
              </span>
            </div>

            <VouchChain vouches={worker.vouches} workerName={worker.name} interactive={true} />

            {/* Detailed vouch cards grid */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {worker.vouches.map((v) => (
                <div
                  key={v.id}
                  className="p-3.5 rounded-xl bg-[#efe4cf]/50 dark:bg-[#11201d]/50 border border-[#e4d5b8] dark:border-[#2c433d] space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#201a14] dark:text-[#f1ead9]">{v.name}</span>
                    <Badge tone="brass" className="!text-[10px]">{v.role}</Badge>
                  </div>
                  <p className="text-[11px] text-[#6b5f4f] dark:text-[#afa491] font-medium">{v.voucherTitle}</p>
                  <p className="text-[11px] text-[#201a14] dark:text-[#f1ead9] pt-1">
                    <span className="font-bold">Endorsement: </span>{v.relationship}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Portfolio & Before / After Photos */}
          {worker.portfolio && worker.portfolio.length > 0 && (
            <Card className="p-6 sm:p-8 space-y-4">
              <h3 className="font-display text-xl text-[#201a14] dark:text-[#f1ead9]">
                Work Portfolio & Recent Projects
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {worker.portfolio.map((p) => (
                  <div
                    key={p.id}
                    className="rounded-2xl border border-[#e4d5b8] dark:border-[#2c433d] overflow-hidden bg-[#fffbf3] dark:bg-[#11201d]"
                  >
                    <div className="relative h-44 bg-gray-100">
                      <Image
                        src={p.afterPhoto}
                        alt={p.title}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-2 right-2 bg-[#0f4c4c] text-[#e8a23d] text-[10px] font-bold px-2 py-0.5 rounded-md shadow">
                        Completed Job
                      </span>
                    </div>
                    <div className="p-4 space-y-1">
                      <h4 className="font-bold text-xs sm:text-sm text-[#201a14] dark:text-[#f1ead9]">{p.title}</h4>
                      <p className="text-xs text-[#6b5f4f] dark:text-[#afa491]">{p.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Customer Reviews & Voice Feedback */}
          <Card className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-[#e4d5b8] dark:border-[#2c433d] pb-3">
              <h3 className="font-display text-xl text-[#201a14] dark:text-[#f1ead9]">
                Customer Reviews & Voice Testimonials
              </h3>
              <span className="text-xs font-bold text-[#c97f1e]">
                {stars(worker.rating)} {worker.rating} / 5.0
              </span>
            </div>

            <div className="space-y-3">
              {worker.reviews && worker.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-xl bg-[#efe4cf]/40 dark:bg-[#11201d]/40 border border-[#e4d5b8] dark:border-[#2c433d] space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-sm text-[#201a14] dark:text-[#f1ead9]">{rev.customerName}</span>
                      <span className="text-xs text-[#6b5f4f] dark:text-[#afa491] ml-2">({rev.customerCity})</span>
                    </div>
                    <span className="text-[#c97f1e] font-bold">{stars(rev.rating)}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#201a14] dark:text-[#f1ead9] leading-relaxed">
                    &ldquo;{rev.comment}&rdquo;
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-[#6b5f4f] dark:text-[#afa491] pt-1">
                    <span>Job: <strong className="text-[#0f4c4c] dark:text-[#2c8b84]">{rev.jobType}</strong></span>
                    <span>{rev.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Pricing, Fast Booking & Escrow Vault Card (4 cols) */}
        <div className="lg:col-span-4 space-y-5 sticky top-24">
          <Card className="p-6 space-y-5 border-2 border-[#0f4c4c] dark:border-[#2c8b84] shadow-xl bg-[#fffbf3] dark:bg-[#1c2e2a]">
            <div>
              <span className="text-xs uppercase font-bold text-[#6b5f4f] dark:text-[#afa491] tracking-wider block">
                Standard Pricing
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-mono text-3xl font-bold text-[#0f4c4c] dark:text-[#2c8b84]">
                  {formatPKR(worker.hourlyRate)}
                </span>
                <span className="text-xs text-[#6b5f4f] dark:text-[#afa491]">/ hour labor</span>
              </div>
              {worker.fixedPriceLabel && (
                <div className="p-2.5 rounded-xl bg-[#efe4cf] dark:bg-[#11201d] text-xs font-semibold text-[#c97f1e] mt-2">
                  🏷️ {worker.fixedPriceLabel}
                </div>
              )}
            </div>

            {/* Escrow Guarantee Highlight */}
            <div className="p-3 bg-[#0f4c4c]/10 dark:bg-[#2c8b84]/15 rounded-xl border border-[#0f4c4c]/20 space-y-1 text-xs">
              <div className="flex items-center gap-1.5 text-[#0f4c4c] dark:text-[#2c8b84] font-bold">
                <Lock className="w-4 h-4" />
                <span>Connecta Escrow Guarantee</span>
              </div>
              <p className="text-[11px] text-[#6b5f4f] dark:text-[#afa491] leading-relaxed">
                Your payment is locked safely. Worker is only paid after you inspect their work and confirm satisfaction.
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-2">
              <Button
                variant="primary"
                onClick={() => setBookModalOpen(true)}
                className="w-full !py-3 text-sm font-bold flex items-center justify-center gap-2 shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Book {worker.name.split(" ")[0]} Now</span>
              </Button>

              <Link href={`/messages?to=${worker.id}`} className="block">
                <Button variant="outline" className="w-full !py-2.5 text-xs font-bold flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#c97f1e]" />
                  <span>Send Direct Message / Voice Note</span>
                </Button>
              </Link>
            </div>

            {/* Emergency Hotline callout */}
            {worker.emergencyService && (
              <div className="pt-2 border-t border-[#e4d5b8] dark:border-[#2c433d] text-center">
                <p className="text-[11px] text-amber-800 dark:text-amber-300 font-bold flex items-center justify-center gap-1">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  Available for urgent dispatch within 30 minutes
                </p>
              </div>
            )}
          </Card>

          {/* Quick Safety Info */}
          <div className="p-4 rounded-2xl bg-[#efe4cf]/50 dark:bg-[#11201d]/50 border border-[#e4d5b8] dark:border-[#2c433d] text-xs text-[#6b5f4f] dark:text-[#afa491] space-y-2">
            <h4 className="font-bold text-[#201a14] dark:text-[#f1ead9] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0f4c4c]" />
              <span>Identity Verification Checks</span>
            </h4>
            <p className="text-[11px]">
              • Biometric CNIC matched against NADRA database <br />
              • Mosque Imam and Union Council Council Endorsement <br />
              • 0 pending disputes or complaint flags
            </p>
          </div>
        </div>
      </div>

      {/* BOOKING MODAL DIALOG */}
      {bookModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#fffbf3] dark:bg-[#1c2e2a] border-2 border-[#0f4c4c] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setBookModalOpen(false);
                setBookingSuccess(null);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-xl hover:bg-[#efe4cf] dark:hover:bg-[#11201d] text-[#6b5f4f]"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto text-3xl">
                  ✓
                </div>
                <h3 className="font-display text-2xl text-[#201a14] dark:text-[#f1ead9]">
                  Booking Confirmed & Escrow Held!
                </h3>
                <p className="text-xs sm:text-sm text-[#6b5f4f] dark:text-[#afa491]">
                  Booking Reference: <strong className="font-mono text-[#0f4c4c]">{bookingSuccess}</strong>
                  <br />
                  {formatPKR(calculateTotal())} is locked in Escrow. {worker.name} has received the request.
                </p>
                <div className="pt-4 flex gap-3">
                  <Link href={`/bookings/${bookingSuccess}`} className="flex-1">
                    <Button variant="primary" className="w-full !py-2.5 text-xs font-bold">
                      View Live Booking Tracker
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setBookModalOpen(false);
                      setBookingSuccess(null);
                    }}
                    className="!py-2.5 text-xs font-bold"
                  >
                    Close
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCreateBooking} className="space-y-4">
                <div>
                  <h3 className="font-display text-2xl text-[#201a14] dark:text-[#f1ead9]">
                    Book {worker.name}
                  </h3>
                  <p className="text-xs text-[#6b5f4f] dark:text-[#afa491]">
                    {worker.category} · {worker.area}, {worker.city}
                  </p>
                </div>

                {/* Booking Type Selector */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#6b5f4f] dark:text-[#afa491] block mb-1.5">
                    Select Urgency
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "scheduled", label: "Scheduled", icon: "📅" },
                      { id: "instant", label: "Today", icon: "⚡" },
                      { id: "emergency", label: "24/7 Urgent", icon: "🚨" },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setBookingType(t.id as any)}
                        className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition ${
                          bookingType === t.id
                            ? "bg-[#0f4c4c] text-white border-[#0f4c4c]"
                            : "bg-[#efe4cf]/60 dark:bg-[#11201d]/60 border-[#e4d5b8] dark:border-[#2c433d]"
                        }`}
                      >
                        <span>{t.icon}</span>
                        <span>{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Service Package */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#6b5f4f] dark:text-[#afa491] block mb-1.5">
                    Service Package
                  </label>
                  <div className="space-y-2 text-xs">
                    <label className="flex items-center justify-between p-3 rounded-xl border border-[#e4d5b8] dark:border-[#2c433d] bg-[#efe4cf]/40 dark:bg-[#11201d]/40 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="serviceType"
                          checked={serviceType === "standard"}
                          onChange={() => setServiceType("standard")}
                        />
                        <div>
                          <span className="font-bold block">Standard Hourly (approx 3 hours)</span>
                          <span className="text-[11px] text-[#6b5f4f] dark:text-[#afa491]">Diagnostic + repair work</span>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-[#0f4c4c] dark:text-[#2c8b84]">
                        {formatPKR(worker.hourlyRate * 3)}
                      </span>
                    </label>

                    {worker.fixedPriceLabel && (
                      <label className="flex items-center justify-between p-3 rounded-xl border border-[#e4d5b8] dark:border-[#2c433d] bg-[#efe4cf]/40 dark:bg-[#11201d]/40 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="serviceType"
                            checked={serviceType === "fixed"}
                            onChange={() => setServiceType("fixed")}
                          />
                          <div>
                            <span className="font-bold block">{worker.fixedPriceLabel}</span>
                            <span className="text-[11px] text-[#6b5f4f] dark:text-[#afa491]">Fixed complete package</span>
                          </div>
                        </div>
                        <span className="font-mono font-bold text-[#c97f1e]">Rs 2,500</span>
                      </label>
                    )}
                  </div>
                </div>

                {/* Scheduled Time */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#6b5f4f] dark:text-[#afa491] block mb-1">
                    Scheduled Time / Slot
                  </label>
                  <input
                    type="text"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#efe4cf] dark:bg-[#11201d] border border-[#e4d5b8] dark:border-[#2c433d] text-xs font-semibold"
                  />
                </div>

                {/* Address & Phone */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-[#6b5f4f] dark:text-[#afa491] block mb-1">
                      Service Address
                    </label>
                    <input
                      type="text"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="Street, House #"
                      className="w-full px-3 py-2 rounded-xl bg-[#efe4cf] dark:bg-[#11201d] border border-[#e4d5b8] dark:border-[#2c433d] text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-[#6b5f4f] dark:text-[#afa491] block mb-1">
                      Contact Phone
                    </label>
                    <input
                      type="text"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="0300-XXXXXXX"
                      className="w-full px-3 py-2 rounded-xl bg-[#efe4cf] dark:bg-[#11201d] border border-[#e4d5b8] dark:border-[#2c433d] text-xs"
                      required
                    />
                  </div>
                </div>

                {/* Escrow Payment Method */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#6b5f4f] dark:text-[#afa491] block mb-1.5">
                    Escrow Deposit Method
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["JazzCash", "Easypaisa", "Bank Transfer", "Stripe Card"] as const).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setPaymentMethod(m)}
                        className={`p-2 rounded-xl border text-xs font-bold text-center transition ${
                          paymentMethod === m
                            ? "bg-[#0f4c4c] text-white border-[#0f4c4c]"
                            : "bg-[#efe4cf]/60 dark:bg-[#11201d]/60 border-[#e4d5b8] dark:border-[#2c433d]"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Escrow Total Calculation */}
                <div className="p-3 bg-[#efe4cf] dark:bg-[#11201d] rounded-xl flex items-center justify-between border border-[#e4d5b8] dark:border-[#2c433d]">
                  <div>
                    <span className="text-xs font-bold block text-[#201a14] dark:text-[#f1ead9]">
                      Total Escrow Deposit:
                    </span>
                    <span className="text-[10px] text-[#6b5f4f] dark:text-[#afa491]">
                      100% refundable if unsatisfied
                    </span>
                  </div>
                  <span className="font-mono text-xl font-bold text-[#0f4c4c] dark:text-[#2c8b84]">
                    {formatPKR(calculateTotal())}
                  </span>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="w-full !py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>{isSubmitting ? "Locking in Escrow..." : "Deposit into Escrow & Confirm Booking"}</span>
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
