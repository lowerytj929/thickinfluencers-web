'use client';

import Image from 'next/image';
import { BadgeCheck, ImageIcon, Users } from 'lucide-react';

interface CreatorCardProps {
  displayName?: string;
  username?: string;
  avatarSrc?: string;
  isVerified?: boolean;
  galleryCount?: number;
  followerCount?: number;
}

export default function CreatorCard({
  displayName = 'Creator Name',
  username = '@creator',
  avatarSrc,
  isVerified = false,
  galleryCount = 0,
  followerCount = 0,
}: CreatorCardProps) {
  return (
    <div className="relative bg-bg-card rounded-lg border border-border-dark p-4 card-hover group">
      {/* Accent border top */}
      <div className="absolute top-0 left-4 right-4 h-0.5 bg-gradient-to-r from-accent-pink to-accent-purple rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex flex-col items-center text-center gap-3">
        {/* Avatar */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-bg-surface ring-2 ring-border-dark group-hover:ring-accent-pink/50 transition-all duration-300 relative">
            {avatarSrc ? (
              <Image
                fill
                src={avatarSrc}
                alt={displayName}
                sizes="64px"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-muted">
                <svg className="w-8 h-8 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
          </div>
          {isVerified && (
            <BadgeCheck className="absolute -bottom-0.5 -right-0.5 w-5 h-5 text-accent-pink drop-shadow-md" />
          )}
        </div>

        {/* Name */}
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-text-primary truncate flex items-center justify-center gap-1">
            {displayName}
            {isVerified && <BadgeCheck className="w-3.5 h-3.5 text-accent-pink shrink-0" />}
          </h3>
          <p className="text-xs text-text-muted truncate">{username}</p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-text-secondary">
          <span className="flex items-center gap-1">
            <ImageIcon className="w-3.5 h-3.5" />
            {galleryCount}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {formatCount(followerCount)}
          </span>
        </div>

        {/* Follow Button */}
        <button className="w-full py-2 px-4 text-xs font-semibold rounded-lg bg-accent-pink/10 text-accent-pink border border-accent-pink/20 hover:bg-accent-pink hover:text-white transition-all duration-200">
          Follow
        </button>
      </div>
    </div>
  );
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}