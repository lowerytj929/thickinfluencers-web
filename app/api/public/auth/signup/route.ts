import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

/**
 * POST /api/public/auth/signup
 *
 * Server-side signup using service_role key — creates users as
 * pre-confirmed so no email verification is needed.
 */
export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 },
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 },
      );
    }

    const supabase = await createAdminClient();

    // Create user via admin API — auto-confirms so no email needed
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // skip confirmation email
    });

    if (error) {
      console.error("Admin createUser error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Now sign them in to create a session
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({ email, password });

    if (signInError || !signInData.session) {
      // User was created but we can't sign them in — still return success
      return NextResponse.json({
        user: data.user,
        message: "Account created. Please sign in.",
      });
    }

    const redirect = req.nextUrl.searchParams.get("redirect") || "/dashboard";
    const res = NextResponse.json({
      user: signInData.user,
      redirect,
    });
    const opts = {
      path: "/",
      maxAge: 604800,
      sameSite: "lax" as const,
      httpOnly: true,
      secure: true,
    };
    res.cookies.set("sb-access-token", signInData.session.access_token, opts);
    res.cookies.set("sb-refresh-token", signInData.session.refresh_token, opts);
    return res;
  } catch (e: any) {
    console.error("Signup API error:", e);
    return NextResponse.json(
      { error: e.message || "Server error" },
      { status: 500 },
    );
  }
}