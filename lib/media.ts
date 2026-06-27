/** Helper to upload files to Supabase Storage */
import { createClient } from "@/lib/supabase/client";

const BUCKET = "media";

export async function ensureBucket(): Promise<boolean> {
  const supabase = createClient();
  const { data: buckets } = await supabase.storage.listBuckets();
  if (!buckets?.find((b) => b.name === BUCKET)) {
    const { error } = await supabase.storage.createBucket(BUCKET, {
      public: false,
      fileSizeLimit: 524288000, // 500MB
    });
    return !error;
  }
  return true;
}

export async function uploadMedia(
  file: File,
  path: string
): Promise<{ url?: string; error?: string }> {
  const supabase = createClient();
  
  // Upload
  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) return { error: uploadError.message };

  // Get public URL (signed)
  const { data: urlData } = await supabase.storage
    .from(BUCKET)
    .getPublicUrl(path);

  return { url: urlData?.publicUrl };
}

export async function listMedia(bucket = BUCKET): Promise<any[]> {
  const supabase = createClient();
  const { data, error } = await supabase.storage.from(bucket).list("", {
    limit: 100,
    sortBy: { column: "created_at", order: "desc" },
  });
  return error ? [] : (data || []);
}
