import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { setReducedMotion, dispararInterseccion } from "../test/setup";
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

  describe("once", () => {
    it("defaults to staying visible after it leaves the viewport (once=true)", async () => {
      render(<Reveal>tarjeta</Reveal>);
      const node = screen.getByText("tarjeta");
      // observe() (called on mount) already fired isIntersecting:true once,
      // per the stub's default behavior — confirm it landed before probing
      // the exit case.
      await waitFor(() => expect(node.outerHTML).toMatch(/opacity:\s*1/));

      // A real once:true viewport unobserves after that first trigger, so a
      // later "left the viewport" signal should never even reach a
      // component that's honoring it — and dispararInterseccion only
      // delivers to targets still present in the stub's registry, which is
      // exactly what unobserve()/disconnect() remove. This proves the
      // unobserve actually happened, not just that the visible style
      // happened to stick around.
      dispararInterseccion(node, false);
      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(node.outerHTML).toMatch(/opacity:\s*1/);
    });

    it("fades back out when it leaves the viewport with once={false}", async () => {
      render(<Reveal once={false}>tarjeta</Reveal>);
      const node = screen.getByText("tarjeta");
      await waitFor(() => expect(node.outerHTML).toMatch(/opacity:\s*1/));

      dispararInterseccion(node, false);
      await waitFor(() => expect(node.outerHTML).toMatch(/opacity:\s*0(?:[^.]|$)/));
    });
  });
});
