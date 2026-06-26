// lib/types.ts — ThickInfluencers type definitions

// ─── Profile ────────────────────────────────────────────────────────────────

export interface Profile {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  cover_url: string | null;
  bio: string | null;
  website: string | null;
  is_verified: boolean;
  is_creator: boolean;
  membership_tier: MembershipTier | null;
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
}

export type MembershipTier = "vault_access" | "vault_pro" | null;

// ─── Gallery ────────────────────────────────────────────────────────────────

export interface Gallery {
  id: string;
  creator_id: string;
  title: string;
  description: string | null;
  cover_url: string | null;
  is_premium: boolean;
  price_cents: number | null;
  views_count: number;
  likes_count: number;
  category_id: string | null;
  tags: string[];
  status: GalleryStatus;
  created_at: string;
  updated_at: string;
}

export type GalleryStatus = "draft" | "published" | "archived";

// ─── Media Item ─────────────────────────────────────────────────────────────

export interface MediaItem {
  id: string;
  gallery_id: string;
  url: string;
  type: MediaType;
  width: number | null;
  height: number | null;
  size_bytes: number | null;
  alt_text: string | null;
  order_index: number;
  created_at: string;
}

export type MediaType = "image" | "video";

// ─── Category ───────────────────────────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  is_adult: boolean;
  created_at: string;
}

// ─── Membership ─────────────────────────────────────────────────────────────

export interface Membership {
  id: string;
  user_id: string;
  tier: MembershipTier;
  status: MembershipStatus;
  current_period_start: string | null;
  current_period_end: string | null;
  stripe_subscription_id: string | null;
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
}

export type MembershipStatus =
  | "active"
  | "canceled"
  | "incomplete"
  | "incomplete_expired"
  | "past_due"
  | "paused"
  | "trialing"
  | "unpaid";

// ─── Order ──────────────────────────────────────────────────────────────────

export interface Order {
  id: string;
  user_id: string;
  gallery_id: string | null;
  membership_id: string | null;
  amount_cents: number;
  currency: string;
  status: OrderStatus;
  access_granted: boolean;
  stripe_payment_intent_id: string | null;
  stripe_session_id: string | null;
  created_at: string;
  updated_at: string;
}

export type OrderStatus =
  | "pending"
  | "completed"
  | "failed"
  | "refunded"
  | "canceled";

// ─── Package ────────────────────────────────────────────────────────────────

export interface Package {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price_cents: number;
  features: string[];
  telegram_link: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// ─── Report ─────────────────────────────────────────────────────────────────

export interface Report {
  id: string;
  reporter_id: string;
  target_type: ReportTargetType;
  target_id: string;
  reason: string;
  description: string | null;
  status: ReportStatus;
  reviewed_by: string | null;
  created_at: string;
  updated_at: string;
}

export type ReportTargetType = "gallery" | "media" | "profile" | "comment";

export type ReportStatus = "pending" | "reviewed" | "dismissed" | "action_taken";

// ─── Takedown Request ───────────────────────────────────────────────────────

export interface TakedownRequest {
  id: string;
  requester_name: string;
  requester_email: string;
  target_url: string;
  reason: TakedownReason;
  description: string;
  proof_document_url: string | null;
  status: TakedownStatus;
  reviewed_by: string | null;
  created_at: string;
  updated_at: string;
}

export type TakedownReason =
  | "copyright"
  | "trademark"
  | "defamation"
  | "private_information"
  | "other";

export type TakedownStatus = "pending" | "approved" | "denied" | "escalated";

// ─── Audit Log ──────────────────────────────────────────────────────────────

export interface AuditLog {
  id: string;
  actor_id: string | null;
  action: string;
  resource_type: string;
  resource_id: string | null;
  details: Record<string, unknown> | null;
  ip_address: string | null;
  created_at: string;
}
