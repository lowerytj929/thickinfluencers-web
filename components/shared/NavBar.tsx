'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  Search,
  LogIn,
  UserPlus,
  Menu,
  X,
  Flame,
  User,
  LogOut,
  Lock,
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
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
    router.refresh();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container-app flex items-center justify-between h-16">
        {/* Left: Decked Out Vault Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ff007a] via-[#a855f7] to-[#00f2fe] p-[2px] shadow-[0_0_20px_rgba(255,0,122,0.5)] group-hover:shadow-[0_0_30px_rgba(255,0,122,0.8)] transition-all duration-300">
            <div className="flex items-center justify-center w-full h-full bg-[#0a0810] rounded-[10px]">
              <Lock className="w-5 h-5 text-accent-pink group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="gradient-text text-xl font-black tracking-wider uppercase leading-none">
              THICK INFLUENCERS
            </span>
            <span className="text-[10px] font-extrabold tracking-[0.2em] text-accent-pink/90 uppercase mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-pink animate-pulse" /> THE UNCENSORED VAULT
            </span>
          </div>
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
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="btn-primary text-sm !py-2 !px-5 flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className="btn-secondary text-sm !py-2 !px-4 flex items-center gap-1.5 hover:text-red-400 hover:border-red-400/30"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
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
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-accent-pink rounded-lg hover:bg-white/5 transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  <User className="w-5 h-5" />
                  My Dashboard / Profile
                </Link>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleSignOut();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 rounded-lg hover:bg-white/5 transition-all text-left"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}