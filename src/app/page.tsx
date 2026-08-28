"use client";

import Link from "next/link";
import { useState } from "react";
import { CATEGORIES, WORKERS } from "@/lib/mock-data";
import { VouchChain } from "@/components/VouchChain";
import { WorkerCard } from "@/components/WorkerCard";
import { Button } from "@/components/ui/Button";
import { Card, Badge } from "@/components/ui/Card";
import {
  Search,
  Mic,
  ShieldCheck,
  Lock,
  HeartHandshake,
  Globe2,
  Sparkles,
  MapPin,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  UserCheck,
  Star,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [voiceActive, setVoiceActive] = useState(false);
  const [voiceNoteText, setVoiceNoteText] = useState("");

  const featured = WORKERS[0];
  const cities = ["All Cities", "Peshawar", "Mardan", "Swat", "Abbottabad", "Charsadda", "Nowshera", "Kohat", "Islamabad"];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedCity !== "All Cities") params.set("city", selectedCity);
    router.push(`/marketplace?${params.toString()}`);
  };

  const handleVoiceSimulation = () => {
    setVoiceActive(true);
    setVoiceNoteText("Listening in Urdu / Pashto...");
    setTimeout(() => {
      setVoiceNoteText("« مجھے حیات آباد فیز 4 میں ایک الیکٹریشن چاہیے »");
      setTimeout(() => {
        setVoiceActive(false);
        router.push("/marketplace?category=Electrician&city=Peshawar");
      }, 1400);
    }, 1200);
  };

  return (
    <main className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20 border-b border-[#e4d5b8] dark:border-[#2c433d] bg-gradient-to-b from-[#fffbf3] to-[#f6efe2] dark:from-[#172a26] dark:to-[#11201d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headline & Action Search */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#efe4cf] dark:bg-[#1c2e2a] border border-[#c9a227]/40 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0f4c4c] dark:text-[#2c8b84] shadow-xs">
              <HeartHandshake className="w-4 h-4 text-[#e8a23d]" />
              <span>Pakistan’s First Elder-Vouched Service Network</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#201a14] dark:text-[#f1ead9] leading-[1.15] tracking-tight">
              Find Trusted Local Workers <br />
              <span className="text-[#0f4c4c] dark:text-[#2c8b84]">Vouched by Elders</span> & Imams.
            </h1>

            <p className="text-base sm:text-lg text-[#6b5f4f] dark:text-[#afa491] max-w-xl leading-relaxed">
              Every electrician, plumber, AC technician, or craftsman on Hujra Connect is verified by a respected community elder before entering your home. With secure escrow protection.
            </p>

            {/* Smart Search Form with Voice button */}
            <form
              onSubmit={handleSearch}
              className="bg-[#fffbf3] dark:bg-[#1c2e2a] border-2 border-[#e4d5b8] dark:border-[#2c433d] focus-within:border-[#0f4c4c] p-2.5 rounded-2xl shadow-md space-y-2 sm:space-y-0 sm:flex sm:items-center gap-2 transition"
            >
              <div className="flex items-center gap-2 px-3 py-2 flex-1">
                <Search className="w-5 h-5 text-[#6b5f4f] shrink-0" />
                <input
                  type="text"
                  placeholder="What service do you need? (e.g. Electrician, Solar, AC)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm font-medium focus:outline-none placeholder:text-[#6b5f4f]/60"
                />
              </div>

              <div className="flex items-center gap-2 px-3 py-2 border-t sm:border-t-0 sm:border-l border-[#e4d5b8] dark:border-[#2c433d]">
                <MapPin className="w-4 h-4 text-[#c97f1e] shrink-0" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-transparent text-xs sm:text-sm font-semibold focus:outline-none text-[#201a14] dark:text-[#f1ead9] cursor-pointer"
                >
                  {cities.map((c) => (
                    <option key={c} value={c} className="dark:bg-[#1c2e2a]">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleVoiceSimulation}
                  className={`p-3 rounded-xl border border-[#e4d5b8] dark:border-[#2c433d] transition flex items-center justify-center ${
                    voiceActive
                      ? "bg-red-500 text-white animate-pulse"
                      : "bg-[#efe4cf] dark:bg-[#11201d] text-[#0f4c4c] dark:text-[#2c8b84] hover:bg-[#e4d5b8]"
                  }`}
                  title="Voice Search in Urdu or Pashto"
                >
                  <Mic className="w-4 h-4" />
                </button>
                <Button type="submit" variant="primary" className="!px-5 !py-2.5 text-sm font-bold whitespace-nowrap">
                  Find Workers
                </Button>
              </div>
            </form>

            {voiceActive && (
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 rounded-xl text-xs flex items-center gap-2 text-amber-900 dark:text-amber-200">
                <Mic className="w-4 h-4 animate-bounce text-red-600" />
                <span className="font-bold">{voiceNoteText}</span>
              </div>
            )}

            {/* Quick action buttons & trust badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href="/jobs/create">
                <Button variant="outline" className="text-xs font-bold gap-1.5 !py-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#c97f1e]" />
                  Post a Job with Voice
                </Button>
              </Link>
              <Link href="/diaspora">
                <Button variant="ghost" className="text-xs font-bold gap-1.5 !py-2">
                  <Globe2 className="w-3.5 h-3.5 text-[#0f4c4c]" />
                  Overseas Diaspora Mode
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Live Vouch Chain Interactive Preview Card */}
          <div className="lg:col-span-5">
            <Card className="p-6 relative bg-[#fffbf3] dark:bg-[#1c2e2a] shadow-xl border-2 border-[#e4d5b8] dark:border-[#2c433d]">
              <div className="flex items-center justify-between border-b border-[#e4d5b8] dark:border-[#2c433d] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0f4c4c] dark:text-[#2c8b84]">
                    The Live Vouch Chain
                  </span>
                </div>
                <Badge tone="brass">Trust Score: 96/100</Badge>
              </div>

              <div className="space-y-4">
                <div className="p-3 bg-[#efe4cf]/60 dark:bg-[#11201d]/60 rounded-xl">
                  <p className="text-xs font-semibold text-[#201a14] dark:text-[#f1ead9]">
                    Master Electrician · Rahim Gul (Peshawar)
                  </p>
                  <p className="text-[11px] text-[#6b5f4f] dark:text-[#afa491] mt-0.5">
                    Endorsed by Chief Elder & Masjid Bilal Imam. 214 successful jobs.
                  </p>
                </div>

                <VouchChain vouches={featured.vouches} workerName={featured.name} interactive={true} />

                <div className="grid grid-cols-2 gap-2 text-center pt-2">
                  <div className="p-2 bg-[#efe4cf]/40 dark:bg-[#11201d]/40 rounded-xl">
                    <p className="text-[10px] text-[#6b5f4f] dark:text-[#afa491]">CNIC & Police Record</p>
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">✓ 100% Cleared</p>
                  </div>
                  <div className="p-2 bg-[#efe4cf]/40 dark:bg-[#11201d]/40 rounded-xl">
                    <p className="text-[10px] text-[#6b5f4f] dark:text-[#afa491]">Escrow Safety</p>
                    <p className="text-xs font-bold text-[#0f4c4c] dark:text-[#2c8b84]">Locked in JazzCash</p>
                  </div>
                </div>

                <Link href={`/workers/${featured.id}`} className="block">
                  <Button variant="primary" className="w-full !py-2.5 text-xs font-bold flex items-center justify-center gap-2">
                    <span>Inspect Rahim’s Full Verification Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 2. POPULAR SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl text-[#201a14] dark:text-[#f1ead9]">
              Popular Local Services
            </h2>
            <p className="text-sm text-[#6b5f4f] dark:text-[#afa491] mt-1">
              Experienced tradesmen with transparent market rates across KPK & Punjab.
            </p>
          </div>
          <Link href="/categories" className="text-xs sm:text-sm font-bold text-[#0f4c4c] dark:text-[#2c8b84] hover:underline flex items-center gap-1">
            <span>View all 12 categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/marketplace?category=${encodeURIComponent(cat.name)}`}
              className="p-4 rounded-2xl bg-[#fffbf3] dark:bg-[#1c2e2a] border border-[#e4d5b8] dark:border-[#2c433d] hover:border-[#0f4c4c] dark:hover:border-[#2c8b84] hover:shadow-md transition text-center group flex flex-col items-center justify-between"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-[#201a14] dark:text-[#f1ead9] leading-tight">
                {cat.name}
              </h3>
              <span className="text-[11px] text-[#6b5f4f] dark:text-[#afa491] mt-1 font-mono">
                {cat.workerCount} workers
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. HOW HUJRA CONNECT WORKS (Dual perspective: Customer & Worker) */}
      <section className="bg-[#efe4cf]/60 dark:bg-[#172a26] py-16 border-y border-[#e4d5b8] dark:border-[#2c433d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge tone="teal">Rooted in Tradition</Badge>
            <h2 className="font-display text-3xl sm:text-4xl text-[#201a14] dark:text-[#f1ead9]">
              How Hujra Connect Works
            </h2>
            <p className="text-sm text-[#6b5f4f] dark:text-[#afa491]">
              Bridging centuries-old Jirga and Hujra trust mechanisms with modern escrow security.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* For Customers */}
            <Card className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0f4c4c] text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-display text-xl text-[#201a14] dark:text-[#f1ead9]">
                    For Customers & Families
                  </h3>
                  <p className="text-xs text-[#6b5f4f] dark:text-[#afa491]">Guaranteed peace of mind in 6 steps</p>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                {[
                  { title: "Post by Voice or Text", desc: "Speak in Pashto or Urdu. Describe the repair in seconds." },
                  { title: "Review Vouched Offers", desc: "Compare proposals backed by elder credentials and past reviews." },
                  { title: "Deposit into Escrow", desc: "Funds are locked safely in JazzCash/Easypaisa — never paid upfront." },
                  { title: "Worker Arrives & Solves", desc: "GPS check-in and before-and-after photo verification." },
                  { title: "Inspect & Release Payment", desc: "You confirm satisfaction before funds leave the escrow lock." },
                  { title: "Strengthen Community Trust", desc: "Rate the worker to update the neighbourhood trust index." },
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <span className="w-5 h-5 rounded-full bg-[#e8a23d]/30 text-[#c97f1e] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="font-bold text-[#201a14] dark:text-[#f1ead9]">{step.title}</h4>
                      <p className="text-xs text-[#6b5f4f] dark:text-[#afa491] mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/jobs/create" className="block pt-2">
                <Button variant="primary" className="w-full !py-2.5 text-xs font-bold">
                  Post Your First Request →
                </Button>
              </Link>
            </Card>

            {/* For Workers & Craftsmen */}
            <Card className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#c97f1e] text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-display text-xl text-[#201a14] dark:text-[#f1ead9]">
                    For Skilled Workers & Ustads
                  </h3>
                  <p className="text-xs text-[#6b5f4f] dark:text-[#afa491]">Earn respect and reliable daily earnings</p>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                {[
                  { title: "Create Your Trade Profile", desc: "List your skills, rates, and upload photos of past projects." },
                  { title: "Get Vouched by Local Elders", desc: "Invite your union leader, local imam, or respected elder to endorse you." },
                  { title: "Browse Nearby High-Paying Jobs", desc: "Filter jobs within your Tehsil and Union Council." },
                  { title: "Send Voice Proposals", desc: "No typing required. Send a voice quote directly to the customer." },
                  { title: "Guaranteed Escrow Payment", desc: "Work with confidence knowing payment is already deposited in escrow." },
                  { title: "Instant JazzCash Withdrawals", desc: "Withdraw your hard-earned payment immediately upon job approval." },
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <span className="w-5 h-5 rounded-full bg-[#0f4c4c]/20 text-[#0f4c4c] dark:text-[#2c8b84] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="font-bold text-[#201a14] dark:text-[#f1ead9]">{step.title}</h4>
                      <p className="text-xs text-[#6b5f4f] dark:text-[#afa491] mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/dashboard/worker" className="block pt-2">
                <Button variant="outline" className="w-full !py-2.5 text-xs font-bold">
                  Join as a Verified Worker →
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. FEATURED VERIFIED WORKERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <Badge tone="marigold">Top Rated Ustads</Badge>
            <h2 className="font-display text-3xl sm:text-4xl text-[#201a14] dark:text-[#f1ead9] mt-1">
              Vouched & Ready Today
            </h2>
            <p className="text-sm text-[#6b5f4f] dark:text-[#afa491]">
              Identity verified, background cleared, and vouched by neighbourhood elders.
            </p>
          </div>
          <Link href="/marketplace" className="text-xs sm:text-sm font-bold text-[#0f4c4c] dark:text-[#2c8b84] hover:underline flex items-center gap-1">
            <span>Explore all workers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WORKERS.slice(0, 3).map((w) => (
            <WorkerCard key={w.id} worker={w} />
          ))}
        </div>
      </section>

      {/* 5. DIASPORA OVERSEAS MODE CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-[#0f4c4c] via-[#17706b] to-[#0f4c4c] rounded-3xl p-8 sm:p-12 text-white shadow-xl grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-[#e8a23d]">
              <Globe2 className="w-4 h-4" />
              <span>Overseas Pakistanis in UK, UAE, Saudi Arabia, Qatar & USA</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-white">
              Take Care of Your Family Back Home in Pakistan
            </h2>
            <p className="text-sm sm:text-base text-white/80 max-w-2xl leading-relaxed">
              Living abroad and worried about your parents’ home repairs? Book a verified, elder-vouched technician in Peshawar, Mardan, or Swat. Pay remotely with Stripe/card in GBP/AED/USD, track live photos, and release escrow only when your parents confirm the job is finished.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/diaspora">
                <Button variant="primary" className="!px-6 !py-3 text-sm font-bold">
                  Enter Diaspora Care Mode →
                </Button>
              </Link>
              <Link href="/diaspora#how-it-works">
                <Button variant="outline" className="!bg-white/10 !text-white !border-white/30 hover:!bg-white/20 text-sm font-bold">
                  How Diaspora Booking Works
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white/10 rounded-2xl p-6 border border-white/20 space-y-3">
            <h4 className="font-bold text-sm text-[#e8a23d] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              <span>Overseas Safeguards</span>
            </h4>
            <ul className="text-xs space-y-2 text-white/90">
              <li className="flex items-center gap-2">✓ Direct phone coordination with your parents</li>
              <li className="flex items-center gap-2">✓ Mandatory before & after video proof</li>
              <li className="flex items-center gap-2">✓ International credit/debit card support</li>
              <li className="flex items-center gap-2">✓ Local Union Council elder on standby</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. VOUCH ACCOUNTABILITY & JIRGA PRINCIPLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="border border-[#e4d5b8] dark:border-[#2c433d] rounded-3xl p-8 sm:p-12 bg-[#fffbf3] dark:bg-[#1c2e2a] grid md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#a63a2e]/10 text-[#a63a2e] flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl text-[#201a14] dark:text-[#f1ead9]">
              Community Accountability
            </h3>
            <p className="text-xs text-[#6b5f4f] dark:text-[#afa491] leading-relaxed">
              Vouchers share reputation responsibility. If a worker misconducts, the elder’s vouch weight is audited by the community panel, eliminating fake endorsements.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#0f4c4c]/10 text-[#0f4c4c] dark:text-[#2c8b84] flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl text-[#201a14] dark:text-[#f1ead9]">
              Automated Escrow Vault
            </h3>
            <p className="text-xs text-[#6b5f4f] dark:text-[#afa491] leading-relaxed">
              Integrated with JazzCash, Easypaisa, and 1Link banks. Your deposit is safely held in an escrow account until you sign off on completion.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#e8a23d]/20 text-[#c97f1e] flex items-center justify-center">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl text-[#201a14] dark:text-[#f1ead9]">
              Voice-First Accessibility
            </h3>
            <p className="text-xs text-[#6b5f4f] dark:text-[#afa491] leading-relaxed">
              Designed for tradesmen and customers of all literacy levels. Speak your request in Urdu or Pashto, and our AI assistant converts it into a formal work order.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
