import { Platform } from "react-native";

export const IS_WEB = Platform.OS === "web";
export const IS_NATIVE = Platform.OS === "ios" || Platform.OS === "android";
export const IS_IOS = Platform.OS === "ios";
export const IS_ANDROID = Platform.OS === "android";

/**
 * Returns true when the app is running as an installed PWA (standalone display mode).
 * Always false on native platforms.
 */
export function isStandalonePwa(): boolean {
  if (!IS_WEB || typeof window === "undefined") {
    return false;
  }

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}
