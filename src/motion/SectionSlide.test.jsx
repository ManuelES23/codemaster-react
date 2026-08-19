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
    // authored starting values (140px down, 0.9 scale, invisible), not
    // some placeholder or the settled 0/1/1 state.
    const { container } = render(<SectionSlide>contenido</SectionSlide>);
    const html = container.firstChild.outerHTML;
    expect(html).toMatch(/translateY\(140px\)/);
    expect(html).toMatch(/scale\(0\.9\)/);
    expect(html).toMatch(/opacity:\s*0(?:[^.]|$)/);
  });

  it("does not displace or hide anything under reduced motion, even in this pre-entrance state", () => {
    // Unlike the retired ScrollExit (an exit effect, where both the reduced
    // and non-reduced branches coincide at progress 0), this primitive's
    // branches genuinely differ at progress 0: reduced motion resolves to
    // y:0/scale:1/opacity:1 there, non-reduced to y:140/scale:0.9/opacity:0.
    // jsdom staying pinned at progress 0 doesn't erase that difference
    // here, so this guard is actually exercised, not just asserted.
    setReducedMotion(true);
    const { container } = render(<SectionSlide>contenido</SectionSlide>);
    const html = container.firstChild.outerHTML;
    expect(html).not.toMatch(/translateY\((?!0px)/);
    expect(html).not.toMatch(/scale\((?!1\)|1px)/);
    expect(html).not.toMatch(/opacity:\s*0(?:[^.]|$)/);
    expect(screen.getByText("contenido")).toBeInTheDocument();
  });

  it("passes className through to its outer wrapper", () => {
    const { container } = render(
      <SectionSlide className="relative z-[3] -mt-6">contenido</SectionSlide>
    );
    expect(container.firstChild).toHaveClass("relative", "z-[3]", "-mt-6");
  });
});
