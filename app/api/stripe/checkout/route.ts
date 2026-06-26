// app/api/stripe/checkout/route.ts — Create a Stripe Checkout Session

import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    // ── Parse request body ──────────────────────────────────────────────
    const body = await request.json();
    const { package_slug } = body as { package_slug?: string };

    if (!package_slug || typeof package_slug !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'package_slug' in request body." },
        { status: 400 },
      );
    }

    // ── Get authenticated user ──────────────────────────────────────────
    const supabase = await createAdminClient();

    // Prefer the Authorization header, fall back to cookie-based session
    const authHeader = request.headers.get("Authorization");
    let userId: string | undefined;
    let userEmail: string | undefined;

    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.slice(7);
      const { data: userData, error: userError } =
        await supabase.auth.getUser(token);
      if (userError || !userData.user) {
        return NextResponse.json(
          { error: "Invalid or expired token." },
          { status: 401 },
        );
      }
      userId = userData.user.id;
      userEmail = userData.user.email ?? undefined;
    } else {
      // Fallback: cookie-based session (requires server client)
      const { createClient } = await import("@/lib/supabase/server");
      const serverSupabase = await createClient();
      const {
        data: { session },
      } = await serverSupabase.auth.getSession();
      if (!session?.user) {
        return NextResponse.json(
          { error: "Authentication required. No session found." },
          { status: 401 },
        );
      }
      userId = session.user.id;
      userEmail = session.user.email ?? undefined;
    }

    // ── Look up package from Supabase ───────────────────────────────────
    const { data: pkg, error: pkgError } = await supabase
      .from("packages")
      .select("*")
      .eq("slug", package_slug)
      .eq("is_active", true)
      .single();

    if (pkgError || !pkg) {
      return NextResponse.json(
        {
          error: `Package with slug "${package_slug}" not found or is inactive.`,
        },
        { status: 404 },
      );
    }

    // ── Create Stripe Checkout Session ──────────────────────────────────
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: pkg.name,
              description: pkg.description ?? undefined,
            },
            unit_amount: pkg.price_cents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        package_slug: pkg.slug,
        user_id: userId,
      },
      customer_email: userEmail,
      success_url: `${request.nextUrl.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/premium`,
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
