import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { setReducedMotion } from "../test/setup";
import CardLift from "./CardLift";

// CardLift renders `{children}` directly inside the motion.div with no
// wrapping element, so when children is the bare string "tarjeta",
// `screen.getByText("tarjeta")` resolves to the motion.div itself (it's the
// innermost element containing that exact text). Its `.parentElement` would
// instead be the outer container React Testing Library's render() creates —
// an element with no framer-motion listener at all. `pointerenter` does not
// bubble, and bubbling only travels from a target up to its ancestors
// regardless, so firing it there could never reach a hover handler on the
// descendant. Confirmed by mutation check: with `.parentElement`, the
// reduced-motion test kept passing even after mutating the component to
// include `y: -lift` on the reduced branch, because the event never reached
// the real element either way. Targeting the element `getByText` returns
// directly reaches CardLift's own motion.div and makes both assertions
// meaningful.
describe("CardLift", () => {
  it("renders its children", () => {
    render(<CardLift>tarjeta</CardLift>);
    expect(screen.getByText("tarjeta")).toBeInTheDocument();
  });

  it("raises the card on hover", async () => {
    render(<CardLift lift={6}>tarjeta</CardLift>);
    const node = screen.getByText("tarjeta");
    fireEvent.pointerEnter(node);
    // framer-motion flushes MotionValue/animated-style writes through its
    // own render scheduler, not synchronously on the triggering event — an
    // immediate read of outerHTML reliably still shows the pre-hover state,
    // so this waits for the hover target to actually land.
    await waitFor(() => expect(node.outerHTML).toMatch(/translateY\(-[1-9]/));
  });

  it("does not move the card at all when reduced motion is requested", async () => {
    setReducedMotion(true);
    render(<CardLift lift={6}>tarjeta</CardLift>);
    const node = screen.getByText("tarjeta");
    fireEvent.pointerEnter(node);
    // Wait for the hover gesture to actually be processed (the border color
    // change lands) before asserting on `y` — otherwise a synchronous
    // read-too-early would make this assertion pass vacuously regardless of
    // whether CardLift correctly omits `y` under reduced motion.
    await waitFor(() => expect(node.outerHTML).toMatch(/border-color/));
    // If `y` were present (a regression), it tweens toward -lift over
    // DURATION.base (0.5s) — sampling right when border-color first lands
    // can still catch it mid-tween at a fractional, sub-1px value like
    // "-0.5" which the magnitude regex below wouldn't flag, producing a
    // false pass. Waiting out the full transition first means a regression
    // is caught at its settled, unambiguous value.
    await new Promise((resolve) => setTimeout(resolve, 600));
    expect(node.outerHTML).not.toMatch(/translateY\(-[1-9]/);
  });
});
