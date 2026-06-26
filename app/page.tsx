"use client";

import { ArrowRight, Crown, Eye, Heart, Flame, Sparkles, Lock, Grid, Users, ShoppingBag, ChevronRight, MessageCircle, AtSign, ExternalLink, Send } from "lucide-react";
import Link from "next/link";
import MediaCard from "@/components/shared/MediaCard";
import CreatorCard from "@/components/shared/CreatorCard";
import TagChip from "@/components/shared/TagChip";

const trendingGalleries = [
  { id: "1", title: "Summer Collection 2025", creatorName: "Aria Mitchell", viewCount: 28400, likeCount: 3200, isPremium: false, tags: ["summer", "photography", "lifestyle"] },
  { id: "2", title: "Behind the Scenes Vol. 3", creatorName: "Jade Rivera", viewCount: 19200, likeCount: 2100, isPremium: true, tags: ["behind-the-scenes", "exclusive"] },
  { id: "3", title: "Urban Fashion Shoot", creatorName: "Marcus Chen", viewCount: 15700, likeCount: 1800, isPremium: false, tags: ["fashion", "urban", "editorial"] },
  { id: "4", title: "Nightlife Series", creatorName: "Sofia Torres", viewCount: 22100, likeCount: 2600, isPremium: true, tags: ["nightlife", "events"] },
  { id: "5", title: "Portrait Masterclass", creatorName: "Elena Voss", viewCount: 12300, likeCount: 1500, isPremium: false, tags: ["portrait", "photography"] },
  { id: "6", title: "Travel Diary: Bali", creatorName: "Liam Nakamura", viewCount: 34100, likeCount: 4100, isPremium: true, tags: ["travel", "bali", "adventure"] },
  { id: "7", title: "Fitness & Wellness", creatorName: "Zoe Hart", viewCount: 9800, likeCount: 1200, isPremium: false, tags: ["fitness", "wellness"] },
  { id: "8", title: "Artistic Nudes Collection", creatorName: "Olivia Grant", viewCount: 27600, likeCount: 3400, isPremium: true, tags: ["art", "fine-art", "curated"] },
];

const featuredCreators = [
  { displayName: "Aria Mitchell", username: "@ariamitchell", isVerified: true, galleryCount: 24, followerCount: 45800 },
  { displayName: "Marcus Chen", username: "@marcuschen", isVerified: true, galleryCount: 18, followerCount: 32100 },
  { displayName: "Sofia Torres", username: "@sofiatorres", isVerified: false, galleryCount: 31, followerCount: 28900 },
  { displayName: "Elena Voss", username: "@elenavoss", isVerified: true, galleryCount: 15, followerCount: 51200 },
  { displayName: "Jade Rivera", username: "@jaderivera", isVerified: false, galleryCount: 22, followerCount: 19400 },
  { displayName: "Liam Nakamura", username: "@liamnaka", isVerified: true, galleryCount: 27, followerCount: 63700 },
  { displayName: "Zoe Hart", username: "@zoehart", isVerified: false, galleryCount: 12, followerCount: 15300 },
  { displayName: "Olivia Grant", username: "@oliviagrant", isVerified: true, galleryCount: 35, followerCount: 78400 },
];

const premiumFeatures = [
  { icon: Crown, title: "Full Access", description: "Unlock every gallery and album across all creators with no restrictions." },
  { icon: Sparkles, title: "Early Access", description: "Get exclusive early access to new content before public release." },
  { icon: Eye, title: "HD Quality", description: "View all media in the highest available resolution with no compression." },
  { icon: Heart, title: "Ad-Free", description: "Enjoy an uninterrupted browsing experience with zero advertisements." },
];

