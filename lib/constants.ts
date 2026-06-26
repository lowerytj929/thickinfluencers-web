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
    id: "vault_access",
    name: "Vault Access",
    price: 9.99,
    priceCents: 999,
    description: "Access to exclusive galleries and behind-the-scenes content.",
    features: [
      "Unlock all vault galleries",
      "Ad-free browsing",
      "Early access to new content",
    ],
  },
  {
    id: "vault_pro",
    name: "Vault Pro",
    price: 19.99,
    priceCents: 1999,
    description: "Everything in Vault Access plus premium perks and direct support.",
    features: [
      "Everything in Vault Access",
      "Premium media downloads",
      "Priority support",
      "Exclusive Discord role",
    ],
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
