import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { setReducedMotion } from "../test/setup";
import Rule from "./Rule";

describe("Rule", () => {
  it("renders a full-width hairline", () => {
    const { container } = render(<Rule />);
    expect(container.firstChild).toHaveClass("h-px", "w-full", "bg-line");
  });

  it("passes className through", () => {
    const { container } = render(<Rule className="mt-20" />);
    expect(container.firstChild).toHaveClass("mt-20");
  });

  it("does not draw itself in when reduced motion is requested", () => {
    setReducedMotion(true);
    const { container } = render(<Rule />);
    expect(container.firstChild.style.transform ?? "").not.toMatch(/scaleX\(0/);
  });
});
