"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    // If no sessionId, show error after a short delay
    if (!sessionId) {
      const t = setTimeout(() => setStatus("error"), 500);
      return () => clearTimeout(t);
    }

    // Refresh the session to get updated user data
    const refresh = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await supabase.auth.refreshSession();
      }
      // Wait a moment for webhook to process
      setTimeout(() => setStatus("success"), 1500);
    };

    refresh();
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        <div className="bg-bg-card border border-border-dark rounded-2xl p-8">
          {status === "loading" && (
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-accent-gold/10 flex items-center justify-center mx-auto">
                <Loader2 className="w-8 h-8 text-accent-gold animate-spin" />
              </div>
              <h1 className="text-xl font-bold text-text-primary">
                Processing your payment...
              </h1>
              <p className="text-sm text-text-secondary">
                Please wait while we confirm your subscription.
              </p>
            </div>
          )}

          {status === "success" && (
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-green-400" />
              </div>
              <h1 className="text-xl font-bold text-text-primary">
                Subscription Active! 🎉
              </h1>
              <p className="text-sm text-text-secondary">
                Your payment was successful and your membership is now active.
                Welcome to the Vault!
              </p>
              <Link
                href="/dashboard"
                className="block w-full py-3 bg-gradient-to-r from-accent-gold to-accent-pink text-white font-bold text-sm rounded-xl hover:opacity-90 transition-all mt-4"
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4 inline ml-1" />
              </Link>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8 text-red-400" />
              </div>
              <h1 className="text-xl font-bold text-text-primary">
                Something went wrong
              </h1>
              <p className="text-sm text-text-secondary">
                We couldn&apos;t verify your payment. If you were charged, please contact
                support at @richballer1 on Telegram.
              </p>
              <Link
                href="/premium"
                className="block w-full py-3 bg-accent-pink text-white font-bold text-sm rounded-xl hover:opacity-90 transition-all mt-4"
              >
                Try Again
              </Link>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-border-dark">
            <p className="text-xs text-text-muted">
              Having issues? Contact{" "}
              <a href="https://t.me/richballer1" className="text-accent-pink hover:underline">
                @richballer1
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-accent-pink animate-spin" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
