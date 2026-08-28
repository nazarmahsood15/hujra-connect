"use client";

import { useState } from "react";
import Link from "next/link";
import { CATEGORIES, WORKERS } from "@/lib/mock-data";
import { formatPKR } from "@/lib/utils";
import { Card, Badge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Globe2,
  ShieldCheck,
  Camera,
  CreditCard,
  PhoneCall,
  HeartHandshake,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  MapPin,
} from "lucide-react";

const CURRENCIES = [
  { code: "GBP", symbol: "£", rate: 0.0028, name: "British Pound" },
  { code: "AED", symbol: "AED", rate: 0.013, name: "UAE Dirham" },
  { code: "SAR", symbol: "SAR", rate: 0.0135, name: "Saudi Riyal" },
  { code: "USD", symbol: "$", rate: 0.0036, name: "US Dollar" },
  { code: "PKR", symbol: "₨", rate: 1, name: "Pakistani Rupee" },
];

function formatCurrency(pkr: number, currencyCode: string) {
  const curr = CURRENCIES.find((c) => c.code === currencyCode) || CURRENCIES[0];
  if (curr.code === "PKR") return `Rs ${pkr.toLocaleString()}`;
  const converted = (pkr * curr.rate).toFixed(2);
  return `${curr.symbol} ${converted} (Rs ${pkr.toLocaleString()})`;
}

