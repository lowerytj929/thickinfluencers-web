"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Check, Loader2 } from "lucide-react";

interface Package {
  id: string;
  name: string;
  slug: string;
  price_cents: number;
  price_display: string;
  features: string[];
  popular: boolean;
}

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const [pkg, setPkg] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [orderResult, setOrderResult] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      const { data } = await supabase
        .from("packages")
        .select("*")
        .eq("slug", params.slug)
        .single();
      setPkg(data);
      setLoading(false);
    }
    load();
  }, [params.slug]);

  const handleCheckout = async () => {
    if (!user) {
      router.push(`/auth?redirect=/checkout/${params.slug}`);
      return;
    }
    setProcessing(true);

    try {
      // Create order in Supabase
      const { data: order, error } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          package_id: pkg!.id,
          package_name: pkg!.name,
          amount_cents: pkg!.price_cents,
          status: "pending",
          payer_email: user.email,
        })
        .select()
        .single();

      if (error) throw error;

      // Since we're keeping Square for now, show payment instructions
      setOrderResult(
        `Order created! Please complete payment and DM @richballer1 on Telegram with your receipt.`
      );
    } catch (err: any) {
      setOrderResult("Error: " + err.message);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0508]">
        <Loader2 className="w-8 h-8 text-pink-500 animate-spin" />
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0508]">
        <p className="text-gray-400">Package not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0508] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="bg-[#1A0A12] border border-pink-900/30 rounded-2xl p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">{pkg.name}</h1>
          <p className="text-5xl font-extrabold text-white mb-8">
            {pkg.price_display}
          </p>

          <ul className="space-y-3 mb-8 text-left">
            {pkg.features.map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-pink-500 shrink-0 mt-0.5" />
                <span className="text-gray-300">{f}</span>
              </li>
            ))}
          </ul>

          {orderResult ? (
            <div className="bg-[#0A0508] border border-pink-900/30 rounded-xl p-6">
              <p className="text-gray-300">{orderResult}</p>
              <button
                onClick={() => router.push("/dashboard")}
                className="mt-4 w-full py-3 bg-gradient-to-r from-pink-600 to-pink-500 text-white font-bold rounded-xl"
              >
                Go to Dashboard
              </button>
            </div>
          ) : (
            <button
              onClick={handleCheckout}
              disabled={processing}
              className="w-full py-4 bg-gradient-to-r from-pink-600 to-pink-500 text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(217,29,91,0.4)] transition-all disabled:opacity-50"
            >
              {processing ? "Processing..." : `Get ${pkg.name}`}
            </button>
          )}

          {!user && !orderResult && (
            <p className="mt-4 text-sm text-gray-500">
              You'll need to sign in to complete the purchase.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}