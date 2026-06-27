"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Mail, Lock, Eye, EyeOff, Globe, AlertCircle } from "lucide-react";
import Link from "next/link";

function AuthForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get("error");
  const success = searchParams.get("success");
  const redirectTo = searchParams.get("redirect") || "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const isSignUp = searchParams.get("mode") === "signup";
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        router.push(redirectTo);
      }
    });
  }, [supabase, router, redirectTo]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLocalError(null);

    try {
      if (isSignUp) {
        // Sign up via server API — auto-confirms
        const res = await fetch("/api/public/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Signup failed");
        // Session set via API response cookies — navigate
        router.push(data.redirect || redirectTo);
        router.refresh();
      } else {
        // Sign in directly via Supabase client
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw new Error(error.message);
        if (data?.user) {
          router.push(redirectTo);
          router.refresh();
        }
      }
    } catch (err: any) {
      setLocalError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-pink to-accent-purple flex items-center justify-center">
              <span className="text-white font-black text-lg">T</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-text-secondary">
            {isSignUp
              ? "Join the community and unlock exclusive content"
              : "Sign in to access your memberships"}
          </p>
        </div>

        {/* Social Auth Buttons */}
        <div className="space-y-3 mb-6">
          <button disabled className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-bg-surface border border-border-dark rounded-xl text-text-secondary text-sm font-medium hover:bg-white/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            <Globe className="w-5 h-5" />
            Continue with Google
          </button>
          <p className="text-center text-xs text-text-muted">Social sign-in coming soon</p>
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-dark" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-bg-primary px-4 text-text-muted">or continue with email</span>
          </div>
        </div>

        {/* Error / Success Messages */}
        {(localError || error) && (
          <div className="mb-4 flex items-start gap-3 p-4 rounded-xl text-sm bg-red-900/20 border border-red-900/30 text-red-400">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{localError || error}</span>
          </div>
        )}
        {success && (
          <div className="mb-4 flex items-start gap-3 p-4 rounded-xl text-sm bg-green-900/20 border border-green-900/30 text-green-400">
            <span>{success}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleAuth} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-11 pl-10 pr-4 bg-bg-surface border border-border-dark rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-pink/50 focus:ring-1 focus:ring-accent-pink/20 transition-all"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full h-11 pl-10 pr-11 bg-bg-surface border border-border-dark rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-pink/50 focus:ring-1 focus:ring-accent-pink/20 transition-all"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-gradient-to-r from-accent-pink to-accent-purple text-white font-bold text-sm rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-accent-pink/20"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
            ) : isSignUp ? (
              "Create Account"
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Toggle */}
        <div className="mt-6 text-center">
          <Link
            href={`/auth${isSignUp ? "" : "?mode=signup"}${redirectTo !== "/dashboard" ? `?${isSignUp ? "" : "&"}redirect=${encodeURIComponent(redirectTo)}` : ""}`}
            className="text-accent-pink hover:text-accent-pink/80 text-sm font-medium transition-colors"
          >
            {isSignUp
              ? "Already have an account? Sign in"
              : "Don't have an account? Sign up"}
          </Link>
        </div>

        {/* Legal */}
        <p className="mt-8 text-center text-xs text-text-muted">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="text-accent-pink hover:underline">Terms of Service</Link>
          {" "}and{" "}
          <Link href="/privacy" className="text-accent-pink hover:underline">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <Loader2 className="w-8 h-8 text-accent-pink animate-spin" />
      </div>
    }>
      <AuthForm />
    </Suspense>
  );
}