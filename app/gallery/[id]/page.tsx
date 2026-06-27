"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Eye, Heart, Lock, Tag, User, Calendar, ChevronLeft, Crown, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import TagChip from "@/components/shared/TagChip";
import LikeButton from "@/components/shared/LikeButton";
import ViewCounter from "@/components/shared/ViewCounter";
import PremiumBadge from "@/components/shared/PremiumBadge";
import MediaEmbed, { MediaGrid } from "@/components/shared/MediaEmbed";
import { createClient } from "@/lib/supabase/client";

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
    title: "Summer Poolside Glow 2025",
    creatorName: "Gracie Bon",
    creatorSlug: "graciebon",
    description: "Gracie Bon relaxing poolside in her iconic summer set. High-res vault photos and clips showcasing authentic curves and sun-drenched glam.",
    viewCount: 48400,
    likeCount: 6200,
    isPremium: false,
    tags: ["summer", "pool", "thicc", "bikini"],
    imageCount: 24,
    createdAt: "June 2025",
    mediaUrl: "https://www.redgifs.com/watch/illfatedquizzicalunicorn",
  },
  "2": {
    id: "2",
    title: "Morning Gym Routine & Leg Day",
    creatorName: "Sammy Draper",
    creatorSlug: "sammydraper",
    description: "Go behind the scenes with Sammy Draper during her heavy leg day workout and post-gym stretch session. Exclusive vault access.",
    viewCount: 39200,
    likeCount: 5100,
    isPremium: true,
    tags: ["fitness", "gym", "workout"],
    imageCount: 36,
    createdAt: "May 2025",
    mediaUrl: "https://www.redgifs.com/watch/nauticalnervousalligatorgar",
  },
  "3": {
    id: "3",
    title: "London Studio Editorial Glam",
    creatorName: "Sophie Hall",
    creatorSlug: "sophiehall",
    description: "Sophie Hall bringing British baddie vibes in a high-fashion London studio editorial photoshoot.",
    viewCount: 35700,
    likeCount: 4800,
    isPremium: false,
    tags: ["editorial", "london", "glam"],
    imageCount: 18,
    createdAt: "April 2025",
    mediaUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&auto=format&fit=crop&q=80",
  },
  "4": {
    id: "4",
    title: "Uncensored Vault Masterpiece",
    creatorName: "Mia Malkova",
    creatorSlug: "miamalkova",
    description: "Legendary superstar Mia Malkova shares her top-tier exclusive bedroom vault drop for VIP fans.",
    viewCount: 92100,
    likeCount: 14600,
    isPremium: true,
    tags: ["uncensored", "vip", "masterpiece"],
    imageCount: 42,
    createdAt: "March 2025",
    mediaUrl: "https://www.redgifs.com/watch/illfatedquizzicalunicorn",
  },
  "5": {
    id: "5",
    title: "South Beach Weekend Vibes",
    creatorName: "Abella Danger",
    creatorSlug: "abelladanger",
    description: "Miami queen Abella Danger turning up the heat on South Beach with candid vlog clips and glamorous party snaps.",
    viewCount: 62300,
    likeCount: 8500,
    isPremium: false,
    tags: ["miami", "beach", "party"],
    imageCount: 15,
    createdAt: "February 2025",
    mediaUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1200&auto=format&fit=crop&q=80",
  },
  "6": {
    id: "6",
    title: "Custom Anime Waifu Cosplay",
    creatorName: "Violet Myers",
    creatorSlug: "violetmyers",
    description: "Violet Myers bringing your favorite anime character to life in a custom tailored cosplay photoshoot.",
    viewCount: 54100,
    likeCount: 7100,
    isPremium: true,
    tags: ["cosplay", "anime", "waifu"],
    imageCount: 52,
    createdAt: "January 2025",
    mediaUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200&auto=format&fit=crop&q=80",
  },
  "7": {
    id: "7",
    title: "Atlanta Mansion VIP Set",
    creatorName: "Moriah Mills",
    creatorSlug: "moriahmills",
    description: "Moriah Mills showcasing her jaw-dropping curves at a luxury Atlanta mansion.",
    viewCount: 29800,
    likeCount: 4200,
    isPremium: false,
    tags: ["mansion", "atlanta", "vip"],
    imageCount: 20,
    createdAt: "January 2025",
    mediaUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&auto=format&fit=crop&q=80",
  },
  "8": {
    id: "8",
    title: "Golden Goddess Cinematic Series",
    creatorName: "Angela White",
    creatorSlug: "angelawhite",
    description: "Hall of Fame performer Angela White in her award-winning Golden Goddess cinematic series.",
    viewCount: 87600,
    likeCount: 13400,
    isPremium: true,
    tags: ["goddess", "cinematic", "royalty"],
    imageCount: 64,
    createdAt: "January 2025",
    mediaUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1200&auto=format&fit=crop&q=80",
  },
};

