import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/shared/NavBar';
import MobileNav from '@/components/shared/MobileNav';
import Footer from '@/components/shared/Footer';
import AgeVerificationModal from '@/components/shared/AgeVerificationModal';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'ThickInfluencers — Premium Media Platform',
  description:
    'Discover and share premium media content from creators worldwide. A curated platform for visual storytelling and artistic expression.',
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
      </body>
    </html>
  );
}