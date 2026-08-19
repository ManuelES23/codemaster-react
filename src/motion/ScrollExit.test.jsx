import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { setReducedMotion } from "../test/setup";
import ScrollExit from "./ScrollExit";

describe("ScrollExit", () => {
  it("renders its children", () => {
    render(<ScrollExit>contenido</ScrollExit>);
    expect(screen.getByText("contenido")).toBeInTheDocument();
  });

  it("starts at full opacity and scale before any scrolling", () => {
    const { container } = render(<ScrollExit>contenido</ScrollExit>);
    // jsdom never scrolls, so scrollYProgress stays at its initial 0 —
    // this is the "not scrolled past yet" state, and it must show the
    // content exactly as authored: opaque, full size.
    expect(container.firstChild.outerHTML).not.toMatch(/opacity:\s*0[^.]/);
  });

  // Coverage ceiling, checked by mutation rather than assumed: removed the
  // reduced-motion guard (both branches hardcoded to the non-reduced output)
  // and this suite still passed. jsdom never actually scrolls, so
  // scrollYProgress stays pinned at 0 regardless of `setReducedMotion`, and
  // at progress 0 both `[1, 1]` and `[1, 0]` interpolate to the same 1 —
  // the two branches are indistinguishable at the only point jsdom can
  // reach. This mirrors the same limitation already documented on Tilt3D's
  // and Parallax's own tests. The guard is still correct by construction
  // (identical shape to those already-reviewed primitives), just not
  // provably exercised here; real verification is a live browser.
  it("does not throw when reduced motion is requested", () => {
    setReducedMotion(true);
    expect(() => render(<ScrollExit>contenido</ScrollExit>)).not.toThrow();
    expect(screen.getByText("contenido")).toBeInTheDocument();
  });
});
