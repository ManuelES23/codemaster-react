import { motion } from "framer-motion";
import { DISTANCE, DURATION, EASE_OUT, VIEWPORT, useMotionDistance } from "./tokens";

// Default (true): the group animates in once and stays. Pass `once={false}`
// for card grids and other visual groups — the whole group then also
// reverses (fades/slides back out, staggered) when it scrolls out of view
// in either direction, not just in. See Reveal.jsx for the same knob and
// why text-bearing usages should never flip it.
const Stagger = ({ as = "div", className = "", gap = 0.08, once = true, children, ...rest }) => {
  const Component = motion[as] ?? motion.div;

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...VIEWPORT, once }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: gap } } }}
      {...rest}
    >
      {children}
    </Component>
  );
};

export const StaggerItem = ({ as = "div", className = "", distance = DISTANCE.sm, children, ...rest }) => {
  const y = useMotionDistance(distance);
  const Component = motion[as] ?? motion.div;

  return (
    <Component
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE_OUT } },
      }}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Stagger;
