// lib/stripe.ts — Stripe client library for ThickInfluencers

import Stripe from "stripe";

let _stripe: Stripe | null = null;

/**
 * Returns a singleton Stripe instance configured with the secret key.
 * Must be called only from server-side code (API routes, server actions).
 */
export function getStripe(): Stripe {
  if (_stripe) return _stripe;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it to .env.local to use Stripe.",
    );
  }

  _stripe = new Stripe(key, {
    typescript: true,
  });

  return _stripe;
}

/**
 * Format a price in cents to a human-readable dollar string.
 * Example: 1500 → "$15.00"
 */
export function formatAmount(priceCents: number): string {
  const dollars = priceCents / 100;
  return `$${dollars.toFixed(2)}`;
}
