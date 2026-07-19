import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IS_WEB } from "../utils/platform";

/** Minimum bottom inset when the OS/browser reports none (common on mobile web/PWA). */
const MIN_BOTTOM_INSET = IS_WEB ? 40 : 12;

/**
 * Returns reliable bottom spacing for footers and fixed controls.
 * Mobile browsers often report 0 safe-area inset even when a home bar overlaps content.
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
