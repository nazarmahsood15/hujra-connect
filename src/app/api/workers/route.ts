import { NextRequest, NextResponse } from "next/server";
import { getWorkers } from "@/lib/mock-data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city") || undefined;
  const category = searchParams.get("category") || undefined;
  const q = searchParams.get("q") || undefined;
  const minTrust = searchParams.get("minTrust") ? parseInt(searchParams.get("minTrust")!) : undefined;
  const emergencyOnly = searchParams.get("emergency") === "true";

  const workers = await getWorkers({ city, category, q, minTrust, emergencyOnly });
  return NextResponse.json({ workers, total: workers.length });
}
