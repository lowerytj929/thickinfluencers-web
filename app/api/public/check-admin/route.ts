// app/api/public/check-admin/route.ts — Check if the current user is admin
import { NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ isAdmin: false, signedIn: false }, { status: 401 });
    }

    const admin = await createAdminClient();
    const { data: profile } = await admin
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single();

    const isOwner = user.email?.toLowerCase() === "lowerytj929@gmail.com";
    if (isOwner && profile?.is_admin !== true) {
      await admin.from("profiles").upsert({ id: user.id, is_admin: true });
    }

    return NextResponse.json({
      isAdmin: profile?.is_admin === true || isOwner,
      signedIn: true,
      email: user.email,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}