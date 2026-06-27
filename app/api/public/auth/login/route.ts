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

    const isForm = (req.headers.get("accept") || "").includes("text/html");

    const errRedirect = (msg: string) => {
      if (isForm) {
        return NextResponse.redirect(
          new URL(`/auth?error=${encodeURIComponent(msg)}`, req.url),
        );
      }
      return NextResponse.json({ error: msg }, { status: 400 });
    };

    if (!email || !password) return errRedirect("Email and password are required.");

    const supabase = await createAdminClient();
    const redirect = req.nextUrl.searchParams.get("redirect") || "/dashboard";

    // First try normal sign-in
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    // If sign-in fails because email isn't confirmed, auto-confirm and retry
    const isConfirmError =
      error?.message?.includes("Email not confirmed") ||
      error?.message?.includes("email_not_confirmed");

    if (isConfirmError) {
      const { data: users } = await supabase.auth.admin.listUsers();
      const user = users?.users?.find((u: any) => u.email === email);
      if (user) {
        await supabase.auth.admin.updateUserById(user.id, {
          email_confirm: true,
        });
        // Retry sign-in
        const { data: retryData, error: retryError } =
          await supabase.auth.signInWithPassword({ email, password });
        if (retryError) return errRedirect(retryError.message);
        if (retryData.session) {
          return sendSession(retryData, redirect, req);
        }
      }
    }

    if (error) return errRedirect(error.message);
    if (!data?.session) return errRedirect("No session created");
    return sendSession(data, redirect, req);
  } catch (e: any) {
    console.error("Login error:", e);
    const isForm = (req.headers.get("accept") || "").includes("text/html");
    if (isForm) {
      return NextResponse.redirect(
        new URL(`/auth?error=${encodeURIComponent(e.message || "Server error")}`, req.url),
      );
    }
    return NextResponse.json({ error: e.message || "Server error" }, { status: 500 });
  }
}

function sendSession(
  data: { user: any; session: any },
  redirect: string,
  req: NextRequest,
) {
  const isForm = (req.headers.get("accept") || "").includes("text/html");
  const opts = {
    path: "/",
    maxAge: 604800,
    sameSite: "lax" as const,
    secure: true,
  };

  if (isForm) {
    const res = NextResponse.redirect(new URL(redirect, req.url));
    res.cookies.set("sb-access-token", data.session.access_token, opts);
    res.cookies.set("sb-refresh-token", data.session.refresh_token, opts);
    return res;
  }

  const jsonRes = NextResponse.json({ user: data.user, redirect });
  jsonRes.cookies.set("sb-access-token", data.session.access_token, opts);
  jsonRes.cookies.set("sb-refresh-token", data.session.refresh_token, opts);
  return jsonRes;
}