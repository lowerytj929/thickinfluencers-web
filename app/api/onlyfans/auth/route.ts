// app/api/onlyfans/auth/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { startAuthentication, pollAuthStatus } from "@/lib/onlyfans-api";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const result = await startAuthentication(email, password);
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("OF Auth error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Poll the auth status
export async function PUT(req: NextRequest) {
  try {
    const { attempt_id } = await req.json();
    if (!attempt_id) {
      return NextResponse.json({ error: "attempt_id required" }, { status: 400 });
    }

    const result = await pollAuthStatus(attempt_id);

    // If auth succeeded, save the connection to supabase
    if (result.data?.auth_id) {
      const supabase = await createAdminClient();
      await supabase.from("creator_integrations").upsert({
        platform: "onlyfans",
        auth_id: result.data.auth_id,
        profile: result.data.profile,
        connected_at: new Date().toISOString(),
      });
    }

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}