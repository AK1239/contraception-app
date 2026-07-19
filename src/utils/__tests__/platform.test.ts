import { Platform } from "react-native";
import {
  getAppDistribution,
  isInstallableWebContext,
  isStandalonePwa,
} from "../platform";

jest.mock("react-native", () => ({
  Platform: { OS: "web" },
}));

describe("platform", () => {
  const originalWindow = global.window;

  afterEach(() => {
    global.window = originalWindow;
  });

  describe("isStandalonePwa", () => {
    it("returns false when window is unavailable", () => {
      // @ts-expect-error simulate non-browser runtime
      delete global.window;
      expect(isStandalonePwa()).toBe(false);
    });

    it("returns true when display-mode is standalone", () => {
      global.window = {
        matchMedia: jest.fn().mockReturnValue({ matches: true }),
        navigator: {},
      } as unknown as Window & typeof globalThis;

      expect(isStandalonePwa()).toBe(true);
    });
  });

  describe("getAppDistribution", () => {
    it("returns web-browser for normal web sessions", () => {
      global.window = {
        matchMedia: jest.fn().mockReturnValue({ matches: false }),
        navigator: {},
      } as unknown as Window & typeof globalThis;

      expect(getAppDistribution()).toBe("web-browser");
    });

    it("returns pwa for standalone web sessions", () => {
      global.window = {
        matchMedia: jest.fn().mockReturnValue({ matches: true }),
        navigator: {},
      } as unknown as Window & typeof globalThis;

      expect(getAppDistribution()).toBe("pwa");
    });
  });

  describe("isInstallableWebContext", () => {
    it("returns true in a regular browser tab", () => {
      global.window = {
        matchMedia: jest.fn().mockReturnValue({ matches: false }),
        navigator: {},
      } as unknown as Window & typeof globalThis;

      expect(isInstallableWebContext()).toBe(true);
    });

    it("returns false when already installed as a PWA", () => {
      global.window = {
        matchMedia: jest.fn().mockReturnValue({ matches: true }),
        navigator: {},
      } as unknown as Window & typeof globalThis;

      expect(isInstallableWebContext()).toBe(false);
    });
  });

  describe("native platforms", () => {
    it("returns native-android when Platform.OS is android", () => {
      Platform.OS = "android";
      expect(getAppDistribution()).toBe("native-android");
    });

    it("returns native-ios when Platform.OS is ios", () => {
      Platform.OS = "ios";
      expect(getAppDistribution()).toBe("native-ios");
    });
  });
});
