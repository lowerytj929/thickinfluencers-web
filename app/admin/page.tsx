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
  AlertTriangle,
  Flag,
  ImageIcon,
  Search,
  CheckCircle,
  XCircle,
  ChevronRight,
  ExternalLink,
  Shield,
  BarChart3,
} from "lucide-react";

type TabId = "content" | "orders" | "members" | "reports" | "settings";

interface Stats {
  totalUsers: number;
  totalGalleries: number;
  totalOrders: number;
  totalReports: number;
  totalRevenue: number;
  pendingOrders: number;
  activeMemberships: number;
}

interface ReportItem {
  id: string;
  reporter_id: string;
  content_id: string;
  reason: string;
  status: "pending" | "resolved" | "dismissed";
  created_at: string;
  profiles?: { username?: string };
}

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalGalleries: 0,
    totalOrders: 0,
    totalReports: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    activeMemberships: 0,
  });
  const [orders, setOrders] = useState<any[]>([]);
  const [memberships, setMemberships] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [tab, setTab] = useState<TabId>("orders");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/auth?redirect=/admin"); return; }
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
      const [ordRes, memRes, pkgRes, repRes, userCount, galCount] = await Promise.all([
        supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(50),
        supabase.from("memberships").select("*, profiles(username), packages(name)").limit(50),
        supabase.from("packages").select("*").order("price_cents"),
        supabase.from("reports").select("*, profiles(username)").order("created_at", { ascending: false }).limit(50),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("galleries").select("id", { count: "exact", head: true }),
      ]);

      setOrders(ordRes.data || []);
      setMemberships(memRes.data || []);
      setPackages(pkgRes.data || []);
      setReports(repRes.data || []);

      const totalRevenue = (ordRes.data || [])
        .filter(o => o.status === "completed")
        .reduce((sum, o) => sum + o.amount_cents, 0);

      setStats({
        totalUsers: userCount.count || 0,
        totalGalleries: galCount.count || 0,
        totalOrders: (ordRes.data || []).length,
        totalReports: (repRes.data || []).length,
        totalRevenue,
        pendingOrders: (ordRes.data || []).filter(o => o.status === "pending").length,
        activeMemberships: (memRes.data || []).filter(m => m.is_active).length,
      });

      setLoading(false);
    }
    load();
  }, []);

  const grantAccess = async (orderId: string) => {
    setActionLoading(orderId);
    const order = orders.find(o => o.id === orderId);
    if (!order) { setActionLoading(null); return; }

    const { error } = await supabase.from("orders").update({
      status: "completed",
      access_granted: true,
    }).eq("id", orderId);

    if (!error) {
      await supabase.from("memberships").upsert({
        user_id: order.user_id,
        package_id: order.package_id,
        is_active: true,
      }, { onConflict: "user_id,package_id" });
    }

    window.location.reload();
  };

  const handleReportAction = async (reportId: string, action: "resolved" | "dismissed") => {
    setActionLoading(reportId);
    await supabase.from("reports").update({ status: action }).eq("id", reportId);
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <Loader2 className="w-8 h-8 text-accent-pink animate-spin" />
      </div>
    );
  }

  if (!isAdmin) return null;

  const tabs: { id: TabId; label: string; icon: any }[] = [
    { id: "content", label: "Content", icon: ImageIcon },
    { id: "orders", label: "Orders", icon: CreditCard },
    { id: "members", label: "Members", icon: Users },
    { id: "reports", label: "Reports", icon: Flag },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* ─── Header ─── */}
      <header className="border-b border-border-dark bg-bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-accent-pink" />
            <h1 className="text-xl md:text-2xl font-bold text-text-primary">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-text-muted hidden sm:block">@{user?.email?.split("@")[0]}</span>
            <a href="/dashboard" className="text-accent-pink hover:text-accent-pink/80 transition-colors">
              Dashboard
            </a>
          </div>
        </div>
      </header>

      {/* ─── Stats Cards ─── */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { label: "Total Users", value: stats.totalUsers, icon: Users, color: "text-accent-purple" },
            { label: "Galleries", value: stats.totalGalleries, icon: ImageIcon, color: "text-accent-pink" },
            { label: "Orders", value: stats.totalOrders, icon: CreditCard, color: "text-accent-gold" },
            { label: "Pending", value: stats.pendingOrders, icon: AlertTriangle, color: "text-yellow-400" },
            { label: "Active Members", value: stats.activeMemberships, icon: Users, color: "text-green-400" },
            { label: "Reports", value: stats.totalReports, icon: Flag, color: "text-red-400" },
            { label: "Revenue", value: `$${(stats.totalRevenue / 100).toFixed(0)}`, icon: BarChart3, color: "text-accent-gold" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="bg-bg-card border border-border-dark rounded-xl p-4 text-center card-hover"
              >
                <Icon className={`w-5 h-5 mx-auto mb-2 ${s.color}`} />
                <div className="text-xl font-bold text-text-primary">{s.value}</div>
                <div className="text-[10px] text-text-muted mt-1 uppercase tracking-wider">{s.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Tab Navigation ─── */}
      <div className="max-w-7xl mx-auto px-4 border-b border-border-dark">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  tab === t.id
                    ? "text-accent-pink border-accent-pink"
                    : "text-text-muted border-transparent hover:text-text-secondary"
                }`}
              >
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Tab Content ─── */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* ── Content Tab ── */}
        {tab === "content" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-text-primary">Content Moderation</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search content..."
                  className="w-64 h-10 pl-10 pr-4 bg-bg-surface border border-border-dark rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-pink/30 transition-all"
                />
              </div>
            </div>
            <div className="bg-bg-card border border-border-dark rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border-dark text-text-muted">
                    <th className="text-left p-4 font-medium">Title</th>
                    <th className="text-left p-4 font-medium">Creator</th>
                    <th className="text-left p-4 font-medium">Type</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Reports</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { title: "Summer Collection 2025", creator: "Aria Mitchell", type: "Gallery", status: "Published", reports: 0 },
                    { title: "Behind the Scenes Vol. 3", creator: "Jade Rivera", type: "Gallery", status: "Published", reports: 1 },
                    { title: "Nightlife Series", creator: "Sofia Torres", type: "Gallery", status: "Flagged", reports: 3 },
                    { title: "Artistic Nudes Collection", creator: "Olivia Grant", type: "Gallery", status: "Under Review", reports: 2 },
                  ].map((item, i) => (
                    <tr key={i} className="border-b border-border-dark/50 text-text-primary">
                      <td className="p-4 font-medium">{item.title}</td>
                      <td className="p-4 text-text-secondary">{item.creator}</td>
                      <td className="p-4 text-text-secondary">{item.type}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${
                          item.status === "Published" ? "bg-green-900/30 text-green-400" :
                          item.status === "Flagged" ? "bg-red-900/30 text-red-400" :
                          "bg-yellow-900/30 text-yellow-400"
                        }`}>{item.status}</span>
                      </td>
                      <td className="p-4 text-text-secondary">{item.reports}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button className="px-3 py-1 bg-green-900/20 text-green-400 text-xs rounded-lg hover:bg-green-900/30 transition-colors">Approve</button>
                          <button className="px-3 py-1 bg-red-900/20 text-red-400 text-xs rounded-lg hover:bg-red-900/30 transition-colors">Remove</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Orders Tab ── */}
        {tab === "orders" && (
          <div>
            <h2 className="text-lg font-bold text-text-primary mb-4">Orders Management</h2>
            <div className="bg-bg-card border border-border-dark rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border-dark text-text-muted">
                      <th className="text-left p-4 font-medium">Email</th>
                      <th className="text-left p-4 font-medium">Package</th>
                      <th className="text-left p-4 font-medium">Amount</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Access</th>
                      <th className="text-left p-4 font-medium">Date</th>
                      <th className="text-left p-4 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-text-muted">
                          No orders found
                        </td>
                      </tr>
                    ) : (
                      orders.map((o) => (
                        <tr key={o.id} className="border-b border-border-dark/50 text-text-primary">
                          <td className="p-4">{o.payer_email || o.user_id?.slice(0, 8)}</td>
                          <td className="p-4">{o.package_name}</td>
                          <td className="p-4">${(o.amount_cents / 100).toFixed(2)}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${
                              o.status === "completed" ? "bg-green-900/30 text-green-400" :
                              o.status === "pending" ? "bg-yellow-900/30 text-yellow-400" :
                              "bg-red-900/30 text-red-400"
                            }`}>{o.status}</span>
                          </td>
                          <td className="p-4">
                            {o.access_granted ? (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            ) : (
                              <XCircle className="w-4 h-4 text-text-muted" />
                            )}
                          </td>
                          <td className="p-4 text-text-muted">{new Date(o.created_at).toLocaleDateString()}</td>
                          <td className="p-4">
                            {o.status === "pending" && (
                              <button
                                onClick={() => grantAccess(o.id)}
                                disabled={actionLoading === o.id}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent-pink text-white text-xs font-medium rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
                              >
                                {actionLoading === o.id ? (
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                ) : (
                                  <CheckCircle className="w-3 h-3" />
                                )}
                                Grant Access
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── Members Tab ── */}
        {tab === "members" && (
          <div>
            <h2 className="text-lg font-bold text-text-primary mb-4">Members Management</h2>
            <div className="bg-bg-card border border-border-dark rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border-dark text-text-muted">
                      <th className="text-left p-4 font-medium">User</th>
                      <th className="text-left p-4 font-medium">Package</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Since</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {memberships.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-text-muted">
                          No memberships found
                        </td>
                      </tr>
                    ) : (
                      memberships.map((m) => (
                        <tr key={m.id} className="border-b border-border-dark/50 text-text-primary">
                          <td className="p-4">{m.profiles?.username || m.user_id?.slice(0, 8)}</td>
                          <td className="p-4">{m.packages?.name || m.package_id}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${
                              m.is_active ? "bg-green-900/30 text-green-400" : "bg-gray-900/30 text-text-muted"
                            }`}>{m.is_active ? "Active" : "Inactive"}</span>
                          </td>
                          <td className="p-4 text-text-muted">{new Date(m.started_at).toLocaleDateString()}</td>
                          <td className="p-4">
                            <button className="px-3 py-1 bg-bg-surface border border-border-dark text-text-secondary text-xs rounded-lg hover:text-accent-pink transition-colors">
                              Manage
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── Reports Tab ── */}
        {tab === "reports" && (
          <div>
            <h2 className="text-lg font-bold text-text-primary mb-4">Reports Queue</h2>
            {reports.length === 0 ? (
              <div className="bg-bg-card border border-border-dark rounded-xl p-8 text-center">
                <Flag className="w-12 h-12 text-text-muted mx-auto mb-4" />
                <p className="text-text-secondary font-medium">No pending reports</p>
                <p className="text-sm text-text-muted mt-1">All reported content has been reviewed.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {reports.map((r) => (
                  <div
                    key={r.id}
                    className="bg-bg-card border border-border-dark rounded-xl p-5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                          <span className="text-sm font-semibold text-text-primary">
                            Report #{r.id.slice(0, 8)}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                            r.status === "pending" ? "bg-yellow-900/30 text-yellow-400" :
                            r.status === "resolved" ? "bg-green-900/30 text-green-400" :
                            "bg-gray-900/30 text-text-muted"
                          }`}>{r.status}</span>
                        </div>
                        <p className="text-sm text-text-secondary">
                          <span className="text-text-muted">Reason:</span> {r.reason}
                        </p>
                        <p className="text-xs text-text-muted mt-1">
                          Reporter: {r.profiles?.username || r.reporter_id?.slice(0, 8)} &middot;
                          Content ID: {r.content_id?.slice(0, 12)}... &middot;
                          {new Date(r.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        {r.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleReportAction(r.id, "resolved")}
                              disabled={actionLoading === r.id}
                              className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-900/20 text-green-400 text-xs font-medium rounded-lg hover:bg-green-900/30 transition-all disabled:opacity-50"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              Resolve
                            </button>
                            <button
                              onClick={() => handleReportAction(r.id, "dismissed")}
                              disabled={actionLoading === r.id}
                              className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-900/20 text-text-muted text-xs font-medium rounded-lg hover:bg-gray-900/30 transition-all disabled:opacity-50"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              Dismiss
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Settings Tab ── */}
        {tab === "settings" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-bg-card border border-border-dark rounded-xl p-6">
              <h3 className="text-lg font-bold text-text-primary mb-4">Platform Configuration</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-border-dark/50">
                  <span className="text-text-secondary">Supabase Connection</span>
                  <span className="flex items-center gap-1.5 text-green-400">
                    <CheckCircle className="w-4 h-4" /> Connected
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border-dark/50">
                  <span className="text-text-secondary">Telegram Bot</span>
                  <span className="flex items-center gap-1.5 text-green-400">
                    <CheckCircle className="w-4 h-4" /> Configured
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border-dark/50">
                  <span className="text-text-secondary">Payment Processor</span>
                  <span className="flex items-center gap-1.5 text-yellow-400">
                    <AlertTriangle className="w-4 h-4" /> Not Connected
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-text-secondary">CDN / Storage</span>
                  <span className="flex items-center gap-1.5 text-green-400">
                    <CheckCircle className="w-4 h-4" /> Active
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-bg-card border border-border-dark rounded-xl p-6">
              <h3 className="text-lg font-bold text-text-primary mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {[
                  { label: "Update Platform Policies", desc: "Edit terms, privacy, and compliance pages" },
                  { label: "Manage Packages", desc: "Add, edit, or remove membership tiers" },
                  { label: "View Analytics", desc: "Detailed platform metrics and reports" },
                  { label: "System Health", desc: "Check server status and performance" },
                ].map((action, i) => (
                  <button
                    key={i}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-bg-surface border border-border-dark hover:border-accent-pink/20 transition-all text-left"
                  >
                    <div>
                      <p className="text-sm font-medium text-text-primary">{action.label}</p>
                      <p className="text-xs text-text-muted">{action.desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-text-muted shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}