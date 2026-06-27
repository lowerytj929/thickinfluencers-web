"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { BadgeCheck, ImageIcon, Eye, Users, Calendar, ExternalLink, Share2 } from "lucide-react";
import Link from "next/link";
import MediaCard from "@/components/shared/MediaCard";

// Placeholder creator data keyed by slug
const creatorsData: Record<string, {
  displayName: string;
  username: string;
  bio: string;
  about: string;
  isVerified: boolean;
  avatarSrc?: string;
  stats: { galleries: number; views: number; members: number };
  joinedDate: string;
  location: string;
  website?: string;
  galleries: { id: string; title: string; viewCount: number; likeCount: number; isPremium: boolean; tags: string[] }[];
}> = {
  "ariamitchell": {
    displayName: "Aria Mitchell",
    username: "@ariamitchell",
    bio: "Visual storyteller | Fashion & lifestyle photographer | Based in LA",
    about: "Aria Mitchell is a Los Angeles-based visual artist specializing in fashion and lifestyle photography. With over a decade of experience, she has worked with leading brands and publications, bringing a distinctive cinematic quality to every frame. Her work explores the intersection of light, texture, and human expression.",
    isVerified: true,
    stats: { galleries: 24, views: 45800, members: 3400 },
    joinedDate: "January 2023",
    location: "Los Angeles, CA",
    website: "https://ariamitchell.example.com",
    galleries: [
      { id: "g1", title: "Summer Collection 2025", viewCount: 28400, likeCount: 3200, isPremium: false, tags: ["summer", "fashion", "lifestyle"] },
      { id: "g2", title: "Behind the Velvet Rope", viewCount: 19200, likeCount: 2100, isPremium: true, tags: ["behind-the-scenes", "exclusive"] },
      { id: "g3", title: "Urban Nights", viewCount: 15700, likeCount: 1800, isPremium: false, tags: ["urban", "night", "editorial"] },
      { id: "g4", title: "Studio Sessions Vol. 2", viewCount: 22100, likeCount: 2600, isPremium: true, tags: ["studio", "portrait"] },
      { id: "g5", title: "Coastal Light", viewCount: 12300, likeCount: 1500, isPremium: false, tags: ["coastal", "natural-light"] },
      { id: "g6", title: "Fashion Week Recap", viewCount: 34100, likeCount: 4100, isPremium: true, tags: ["fashion-week", "events"] },
    ],
  },
  "marcuschen": {
    displayName: "Marcus Chen",
    username: "@marcuschen",
    bio: "Editorial & commercial photographer | NYC | Capturing stories through the lens",
    about: "Marcus Chen is an award-winning editorial photographer based in New York City. His commercial work spans fashion editorials, product campaigns, and lifestyle branding. Marcus brings a sharp, modern aesthetic to every project with an emphasis on composition and narrative.",
    isVerified: true,
    stats: { galleries: 18, views: 32100, members: 2800 },
    joinedDate: "March 2023",
    location: "New York, NY",
    galleries: [
      { id: "g7", title: "Manhattan Streets", viewCount: 18400, likeCount: 2200, isPremium: false, tags: ["street", "nyc", "urban"] },
      { id: "g8", title: "Editorial Essentials", viewCount: 22100, likeCount: 2700, isPremium: true, tags: ["editorial", "fashion"] },
      { id: "g9", title: "Golden Hour Portraits", viewCount: 13600, likeCount: 1800, isPremium: false, tags: ["portrait", "golden-hour"] },
    ],
  },
};

