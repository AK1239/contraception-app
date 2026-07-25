import { Platform, useWindowDimensions } from "react-native";

const DESKTOP_BREAKPOINT = 768;

/** True when running in a browser on a desktop-sized viewport. */
export function useDesktopLayout(): boolean {
  const { width } = useWindowDimensions();
  return Platform.OS === "web" && width >= DESKTOP_BREAKPOINT;
}
