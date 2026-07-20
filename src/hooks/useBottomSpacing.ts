import React from "react";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IS_WEB } from "../utils/platform";

/** Minimum bottom inset when the OS/browser reports none (common on mobile web/PWA). */
const MIN_BOTTOM_INSET = IS_WEB ? 12 : 12;

function readWebBrowserBottomOverlay(): number {
  if (!IS_WEB || typeof window === "undefined") {
    return 0;
  }

  const visualViewport = window.visualViewport;
  if (!visualViewport) {
    return 0;
  }

  return Math.max(0, window.innerHeight - visualViewport.height - visualViewport.offsetTop);
}

/**
 * Returns reliable bottom spacing for footers and fixed controls.
 * Mobile browsers often report 0 safe-area inset even when a home bar overlaps content.
 */
export function useBottomSpacing(extraPadding = 16): number {
  const insets = useSafeAreaInsets();
  const [webBrowserOverlay, setWebBrowserOverlay] = React.useState(() =>
    readWebBrowserBottomOverlay()
  );

  React.useEffect(() => {
    if (!IS_WEB || typeof window === "undefined") {
      return;
    }

    const visualViewport = window.visualViewport;
    if (!visualViewport) {
      return;
    }

    const updateOverlay = () => {
      setWebBrowserOverlay(readWebBrowserBottomOverlay());
    };

    visualViewport.addEventListener("resize", updateOverlay);
    visualViewport.addEventListener("scroll", updateOverlay);
    window.addEventListener("resize", updateOverlay);
    updateOverlay();

    return () => {
      visualViewport.removeEventListener("resize", updateOverlay);
      visualViewport.removeEventListener("scroll", updateOverlay);
      window.removeEventListener("resize", updateOverlay);
    };
  }, []);

  const inset = Math.max(insets.bottom, webBrowserOverlay, MIN_BOTTOM_INSET);
  return inset + extraPadding;
}

/**
 * Returns reliable top inset for headers when needed outside navigation chrome.
 */
export function useTopSpacing(extraPadding = 0): number {
  const insets = useSafeAreaInsets();
  const minTopInset = Platform.OS === "web" ? 0 : 0;
  return Math.max(insets.top, minTopInset) + extraPadding;
}
