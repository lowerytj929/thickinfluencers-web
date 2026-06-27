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
    if (password.length < 6) return errRedirect("Password must be at least 6 characters.");

    const redirect = req.nextUrl.searchParams.get("redirect") || "/dashboard";

    // Create user via admin API — auto-confirms
    const admin = await createAdminClient();
    const { data, error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (error) return errRedirect(error.message);

    // Now sign them in using SSR client — this sets proper cookies
    const supabase = await createClient();
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({ email, password });

    if (signInError || !signInData?.session) {
      if (isForm) return NextResponse.redirect(new URL(`/auth?success=Account+created!+Please+sign+in`, req.url));
      return NextResponse.json({ user: data.user, message: "Account created. Please sign in." });
    }

    // SSR client has set proper cookies — redirect
    if (isForm) return NextResponse.redirect(new URL(redirect, req.url));
    return NextResponse.json({ user: signInData.user, redirect });
  } catch (e: any) {
    console.error("Signup error:", e);
    const isForm = (req.headers.get("accept") || "").includes("text/html");
    if (isForm) return NextResponse.redirect(new URL(`/auth?error=${encodeURIComponent(e.message || "Server error")}`, req.url));
    return NextResponse.json({ error: e.message || "Server error" }, { status: 500 });
  }
}