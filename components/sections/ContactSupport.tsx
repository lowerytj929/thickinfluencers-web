"use strict";

import { siteLinks } from "@/lib/site-links";
import { Mail, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function ContactSupport() {
  return (
    <section className="py-24 px-4 bg-gradient-to-t from-[#0A0508] to-[#1A0A12] w-full" id="support">
      <div className="max-w-4xl mx-auto text-center">
        <div className="w-16 h-16 bg-pink-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <HelpCircle className="w-8 h-8 text-pink-500" />
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Need Assistance?</h2>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Our VIP support team is available to help you with your membership, billing, or technical issues.
        </p>
        
        <Link 
          href={siteLinks.adminTelegram}
          className="inline-flex items-center gap-3 px-8 py-4 bg-[#1A0A12] border border-pink-500/50 hover:bg-pink-900/30 text-white font-bold text-lg rounded-xl transition-all shadow-[0_0_15px_rgba(217,29,91,0.2)] hover:shadow-[0_0_25px_rgba(217,29,91,0.4)]"
        >
          <Mail className="w-5 h-5 text-pink-500" />
          Contact Support (@richballer1)
        </Link>
      </div>
    </section>
  );
}
