"use client";

import { useParams } from "next/navigation";
import { Eye, Heart, Lock, Tag, User, Calendar, ChevronLeft, Crown, ArrowRight } from "lucide-react";
import Link from "next/link";
import TagChip from "@/components/shared/TagChip";
import LikeButton from "@/components/shared/LikeButton";
import ViewCounter from "@/components/shared/ViewCounter";
import PremiumBadge from "@/components/shared/PremiumBadge";

// Placeholder gallery data
const galleriesData: Record<string, {
  id: string;
  title: string;
  creatorName: string;
  creatorSlug: string;
  description: string;
  viewCount: number;
  likeCount: number;
  isPremium: boolean;
  tags: string[];
  imageCount: number;
  createdAt: string;
    mediaUrl?: string;
}> = {
  "1": {
    id: "1",
    title: "Summer Collection 2025",
    creatorName: "Aria Mitchell",
    creatorSlug: "ariamitchell",
    description: "A curated collection of sun-drenched editorial shots captured during the peak of summer. Featuring bold colors, natural lighting, and effortless style. This series explores the intersection of fashion and environment, with each frame telling a unique story of warmth and vibrancy.",
    viewCount: 28400,
    likeCount: 3200,
    isPremium: false,
    tags: ["summer", "photography", "lifestyle", "fashion", "editorial"],
    imageCount: 24,
    createdAt: "June 2025",
    mediaUrl: "https://www.redgifs.com/watch/illfatedquizzicalunicorn",
  },
  "2": {
    id: "2",
    title: "Behind the Scenes Vol. 3",
    creatorName: "Jade Rivera",
    creatorSlug: "jaderivera",
    description: "Go behind the camera with exclusive candid moments from our latest production. This volume features setup shots, outtakes, and the creative process behind the final images. A must-see for anyone interested in the art of photography and content creation.",
    viewCount: 19200,
    likeCount: 2100,
    isPremium: true,
    tags: ["behind-the-scenes", "exclusive", "production", "photography"],
    imageCount: 36,
    createdAt: "May 2025",
    mediaUrl: "https://www.redgifs.com/watch/nauticalnervousalligatorgar",
  },
  "3": {
    id: "3",
    title: "Urban Fashion Shoot",
    creatorName: "Marcus Chen",
    creatorSlug: "marcuschen",
    description: "An edgy urban fashion series shot on location in downtown NYC. Combining street style with high-fashion aesthetics, this collection pushes boundaries and redefines contemporary style.",
    viewCount: 15700,
    likeCount: 1800,
    isPremium: false,
    tags: ["fashion", "urban", "editorial", "street-style"],
    imageCount: 18,
    createdAt: "April 2025",
  },
  "4": {
    id: "4",
    title: "Nightlife Series",
    creatorName: "Sofia Torres",
    creatorSlug: "sofiatorres",
    description: "Immerse yourself in the vibrant energy of after-dark culture. This premium collection captures the electric atmosphere of exclusive events, intimate gatherings, and the pulse of the night.",
    viewCount: 22100,
    likeCount: 2600,
    isPremium: true,
    tags: ["nightlife", "events", "exclusive", "premium"],
    imageCount: 42,
    createdAt: "March 2025",
  },
  "5": {
    id: "5",
    title: "Portrait Masterclass",
    creatorName: "Elena Voss",
    creatorSlug: "elenavoss",
    description: "A stunning portrait series demonstrating the art of capturing human expression. Each image explores different lighting techniques, compositions, and emotional narratives.",
    viewCount: 12300,
    likeCount: 1500,
    isPremium: false,
    tags: ["portrait", "photography", "lighting"],
    imageCount: 15,
    createdAt: "February 2025",
  },
  "6": {
    id: "6",
    title: "Travel Diary: Bali",
    creatorName: "Liam Nakamura",
    creatorSlug: "liamnaka",
    description: "Join Liam on an epic journey through Bali's most breathtaking landscapes. From hidden waterfalls to ancient temples, this premium travel diary captures the island's magic in every frame.",
    viewCount: 34100,
    likeCount: 4100,
    isPremium: true,
    tags: ["travel", "bali", "adventure", "landscape", "premium"],
    imageCount: 52,
    createdAt: "January 2025",
  },
};

