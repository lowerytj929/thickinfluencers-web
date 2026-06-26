// app/api/onlyfans/creator/[authId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getProfile, listVaultMedia, getEarnings } from "@/lib/onlyfans-api";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ authId: string }> }
) {
  try {
    const { authId } = await params;
    const url = new URL(req.url);
    const section = url.searchParams.get("section") || "profile";

    switch (section) {
      case "profile": {
        const profile = await getProfile(authId);
        return NextResponse.json(profile);
      }
      case "media": {
        const limit = Number(url.searchParams.get("limit")) || 20;
        const offset = Number(url.searchParams.get("offset")) || 0;
        const type = url.searchParams.get("type") as "image" | "video" | undefined;
        const media = await listVaultMedia(authId, { limit, offset, type });
        return NextResponse.json(media);
      }
      case "earnings": {
        const earnings = await getEarnings(authId);
        return NextResponse.json(earnings);
      }
      default:
        return NextResponse.json({ error: "Invalid section" }, { status: 400 });
    }
  } catch (err: any) {
    console.error("OF creator error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}