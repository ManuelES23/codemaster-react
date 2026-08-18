import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { setReducedMotion } from "../test/setup";
import Tilt3D from "./Tilt3D";

// jsdom reports every element as 0x0, and Tilt3D guards against a zero-size
// rect to keep NaN out of the transform. Without a stubbed rect the tilt can
// never activate and the assertion below would pass against any implementation.
const conRect = (node) =>
  (node.getBoundingClientRect = () => ({
    left: 0, top: 0, width: 320, height: 200, right: 320, bottom: 200, x: 0, y: 0,
  }));

// jsdom (this project pins jsdom 25.0.1) has no native PointerEvent constructor,
// so @testing-library/dom's fireEvent.pointerMove — which is declared against
// PointerEvent in its own event map — silently falls back to a bare Event with
// no clientX/clientY. Tilt3D would then compute NaN from `undefined - box.left`,
// and that NaN propagates forever once it enters a motion value. A MouseEvent
// typed as "pointermove" carries real coordinates and still reaches a React
// onPointerMove handler, because DOM dispatch matches listeners by event.type,
// not by the constructor used to build the event.
const moverPuntero = (node, { clientX, clientY }) =>
  fireEvent(node, new MouseEvent("pointermove", { bubbles: true, cancelable: true, clientX, clientY }));

describe("Tilt3D", () => {
  it("renders its children", () => {
    render(<Tilt3D>contenido</Tilt3D>);
    expect(screen.getByText("contenido")).toBeInTheDocument();
  });

  it("establishes a 3D perspective on the wrapper", () => {
    const { container } = render(<Tilt3D>contenido</Tilt3D>);
    expect(container.firstChild.outerHTML).toMatch(/perspective/);
  });

  it("tilts when the pointer moves across it", async () => {
    render(<Tilt3D max={8}>contenido</Tilt3D>);
    const node = screen.getByText("contenido");
    conRect(node);
    moverPuntero(node, { clientX: 160, clientY: 40 });
    // framer-motion flushes MotionValue-driven style writes through its own
    // render scheduler, not synchronously on the event — an immediate read
    // reliably still shows the pre-animation value, so this waits for the
    // spring to actually move.
    await waitFor(() => expect(node.outerHTML).toMatch(/rotate[XY]\(/));
  });

  // Mutation-tested during development: removing both of Tilt3D's own
  // guards — the `onMove` early return and the `style` ternary — makes
  // this assertion fail, confirming it depends on Tilt3D's own logic and
  // not on some other mechanism.
  it("does not tilt when reduced motion is requested", async () => {
    setReducedMotion(true);
    render(<Tilt3D max={8}>contenido</Tilt3D>);
    const node = screen.getByText("contenido");
    conRect(node);
    moverPuntero(node, { clientX: 160, clientY: 40 });
    await new Promise((resolve) => setTimeout(resolve, 80));
    expect(node.outerHTML).not.toMatch(/rotate[XY]\((?!0deg\))/);
  });
});
