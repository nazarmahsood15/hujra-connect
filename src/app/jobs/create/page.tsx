"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES, PAKISTAN_LOCATIONS } from "@/lib/mock-data";
import { Button } from "@/components/ui/Button";
import { Card, Badge } from "@/components/ui/Card";
import {
  Mic,
  MicOff,
  Sparkles,
  Play,
  Square,
  Trash2,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  AlertCircle,
} from "lucide-react";

export default function CreateJobPage() {
  const router = useRouter();

  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [aiAnalysisNotes, setAiAnalysisNotes] = useState<string | null>(null);

  // Form fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Electrician");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("3000");
  const [urgency, setUrgency] = useState<"Emergency" | "Standard" | "Flexible">("Standard");
  const [district, setDistrict] = useState("Peshawar");
  const [area, setArea] = useState("Hayatabad Phase 4");
  const [isDiaspora, setIsDiaspora] = useState(false);
  const [diasporaCountry, setDiasporaCountry] = useState("United Kingdom");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // AI Price estimate
  const [aiPriceRange, setAiPriceRange] = useState<{ min: number; max: number; recommended: number } | null>(null);

  const startVoiceRecording = () => {
    setIsRecording(true);
    setHasRecorded(false);
    setRecordingDuration(0);
    const interval = setInterval(() => {
      setRecordingDuration((prev) => {
        if (prev >= 6) {
          clearInterval(interval);
          stopVoiceRecording();
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopVoiceRecording = async () => {
    setIsRecording(false);
    setHasRecorded(true);
    setIsAiProcessing(true);

    // Call server-side AI parse voice API
    try {
      const sampleVoiceTranscription = "السلام علیکم، حیات آباد فیز 4 میں ہمارے گھر کا مین بریکر ٹرپ کر رہا ہے، یو پی ایس اور سولر وائرنگ چیک کروانی ہے برائے مہربانی ایمرجنسی میں استاد بھیجیں";
      const res = await fetch("/api/ai/parse-voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: sampleVoiceTranscription }),
      });

      const data = await res.json();
      if (res.ok && data.title) {
        setTitle(data.title);
        setCategory(data.category || "Electrician");
        setBudget(String(data.estimatedBudget || 3200));
        setUrgency(data.urgency || "Emergency");
        setDescription(data.summary || sampleVoiceTranscription);
        setAiAnalysisNotes(`AI parsed from Urdu/Pashto voice note: detected ${data.category} repair with ${data.urgency} urgency.`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiProcessing(false);
    }
  };

  const handleAiPriceAdvisor = async () => {
    try {
      const res = await fetch("/api/ai/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          description: description || title || "General service repair",
          city: district,
        }),
      });
      const data = await res.json();
      if (data.priceRange) {
        setAiPriceRange(data.priceRange);
        setBudget(String(data.priceRange.recommended));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          budget: Number(budget),
          urgency,
          description,
          city: district,
          area,
          isDiaspora,
          diasporaCountry: isDiaspora ? diasporaCountry : undefined,
          voiceNoteUrl: hasRecorded ? "/audio/sample-urdu-electric.mp3" : undefined,
        }),
      });

      const data = await res.json();
      if (res.ok && data.job) {
        router.push(`/jobs/${data.job.id}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div>
        <Badge tone="marigold">Voice-First Workflow</Badge>
        <h1 className="font-display text-3xl sm:text-4xl text-[#201a14] dark:text-[#f1ead9] mt-1">
          Post a Service Request
        </h1>
        <p className="text-xs sm:text-sm text-[#6b5f4f] dark:text-[#afa491] mt-1">
          Speak in Urdu or Pashto, or type your requirements. Vouched Ustads in your neighbourhood will send quotes.
        </p>
      </div>

      {/* 1. VOICE RECORDING BOX */}
      <Card className="p-6 bg-gradient-to-br from-[#fffbf3] to-[#efe4cf] dark:from-[#1c2e2a] dark:to-[#11201d] border-2 border-[#c9a227]/60 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-[#0f4c4c] text-[#e8a23d] flex items-center justify-center font-bold">
              🎙️
            </span>
            <div>
              <h3 className="font-bold text-sm text-[#201a14] dark:text-[#f1ead9]">
                Record Your Voice Request (Urdu / Pashto / English)
              </h3>
              <p className="text-xs text-[#6b5f4f] dark:text-[#afa491]">
                Tap record and explain what is broken. AI will fill the form automatically.
              </p>
            </div>
          </div>
          {hasRecorded && <Badge tone="teal">Voice Attached (0:18)</Badge>}
        </div>

        {/* Recording Visualizer & Controls */}
        <div className="p-4 rounded-2xl bg-[#fffbf3] dark:bg-[#172a26] border border-[#e4d5b8] dark:border-[#2c433d] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
              className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-transform ${
                isRecording
                  ? "bg-red-600 animate-pulse scale-110"
                  : "bg-[#0f4c4c] hover:bg-[#17706b] hover:scale-105"
              }`}
              title={isRecording ? "Stop Recording" : "Start Voice Recording"}
            >
              {isRecording ? <Square className="w-6 h-6 fill-current" /> : <Mic className="w-6 h-6" />}
            </button>

            <div>
              <p className="font-bold text-xs text-[#201a14] dark:text-[#f1ead9]">
                {isRecording ? "Recording in progress..." : hasRecorded ? "Voice Note Recorded" : "Click mic to speak"}
              </p>
              <p className="text-[11px] font-mono text-[#6b5f4f] dark:text-[#afa491]">
                {isRecording ? `00:0${recordingDuration} / 00:30` : hasRecorded ? "Audio waveform ready · AI processed" : "Pashto & Urdu friendly"}
              </p>
            </div>
          </div>

          {/* Waveform simulation */}
          {hasRecorded && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 h-6">
                {[4, 8, 14, 10, 18, 12, 16, 8, 12, 6, 14, 10].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 bg-[#0f4c4c] dark:bg-[#2c8b84] rounded-full"
                    style={{ height: `${h * 1.5}px` }}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  setHasRecorded(false);
                  setAiAnalysisNotes(null);
                }}
                className="p-1.5 rounded-lg text-[#a63a2e] hover:bg-red-50 dark:hover:bg-red-950"
                title="Delete voice recording"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {isAiProcessing && (
          <div className="p-3 bg-amber-50 dark:bg-amber-950/60 border border-amber-300 rounded-xl text-xs flex items-center gap-2 text-amber-900 dark:text-amber-200">
            <Sparkles className="w-4 h-4 animate-spin text-[#c97f1e]" />
            <span>AI is listening to your Pashto/Urdu voice note & structuring your job post...</span>
          </div>
        )}

        {aiAnalysisNotes && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl text-xs text-emerald-900 dark:text-emerald-300 font-medium">
            ✨ {aiAnalysisNotes}
          </div>
        )}
      </Card>

      {/* 2. FORM FIELDS */}
      <form onSubmit={handleSubmitJob} className="space-y-6">
        <Card className="p-6 sm:p-8 space-y-5">
          <h3 className="font-display text-xl text-[#201a14] dark:text-[#f1ead9] border-b border-[#e4d5b8] dark:border-[#2c433d] pb-3">
            Job Details & Requirements
          </h3>

          {/* Title */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#6b5f4f] dark:text-[#afa491] block mb-1">
              Job Title / Main Problem
            </label>
            <input
              type="text"
              placeholder="e.g. Main Circuit Breaker Tripping & Inverter Setup"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#fffbf3] dark:bg-[#1c2e2a] border border-[#e4d5b8] dark:border-[#2c433d] text-sm font-semibold focus:outline-none focus:border-[#0f4c4c]"
              required
            />
          </div>

          {/* Category & Urgency */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#6b5f4f] dark:text-[#afa491] block mb-1">
                Trade Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#fffbf3] dark:bg-[#1c2e2a] border border-[#e4d5b8] dark:border-[#2c433d] text-xs font-semibold focus:outline-none"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.name}>
                    {c.icon} {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#6b5f4f] dark:text-[#afa491] block mb-1">
                Urgency Level
              </label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#fffbf3] dark:bg-[#1c2e2a] border border-[#e4d5b8] dark:border-[#2c433d] text-xs font-semibold focus:outline-none"
              >
                <option value="Emergency">🚨 Emergency (Within 1-2 hours)</option>
                <option value="Standard">📅 Standard (Today / Tomorrow)</option>
                <option value="Flexible">🕒 Flexible (Within this week)</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#6b5f4f] dark:text-[#afa491] block mb-1">
              Detailed Description
            </label>
            <textarea
              rows={4}
              placeholder="Describe the issue, tools required, or specific spare parts..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#fffbf3] dark:bg-[#1c2e2a] border border-[#e4d5b8] dark:border-[#2c433d] text-xs sm:text-sm focus:outline-none focus:border-[#0f4c4c]"
              required
            />
          </div>

          {/* Budget with AI Price Advisor */}
          <div className="p-4 rounded-2xl bg-[#efe4cf]/50 dark:bg-[#11201d]/50 border border-[#e4d5b8] dark:border-[#2c433d] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#201a14] dark:text-[#f1ead9] block">
                  Estimated Budget (PKR)
                </label>
                <span className="text-[11px] text-[#6b5f4f] dark:text-[#afa491]">
                  Held securely in Escrow — you can negotiate with offers.
                </span>
              </div>
              <button
                type="button"
                onClick={handleAiPriceAdvisor}
                className="text-xs font-bold text-[#0f4c4c] dark:text-[#2c8b84] hover:underline flex items-center gap-1 bg-[#fffbf3] dark:bg-[#1c2e2a] px-3 py-1.5 rounded-xl border border-[#c9a227]/40 shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#c97f1e]" />
                <span>AI Price Advisor</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-lg text-[#0f4c4c] dark:text-[#2c8b84]">Rs</span>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-48 px-3 py-2 rounded-xl bg-[#fffbf3] dark:bg-[#1c2e2a] border border-[#e4d5b8] dark:border-[#2c433d] font-mono text-base font-bold focus:outline-none"
                required
              />
            </div>

            {aiPriceRange && (
              <div className="p-3 bg-[#fffbf3] dark:bg-[#1c2e2a] rounded-xl border border-[#c9a227]/40 text-xs space-y-1">
                <span className="font-bold text-[#c97f1e]">💡 AI Fair Market Guidance:</span>
                <p className="text-[#6b5f4f] dark:text-[#afa491]">
                  Typical {category} repairs in {district} range between{" "}
                  <strong>Rs {aiPriceRange.min.toLocaleString()}</strong> and{" "}
                  <strong>Rs {aiPriceRange.max.toLocaleString()}</strong>.
                </p>
              </div>
            )}
          </div>

          {/* Location Hierarchy */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#6b5f4f] dark:text-[#afa491] block mb-1">
                District / City
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#fffbf3] dark:bg-[#1c2e2a] border border-[#e4d5b8] dark:border-[#2c433d] text-xs font-semibold"
              >
                {PAKISTAN_LOCATIONS.map((l) => (
                  <option key={l.district} value={l.district}>
                    {l.district}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#6b5f4f] dark:text-[#afa491] block mb-1">
                Neighbourhood / Union Council
              </label>
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="e.g. Sector J, Hayatabad Phase 2"
                className="w-full px-3 py-2 rounded-xl bg-[#fffbf3] dark:bg-[#1c2e2a] border border-[#e4d5b8] dark:border-[#2c433d] text-xs font-semibold"
                required
              />
            </div>
          </div>

          {/* Diaspora Toggle */}
          <div className="p-4 rounded-2xl bg-[#0f4c4c]/5 dark:bg-[#2c8b84]/10 border border-[#0f4c4c]/20 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#0f4c4c] dark:text-[#2c8b84] block">
                Are you booking from abroad for family in Pakistan? (Diaspora Mode)
              </span>
              <span className="text-[11px] text-[#6b5f4f] dark:text-[#afa491]">
                Enables remote international cards, milestone video proofs, and WhatsApp family updates.
              </span>
            </div>
            <input
              type="checkbox"
              checked={isDiaspora}
              onChange={(e) => setIsDiaspora(e.target.checked)}
              className="w-5 h-5 accent-[#0f4c4c] cursor-pointer"
            />
          </div>

          {isDiaspora && (
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#6b5f4f] dark:text-[#afa491] block mb-1">
                Country of Residence
              </label>
              <select
                value={diasporaCountry}
                onChange={(e) => setDiasporaCountry(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#fffbf3] dark:bg-[#1c2e2a] border border-[#e4d5b8] dark:border-[#2c433d] text-xs font-semibold"
              >
                <option>United Kingdom</option>
                <option>United Arab Emirates</option>
                <option>Saudi Arabia</option>
                <option>Qatar</option>
                <option>United States</option>
                <option>Canada</option>
                <option>Oman</option>
                <option>Bahrain</option>
              </select>
            </div>
          )}

          {/* Submit */}
          <div className="pt-4 border-t border-[#e4d5b8] dark:border-[#2c433d]">
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="w-full !py-3.5 text-sm font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              <span>{isSubmitting ? "Publishing Job to Community Ustads..." : "Publish Job & Receive Elder-Vouched Quotes →"}</span>
            </Button>
          </div>
        </Card>
      </form>
    </main>
  );
}
