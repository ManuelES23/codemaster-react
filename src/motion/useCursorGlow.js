import { useEffect } from "react";
import { useMotionValue, useReducedMotion } from "framer-motion";
import { useIsMobile } from "./tokens";

// Tracks the pointer's position within `ref`'s own box, exposed as pixel
// motion values — for a glow (or any decoration) that follows the cursor
// instead of sitting fixed in one spot. Invisible (opacity 0) until the
// pointer actually enters, and fades back out on pointerleave — no resting
// position to show when nobody's hovering. Never appears at all under
// reduced motion or on touch (existing useIsMobile), where there's no real
// cursor to react to in the first place.
//
// Uses native pointerenter/pointermove/pointerleave listeners on
// `ref.current` rather than JSX event props: the elements this attaches
// to (CardLift, Tilt3D) are plain function components without forwardRef,
// so there's no JSX element here to attach handlers to directly.
export function useCursorGlow(ref) {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const disabled = reduced || isMobile;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return undefined;

    const posicionar = (event) => {
      const box = el.getBoundingClientRect();
      x.set(event.clientX - box.left);
      y.set(event.clientY - box.top);
    };
    const onEnter = (event) => {
      posicionar(event);
      opacity.set(1);
    };
    const onLeave = () => opacity.set(0);

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", posicionar);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", posicionar);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [disabled, ref, x, y, opacity]);

  return { x, y, opacity, disabled };
}
