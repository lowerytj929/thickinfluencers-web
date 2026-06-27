"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import {
  LogOut,
  Package,
  CreditCard,
  ExternalLink,
  Loader2,
  User,
  Settings,
  Clock,
  ImageIcon,
  Crown,
  Bell,
  Shield,
  ChevronRight,
  Edit3,
} from "lucide-react";
import Link from "next/link";
import OnlyFansConnect from "@/components/shared/OnlyFansConnect";

interface Membership {
  id: string;
  package_id: string;
  is_active: boolean;
  started_at: string;
  telegram_invite_link?: string;
  packages?: { name: string; price_display?: string };
}

interface Order {
  id: string;
  package_name: string;
  amount_cents: number;
  status: string;
  created_at: string;
}

export default function DashboardPage() {
  console.log('📊 Dashboard rendering, loading:', true);
  const [user, setUser] = useState<any>(null);
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      console.log('📊 Dashboard useEffect started');
      const { data: { user } } = await supabase.auth.getUser();
      console.log('📊 getUser result:', user ? 'found' : 'null');
      if (!user) {
        setLoading(false);
        return;
      }
      setUser(user);

      const [memRes, ordRes] = await Promise.all([
        supabase
          .from("memberships")
          .select("*, packages(*)")
          .eq("user_id", user.id)
          .eq("is_active", true),
        supabase
          .from("orders")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(10),
      ]);

      setMemberships(memRes.data || []);
      setOrders(ordRes.data || []);
      setLoading(false);
    }
    load();
  }, [router, supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <Loader2 className="w-8 h-8 text-accent-pink animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-accent-pink/10 flex items-center justify-center mx-auto mb-6">
            <User className="w-8 h-8 text-accent-pink" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-3">Not Signed In</h1>
          <p className="text-text-secondary mb-8 text-sm">
            Sign up or sign in to access your dashboard, memberships, and vault content.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/auth"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-pink to-accent-purple text-white font-semibold rounded-xl hover:opacity-90 transition-all text-sm"
            >
              <User className="w-4 h-4" />
              Sign In
            </Link>
            <Link
              href="/auth?mode=signup"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-border-dark text-text-primary font-semibold rounded-xl hover:bg-white/10 transition-all text-sm"
            >
              <User className="w-4 h-4" />
              Create Account
            </Link>
          </div>
          <div className="mt-6">
            <Link href="/premium" className="text-sm text-accent-pink hover:underline">
              Browse premium plans without signing in →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* ─── Header ─── */}
      <header className="border-b border-border-dark bg-bg-surface/50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-text-primary">
            Dashboard
          </h1>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent-pink transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* ─── Profile Section ─── */}
        <section className="bg-bg-card border border-border-dark rounded-xl p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-pink/20 to-accent-purple/20 flex items-center justify-center ring-2 ring-border-dark shrink-0">
              {user?.email ? (
                <span className="text-2xl font-bold text-text-primary">
                  {user.email.charAt(0).toUpperCase()}
                </span>
              ) : (
                <User className="w-8 h-8 text-text-muted" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-text-primary truncate">
                {user?.email || "User"}
              </h2>
              <p className="text-sm text-text-muted">
                Member since {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}
              </p>
            </div>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-bg-surface border border-border-dark text-text-secondary text-sm rounded-lg hover:text-accent-pink hover:border-accent-pink/30 transition-all">
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </section>

        {/* ─── Active Memberships ─── */}
        <section>
          <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <Crown className="w-5 h-5 text-accent-gold" />
            Active Memberships
          </h2>
          {memberships.length === 0 ? (
            <div className="bg-bg-card border border-border-dark rounded-xl p-8 text-center">
              <Package className="w-12 h-12 text-text-muted mx-auto mb-4" />
              <p className="text-text-secondary mb-4">
                No active memberships yet
              </p>
              <Link
                href="/premium"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-pink to-accent-purple text-white font-semibold rounded-xl hover:opacity-90 transition-all"
              >
                <Crown className="w-4 h-4" />
                Browse Premium Plans
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {memberships.map((m) => (
                <div
                  key={m.id}
                  className="bg-bg-card border border-border-dark rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">
                      {m.packages?.name || m.package_id}
                    </h3>
                    <p className="text-sm text-text-muted">
                      Active since{" "}
                      {new Date(m.started_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-900/20 text-green-400 text-xs font-medium border border-green-900/30">
                      Active
                    </span>
                    {m.telegram_invite_link && (
                      <a
                        href={m.telegram_invite_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-accent-pink/10 text-accent-pink text-sm font-medium rounded-lg hover:bg-accent-pink/20 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Join Community
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ─── OnlyFans Connect ─── */}
        <section>
          <OnlyFansConnect />
        </section>

        {/* ─── Your Vault (for members) ─── */}
        {memberships.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
              <Crown className="w-5 h-5 text-accent-gold" />
              The Vault
            </h2>
            <div className="bg-bg-card border border-border-dark rounded-xl p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <p className="text-sm text-text-secondary">
                  You have access to premium vault content. Browse the latest galleries and exclusive drops.
                </p>
                <Link
                  href="/search"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-accent-pink to-accent-purple text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all shrink-0"
                >
                  <Crown className="w-4 h-4" />
                  Browse Vault
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {[
                  { title: "Summer Collection", badge: "New" },
                  { title: "Behind the Scenes", badge: "Premium" },
                  { title: "Nightlife Series", badge: "Trending" },
                  { title: "Portrait Masterclass", badge: null },
                  { title: "Travel Diary: Bali", badge: "Popular" },
                  { title: "Artistic Nudes", badge: "Premium" },
                ].map((item, i) => (
                  <Link
                    key={i}
                    href={`/gallery/${i + 1}`}
                    className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-bg-surface border border-border-dark hover:border-accent-pink/30 transition-all"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-pink/5 via-accent-purple/5 to-bg-surface" />
                    {item.badge && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-accent-pink/90 text-white text-[10px] font-bold uppercase tracking-wider rounded-md z-10">
                        {item.badge}
                      </span>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                      <p className="text-xs font-medium text-white">{item.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── Your Content (placeholder) ─── */}
        <section>
          <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-accent-pink" />
            Your Content
          </h2>
          <div className="bg-bg-card border border-border-dark rounded-xl p-8 text-center">
            <ImageIcon className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary mb-2 font-medium">No content yet</p>
            <p className="text-sm text-text-muted mb-4">
              Your saved galleries, favorites, and uploads will appear here.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-accent-pink hover:text-accent-pink/80 transition-colors font-medium"
            >
              Explore Galleries
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ─── Two columns: Recent Activity + Settings ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <section>
            <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent-pink" />
              Recent Activity
            </h2>
            {orders.length === 0 ? (
              <div className="bg-bg-card border border-border-dark rounded-xl p-6 text-center">
                <Clock className="w-10 h-10 text-text-muted mx-auto mb-3" />
                <p className="text-sm text-text-secondary">No recent activity</p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.slice(0, 5).map((o) => (
                  <div
                    key={o.id}
                    className="bg-bg-card border border-border-dark rounded-xl p-4 flex items-center justify-between"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-text-primary truncate">
                        {o.package_name}
                      </p>
                      <p className="text-xs text-text-muted">
                        {new Date(o.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-sm font-semibold text-text-primary">
                        ${(o.amount_cents / 100).toFixed(2)}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          o.status === "completed"
                            ? "bg-green-900/30 text-green-400"
                            : o.status === "pending"
                            ? "bg-yellow-900/30 text-yellow-400"
                            : "bg-red-900/30 text-red-400"
                        }`}
                      >
                        {o.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Settings / Account */}
          <section>
            <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-accent-pink" />
              Account Settings
            </h2>
            <div className="bg-bg-card border border-border-dark rounded-xl divide-y divide-border-dark">
              <Link
                href="/auth"
                className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-text-muted" />
                  <span className="text-sm text-text-secondary">Profile Information</span>
                </div>
                <ChevronRight className="w-4 h-4 text-text-muted" />
              </Link>
              <Link
                href="/premium"
                className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Crown className="w-4 h-4 text-text-muted" />
                  <span className="text-sm text-text-secondary">Manage Membership</span>
                </div>
                <ChevronRight className="w-4 h-4 text-text-muted" />
              </Link>
              <Link
                href="/privacy"
                className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-text-muted" />
                  <span className="text-sm text-text-secondary">Privacy Settings</span>
                </div>
                <ChevronRight className="w-4 h-4 text-text-muted" />
              </Link>
              <Link
                href="/auth"
                className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 text-text-muted" />
                  <span className="text-sm text-text-secondary">Notification Preferences</span>
                </div>
                <ChevronRight className="w-4 h-4 text-text-muted" />
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center justify-between w-full p-4 hover:bg-white/[0.02] transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <LogOut className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-red-400">Sign Out</span>
                </div>
                <ChevronRight className="w-4 h-4 text-text-muted" />
              </button>
            </div>
          </section>
        </div>

        {/* Order History Table */}
        {orders.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-accent-pink" />
              Order History
            </h2>
            <div className="bg-bg-card border border-border-dark rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border-dark text-text-muted">
                      <th className="text-left p-4 font-medium">Package</th>
                      <th className="text-left p-4 font-medium">Amount</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr
                        key={o.id}
                        className="border-b border-border-dark/50 text-text-primary"
                      >
                        <td className="p-4 font-medium">{o.package_name}</td>
                        <td className="p-4">${(o.amount_cents / 100).toFixed(2)}</td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded-full text-[10px] font-medium ${
                              o.status === "completed"
                                ? "bg-green-900/30 text-green-400"
                                : o.status === "pending"
                                ? "bg-yellow-900/30 text-yellow-400"
                                : "bg-red-900/30 text-red-400"
                            }`}
                          >
                            {o.status}
                          </span>
                        </td>
                        <td className="p-4 text-text-muted">
                          {new Date(o.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}