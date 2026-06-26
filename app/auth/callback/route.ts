import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Determine the redirect host (supports reverse-proxy setups)
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";

      const redirectTo = isLocalEnv
        ? `${origin}${next}`
        : forwardedHost
          ? `https://${forwardedHost}${next}`
          : `${origin}${next}`;

      return NextResponse.redirect(redirectTo);
    }

    console.error("Auth callback code exchange error:", error.message);
  }

  // If there's an `error` or `error_description` query param, pass it along
  const errorParam = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");
  const errorPath = errorParam
    ? `/auth?error=${encodeURIComponent(errorDescription ?? errorParam)}`
    : "/auth?error=auth_failed";

  return NextResponse.redirect(`${origin}${errorPath}`);
}