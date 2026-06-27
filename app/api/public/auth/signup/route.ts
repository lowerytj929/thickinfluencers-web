import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    let email: string, password: string;

    // Handle both JSON and FormData
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

    if (!email || !password) {
      const accept = req.headers.get("accept") || "";
      if (accept.includes("text/html")) {
        return NextResponse.redirect(
          new URL("/auth?error=Email+and+password+required", req.url),
        );
      }
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 },
      );
    }
    if (password.length < 6) {
      const accept = req.headers.get("accept") || "";
      if (accept.includes("text/html")) {
        return NextResponse.redirect(
          new URL("/auth?error=Password+must+be+at+least+6+characters", req.url),
        );
      }
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
      email_confirm: true,
    });

    if (error) {
      console.error("Signup error:", error);
      const accept = req.headers.get("accept") || "";
      if (accept.includes("text/html")) {
        const msg = encodeURIComponent(error.message);
        return NextResponse.redirect(
          new URL(`/auth?error=${msg}`, req.url),
        );
      }
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Now sign them in to create a session
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({ email, password });

    const redirect = req.nextUrl.searchParams.get("redirect") || "/dashboard";

    if (signInError || !signInData?.session) {
      // User was created but can't sign in — redirect to login
      const accept = req.headers.get("accept") || "";
      if (accept.includes("text/html")) {
        return NextResponse.redirect(
          new URL(
            `/auth?success=Account+created!+Please+sign+in`,
            req.url,
          ),
        );
      }
      return NextResponse.json({
        user: data.user,
        message: "Account created. Please sign in.",
      });
    }

    // Set cookies
    const res = NextResponse.redirect(new URL(redirect, req.url));
    const opts = {
      path: "/",
      maxAge: 604800,
      sameSite: "lax" as const,
      httpOnly: true,
      secure: true,
    };
    res.cookies.set("sb-access-token", signInData.session.access_token, opts);
    res.cookies.set("sb-refresh-token", signInData.session.refresh_token, opts);

    // For JSON clients, return JSON instead of redirect
    const accept = req.headers.get("accept") || "";
    if (!accept.includes("text/html")) {
      const jsonRes = NextResponse.json({
        user: signInData.user,
        redirect,
      });
      jsonRes.cookies.set("sb-access-token", signInData.session.access_token, opts);
      jsonRes.cookies.set("sb-refresh-token", signInData.session.refresh_token, opts);
      return jsonRes;
    }

    return res;
  } catch (e: any) {
    console.error("Signup error:", e);
    const accept = req.headers.get("accept") || "";
    if (accept.includes("text/html")) {
      return NextResponse.redirect(
        new URL(`/auth?error=${encodeURIComponent(e.message || "Server error")}`, req.url),
      );
    }
    return NextResponse.json(
      { error: e.message || "Server error" },
      { status: 500 },
    );
  }
}