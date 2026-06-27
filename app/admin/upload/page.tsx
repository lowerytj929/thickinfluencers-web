"use client";

import { useState, useRef, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { ensureBucket, uploadMedia } from "@/lib/media";
import { Upload, FileVideo, FileImage, Loader2, CheckCircle, AlertCircle, ArrowLeft, X, User, Shield } from "lucide-react";
import Link from "next/link";

export default function AdminUploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<{ name: string; status: "ok" | "error"; msg: string }[]>([]);
  const [authState, setAuthState] = useState<"loading" | "not_signed_in" | "not_admin" | "ok">("loading");
  const [title, setTitle] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  // Check admin access (runs client-side only)
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { setAuthState("not_signed_in"); return; }
      supabase.from("profiles").select("is_admin").eq("id", user.id).single().then(({ data }) => {
        if (!data?.is_admin) { setAuthState("not_admin"); return; }
        setAuthState("ok");
        ensureBucket();
      });
    });
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (i: number) => {
    setFiles(files.filter((_, idx) => idx !== i));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);
    setResults([]);

    const results: { name: string; status: "ok" | "error"; msg: string }[] = [];

    for (const file of files) {
      const ext = file.name.split(".").pop();
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-") || Date.now().toString();
      const path = `uploads/${Date.now()}-${slug}.${ext}`;

      const { url, error } = await uploadMedia(file, path);
      if (error) {
        results.push({ name: file.name, status: "error", msg: error });
      } else {
        const { data: { user } } = await supabase.auth.getUser();
        const { error: dbError } = await supabase.from("galleries").insert({
          title: title || file.name,
          cover_url: url,
          visibility: "private",
          is_premium: false,
          creator_id: user?.id,
        });
        results.push({
          name: file.name,
          status: "ok",
          msg: dbError ? url + " (not saved to DB)" : url || "Uploaded",
        });
      }
    }

    setResults(results);
    setUploading(false);
    setFiles([]);
    setTitle("");
  };

  if (authState === "loading") {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-accent-pink animate-spin" />
      </div>
    );
  }

  if (authState === "not_signed_in") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-accent-pink/10 flex items-center justify-center mx-auto mb-6">
            <User className="w-8 h-8 text-accent-pink" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-3">Not Signed In</h1>
          <p className="text-text-secondary mb-8 text-sm">
            Sign up or sign in to upload content to the vault.
          </p>
          <Link href="/auth" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-pink to-accent-purple text-white font-semibold rounded-xl hover:opacity-90 transition-all text-sm">
            <User className="w-4 h-4" />
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (authState === "not_admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-yellow-900/20 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-yellow-400" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-3">Admin Access Required</h1>
          <p className="text-text-secondary mb-8 text-sm">
            You need admin privileges to upload content. Contact support if you need access.
          </p>
          <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent-pink text-white font-semibold rounded-xl hover:opacity-90 transition-all text-sm">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="p-2 rounded-lg bg-bg-surface border border-border-dark hover:border-accent-pink/30 transition-all">
            <ArrowLeft className="w-5 h-5 text-text-secondary" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Upload Content</h1>
            <p className="text-sm text-text-secondary">Upload videos and images to the vault</p>
          </div>
        </div>

        {/* Upload Form */}
        <div className="bg-bg-card border border-border-dark rounded-2xl p-6 mb-6">
          <div className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Content Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Summer Collection - Behind the Scenes"
                className="w-full h-11 px-4 bg-bg-surface border border-border-dark rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-pink/50 transition-all"
              />
            </div>

            {/* File Drop Zone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border-dark rounded-xl p-8 text-center cursor-pointer hover:border-accent-pink/30 transition-all"
            >
              <Upload className="w-10 h-10 text-text-muted mx-auto mb-3" />
              <p className="text-sm font-medium text-text-primary">Drop files here or click to browse</p>
              <p className="text-xs text-text-muted mt-1">Supports images and videos up to 500MB</p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* Selected Files */}
            {files.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-text-secondary">{files.length} file(s) selected</p>
                {files.map((f, i) => (
                  <div key={i} className="flex items-center justify-between bg-bg-surface rounded-lg px-4 py-2.5">
                    <div className="flex items-center gap-3 min-w-0">
                      {f.type.startsWith("video/") ? (
                        <FileVideo className="w-5 h-5 text-accent-pink shrink-0" />
                      ) : (
                        <FileImage className="w-5 h-5 text-accent-gold shrink-0" />
                      )}
                      <span className="text-sm text-text-primary truncate">{f.name}</span>
                      <span className="text-xs text-text-muted">{(f.size / 1024 / 1024).toFixed(1)} MB</span>
                    </div>
                    <button onClick={() => removeFile(i)} className="p-1 hover:bg-white/5 rounded-lg transition-all">
                      <X className="w-4 h-4 text-text-muted" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Button */}
            <button
              onClick={handleUpload}
              disabled={files.length === 0 || uploading}
              className="w-full h-12 bg-gradient-to-r from-accent-pink to-accent-purple text-white font-bold text-sm rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {uploading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Uploading...</>
              ) : (
                <><Upload className="w-5 h-5" /> Upload {files.length > 0 ? `${files.length} file(s)` : "Content"}</>
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="bg-bg-card border border-border-dark rounded-2xl p-6">
            <h3 className="text-lg font-bold text-text-primary mb-4">Upload Results</h3>
            <div className="space-y-3">
              {results.map((r, i) => (
                <div key={i} className={`flex items-start gap-3 p-3 rounded-xl text-sm ${
                  r.status === "ok" ? "bg-green-900/10 text-green-400" : "bg-red-900/10 text-red-400"
                }`}>
                  {r.status === "ok" ? <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
                  <div>
                    <p className="font-medium">{r.name}</p>
                    <p className="text-xs opacity-80">{r.msg.slice(0, 120)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
