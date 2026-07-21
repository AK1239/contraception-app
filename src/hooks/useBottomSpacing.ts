import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/** Minimum bottom inset when the OS/browser reports none (common on mobile web/PWA). */
const MIN_BOTTOM_INSET = 12;

/**
 * Returns reliable bottom spacing for footers and fixed controls.
 * Safe-area alone is often 0 in mobile browsers; keep a small minimum so
 * controls aren't flush against the home indicator / screen edge.
 *
 * Viewport chrome (Safari toolbar) must be handled by sizing the app root to
 * the visual viewport (see public/index.html) — do not try to pad it away here.
 */
export function useBottomSpacing(extraPadding = 16): number {
  const insets = useSafeAreaInsets();
  return Math.max(insets.bottom, MIN_BOTTOM_INSET) + extraPadding;
}

/**
 * Returns reliable top inset for headers when needed outside navigation chrome.
 */
export function useTopSpacing(extraPadding = 0): number {
  const insets = useSafeAreaInsets();
  const minTopInset = Platform.OS === "web" ? 0 : 0;
  return Math.max(insets.top, minTopInset) + extraPadding;
}
