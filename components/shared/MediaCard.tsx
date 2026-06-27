'use client';

import Image from 'next/image';
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
    <div className="group relative bg-bg-card rounded-xl overflow-hidden border border-border-dark hover:border-accent-pink/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(217,29,91,0.25)] card-hover cursor-pointer transform hover:-translate-y-1">
      {/* Cover Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#1a1325] via-[#2a1b3d] to-[#13111C]">
        {imageSrc ? (
          <Image
            fill
            src={imageSrc}
            alt={title}
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(217,29,91,0.25),transparent_70%)] animate-pulse" />
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-3 shadow-inner transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 backdrop-blur-sm z-10">
              <span className="text-2xl font-black bg-gradient-to-tr from-accent-pink to-accent-gold bg-clip-text text-transparent">
                {title ? title.charAt(0).toUpperCase() : "V"}
              </span>
            </div>
            <span className="text-xs font-medium text-white/60 z-10 line-clamp-1">{creatorName}</span>
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