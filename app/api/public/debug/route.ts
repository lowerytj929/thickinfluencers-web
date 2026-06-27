// app/api/public/debug/route.ts — Debug endpoint for env var health checks
// ONLY exposes metadata (length, suffix) — never full values
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const svc = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  
  const result: Record<string, any> = {
    status: "ok",
    timestamp: new Date().toISOString(),
    node_env: process.env.NODE_ENV,
    next_public_supabase_url: {
      length: url.length,
      ends_with: url.slice(-20),
      char_codes: Array.from(url.slice(-5)).map((c: string) => c.charCodeAt(0)),
    },
    supabase_service_role_key: {
      length: svc.length,
      ends_with: svc.slice(-15),
    },
    next_public_supabase_anon_key: {
      length: anon.length,
      ends_with: anon.slice(-15),
    },
  };

  // Detect corruption
  const issues: string[] = [];
  if (url.length < 40) issues.push(`NEXT_PUBLIC_SUPABASE_URL suspiciously short (${url.length})`);
  if (!url.endsWith("supabase.co")) issues.push("NEXT_PUBLIC_SUPABASE_URL may have trailing corruption");
  if (svc.length < 200) issues.push(`SUPABASE_SERVICE_ROLE_KEY suspiciously short (${svc.length})`);
  if (anon.length < 200) issues.push(`NEXT_PUBLIC_SUPABASE_ANON_KEY suspiciously short (${anon.length})`);

  if (issues.length > 0) {
    result.status = "issues_detected";
    result.issues = issues;
  }

  return Response.json(result, {
    status: issues.length > 0 ? 200 : 200,
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}