import { NextRequest, NextResponse } from "next/server";
import { detectFraudSignals } from "@/lib/ai/gemini";

export async function POST(req: NextRequest) {
  try {
    const { details } = await req.json();
    if (!details) {
      return NextResponse.json({ error: "Details are required" }, { status: 400 });
    }
    const analysis = await detectFraudSignals(details);
    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Fraud check API error:", error);
    return NextResponse.json({ error: "Failed to run fraud check" }, { status: 500 });
  }
}
