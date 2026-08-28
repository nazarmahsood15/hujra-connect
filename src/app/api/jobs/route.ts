import { NextRequest, NextResponse } from "next/server";
import { JOBS, getJobs } from "@/lib/mock-data";
import type { Job } from "@/types";

export async function GET() {
  const jobs = await getJobs();
  return NextResponse.json({ jobs });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newJob: Job = {
      id: `job-${Date.now()}`,
      customerId: body.customerId || "u-cust1",
      customerName: body.customerName || "Customer",
      customerCity: body.city || "Peshawar",
      customerArea: body.area || "Hayatabad",
      title: body.title,
      category: body.category,
      budget: Number(body.budget) || 2500,
      urgency: body.urgency || "Standard",
      description: body.description,
      voiceNoteUrl: body.voiceNoteUrl,
      isDiaspora: Boolean(body.isDiaspora),
      diasporaCountry: body.diasporaCountry,
      status: "OPEN",
      createdAt: "Just now",
      offersCount: 0,
      offers: [],
    };

    JOBS.unshift(newJob);
    return NextResponse.json({ job: newJob, message: "Job posted successfully" }, { status: 201 });
  } catch (error) {
    console.error("Job post error:", error);
    return NextResponse.json({ error: "Failed to post job" }, { status: 500 });
  }
}
