import type { Metadata } from 'next';
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
  title: 'Thick Influencers | Your Private Influencer Vault',
  description:
    'Discover and share premium influencer content. Your private vault for exclusive media, memberships, and community access.',
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