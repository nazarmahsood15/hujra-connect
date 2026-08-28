import Link from "next/link";
import { Card, Badge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { HeartHandshake, ShieldCheck, Lock, Globe2, Users, MapPin } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <Badge tone="brass">Our Origin & Vision</Badge>
        <h1 className="font-display text-4xl sm:text-5xl text-[#201a14] dark:text-[#f1ead9]">
          Rebuilding the Sacred Bond of the Hujra
        </h1>
        <p className="text-sm sm:text-base text-[#6b5f4f] dark:text-[#afa491] leading-relaxed">
          For generations across Khyber Pakhtunkhwa, the <em>Hujra</em> (حجره) served as the traditional community gathering place where trade masters were trained, disputes were amicably settled, and travellers were protected with honour.
        </p>
      </div>

      <Card className="p-8 sm:p-10 space-y-6 bg-[#fffbf3] dark:bg-[#1c2e2a] border-2 border-[#e4d5b8] dark:border-[#2c433d]">
        <h2 className="font-display text-2xl text-[#201a14] dark:text-[#f1ead9]">
          Why We Built Hujra Connect
        </h2>
        <p className="text-xs sm:text-sm text-[#201a14]/90 dark:text-[#f1ead9]/90 leading-relaxed">
          Modern online gig apps failed in Pakistan because they replaced trusted personal relationships with anonymous algorithms. Tradesmen were squeezed with exorbitant 20% platform commissions, while families were left vulnerable to unverified strangers entering their homes.
        </p>
        <p className="text-xs sm:text-sm text-[#201a14]/90 dark:text-[#f1ead9]/90 leading-relaxed">
          <strong>Hujra Connect changes the paradigm.</strong> We integrate genuine cultural accountability: every craftsman is endorsed by an active Union Council Elder or Mosque Imam. We provide 0% commission on worker labor, guaranteed escrow deposits via JazzCash and Easypaisa, and remote care tools for overseas Pakistanis in the diaspora.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-[#e4d5b8] dark:border-[#2c433d]">
          <div className="text-center">
            <span className="font-mono text-3xl font-bold text-[#0f4c4c] dark:text-[#2c8b84]">12+</span>
            <p className="text-xs text-[#6b5f4f] dark:text-[#afa491] mt-0.5">Districts in KP & Punjab</p>
          </div>
          <div className="text-center">
            <span className="font-mono text-3xl font-bold text-[#c97f1e]">100%</span>
            <p className="text-xs text-[#6b5f4f] dark:text-[#afa491] mt-0.5">CNIC & Biometric Cleared</p>
          </div>
          <div className="text-center">
            <span className="font-mono text-3xl font-bold text-[#0f4c4c] dark:text-[#2c8b84]">Rs 0</span>
            <p className="text-xs text-[#6b5f4f] dark:text-[#afa491] mt-0.5">Commission on Labor Wages</p>
          </div>
        </div>
      </Card>

      <div className="text-center space-y-4">
        <h3 className="font-display text-2xl text-[#201a14] dark:text-[#f1ead9]">
          Ready to experience trusted neighbourhood craftsmanship?
        </h3>
        <div className="flex justify-center gap-3">
          <Link href="/marketplace">
            <Button variant="primary" className="!py-2.5 !px-5 text-xs sm:text-sm font-bold">
              Explore Verified Workers →
            </Button>
          </Link>
          <Link href="/jobs/create">
            <Button variant="outline" className="!py-2.5 !px-5 text-xs sm:text-sm font-bold">
              Post a Service Job
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
