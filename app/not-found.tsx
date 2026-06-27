import Link from "next/link";
import { SearchX, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-accent-pink/10 flex items-center justify-center mx-auto mb-6">
          <SearchX className="w-8 h-8 text-accent-pink" />
        </div>
        <h1 className="text-6xl font-black text-text-primary mb-4">404</h1>
        <p className="text-xl font-bold text-text-primary mb-2">Page Not Found</p>
        <p className="text-text-secondary mb-8 text-sm">
          This page doesn&apos;t exist or has been moved. The vault only contains
          what we&apos;ve unlocked so far.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-pink to-accent-purple text-white font-semibold rounded-xl hover:opacity-90 transition-all text-sm"
        >
          <Home className="w-4 h-4" />
          Return Home
        </Link>
      </div>
    </div>
  );
}