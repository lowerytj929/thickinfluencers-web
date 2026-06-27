"use strict";

import { siteLinks } from "@/lib/site-links";
import Link from "next/link";
import { Lock } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-[#050204] py-12 px-4 border-t border-pink-900/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-3 mb-2">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-[#ff007a] via-[#a855f7] to-[#00f2fe] p-[2px] shadow-[0_0_15px_rgba(255,0,122,0.5)]">
              <div className="flex items-center justify-center w-full h-full bg-[#0a0810] rounded-[6px]">
                <Lock className="w-4 h-4 text-pink-500" />
              </div>
            </div>
            <h3 className="text-2xl font-black bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-wider uppercase">THICK INFLUENCERS</h3>
          </div>
          <p className="text-sm text-gray-500 max-w-sm">The internet&apos;s premium uncensored vault for exclusive content.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <Link href={siteLinks.mainWebsite} className="text-gray-400 hover:text-pink-500 transition-colors">Main Website</Link>
          <Link href="#pricing" className="text-gray-400 hover:text-pink-500 transition-colors">Pricing</Link>
          <Link href={siteLinks.twitter} className="text-gray-400 hover:text-pink-500 transition-colors">Twitter (X)</Link>
          <Link href={siteLinks.redditCommunity} className="text-gray-400 hover:text-pink-500 transition-colors">Reddit</Link>
          <Link href="#support" className="text-gray-400 hover:text-pink-500 transition-colors">Support</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-pink-900/10 text-center text-xs text-gray-500 space-y-4">
        <p className="max-w-3xl mx-auto leading-relaxed">
          <strong>Compliance & Safety:</strong> This website is restricted to adults 18+ only. All models appearing on this website were 18 years or older at the time of photography/recording. All content must be legal, consensual, and approved. We strictly prohibit copyrighted or non-consensual material. By entering and using this site, you agree to our Terms of Service and Privacy Policy.
        </p>
        <p>
          &copy; {currentYear} Thick Influencers Vault. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
