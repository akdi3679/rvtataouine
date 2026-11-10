import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

// Initialiser le middleware d'internationalisation
const intlMiddleware = createIntlMiddleware(routing);
const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

export function proxy(request: NextRequest) {
  // 1. Laisser next-intl gérer la détection et la redirection de langue
  const response = intlMiddleware(request);

  // 2. Appliquer les en-têtes de sécurité sur la réponse
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
  response.headers.set("Strict-Transport-Security", "max-age=300");

  // 3. Filtre de sécurité grossier pour les mutations (protection CSRF)
  const url = request.nextUrl;
  const method = request.method;

  if (!SAFE_METHODS.has(method)) {
    const site = request.headers.get("sec-fetch-site");
    const origin = request.headers.get("origin");
    
    const isWebhook = url.pathname.startsWith("/api/webhooks/");
    const isSameOrigin = site === "same-origin" || origin === url.origin;

    if (!isWebhook && !isSameOrigin) {
      return new NextResponse(null, { status: 403, statusText: "Forbidden" });
    }
  }

  return response;
}

export const config = {
  matcher: [
    // Exclure les fichiers statiques, images, favicons, sitemap, robots et extensions de fichiers
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};