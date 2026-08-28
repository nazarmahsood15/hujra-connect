import { BOOKINGS, WORKERS } from "@/lib/mock-data";
import { Card, Badge } from "@/components/ui/Card";
import Image from "next/image";
import { avatarUrl } from "@/lib/utils";

export default function CustomerDashboard() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="font-display text-3xl mb-5">My Bookings</h1>
      <div className="space-y-3">
        {BOOKINGS.map((b) => {
          const worker = WORKERS.find((w) => w.id === b.workerId)!;
          return (
            <Card key={b.id} className="flex items-center gap-3 p-4">
              <Image src={avatarUrl(worker.name)} alt={worker.name} width={44} height={44} className="rounded-xl" />
              <div className="flex-1">
                <p className="font-bold text-sm">{worker.name}</p>
                <p className="text-xs text-app-inkSoft">
                  {worker.category} · {worker.city}
                </p>
              </div>
              <Badge tone={b.status === "completed" ? "teal" : "marigold"}>{b.status.replace("_", " ")}</Badge>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
