"use client";

import { useState } from "react";
import Link from "next/link";
import { WORKERS } from "@/lib/mock-data";
import { VouchChain } from "@/components/VouchChain";
import { Card, Badge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  HeartHandshake,
  ShieldCheck,
  Award,
  Users,
  Search,
  Scale,
  CheckCircle2,
  AlertTriangle,
  Building,
  ArrowRight,
} from "lucide-react";

export default function VouchesPage() {
  const [filterQuery, setFilterQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");

  const ELDERS = [
    {
      id: "eld-1",
      name: "Malik Amanullah Khan",
      title: "Chief Elder & Jirga Member, Hayatabad Council",
      role: "Elder",
      city: "Peshawar",
      vouchesGiven: 18,
      trustWeight: 98,
      verifiedSince: "2021",
      bio: "Respected tribal elder overseeing neighbourhood trade disputes and fair artisan endorsements for over 25 years.",
    },
    {
      id: "eld-2",
      name: "Qari Abdul Rehman",
      title: "Khatib & Imam, Jamia Masjid Bilal, Cantt",
      role: "Imam",
      city: "Peshawar",
      vouchesGiven: 14,
      trustWeight: 96,
      verifiedSince: "2022",
      bio: "Imam and community counsellor validating personal honesty, punctual character, and neighbourhood good standing.",
    },
    {
      id: "eld-3",
      name: "Haji Gulzar Ahmed",
      title: "President, KPK Electricians Union & Senior Master",
      role: "Senior Worker",
      city: "Peshawar",
      vouchesGiven: 32,
      trustWeight: 95,
      verifiedSince: "2020",
      bio: "Technical trade auditor assessing safety protocols, wiring load calculations, and apprentice certifications.",
    },
    {
      id: "eld-4",
      name: "Sardar Muhammad Ali",
      title: "Union Council 14 Chairman & Elder",
      role: "Union Council Official",
      city: "Mardan",
      vouchesGiven: 11,
      trustWeight: 94,
      verifiedSince: "2023",
      bio: "Civic official cross-verifying domicile records, permanent residency, and NADRA identity verification.",
    },
  ];

  const filteredElders = ELDERS.filter((e) => {
    const matchQ = e.name.toLowerCase().includes(filterQuery.toLowerCase()) || e.title.toLowerCase().includes(filterQuery.toLowerCase()) || e.city.toLowerCase().includes(filterQuery.toLowerCase());
    const matchRole = selectedRole === "All" || e.role === selectedRole;
    return matchQ && matchRole;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      {/* 1. HEADER & JIRGA TRADITION OVERVIEW */}
      <div className="max-w-3xl space-y-4">
        <Badge tone="brass">Centuries of Cultural Trust</Badge>
        <h1 className="font-display text-4xl sm:text-5xl text-[#201a14] dark:text-[#f1ead9] leading-tight">
          The Hujra Vouch Chain System
        </h1>
        <p className="text-sm sm:text-base text-[#6b5f4f] dark:text-[#afa491] leading-relaxed">
          In our communities, a tradesman isn&apos;t trusted because of an anonymous online star rating — he is trusted because a known elder, imam, or union master puts his own family honour and name behind him.
        </p>
      </div>

      {/* 2. THE THREE PILLARS OF DIGITAL VOUCHING */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 space-y-3 bg-[#fffbf3] dark:bg-[#1c2e2a]">
          <div className="w-12 h-12 rounded-2xl bg-[#a63a2e]/10 text-[#a63a2e] flex items-center justify-center">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="font-display text-xl text-[#201a14] dark:text-[#f1ead9]">
            Shared Reputation Risk
          </h3>
          <p className="text-xs text-[#6b5f4f] dark:text-[#afa491] leading-relaxed">
            When an Elder vouches for a worker, his own community score rises with each five-star job. However, if a worker receives a verified complaint, the voucher’s trust score is audited.
          </p>
        </Card>

        <Card className="p-6 space-y-3 bg-[#fffbf3] dark:bg-[#1c2e2a]">
          <div className="w-12 h-12 rounded-2xl bg-[#0f4c4c]/10 text-[#0f4c4c] dark:text-[#2c8b84] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-display text-xl text-[#201a14] dark:text-[#f1ead9]">
            3-Tier Multi-Signature
          </h3>
          <p className="text-xs text-[#6b5f4f] dark:text-[#afa491] leading-relaxed">
            Every verified tradesman requires at least 1 Senior Trade Master (technical skill), 1 Local Imam/Elder (moral integrity), and 1 Union Council record (civic identity).
          </p>
        </Card>

        <Card className="p-6 space-y-3 bg-[#fffbf3] dark:bg-[#1c2e2a]">
          <div className="w-12 h-12 rounded-2xl bg-[#c97f1e]/15 text-[#c97f1e] flex items-center justify-center">
            <Scale className="w-6 h-6" />
          </div>
          <h3 className="font-display text-xl text-[#201a14] dark:text-[#f1ead9]">
            Jirga Dispute Panel
          </h3>
          <p className="text-xs text-[#6b5f4f] dark:text-[#afa491] leading-relaxed">
            Disagreements over repairs or billing are mediated quickly by recognized local council members, ensuring fair compensation and preventing endless courtroom delays.
          </p>
        </Card>
      </div>

      {/* 3. LIVE VOUCH CHAIN DEMONSTRATION */}
      <section className="bg-[#efe4cf]/60 dark:bg-[#172a26] p-8 rounded-3xl border border-[#e4d5b8] dark:border-[#2c433d] space-y-6">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl text-[#201a14] dark:text-[#f1ead9]">
            Live Vouch Chain in Action: Rahim Gul (Electrician)
          </h2>
          <p className="text-xs text-[#6b5f4f] dark:text-[#afa491]">
            Tap on each node below to see how multiple community pillars form a web of accountability.
          </p>
        </div>

        <div className="p-6 bg-[#fffbf3] dark:bg-[#1c2e2a] rounded-2xl border border-[#e4d5b8] dark:border-[#2c433d]">
          <VouchChain vouches={WORKERS[0].vouches} workerName={WORKERS[0].name} interactive={true} />
        </div>
      </section>

      {/* 4. VERIFIED COMMUNITY ELDERS DIRECTORY */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl text-[#201a14] dark:text-[#f1ead9]">
              Verified Community Vouchers & Imams
            </h2>
            <p className="text-xs text-[#6b5f4f] dark:text-[#afa491]">
              Civic leaders and respected imams authorizing craftsmen in their union councils.
            </p>
          </div>

          {/* Role filter */}
          <div className="flex gap-1.5">
            {["All", "Elder", "Imam", "Senior Worker", "Union Council Official"].map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRole(r)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedRole === r
                    ? "bg-[#0f4c4c] text-white shadow-xs"
                    : "bg-[#fffbf3] dark:bg-[#1c2e2a] border border-[#e4d5b8] dark:border-[#2c433d] text-[#201a14] dark:text-[#f1ead9]"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {filteredElders.map((elder) => (
            <Card key={elder.id} className="p-6 space-y-4 bg-[#fffbf3] dark:bg-[#1c2e2a] border border-[#e4d5b8] dark:border-[#2c433d]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-[#201a14] dark:text-[#f1ead9]">{elder.name}</h3>
                    <Badge tone="brass">{elder.role}</Badge>
                  </div>
                  <p className="text-xs font-medium text-[#0f4c4c] dark:text-[#2c8b84] mt-0.5">{elder.title}</p>
                  <p className="text-[11px] text-[#6b5f4f] dark:text-[#afa491]">{elder.city} · Registered {elder.verifiedSince}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-sm text-[#0f4c4c] dark:text-[#2c8b84]">
                    {elder.trustWeight}/100
                  </span>
                  <span className="text-[10px] text-[#6b5f4f] block">Vouch Weight</span>
                </div>
              </div>

              <p className="text-xs text-[#201a14]/90 dark:text-[#f1ead9]/90 leading-relaxed">
                {elder.bio}
              </p>

              <div className="pt-3 border-t border-[#e4d5b8] dark:border-[#2c433d] flex items-center justify-between text-xs">
                <span className="font-bold text-[#c97f1e]">✓ {elder.vouchesGiven} Active Endorsements</span>
                <Link href={`/marketplace?q=${encodeURIComponent(elder.city)}`}>
                  <Button variant="ghost" className="!py-1.5 !px-3 text-xs font-bold flex items-center gap-1">
                    <span>View Vouched Workers</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
