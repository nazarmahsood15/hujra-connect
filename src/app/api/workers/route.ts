import { NextRequest, NextResponse } from "next/server";
import { getWorkers } from "@/lib/mock-data";

// GET /api/workers?q=&city=&category=
// Today this reads from src/lib/mock-data.ts. Once the real backend
// (NestJS + Prisma + PostgreSQL) is running, this handler becomes a thin
// proxy — or is removed entirely in favour of calling that service
// directly from the client with the same query shape.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const workers = await getWorkers({
    q: searchParams.get("q") ?? undefined,
    city: searchParams.get("city") ?? undefined,
    category: searchParams.get("category") ?? undefined,
  });
  return NextResponse.json({ workers });
}
