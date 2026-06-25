"use strict";

import { siteLinks } from "@/lib/site-links";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function FreePreviewCTA() {
  return (
    <section className="py-24 px-4 w-full bg-gradient-to-b from-[#0A0508] to-[#1A0A12]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Still Undecided? <span className="text-pink-500">Get a Taste.</span>
        </h2>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Join our free preview Telegram channel and see what you're missing. Daily sneak peeks and updates straight to your phone.
        </p>
        
        <Link 
          href="https://t.me/+nygE2-zAWX45MTFh"
          className="inline-flex items-center gap-3 px-8 py-5 bg-[#229ED9] hover:bg-[#1E8CC0] text-white font-bold text-lg rounded-full transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(34,158,217,0.3)]"
        >
          <MessageCircle className="w-6 h-6" />
          Join Free Preview Channel
        </Link>
      </div>
    </section>
  );
}
