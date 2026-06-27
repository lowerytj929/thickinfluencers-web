import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/shared/NavBar';
import MobileNav from '@/components/shared/MobileNav';
import Footer from '@/components/shared/Footer';
import AgeVerificationModal from '@/components/shared/AgeVerificationModal';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Thick Influencers | Your Private Influencer Vault',
    template: '%s | Thick Influencers',
  },
  description:
    'Your private vault for exclusive influencer media, premium memberships, and community access. Unlock the Vault with Vault Access or Vault Pro.',
  keywords: [
    'thick influencers',
    'vault empire',
    'premium content',
    'influencer vault',
    'exclusive media',
    'membership',
  ],
  authors: [{ name: 'Vault Empire' }],
  creator: 'Vault Empire',
  publisher: 'Vault Empire',
  metadataBase: new URL('https://thickinfluencers-web.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Thick Influencers',
    title: 'Thick Influencers | Your Private Influencer Vault',
    description:
      'Your private vault for exclusive influencer media, premium memberships, and community access.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thick Influencers | Your Private Influencer Vault',
    description:
      'Your private vault for exclusive influencer media, premium memberships, and community access.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0f',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-bg-primary text-text-primary font-sans min-h-screen flex flex-col">
        <AgeVerificationModal />
        <NavBar />
        <main className="flex-1 pt-16 pb-20 md:pb-0">{children}</main>
        <Footer />
        <MobileNav />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}