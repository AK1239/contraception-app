/**
 * Workbox configuration for ContraSafe PWA offline support.
 * Generated service worker precaches static assets after `expo export -p web`.
 */
module.exports = {
  globDirectory: "dist/",
  globPatterns: [
    "**/*.{js,css,html,png,jpg,jpeg,svg,ico,json,ttf,woff,woff2}",
  ],
  swDest: "dist/sw.js",
  clientsClaim: true,
  skipWaiting: true,
  maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
  navigateFallback: "/index.html",
  navigateFallbackDenylist: [/^\/_/, /\/[^/?]+\.[^/]+$/],
};
