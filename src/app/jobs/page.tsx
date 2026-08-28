"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { JOBS } from "@/lib/mock-data";
import type { Job } from "@/types";
import { formatPKR } from "@/lib/utils";
import { Card, Badge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Briefcase,
  MapPin,
  Clock,
  Mic,
  Globe2,
  Sparkles,
  ArrowRight,
  Filter,
  Plus,
} from "lucide-react";

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>(JOBS);
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        if (data.jobs) setJobs(data.jobs);
      })
      .catch(console.error);
  }, []);

  const filtered = categoryFilter === "All" ? jobs : jobs.filter((j) => j.category === categoryFilter);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-3xl sm:text-4xl text-[#201a14] dark:text-[#f1ead9]">
              Active Job Requests
            </h1>
            <Badge tone="brass">{filtered.length} Open Jobs</Badge>
          </div>
          <p className="text-xs sm:text-sm text-[#6b5f4f] dark:text-[#afa491] mt-1">
            Browse live service requests posted by local households and diaspora sponsors.
          </p>
        </div>

        <Link href="/jobs/create">
          <Button variant="primary" className="!px-4 !py-2.5 text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm">
            <Plus className="w-4 h-4" />
            <span>Post a New Job</span>
          </Button>
        </Link>
      </div>

      {/* Category filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {["All", "Electrician", "Plumber", "Solar Technician", "AC Technician", "Carpenter"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition ${
              categoryFilter === cat
                ? "bg-[#0f4c4c] text-white shadow-sm"
                : "bg-[#fffbf3] dark:bg-[#1c2e2a] border border-[#e4d5b8] dark:border-[#2c433d] text-[#201a14] dark:text-[#f1ead9] hover:bg-[#efe4cf]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Jobs grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((job) => (
          <Card
            key={job.id}
            className="p-6 flex flex-col justify-between gap-4 border border-[#e4d5b8] dark:border-[#2c433d] hover:border-[#0f4c4c] transition group"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-[#0f4c4c] dark:text-[#2c8b84] uppercase tracking-wider block">
                    {job.category}
                  </span>
                  <h3 className="font-display text-lg sm:text-xl text-[#201a14] dark:text-[#f1ead9] group-hover:text-[#0f4c4c] transition">
                    {job.title}
                  </h3>
                </div>
                <Badge
                  tone={
                    job.urgency === "Emergency"
                      ? "maroon"
                      : job.urgency === "Standard"
                      ? "brass"
                      : "teal"
                  }
                >
                  {job.urgency}
                </Badge>
              </div>

              <p className="text-xs sm:text-sm text-[#201a14]/80 dark:text-[#f1ead9]/80 line-clamp-2 leading-relaxed">
                {job.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-[#6b5f4f] dark:text-[#afa491] pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#c97f1e]" />
                  <span>{job.customerArea}, {job.customerCity}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{job.createdAt}</span>
                </span>
                {job.voiceNoteUrl && (
                  <span className="inline-flex items-center gap-1 text-[#0f4c4c] dark:text-[#2c8b84] font-bold bg-[#efe4cf] dark:bg-[#11201d] px-2 py-0.5 rounded-md">
                    <Mic className="w-3 h-3" />
                    <span>Voice Note</span>
                  </span>
                )}
                {job.isDiaspora && (
                  <span className="inline-flex items-center gap-1 text-[#c97f1e] font-bold bg-[#e8a23d]/15 px-2 py-0.5 rounded-md">
                    <Globe2 className="w-3 h-3" />
                    <span>Diaspora: {job.diasporaCountry}</span>
                  </span>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-[#e4d5b8] dark:border-[#2c433d] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#6b5f4f] dark:text-[#afa491] block">
                  Budget (Escrow)
                </span>
                <span className="font-mono font-bold text-base text-[#0f4c4c] dark:text-[#2c8b84]">
                  {formatPKR(job.budget)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#6b5f4f] dark:text-[#afa491]">
                  {job.offersCount} quotes received
                </span>
                <Link href={`/jobs/${job.id}`}>
                  <Button variant="primary" className="!py-2 !px-3 !text-xs font-bold flex items-center gap-1">
                    <span>View & Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
