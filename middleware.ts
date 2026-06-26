import { type NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@/lib/supabase/middleware";
import {
  AGE_VERIFIED_COOKIE,
  ADULT_CONTENT_ROUTES,
  PUBLIC_ROUTES,
  PROTECTED_ROUTES,
} from "@/lib/constants";

export async function middleware(request: NextRequest) {
  const { supabase, supabaseResponse } =
    await createMiddlewareClient(request);

  // ── 1. Refresh the session ──────────────────────────────────────────────
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // ── 2. Helper: check if a path matches any prefix in a list ─────────────
  const matchesAny = (prefixes: readonly string[]) =>
    prefixes.some((prefix) => pathname.startsWith(prefix));

  // ── 3. Detailed route matching ──────────────────────────────────────────
  const isPublicRoute = matchesAny(PUBLIC_ROUTES);

  // Static-file / internal Next.js paths are never intercepted
  const isStaticAsset =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/images") ||
    /\.(svg|png|jpg|jpeg|gif|webp|ico|css|js)$/.test(pathname);

  // Protected dashboard / admin / settings roots
  const isProtectedRoute = matchesAny(PROTECTED_ROUTES);

  // Creator edit pages: /creator/[slug]/edit
  const isCreatorEditRoute =
    /^\/creator\/.+\/edit(\/.*)?$/.test(pathname);

  // Gallery create / edit routes
  const isGalleryProtectedRoute =
    pathname.startsWith("/gallery/create") ||
    /^\/gallery\/.+\/edit(\/.*)?$/.test(pathname);

  // API routes (except public API endpoints)
  const isApiRoute = pathname.startsWith("/api");
  const isPublicApiRoute = pathname.startsWith("/api/public");

  // Adult-content routes that trigger the age gate
  const isAdultContentRoute = matchesAny(ADULT_CONTENT_ROUTES);

  // Everything that requires one of the protections below
  const needsAuth =
    isProtectedRoute || isCreatorEditRoute || isGalleryProtectedRoute;

  const needsAgeGate =
    isAdultContentRoute && !isPublicRoute;

  // ── 4. Age gate check (redirect to /auth if cookie missing) ────────────
  if (needsAgeGate || isGalleryProtectedRoute) {
    const ageVerified =
      request.cookies.get(AGE_VERIFIED_COOKIE)?.value === "true";
    if (!ageVerified) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth";
      url.searchParams.set("age_gate", "1");
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
  }

  // ── 5. Auth check for protected routes ─────────────────────────────────
  if (needsAuth && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // ── 6. API route protection (non-public) ───────────────────────────────
  if (isApiRoute && !isPublicApiRoute && !user) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }

  // ── 7. Static assets — never block ─────────────────────────────────────
  if (isStaticAsset) {
    return supabaseResponse;
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    // Match all paths except Next.js internals and static files
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};