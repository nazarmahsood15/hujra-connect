import { NextRequest, NextResponse } from "next/server";
import { translateMessage } from "@/lib/ai/gemini";

export async function POST(req: NextRequest) {
  try {
    const { text, targetLang } = await req.json();
    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }
    const translated = await translateMessage(text, targetLang || "Urdu");
    return NextResponse.json({ translated });
  } catch (error) {
    console.error("Translate API error:", error);
    return NextResponse.json({ error: "Failed to translate" }, { status: 500 });
  }
}
