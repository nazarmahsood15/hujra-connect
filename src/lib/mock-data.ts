import type { Worker, Category, Booking } from "@/types";

// NOTE: This file simulates what src/lib/db.ts (Prisma) will return once
// the backend is connected. Every function here is async on purpose, so
// swapping the body for a real `prisma.worker.findMany()` call later is
// a drop-in change — nothing that imports these functions needs to change.

export const CATEGORIES: Category[] = [
  { name: "Electrician", icon: "⚡" },
  { name: "Plumber", icon: "🚿" },
  { name: "Carpenter", icon: "🪚" },
  { name: "AC Repair", icon: "❄️" },
  { name: "Painter", icon: "🎨" },
  { name: "Mason", icon: "🧱" },
  { name: "Mechanic", icon: "🔧" },
  { name: "Tutor", icon: "📚" },
  { name: "Computer Repair", icon: "💻" },
  { name: "Solar Technician", icon: "☀️" },
];

export const WORKERS: Worker[] = [
  {
    id: "w1",
    name: "Rahim Gul",
    category: "Electrician",
    city: "Peshawar",
    area: "Hayatabad, UC-4",
    hourlyRate: 600,
    fixedPriceLabel: "Rs 2,500 fixed wiring job",
    rating: 4.9,
    trustScore: 96,
    jobsCompleted: 214,
    languages: ["Urdu", "Pashto"],
    bio: "14 years wiring homes and shops across Hayatabad. Specialises in solar-ready rewiring.",
    vouches: [
      { role: "Elder", name: "Haji Sher Bahadur" },
      { role: "Imam", name: "Qari Abdul Wahab" },
      { role: "Senior Worker", name: "Naseem Khan" },
    ],
  },
  {
    id: "w2",
    name: "Bakht Zada",
    category: "Plumber",
    city: "Mardan",
    area: "Sheikh Maltoon, UC-2",
    hourlyRate: 500,
    fixedPriceLabel: "Rs 1,800 fixed leak repair",
    rating: 4.7,
    trustScore: 91,
    jobsCompleted: 158,
    languages: ["Pashto", "Urdu"],
    bio: "Bathroom and kitchen plumbing, tank fitting, emergency leak response day or night.",
    vouches: [
      { role: "Elder", name: "Malik Fazal Rehman" },
      { role: "Imam", name: "Maulana Shamsher" },
      { role: "Senior Worker", name: "Rahim Gul" },
    ],
  },
  {
    id: "w3",
    name: "Shahid Iqbal",
    category: "AC Repair",
    city: "Peshawar",
    area: "University Town, UC-7",
    hourlyRate: 800,
    fixedPriceLabel: "Rs 3,000 fixed servicing",
    rating: 4.8,
    trustScore: 94,
    jobsCompleted: 97,
    languages: ["Urdu", "English"],
    bio: "Split & inverter AC servicing, gas refill, installation.",
    vouches: [
      { role: "Elder", name: "Haji Sher Bahadur" },
      { role: "Imam", name: "Qari Abdul Wahab" },
      { role: "Senior Worker", name: "Zarshad Khan" },
    ],
  },
];

export async function getWorkers(filters?: { city?: string; category?: string; q?: string }): Promise<Worker[]> {
  let list = WORKERS;
  if (filters?.city && filters.city !== "All Cities") list = list.filter((w) => w.city === filters.city);
  if (filters?.category) list = list.filter((w) => w.category === filters.category);
  if (filters?.q) {
    const q = filters.q.toLowerCase();
    list = list.filter((w) => w.name.toLowerCase().includes(q) || w.category.toLowerCase().includes(q));
  }
  return list;
}

export async function getWorkerById(id: string): Promise<Worker | undefined> {
  return WORKERS.find((w) => w.id === id);
}

export const BOOKINGS: Booking[] = [
  { id: "b1", workerId: "w1", customerName: "Ayesha Khan", status: "in_progress", type: "instant", createdAt: new Date().toISOString() },
  { id: "b2", workerId: "w2", customerName: "Ayesha Khan", status: "completed", type: "scheduled", createdAt: new Date().toISOString() },
];
