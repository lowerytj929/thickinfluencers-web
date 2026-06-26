'use client';

import { BadgeCheck, ImageIcon, Users, MapPin, Link as LinkIcon, Calendar } from 'lucide-react';

interface ProfileCardProps {
  displayName?: string;
  username?: string;
  bio?: string;
  avatarSrc?: string;
  coverSrc?: string;
  isVerified?: boolean;
  galleryCount?: number;
  followerCount?: number;
  followingCount?: number;
  location?: string;
  website?: string;
  joinedDate?: string;
}

export default function ProfileCard({
  displayName = 'Creator Name',
  username = '@creator',
  bio = 'Digital artist and content creator. Sharing visual stories and creative explorations.',
  avatarSrc,
  coverSrc,
  isVerified = false,
  galleryCount = 0,
  followerCount = 0,
  followingCount = 0,
  location,
  website,
  joinedDate,
}: ProfileCardProps) {
  return (
    <div className="bg-bg-card rounded-lg border border-border-dark overflow-hidden">
      {/* Cover */}
      <div className="h-32 sm:h-40 bg-gradient-to-r from-accent-pink/20 via-accent-purple/20 to-accent-gold/10 overflow-hidden">
        {coverSrc ? (
          <img src={coverSrc} alt="" className="w-full h-full object-cover" />
        ) : null}
      </div>

      {/* Profile section */}
      <div className="px-5 pb-5 relative">
        {/* Avatar */}
        <div className="flex justify-center -mt-12 mb-4 relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-bg-surface ring-4 ring-bg-card border-2 border-border-dark">
            {avatarSrc ? (
              <img
                src={avatarSrc}
                alt={displayName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-muted">
                <svg className="w-12 h-12 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
          </div>
          {isVerified && (
            <BadgeCheck className="absolute bottom-1 right-1/2 translate-x-14 w-6 h-6 text-accent-pink drop-shadow-md" />
          )}
        </div>

        {/* Name & Bio */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-1.5 mb-0.5">
            <h2 className="text-lg font-bold text-text-primary">{displayName}</h2>
            {isVerified && <BadgeCheck className="w-4 h-4 text-accent-pink" />}
          </div>
          <p className="text-sm text-text-muted mb-2">{username}</p>
          <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
            {bio}
          </p>
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-xs text-text-muted mb-4">
          {location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {location}
            </span>
          )}
          {website && (
            <span className="flex items-center gap-1 hover:text-accent-pink cursor-pointer transition-colors">
              <LinkIcon className="w-3.5 h-3.5" />
              {website}
            </span>
          )}
          {joinedDate && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Joined {joinedDate}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 mb-4">
          <div className="text-center">
            <p className="text-lg font-bold text-text-primary">{galleryCount}</p>
            <p className="text-xs text-text-muted">Galleries</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-text-primary">{formatCount(followerCount)}</p>
            <p className="text-xs text-text-muted">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-text-primary">{formatCount(followingCount)}</p>
            <p className="text-xs text-text-muted">Following</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-3">
          <button className="btn-primary text-sm !py-2 !px-6">
            Follow
          </button>
          <button className="btn-secondary text-sm !py-2 !px-6">
            Message
          </button>
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