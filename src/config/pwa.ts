/**
 * Inline service worker registration for the web shell.
 * Kept in a module so public/index.html stays readable.
 */
export const SERVICE_WORKER_REGISTRATION_SCRIPT = `
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
  });
}
`;

export const PWA_THEME_COLOR = "#4C1D95";
export const PWA_BACKGROUND_COLOR = "#ffffff";
export const PWA_APP_NAME = "ContraSafe";
export const PWA_DESCRIPTION =
  "Evidence-based contraceptive recommendations tailored to your preferences and health profile.";
