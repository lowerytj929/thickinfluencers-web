// lib/onlyfans-api.ts — OnlyFans API client (onlyfansapi.com)

const API_BASE = "https://app.onlyfansapi.com/api";

type OfApiResponse<T> = {
  success?: boolean;
  data?: T;
  error?: string;
  attempt_id?: string;
  polling_url?: string;
  message?: string;
};

// ─── Auth: Connect an OnlyFans account ────────────────────────────

export async function startAuthentication(email: string, password: string) {
  const apiKey = process.env.ONLYFANS_API_KEY;
  if (!apiKey) throw new Error("ONLYFANS_API_KEY not configured");

  const res = await fetch(`${API_BASE}/authenticate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return res.json() as Promise<OfApiResponse<{ attempt_id: string; polling_url: string }>>;
}

export async function pollAuthStatus(authAttemptId: string) {
  const apiKey = process.env.ONLYFANS_API_KEY;
  if (!apiKey) throw new Error("ONLYFANS_API_KEY not configured");

  const res = await fetch(`${API_BASE}/authenticate/${authAttemptId}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  return res.json() as Promise<
    OfApiResponse<{
      status: string;
      auth_id?: string;
      profile?: {
        name: string;
        username: string;
        avatar: string;
        subscribersCount: number;
      };
    }>
  >;
}

// ─── Creator Profile ──────────────────────────────────────────────

export async function getProfile(authId: string) {
  const apiKey = process.env.ONLYFANS_API_KEY;
  if (!apiKey) throw new Error("ONLYFANS_API_KEY not configured");

  const res = await fetch(`${API_BASE}/profile/${authId}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  return res.json() as Promise<
    OfApiResponse<{
      username: string;
      name: string;
      avatar: string;
      subscribersCount: number;
      postsCount: number;
      photosCount: number;
      videosCount: number;
      subscribePrice: number;
      joinDate: string;
    }>
  >;
}

// ─── Vault Media ──────────────────────────────────────────────────

export async function listVaultMedia(
  authId: string,
  params?: { limit?: number; offset?: number; type?: "image" | "video" }
) {
  const apiKey = process.env.ONLYFANS_API_KEY;
  if (!apiKey) throw new Error("ONLYFANS_API_KEY not configured");

  const qs = new URLSearchParams();
  if (params?.limit) qs.set("limit", String(params.limit));
  if (params?.offset) qs.set("offset", String(params.offset));
  if (params?.type) qs.set("type", params.type);

  const res = await fetch(`${API_BASE}/vault/${authId}/media?${qs}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  return res.json() as Promise<
    OfApiResponse<
      {
        id: string;
        type: string;
        url: string;
        preview: string;
        createdAt: string;
      }[]
    >
  >;
}

// ─── Fans / Subscribers ──────────────────────────────────────────

export async function listActiveFans(authId: string, limit = 50) {
  const apiKey = process.env.ONLYFANS_API_KEY;
  if (!apiKey) throw new Error("ONLYFANS_API_KEY not configured");

  const res = await fetch(`${API_BASE}/fans/${authId}/active?limit=${limit}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  return res.json() as Promise<
    OfApiResponse<{ username: string; avatar: string; subscribedAt: string }[]>
  >;
}

// ─── Earnings ──────────────────────────────────────────────────────

export async function getEarnings(authId: string) {
  const apiKey = process.env.ONLYFANS_API_KEY;
  if (!apiKey) throw new Error("ONLYFANS_API_KEY not configured");

  const res = await fetch(`${API_BASE}/payouts/${authId}/earnings`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  return res.json() as Promise<
    OfApiResponse<{
      totalAmount: number;
      thisMonth: number;
      lastMonth: number;
      currency: string;
    }>
  >;
}
