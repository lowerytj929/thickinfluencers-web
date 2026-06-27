import { NextRequest, NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    let email: string, password: string;

    const ct = req.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      const body = await req.json();
      email = body.email;
      password = body.password;
    } else {
      const form = await req.formData();
      email = (form.get("email") as string) || "";
      password = (form.get("password") as string) || "";
    }

    const isForm = (req.headers.get("accept") || "").includes("text/html");

    const errRedirect = (msg: string) => {
      if (isForm) return NextResponse.redirect(new URL(`/auth?error=${encodeURIComponent(msg)}`, req.url));
      return NextResponse.json({ error: msg }, { status: 400 });
    };

    if (!email || !password) return errRedirect("Email and password are required.");

    const redirect = req.nextUrl.searchParams.get("redirect") || "/dashboard";

    // Use SSR client — this sets proper Supabase cookies when we call auth methods
    const supabase = await createClient();

    // First try normal sign-in
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    // If email not confirmed, auto-confirm and retry
    const isConfirmError =
      error?.message?.includes("Email not confirmed") ||
      error?.message?.includes("email_not_confirmed");

    if (isConfirmError) {
      const admin = await createAdminClient();
      const { data: users } = await admin.auth.admin.listUsers();
      const user = users?.users?.find((u: any) => u.email === email);
      if (user) {
        await admin.auth.admin.updateUserById(user.id, { email_confirm: true });
        // Retry sign-in with SSR client
        const { data: retryData, error: retryError } = await supabase.auth.signInWithPassword({ email, password });
        if (retryError) return errRedirect(retryError.message);
        if (retryData.session) {
          // The SSR client has now set proper session cookies — redirect
          if (isForm) return NextResponse.redirect(new URL(redirect, req.url));
          return NextResponse.json({ user: retryData.user, redirect });
        }
      }
    }

    if (error) return errRedirect(error.message);
    if (!data?.session) return errRedirect("No session created");

    // The SSR client has set proper session cookies via signInWithPassword
    // Just redirect — the cookies are already in the response
    if (isForm) return NextResponse.redirect(new URL(redirect, req.url));
    return NextResponse.json({ user: data.user, redirect });
  } catch (e: any) {
    console.error("Login error:", e);
    const isForm = (req.headers.get("accept") || "").includes("text/html");
    if (isForm) return NextResponse.redirect(new URL(`/auth?error=${encodeURIComponent(e.message || "Server error")}`, req.url));
    return NextResponse.json({ error: e.message || "Server error" }, { status: 500 });
  }
}