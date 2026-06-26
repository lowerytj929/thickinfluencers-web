"use strict";

import { ArrowRight, Flame, Search, TrendingUp, Crown } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden px-4">
      {/* Dark gradient background like erome/gotanynudes */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0d0a12] to-[#1a0a15] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-pink-800/30 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10 pt-24 md:pt-32">
        {/* Top bar - like erome's clean nav */}
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-600 to-purple-800 flex items-center justify-center">
              <span className="text-white font-black text-lg">V</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white/90">VAULT</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/models" className="text-gray-400 hover:text-white transition-colors">Models</Link>
            <Link href="/categories" className="text-gray-400 hover:text-white transition-colors">Categories</Link>
            <Link href="/checkout/vault-pro" className="px-5 py-2.5 bg-gradient-to-r from-pink-600 to-purple-700 text-white font-semibold rounded-lg hover:opacity-90 transition-all text-sm">
              Get Access
            </Link>
          </div>
        </div>

        {/* Hero Content - bold like gotanynudes headline */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <Flame className="w-4 h-4 text-pink-500" />
            <span className="text-xs font-medium text-gray-400 tracking-widest uppercase">200k+ Network Reach</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-4 leading-none">
            The Vault
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-xl mx-auto mb-8">
            Exclusive influencer content. Updated daily. Private access.
          </p>

          {/* Search bar - like gotanynudes/influencersgonewild */}
          <div className="max-w-md mx-auto relative mb-10">
            <div className="flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden focus-within:border-pink-800/50 focus-within:bg-white/[0.07] transition-all">
              <Search className="w-5 h-5 text-gray-500 ml-4 shrink-0" />
              <input
                type="text"
                placeholder="Search models..."
                className="w-full bg-transparent text-white px-3 py-3.5 text-sm outline-none placeholder:text-gray-600"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Content Grid - mimicking the leak sites' latest stories grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-pink-500" />
              <h2 className="text-sm font-semibold text-white/80 tracking-wider uppercase">Latest Drops</h2>
            </div>
            <div className="flex gap-3">
              <span className="text-xs text-pink-500/60 font-medium cursor-pointer hover:text-pink-400 transition-colors">Hot</span>
              <span className="text-xs text-gray-600 font-medium cursor-pointer hover:text-gray-400 transition-colors">Trending</span>
              <span className="text-xs text-gray-600 font-medium cursor-pointer hover:text-gray-400 transition-colors">New</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: "Amouranth", tag: "OnlyFans" },
              { name: "Natalie Roush", tag: "Exclusive" },
              { name: "Vicky Stark", tag: "OnlyFans" },
              { name: "Daisy Keech", tag: "Premium" },
            ].map((model, i) => (
              <div key={i} className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.06] hover:border-pink-800/30 transition-all cursor-pointer">
                {/* Placeholder gradient for model thumbnail */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 via-purple-900/10 to-black" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-sm font-semibold text-white">{model.name}</p>
                  <p className="text-[10px] text-pink-400/70 font-medium uppercase tracking-wider">{model.tag}</p>
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-600/80 text-white font-medium">View</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA - like erome's explore button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 pb-20">
          <Link
            href="/checkout/vault-pro"
            className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-pink-600 to-purple-700 text-white font-bold text-lg rounded-xl hover:opacity-90 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg shadow-pink-900/30"
          >
            <Crown className="w-5 h-5" />
            Unlock The Vault
          </Link>
          <Link
            href="https://t.me/+nygE2-zAWX45MTFh"
            className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-gray-300 font-semibold text-lg rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2 group"
          >
            Free Preview
            <ArrowRight className="w-5 h-5 text-pink-500 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}