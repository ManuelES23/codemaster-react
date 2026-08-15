import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASE_OUT, VIEWPORT } from "./tokens";

const Rule = ({ className = "", delay = 0 }) => {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`h-px w-full origin-left bg-line ${className}`}
      initial={{ scaleX: reduced ? 1 : 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{
        duration: reduced ? 0 : DURATION.slow,
        delay: reduced ? 0 : delay,
        ease: EASE_OUT,
      }}
    />
  );
};

export default Rule;
