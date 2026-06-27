// lib/constants.ts — ThickInfluencers / Vault Empire constants

export const SITE_NAME = "Thick Influencers";
export const SITE_DESCRIPTION =
  "Your private influencer vault. Premium content, memberships, and community access.";
export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://thickinfluencers-web.vercel.app";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Search", href: "/search" },
  { label: "Premium", href: "/premium" },
  { label: "Dashboard", href: "/dashboard", authRequired: true },
  { label: "Admin", href: "/admin", authRequired: true },
] as const;

export const SOCIAL_LINKS = {
  twitter: "https://x.com/vaultempirehq",
  reddit: "https://reddit.com/r/thickinfluencersNSFW",
  telegram: "https://t.me/richballer1",
  telegramPreview: "https://t.me/+nygE2-zAWX45MTFh",
} as const;

// ── Subscription Plans (new Stripe-based) ──────────────────────────────

export const PREMIUM_TIERS = [
  {
    id: "vault_access",
    name: "Vault Access",
    price: 15,
    priceCents: 1500,
    slug: "vault_access",
    description:
      "Full gallery access with daily influencer drops, vault content, and instant Telegram invite.",
    features: [
      "Full vault gallery access",
      "Daily content updates",
      "Instant Telegram invite",
      "Ad-free browsing",
    ],
    popular: false,
  },
  {
    id: "vault_pro",
    name: "Vault Pro",
    price: 25,
    priceCents: 2500,
    slug: "vault_pro",
    description:
      "Everything in Vault Access plus VIP Telegram community, exclusive drops, and priority support.",
    features: [
      "Everything in Vault Access",
      "VIP Telegram channel",
      "Exclusive content drops",
      "Premium community access",
      "Priority support",
    ],
    popular: true,
  },
] as const;

// ── Legacy Products (one-time / manual payment) ────────────────────────

export const LEGACY_PRODUCTS = [
  {
    id: "thickvip",
    name: "ThickInfluencers VIP",
    price: 15,
    slug: "thickvip",
    description: "VIP access to ThickInfluencers vault and community.",
  },
  {
    id: "fyp",
    name: "FYP Access",
    price: 15,
    slug: "fyp",
    description: "For You Page access with daily influencer drops.",
  },
  {
    id: "thickcenter_plus",
    name: "ThickCenter+",
    price: 25,
    slug: "thickcenter_plus",
    description: "Premium ThickCenter membership with exclusive content.",
  },
  {
    id: "full_bundle",
    name: "Full Bundle",
    price: 35,
    slug: "full_bundle",
    description: "Everything — VIP + FYP + ThickCenter+ in one bundle.",
  },
] as const;

// ── Promo Packages (Telegram promo slots) ──────────────────────────────

export const PROMO_PACKAGES = [
  { name: "ForTheCulture 24h", price: 75, slug: "ftc_24h" },
  { name: "ForTheCulture 48h", price: 125, slug: "ftc_48h" },
  { name: "ForTheCulture Pinned", price: 100, slug: "ftc_pinned" },
  { name: "ThickCenter 24h", price: 40, slug: "tc_24h" },
  { name: "ThickCenter 48h", price: 70, slug: "tc_48h" },
  { name: "ThickCenter Pinned", price: 60, slug: "tc_pinned" },
  { name: "Network Bundle 24h", price: 100, slug: "network_24h" },
  { name: "Full Network Pin", price: 140, slug: "network_pin" },
] as const;

// ── Legacy Square Payment Links ────────────────────────────────────────

export const SQUARE_PAYMENT_LINKS: Record<string, string> = {
  vault_access: "https://square.link/u/2WEpsl0e?src=sheet",
  vault_pro: "https://square.link/u/Rf9OsolT?src=sheet",
  thickvip: "",
  fyp: "",
  thickcenter_plus: "",
  full_bundle: "",
};

// ── Stripe Price IDs ───────────────────────────────────────────────────
export const PRICE_IDS: Record<string, string> = {
  vault_access: "price_1TmlqtKHMcfKdfsXIugLzCfb",
  vault_pro: "price_1TmlquKHMcfKdfsXgkqrz4cZ",
} as const;

// ── Content Categories ─────────────────────────────────────────────────
export const CATEGORIES = [
  { id: "curvy", name: "Curvy", slug: "curvy" },
  { id: "bbw", name: "BBW", slug: "bbw" },
  { id: "fitness", name: "Fitness", slug: "fitness" },
  { id: "lingerie", name: "Lingerie", slug: "lingerie" },
  { id: "cosplay", name: "Cosplay", slug: "cosplay" },
  { id: "artistic", name: "Artistic", slug: "artistic" },
  { id: "exclusive", name: "Exclusive", slug: "exclusive" },
] as const;

// ── Visual / UI Constants ──────────────────────────────────────────────
export const DEFAULT_AVATAR_URL =
  "https://api.dicebear.com/9.x/thumbs/svg?seed=ThickInfluencers";

export const DEFAULT_COVER_URL =
  "https://placehold.co/1200x400/1a1a2e/e94560?text=ThickInfluencers";

// ── Auth / Middleware ──────────────────────────────────────────────────
export const AGE_VERIFIED_COOKIE = "ti_age_verified";

export const ADULT_CONTENT_ROUTES = [
  "/gallery",
  "/creator",
  "/search",
  "/premium",
] as const;

export const PUBLIC_ROUTES = [
  "/",
  "/auth",
  "/search",
  "/premium",
  "/creator",
  "/gallery",
  "/terms",
  "/privacy",
  "/copyright",
  "/takedown",
  "/compliance",
] as const;

export const PROTECTED_ROUTES = [
  "/dashboard",
  "/admin",
  "/settings",
] as const;

// ── Admin / Contact ────────────────────────────────────────────────────
export const ADMIN_CONTACT = {
  telegram: "@richballer1",
  telegramUrl: "https://t.me/richballer1",
} as const;
