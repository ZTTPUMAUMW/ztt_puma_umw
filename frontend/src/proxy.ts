import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import type { NextRequest } from "next/server";

// Create the internationalization middleware
const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  // First, apply internationalization
  const response = intlMiddleware(request);

  // Then add security headers
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "origin-when-cross-origin");

  // Cache static assets aggressively
  const url = request.nextUrl;
  if (url.pathname.startsWith("/_next/static")) {
    response.headers.set("Cache-Control", "public, max-age=31536000, immutable");
  }

  if (url.pathname.startsWith("/images")) {
    response.headers.set("Cache-Control", "public, max-age=86400, must-revalidate");
  }

  return response;
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
