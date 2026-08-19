import { useRef } from "react";
import { motion } from "framer-motion";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { setReducedMotion } from "../test/setup";
import { useCursorGlow } from "./useCursorGlow";

// A minimal host so the hook can be exercised through real DOM events —
// consistent with how the rest of this codebase tests motion primitives
// (through rendered output, not an isolated hook harness). Reads back
// through a motion.div's own written `transform`, not `x.get()`/`y.get()`
// in JSX: motion values update the DOM directly and deliberately don't
// trigger a React re-render, so a JSX read of `.get()` would only ever
// show the value from the very first render, same as every other
// scroll/pointer-linked primitive test in this codebase.
function Sonda() {
  const ref = useRef(null);
  const { x, y } = useCursorGlow(ref);
  return (
    <div ref={ref} data-testid="objetivo">
      <motion.div data-testid="lectura" style={{ x, y }} />
    </div>
  );
}

function leerTransform() {
  return screen.getByTestId("lectura").outerHTML;
}

// jsdom doesn't do real layout, so clientWidth is always 0 by default.
// Stubbed on the prototype (rather than the instance, after render) so
// it's already in place before useCursorGlow's mount-time effect reads
// it — an instance-level stub set after render() would miss that first
// read entirely, since effects run synchronously within render()'s own
// act() wrapper.
const ANCHO_OBJETIVO = 200;
const originalClientWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "clientWidth");

describe("useCursorGlow", () => {
  afterEach(() => {
    if (originalClientWidth) {
      Object.defineProperty(HTMLElement.prototype, "clientWidth", originalClientWidth);
    }
  });

  it("settles at the target's top-right corner before any pointer interaction", async () => {
    Object.defineProperty(HTMLElement.prototype, "clientWidth", {
      configurable: true,
      value: ANCHO_OBJETIVO,
    });

    render(<Sonda />);

    await waitFor(() => {
      expect(leerTransform()).toMatch(new RegExp(`translateX\\(${ANCHO_OBJETIVO}px\\)`));
    });
    // framer-motion omits a translate component entirely when the
    // MotionValue is at 0 rather than always writing translateY(0px) —
    // asserting the absence of any *non-zero* translateY covers both.
    expect(leerTransform()).not.toMatch(/translateY\((?!0px)/);
  });

  it("follows the pointer's position within the target on pointermove", async () => {
    render(<Sonda />);
    const objetivo = screen.getByTestId("objetivo");
    objetivo.getBoundingClientRect = () => ({
      left: 10,
      top: 20,
      width: 200,
      height: 100,
      right: 210,
      bottom: 120,
    });

    const evento = new Event("pointermove");
    evento.clientX = 60;
    evento.clientY = 45;
    objetivo.dispatchEvent(evento);

    await waitFor(() => {
      expect(leerTransform()).toMatch(/translateX\(50px\)/);
      expect(leerTransform()).toMatch(/translateY\(25px\)/);
    });
  });

  it("returns to the corner on pointerleave instead of staying wherever the pointer last was", async () => {
    Object.defineProperty(HTMLElement.prototype, "clientWidth", {
      configurable: true,
      value: ANCHO_OBJETIVO,
    });

    render(<Sonda />);
    const objetivo = screen.getByTestId("objetivo");
    objetivo.getBoundingClientRect = () => ({
      left: 0,
      top: 0,
      width: 200,
      height: 100,
      right: 200,
      bottom: 100,
    });

    const mover = new Event("pointermove");
    mover.clientX = 150;
    mover.clientY = 80;
    objetivo.dispatchEvent(mover);
    await waitFor(() => expect(leerTransform()).toMatch(/translateX\(150px\)/));

    objetivo.dispatchEvent(new Event("pointerleave"));
    await waitFor(() => {
      expect(leerTransform()).toMatch(new RegExp(`translateX\\(${ANCHO_OBJETIVO}px\\)`));
      // framer-motion omits a translate component entirely when the
    // MotionValue is at 0 rather than always writing translateY(0px) —
    // asserting the absence of any *non-zero* translateY covers both.
    expect(leerTransform()).not.toMatch(/translateY\((?!0px)/);
    });
  });

  it("never tracks the pointer under reduced motion — stays pinned at the corner", async () => {
    setReducedMotion(true);
    Object.defineProperty(HTMLElement.prototype, "clientWidth", {
      configurable: true,
      value: ANCHO_OBJETIVO,
    });

    render(<Sonda />);
    const objetivo = screen.getByTestId("objetivo");
    objetivo.getBoundingClientRect = () => ({
      left: 0,
      top: 0,
      width: 200,
      height: 100,
      right: 200,
      bottom: 100,
    });

    await waitFor(() => expect(leerTransform()).toMatch(new RegExp(`translateX\\(${ANCHO_OBJETIVO}px\\)`)));

    const mover = new Event("pointermove");
    mover.clientX = 150;
    mover.clientY = 80;
    objetivo.dispatchEvent(mover);

    // Give any (incorrect) listener a chance to fire before asserting it
    // didn't.
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(leerTransform()).toMatch(new RegExp(`translateX\\(${ANCHO_OBJETIVO}px\\)`));
    // framer-motion omits a translate component entirely when the
    // MotionValue is at 0 rather than always writing translateY(0px) —
    // asserting the absence of any *non-zero* translateY covers both.
    expect(leerTransform()).not.toMatch(/translateY\((?!0px)/);
  });
});
