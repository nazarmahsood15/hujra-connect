import { NextRequest, NextResponse } from "next/server";
import { getWorkerById } from "@/lib/mock-data";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const worker = await getWorkerById(id);
  if (!worker) return NextResponse.json({ error: "Worker not found" }, { status: 404 });
  return NextResponse.json({ worker });
}