export default function DiasporaPage() {
  const [selectedCurrency, setSelectedCurrency] = useState("GBP");
  const [selectedCity, setSelectedCity] = useState("Peshawar");
  const [selectedService, setSelectedService] = useState("Solar Technician");

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-16">
      {/* 1. HERO BANNER */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0f4c4c] via-[#17706b] to-[#0f4c4c] text-white p-8 sm:p-14 shadow-2xl">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#e8a23d] border border-white/20">
            <Globe2 className="w-4 h-4" />
            <span>Connecta · Overseas Care Protocol</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl text-white leading-tight">
            Caring for Your Family’s Home in Pakistan, From Anywhere in the World.
          </h1>

          <p className="text-sm sm:text-base text-white/80 leading-relaxed">
            Living in the UK, Gulf, or North America? Don’t let your aging parents struggle with unvetted tradesmen or overcharging. Book verified, elder-vouched technicians in Khyber Pakhtunkhwa. Pay with international card in your local currency, review before-and-after video proof, and release payment only when your family is happy.
          </p>

          {/* Currency Switcher */}
          <div className="p-4 rounded-2xl bg-white/10 border border-white/20 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#e8a23d] block">Select Your Viewing Currency:</span>
              <span className="text-xs text-white/70">All escrow deposits convert seamlessly.</span>
            </div>
            <div className="flex gap-2">
              {CURRENCIES.map((c) => (
                <button
                  key={c.code}
                  onClick={() => setSelectedCurrency(c.code)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    selectedCurrency === c.code
                      ? "bg-[#e8a23d] text-[#0f4c4c] shadow"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {c.code} ({c.symbol})
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/jobs/create">
              <Button variant="primary" className="!px-6 !py-3 text-sm font-bold shadow-lg">
                Book for Parents Back Home →
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="outline" className="!bg-white/10 !text-white !border-white/30 hover:!bg-white/20 text-sm font-bold">
                See Overseas Safeguards
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* 2. THE 4 DIASPORA SAFEGUARDS */}
      <section id="how-it-works" className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge tone="teal">Complete Transparency</Badge>
          <h2 className="font-display text-3xl sm:text-4xl text-[#201a14] dark:text-[#f1ead9]">
            The 4 Diaspora Safeguards
          </h2>
          <p className="text-xs sm:text-sm text-[#6b5f4f] dark:text-[#afa491]">
            How we protect your remittances and ensure elder-level respect for your household.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: ShieldCheck,
              title: "Elder-Vouched Ustads",
              desc: "Every tradesman sent to your family's house is personally guaranteed by a Union Council elder or local Imam.",
            },
            {
              icon: Camera,
              title: "Mandatory Photo & Video Proof",
              desc: "Before-and-after photos and video walkthroughs are uploaded to your private dashboard before escrow release.",
            },
            {
              icon: CreditCard,
              title: "International Card Escrow",
              desc: "Pay in GBP, AED, SAR, or USD via Stripe/Visa. Funds stay in escrow until you and your parents confirm the job.",
            },
            {
              icon: PhoneCall,
              title: "WhatsApp Family Coordination",
              desc: "Our bilingual Peshawar care team coordinates arrival times directly with your parents in Pashto or Urdu.",
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card key={idx} className="p-6 space-y-3 border border-[#e4d5b8] dark:border-[#2c433d]">
                <div className="w-12 h-12 rounded-2xl bg-[#0f4c4c]/10 text-[#0f4c4c] dark:text-[#2c8b84] flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg text-[#201a14] dark:text-[#f1ead9]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#6b5f4f] dark:text-[#afa491] leading-relaxed">
                  {item.desc}
                </p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 3. POPULAR OVERSEAS PACKAGES & CALCULATOR */}
      <section className="bg-[#efe4cf]/60 dark:bg-[#172a26] rounded-3xl p-8 sm:p-12 border border-[#e4d5b8] dark:border-[#2c433d] space-y-8">
        <div>
          <Badge tone="marigold">Transparent Rates</Badge>
          <h2 className="font-display text-3xl text-[#201a14] dark:text-[#f1ead9] mt-1">
            Common Home Care Packages for Overseas Sponsors
          </h2>
          <p className="text-xs sm:text-sm text-[#6b5f4f] dark:text-[#afa491]">
            Prices converted live to {selectedCurrency}. Includes labor, inspection checklist, and escrow protection.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Solar Inverter & Battery Health Inspection",
              cat: "Solar Technician",
              pkr: 4500,
              desc: "Full load test on tubular batteries, panel cleaning check, wiring thermal scan, and inverter firmware check.",
            },
            {
              title: "Full House AC Summer Pre-Service (3 Units)",
              cat: "AC Technician",
              pkr: 7500,
              desc: "Deep chemical master jet wash of indoor/outdoor units, gas pressure verification, and drainage clearance.",
            },
            {
              title: "Water Tank, Motor & Plumbing Overhaul",
              cat: "Plumber",
              pkr: 5000,
              desc: "Overhead water tank disinfection, pump pressure test, automatic level sensor setup, and leak elimination.",
            },
            {
              title: "Main DB Breaker & Surge Protection Setup",
              cat: "Electrician",
              pkr: 6000,
              desc: "Installation of voltage protector against WAPDA high-voltage spikes, earthing ground test.",
            },
            {
              title: "CCTV Camera Remote Access Configuration",
              cat: "CCTV Technician",
              pkr: 5500,
              desc: "Connect home cameras to your phone in UK/UAE with cloud recording and night-vision alignment.",
            },
            {
              title: "Emergency 24/7 Priority Home Dispatch",
              cat: "Multi-Trade",
              pkr: 8000,
              desc: "Dedicated senior supervisor dispatched within 45 minutes for urgent electrical or water emergencies.",
            },
          ].map((pkg, idx) => (
            <Card key={idx} className="p-6 flex flex-col justify-between gap-4 bg-[#fffbf3] dark:bg-[#1c2e2a]">
              <div className="space-y-2">
                <Badge tone="brass">{pkg.cat}</Badge>
                <h3 className="font-display text-lg text-[#201a14] dark:text-[#f1ead9]">
                  {pkg.title}
                </h3>
                <p className="text-xs text-[#6b5f4f] dark:text-[#afa491] leading-relaxed">
                  {pkg.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#e4d5b8] dark:border-[#2c433d] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#6b5f4f] block">Estimated Cost</span>
                  <span className="font-mono font-bold text-sm text-[#0f4c4c] dark:text-[#2c8b84]">
                    {formatCurrency(pkg.pkr, selectedCurrency)}
                  </span>
                </div>
                <Link href={`/jobs/create?category=${encodeURIComponent(pkg.cat)}&diaspora=true`}>
                  <Button variant="primary" className="!py-1.5 !px-3 !text-xs font-bold">
                    Order for Parents →
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. OVERSEAS TESTIMONIALS */}
      <section className="space-y-8">
        <h2 className="font-display text-3xl text-center text-[#201a14] dark:text-[#f1ead9]">
          Trusted by Overseas Pakistanis Across 14 Countries
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Tariq Afridi",
              country: "Manchester, United Kingdom",
              familyCity: "Peshawar, Hayatabad",
              comment:
                "My mother was having solar inverter failures every summer. I booked Rahim Gul from Manchester, paid with my UK Barclaycard into escrow, and received high-res before-after photos. My mother was so pleased with his respect and cleanliness.",
            },
            {
              name: "Kamran Khan",
              country: "Dubai, United Arab Emirates",
              familyCity: "Mardan, Cantt",
              comment:
                "The fact that the local Imam and elder vouched for the electrician gave me complete peace of mind sending someone into my parents' house while I'm working in Dubai.",
            },
            {
              name: "Dr. Farooq Shah",
              country: "Riyadh, Saudi Arabia",
              familyCity: "Swat, Mingora",
              comment:
                "Connecta is a blessing for overseas Pashtuns. Everything was transparent, no hidden charges, and the funds stayed locked in escrow until my brother tested the water motor.",
            },
          ].map((t, idx) => (
            <Card key={idx} className="p-6 space-y-3 border border-[#e4d5b8] dark:border-[#2c433d]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0f4c4c] dark:text-[#2c8b84]">
                <Globe2 className="w-4 h-4 text-[#c97f1e]" />
                <span>{t.country}</span>
              </div>
              <p className="text-xs text-[#201a14] dark:text-[#f1ead9] leading-relaxed italic">
                &ldquo;{t.comment}&rdquo;
              </p>
              <div className="pt-2 border-t border-[#e4d5b8] dark:border-[#2c433d] text-xs">
                <strong className="block text-[#201a14] dark:text-[#f1ead9]">{t.name}</strong>
                <span className="text-[11px] text-[#6b5f4f] dark:text-[#afa491]">Family in {t.familyCity}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
