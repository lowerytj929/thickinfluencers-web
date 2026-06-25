"use strict";

import { siteLinks } from "@/lib/site-links";
import { ArrowRight, Lock, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden px-4">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-pink-900/50 to-transparent" />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A0A12] border border-pink-900/50 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ShieldCheck className="w-4 h-4 text-pink-500" />
          <span className="text-sm font-medium text-pink-200">100% Secure & Private Access</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
          Your Private <br className="hidden md:block" />
          <span className="bg-clip-text bg-gradient-to-r from-pink-500 to-[#D91D5B] text-transparent">Influencer Vault</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
          200,000+ community reach across our network. Updated daily.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
          <Link
            href="/checkout/vault-pro"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#FFD700] to-[#FFEA00] text-black font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(255,215,0,0.2)] hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <Lock className="w-5 h-5" />
            Unlock Vault Access
          </Link>
          <Link
            href="https://t.me/+nygE2-zAWX45MTFh"
            className="w-full sm:w-auto px-8 py-4 bg-[#1A0A12] border border-pink-900/50 text-white font-semibold text-lg rounded-xl hover:bg-pink-900/20 transition-all flex items-center justify-center gap-2 group"
          >
            Get Free Preview
            <ArrowRight className="w-5 h-5 text-pink-500 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
