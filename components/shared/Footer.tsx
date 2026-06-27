import Link from 'next/link';

const footerLinks = [
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Copyright Policy', href: '/copyright' },
  { label: 'Compliance', href: '/compliance' },
  { label: 'Takedown', href: '/takedown' },
  { label: 'Contact Admin', href: 'https://t.me/richballer1' },
];

export default function Footer() {
  return (
    <footer className="bg-bg-card border-t border-border-dark mt-auto pb-24 md:pb-0">
      <div className="container-app py-10">
        {/* Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-6">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-muted hover:text-accent-pink transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Social Placeholder */}
        <div className="flex justify-center gap-4 mb-6">
          {['Twitter', 'Instagram', 'Discord', 'Telegram'].map((social) => (
            <span
              key={social}
              className="w-9 h-9 rounded-full bg-bg-surface border border-border-dark flex items-center justify-center text-xs text-text-muted cursor-not-allowed opacity-60"
              title={`${social} — coming soon`}
            >
              {social.charAt(0)}
            </span>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="text-center text-xs text-text-muted max-w-3xl mx-auto leading-relaxed mb-6 space-y-2 bg-bg-surface/50 p-4 rounded-xl border border-border-dark/50">
          <p className="font-semibold text-text-secondary">
            ⚠️ FAIR USE & OWNERSHIP NOTICE — NO RIGHTS CLAIMED
          </p>
          <p>
            All models, images, videos, trademarks, brand names, and social media links featured on this platform are the sole property of their respective creators and copyright owners. ThickInfluencers claims no ownership rights, copyrights, or exclusive representation over any featured models or external media. This platform operates strictly as an independent search directory and promotional aggregator linking to third-party public content and official social profiles.
          </p>
          <p>
            All content displayed complies with 18+ verification standards. If you are a content owner and wish to request removal or modification of your indexing profile, please visit our Takedown or Copyright Policy pages.
          </p>
        </div>

        {/* Copyright */}
        <p className="text-center text-xs text-text-muted">
          &copy; {new Date().getFullYear()} ThickInfluencers. All rights reserved. Promotional Index & Search Service.
        </p>
      </div>
    </footer>
  );
}