import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AgeVerificationModal from "@/components/shared/AgeVerificationModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Thick Influencers | Your Private Influencer Vault",
  description: "The Internet's Largest Influencer Vault. 200,000+ community reach across our network. Updated daily. Only approved, consensual 18+ content.",
  keywords: ["influencer vault", "private membership", "exclusive content", "influencers"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className={`${inter.className} min-h-full flex flex-col bg-[#0A0508] text-white`}>
        <AgeVerificationModal />
        {children}
      </body>
    </html>
  );
}
