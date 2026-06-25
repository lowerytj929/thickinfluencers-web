"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function AgeVerificationModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check local storage to see if user has already verified
    const isVerified = localStorage.getItem("age-verified");
    if (!isVerified) {
      // Block scrolling
      document.body.style.overflow = "hidden";
      setIsOpen(true);
    }
  }, []);

  const handleEnter = () => {
    localStorage.setItem("age-verified", "true");
    document.body.style.overflow = "auto";
    setIsOpen(false);
  };

  const handleExit = () => {
    window.location.href = "https://www.google.com";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="max-w-md w-full bg-[#1A0A12] border border-pink-900/50 rounded-2xl shadow-2xl overflow-hidden p-8 text-center animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-pink-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl font-bold text-pink-500">18+</span>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">Age Verification Required</h2>
        
        <p className="text-gray-300 mb-8 leading-relaxed">
          This site is intended for adults 18+ only. By entering, you confirm you are at least 18 years old and agree to view age-restricted content.
        </p>

        <div className="space-y-4">
          <button 
            onClick={handleEnter}
            className="w-full py-4 px-6 bg-gradient-to-r from-[#FFD700] to-[#FFEA00] text-black font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all transform hover:scale-[1.02]"
          >
            I am 18+ — Enter
          </button>
          
          <button 
            onClick={handleExit}
            className="w-full py-4 px-6 bg-transparent text-gray-400 font-semibold rounded-xl hover:text-white transition-colors"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
