"use client";

import { useState } from "react";
import { Crown, Check, X, Sparkles, Shield, Zap, Download, Eye, Heart, Users, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    name: "Explorer",
    price: "$9.99",
    period: "/month",
    description: "Perfect for getting started with premium content.",
    features: [
      "Access to 50+ galleries",
      "Standard quality downloads",
      "Basic support",
      "Weekly content updates",
    ],
    excluded: [
      "Early access to new drops",
      "HD quality streaming",
      "Exclusive creator communities",
      "Ad-free experience",
    ],
    highlighted: false,
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: "$19.99",
    period: "/month",
    description: "For dedicated fans who want full access.",
    features: [
      "Access to 200+ galleries",
      "HD quality downloads",
      "Priority support",
      "Daily content updates",
      "Early access to new drops",
      "Ad-free experience",
    ],
    excluded: [
      "Exclusive creator communities",
      "Behind-the-scenes content",
    ],
    highlighted: true,
    cta: "Go Pro",
  },
  {
    name: "Premium",
    price: "$34.99",
    period: "/month",
    description: "The ultimate experience for true enthusiasts.",
    features: [
      "Unlimited gallery access",
      "HD quality downloads",
      "Priority support",
      "Daily content updates",
      "Early access to new drops",
      "Ad-free experience",
      "Exclusive creator communities",
      "Behind-the-scenes content",
    ],
    excluded: [],
    highlighted: false,
    cta: "Go Premium",
  },
  {
    name: "Lifetime",
    price: "$299",
    period: " one-time",
    description: "One payment. Forever access.",
    features: [
      "Unlimited gallery access",
      "HD quality downloads",
      "Priority support",
      "Daily content updates",
      "Early access to new drops",
      "Ad-free experience",
      "Exclusive creator communities",
      "Behind-the-scenes content",
      "Lifetime updates",
      "Special badge & recognition",
    ],
    excluded: [],
    highlighted: false,
    cta: "Get Lifetime",
  },
];

const featureComparison = [
  { feature: "Gallery Access", explorer: "50+", pro: "200+", premium: "Unlimited", lifetime: "Unlimited" },
  { feature: "Download Quality", explorer: "Standard", pro: "HD", premium: "HD", lifetime: "HD" },
  { feature: "Content Updates", explorer: "Weekly", pro: "Daily", premium: "Daily", lifetime: "Daily" },
  { feature: "Early Access", explorer: false, pro: true, premium: true, lifetime: true },
  { feature: "Ad-Free", explorer: false, pro: true, premium: true, lifetime: true },
  { feature: "Creator Communities", explorer: false, pro: false, premium: true, lifetime: true },
  { feature: "Behind-the-Scenes", explorer: false, pro: false, premium: true, lifetime: true },
  { feature: "Priority Support", explorer: false, pro: true, premium: true, lifetime: true },
  { feature: "Lifetime Access", explorer: false, pro: false, premium: false, lifetime: true },
];

