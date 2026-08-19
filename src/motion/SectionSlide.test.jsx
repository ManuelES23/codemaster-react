import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { setReducedMotion } from "../test/setup";
import SectionSlide from "./SectionSlide";

describe("SectionSlide", () => {
  it("renders its children", () => {
    render(<SectionSlide>contenido</SectionSlide>);
    expect(screen.getByText("contenido")).toBeInTheDocument();
  });

  it("renders in its pre-entrance state before any scrolling, like Reveal/Stagger do", () => {
    // jsdom never scrolls, so scrollYProgress stays at its initial 0 — the
    // "hasn't entered yet" state, same convention as this codebase's other
    // whileInView-driven primitives (Reveal, Stagger), which also render
    // pre-animation on first paint. At progress 0 this must show the
    // authored starting values (64px down, 0.97 scale), not some
    // placeholder or the settled 0/1 state.
    const { container } = render(<SectionSlide>contenido</SectionSlide>);
    const html = container.firstChild.outerHTML;
    expect(html).toMatch(/translateY\(64px\)/);
    expect(html).toMatch(/scale\(0\.97\)/);
  });

  it("does not displace anything under reduced motion, even in this pre-entrance state", () => {
    // Unlike the retired ScrollExit (an exit effect, where both the reduced
    // and non-reduced branches coincide at progress 0), this primitive's
    // two branches genuinely differ at progress 0: reduced motion resolves
    // to y:0/scale:1 there, non-reduced to y:64/scale:0.97. jsdom staying
    // pinned at progress 0 doesn't erase that difference here, so this
    // guard is actually exercised, not just asserted.
    setReducedMotion(true);
    const { container } = render(<SectionSlide>contenido</SectionSlide>);
    const html = container.firstChild.outerHTML;
    expect(html).not.toMatch(/translateY\((?!0px)/);
    expect(html).not.toMatch(/scale\((?!1\)|1px)/);
    expect(screen.getByText("contenido")).toBeInTheDocument();
  });

  it("passes className through to its outer wrapper", () => {
    const { container } = render(
      <SectionSlide className="relative z-[3] -mt-6">contenido</SectionSlide>
    );
    expect(container.firstChild).toHaveClass("relative", "z-[3]", "-mt-6");
  });
});
