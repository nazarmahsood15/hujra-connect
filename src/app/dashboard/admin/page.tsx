import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const QUEUE = [
  { id: 1, name: "Sami Ullah", type: "Worker Verification", vouchedBy: "Haji Sher Bahadur (Elder)" },
  { id: 2, name: "Qari Abdul Wahab", type: "Imam Verification", vouchedBy: "Union Council Office" },
];

export default function AdminDashboard() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="font-display text-3xl mb-5">Verification Queue</h1>
      <div className="space-y-2">
        {QUEUE.map((q) => (
          <Card key={q.id} className="flex items-center gap-3 p-4">
            <div className="flex-1">
              <p className="font-bold text-sm">
                {q.name} <span className="text-xs text-app-inkSoft">· {q.type}</span>
              </p>
              <p className="text-xs text-app-inkSoft">Vouched by {q.vouchedBy}</p>
            </div>
            <Button variant="ghost">✅ Approve</Button>
            <Button variant="ghost">✕ Reject</Button>
          </Card>
        ))}
      </div>
    </main>
  );
}
