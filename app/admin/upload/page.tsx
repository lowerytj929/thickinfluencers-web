"use client";

import { useState, useRef, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { ensureBucket, uploadMedia } from "@/lib/media";
import { Upload, FileVideo, FileImage, Loader2, CheckCircle, AlertCircle, ArrowLeft, X, User, Shield, Link as LinkIcon, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AdminUploadPage() {
  const [mode, setMode] = useState<"file" | "link">("link");
  const [files, setFiles] = useState<File[]>([]);
  const [externalUrl, setExternalUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<{ name: string; status: "ok" | "error"; msg: string }[]>([]);
  const [authState, setAuthState] = useState<"loading" | "not_signed_in" | "not_admin" | "ok">("loading");
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [modelIg, setModelIg] = useState("");
  const [modelOf, setModelOf] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { setAuthState("not_signed_in"); return; }
      if (user.email?.toLowerCase() === "lowerytj929@gmail.com") {
        setAuthState("ok");
        ensureBucket();
        return;
      }
      supabase.from("profiles").select("is_admin").eq("id", user.id).single().then(({ data }) => {
        if (!data?.is_admin) { setAuthState("not_admin"); return; }
        setAuthState("ok");
        ensureBucket();
      });
    });
  }, [supabase]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (i: number) => {
    setFiles(files.filter((_, idx) => idx !== i));
  };

  const createGalleryEntry = async (mediaUrl: string, mediaName: string, isVideo: boolean) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not signed in");

    const slugBase = (title || mediaName).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "gallery";
    const slug = `${slugBase}-${Date.now().toString().slice(-6)}`;
    const tags = tagsInput.split(",").map(t => t.trim().toLowerCase()).filter(Boolean);
    if (modelIg.trim()) tags.push(`ig:${modelIg.trim().replace("@", "")}`);
    if (modelOf.trim()) tags.push(`of:${modelOf.trim().replace("@", "")}`);

    // 1. Insert Gallery
    const { data: gallery, error: galErr } = await supabase.from("galleries").insert({
      creator_id: user.id,
      title: title || mediaName,
      slug,
      description: description || "Vault empire exclusive leak.",
      cover_url: mediaUrl,
      visibility: "public",
      is_premium: isPremium,
      tags: tags.length ? tags : ["vault", "trending"],
    }).select().single();

    if (galErr) throw new Error(galErr.message);

    // 2. Insert Media Item
    if (gallery) {
      await supabase.from("media_items").insert({
        gallery_id: gallery.id,
        creator_id: user.id,
        type: isVideo ? "video" : "image",
        url: mediaUrl,
      });
    }

    return gallery;
  };

  const handleUpload = async () => {
    if (mode === "file" && files.length === 0) return;
    if (mode === "link" && !externalUrl.trim()) return;

    setUploading(true);
    setResults([]);
    const resList: { name: string; status: "ok" | "error"; msg: string }[] = [];

    try {
      if (mode === "link") {
        const url = externalUrl.trim();
        const isVid = url.includes("mp4") || url.includes("webm") || url.includes("reddit") || url.includes("redgifs") || url.includes("erome");
        await createGalleryEntry(url, title || "External Video Post", isVid);
        resList.push({ name: title || url, status: "ok", msg: "Successfully posted to live public feed!" });
        setExternalUrl("");
      } else {
        for (const file of files) {
          const ext = file.name.split(".").pop();
          const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-") || Date.now().toString();
          const path = `uploads/${Date.now()}-${slug}.${ext}`;

          const { url, error } = await uploadMedia(file, path);
          if (error || !url) {
            resList.push({ name: file.name, status: "error", msg: error || "Upload failed" });
          } else {
            const isVid = file.type.startsWith("video/");
            await createGalleryEntry(url, file.name, isVid);
            resList.push({ name: file.name, status: "ok", msg: "Uploaded and published to public feed!" });
          }
        }
        setFiles([]);
      }
      setTitle("");
      setDescription("");
      setTagsInput("");
      setModelIg("");
      setModelOf("");
    } catch (err: any) {
      resList.push({ name: "Post Error", status: "error", msg: err.message });
    } finally {
      setResults(resList);
      setUploading(false);
    }
  };

  if (authState === "loading") {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-accent-pink animate-spin" />
      </div>
    );
  }

  if (authState === "not_signed_in" || authState === "not_admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-accent-pink/10 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-accent-pink" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-3">Admin Access Required</h1>
          <p className="text-text-secondary mb-8 text-sm">
            Sign in as lowerytj929@gmail.com or an authorized admin to post to the Vault.
          </p>
          <Link href="/auth" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-pink to-accent-purple text-white font-semibold rounded-xl hover:opacity-90 transition-all text-sm">
            Sign In / Switch Account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2.5 rounded-xl bg-bg-surface border border-border-dark hover:border-accent-pink/50 transition-all">
              <ArrowLeft className="w-5 h-5 text-text-secondary" />
            </Link>
            <div>
              <h1 className="text-2xl font-extrabold text-text-primary flex items-center gap-2">
                Post Vault Content <Sparkles className="w-5 h-5 text-accent-gold" />
              </h1>
              <p className="text-sm text-text-secondary">Publish videos, Reddit drops, or Erome albums instantly</p>
            </div>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex bg-bg-surface p-1 rounded-xl border border-border-dark mb-6">
          <button
            onClick={() => setMode("link")}
            className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              mode === "link" ? "bg-accent-pink text-white shadow-glow" : "text-text-secondary hover:text-white"
            }`}
          >
            <LinkIcon className="w-4 h-4" /> Post External Link (Reddit / Video / Erome)
          </button>
          <button
            onClick={() => setMode("file")}
            className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              mode === "file" ? "bg-accent-pink text-white shadow-glow" : "text-text-secondary hover:text-white"
            }`}
          >
            <Upload className="w-4 h-4" /> Upload File (MP4 / Image)
          </button>
        </div>

        {/* Main Post Form */}
        <div className="bg-bg-card border border-border-dark rounded-2xl p-6 space-y-5 shadow-xl">
          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-text-primary mb-1.5">Headline / Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Exclusive Reddit Leak - Full Video"
              className="w-full h-12 px-4 bg-bg-surface border border-border-dark rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-pink transition-all font-medium"
            />
          </div>

          {/* External Link or File Drop */}
          {mode === "link" ? (
            <div>
              <label className="block text-sm font-bold text-text-primary mb-1.5">Media URL (Reddit Post / RedGIFs / Erome / MP4) *</label>
              <input
                type="url"
                value={externalUrl}
                onChange={(e) => setExternalUrl(e.target.value)}
                placeholder="https://www.reddit.com/r/.../comments/... or https://www.redgifs.com/watch/..."
                className="w-full h-12 px-4 bg-bg-surface border border-border-dark rounded-xl text-sm text-accent-pink placeholder:text-text-muted focus:outline-none focus:border-accent-pink transition-all font-mono"
              />
              <p className="text-xs text-text-muted mt-1.5">Paste any Reddit post URL, RedGIFs video link, Erome album URL, or direct MP4.</p>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-bold text-text-primary mb-1.5">Upload Local Video / Image *</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-border-dark rounded-xl p-8 text-center cursor-pointer hover:border-accent-pink/50 bg-bg-surface/50 transition-all"
              >
                <Upload className="w-10 h-10 text-accent-pink mx-auto mb-3" />
                <p className="text-sm font-bold text-text-primary">Click to browse or drop files</p>
                <p className="text-xs text-text-muted mt-1">Supports MP4 videos, WebM, PNG, JPG up to 500MB</p>
                <input ref={fileInputRef} type="file" multiple accept="image/*,video/*" onChange={handleFileSelect} className="hidden" />
              </div>
              {files.length > 0 && (
                <div className="mt-3 space-y-2">
                  {files.map((f, i) => (
                    <div key={i} className="flex items-center justify-between bg-bg-surface rounded-lg px-4 py-2.5 border border-border-dark">
                      <div className="flex items-center gap-3 min-w-0">
                        <FileVideo className="w-5 h-5 text-accent-pink shrink-0" />
                        <span className="text-sm text-text-primary truncate font-medium">{f.name}</span>
                        <span className="text-xs text-text-muted">{(f.size / 1024 / 1024).toFixed(1)} MB</span>
                      </div>
                      <button onClick={() => removeFile(i)} className="p-1 hover:bg-white/10 rounded-lg text-text-muted hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-text-primary mb-1.5">Description (Optional)</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details, background info, or social links..."
              className="w-full p-4 bg-bg-surface border border-border-dark rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-pink transition-all"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-bold text-text-primary mb-1.5">Tags (Comma separated)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="reddit, leak, behind-the-scenes, viral, thicc"
              className="w-full h-12 px-4 bg-bg-surface border border-border-dark rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-pink transition-all"
            />
          </div>

          {/* Model Socials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-text-primary mb-1.5">Model Instagram Handle</label>
              <input
                type="text"
                value={modelIg}
                onChange={(e) => setModelIg(e.target.value)}
                placeholder="e.g. @graciebon"
                className="w-full h-12 px-4 bg-bg-surface border border-border-dark rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-pink transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-text-primary mb-1.5">Model OnlyFans Link/Handle</label>
              <input
                type="text"
                value={modelOf}
                onChange={(e) => setModelOf(e.target.value)}
                placeholder="e.g. graciebon"
                className="w-full h-12 px-4 bg-bg-surface border border-border-dark rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-pink transition-all"
              />
            </div>
          </div>

          {/* Premium Toggle */}
          <div className="flex items-center justify-between p-4 bg-bg-surface rounded-xl border border-border-dark">
            <div>
              <span className="font-bold text-sm text-text-primary block">Lock behind Premium Vault Subscription?</span>
              <span className="text-xs text-text-muted">If toggled on, users must subscribe to view this post.</span>
            </div>
            <button
              type="button"
              onClick={() => setIsPremium(!isPremium)}
              className={`w-14 h-8 rounded-full transition-colors relative p-1 ${isPremium ? "bg-accent-gold" : "bg-gray-700"}`}
            >
              <div className={`w-6 h-6 rounded-full bg-white transition-transform ${isPremium ? "translate-x-6" : ""}`} />
            </button>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleUpload}
            disabled={uploading || (mode === "link" ? !externalUrl.trim() : files.length === 0)}
            className="w-full h-14 bg-gradient-to-r from-accent-pink via-accent-purple to-accent-pink bg-[length:200%_auto] animate-gradient text-white font-black text-base rounded-xl hover:opacity-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-glow"
          >
            {uploading ? (
              <><Loader2 className="w-6 h-6 animate-spin" /> Publishing to Live Feed...</>
            ) : (
              <><Upload className="w-6 h-6" /> Publish Post Now</>
            )}
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="mt-6 bg-bg-card border border-border-dark rounded-2xl p-6 animate-fade-in">
            <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" /> Publication Status
            </h3>
            <div className="space-y-3">
              {results.map((r, i) => (
                <div key={i} className={`flex items-start justify-between p-4 rounded-xl text-sm ${
                  r.status === "ok" ? "bg-green-500/10 border border-green-500/20 text-green-300" : "bg-red-500/10 border border-red-500/20 text-red-300"
                }`}>
                  <div>
                    <p className="font-bold">{r.name}</p>
                    <p className="text-xs opacity-90 mt-0.5">{r.msg}</p>
                  </div>
                  {r.status === "ok" && (
                    <Link href="/" className="px-3 py-1.5 bg-green-500/20 hover:bg-green-500/30 text-green-300 font-bold rounded-lg text-xs transition-all shrink-0">
                      View on Feed →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
