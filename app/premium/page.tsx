"use client";

import { useState } from "react";
import { Crown, Check, Sparkles, ChevronDown, ChevronUp, ArrowRight, MessageCircle, Send, ExternalLink, Users, Zap, Shield } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    name: "FYP Access",
    price: "$10",
    period: "one-time",
    description: "FYP channel access with daily influencer drops and instant Telegram invite.",
    features: [
      "FYP channel access",
      "Daily content updates",
      "Instant Telegram invite",
    ],
    cta: "Get FYP Access",
    paymentLink: "https://square.link/u/2WEpsl0e?src=sheet",
    highlighted: false,
  },
  {
    name: "ThickVip",
    price: "$15",
    period: "one-time",
    description: "Premium VIP access to exclusive Telegram communities with daily content drops.",
    features: [
      "VIP Telegram channel access",
      "Exclusive content drops",
      "Premium community access",
      "Daily updates",
    ],
    cta: "Join ThickVip",
    paymentLink: "https://square.link/u/Rf9OsolT?src=sheet",
    highlighted: false,
  },
  {
    name: "ThickCenter+",
    price: "$25",
    period: "one-time",
    description: "Everything in ThickVip plus ThickCenter+ private channel and vault content.",
    features: [
      "Everything in ThickVip",
      "ThickCenter+ private access",
      "Premium vault content",
      "Priority support",
    ],
    cta: "Get ThickCenter+",
    paymentLink: "https://square.link/u/UYFxrabd?src=sheet",
    highlighted: false,
  },
  {
    name: "Full Bundle",
    price: "$35",
    period: "one-time",
    description: "Best value — get full access to everything across all tiers.",
    features: [
      "Everything in all tiers",
      "Full vault access",
      "All Telegram communities",
      "Lifetime access",
    ],
    cta: "Get Full Bundle",
    paymentLink: "https://square.link/u/FWjQoLfT?src=sheet",
    highlighted: true,
  },
];

const faqs = [
  {
    q: "How does access work?",
    a: "After completing your purchase, message @richballer1 on Telegram with proof of payment. You will receive a unique invite link granting immediate access to the private channels.",
  },
  {
    q: "How long does it take to gain access?",
    a: "Access is typically granted within minutes after you message the admin with your receipt.",
  },
  {
    q: "Is this a one-time purchase?",
    a: "Yes. Access is a one-time payment for the selected groups, until a subscription model is introduced.",
  },
  {
    q: "What payment methods are accepted?",
    a: "Payments are processed securely through Square. All major credit and debit cards are accepted.",
  },
  {
    q: "Is this legit?",
    a: "Yes. Our community spans over 200,000 members across Telegram and Reddit and continues to grow daily.",
  },
];

