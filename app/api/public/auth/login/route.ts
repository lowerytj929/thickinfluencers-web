import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 },
      );
    }

    const supabase = await createAdminClient();

    // First try normal sign-in
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    // If sign-in fails because email isn't confirmed, auto-confirm and retry
    if (error?.message?.includes("Email not confirmed") || error?.message?.includes("email_not_confirmed")) {
      // Look up the user and confirm their email
      const { data: users } = await supabase.auth.admin.listUsers();
      const user = users?.users?.find(u => u.email === email);
      if (user) {
        await supabase.auth.admin.updateUserById(user.id, {
          email_confirm: true,
        });
        // Retry sign-in after confirming
        const { data: retryData, error: retryError } = await supabase.auth.signInWithPassword({ email, password });
        if (retryError) return NextResponse.json({ error: retryError.message }, { status: 401 });
        if (!retryData.session) return NextResponse.json({ error: "No session" }, { status: 500 });
        const redirect = req.nextUrl.searchParams.get("redirect") || "/dashboard";
        const res = NextResponse.json({ user: retryData.user, redirect });
        const opts = { path: "/", maxAge: 604800, sameSite: "lax" as const, httpOnly: true, secure: true };
        res.cookies.set("sb-access-token", retryData.session.access_token, opts);
        res.cookies.set("sb-refresh-token", retryData.session.refresh_token, opts);
        return res;
      }
    }

    if (error) return NextResponse.json({ error: error.message }, { status: 401 });
    if (!data.session) return NextResponse.json({ error: "No session" }, { status: 500 });

    const redirect = req.nextUrl.searchParams.get("redirect") || "/dashboard";
    const res = NextResponse.json({ user: data.user, redirect });
    const opts = { path: "/", maxAge: 604800, sameSite: "lax" as const, httpOnly: true, secure: true };
    res.cookies.set("sb-access-token", data.session.access_token, opts);
    res.cookies.set("sb-refresh-token", data.session.refresh_token, opts);
    return res;
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Server error" }, { status: 500 });
  }
}