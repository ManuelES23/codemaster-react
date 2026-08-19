import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Slides a section up into place as it scrolls into view, and — via the
// z-index + small negative margin its caller supplies through `className`
// — visually settles just over the tail of the section before it. This is
// the fix for the sticky-stack version: that used `position: sticky` to
// pin a section in place while the next one covered it, but a pinned
// section only ever renders the same top slice of itself for the whole
// pin window, since sticky isn't an internal scroll container. Any
// section taller than one viewport (Servicios' 8 cards, Trabajo's project
// rows) became partially unreachable — scrolling further just kept
// showing that same frozen slice.
//
// This component never pins anything. `ref` tracks its own normal,
// never-repositioned flow position, so normal page scroll always reveals
// 100% of the wrapped content no matter how tall it is — the bug this
// replaces cannot happen here by construction, not just by tuning.
const SectionSlide = ({ className = "", children }) => {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  // Progress 0 when this section's top is about to enter the viewport
  // from below, 1 once it's settled into the upper third of the screen —
  // tracks only the section's own top edge, so its own height never
  // factors into the range.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 35%"],
  });

  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [64, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [0.97, 1]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, scale }}>{children}</motion.div>
    </div>
  );
};

export default SectionSlide;
