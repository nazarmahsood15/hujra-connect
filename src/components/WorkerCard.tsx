"use client";

import Image from "next/image";
import Link from "next/link";
import type { Worker } from "@/types";
import { avatarUrl, stars, formatPKR } from "@/lib/utils";
import { Card, Badge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { VouchChain } from "@/components/VouchChain";
import { ShieldCheck, MapPin, Zap, MessageSquare, Clock, CheckCircle2 } from "lucide-react";

export function WorkerCard({ worker }: { worker: Worker }) {
  return (
    <Card className="flex flex-col justify-between gap-4 group hover:shadow-lg transition-all border border-[#e4d5b8] dark:border-[#2c433d] hover:border-[#c9a227]">
      <div className="space-y-3">
        {/* Header with avatar, trust score & emergency badge */}
        <div className="flex gap-3.5 items-start">
          <div className="relative shrink-0">
            <Image
              src={worker.avatar || avatarUrl(worker.name)}
              alt={worker.name}
              width={60}
              height={60}
              className="rounded-2xl object-cover ring-2 ring-[#e8a23d]/40 shadow-sm"
            />
            {worker.cnicVerified && (
              <span
                className="absolute -bottom-1 -right-1 bg-[#0f4c4c] text-[#e8a23d] rounded-full p-0.5 shadow-sm border border-white"
                title="CNIC & Biometric Verified"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-bold text-base text-[#201a14] dark:text-[#f1ead9] truncate">
                {worker.name}
              </h3>
              {worker.emergencyService && (
                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 px-1.5 py-0.5 rounded-full">
                  <Zap className="w-2.5 h-2.5 fill-current" /> 24/7
                </span>
              )}
            </div>

            <p className="text-xs font-semibold text-[#0f4c4c] dark:text-[#2c8b84] mt-0.5">
              {worker.category}
            </p>

            <p className="text-[11px] text-[#6b5f4f] dark:text-[#afa491] flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 shrink-0" />
              <span className="truncate">{worker.area}, {worker.city}</span>
            </p>
          </div>

          <div className="text-right shrink-0">
            <Badge tone="brass" className="!px-2 !py-0.5 text-[11px] font-mono font-bold shadow-xs">
              ★ {worker.trustScore}
            </Badge>
            <p className="text-[10px] text-[#6b5f4f] dark:text-[#afa491] mt-1">Trust Score</p>
          </div>
        </div>

        {/* Short bio preview */}
        <p className="text-xs text-[#201a14]/90 dark:text-[#f1ead9]/90 line-clamp-2 leading-relaxed">
          {worker.bio}
        </p>

        {/* Mini Vouch Chain Visual */}
        <div className="bg-[#efe4cf]/50 dark:bg-[#11201d]/50 p-2.5 rounded-xl border border-[#e4d5b8]/70 dark:border-[#2c433d]/70">
          <div className="flex items-center justify-between text-[10px] text-[#6b5f4f] dark:text-[#afa491] font-bold uppercase tracking-wider mb-1">
            <span>Community Vouch Chain</span>
            <span className="text-[#0f4c4c] dark:text-[#2c8b84]">{worker.vouches.length} Vouchers</span>
          </div>
          <VouchChain vouches={worker.vouches} workerName={worker.name} interactive={false} />
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-between text-xs pt-1 border-t border-[#e4d5b8]/50 dark:border-[#2c433d]/50 text-[#6b5f4f] dark:text-[#afa491]">
          <span className="font-semibold text-[#c97f1e] flex items-center gap-1">
            {stars(worker.rating)} <span className="text-[#201a14] dark:text-[#f1ead9]">{worker.rating}</span> ({worker.jobsCompleted} jobs)
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#0f4c4c]" />
            <span>~{worker.responseTimeMin}m response</span>
          </span>
        </div>
      </div>

      {/* Pricing & Actions */}
      <div className="pt-2 border-t border-[#e4d5b8] dark:border-[#2c433d] space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] text-[#6b5f4f] dark:text-[#afa491] block">Standard Rate</span>
            <span className="font-mono font-bold text-sm text-[#0f4c4c] dark:text-[#2c8b84]">
              {formatPKR(worker.hourlyRate)}/hr
            </span>
          </div>
          {worker.fixedPriceLabel && (
            <span className="text-[10px] font-semibold text-[#c97f1e] bg-[#e8a23d]/15 px-2 py-1 rounded-md text-right max-w-[160px] truncate">
              {worker.fixedPriceLabel}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <Link href={`/workers/${worker.id}`} className="flex-1">
            <Button variant="ghost" className="w-full !py-2 !text-xs font-bold">
              View Profile & Vouches
            </Button>
          </Link>
          <Link href={`/workers/${worker.id}?book=true`} className="flex-1">
            <Button variant="primary" className="w-full !py-2 !text-xs font-bold">
              Book Worker
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
