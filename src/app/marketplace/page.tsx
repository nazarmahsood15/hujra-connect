"use client";

import { useEffect, useState } from "react";
import type { Worker } from "@/types";
import { WorkerCard } from "@/components/WorkerCard";

const CITIES = ["All Cities", "Peshawar", "Mardan", "Swat", "Abbottabad"];

export default function MarketplacePage() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [q, setQ] = useState("");
  const [city, setCity] = useState("All Cities");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (city !== "All Cities") params.set("city", city);

    setLoading(true);
    fetch(`/api/workers?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => setWorkers(data.workers))
      .finally(() => setLoading(false));
  }, [q, city]);

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="font-display text-3xl mb-5">Marketplace</h1>

      <div className="flex flex-wrap gap-3 mb-6">
        <input
          className="border border-app-border rounded-xl px-3 py-2 w-64"
          placeholder="Search worker or skill..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className="border border-app-border rounded-xl px-3 py-2"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          {CITIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-app-inkSoft">Loading workers…</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {workers.map((w) => (
            <WorkerCard key={w.id} worker={w} />
          ))}
          {workers.length === 0 && <p className="text-app-inkSoft col-span-full">No workers match those filters.</p>}
        </div>
      )}
    </main>
  );
}