export default function GalleryDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const gallery = galleriesData[id];

  if (!gallery) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg-primary px-4">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-bg-surface flex items-center justify-center mx-auto mb-6">
            <Eye className="w-10 h-10 text-text-muted" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">Gallery Not Found</h1>
          <p className="text-text-secondary mb-6">
            This gallery does not exist or has been removed.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent-pink text-white font-semibold rounded-xl hover:opacity-90 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Back navigation */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent-pink transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Browse
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* ─── Main Content ─── */}
          <div className="lg:col-span-3 space-y-6">
            {/* Media Preview / Cover */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-bg-surface border border-border-dark group">
              {/* Placeholder gradient cover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-pink/10 via-accent-purple/5 to-bg-surface" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-bg-card/80 border border-border-dark flex items-center justify-center mb-3">
                    <Eye className="w-10 h-10 text-text-muted" />
                  </div>
                  <p className="text-sm text-text-muted">
                    {gallery.imageCount} images in this collection
                  </p>
                </div>
              </div>

              {/* Overlay tags */}
              <div className="absolute top-4 left-4 flex gap-2">
                {gallery.isPremium && <PremiumBadge />}
              </div>

              {/* Premium lock overlay */}
              {gallery.isPremium && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center px-6">
                    <Lock className="w-10 h-10 text-accent-gold mx-auto mb-3" />
                    <p className="text-white font-semibold text-lg mb-1">Premium Content</p>
                    <p className="text-gray-400 text-sm mb-4">Subscribe to unlock this gallery</p>
                    <Link
                      href="/premium"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-gold to-accent-pink text-white font-bold rounded-xl hover:opacity-90 transition-all"
                    >
                      <Crown className="w-4 h-4" />
                      Unlock Access
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Title & Actions */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
                {gallery.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <ViewCounter count={gallery.viewCount} size="md" />
                <LikeButton initialCount={gallery.likeCount} size="md" />
                {gallery.isPremium && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-gold/10 text-accent-gold text-xs font-semibold">
                    <Lock className="w-3.5 h-3.5" />
                    Premium Gallery
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-bg-card border border-border-dark rounded-xl p-5">
              <h3 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wider">
                About This Gallery
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {gallery.description}
              </p>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wider">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {gallery.tags.map((tag) => (
                  <Link key={tag} href={`/search?tag=${tag}`}>
                    <TagChip label={tag} variant="purple" />
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA for premium */}
            {gallery.isPremium && (
              <div className="bg-gradient-to-r from-accent-pink/10 via-accent-purple/5 to-transparent border border-accent-pink/20 rounded-xl p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-text-primary mb-1">
                      Unlock This Gallery
                    </h3>
                    <p className="text-sm text-text-secondary">
                      Subscribe to Premium to access this and hundreds of other exclusive galleries.
                    </p>
                  </div>
                  <Link
                    href="/premium"
                    className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-pink to-accent-purple text-white font-semibold rounded-xl hover:opacity-90 transition-all"
                  >
                    <Crown className="w-4 h-4" />
                    Join Premium
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* ─── Sidebar ─── */}
          <aside className="lg:col-span-2 space-y-6">
            {/* Creator Info */}
            <div className="bg-bg-card border border-border-dark rounded-xl p-5">
              <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
                Creator
              </h3>
              <Link
                href={`/creator/${gallery.creatorSlug}`}
                className="flex items-center gap-4 group"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent-pink/20 to-accent-purple/20 flex items-center justify-center shrink-0 ring-2 ring-border-dark group-hover:ring-accent-pink/50 transition-all">
                  <span className="text-xl font-bold text-text-muted">
                    {gallery.creatorName.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-text-primary group-hover:text-accent-pink transition-colors">
                    {gallery.creatorName}
                  </p>
                  <p className="text-xs text-text-muted">View Profile</p>
                </div>
              </Link>
            </div>

            {/* Gallery Details */}
            <div className="bg-bg-card border border-border-dark rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
                Details
              </h3>
              <div className="flex items-center gap-3 text-sm">
                <Eye className="w-4 h-4 text-text-muted shrink-0" />
                <span className="text-text-secondary">{formatCount(gallery.viewCount)} views</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Heart className="w-4 h-4 text-text-muted shrink-0" />
                <span className="text-text-secondary">{formatCount(gallery.likeCount)} likes</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <ImageIcon className="w-4 h-4 text-text-muted shrink-0" />
                <span className="text-text-secondary">{gallery.imageCount} images</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-text-muted shrink-0" />
                <span className="text-text-secondary">{gallery.createdAt}</span>
              </div>
            </div>

            {/* Premium CTA (sidebar) */}
            {gallery.isPremium && (
              <div className="bg-gradient-to-br from-accent-pink/10 to-accent-purple/10 border border-accent-pink/20 rounded-xl p-5 text-center">
                <Lock className="w-8 h-8 text-accent-gold mx-auto mb-3" />
                <h3 className="text-lg font-bold text-text-primary mb-2">Premium Gallery</h3>
                <p className="text-sm text-text-secondary mb-4">
                  This content is available exclusively to premium members.
                </p>
                <Link
                  href="/premium"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-gold to-accent-pink text-white font-bold rounded-xl hover:opacity-90 transition-all w-full justify-center"
                >
                  <Crown className="w-4 h-4" />
                  Unlock Access
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

function ImageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}