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
    <footer className="hidden md:block bg-bg-card border-t border-border-dark mt-auto">
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
        <p className="text-center text-xs text-text-muted max-w-2xl mx-auto leading-relaxed mb-4">
          All content displayed on this platform is authorized, consensual, and complies with
          applicable laws and regulations. ThickInfluencers is a media-sharing platform for
          artistic and creative expression. Content creators are verified and all uploads
          are reviewed for compliance.
        </p>

        {/* Copyright */}
        <p className="text-center text-xs text-text-muted">
          &copy; {new Date().getFullYear()} ThickInfluencers. All rights reserved.
        </p>
      </div>
    </footer>
  );
}