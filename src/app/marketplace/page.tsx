"use client";

import { useEffect, useState } from "react";
import type { Worker } from "@/types";
import { CATEGORIES, PAKISTAN_LOCATIONS, WORKERS } from "@/lib/mock-data";
import { WorkerCard } from "@/components/WorkerCard";
import { Button } from "@/components/ui/Button";
import { Badge, Card } from "@/components/ui/Card";
import {
  Search,
  Filter,
  MapPin,
  SlidersHorizontal,
  LayoutGrid,
  Map,
  ShieldCheck,
  Zap,
  Mic,
  RotateCcw,
  Sparkles,
  Award,
} from "lucide-react";

export default function MarketplacePage() {
  const [workers, setWorkers] = useState<Worker[]>(WORKERS);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  // Filter states
  const [q, setQ] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [selectedTehsil, setSelectedTehsil] = useState("All");
  const [minTrust, setMinTrust] = useState<number>(0);
  const [minRating, setMinRating] = useState<number>(0);
  const [emergencyOnly, setEmergencyOnly] = useState(false);
  const [maxHourlyRate, setMaxHourlyRate] = useState<number>(2000);

  // Voice search state
  const [isListening, setIsListening] = useState(false);
  const [voiceBanner, setVoiceBanner] = useState("");

  const activeDistrictObj = PAKISTAN_LOCATIONS.find((l) => l.district === selectedDistrict);
  const tehsils = activeDistrictObj ? ["All", ...activeDistrictObj.tehsils] : ["All"];

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      let filtered = WORKERS;

      if (q.trim()) {
        const query = q.toLowerCase();
        filtered = filtered.filter(
          (w) =>
            w.name.toLowerCase().includes(query) ||
            w.category.toLowerCase().includes(query) ||
            w.bio.toLowerCase().includes(query) ||
            w.area.toLowerCase().includes(query) ||
            w.languages.some((l) => l.toLowerCase().includes(query))
        );
      }

      if (selectedCategory !== "All") {
        filtered = filtered.filter(
          (w) => w.category.toLowerCase() === selectedCategory.toLowerCase()
        );
      }

      if (selectedDistrict !== "All") {
        filtered = filtered.filter(
          (w) => w.district.toLowerCase() === selectedDistrict.toLowerCase() || w.city.toLowerCase() === selectedDistrict.toLowerCase()
        );
      }

      if (selectedTehsil !== "All") {
        filtered = filtered.filter(
          (w) => w.area.toLowerCase().includes(selectedTehsil.toLowerCase())
        );
      }

      if (minTrust > 0) {
        filtered = filtered.filter((w) => w.trustScore >= minTrust);
      }

      if (minRating > 0) {
        filtered = filtered.filter((w) => w.rating >= minRating);
      }

      if (emergencyOnly) {
        filtered = filtered.filter((w) => w.emergencyService);
      }

      if (maxHourlyRate < 2000) {
        filtered = filtered.filter((w) => w.hourlyRate <= maxHourlyRate);
      }

      setWorkers(filtered);
      setLoading(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [q, selectedCategory, selectedDistrict, selectedTehsil, minTrust, minRating, emergencyOnly, maxHourlyRate]);

  const handleVoiceSearch = () => {
    setIsListening(true);
    setVoiceBanner("Listening for voice search (Pashto / Urdu)...");
    setTimeout(() => {
      setVoiceBanner("Detected: 'سوات میں سولر ٹیکنیشن چاہیے'");
      setSelectedCategory("Solar Technician");
      setSelectedDistrict("Swat");
      setQ("Solar");
      setTimeout(() => {
        setIsListening(false);
        setVoiceBanner("");
      }, 1500);
    }, 1200);
  };

  const handleReset = () => {
    setQ("");
    setSelectedCategory("All");
    setSelectedDistrict("All");
    setSelectedTehsil("All");
    setMinTrust(0);
    setMinRating(0);
    setEmergencyOnly(false);
    setMaxHourlyRate(2000);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-3xl sm:text-4xl text-[#201a14] dark:text-[#f1ead9]">
              Local Service Marketplace
            </h1>
            <Badge tone="brass">{workers.length} Vouched Workers</Badge>
          </div>
          <p className="text-xs sm:text-sm text-[#6b5f4f] dark:text-[#afa491] mt-1">
            Search vetted craftsmen by province, district, elder vouches, and emergency availability.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="bg-[#efe4cf] dark:bg-[#1c2e2a] p-1 rounded-xl flex items-center border border-[#e4d5b8] dark:border-[#2c433d]">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                viewMode === "grid"
                  ? "bg-[#0f4c4c] text-white shadow-xs"
                  : "text-[#6b5f4f] dark:text-[#afa491]"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                viewMode === "map"
                  ? "bg-[#0f4c4c] text-white shadow-xs"
                  : "text-[#6b5f4f] dark:text-[#afa491]"
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>Map View</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Search & Quick Category Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6b5f4f]" />
            <input
              type="text"
              placeholder="Search by worker name, skill, area, or language (e.g. Rahim, Solar, Hayatabad)..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#fffbf3] dark:bg-[#1c2e2a] border border-[#e4d5b8] dark:border-[#2c433d] text-sm focus:outline-none focus:border-[#0f4c4c]"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6b5f4f] hover:text-black font-bold"
              >
                ✕
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={handleVoiceSearch}
            className={`px-4 py-2.5 rounded-xl border border-[#e4d5b8] dark:border-[#2c433d] text-xs font-bold flex items-center justify-center gap-1.5 transition ${
              isListening
                ? "bg-red-500 text-white animate-pulse"
                : "bg-[#efe4cf] dark:bg-[#1c2e2a] text-[#0f4c4c] dark:text-[#2c8b84] hover:bg-[#e4d5b8]"
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>{isListening ? "Listening..." : "Voice Search (Urdu/Pashto)"}</span>
          </button>
        </div>

        {voiceBanner && (
          <div className="p-3 bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-700 rounded-xl text-xs font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#c97f1e]" />
            <span>{voiceBanner}</span>
          </div>
        )}

        {/* Category Horizontal Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition ${
              selectedCategory === "All"
                ? "bg-[#0f4c4c] text-white shadow-sm"
                : "bg-[#fffbf3] dark:bg-[#1c2e2a] border border-[#e4d5b8] dark:border-[#2c433d] text-[#201a14] dark:text-[#f1ead9] hover:bg-[#efe4cf]"
            }`}
          >
            ✨ All Categories
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.slug}
              onClick={() => setSelectedCategory(c.name)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 flex items-center gap-1.5 transition ${
                selectedCategory === c.name
                  ? "bg-[#0f4c4c] text-white shadow-sm"
                  : "bg-[#fffbf3] dark:bg-[#1c2e2a] border border-[#e4d5b8] dark:border-[#2c433d] text-[#201a14] dark:text-[#f1ead9] hover:bg-[#efe4cf]"
              }`}
            >
              <span>{c.icon}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filter Toolbar Box */}
      <Card className="p-4 bg-[#fffbf3] dark:bg-[#1c2e2a] border border-[#e4d5b8] dark:border-[#2c433d] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 items-center text-xs">
        {/* District */}
        <div>
          <label className="text-[10px] uppercase font-bold text-[#6b5f4f] dark:text-[#afa491] block mb-1">
            District / City
          </label>
          <select
            value={selectedDistrict}
            onChange={(e) => {
              setSelectedDistrict(e.target.value);
              setSelectedTehsil("All");
            }}
            className="w-full bg-[#efe4cf] dark:bg-[#11201d] border border-[#e4d5b8] dark:border-[#2c433d] rounded-lg px-2.5 py-1.5 font-semibold text-[#201a14] dark:text-[#f1ead9]"
          >
            <option value="All">All Districts</option>
            {PAKISTAN_LOCATIONS.map((l) => (
              <option key={l.district} value={l.district}>
                {l.district} ({l.province === "Federal" ? "ICT" : "KP"})
              </option>
            ))}
          </select>
        </div>

        {/* Tehsil / Area */}
        <div>
          <label className="text-[10px] uppercase font-bold text-[#6b5f4f] dark:text-[#afa491] block mb-1">
            Tehsil / Union Council
          </label>
          <select
            value={selectedTehsil}
            onChange={(e) => setSelectedTehsil(e.target.value)}
            disabled={selectedDistrict === "All"}
            className="w-full bg-[#efe4cf] dark:bg-[#11201d] border border-[#e4d5b8] dark:border-[#2c433d] rounded-lg px-2.5 py-1.5 font-semibold text-[#201a14] dark:text-[#f1ead9] disabled:opacity-50"
          >
            {tehsils.map((t) => (
              <option key={t} value={t}>
                {t === "All" ? "All Areas in District" : t}
              </option>
            ))}
          </select>
        </div>

        {/* Trust Score Filter */}
        <div>
          <label className="text-[10px] uppercase font-bold text-[#6b5f4f] dark:text-[#afa491] block mb-1">
            Elder Trust Score
          </label>
          <select
            value={minTrust}
            onChange={(e) => setMinTrust(Number(e.target.value))}
            className="w-full bg-[#efe4cf] dark:bg-[#11201d] border border-[#e4d5b8] dark:border-[#2c433d] rounded-lg px-2.5 py-1.5 font-semibold text-[#201a14] dark:text-[#f1ead9]"
          >
            <option value={0}>Any Trust Score</option>
            <option value={90}>90+ (High Elder Standing)</option>
            <option value={95}>95+ (Master Jirga Level)</option>
          </select>
        </div>

        {/* Max Hourly Rate */}
        <div>
          <label className="text-[10px] uppercase font-bold text-[#6b5f4f] dark:text-[#afa491] block mb-1">
            Max Rate: Rs {maxHourlyRate}/hr
          </label>
          <input
            type="range"
            min={400}
            max={2000}
            step={100}
            value={maxHourlyRate}
            onChange={(e) => setMaxHourlyRate(Number(e.target.value))}
            className="w-full accent-[#0f4c4c] cursor-pointer"
          />
        </div>

        {/* Emergency Toggle */}
        <div className="flex items-center gap-2 pt-3">
          <input
            type="checkbox"
            id="emergency"
            checked={emergencyOnly}
            onChange={(e) => setEmergencyOnly(e.target.checked)}
            className="rounded text-[#0f4c4c] focus:ring-0 w-4 h-4 cursor-pointer"
          />
          <label htmlFor="emergency" className="text-xs font-bold cursor-pointer flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-current" />
            <span>24/7 Emergency</span>
          </label>
        </div>

        {/* Reset Filter Button */}
        <div className="flex justify-end pt-3">
          <button
            onClick={handleReset}
            className="text-xs font-bold text-[#a63a2e] hover:underline flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Filters</span>
          </button>
        </div>
      </Card>

      {/* Content Rendering: Grid vs Map */}
      {viewMode === "grid" ? (
        <div>
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="h-64 rounded-2xl bg-[#efe4cf]/60 dark:bg-[#1c2e2a]/60 animate-pulse border border-[#e4d5b8] dark:border-[#2c433d]"
                />
              ))}
            </div>
          ) : workers.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {workers.map((worker) => (
                <WorkerCard key={worker.id} worker={worker} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#fffbf3] dark:bg-[#1c2e2a] rounded-3xl border border-[#e4d5b8] dark:border-[#2c433d] p-8 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#efe4cf] text-2xl flex items-center justify-center mx-auto">
                🔍
              </div>
              <h3 className="font-display text-xl text-[#201a14] dark:text-[#f1ead9]">
                No vouched workers match these filters
              </h3>
              <p className="text-xs text-[#6b5f4f] dark:text-[#afa491] max-w-sm mx-auto">
                Try widening your search radius, selecting &ldquo;All Categories&rdquo;, or resetting your filters.
              </p>
              <Button variant="primary" onClick={handleReset} className="!text-xs">
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
      ) : (
        /* Map View Interactive Simulation */
        <div className="relative rounded-3xl overflow-hidden border-2 border-[#e4d5b8] dark:border-[#2c433d] bg-[#efe4cf] dark:bg-[#11201d] h-[600px] flex flex-col justify-between p-6 shadow-inner">
          <div className="bg-[#fffbf3]/90 dark:bg-[#1c2e2a]/90 backdrop-blur p-4 rounded-2xl border border-[#e4d5b8] dark:border-[#2c433d] max-w-sm z-10 shadow">
            <h4 className="font-bold text-xs uppercase tracking-wide text-[#0f4c4c] dark:text-[#2c8b84] flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#c97f1e]" />
              <span>Live Neighbourhood Radar</span>
            </h4>
            <p className="text-xs text-[#6b5f4f] dark:text-[#afa491] mt-1">
              Displaying {workers.length} verified tradesmen in active union councils around Peshawar, Mardan, and Swat.
            </p>
          </div>

          {/* Simulated Map Markers */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-96 h-96 rounded-full border border-dashed border-[#0f4c4c]/30 animate-pulse" />
            <div className="w-[500px] h-[500px] rounded-full border border-dashed border-[#c97f1e]/20" />
          </div>

          {/* Interactive Marker Pins */}
          <div className="absolute inset-0 p-8 grid grid-cols-3 gap-6 items-center pointer-events-auto">
            {workers.slice(0, 3).map((w, idx) => (
              <div
                key={w.id}
                className={`p-3 bg-[#fffbf3] dark:bg-[#1c2e2a] rounded-2xl border-2 border-[#0f4c4c] shadow-xl max-w-xs transform hover:scale-105 transition ${
                  idx === 0 ? "self-start justify-self-center" : idx === 1 ? "self-end justify-self-start" : "self-center justify-self-end"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#0f4c4c] text-[#e8a23d] flex items-center justify-center text-xs font-bold">
                    {w.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-xs text-[#201a14] dark:text-[#f1ead9] truncate">{w.name}</p>
                    <p className="text-[10px] text-[#6b5f4f] dark:text-[#afa491]">{w.category} · {w.area}</p>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] pt-1.5 border-t border-[#e4d5b8] dark:border-[#2c433d]">
                  <span className="font-mono font-bold text-[#0f4c4c] dark:text-[#2c8b84]">Rs {w.hourlyRate}/hr</span>
                  <a href={`/workers/${w.id}`} className="text-[#c97f1e] font-bold hover:underline">
                    View Profile →
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="self-end bg-[#fffbf3]/90 dark:bg-[#1c2e2a]/90 backdrop-blur px-4 py-2 rounded-xl text-xs text-[#6b5f4f] dark:text-[#afa491] z-10 border border-[#e4d5b8] dark:border-[#2c433d]">
            📍 OpenStreetMap & GPS Precision Enabled
          </div>
        </div>
      )}
    </main>
  );
}
