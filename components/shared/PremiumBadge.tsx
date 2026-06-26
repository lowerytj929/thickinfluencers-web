import { Crown } from 'lucide-react';

export default function PremiumBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-gradient-to-r from-accent-gold/20 to-accent-pink/20 text-accent-gold border border-accent-gold/30 shadow-sm">
      <Crown className="w-3 h-3" />
      Premium
    </span>
  );
}