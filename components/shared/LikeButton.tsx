'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';

interface LikeButtonProps {
  initialCount?: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function LikeButton({ initialCount = 0, size = 'sm' }: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);

  const handleToggle = () => {
    if (liked) {
      setCount((c) => c - 1);
    } else {
      setCount((c) => c + 1);
    }
    setLiked((prev) => !prev);
  };

  const sizeClasses = {
    sm: 'text-xs gap-1',
    md: 'text-sm gap-1.5',
    lg: 'text-base gap-2',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <button
      onClick={handleToggle}
      className={`inline-flex items-center ${sizeClasses[size]} transition-all duration-200 ${
        liked
          ? 'text-accent-pink'
          : 'text-text-muted hover:text-accent-pink/70'
      }`}
      aria-label={liked ? 'Unlike' : 'Like'}
    >
      <Heart
        className={`${iconSizes[size]} transition-all duration-200 ${
          liked ? 'fill-accent-pink scale-110' : ''
        }`}
      />
      <span className="font-medium">{formatCount(count)}</span>
    </button>
  );
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}