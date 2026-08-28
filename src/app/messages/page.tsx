"use client";

import { useState } from "react";
import { WORKERS } from "@/lib/mock-data";
import { Card, Badge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatPKR } from "@/lib/utils";
import {
  Send,
  Mic,
  PhoneCall,
  ShieldCheck,
  Paperclip,
  CheckCircle2,
  Volume2,
  Lock,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

interface Message {
  id: string;
  sender: "me" | "them";
  text?: string;
  voiceDuration?: string;
  timestamp: string;
  isOffer?: boolean;
  offerAmount?: number;
}

export default function MessagesPage() {
  const [activeWorker, setActiveWorker] = useState(WORKERS[0]);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m1",
      sender: "them",
      text: "السلام علیکم! I received your request regarding the inverter tripping in Hayatabad. I have genuine Schneider breakers with me.",
      timestamp: "10:14 AM",
    },
    {
      id: "m2",
      sender: "them",
      voiceDuration: "0:14",
      timestamp: "10:15 AM",
    },
    {
      id: "m3",
      sender: "me",
      text: "وعلیکم السلام Rahim Ustad. Please arrive before 3:00 PM because load shedding starts at 4:00 PM.",
      timestamp: "10:18 AM",
    },
    {
      id: "m4",
      sender: "them",
      isOffer: true,
      offerAmount: 3500,
      text: "I am ready to come at 2:00 PM. Here is the formal quote for diagnostic + 63A breaker replacement.",
      timestamp: "10:20 AM",
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: Message = {
      id: `m-${Date.now()}`,
      sender: "me",
      text: inputText,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText("");

    // Simulate worker reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `m-${Date.now() + 1}`,
          sender: "them",
          text: "جی بلکل، I am packing my multimeter and testing tools now.",
          timestamp: "Just now",
        },
      ]);
    }, 1200);
  };

  const handleSendVoiceNote = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `m-${Date.now()}`,
          sender: "me",
          voiceDuration: "0:09",
          timestamp: "Just now",
        },
      ]);
    }, 1500);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 h-[calc(100vh-140px)] min-h-[600px] flex flex-col">
      <div className="flex items-center justify-between pb-3 border-b border-[#e4d5b8] dark:border-[#2c433d]">
        <div className="flex items-center gap-2">
          <Link href="/marketplace" className="text-xs font-bold text-[#6b5f4f] hover:text-[#0f4c4c] flex items-center gap-1 sm:hidden">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-2xl text-[#201a14] dark:text-[#f1ead9]">
            Direct Messages & Voice Notes
          </h1>
        </div>
        <Badge tone="teal">Protected Chat & Escrow</Badge>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-4 pt-4 overflow-hidden">
        {/* Conversation List (4 cols) */}
        <div className="col-span-12 md:col-span-4 border border-[#e4d5b8] dark:border-[#2c433d] rounded-2xl bg-[#fffbf3] dark:bg-[#1c2e2a] overflow-y-auto p-3 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6b5f4f] block px-2">
            Active Tradesmen & Clients
          </span>
          {WORKERS.slice(0, 3).map((w) => (
            <button
              key={w.id}
              onClick={() => setActiveWorker(w)}
              className={`w-full p-3 rounded-xl flex items-center gap-3 text-left transition ${
                activeWorker.id === w.id
                  ? "bg-[#0f4c4c] text-white shadow"
                  : "hover:bg-[#efe4cf] dark:hover:bg-[#11201d] text-[#201a14] dark:text-[#f1ead9]"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                  activeWorker.id === w.id ? "bg-[#e8a23d] text-[#0f4c4c]" : "bg-[#efe4cf] text-[#0f4c4c]"
                }`}
              >
                {w.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs truncate">{w.name}</span>
                  <span className="text-[10px] opacity-75">10:20 AM</span>
                </div>
                <p className="text-[11px] truncate opacity-85">{w.category} · {w.area}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Active Conversation Chat Window (8 cols) */}
        <div className="col-span-12 md:col-span-8 border border-[#e4d5b8] dark:border-[#2c433d] rounded-2xl bg-[#fffbf3] dark:bg-[#1c2e2a] flex flex-col justify-between overflow-hidden">
          {/* Chat Header */}
          <div className="p-3.5 border-b border-[#e4d5b8] dark:border-[#2c433d] flex items-center justify-between bg-[#efe4cf]/50 dark:bg-[#11201d]/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0f4c4c] text-[#e8a23d] flex items-center justify-center font-bold text-sm">
                {activeWorker.name[0]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-xs sm:text-sm text-[#201a14] dark:text-[#f1ead9]">
                    {activeWorker.name}
                  </h3>
                  <Badge tone="brass" className="!text-[9px]">★ {activeWorker.trustScore} Trust</Badge>
                </div>
                <p className="text-[10px] text-[#6b5f4f] dark:text-[#afa491]">
                  {activeWorker.category} · Typically replies in ~{activeWorker.responseTimeMin} mins
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link href={`/workers/${activeWorker.id}`}>
                <Button variant="ghost" className="!py-1 !px-2.5 !text-xs font-bold">
                  View Profile
                </Button>
              </Link>
            </div>
          </div>

          {/* Messages Timeline */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-md rounded-2xl p-3.5 text-xs sm:text-sm space-y-1 shadow-xs ${
                    m.sender === "me"
                      ? "bg-[#0f4c4c] text-white rounded-br-none"
                      : "bg-[#efe4cf] dark:bg-[#11201d] text-[#201a14] dark:text-[#f1ead9] rounded-bl-none border border-[#e4d5b8] dark:border-[#2c433d]"
                  }`}
                >
                  {m.text && <p className="leading-relaxed">{m.text}</p>}

                  {/* Voice Note Bubble */}
                  {m.voiceDuration && (
                    <div className="flex items-center gap-3 py-1">
                      <button
                        type="button"
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
                          m.sender === "me" ? "bg-[#e8a23d] text-[#0f4c4c]" : "bg-[#0f4c4c] text-white"
                        }`}
                      >
                        ▶
                      </button>
                      <div className="flex items-center gap-1 h-3">
                        {[4, 10, 6, 12, 8, 14, 10, 6, 10].map((h, i) => (
                          <span
                            key={i}
                            className={`w-1 rounded-full ${m.sender === "me" ? "bg-white" : "bg-[#0f4c4c]"}`}
                            style={{ height: `${h}px` }}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] opacity-75 font-mono">{m.voiceDuration}</span>
                    </div>
                  )}

                  {/* Formal Quote Bubble */}
                  {m.isOffer && (
                    <div className="mt-2 p-3 bg-[#fffbf3] dark:bg-[#1c2e2a] text-[#201a14] dark:text-[#f1ead9] rounded-xl border border-[#c9a227] space-y-2">
                      <div className="flex items-center justify-between font-bold">
                        <span className="text-[#0f4c4c] dark:text-[#2c8b84]">Formal Escrow Quote</span>
                        <span className="font-mono text-base">{formatPKR(m.offerAmount || 3500)}</span>
                      </div>
                      <Link href={`/workers/${activeWorker.id}?book=true`}>
                        <Button variant="primary" className="w-full !py-1.5 !text-xs font-bold flex items-center justify-center gap-1">
                          <Lock className="w-3.5 h-3.5" />
                          <span>Accept & Deposit Escrow</span>
                        </Button>
                      </Link>
                    </div>
                  )}

                  <span className={`text-[9px] block text-right ${m.sender === "me" ? "text-white/60" : "text-[#6b5f4f]"}`}>
                    {m.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 border-t border-[#e4d5b8] dark:border-[#2c433d] bg-[#efe4cf]/40 dark:bg-[#11201d]/40 flex items-center gap-2"
          >
            <button
              type="button"
              onClick={handleSendVoiceNote}
              className={`p-2.5 rounded-xl border border-[#e4d5b8] dark:border-[#2c433d] transition ${
                isRecording
                  ? "bg-red-600 text-white animate-pulse"
                  : "bg-[#fffbf3] dark:bg-[#1c2e2a] text-[#0f4c4c] dark:text-[#2c8b84] hover:bg-[#efe4cf]"
              }`}
              title="Record Voice Note"
            >
              <Mic className="w-4 h-4" />
            </button>

            <input
              type="text"
              placeholder="Type message in English, Urdu or Pashto..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-2 rounded-xl bg-[#fffbf3] dark:bg-[#1c2e2a] border border-[#e4d5b8] dark:border-[#2c433d] text-xs sm:text-sm focus:outline-none focus:border-[#0f4c4c]"
            />

            <Button type="submit" variant="primary" className="!py-2 !px-4 text-xs font-bold">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
