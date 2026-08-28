"use client";

import { useState } from "react";
import type { VouchDetail } from "@/types";
import { ShieldCheck, UserCheck, PhoneCall, Calendar, AlertTriangle, X, Award, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const NODE_COLORS: Record<string, { bg: string; text: string; ring: string }> = {
  Elder: { bg: "#A63A2E", text: "#FFF", ring: "#c9a227" },
  Imam: { bg: "#0F4C4C", text: "#FFF", ring: "#17706b" },
  "Senior Worker": { bg: "#17706B", text: "#FFF", ring: "#e8a23d" },
  "Union Council Official": { bg: "#201A14", text: "#FFF", ring: "#c97f1e" },
  "Community Leader": { bg: "#C97F1E", text: "#241703", ring: "#0f4c4c" },
};

function initials(name: string) {
  return name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("");
}

export function VouchChain({
  vouches = [],
  workerName,
  interactive = true,
}: {
  vouches: (VouchDetail | { role: string; name: string })[];
  workerName: string;
  interactive?: boolean;
}) {
  const [selectedVouch, setSelectedVouch] = useState<VouchDetail | null>(null);

  // Normalize vouches to ensure they have all fields
  const normalizedVouches: VouchDetail[] = vouches.map((v, i) => {
    if ("relationship" in v) {
      return v as VouchDetail;
    }
    return {
      id: `v-norm-${i}`,
      role: v.role as any,
      name: v.name,
      voucherTitle: `${v.role} Endorsement`,
      relationship: "Recognized community standing and certified trade peer",
      verifiedSince: "2022",
      trustScore: 95,
      phoneVerified: true,
      notes: "Vouched for punctual arrival and fair trade pricing.",
    };
  });

  return (
    <div className="w-full">
      {/* Chain Horizontal Flow */}
      <div className="flex items-center overflow-x-auto py-2 px-1 scrollbar-none">
        {normalizedVouches.map((v, i) => {
          const styling = NODE_COLORS[v.role] || { bg: "#e8a23d", text: "#241703", ring: "#c9a227" };
          return (
            <div key={v.id || i} className="flex items-center shrink-0">
              <button
                type="button"
                onClick={() => interactive && setSelectedVouch(v)}
                className={`flex flex-col items-center gap-1 group transition focus:outline-none ${
                  interactive ? "cursor-pointer" : "cursor-default"
                }`}
                title={`Click to view vouch by ${v.name}`}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold transition transform group-hover:scale-110 shadow-sm relative"
                  style={{
                    backgroundColor: styling.bg,
                    color: styling.text,
                    boxShadow: `0 0 0 2px ${styling.ring}`,
                  }}
                >
                  {initials(v.name)}
                  {v.phoneVerified && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full flex items-center justify-center text-[8px] text-white border border-white">
                      ✓
                    </span>
                  )}
                </div>
                <div className="text-center w-20">
                  <span className="text-[10px] font-bold block text-[#201a14] dark:text-[#f1ead9] truncate">
                    {v.name.split(" ")[0]}
                  </span>
                  <span className="text-[9px] text-[#6b5f4f] dark:text-[#afa491] block truncate -mt-0.5 font-medium">
                    {v.role}
                  </span>
                </div>
              </button>

              {/* Connecting line */}
              <div className="vouch-line w-6 sm:w-10" />
            </div>
          );
        })}

        {/* Final Node: The Worker */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold bg-[#e8a23d] text-[#241703] shadow-md ring-2 ring-[#0f4c4c]"
            title={`Worker: ${workerName}`}
          >
            {initials(workerName)}
          </div>
          <div className="text-center w-20">
            <span className="text-[10px] font-bold block text-[#0f4c4c] dark:text-[#2c8b84] truncate">
              {workerName.split(" ")[0]}
            </span>
            <span className="text-[9px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold px-1 rounded block truncate">
              Verified
            </span>
          </div>
        </div>
      </div>

      {interactive && (
        <p className="text-[11px] text-[#6b5f4f] dark:text-[#afa491] mt-1 text-center italic">
          💡 Tap any elder or imam icon to inspect their verified identity & relationship statement.
        </p>
      )}

      {/* Voucher Detail Modal Dialog */}
      {selectedVouch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#fffbf3] dark:bg-[#1c2e2a] border border-[#e4d5b8] dark:border-[#2c433d] rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setSelectedVouch(null)}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-[#efe4cf] dark:hover:bg-[#11201d] text-[#6b5f4f]"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0 shadow"
                style={{
                  backgroundColor: NODE_COLORS[selectedVouch.role]?.bg || "#A63A2E",
                }}
              >
                {initials(selectedVouch.name)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg text-[#201a14] dark:text-[#f1ead9]">
                    {selectedVouch.name}
                  </h3>
                  <Badge tone="brass">{selectedVouch.role}</Badge>
                </div>
                <p className="text-xs text-[#6b5f4f] dark:text-[#afa491] font-medium mt-0.5">
                  {selectedVouch.voucherTitle}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#e4d5b8] dark:border-[#2c433d] space-y-2.5 text-xs text-[#201a14] dark:text-[#f1ead9]">
              <div className="flex items-start gap-2 bg-[#efe4cf]/60 dark:bg-[#11201d]/60 p-2.5 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-[#0f4c4c] dark:text-[#2c8b84] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Community Trust Standing:</span>
                  <span className="text-[#6b5f4f] dark:text-[#afa491]">
                    {selectedVouch.trustScore}/100 verified reputation weight.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <UserCheck className="w-4 h-4 text-[#c97f1e] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Relationship: </span>
                  <span className="text-[#6b5f4f] dark:text-[#afa491]">{selectedVouch.relationship}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-[#6b5f4f] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Verified Since: </span>
                  <span className="text-[#6b5f4f] dark:text-[#afa491]">{selectedVouch.verifiedSince}</span>
                </div>
              </div>

              {selectedVouch.notes && (
                <div className="bg-[#fff8e7] dark:bg-[#172a26] border border-[#e8a23d]/30 p-3 rounded-xl mt-2">
                  <span className="font-bold text-[11px] text-[#c97f1e] uppercase tracking-wide block mb-1">
                    Voucher Statement & Guarantee:
                  </span>
                  <p className="italic text-xs text-[#201a14] dark:text-[#f1ead9]">
                    &ldquo;{selectedVouch.notes}&rdquo;
                  </p>
                </div>
              )}
            </div>

            <div className="mt-5 flex gap-2">
              <Button
                variant="primary"
                onClick={() => setSelectedVouch(null)}
                className="w-full !py-2 text-xs"
              >
                Close Verification Card
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