const faqs = [
  {
    q: "What is Premium membership?",
    a: "Premium membership unlocks exclusive galleries, early access to new content, HD downloads, and an ad-free browsing experience. It is our way of supporting creators while giving you the best possible experience on the platform.",
  },
  {
    q: "How do I upgrade or downgrade my plan?",
    a: "You can change your membership plan at any time from your dashboard. Upgrades take effect immediately, while downgrades apply at the start of the next billing cycle.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period, after which your account will revert to the free tier.",
  },
  {
    q: "Is there a free trial?",
    a: "We occasionally offer free trials for new members. Check the current promotions on the sign-up page or follow us on social media for trial announcements.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept all major credit cards (Visa, Mastercard, American Express) as well as PayPal. All transactions are processed securely through our payment partners.",
  },
  {
    q: "Can I gift a membership to someone else?",
    a: "Yes, gift memberships are available. You can purchase a gift subscription for a friend or family member from the checkout page.",
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
              Premium Membership
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-text-primary mb-6 leading-tight">
            Unlock{" "}
            <span className="bg-gradient-to-r from-accent-gold to-accent-pink bg-clip-text text-transparent">
              Premium Access
            </span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-8">
            Choose the plan that fits your lifestyle. Get unlimited access to exclusive
            galleries, early releases, and a premium viewing experience.
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
              href="#faq"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-text-primary font-semibold rounded-xl hover:bg-white/10 transition-all"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* ─── Features Comparison ─── */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary text-center mb-4">
          Compare Plans
        </h2>
        <p className="text-text-secondary text-center mb-10 max-w-xl mx-auto">
          Find the perfect plan for your needs. All plans include access to our growing library of content.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-text-secondary">Feature</th>
                {["Explorer", "Pro", "Premium", "Lifetime"].map((name) => (
                  <th key={name} className="p-4 text-center text-sm font-bold text-text-primary">
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureComparison.map((row, i) => (
                <tr key={i} className="border-t border-border-dark">
                  <td className="p-4 text-sm text-text-secondary">{row.feature}</td>
                  {(["explorer", "pro", "premium", "lifetime"] as const).map((tier) => (
                    <td key={tier} className="p-4 text-center">
                      {typeof row[tier] === "boolean" ? (
                        row[tier] ? (
                          <Check className="w-5 h-5 text-accent-pink mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-text-muted mx-auto" />
                        )
                      ) : (
                        <span className="text-sm font-medium text-text-primary">{row[tier]}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ─── Pricing Cards ─── */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary text-center mb-4">
          Choose Your Membership
        </h2>
        <p className="text-text-secondary text-center mb-12 max-w-xl mx-auto">
          All prices in USD. Cancel anytime. Memberships auto-renew unless cancelled.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`relative rounded-2xl border p-6 flex flex-col transition-all duration-300 ${
                tier.highlighted
                  ? "bg-gradient-to-b from-accent-pink/10 to-accent-purple/5 border-accent-pink/40 shadow-xl shadow-accent-pink/10 scale-[1.02]"
                  : "bg-bg-card border-border-dark hover:border-accent-pink/30"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-accent-gold to-accent-pink rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                  Most Popular
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
                {tier.excluded.map((feature, j) => (
                  <div key={`ex-${j}`} className="flex items-start gap-3 opacity-40">
                    <X className="w-4 h-4 text-text-muted shrink-0 mt-0.5" />
                    <span className="text-sm text-text-muted">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href={`/checkout/${tier.name.toLowerCase()}`}
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-sm rounded-xl transition-all ${
                  tier.highlighted
                    ? "bg-gradient-to-r from-accent-pink to-accent-purple text-white hover:opacity-90 shadow-lg shadow-accent-pink/20"
                    : "bg-white/5 border border-border-dark text-text-primary hover:bg-white/10 hover:border-accent-pink/30"
                }`}
              >
                {tier.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Benefits Section ─── */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24 border-t border-border-dark">
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary text-center mb-12">
          Why Go Premium?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Eye, title: "Unlimited Viewing", desc: "Browse thousands of galleries with no restrictions or pay-per-view limits." },
            { icon: Download, title: "HD Downloads", desc: "Download your favorite content in the highest quality for offline viewing." },
            { icon: Shield, title: "Privacy First", desc: "Your membership and activity are completely private and secure." },
            { icon: Zap, title: "Early Access", desc: "Be the first to see new content drops before they are publicly released." },
            { icon: Heart, title: "Support Creators", desc: "Your membership directly supports the artists and photographers you love." },
            { icon: Users, title: "Community Access", desc: "Join exclusive creator communities and connect with fellow fans." },
          ].map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <div key={i} className="bg-bg-card border border-border-dark rounded-xl p-6 card-hover">
                <div className="w-12 h-12 rounded-lg bg-accent-pink/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-accent-pink" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">{benefit.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{benefit.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="max-w-3xl mx-auto px-4 py-16 md:py-24 border-t border-border-dark">
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-text-secondary text-center mb-10">
          Everything you need to know about Premium membership.
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
        <div className="bg-gradient-to-r from-accent-pink/10 via-accent-purple/5 to-transparent border border-accent-pink/20 rounded-2xl p-10 md:p-14">
          <Crown className="w-12 h-12 text-accent-gold mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
            Ready to Upgrade?
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto mb-8">
            Join thousands of members enjoying premium content. Choose your plan and start exploring today.
          </p>
          <Link
            href="/auth"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-gold to-accent-pink text-white font-bold text-base rounded-xl hover:opacity-90 transition-all shadow-lg shadow-accent-pink/20"
          >
            <Crown className="w-5 h-5" />
            Get Started Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}