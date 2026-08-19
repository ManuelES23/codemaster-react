import { useEffect } from "react";
import { useMotionValue, useReducedMotion } from "framer-motion";
import { useIsMobile } from "./tokens";

// Tracks the pointer's position within `ref`'s own box, exposed as pixel
// motion values — for a glow (or any decoration) that follows the cursor
// instead of sitting fixed in one spot. At rest — before the pointer ever
// enters, after it leaves, or whenever there's no real cursor to track
// (touch, reduced motion) — it settles at the target's top-right corner,
// the same static position this effect originally had.
//
// Uses native pointermove/pointerleave listeners on `ref.current` rather
// than JSX event props: the elements this attaches to (CardLift, Tilt3D)
// are plain function components without forwardRef, so there's no JSX
// element here to attach handlers to directly.
export function useCursorGlow(ref) {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const disabled = reduced || isMobile;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const posarEnEsquina = () => {
      x.set(el.clientWidth);
      y.set(0);
    };
    posarEnEsquina();

    if (disabled) return undefined;

    const onMove = (event) => {
      const box = el.getBoundingClientRect();
      x.set(event.clientX - box.left);
      y.set(event.clientY - box.top);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", posarEnEsquina);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", posarEnEsquina);
    };
  }, [disabled, ref, x, y]);

  return { x, y, disabled };
}
