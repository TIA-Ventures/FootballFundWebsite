/**
 * Single source of truth for site-wide identity used by metadata, sitemap,
 * robots and the web manifest.
 *
 * NOTE: set NEXT_PUBLIC_SITE_URL to the real production domain (e.g. in
 * Vercel project env vars). The fallback below is a placeholder — update it
 * before launch so OG image URLs, the sitemap and robots resolve correctly.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://claravista.partners";

export const SITE_NAME = "Clara Vista Investment Partners";

export const SITE_DESCRIPTION =
  "A football & technology investment fund. We own exceptional football teams across the world in the most valuable leagues.";

/** Canonical routes, used to generate the sitemap. */
export const ROUTES = [
  "/",
  "/thesis",
  "/approach",
  "/portfolio",
  "/portfolio/ipswich",
  "/portfolio/italy",
  "/portfolio/spain",
  "/track-record",
  "/team",
] as const;
