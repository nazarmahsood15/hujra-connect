import { NextRequest, NextResponse } from "next/server";
import { estimateJobPrice } from "@/lib/ai/gemini";

export async function POST(req: NextRequest) {
  try {
    const { category, description, city } = await req.json();
    if (!category || !description) {
      return NextResponse.json({ error: "Category and description are required" }, { status: 400 });
    }
    const result = await estimateJobPrice(category, description, city || "Peshawar");
    return NextResponse.json(result);
  } catch (error) {
    console.error("Price estimate API error:", error);
    return NextResponse.json({ error: "Failed to generate estimate" }, { status: 500 });
  }
}
