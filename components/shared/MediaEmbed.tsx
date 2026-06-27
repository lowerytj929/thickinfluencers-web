'use client';

import { useState } from 'react';
import { Play, Lock, ExternalLink } from 'lucide-react';

interface MediaEmbedProps {
  /** RedGIFs URL like https://www.redgifs.com/watch/xxx */
  url?: string;
  /** Direct video URL fallback */
  videoUrl?: string;
  /** Optional poster/thumbnail */
  posterUrl?: string;
  /** Title for accessibility */
  title?: string;
  /** Is this premium content? */
  isPremium?: boolean;
  /** Width/height ratio (default: 16/9) */
  aspectRatio?: string;
}

/**
 * Detects RedGIFs URL and extracts the embed iframe URL
 */
function getRedGifsEmbedUrl(url: string): string | null {
  // Match redgifs.com/watch/XXXXX or redgifs.com/XXXXX
  const match = url.match(/redgifs\.com\/(?:watch\/)?([a-zA-Z0-9_-]+)/i);
  if (match) {
    // Use the iframe embed format
    return `https://www.redgifs.com/embed/${match[1]}`;
  }
  return null;
}

/**
 * Universal media embed component
 * Supports: RedGIFs, direct video URLs, images
 */
export default function MediaEmbed({
  url,
  videoUrl,
  posterUrl,
  title = 'Media',
  isPremium = false,
  aspectRatio = '16 / 9',
}: MediaEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const displayUrl = url || videoUrl;
  if (!displayUrl) {
    return (
      <div className="w-full bg-bg-surface rounded-xl flex items-center justify-center" style={{ aspectRatio }}>
        <p className="text-text-muted text-sm">No media URL provided</p>
      </div>
    );
  }

  // RedGIFs embed
  const redgifsEmbed = getRedGifsEmbedUrl(displayUrl);

  // Direct video (mp4, webm)
  const isDirectVideo = displayUrl.match(/\.(mp4|webm|mov)(\?.*)?$/i);

  // Direct image
  const isImage = displayUrl.match(/\.(jpg|jpeg|png|gif|webp|avif)(\?.*)?$/i);

  const embedUrl = redgifsEmbed;

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl bg-bg-surface group"
      style={{ aspectRatio }}
    >
      {/* Premium overlay */}
      {isPremium && !loaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
          <Lock className="w-10 h-10 text-accent-gold mb-3" />
          <p className="text-sm font-medium text-text-primary">Premium Content</p>
          <p className="text-xs text-text-muted mt-1">Subscribe to access</p>
        </div>
      )}

      {/* RedGIFs iframe embed */}
      {embedUrl && (
        <iframe
          src={embedUrl}
          className="w-full h-full absolute inset-0"
          allow="autoplay; fullscreen"
          allowFullScreen
          title={title}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}

      {/* Direct video */}
      {!embedUrl && isDirectVideo && (
        <video
          src={displayUrl}
          poster={posterUrl}
          className="w-full h-full absolute inset-0 object-contain"
          controls
          preload="metadata"
          playsInline
          onLoadedData={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}

      {/* Direct image */}
      {!embedUrl && isImage && (
        <img
          src={displayUrl}
          alt={title}
          className="w-full h-full absolute inset-0 object-contain"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}

      {/* Error state */}
      {error && !isPremium && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg-surface">
          <p className="text-sm text-text-muted">Could not load media</p>
          <a
            href={displayUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-xs text-accent-pink hover:underline"
          >
            Open directly <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}

      {/* Loading state */}
      {!loaded && !isPremium && !error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-accent-pink/10 flex items-center justify-center animate-pulse">
            <Play className="w-6 h-6 text-accent-pink" />
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Gallery of media items - displays a grid of MediaEmbeds
 */
export function MediaGrid({
  items,
  columns = 2,
}: {
  items: { url?: string; title?: string; isPremium?: boolean }[];
  columns?: number;
}) {
  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: `repeat(${Math.min(columns, items.length)}, 1fr)`,
      }}
    >
      {items.map((item, i) => (
        <MediaEmbed
          key={i}
          url={item.url}
          title={item.title}
          isPremium={item.isPremium}
        />
      ))}
    </div>
  );
}