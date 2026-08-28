import { Card } from "@/components/ui/Card";

const STATS = [
  ["Earnings (month)", "Rs 42,300", "💰"],
  ["Active jobs", "3", "🚧"],
  ["Completed jobs", "214", "✅"],
  ["Pending offers", "5", "⏳"],
] as const;

export default function WorkerDashboard() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="font-display text-3xl mb-5">Worker Dashboard</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map(([label, value, icon]) => (
          <Card key={label} className="p-4">
            <p className="text-2xl">{icon}</p>
            <p className="font-mono text-xl font-bold mt-1">{value}</p>
            <p className="text-xs text-app-inkSoft">{label}</p>
          </Card>
        ))}
      </div>
    </main>
  );
}
