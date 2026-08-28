export type Role = "customer" | "worker" | "elder" | "admin";

export interface Vouch {
  role: "Elder" | "Imam" | "Senior Worker";
  name: string;
}

export interface Worker {
  id: string;
  name: string;
  category: string;
  city: string;
  area: string;
  hourlyRate: number;
  fixedPriceLabel: string;
  rating: number;
  trustScore: number;
  jobsCompleted: number;
  languages: string[];
  bio: string;
  vouches: Vouch[];
}

export interface Booking {
  id: string;
  workerId: string;
  customerName: string;
  status: "requested" | "accepted" | "en_route" | "in_progress" | "completed" | "cancelled";
  type: "instant" | "scheduled" | "emergency" | "repeat" | "monthly";
  createdAt: string;
}

export interface Category {
  name: string;
  icon: string;
}
