import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const supabase = await createAdminClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
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