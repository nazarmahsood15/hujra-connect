import { NextRequest, NextResponse } from "next/server";
import { parseVoiceJob } from "@/lib/ai/gemini";

export async function POST(req: NextRequest) {
  try {
    const { transcript } = await req.json();
    if (!transcript) {
      return NextResponse.json({ error: "Transcript is required" }, { status: 400 });
    }
    const result = await parseVoiceJob(transcript);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Parse voice API error:", error);
    return NextResponse.json({ error: "Failed to parse voice transcript" }, { status: 500 });
  }
}
