"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import {
  LogOut,
  Package,
  CreditCard,
  ExternalLink,
  Loader2,
} from "lucide-react";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [memberships, setMemberships] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth");
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
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0508]">
        <Loader2 className="w-8 h-8 text-pink-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0508]">
      {/* Header */}
      <header className="border-b border-pink-900/20 bg-[#1A0A12]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">My Vault</h1>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Active Memberships */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-pink-500" />
            Active Memberships
          </h2>
          {memberships.length === 0 ? (
            <div className="bg-[#1A0A12] border border-pink-900/20 rounded-xl p-8 text-center">
              <p className="text-gray-400 mb-4">
                No active memberships yet
              </p>
              <a
                href="/#pricing"
                className="inline-block px-6 py-3 bg-gradient-to-r from-pink-600 to-pink-500 text-white font-bold rounded-xl"
              >
                Browse Packages
              </a>
            </div>
          ) : (
            <div className="grid gap-4">
              {memberships.map((m) => (
                <div
                  key={m.id}
                  className="bg-[#1A0A12] border border-pink-900/30 rounded-xl p-6 flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {m.packages?.name || m.package_id}
                    </h3>
                    <p className="text-sm text-gray-400">
                      Since{" "}
                      {new Date(m.started_at).toLocaleDateString()}
                    </p>
                  </div>
                  {m.telegram_invite_link && (
                    <a
                      href={m.telegram_invite_link}
                      target="_blank"
                      className="flex items-center gap-2 px-4 py-2 bg-[#229ED9] text-white rounded-lg hover:bg-[#1E8CC0] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Join Telegram
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Recent Orders */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-pink-500" />
            Order History
          </h2>
          {orders.length === 0 ? (
            <p className="text-gray-400">No orders yet</p>
          ) : (
            <div className="bg-[#1A0A12] border border-pink-900/20 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-pink-900/20 text-gray-400">
                    <th className="text-left p-4">Package</th>
                    <th className="text-left p-4">Amount</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr
                      key={o.id}
                      className="border-b border-pink-900/10 text-white"
                    >
                      <td className="p-4">{o.package_name}</td>
                      <td className="p-4">${(o.amount_cents / 100).toFixed(2)}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
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
                      <td className="p-4 text-gray-400">
                        {new Date(o.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}