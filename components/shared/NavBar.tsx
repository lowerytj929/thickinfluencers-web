'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  LogIn,
  UserPlus,
  Menu,
  X,
  Flame,
} from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Trending', href: '/search?sort=trending' },
  { label: 'Galleries', href: '/search' },
  { label: 'Premium', href: '/premium' },
  { label: 'Search', href: '/search', icon: Search },
];

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container-app flex items-center justify-between h-16">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Flame className="w-6 h-6 text-accent-pink" />
          <span className="gradient-text text-lg font-extrabold tracking-tight whitespace-nowrap">
            ThickInfluencers
          </span>
        </Link>

        {/* Center: Nav links (desktop) */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-text-secondary rounded-lg hover:text-accent-pink hover:bg-white/5 transition-all duration-200"
              >
                {Icon && <Icon className="w-4 h-4" />}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Auth buttons (desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/auth"
            className="btn-secondary text-sm !py-2 !px-5"
          >
            <LogIn className="w-4 h-4" />
            Login
          </Link>
          <Link
            href="/auth"
            className="btn-primary text-sm !py-2 !px-5"
          >
            <UserPlus className="w-4 h-4" />
            Sign Up
          </Link>
        </div>

        {/* Mobile: Hamburger */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 text-text-secondary hover:text-accent-pink transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border-dark animate-fade-in">
          <div className="container-app py-4 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-text-secondary rounded-lg hover:text-accent-pink hover:bg-white/5 transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  {Icon && <Icon className="w-5 h-5" />}
                  {link.label}
                </Link>
              );
            })}
            <hr className="border-border-dark my-3" />
            <Link
              href="/auth"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-text-secondary rounded-lg hover:text-accent-pink hover:bg-white/5 transition-all"
              onClick={() => setMobileOpen(false)}
            >
              <LogIn className="w-5 h-5" />
              Login
            </Link>
            <Link
              href="/auth"
              className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-accent-pink rounded-lg hover:bg-white/5 transition-all"
              onClick={() => setMobileOpen(false)}
            >
              <UserPlus className="w-5 h-5" />
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}