'use client';

import { useEffect, useState } from 'react';
import { ShieldCheck } from 'lucide-react';

export default function AgeVerificationModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const verified = sessionStorage.getItem('ageVerified');
    if (!verified) {
      setVisible(true);
    }
  }, []);

  const handleYes = () => {
    sessionStorage.setItem('ageVerified', 'true');
    setVisible(false);
  };

  const handleNo = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-bg-card border border-border-dark rounded-2xl p-8 sm:p-10 max-w-md w-full mx-4 shadow-2xl animate-zoom-in">
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-accent-pink/10 flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-accent-pink" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-xl font-bold text-text-primary text-center mb-2">
          Age Verification
        </h2>

        {/* Description */}
        <p className="text-sm text-text-secondary text-center leading-relaxed mb-7">
          This platform contains media content intended for adults.
          Please confirm that you are at least 18 years of age to continue.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleYes}
            className="flex-1 btn-primary text-sm !py-3"
          >
            Yes, I am 18+
          </button>
          <button
            onClick={handleNo}
            className="flex-1 btn-secondary text-sm !py-3"
          >
            No, Leave Site
          </button>
        </div>

        <p className="text-center text-[11px] text-text-muted mt-5 leading-relaxed">
          Your choice is saved for this session only.
        </p>
      </div>
    </div>
  );
}