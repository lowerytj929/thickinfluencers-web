"use strict";

import { Shield, Lock, EyeOff } from "lucide-react";

export default function TrustSafety() {
  const features = [
    {
      icon: <Shield className="w-8 h-8 text-pink-500" />,
      title: "100% Secure Processing",
      description: "Your data and payments are fully encrypted and protected by industry-leading security standards."
    },
    {
      icon: <Lock className="w-8 h-8 text-pink-500" />,
      title: "Strict Privacy",
      description: "Your membership details are kept strictly confidential. We never share your information."
    },
    {
      icon: <EyeOff className="w-8 h-8 text-pink-500" />,
      title: "Discreet Billing",
      description: "Charges appear discreetly on your statement to protect your privacy completely."
    }
  ];

  return (
    <section className="py-24 px-4 bg-[#0A0508]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Trust & Safety</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">We take your privacy seriously. Enjoy our content with complete peace of mind.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-[#1A0A12] p-8 rounded-2xl border border-pink-900/20 text-center flex flex-col items-center hover:border-pink-900/50 transition-colors">
              <div className="w-16 h-16 bg-pink-900/20 rounded-full flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
