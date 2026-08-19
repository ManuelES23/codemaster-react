import { useRef } from "react";
import { motion } from "framer-motion";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { setReducedMotion } from "../test/setup";
import { useCursorGlow } from "./useCursorGlow";

// A minimal host so the hook can be exercised through real DOM events —
// consistent with how the rest of this codebase tests motion primitives
// (through rendered output, not an isolated hook harness). Reads back
// through a motion.div's own written style, not `.get()` in JSX: motion
// values update the DOM directly and deliberately don't trigger a React
// re-render, so a JSX read of `.get()` would only ever show the value from
// the very first render, same as every other pointer/scroll-linked
// primitive test in this codebase.
function Sonda() {
  const ref = useRef(null);
  const { x, y, opacity } = useCursorGlow(ref);
  return (
    <div ref={ref} data-testid="objetivo">
      <motion.div data-testid="lectura" style={{ x, y, opacity }} />
    </div>
  );
}

function leerEstilo() {
  return screen.getByTestId("lectura").outerHTML;
}

function ponerCaja(objetivo, box) {
  objetivo.getBoundingClientRect = () => ({ right: box.left + box.width, bottom: box.top + box.height, ...box });
}

describe("useCursorGlow", () => {
  it("starts invisible — no static resting glow before the pointer ever enters", () => {
    render(<Sonda />);
    expect(leerEstilo()).toMatch(/opacity:\s*0(?:[^.]|$)/);
  });

  it("becomes visible and positioned at the pointer's entry point on pointerenter", async () => {
    render(<Sonda />);
    const objetivo = screen.getByTestId("objetivo");
    ponerCaja(objetivo, { left: 10, top: 20, width: 200, height: 100 });

    const entrada = new Event("pointerenter");
    entrada.clientX = 60;
    entrada.clientY = 45;
    objetivo.dispatchEvent(entrada);

    await waitFor(() => {
      expect(leerEstilo()).toMatch(/opacity:\s*1/);
      expect(leerEstilo()).toMatch(/translateX\(50px\)/);
      expect(leerEstilo()).toMatch(/translateY\(25px\)/);
    });
  });

  it("keeps following pointermove while visible", async () => {
    render(<Sonda />);
    const objetivo = screen.getByTestId("objetivo");
    ponerCaja(objetivo, { left: 0, top: 0, width: 200, height: 100 });

    objetivo.dispatchEvent(new Event("pointerenter"));

    const mover = new Event("pointermove");
    mover.clientX = 150;
    mover.clientY = 80;
    objetivo.dispatchEvent(mover);

    await waitFor(() => {
      expect(leerEstilo()).toMatch(/translateX\(150px\)/);
      expect(leerEstilo()).toMatch(/translateY\(80px\)/);
    });
  });

  it("fades back out on pointerleave", async () => {
    render(<Sonda />);
    const objetivo = screen.getByTestId("objetivo");
    ponerCaja(objetivo, { left: 0, top: 0, width: 200, height: 100 });

    objetivo.dispatchEvent(new Event("pointerenter"));
    await waitFor(() => expect(leerEstilo()).toMatch(/opacity:\s*1/));

    objetivo.dispatchEvent(new Event("pointerleave"));
    await waitFor(() => expect(leerEstilo()).toMatch(/opacity:\s*0(?:[^.]|$)/));
  });

  it("never appears under reduced motion, even when the pointer enters", async () => {
    setReducedMotion(true);
    render(<Sonda />);
    const objetivo = screen.getByTestId("objetivo");
    ponerCaja(objetivo, { left: 0, top: 0, width: 200, height: 100 });

    objetivo.dispatchEvent(new Event("pointerenter"));

    // Give any (incorrect) listener a chance to fire before asserting it
    // didn't.
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(leerEstilo()).toMatch(/opacity:\s*0(?:[^.]|$)/);
  });
});
