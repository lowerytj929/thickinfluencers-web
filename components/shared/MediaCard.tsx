'use client';

import { Eye, Heart, Lock } from 'lucide-react';
import PremiumBadge from './PremiumBadge';
import TagChip from './TagChip';

interface MediaCardProps {
  title?: string;
  creatorName?: string;
  viewCount?: number;
  likeCount?: number;
  isPremium?: boolean;
  tags?: string[];
  imageSrc?: string;
}

export default function MediaCard({
  title = 'Untitled Gallery',
  creatorName = 'Creator Name',
  viewCount = 0,
  likeCount = 0,
  isPremium = false,
  tags = ['art', 'photography'],
  imageSrc,
}: MediaCardProps) {
  return (
    <div className="group relative bg-bg-card rounded-lg overflow-hidden border border-border-dark card-hover cursor-pointer">
      {/* Cover Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-bg-surface">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-muted">
            <svg className="w-12 h-12 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top badges */}
        <div className="absolute top-2 left-2 flex gap-1.5">
          {isPremium && <PremiumBadge />}
        </div>

        {/* Bottom stats overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="flex items-center gap-1.5 text-xs text-white/90">
            <Eye className="w-3.5 h-3.5" />
            {formatCount(viewCount)}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-white/90">
            <Heart className="w-3.5 h-3.5" />
            {formatCount(likeCount)}
          </span>
          {isPremium && (
            <span className="flex items-center gap-1.5 text-xs text-accent-gold ml-auto">
              <Lock className="w-3 h-3" />
              Premium
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-3 space-y-1.5">
        <h3 className="text-sm font-semibold text-text-primary truncate leading-tight">
          {title}
        </h3>
        <p className="text-xs text-text-muted truncate">{creatorName}</p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {tags.slice(0, 3).map((tag) => (
            <TagChip key={tag} label={tag} />
          ))}
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