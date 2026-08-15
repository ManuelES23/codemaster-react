import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { setReducedMotion } from "../test/setup";
import Parallax from "./Parallax";

const innerOf = (node) => node.parentElement;

describe("Parallax", () => {
  it("renders its children", () => {
    render(<Parallax>captura</Parallax>);
    expect(screen.getByText("captura")).toBeInTheDocument();
  });

  it("applies a scroll-linked transform when motion is allowed", () => {
    render(<Parallax offset={60}>captura</Parallax>);
    const inner = innerOf(screen.getByText("captura"));
    expect(inner.outerHTML).toMatch(/translateY\(60px\)/);
  });

  it("applies no transform when reduced motion is requested", () => {
    setReducedMotion(true);
    render(<Parallax offset={60}>captura</Parallax>);
    const inner = innerOf(screen.getByText("captura"));
    expect(inner.outerHTML).not.toMatch(/translateY/);
  });
});
