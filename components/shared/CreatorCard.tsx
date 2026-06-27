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
    <div className="relative bg-bg-card rounded-xl border border-border-dark p-5 card-hover group hover:border-accent-pink/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(217,29,91,0.2)] transform hover:-translate-y-1">
      {/* Accent border top glow */}
      <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-accent-pink via-accent-gold to-accent-purple rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-glow" />

      <div className="flex flex-col items-center text-center gap-3">
        {/* Avatar */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-tr from-accent-pink/20 to-accent-purple/20 ring-2 ring-border-dark group-hover:ring-accent-pink group-hover:shadow-[0_0_15px_rgba(217,29,91,0.4)] transition-all duration-300 relative flex items-center justify-center">
            {avatarSrc ? (
              <Image
                fill
                src={avatarSrc}
                alt={displayName}
                sizes="80px"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <span className="text-2xl font-black bg-gradient-to-r from-accent-pink via-accent-gold to-accent-purple bg-clip-text text-transparent transform group-hover:scale-110 transition-transform duration-300">
                {displayName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          {isVerified && (
            <BadgeCheck className="absolute -bottom-0.5 -right-0.5 w-6 h-6 text-accent-pink fill-bg-primary drop-shadow-md" />
          )}
        </div>

        {/* Name */}
        <div className="min-w-0 w-full">
          <h3 className="text-base font-bold text-text-primary truncate flex items-center justify-center gap-1 group-hover:text-accent-pink transition-colors">
            {displayName}
            {isVerified && <BadgeCheck className="w-4 h-4 text-accent-pink shrink-0" />}
          </h3>
          <p className="text-xs font-medium text-text-muted truncate">{username}</p>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-5 py-1 text-xs font-semibold text-text-secondary w-full border-y border-border-dark/50 my-1">
          <span className="flex items-center gap-1.5 hover:text-text-primary transition-colors">
            <ImageIcon className="w-3.5 h-3.5 text-accent-pink" />
            {galleryCount} <span className="text-[10px] text-text-muted font-normal">sets</span>
          </span>
          <span className="flex items-center gap-1.5 hover:text-text-primary transition-colors">
            <Users className="w-3.5 h-3.5 text-accent-purple" />
            {formatCount(followerCount)} <span className="text-[10px] text-text-muted font-normal">fans</span>
          </span>
        </div>

        {/* Follow Button */}
        <button className="w-full py-2.5 px-4 text-xs font-bold rounded-xl bg-gradient-to-r from-accent-pink/10 to-accent-purple/10 text-text-primary border border-white/10 group-hover:from-accent-pink group-hover:to-accent-purple group-hover:border-transparent group-hover:text-white transition-all duration-300 shadow-sm">
          Follow Creator
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