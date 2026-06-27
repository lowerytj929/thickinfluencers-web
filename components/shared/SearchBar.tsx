'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter } from 'lucide-react';

const filterOptions = [
  { value: 'all', label: 'All Content' },
  { value: 'trending', label: 'Trending' },
  { value: 'recent', label: 'Most Recent' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'premium', label: 'Premium Only' },
];

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    const params = new URLSearchParams();
    params.set('q', q);
    if (selectedFilter !== 'all') params.set('filter', selectedFilter);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-2xl">
      <div className="flex items-center gap-2">
        {/* Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search galleries, creators, tags..."
            className="w-full h-11 pl-10 pr-4 bg-bg-surface border border-border-dark rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-pink/50 focus:ring-1 focus:ring-accent-pink/20 transition-all"
          />
        </div>

        {/* Filter button */}
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="flex items-center justify-center w-11 h-11 rounded-lg bg-bg-surface border border-border-dark text-text-secondary hover:text-accent-pink hover:border-accent-pink/30 transition-all"
          aria-label="Filter"
        >
          <Filter className="w-4 h-4" />
        </button>
      </div>

      {/* Filter dropdown */}
      {filterOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-bg-card border border-border-dark rounded-lg shadow-xl z-20 animate-fade-in">
          <div className="py-1">
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setSelectedFilter(opt.value);
                  setFilterOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  selectedFilter === opt.value
                    ? 'text-accent-pink bg-accent-pink/5'
                    : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </form>
  );
}