// app/api/stripe/checkout/route.ts — Create a Stripe Checkout Session
//
// Authentication strategy: reads session from cookies via Supabase SSR,
// same approach used by middleware.ts. This is the most reliable method.

import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { PRICE_IDS } from "@/lib/constants";

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

    // ── Get authenticated user via SSR cookies ──────────────────────────
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required. Please sign in first." },
        { status: 401 },
      );
    }

    const userId = user.id;
    const userEmail = user.email ?? undefined;

    // ── Look up package from Supabase ───────────────────────────────────
    const admin = await createAdminClient();
    const { data: pkg, error: pkgError } = await admin
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

    // ── Validate price ID exists ────────────────────────────────────────
    const priceId = PRICE_IDS[package_slug];
    if (!priceId) {
      return NextResponse.json(
        { error: `No Stripe price configured for package "${package_slug}".` },
        { status: 500 },
      );
    }

    // ── Create Stripe Checkout Session ──────────────────────────────────
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
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