export default function GalleryDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [gallery, setGallery] = useState<any>((galleriesData as any)[id] || null);
  const [loading, setLoading] = useState(!(galleriesData as any)[id]);
  const supabase = createClient();

  useEffect(() => {
    async function fetchLiveGallery() {
      if ((galleriesData as any)[id]) {
        setLoading(false);
        return;
      }
      try {
        const { data: dbGal } = await supabase
          .from("galleries")
          .select("*, profiles(username, display_name)")
          .or(`id.eq.${id},slug.eq.${id}`)
          .maybeSingle();

        if (dbGal) {
          const { data: mItems } = await supabase
            .from("media_items")
            .select("*")
            .eq("gallery_id", dbGal.id);

          setGallery({
            id: dbGal.id,
            title: dbGal.title,
            creatorName: dbGal.profiles?.display_name || dbGal.profiles?.username || "Vault Creator",
            creatorSlug: dbGal.profiles?.username || "admin",
            description: dbGal.description || "Exclusive leaked vault content.",
            viewCount: dbGal.view_count || 1420,
            likeCount: dbGal.like_count || 190,
            isPremium: dbGal.is_premium || false,
            tags: dbGal.tags || ["trending", "leak"],
            imageCount: (mItems?.length || 1),
            createdAt: new Date(dbGal.created_at).toLocaleDateString(),
            mediaUrl: dbGal.cover_url,
            mediaItems: mItems || []
          });
        }
      } catch (e) {
        console.error("Error fetching gallery:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchLiveGallery();
  }, [id, supabase]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <Loader2 className="w-10 h-10 text-accent-pink animate-spin" />
      </div>
    );
  }

  if (!gallery) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg-primary px-4">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-bg-surface flex items-center justify-center mx-auto mb-6">
            <Eye className="w-10 h-10 text-text-muted" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">Gallery Not Found</h1>
          <p className="text-text-secondary mb-6">
            This gallery does not exist or has been removed from the vault.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent-pink text-white font-semibold rounded-xl hover:opacity-90 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Home Feed
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
            {/* Erome-Style Media Preview Player */}
            <div className="w-full">
              {gallery.mediaUrl ? (
                <MediaEmbed
                  url={gallery.mediaUrl}
                  title={gallery.title}
                  isPremium={gallery.isPremium}
                />
              ) : (
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-bg-surface border border-border-dark flex items-center justify-center">
                  <div className="text-center p-6">
                    <Eye className="w-12 h-12 text-text-muted mx-auto mb-3" />
                    <p className="text-sm text-text-secondary">{gallery.imageCount} media items in this collection</p>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Media Grid if multiple items */}
            {gallery.mediaItems && gallery.mediaItems.length > 1 && (
              <div className="space-y-4 pt-4 border-t border-border-dark">
                <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">Additional Album Media</h3>
                <MediaGrid items={gallery.mediaItems.map((m: any) => ({ url: m.url, title: gallery.title }))} />
              </div>
            )}

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
                {(gallery.tags || []).map((tag: string) => (
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