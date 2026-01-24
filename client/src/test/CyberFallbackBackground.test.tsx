import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { CyberFallbackBackground } from "@/components/animations/CyberFallbackBackground";

describe("CyberFallbackBackground", () => {
  it("should render without crashing", () => {
    const { container } = render(<CyberFallbackBackground />);
    expect(container).toBeTruthy();
  });

  it("should render base gradient background", () => {
    const { container } = render(<CyberFallbackBackground />);
    const baseGradient = container.querySelector('.bg-gradient-to-br');
    expect(baseGradient).toBeTruthy();
  });

  it("should render gradient orbs for Android visibility", () => {
    const { container } = render(<CyberFallbackBackground />);
    const orbs = container.querySelectorAll('.blur-3xl');
    expect(orbs.length).toBeGreaterThanOrEqual(3); // At least 3 orbs
  });

  it("should render grid pattern with increased opacity", () => {
    const { container } = render(<CyberFallbackBackground />);
    const gridPattern = container.querySelector('.opacity-20');
    expect(gridPattern).toBeTruthy();
  });

  it("should render corner accents", () => {
    const { container } = render(<CyberFallbackBackground />);
    // Check for corner elements by finding divs with border classes
    const corners = Array.from(container.querySelectorAll('div')).filter(
      (el) => el.className.includes('border-t-4') || el.className.includes('border-b-4')
    );
    expect(corners.length).toBe(4); // 4 corners
  });

  it("should render animated scan lines", () => {
    const { container } = render(<CyberFallbackBackground />);
    const scanLines = container.querySelector('.pointer-events-none');
    expect(scanLines).toBeTruthy();
  });
});
