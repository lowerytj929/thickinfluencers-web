// app/api/public/ensure-bucket/route.ts — Ensure Supabase Storage bucket exists
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const BUCKET = "media";

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    const { data: buckets } = await supabase.storage.listBuckets();

    if (buckets?.find((b) => b.name === BUCKET)) {
      return NextResponse.json({ ok: true, exists: true });
    }

    const { error } = await supabase.storage.createBucket(BUCKET, {
      public: false,
      fileSizeLimit: 524288000, // 500MB
    });

    if (error) {
      console.error("Failed to create bucket:", error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, created: true });
  } catch (err: any) {
    console.error("ensure-bucket error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}