export default function CreatorProfilePage() {
  const params = useParams();
  const slug = params.slug as string;
  const creator = creatorsData[slug];

  if (!creator) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg-primary px-4">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-bg-surface flex items-center justify-center mx-auto mb-6">
            <Users className="w-10 h-10 text-text-muted" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">Creator Not Found</h1>
          <p className="text-text-secondary mb-6">
            The creator you are looking for does not exist or has not been indexed yet.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent-pink text-white font-semibold rounded-xl hover:opacity-90 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* ─── Profile Header ─── */}
      <div className="relative">
        {/* Cover gradient */}
        <div className="h-40 md:h-56 bg-gradient-to-r from-accent-pink/20 via-accent-purple/10 to-bg-primary border-b border-border-dark" />

        <div className="max-w-6xl mx-auto px-4">
          <div className="relative -mt-20 md:-mt-24 flex flex-col md:flex-row md:items-end gap-6 md:gap-8 pb-8 border-b border-border-dark">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-bg-primary bg-bg-surface shadow-xl relative">
                {creator.avatarSrc ? (
                  <Image fill src={creator.avatarSrc} alt={creator.displayName} sizes="(max-width: 768px) 128px, 160px" className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent-pink/20 to-accent-purple/20">
                    <span className="text-4xl md:text-5xl font-bold text-text-muted">
                      {creator.displayName.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              {creator.isVerified && (
                <BadgeCheck className="absolute -bottom-1 -right-1 w-8 h-8 text-accent-pink drop-shadow-md" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 pb-1">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-text-primary truncate">
                  {creator.displayName}
                </h1>
                {creator.isVerified && (
                  <BadgeCheck className="hidden md:block w-6 h-6 text-accent-pink shrink-0" />
                )}
              </div>
              <p className="text-text-secondary mb-1">{creator.username}</p>
              <p className="text-sm text-text-muted">{creator.bio}</p>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-5 mt-4">
                <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                  <ImageIcon className="w-4 h-4 text-accent-pink" />
                  <span className="font-semibold text-text-primary">{creator.stats.galleries}</span>
                  <span className="text-text-muted">galleries</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                  <Eye className="w-4 h-4 text-accent-pink" />
                  <span className="font-semibold text-text-primary">{formatCount(creator.stats.views)}</span>
                  <span className="text-text-muted">views</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                  <Users className="w-4 h-4 text-accent-pink" />
                  <span className="font-semibold text-text-primary">{formatCount(creator.stats.members)}</span>
                  <span className="text-text-muted">members</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 shrink-0">
              <button className="px-6 py-3 bg-accent-pink text-white font-semibold text-sm rounded-xl hover:opacity-90 transition-all">
                Follow
              </button>
              <button className="px-4 py-3 bg-bg-surface border border-border-dark text-text-secondary rounded-xl hover:text-accent-pink hover:border-accent-pink/30 transition-all">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── About + Gallery Grid ─── */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-24 space-y-6">
              {/* About */}
              <div className="bg-bg-card border border-border-dark rounded-xl p-5">
                <h3 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wider">
                  About
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {creator.about}
                </p>
              </div>

              {/* Details */}
              <div className="bg-bg-card border border-border-dark rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-text-muted shrink-0" />
                  <span className="text-text-secondary">Joined {creator.joinedDate}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Users className="w-4 h-4 text-text-muted shrink-0" />
                  <span className="text-text-secondary">{creator.location}</span>
                </div>
                {creator.website && (
                  <a
                    href={creator.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-accent-pink hover:underline"
                  >
                    <ExternalLink className="w-4 h-4 shrink-0" />
                    <span>Website</span>
                  </a>
                )}
              </div>
            </div>
          </aside>

          {/* Gallery Grid */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-text-primary">
                Galleries
                <span className="text-text-muted font-normal ml-2">({creator.galleries.length})</span>
              </h2>
            </div>
            <div className="grid-gallery">
              {creator.galleries.map((gallery) => (
                <Link key={gallery.id} href={`/gallery/${gallery.id}`}>
                  <MediaCard
                    title={gallery.title}
                    creatorName={creator.displayName}
                    viewCount={gallery.viewCount}
                    likeCount={gallery.likeCount}
                    isPremium={gallery.isPremium}
                    tags={gallery.tags}
                  />
                </Link>
              ))}
            </div>
          </div>
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