import Image from "next/image";
import Link from "next/link";
import type { Worker } from "@/types";
import { avatarUrl, stars } from "@/lib/utils";
import { Card, Badge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function WorkerCard({ worker }: { worker: Worker }) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex gap-3 items-start">
        <Image src={avatarUrl(worker.name)} alt={worker.name} width={56} height={56} className="rounded-2xl" />
        <div className="flex-1">
          <p className="font-bold leading-tight">{worker.name}</p>
          <p className="text-xs text-app-inkSoft">
            {worker.category} · {worker.city}
          </p>
          <p className="text-xs text-app-inkSoft">{worker.area}</p>
        </div>
        <Badge tone="brass">✓ {worker.trustScore}</Badge>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="font-bold text-brass">
          {stars(worker.rating)} <span className="text-app-inkSoft font-normal">{worker.rating}</span>
        </span>
        <span className="font-mono font-bold text-sm">Rs {worker.hourlyRate}/hr</span>
      </div>

      <div className="flex gap-2 mt-1">
        <Link href={`/workers/${worker.id}`} className="flex-1">
          <Button variant="ghost" className="w-full">
            View Profile
          </Button>
        </Link>
        <Button variant="primary" className="flex-1 !py-2 !text-sm">
          Book Now
        </Button>
      </div>
    </Card>
  );
}
