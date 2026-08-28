import Image from "next/image";
import { notFound } from "next/navigation";
import { getWorkerById } from "@/lib/mock-data";
import { avatarUrl, stars } from "@/lib/utils";
import { VouchChain } from "@/components/VouchChain";
import { Card, Badge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default async function WorkerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const worker = await getWorkerById(id);
  if (!worker) return notFound();

  return (
    <main className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-3 gap-5">
      <Card className="lg:col-span-2 p-6">
        <div className="flex gap-4">
          <Image src={avatarUrl(worker.name)} alt={worker.name} width={80} height={80} className="rounded-2xl" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl">{worker.name}</h1>
              <Badge tone="brass">✓ Verified</Badge>
            </div>
            <p className="text-app-inkSoft text-sm">
              {worker.category} · {worker.city}, {worker.area}
            </p>
            <p className="text-brass mt-1">
              {stars(worker.rating)} <span className="text-app-inkSoft">{worker.rating} ({worker.jobsCompleted} jobs)</span>
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed">{worker.bio}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {worker.languages.map((l) => (
            <Badge key={l} tone="teal" className="!bg-app-bgSoft !text-app-ink">
              {l}
            </Badge>
          ))}
        </div>
      </Card>

      <Card className="p-5 h-fit">
        <p className="text-xs uppercase font-bold text-app-inkSoft mb-3">Vouch Chain</p>
        <VouchChain vouches={worker.vouches} workerName={worker.name} />
        <div className="mt-4 flex justify-between text-sm">
          <span className="text-app-inkSoft">Trust score</span>
          <span className="font-mono font-bold text-brass">{worker.trustScore}/100</span>
        </div>
        <Button className="w-full mt-5">Book {worker.name.split(" ")[0]}</Button>
      </Card>
    </main>
  );
}