const categories = [
  "Fashion", "Portrait", "Lifestyle", "Travel", "Fitness",
  "Fine Art", "Behind the Scenes", "Editorial", "Nightlife",
  "Beauty", "Urban", "Events", "Nature", "Boudoir",
];

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* ─── Hero Section ─── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-[#0d0a15] to-[#1a0a18] pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-pink/30 to-transparent" />
        <div className="absolute bottom-0 left-1/4 right-1/4 h-64 bg-accent-pink/5 blur-[120px] rounded-full" />

        <div className="relative z-10 max-w-4xl mx-auto text-center py-20">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 animate-fade-in">
            <Flame className="w-4 h-4 text-accent-pink" />
            <span className="text-xs font-medium text-text-secondary tracking-widest uppercase">
              Premium Media Platform
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-text-primary mb-6 leading-none animate-slide-up">
            Discover
            <br />
            <span className="bg-gradient-to-r from-accent-gold via-accent-pink to-accent-purple bg-clip-text text-transparent">
              Exclusive Content
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 animate-fade-in">
            Explore curated galleries from top creators worldwide. Join a thriving
            community of visual storytellers and unlock premium media collections.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
            <Link
              href="#trending"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-pink to-accent-purple text-white font-bold text-base rounded-xl hover:opacity-90 transition-all transform hover:scale-[1.02] shadow-lg shadow-accent-pink/20"
            >
              <Eye className="w-5 h-5" />
              Explore Trending
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/premium"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-text-primary font-semibold text-base rounded-xl hover:bg-white/10 hover:border-accent-pink/30 transition-all"
            >
              <Crown className="w-5 h-5 text-accent-gold" />
              Join Premium
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Trending Galleries Section ─── */}
      <section id="trending" className="w-full max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
              Trending Galleries
            </h2>
            <p className="text-sm text-text-secondary">
              Most viewed collections this week
            </p>
          </div>
          <Link
            href="/search"
            className="hidden sm:flex items-center gap-1 text-sm text-accent-pink hover:text-accent-pink/80 transition-colors font-medium"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid-gallery">
          {trendingGalleries.map((gallery) => (
            <Link key={gallery.id} href={`/gallery/${gallery.id}`}>
              <MediaCard
                title={gallery.title}
                creatorName={gallery.creatorName}
                viewCount={gallery.viewCount}
                likeCount={gallery.likeCount}
                isPremium={gallery.isPremium}
                tags={gallery.tags}
              />
            </Link>
          ))}
        </div>
        <div className="flex sm:hidden justify-center mt-6">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-6 py-3 bg-bg-surface border border-border-dark text-text-primary font-medium text-sm rounded-xl hover:border-accent-pink/30 transition-all"
          >
            View All Galleries
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ─── Featured Creators Section ─── */}
      <section className="w-full max-w-7xl mx-auto px-4 py-16 md:py-24 border-t border-border-dark">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
              Featured Creators
            </h2>
            <p className="text-sm text-text-secondary">
              Discover talented visual artists and photographers
            </p>
          </div>
          <Link
            href="/search?filter=creators"
            className="hidden sm:flex items-center gap-1 text-sm text-accent-pink hover:text-accent-pink/80 transition-colors font-medium"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid-creators">
          {featuredCreators.map((creator, i) => (
            <Link key={i} href={`/creator/${creator.username.replace("@", "")}`}>
              <CreatorCard
                displayName={creator.displayName}
                username={creator.username}
                isVerified={creator.isVerified}
                galleryCount={creator.galleryCount}
                followerCount={creator.followerCount}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Premium Access Promo Section ─── */}
      <section className="w-full bg-gradient-to-b from-bg-primary via-[#0d0a15] to-bg-primary border-t border-border-dark py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-gold/10 border border-accent-gold/20 mb-4">
              <Crown className="w-4 h-4 text-accent-gold" />
              <span className="text-xs font-semibold text-accent-gold tracking-widest uppercase">Premium Access</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Unlock the Full Experience
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Go beyond the previews. Get unlimited access to all premium galleries,
              exclusive content drops, and creator communities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {premiumFeatures.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="bg-bg-card border border-border-dark rounded-xl p-6 card-hover"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent-pink/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-accent-pink" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              href="/premium"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-gold to-accent-pink text-white font-bold text-base rounded-xl hover:opacity-90 transition-all transform hover:scale-[1.02] shadow-lg shadow-accent-pink/20"
            >
              <Crown className="w-5 h-5" />
              View Membership Plans
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Community Section: Reddit + Twitter + Telegram ─── */}
      <section className="w-full bg-gradient-to-b from-bg-primary via-[#1a0a18] to-bg-primary border-t border-border-dark py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-purple/10 border border-accent-purple/20 mb-4">
              <MessageCircle className="w-4 h-4 text-accent-purple" />
              <span className="text-xs font-semibold text-accent-purple tracking-widest uppercase">Join the Community</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Connect With Us
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Join 200K+ members on Telegram, 100K+ on Reddit, and follow us on Twitter for the latest updates,
              exclusive previews, and community discussions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Telegram Card */}
            <a
              href="https://t.me/+MPDBT1cPlFBjNTkx"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-bg-card border border-border-dark rounded-xl p-8 card-hover text-center hover:border-[#229ED9]/40 transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-[#229ED9]/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                <Send className="w-8 h-8 text-[#229ED9]" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Telegram Community</h3>
              <p className="text-3xl font-black text-accent-gold mb-2">200K+</p>
              <p className="text-sm text-text-secondary mb-5">Members on Telegram channels</p>
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-[#229ED9] text-white font-semibold text-sm rounded-xl group-hover:opacity-90 transition-all">
                Join Free Preview
                <ExternalLink className="w-4 h-4" />
              </span>
            </a>

            {/* Reddit Card */}
            <a
              href="https://reddit.com/r/thickinfluencersNSFW"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-bg-card border border-border-dark rounded-xl p-8 card-hover text-center hover:border-[#FF4500]/40 transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-[#FF4500]/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-8 h-8 text-[#FF4500]" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Reddit Community</h3>
              <p className="text-3xl font-black text-accent-gold mb-2">100K+</p>
              <p className="text-sm text-text-secondary mb-5">Members on r/thickinfluencersNSFW</p>
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF4500] text-white font-semibold text-sm rounded-xl group-hover:opacity-90 transition-all">
                Join on Reddit
                <ExternalLink className="w-4 h-4" />
              </span>
            </a>

            {/* Twitter Card */}
            <a
              href="https://twitter.com/vaultEmpireHQ"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-bg-card border border-border-dark rounded-xl p-8 card-hover text-center hover:border-accent-blue/40 transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-accent-blue/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                <AtSign className="w-8 h-8 text-accent-blue" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Follow on Twitter</h3>
              <p className="text-2xl font-bold text-text-secondary mb-2">@vaultEmpireHQ</p>
              <p className="text-sm text-text-secondary mb-5">Latest updates, previews & announcements</p>
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-accent-blue text-white font-semibold text-sm rounded-xl group-hover:opacity-90 transition-all">
                Follow @vaultEmpireHQ
                <ExternalLink className="w-4 h-4" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── Categories Section ─── */}
      <section className="w-full max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
            Browse by Category
          </h2>
          <p className="text-sm text-text-secondary">
            Find exactly what you are looking for
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <Link key={cat} href={`/search?tag=${cat.toLowerCase().replace(/\s+/g, "-")}`}>
              <TagChip label={cat} variant="pink" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}