export default function PremiumPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden px-4 py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-pink/10 via-accent-purple/5 to-bg-primary pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent" />
        <div className="absolute bottom-0 left-1/3 right-1/3 h-48 bg-accent-pink/5 blur-[100px] rounded-full" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-gold/10 border border-accent-gold/20 mb-6">
            <Crown className="w-4 h-4 text-accent-gold" />
            <span className="text-xs font-semibold text-accent-gold tracking-widest uppercase">
              Vault Access
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-text-primary mb-6 leading-tight">
            Unlock{" "}
            <span className="bg-gradient-to-r from-accent-gold to-accent-pink bg-clip-text text-transparent">
              The Vault
            </span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-8">
            Join 200,000+ members getting daily influencer drops, exclusive content,
            and access to private Telegram communities.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-pink to-accent-purple text-white font-bold text-base rounded-xl hover:opacity-90 transition-all shadow-lg shadow-accent-pink/20"
            >
              <Sparkles className="w-5 h-5" />
              View Plans
            </a>
            <a
              href="https://t.me/+MPDBT1cPlFBjNTkx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#229ED9]/10 border border-[#229ED9]/30 text-white font-semibold rounded-xl hover:bg-[#229ED9]/20 transition-all"
            >
              <Send className="w-5 h-5 text-[#229ED9]" />
              Free Preview
            </a>
          </div>
        </div>
      </section>

      {/* ─── Telegram Community Preview ─── */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-[#229ED9]/10 to-accent-purple/10 border border-[#229ED9]/20 rounded-2xl p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#229ED9]/20 flex items-center justify-center shrink-0">
                <Send className="w-7 h-7 text-[#229ED9]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary">Free Telegram Previews</h3>
                <p className="text-sm text-text-secondary">See what's inside before you buy</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://t.me/+MPDBT1cPlFBjNTkx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#229ED9] text-white font-semibold text-sm rounded-xl hover:opacity-90 transition-all"
              >
                <Send className="w-4 h-4" />
                Join Free Preview
              </a>
              <a
                href="https://t.me/+IkQXd4SPd1VkMGJh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-text-primary font-semibold text-sm rounded-xl hover:bg-white/10 transition-all"
              >
                <Send className="w-4 h-4" />
                ForTheCulture Preview
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Pricing Cards ─── */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary text-center mb-4">
          Choose Your Access
        </h2>
        <p className="text-text-secondary text-center mb-12 max-w-xl mx-auto">
          One-time payment. Instant Telegram access after purchase.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`relative rounded-2xl border p-6 flex flex-col transition-all duration-300 ${
                tier.highlighted
                  ? "bg-gradient-to-b from-accent-gold/10 to-accent-pink/5 border-accent-gold/40 shadow-xl shadow-accent-gold/10 scale-[1.02]"
                  : "bg-bg-card border-border-dark hover:border-accent-pink/30"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-accent-gold to-accent-pink rounded-full text-[10px] font-bold text-white uppercase tracking-wider whitespace-nowrap">
                  Best Value 🔥
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-text-primary mb-2">{tier.name}</h3>
                <p className="text-sm text-text-secondary mb-4">{tier.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-text-primary">{tier.price}</span>
                  <span className="text-sm text-text-muted">{tier.period}</span>
                </div>
              </div>

              {/* Features */}
              <div className="flex-1 space-y-3 mb-6">
                {tier.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-accent-pink shrink-0 mt-0.5" />
                    <span className="text-sm text-text-secondary">{feature}</span>
                  </div>
                ))}
              </div>

              <a
                href={tier.paymentLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-sm rounded-xl transition-all ${
                  tier.highlighted
                    ? "bg-gradient-to-r from-accent-gold to-accent-pink text-white hover:opacity-90 shadow-lg shadow-accent-gold/20"
                    : "bg-white/5 border border-border-dark text-text-primary hover:bg-white/10 hover:border-accent-pink/30"
                }`}
              >
                {tier.cta}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* Payment Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-text-muted">
            💳 All payments processed securely via Square. After purchase, DM{" "}
            <a href="https://t.me/richballer1" target="_blank" rel="noopener noreferrer" className="text-accent-pink hover:underline">
              @richballer1
            </a> on Telegram with your receipt for instant access.
          </p>
        </div>
      </section>

      {/* ─── Stats Banner ─── */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-bg-card border border-border-dark rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Users, value: "200K+", label: "Telegram Members" },
              { icon: MessageCircle, value: "100K+", label: "Reddit Community" },
              { icon: Zap, value: "Daily", label: "Content Updates" },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i}>
                  <Icon className="w-8 h-8 text-accent-gold mx-auto mb-3" />
                  <div className="text-3xl font-black text-text-primary">{stat.value}</div>
                  <div className="text-sm text-text-muted mt-1">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary text-center mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: "1", title: "Choose Your VIP", desc: "Select the access package you want." },
            { step: "2", title: "Complete Payment", desc: "Finish the payment for the VIP you selected." },
            { step: "3", title: "Contact the Admin", desc: "Message @richballer1 on Telegram after purchasing." },
            { step: "4", title: "Get Instant Access", desc: "Receive your private invite link within seconds." },
          ].map((item, i) => (
            <div key={i} className="bg-bg-card border border-border-dark rounded-xl p-6 text-center">
              <div className="w-10 h-10 rounded-full bg-accent-pink/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-accent-pink">{item.step}</span>
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">{item.title}</h3>
              <p className="text-sm text-text-secondary">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Free Alternative ─── */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-accent-purple/10 to-accent-pink/10 border border-accent-purple/20 rounded-2xl p-8 md:p-10 text-center">
          <h3 className="text-xl font-bold text-text-primary mb-3">Free Alternative</h3>
          <p className="text-text-secondary mb-6 max-w-lg mx-auto">
            Not ready for VIP? Get free access to premium content through our free preview channel.
          </p>
          <a
            href="https://t.me/+nygE2-zAWX45MTFh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent-purple text-white font-bold text-base rounded-xl hover:opacity-90 transition-all shadow-lg shadow-accent-purple/20"
          >
            <Send className="w-5 h-5" />
            Join Free Channel
          </a>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="max-w-3xl mx-auto px-4 py-16 md:py-24 border-t border-border-dark">
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-text-secondary text-center mb-10">
          Everything you need to know about Vault access.
        </p>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-bg-card border border-border-dark rounded-xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-sm font-semibold text-text-primary pr-4">{faq.q}</span>
                {openFaq === i ? (
                  <ChevronUp className="w-4 h-4 text-accent-pink shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-text-muted shrink-0" />
                )}
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5">
                  <p className="text-sm text-text-secondary leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-r from-accent-gold/10 via-accent-pink/10 to-accent-purple/10 border border-accent-pink/20 rounded-2xl p-10 md:p-14">
          <Crown className="w-12 h-12 text-accent-gold mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
            Ready to Join the Vault?
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto mb-8">
            Join 200,000+ members getting daily exclusive content. Choose your plan above and get instant access.
          </p>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-gold to-accent-pink text-white font-bold text-base rounded-xl hover:opacity-90 transition-all shadow-lg shadow-accent-pink/20"
          >
            <Crown className="w-5 h-5" />
            View Plans
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}