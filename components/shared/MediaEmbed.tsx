'use client';

import { useState, useRef } from 'react';
import { Play, Lock, ExternalLink, Repeat, Download, Share2, Check } from 'lucide-react';

interface MediaEmbedProps {
  url?: string;
  videoUrl?: string;
  posterUrl?: string;
  title?: string;
  isPremium?: boolean;
  aspectRatio?: string;
}

function getEmbedUrl(url: string): string | null {
  // RedGIFs
  const redgifsMatch = url.match(/redgifs\.com\/(?:watch\/)?([a-zA-Z0-9_-]+)/i);
  if (redgifsMatch) {
    return `https://www.redgifs.com/embed/${redgifsMatch[1]}`;
  }
  // Reddit post embed
  const redditMatch = url.match(/reddit\.com\/r\/([a-zA-Z0-9_-]+)\/comments\/([a-zA-Z0-9_-]+)/i);
  if (redditMatch) {
    return `https://embed.reddit.com/r/${redditMatch[1]}/comments/${redditMatch[2]}?embed=true`;
  }
  // Erome album embed
  const eromeMatch = url.match(/erome\.com\/a\/([a-zA-Z0-9_-]+)/i);
  if (eromeMatch) {
    return `https://www.erome.com/embed/${eromeMatch[1]}`;
  }
  return null;
}

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
  const [loop, setLoop] = useState(true);
  const [copied, setCopied] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const displayUrl = url || videoUrl;
  if (!displayUrl) {
    return (
      <div className="w-full bg-bg-surface rounded-xl flex items-center justify-center border border-border-dark" style={{ aspectRatio }}>
        <p className="text-text-muted text-sm">No media URL provided</p>
      </div>
    );
  }

  const embedUrl = getEmbedUrl(displayUrl);
  const isDirectVideo = !embedUrl && displayUrl.match(/\.(mp4|webm|mov|m4v)(\?.*)?$/i);
  const isImage = !embedUrl && !isDirectVideo && displayUrl.match(/\.(jpg|jpeg|png|gif|webp|avif)(\?.*)?$/i);

  const handleCopy = () => {
    navigator.clipboard.writeText(displayUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-2.5">
      <div
        className="relative w-full overflow-hidden rounded-2xl bg-[#0a0810] border border-border-dark group shadow-2xl"
        style={{ aspectRatio: embedUrl?.includes('reddit') ? '4 / 5' : aspectRatio }}
      >
        {/* Premium overlay */}
        {isPremium && !loaded && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md">
            <Lock className="w-12 h-12 text-accent-gold mb-3 animate-pulse" />
            <p className="text-base font-bold text-white">Premium Vault Content</p>
            <p className="text-xs text-gray-400 mt-1">Subscribe to access full video</p>
          </div>
        )}

        {/* Iframe embed (RedGIFs / Reddit / Erome) */}
        {embedUrl && (
          <iframe
            src={embedUrl}
            className="w-full h-full absolute inset-0 border-0"
            allow="autoplay; fullscreen; encrypted-media"
            allowFullScreen
            title={title}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
          />
        )}

        {/* Direct video */}
        {isDirectVideo && (
          <video
            ref={videoRef}
            src={displayUrl}
            poster={posterUrl}
            className="w-full h-full absolute inset-0 object-contain"
            controls
            loop={loop}
            autoPlay
            muted
            preload="metadata"
            playsInline
            onLoadedData={() => setLoaded(true)}
            onError={() => setError(true)}
          />
        )}

        {/* Direct image or fallback */}
        {!embedUrl && !isDirectVideo && (
          /* eslint-disable-next-line @next/next/no-img-element */
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
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg-surface p-4 text-center">
            <p className="text-sm font-semibold text-text-primary mb-1">External Media Player</p>
            <p className="text-xs text-text-muted mb-3">This host requires direct viewing or embedding is restricted</p>
            <a
              href={displayUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent-pink text-white text-xs font-bold rounded-lg hover:opacity-90 transition-all shadow-glow"
            >
              Open in New Tab <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Loading spinner */}
        {!loaded && !isPremium && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-bg-surface/50">
            <div className="w-14 h-14 rounded-full bg-accent-pink/20 flex items-center justify-center animate-pulse">
              <Play className="w-7 h-7 text-accent-pink ml-1" />
            </div>
          </div>
        )}
      </div>

      {/* Erome-Style Media Controls Toolbar */}
      <div className="flex items-center justify-between bg-bg-card/90 border border-border-dark px-4 py-2.5 rounded-xl text-xs text-text-secondary">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-text-primary flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" /> Vault Player
          </span>
          {isDirectVideo && (
            <button
              onClick={() => {
                setLoop(!loop);
                if (videoRef.current) videoRef.current.loop = !loop;
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition-colors ${
                loop ? 'bg-accent-pink/20 text-accent-pink' : 'hover:bg-white/5 text-text-muted'
              }`}
            >
              <Repeat className="w-3.5 h-3.5" /> Loop {loop ? 'ON' : 'OFF'}
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-text-primary transition-all font-medium"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5" />}
            {copied ? 'Copied Link!' : 'Share'}
          </button>
          <a
            href={displayUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-accent-pink/20 to-accent-purple/20 border border-accent-pink/30 hover:border-accent-pink text-accent-pink font-semibold transition-all"
          >
            <Download className="w-3.5 h-3.5" /> Source
          </a>
        </div>
      </div>
    </div>
  );
}

export function MediaGrid({
  items,
  columns = 2,
}: {
  items: { url?: string; title?: string; isPremium?: boolean }[];
  columns?: number;
}) {
  return (
    <div
      className="grid gap-6"
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