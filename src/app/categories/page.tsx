"use client";

import Link from "next/link";
import { CATEGORIES } from "@/lib/mock-data";
import { Card, Badge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles, ShieldCheck, DollarSign } from "lucide-react";

export default function CategoriesPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      <div className="max-w-3xl space-y-2">
        <Badge tone="brass">Comprehensive Trade Directory</Badge>
        <h1 className="font-display text-4xl text-[#201a14] dark:text-[#f1ead9]">
          Service Categories & Fair Rate Index
        </h1>
        <p className="text-sm text-[#6b5f4f] dark:text-[#afa491]">
          Explore transparent market rates, typical diagnosis fees, and vouched tradesmen across Khyber Pakhtunkhwa.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat) => (
          <Card
            key={cat.slug}
            className="p-6 flex flex-col justify-between gap-6 border border-[#e4d5b8] dark:border-[#2c433d] hover:border-[#0f4c4c] transition group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-4xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                <Badge tone="teal">{cat.workerCount} Vouched Ustads</Badge>
              </div>

              <div>
                <h3 className="font-display text-xl text-[#201a14] dark:text-[#f1ead9] group-hover:text-[#0f4c4c] transition">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#6b5f4f] dark:text-[#afa491] mt-1 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="p-3 bg-[#efe4cf]/50 dark:bg-[#11201d]/50 rounded-xl space-y-1 text-xs">
                <div className="flex items-center justify-between font-semibold">
                  <span className="text-[#6b5f4f] dark:text-[#afa491]">Market Hourly:</span>
                  <span className="font-mono text-[#0f4c4c] dark:text-[#2c8b84] font-bold">
                    Rs {cat.avgHourlyRate}/hr
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#6b5f4f]">
                  <span>Typical Fixed Job:</span>
                  <span>Rs 2,000 – 4,500</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Link href={`/marketplace?category=${encodeURIComponent(cat.name)}`} className="flex-1">
                <Button variant="primary" className="w-full !py-2 text-xs font-bold flex items-center justify-center gap-1">
                  <span>Browse Workers</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
              <Link href={`/jobs/create?category=${encodeURIComponent(cat.name)}`}>
                <Button variant="outline" className="!py-2 text-xs font-bold">
                  Post Request
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
