import { Platform } from "react-native";

export const IS_WEB = Platform.OS === "web";
export const IS_NATIVE = Platform.OS === "ios" || Platform.OS === "android";
export const IS_IOS = Platform.OS === "ios";
export const IS_ANDROID = Platform.OS === "android";

export type AppDistribution =
  | "native-android"
  | "native-ios"
  | "pwa"
  | "web-browser";

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

/**
 * Describes how the user is currently running ContraSafe.
 * Useful for showing install prompts, store links, or web-only UI.
 */
export function getAppDistribution(): AppDistribution {
  if (Platform.OS === "android") {
    return "native-android";
  }

  if (Platform.OS === "ios") {
    return "native-ios";
  }

  if (isStandalonePwa()) {
    return "pwa";
  }

  return "web-browser";
}

/** True in a mobile/desktop browser tab where PWA install is relevant. */
export function isInstallableWebContext(): boolean {
  return Platform.OS === "web" && !isStandalonePwa();
}
