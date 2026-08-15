import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { setReducedMotion } from "../test/setup";
import Reveal from "./Reveal";

describe("Reveal", () => {
  it("renders its children", () => {
    render(<Reveal>contenido</Reveal>);
    expect(screen.getByText("contenido")).toBeInTheDocument();
  });

  it("renders the element type given by the `as` prop", () => {
    render(<Reveal as="section">seccion</Reveal>);
    expect(screen.getByText("seccion").tagName).toBe("SECTION");
  });

  it("passes className through", () => {
    render(<Reveal className="mi-clase">x</Reveal>);
    expect(screen.getByText("x")).toHaveClass("mi-clase");
  });

  it("does not translate when reduced motion is requested", () => {
    setReducedMotion(true);
    render(<Reveal distance={24}>sin-movimiento</Reveal>);
    const node = screen.getByText("sin-movimiento");
    expect(node.style.transform ?? "").not.toMatch(/translateY\(-?[1-9]/);
  });
});
