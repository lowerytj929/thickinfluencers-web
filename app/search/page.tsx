"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Compass, TrendingUp, Users, Tag, ImageIcon, Loader2 } from "lucide-react";
import SearchBar from "@/components/shared/SearchBar";
import TagChip from "@/components/shared/TagChip";

const filterChips = [
  { value: "all", label: "All" },
  { value: "galleries", label: "Galleries" },
  { value: "creators", label: "Creators" },
  { value: "tags", label: "Tags" },
];

const suggestions = [
  { icon: ImageIcon, label: "Summer fashion", query: "summer fashion" },
  { icon: TrendingUp, label: "Trending this week", query: "trending" },
  { icon: Users, label: "Top creators", query: "top creators" },
  { icon: Tag, label: "Portrait photography", query: "portrait photography" },
  { icon: Compass, label: "New arrivals", query: "new arrivals" },
  { icon: ImageIcon, label: "Behind the scenes", query: "behind the scenes" },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const filter = searchParams.get("filter") || "all";
  const [activeFilter, setActiveFilter] = useState(filter);
  const [prevFilter, setPrevFilter] = useState(filter);
  const [isSearching, setIsSearching] = useState(false);

  if (filter !== prevFilter) {
    setPrevFilter(filter);
    setActiveFilter(filter);
  }

  const hasQuery = query.trim().length > 0;

  const handleSuggestion = (suggestion: string) => {
    setIsSearching(true);
    const params = new URLSearchParams();
    params.set("q", suggestion);
    if (activeFilter !== "all") params.set("filter", activeFilter);
    router.push(`/search?${params.toString()}`);
  };

  const handleCategory = (cat: string) => {
    setIsSearching(true);
    const params = new URLSearchParams();
    params.set("q", cat);
    params.set("filter", "tags");
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* ─── Search Header ─── */}
      <div className="border-b border-border-dark bg-bg-surface/50">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
            {hasQuery ? `Search: "${query}"` : "Search"}
          </h1>

          <div className="max-w-2xl">
            <SearchBar />
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2 mt-6">
            {filterChips.map((chip) => (
              <button
                key={chip.value}
                onClick={() => {
                  setActiveFilter(chip.value);
                  if (hasQuery) {
                    const params = new URLSearchParams();
                    params.set("q", query);
                    if (chip.value !== "all") params.set("filter", chip.value);
                    router.push(`/search?${params.toString()}`);
                  }
                }}
                className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all ${
                  activeFilter === chip.value
                    ? "bg-accent-pink text-white border-accent-pink"
                    : "bg-bg-card text-text-secondary border-border-dark hover:border-accent-pink/30 hover:text-text-primary"
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Results Area ─── */}
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {isSearching ? (
          <div className="text-center py-16">
            <Loader2 className="w-12 h-12 text-accent-pink mx-auto mb-4 animate-spin" />
            <p className="text-text-secondary">Searching the vault...</p>
          </div>
        ) : hasQuery ? (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-text-muted mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-text-primary mb-2">
              No results found
            </h2>
            <p className="text-text-secondary max-w-md mx-auto">
              No galleries or creators match &ldquo;{query}&rdquo; yet. Try different keywords or check back later as the vault grows.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {["summer", "portrait", "fashion", "travel", "nature", "fitness"].map((tag) => (
                <button key={tag} onClick={() => handleSuggestion(tag)}>
                  <TagChip label={tag} />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Empty state / Suggestions */
          <div>
            <div className="text-center mb-10">
              <Compass className="w-12 h-12 text-text-muted mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-text-primary mb-2">
                Discover Something New
              </h2>
              <p className="text-text-secondary max-w-md mx-auto">
                Type in the search bar above to find galleries, creators, and tags across the platform.
              </p>
            </div>

            {/* Suggestions */}
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider text-center">
                Try searching for...
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {suggestions.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => handleSuggestion(item.query)}
                      className="inline-flex items-center gap-2 px-5 py-3 bg-bg-card border border-border-dark rounded-xl text-sm text-text-secondary hover:text-accent-pink hover:border-accent-pink/30 transition-all"
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick category tags */}
            <div className="mt-12">
              <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider text-center">
                Browse Categories
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {["Fashion", "Portrait", "Travel", "Lifestyle", "Fine Art", "Editorial", "Nightlife", "Fitness", "Beauty", "Urban"].map((cat) => (
                  <button key={cat} onClick={() => handleCategory(cat)}>
                    <TagChip label={cat} variant="pink" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <Loader2 className="w-8 h-8 text-accent-pink animate-spin" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}