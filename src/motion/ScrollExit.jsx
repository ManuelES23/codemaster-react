import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Fades and shrinks its children in direct proportion to how far the user
// has scrolled past this element — not a fixed-duration animation, but
// scroll-scrubbed: scroll halfway through the element's own height and the
// content is halfway faded. Meant for a section's content to visibly
// dissolve as the section scrolls out, rather than just abruptly vanishing.
const ScrollExit = ({ className = "", children }) => {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Under reduced motion this stays fully static — no fade, no shrink —
  // matching every other primitive in this codebase: scroll-linked motion
  // is still motion, and the rule here is none, not "less".
  const opacity = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1, 0.92]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ opacity, scale }}>{children}</motion.div>
    </div>
  );
};

export default ScrollExit;
