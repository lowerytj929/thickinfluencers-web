// app/api/stripe/webhook/route.ts — Stripe webhook handler

import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/server";
import type { MembershipTier, MembershipStatus } from "@/lib/types";

/**
 * POST /api/stripe/webhook
 *
 * Receives Stripe webhook events. Only listens for events that matter:
 *   - checkout.session.completed → create order + grant membership
 *
 * The raw body is required for signature verification.
 */
export async function POST(request: NextRequest) {
  const stripe = getStripe();

  // ── Verify webhook signature ──────────────────────────────────────────
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header." },
      { status: 400 },
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error(
      "STRIPE_WEBHOOK_SECRET is not set. Add it to .env.local to verify webhook events.",
    );
    return NextResponse.json(
      { error: "Webhook secret not configured on server." },
      { status: 500 },
    );
  }

  const rawBody = await request.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Invalid signature.";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 },
    );
  }

  // ── Handle event ──────────────────────────────────────────────────────
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as {
          id: string;
          metadata?: Record<string, string> | null;
          payment_intent?: string | null;
          amount_total?: number | null;
          currency?: string | null;
          customer?: string | null;
        };
        await handleCheckoutCompleted(session);
        break;
      }

      // Future handlers can be added here:
      // case "customer.subscription.updated":
      // case "customer.subscription.deleted":
      // case "invoice.payment_succeeded":

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    console.error(`Error processing webhook event ${event.type}:`, err);
    // Return 200 so Stripe doesn't retry — we log the failure server-side
    return NextResponse.json(
      { error: "Event received but processing failed." },
      { status: 200 },
    );
  }
}

// ─── Event Handlers ──────────────────────────────────────────────────────────

/**
 * Handle `checkout.session.completed`:
 *  - Create an `orders` record
 *  - Upsert a `memberships` record with the purchased tier
 */
async function handleCheckoutCompleted(session: {
  id: string;
  metadata?: Record<string, string> | null;
  payment_intent?: string | null;
  amount_total?: number | null;
  currency?: string | null;
  customer?: string | null;
}) {
  const supabase = await createAdminClient();

  const userId = session.metadata?.user_id;
  const packageSlug = session.metadata?.package_slug;
  const amountCents = session.amount_total ?? 0;
  const currency = (session.currency ?? "usd").toUpperCase();
  const paymentIntentId = session.payment_intent;
  const stripeCustomerId = session.customer;

  if (!userId || !packageSlug) {
    console.error(
      "checkout.session.completed missing user_id or package_slug in metadata",
      { metadata: session.metadata },
    );
    return;
  }

  // ── Map package slug to membership tier ──────────────────────────────
  const slugToTier: Record<string, MembershipTier> = {
    vault_access: "vault_access",
    vault_pro: "vault_pro",
  };

  const tier: MembershipTier | null = slugToTier[packageSlug] ?? null;
  if (!tier) {
    console.error(
      `Unknown package_slug "${packageSlug}" — cannot map to membership tier.`,
    );
    return;
  }

  // ── Create order ─────────────────────────────────────────────────────
  const { error: orderError } = await supabase.from("orders").insert({
    user_id: userId,
    amount_cents: amountCents,
    currency,
    status: "completed",
    access_granted: true,
    stripe_payment_intent_id: paymentIntentId,
    stripe_session_id: session.id,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  if (orderError) {
    console.error("Failed to create order:", orderError);
    // Continue — we still want to grant membership
  }

  // ── Upsert membership ────────────────────────────────────────────────
  const now = new Date().toISOString();
  // For subscriptions, set period_end 1 month out
  const periodEnd = new Date(
    Date.now() + 30 * 24 * 60 * 60 * 1000,
  ).toISOString();

  // Look up the package to get package_id
  const { data: pkg } = await supabase
    .from("packages")
    .select("id")
    .eq("slug", packageSlug)
    .single();

  const membershipRecord: Record<string, any> = {
    user_id: userId,
    is_active: true,
    started_at: now,
    expires_at: periodEnd,
  };

  if (pkg) {
    membershipRecord.package_id = pkg.id;
  }
  membershipRecord.plan = tier;

  // Upsert: use the unique constraint on (user_id, package_id)
  const { error: membershipError } = await supabase
    .from("memberships")
    .upsert(membershipRecord, { onConflict: "user_id,package_id" });

  if (membershipError) {
    console.error("Failed to upsert membership:", membershipError);
  }

  // ── Update profile membership_tier ──────────────────────────────────
  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      membership_tier: tier,
      stripe_customer_id: stripeCustomerId,
      updated_at: now,
    })
    .eq("id", userId);

  if (profileError) {
    console.error("Failed to update profile membership_tier:", profileError);
  }

  console.log(
    `Checkout completed: user=${userId}, tier=${tier}, session=${session.id}`,
  );
}
