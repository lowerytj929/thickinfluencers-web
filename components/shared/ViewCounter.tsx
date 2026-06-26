import { Eye } from 'lucide-react';

interface ViewCounterProps {
  count?: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function ViewCounter({ count = 0, size = 'sm' }: ViewCounterProps) {
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
    <span className={`inline-flex items-center ${sizeClasses[size]} text-text-muted`}>
      <Eye className={iconSizes[size]} />
      <span className="font-medium">{formatCount(count)}</span>
    </span>
  );
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}