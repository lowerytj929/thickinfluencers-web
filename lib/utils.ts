import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind class names with conflict resolution. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format an ISO date string to a human-readable locale date. */
export function formatDate(
  dateString: string,
  options?: Intl.DateTimeFormatOptions,
): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid date";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  });
}

/** Format a view count with compact notation (e.g. 1.2K, 3.5M). */
export function formatViews(views: number): string {
  if (views < 1_000) return views.toString();
  if (views < 1_000_000) return `${(views / 1_000).toFixed(1)}K`;
  if (views < 1_000_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
  return `${(views / 1_000_000_000).toFixed(1)}B`;
}

/** Truncate a string to maxChars, appending an ellipsis if truncated. */
export function truncate(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars).trimEnd() + "…";
}

/** Convert any string to a URL-safe slug. */
export function slugify(text: string): string {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

/** Convert an amount in cents to a formatted dollar string (e.g. 1999 → "$19.99"). */
export function formatCents(cents: number): string {
  const dollars = cents / 100;
  return `$${dollars.toFixed(2)}`;
}
