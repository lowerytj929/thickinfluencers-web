// lib/constants.ts

export const SITE_NAME = "ThickInfluencers";
export const SITE_DESCRIPTION =
  "Premium content platform for ThickInfluencers — exclusive media, memberships, and more.";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Search", href: "/search" },
  { label: "Premium", href: "/premium" },
  { label: "Dashboard", href: "/dashboard", authRequired: true },
  { label: "Admin", href: "/admin", authRequired: true },
] as const;

export const PREMIUM_TIERS = [
  {
    id: "fyp",
    name: "FYP Access",
    price: 10,
    priceCents: 1000,
    slug: "fyp",
    description: "Get FYP access with daily influencer drops.",
    features: [
      "FYP channel access",
      "Daily content updates",
      "Instant Telegram invite",
    ],
    paymentLink: "https://square.link/u/2WEpsl0e?src=sheet",
  },
  {
    id: "thickvip",
    name: "ThickVip",
    price: 15,
    priceCents: 1500,
    slug: "thickvip",
    description: "Premium VIP access to exclusive Telegram communities.",
    features: [
      "VIP Telegram channel access",
      "Exclusive content drops",
      "Premium community access",
    ],
    paymentLink: "https://square.link/u/Rf9OsolT?src=sheet",
  },
  {
    id: "thickcenter",
    name: "ThickCenter+",
    price: 25,
    priceCents: 2500,
    slug: "thickcenter",
    description: "Everything in ThickVip plus ThickCenter+ exclusive access.",
    features: [
      "Everything in ThickVip",
      "ThickCenter+ private access",
      "Premium vault content",
      "Priority support",
    ],
    paymentLink: "https://square.link/u/UYFxrabd?src=sheet",
  },
  {
    id: "full_bundle",
    name: "Full Bundle",
    price: 35,
    priceCents: 3500,
    slug: "full-bundle",
    description: "Get everything — the best value for the full experience.",
    features: [
      "Everything in all tiers",
      "Full vault access",
      "All Telegram communities",
      "Lifetime access",
      "Best value",
    ],
    popular: true,
    paymentLink: "https://square.link/u/FWjQoLfT?src=sheet",
  },
] as const;

export const CATEGORIES = [
  { id: "curvy", name: "Curvy", slug: "curvy" },
  { id: "bbw", name: "BBW", slug: "bbw" },
  { id: "fitness", name: "Fitness", slug: "fitness" },
  { id: "lingerie", name: "Lingerie", slug: "lingerie" },
  { id: "cosplay", name: "Cosplay", slug: "cosplay" },
  { id: "artistic", name: "Artistic", slug: "artistic" },
  { id: "exclusive", name: "Exclusive", slug: "exclusive" },
] as const;

export const DEFAULT_AVATAR_URL =
  "https://api.dicebear.com/9.x/thumbs/svg?seed=ThickInfluencers";

export const DEFAULT_COVER_URL =
  "https://placehold.co/1200x400/1a1a2e/e94560?text=ThickInfluencers";

/** Cookie name used for age verification gate. */
export const AGE_VERIFIED_COOKIE = "ti_age_verified";

/** List of route prefixes that are considered adult content and require age gate. */
export const ADULT_CONTENT_ROUTES = [
  "/gallery",
  "/creator",
  "/search",
  "/premium",
] as const;

/** Routes that do NOT require authentication. */
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
  "/api/public",
] as const;

/** Route prefixes that require authentication. */
export const PROTECTED_ROUTES = [
  "/dashboard",
  "/admin",
  "/checkout",
  "/settings",
] as const;
