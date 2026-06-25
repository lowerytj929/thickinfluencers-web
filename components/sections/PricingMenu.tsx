"use strict";

import { Check } from "lucide-react";
import Link from "next/link";

const pricingTiers = [
  {
    name: "Vault Access",
    price: "$15",
    features: [
      "Full vault access",
      "Daily content updates",
      "Private Telegram community",
      "New drops notifications",
    ],
    link: "/checkout/vault-access",
    popular: false,
  },
  {
    name: "Vault Pro",
    price: "$25",
    features: [
      "Everything in Vault Access",
      "Content request priority",
      "Premium archives access",
      "Exclusive weekly drops",
      "Direct admin access",
      "Early access to new content",
    ],
    link: "/checkout/vault-pro",
    popular: true,
  },
];

export default function PricingMenu() {
  return (
    <section className="py-24 px-4 relative" id="pricing">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Choose Your Access Level</h2>
          <p className="text-gray-400 text-lg">Select the tier that fits your needs. Instant access upon payment.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative bg-[#1A0A12] rounded-2xl p-8 border ${
                tier.popular ? "border-pink-500 shadow-[0_0_30px_rgba(217,29,91,0.2)]" : "border-pink-900/30"
              } flex flex-col hover:-translate-y-2 transition-transform duration-300`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-600 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">{tier.price}</span>
                  <span className="text-gray-400">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-pink-500 shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={tier.link}
                className={`w-full py-4 px-6 rounded-xl font-bold text-center transition-all ${
                  tier.popular
                    ? "bg-gradient-to-r from-pink-600 to-pink-500 text-white hover:shadow-[0_0_20px_rgba(217,29,91,0.4)]"
                    : "bg-[#2A101C] text-pink-500 hover:bg-[#3A1626]"
                }`}
              >
                Get {tier.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
