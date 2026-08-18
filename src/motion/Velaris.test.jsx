import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { setReducedMotion } from "../test/setup";
import Velaris from "./Velaris";

describe("Velaris", () => {
  it("renders its children", () => {
    render(<Velaris>contenido</Velaris>);
    expect(screen.getByText("contenido")).toBeInTheDocument();
  });

  it("renders a canvas element for the shader", () => {
    const { container } = render(<Velaris>contenido</Velaris>);
    expect(container.querySelector("canvas")).toBeInTheDocument();
  });

  // jsdom has no WebGL implementation, so canvas.getContext("webgl") returns
  // null here — the component's own `if (!gl) return;` guard is what's under
  // test: it must not throw when no rendering context is available, whether
  // or not reduced motion is requested.
  it("does not throw when no WebGL context is available", () => {
    expect(() => render(<Velaris>contenido</Velaris>)).not.toThrow();
  });

  it("does not throw under reduced motion either", () => {
    setReducedMotion(true);
    expect(() => render(<Velaris>contenido</Velaris>)).not.toThrow();
  });
});
