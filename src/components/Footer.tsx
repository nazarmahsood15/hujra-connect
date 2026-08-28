import Link from "next/link";
import { ShieldCheck, HeartHandshake, Lock, PhoneCall, HelpCircle, FileText, CheckCircle2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0f4c4c] text-white border-t border-[#17706b] mt-20">
      {/* Trust banner */}
      <div className="border-b border-white/10 py-8 px-6 bg-black/10">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#e8a23d] shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#f1ead9]">Elder Vouch System</h4>
              <p className="text-xs text-white/70 mt-0.5">Every worker is vouched by a recognized community leader or imam.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#e8a23d] shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#f1ead9]">Escrow Protection</h4>
              <p className="text-xs text-white/70 mt-0.5">Funds stay locked safely until you inspect and approve the work.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#e8a23d] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#f1ead9]">CNIC & Face Verified</h4>
              <p className="text-xs text-white/70 mt-0.5">National identity card validation & local Union Council records.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#e8a23d] shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#f1ead9]">Voice-First & Local</h4>
              <p className="text-xs text-white/70 mt-0.5">Speak in Pashto or Urdu. No complex typing or literacy barrier.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
        <div className="col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#e8a23d] flex items-center justify-center text-[#0f4c4c] font-display text-xl font-bold">
              ح
            </div>
            <span className="font-display text-2xl tracking-tight text-[#f1ead9]">Hujra Connect</span>
          </div>
          <p className="text-xs text-white/80 max-w-sm leading-relaxed">
            Rebuilding trusted neighbourhood craftsmanship across Khyber Pakhtunkhwa and Pakistan. Rooted in traditional Hujra values, powered by modern escrow and AI-assisted matching.
          </p>
          <div className="pt-2 text-xs text-[#e8a23d]">
            📍 Headquartered in Peshawar · Serving Mardan, Swat, Abbottabad & beyond
          </div>
        </div>

        <div>
          <h5 className="font-bold text-xs uppercase tracking-wider text-[#e8a23d] mb-3">Marketplace</h5>
          <ul className="space-y-2 text-xs text-white/80">
            <li><Link href="/marketplace" className="hover:text-white transition">Browse Workers</Link></li>
            <li><Link href="/jobs/create" className="hover:text-white transition">Post a Job Request</Link></li>
            <li><Link href="/jobs" className="hover:text-white transition">Explore Active Jobs</Link></li>
            <li><Link href="/categories" className="hover:text-white transition">All Service Categories</Link></li>
            <li><Link href="/diaspora" className="hover:text-white transition">Diaspora Overseas Care</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-xs uppercase tracking-wider text-[#e8a23d] mb-3">Trust & Safety</h5>
          <ul className="space-y-2 text-xs text-white/80">
            <li><Link href="/vouches" className="hover:text-white transition">The Vouch Chain</Link></li>
            <li><Link href="/payments" className="hover:text-white transition">Escrow Protection</Link></li>
            <li><Link href="/disputes" className="hover:text-white transition">Dispute Resolution</Link></li>
            <li><Link href="/dashboard/admin" className="hover:text-white transition">Verification Queue</Link></li>
            <li><Link href="/help" className="hover:text-white transition">Elder Jirga Guidelines</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-xs uppercase tracking-wider text-[#e8a23d] mb-3">Company & Legal</h5>
          <ul className="space-y-2 text-xs text-white/80">
            <li><Link href="/about" className="hover:text-white transition">About Hujra Connect</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact & Helplines</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 px-6 text-center text-xs text-white/60">
        <p>© {new Date().getFullYear()} Hujra Connect. Made with honor for Pakistani communities.</p>
      </div>
    </footer>
  );
}
