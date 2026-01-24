import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useIsMobile, useIsAndroid } from "@/hooks/useIsMobile";

describe("useIsMobile and useIsAndroid hooks", () => {
  let originalNavigator: Navigator;

  beforeEach(() => {
    originalNavigator = global.navigator;
  });

  afterEach(() => {
    global.navigator = originalNavigator;
  });

  describe("useIsAndroid", () => {
    it("should detect Android devices", () => {
      Object.defineProperty(global.navigator, "userAgent", {
        value: "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36",
        configurable: true,
      });

      const { result } = renderHook(() => useIsAndroid());
      expect(result.current).toBe(true);
    });

    it("should return false for iOS devices", () => {
      Object.defineProperty(global.navigator, "userAgent", {
        value: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15",
        configurable: true,
      });

      const { result } = renderHook(() => useIsAndroid());
      expect(result.current).toBe(false);
    });

    it("should return false for desktop browsers", () => {
      Object.defineProperty(global.navigator, "userAgent", {
        value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        configurable: true,
      });

      const { result } = renderHook(() => useIsAndroid());
      expect(result.current).toBe(false);
    });
  });

  describe("useIsMobile", () => {
    it("should detect mobile devices via user agent", () => {
      Object.defineProperty(global.navigator, "userAgent", {
        value: "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36",
        configurable: true,
      });

      const { result } = renderHook(() => useIsMobile());
      expect(result.current).toBe(true);
    });

    it("should detect iOS devices", () => {
      Object.defineProperty(global.navigator, "userAgent", {
        value: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15",
        configurable: true,
      });

      const { result } = renderHook(() => useIsMobile());
      expect(result.current).toBe(true);
    });
  });
});
