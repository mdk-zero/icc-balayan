import type { NextConfig } from "next";

/**
 * The site is exported as plain files (`out/`) so it can be uploaded to
 * cPanel shared hosting with no Node.js. That rules out Next's redirects and
 * image optimisation: redirects from the old WordPress addresses live in
 * public/.htaccess, and images are served as they are in public/, so keep
 * them compressed before adding them.
 */
const nextConfig: NextConfig = {
  output: "export",
  // Emits /about/index.html rather than /about.html, which Apache serves
  // without any rewrite rules.
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
