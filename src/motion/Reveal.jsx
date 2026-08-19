import { motion } from "framer-motion";
import { DISTANCE, DURATION, EASE_OUT, VIEWPORT, useMotionDistance } from "./tokens";

const Reveal = ({
  as = "div",
  delay = 0,
  distance = DISTANCE.md,
  className = "",
  // Default (true): animates in once and stays — right for headings,
  // paragraphs, anything read as text, on every page including the legal
  // ones, where text disappearing while someone scrolls back up to reread
  // it would be a real regression. Pass `once={false}` only for cards and
  // other visual elements, where re-triggering the entrance (and its
  // reverse, an exit, on the way out) reads as "modern" rather than
  // "my content vanished".
  once = true,
  children,
  ...rest
}) => {
  const y = useMotionDistance(distance);
  const Component = motion[as] ?? motion.div;

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ ...VIEWPORT, once }}
      transition={{ duration: DURATION.base, delay, ease: EASE_OUT }}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Reveal;
