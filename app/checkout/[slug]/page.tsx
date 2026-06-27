"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Crown, Loader2, AlertCircle, Shield, ArrowLeft, LogIn } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const tierInfo: Record<string, { name: string; price: string }> = {
  vault_access: { name: "Vault Access", price: "$15/mo" },
  vault_pro: { name: "Vault Pro", price: "$25/mo" },
};

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [status, setStatus] = useState<"loading" | "redirecting" | "error" | "needs-auth">(
    "loading"
  );
  const [errorMsg, setErrorMsg] = useState<string>("");
  const tier = tierInfo[slug];

  useEffect(() => {
    if (!slug) return;

    // Check if user is logged in first
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setStatus("needs-auth");
        return;
      }

      // User is logged in, proceed to checkout
      setStatus("redirecting");

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
          window.location.href = data.url;
        } else {
          throw new Error("No checkout URL returned");
        }
      } catch (err: any) {
        setErrorMsg(
          err.message || "Something went wrong. Please try again."
        );
        setStatus("error");
      }
    };

    const timer = setTimeout(checkAuth, 500);
    return () => clearTimeout(timer);
  }, [slug, router]);

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Back link */}
        <Link
          href="/premium"
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to plans
        </Link>

        <div className="bg-bg-card border border-border-dark rounded-2xl p-8 text-center">
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-accent-gold/10 flex items-center justify-center mx-auto mb-6">
            <Crown className="w-8 h-8 text-accent-gold" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            {status === "error"
              ? "Checkout Unavailable"
              : tier
              ? tier.name
              : "Premium Membership"}
          </h1>

          {tier && status !== "error" && (
            <p className="text-4xl font-extrabold text-text-primary mb-6">
              {tier.price}
            </p>
          )}

          {/* Status content */}
          {status === "loading" && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full bg-accent-pink/10 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-accent-pink animate-spin" />
                </div>
              </div>
              <p className="text-sm text-text-secondary">
                Preparing your secure checkout...
              </p>
            </div>
          )}

          {status === "redirecting" && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full bg-accent-gold/10 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-accent-gold animate-spin" />
                </div>
              </div>
              <p className="text-sm text-text-secondary">
                Redirecting to secure Stripe checkout...
              </p>
              <div className="w-full bg-bg-surface rounded-full h-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-accent-gold to-accent-pink rounded-full animate-pulse w-3/4" />
              </div>
            </div>
          )}

          {status === "needs-auth" && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full bg-accent-pink/10 flex items-center justify-center">
                  <LogIn className="w-6 h-6 text-accent-pink" />
                </div>
              </div>
              <p className="text-sm text-text-secondary">
                Please sign in or create an account to continue.
              </p>
              <Link
                href={`/auth?redirect=/checkout/${slug}`}
                className="w-full block py-3 bg-gradient-to-r from-accent-pink to-accent-purple text-white font-bold text-sm rounded-xl hover:opacity-90 transition-all text-center"
              >
                Sign In to Subscribe
              </Link>
              <Link
                href="/premium"
                className="w-full block py-3 bg-white/5 border border-border-dark text-text-primary font-semibold text-sm rounded-xl hover:bg-white/10 transition-all text-center"
              >
                Back to Plans
              </Link>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-400" />
                </div>
              </div>
              <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4">
                <p className="text-sm text-red-400">{errorMsg}</p>
                {errorMsg.toLowerCase().includes("stripe") ||
                errorMsg.toLowerCase().includes("configure") ? (
                  <p className="text-xs text-red-400/70 mt-2">
                    Stripe payments are not fully configured yet. Please try
                    again later or contact support.
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col gap-3 pt-2">
                <button
                  onClick={() => {
                    setStatus("redirecting");
                    setErrorMsg("");
                    fetch("/api/stripe/checkout", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ package_slug: slug }),
                    })
                      .then((r) => r.json())
                      .then((d) => {
                        if (d.url) window.location.href = d.url;
                        else throw new Error("No URL");
                      })
                      .catch((e) => {
                        setErrorMsg(e.message || "Retry failed");
                        setStatus("error");
                      });
                  }}
                  className="w-full py-3 bg-gradient-to-r from-accent-pink to-accent-purple text-white font-bold text-sm rounded-xl hover:opacity-90 transition-all"
                >
                  Try Again
                </button>
                <Link
                  href="/premium"
                  className="w-full py-3 bg-white/5 border border-border-dark text-text-primary font-semibold text-sm rounded-xl hover:bg-white/10 transition-all text-center"
                >
                  Back to Plans
                </Link>
              </div>
            </div>
          )}

          {/* Secure badge */}
          <div className="mt-8 pt-6 border-t border-border-dark">
            <p className="text-xs text-text-muted flex items-center justify-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              Secured by Stripe · 256-bit SSL encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}