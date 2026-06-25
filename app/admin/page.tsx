"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import {
  Package,
  Users,
  CreditCard,
  Settings,
  Loader2,
} from "lucide-react";

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState<any>({});
  const [orders, setOrders] = useState<any[]>([]);
  const [memberships, setMemberships] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [tab, setTab] = useState("orders");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/auth"); return; }
      setUser(user);

      // Check if admin
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();

      if (!profile?.is_admin) {
        router.push("/dashboard");
        return;
      }
      setIsAdmin(true);

      // Load data
      const [ordRes, memRes, pkgRes] = await Promise.all([
        supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(50),
        supabase.from("memberships").select("*, profiles(username), packages(name)").limit(50),
        supabase.from("packages").select("*").order("price_cents"),
      ]);

      setOrders(ordRes.data || []);
      setMemberships(memRes.data || []);
      setPackages(pkgRes.data || []);

      // Stats
      const totalRevenue = (ordRes.data || [])
        .filter(o => o.status === "completed")
        .reduce((sum, o) => sum + o.amount_cents, 0);

      setStats({
        totalOrders: (ordRes.data || []).length,
        completedOrders: (ordRes.data || []).filter(o => o.status === "completed").length,
        pendingOrders: (ordRes.data || []).filter(o => o.status === "pending").length,
        activeMemberships: (memRes.data || []).filter(m => m.is_active).length,
        totalRevenue,
      });

      setLoading(false);
    }
    load();
  }, []);

  const grantAccess = async (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const { error } = await supabase.from("orders").update({ status: "completed", access_granted: true }).eq("id", orderId);
    if (error) return;

    // Also create membership
    await supabase.from("memberships").upsert({
      user_id: order.user_id,
      package_id: order.package_id,
      is_active: true,
    }, { onConflict: "user_id,package_id" });

    // Refresh
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0508]">
        <Loader2 className="w-8 h-8 text-pink-500 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) return null;

  const tabs = [
    { id: "orders", label: "Orders", icon: CreditCard },
    { id: "members", label: "Members", icon: Users },
    { id: "packages", label: "Packages", icon: Package },
    { id: "settings", label: "Config", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0A0508]">
      <header className="border-b border-pink-900/20 bg-[#1A0A12]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-400">@{user.email}</span>
            <a href="/dashboard" className="text-pink-400 hover:text-pink-300">Dashboard</a>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Total Orders", value: stats.totalOrders },
          { label: "Completed", value: stats.completedOrders },
          { label: "Pending", value: stats.pendingOrders },
          { label: "Active Members", value: stats.activeMemberships },
          { label: "Revenue", value: `$${(stats.totalRevenue / 100).toFixed(2)}` },
        ].map((s) => (
          <div key={s.label} className="bg-[#1A0A12] border border-pink-900/20 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{s.value}</div>
            <div className="text-xs text-gray-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 border-b border-pink-900/20">
        <div className="flex gap-6">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`pb-3 flex items-center gap-2 text-sm font-medium border-b-2 transition-colors ${
                tab === t.id
                  ? "text-pink-500 border-pink-500"
                  : "text-gray-400 border-transparent hover:text-white"
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Orders Tab */}
        {tab === "orders" && (
          <div className="bg-[#1A0A12] border border-pink-900/20 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-pink-900/20 text-gray-400">
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">Package</th>
                  <th className="text-left p-3">Amount</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Access</th>
                  <th className="text-left p-3">Date</th>
                  <th className="text-left p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-pink-900/10 text-white">
                    <td className="p-3">{o.payer_email || o.user_id?.slice(0, 8)}</td>
                    <td className="p-3">{o.package_name}</td>
                    <td className="p-3">${(o.amount_cents / 100).toFixed(2)}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        o.status === "completed" ? "bg-green-900/30 text-green-400" :
                        o.status === "pending" ? "bg-yellow-900/30 text-yellow-400" :
                        "bg-red-900/30 text-red-400"
                      }`}>{o.status}</span>
                    </td>
                    <td className="p-3">
                      {o.access_granted ? (
                        <span className="text-green-400">✓</span>
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </td>
                    <td className="p-3 text-gray-400">{new Date(o.created_at).toLocaleDateString()}</td>
                    <td className="p-3">
                      {o.status === "pending" && (
                        <button
                          onClick={() => grantAccess(o.id)}
                          className="px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Grant Access
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Packages Tab */}
        {tab === "packages" && (
          <div className="grid gap-4">
            {packages.map((p) => (
              <div key={p.id} className="bg-[#1A0A12] border border-pink-900/30 rounded-xl p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">{p.name}</h3>
                  <p className="text-sm text-gray-400">{p.price_display}</p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={p.telegram_link || "#"}
                    target="_blank"
                    className="text-sm text-pink-400 hover:text-pink-300"
                  >
                    Telegram Link
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Members Tab */}
        {tab === "members" && (
          <div className="bg-[#1A0A12] border border-pink-900/20 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-pink-900/20 text-gray-400">
                  <th className="text-left p-3">User</th>
                  <th className="text-left p-3">Package</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Since</th>
                </tr>
              </thead>
              <tbody>
                {memberships.map((m) => (
                  <tr key={m.id} className="border-b border-pink-900/10 text-white">
                    <td className="p-3">{m.profiles?.username || m.user_id?.slice(0, 8)}</td>
                    <td className="p-3">{m.packages?.name}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        m.is_active ? "bg-green-900/30 text-green-400" : "bg-gray-900/30 text-gray-400"
                      }`}>{m.is_active ? "Active" : "Inactive"}</span>
                    </td>
                    <td className="p-3 text-gray-400">{new Date(m.started_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Settings Tab */}
        {tab === "settings" && (
          <div className="bg-[#1A0A12] border border-pink-900/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Configuration</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <p><strong>Supabase:</strong> ✅ Connected</p>
              <p><strong>Telegram Bot:</strong> Token configured</p>
              <p><strong>Next Steps:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Run the SQL migration in Supabase dashboard</li>
                <li>Set up Telegram bot webhook to Railway</li>
                <li>Connect Stripe or Square API for automated payments</li>
                <li>Update package Telegram links in Supabase</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}