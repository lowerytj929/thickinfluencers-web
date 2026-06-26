'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Flame, Crown, User } from 'lucide-react';

const tabs = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Search', href: '/search', icon: Search },
  { label: 'Trending', href: '/trending', icon: Flame },
  { label: 'Premium', href: '/premium', icon: Crown },
  { label: 'Profile', href: '/profile', icon: User },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-bg-surface/95 backdrop-blur-lg border-t border-border-dark safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 min-w-[64px] rounded-lg transition-all duration-200 ${
                isActive
                  ? 'text-accent-pink'
                  : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'drop-shadow-glow' : ''}`} />
              <span className="text-[10px] font-medium leading-tight">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}