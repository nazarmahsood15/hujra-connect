import Link from "next/link";
import { CATEGORIES, WORKERS } from "@/lib/mock-data";
import { VouchChain } from "@/components/VouchChain";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function LandingPage() {
  const featured = WORKERS[0];

  return (
    <main>
      <header className="max-w-7xl mx-auto flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-teal flex items-center justify-center text-marigold font-display text-xl">
            H
          </div>
          <span className="font-display text-2xl">Hujra Connect</span>
        </div>
        <Link href="/marketplace">
          <Button>Enter the Marketplace →</Button>
        </Link>
      </header>

      <section className="max-w-7xl mx-auto px-6 pt-10 pb-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="font-display text-5xl md:text-6xl leading-tight mt-4">
            Trusted hands,
            <br />
            vouched by your <span className="text-marigold">elders</span>.
          </h1>
          <p className="text-app-inkSoft mt-4 text-lg max-w-lg">
            A neighbourhood service marketplace where every worker is vouched for by an elder or imam before a
            customer ever meets them.
          </p>
          <div className="flex gap-3 mt-7">
            <Link href="/marketplace">
              <Button>Find a worker</Button>
            </Link>
          </div>
        </div>

        <Card className="p-6">
          <p className="text-xs font-bold uppercase tracking-wide text-app-inkSoft mb-4">
            The Vouch Chain — how trust is earned
          </p>
          <VouchChain vouches={featured.vouches} workerName={featured.name} />
        </Card>
      </section>

      <section className="bg-teal py-10">
        <div className="max-w-7xl mx-auto px-6 flex gap-3 overflow-x-auto">
          {CATEGORIES.map((c) => (
            <div key={c.name} className="shrink-0 w-24 text-center bg-white/10 border border-white/20 rounded-2xl p-3">
              <p className="text-2xl">{c.icon}</p>
              <p className="text-xs font-bold mt-1 text-white">{c.name}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
