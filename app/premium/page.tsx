"use client";

import { useState } from "react";
import {
  Crown,
  Check,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Loader2,
  Send,
  CreditCard,
  Shield,
  Lock,
} from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    slug: "vault_access",
    name: "Vault Access",
    price: "$15",
    period: "/month",
    description:
      "Full access to the Vault — all galleries, exclusive drops, and the inner circle.",
    features: [
      "Unlimited gallery access",
      "Exclusive content drops",
      "HD quality viewing",
      "Ad-free experience",
      "Community access",
    ],
    popular: false,
  },
  {
    slug: "vault_pro",
    name: "Vault Pro",
    price: "$25",
    period: "/month",
    description:
      "Everything in Vault Access plus priority content, early access, and premium support.",
    features: [
      "Everything in Vault Access",
      "Early access to new content",
      "Priority support",
      "Pro-only exclusive vault",
      "First access to drops",
      "Premium badge",
    ],
    popular: true,
  },
];

const faqs = [
  {
    q: "How does billing work?",
    a: "Subscriptions are billed monthly and recur automatically until canceled. You can cancel anytime from your dashboard — no questions asked.",
  },
  {
    q: "What payment methods are accepted?",
    a: "Payments are processed securely through Stripe. All major credit and debit cards are accepted. Apple Pay and Google Pay are supported where available.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. You can cancel your subscription at any time from your account settings. Access continues until the end of your current billing period.",
  },
  {
    q: "Is my payment information secure?",
    a: "Absolutely. All payments are handled directly by Stripe using industry-standard encryption. We never store your full card details on our servers.",
  },
  {
    q: "What happens after I subscribe?",
    a: "Once your payment is confirmed, premium content unlocks immediately across the platform. You'll also get access to exclusive Telegram channels.",
  },
  {
    q: "Is there a free trial?",
    a: "Check out our free Telegram preview channel to see what's inside before committing to a subscription.",
  },
];

export default function PremiumPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (slug: string) => {
    setLoadingSlug(slug);
    setError(null);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ package_slug: slug }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data.error || data.message || "Failed to start checkout"
        );
      }

      const data = await res.json();

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setLoadingSlug(null);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden px-4 py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-pink/10 via-accent-gold/5 to-bg-primary pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent" />
        <div className="absolute bottom-0 left-1/3 right-1/3 h-48 bg-accent-gold/5 blur-[100px] rounded-full" />

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
              The Vault
            </span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-8">
            Behind the vault doors lies the empire&apos;s finest collection. Go beyond
            the previews — unlock every gallery, exclusive drops, and the inner
            circle with a premium membership.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#pricing"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-pink to-accent-purple text-white font-bold text-base rounded-xl hover:opacity-90 transition-all shadow-lg shadow-accent-pink/20"
            >
              <Sparkles className="w-5 h-5" />
              View Plans
            </Link>
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

      {/* ─── Pricing Cards ─── */}
      <section
        id="pricing"
        className="max-w-5xl mx-auto px-4 py-16 md:py-24"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary text-center mb-4">
          Choose Your Plan
        </h2>
        <p className="text-text-secondary text-center mb-12 max-w-xl mx-auto">
          Monthly subscription. Cancel anytime. Unlock everything the vault has
          to offer.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`relative rounded-2xl border p-8 flex flex-col transition-all duration-300 ${
                tier.popular
                  ? "bg-gradient-to-b from-accent-gold/10 to-accent-pink/5 border-accent-gold/40 shadow-xl shadow-accent-gold/10 scale-[1.02] md:scale-105"
                  : "bg-bg-card border-border-dark hover:border-accent-pink/30"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-accent-gold to-accent-pink rounded-full text-[10px] font-bold text-white uppercase tracking-wider whitespace-nowrap">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-text-primary mb-1">
                  {tier.name}
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  {tier.description}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-text-primary">
                    {tier.price}
                  </span>
                  <span className="text-sm text-text-muted">
                    {tier.period}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="flex-1 space-y-3 mb-8">
                {tier.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <Check
                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                        tier.popular ? "text-accent-gold" : "text-accent-pink"
                      }`}
                    />
                    <span className="text-sm text-text-secondary">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Subscribe Button */}
              <button
                onClick={() => handleSubscribe(tier.slug)}
                disabled={loadingSlug === tier.slug}
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-4 font-bold text-sm rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
                  tier.popular
                    ? "bg-gradient-to-r from-accent-gold to-accent-pink text-white hover:opacity-90 shadow-lg shadow-accent-gold/20"
                    : "bg-white/5 border border-border-dark text-text-primary hover:bg-white/10 hover:border-accent-pink/30"
                }`}
              >
                {loadingSlug === tier.slug ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Redirecting...
                  </>
                ) : (
                  <>
                    <Crown className="w-4 h-4" />
                    Subscribe Now
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-6 max-w-md mx-auto text-center">
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4">
              <p className="text-sm text-red-400">
                {error}
              </p>
              {error.toLowerCase().includes("stripe") ||
              error.toLowerCase().includes("configure") ? (
                <p className="text-xs text-red-400/70 mt-2">
                  Stripe payments are not fully configured yet. Please try again
                  later or contact support.
                </p>
              ) : null}
            </div>
          </div>
        )}

        {/* Payment Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-text-muted flex items-center justify-center gap-2">
            <Shield className="w-4 h-4 text-accent-gold" />
            Secured by Stripe · All major cards accepted
          </p>
        </div>
      </section>

      {/* ─── Stats Banner ─── */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-bg-card border border-border-dark rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Crown, value: "200K+", label: "Vault Members" },
              { icon: Lock, value: "10K+", label: "Premium Galleries" },
              { icon: CreditCard, value: "Daily", label: "Content Updates" },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i}>
                  <Icon className="w-8 h-8 text-accent-gold mx-auto mb-3" />
                  <div className="text-3xl font-black text-text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-text-muted mt-1">
                    {stat.label}
                  </div>
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
            {
              step: "1",
              title: "Choose Your Plan",
              desc: "Select Vault Access or Vault Pro.",
            },
            {
              step: "2",
              title: "Secure Checkout",
              desc: "Pay securely through Stripe in seconds.",
            },
            {
              step: "3",
              title: "Instant Access",
              desc: "Premium content unlocks immediately.",
            },
            {
              step: "4",
              title: "Join the Inner Circle",
              desc: "Access exclusive Telegram channels.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-bg-card border border-border-dark rounded-xl p-6 text-center"
            >
              <div className="w-10 h-10 rounded-full bg-accent-pink/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-accent-pink">
                  {item.step}
                </span>
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-text-secondary">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section
        id="faq"
        className="max-w-3xl mx-auto px-4 py-16 md:py-24 border-t border-border-dark"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary text-center mb-4">
          Payments & Billing FAQ
        </h2>
        <p className="text-text-secondary text-center mb-10">
          Everything you need to know about subscriptions and payments.
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
                <span className="text-sm font-semibold text-text-primary pr-4">
                  {faq.q}
                </span>
                {openFaq === i ? (
                  <ChevronUp className="w-4 h-4 text-accent-pink shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-text-muted shrink-0" />
                )}
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5">
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {faq.a}
                  </p>
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
            Ready to Enter the Vault?
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto mb-8">
            Join thousands of members getting daily exclusive content. Pick your
            plan above and unlock everything.
          </p>
          <Link
            href="#pricing"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-gold to-accent-pink text-white font-bold text-base rounded-xl hover:opacity-90 transition-all shadow-lg shadow-accent-pink/20"
          >
            <Crown className="w-5 h-5" />
            View Plans
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}