import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASE_OUT, VIEWPORT } from "./tokens";

const RevealText = ({
  lines = [],
  as = "h2",
  className = "",
  lineClassName = "",
  delay = 0,
}) => {
  const reduced = useReducedMotion();
  const Heading = as;

  return (
    <Heading className={className}>
      {lines.map((line, index) => (
        <span key={line} className="block overflow-hidden">
          <motion.span
            className={`block ${lineClassName}`}
            initial={reduced ? { opacity: 0 } : { y: "110%" }}
            whileInView={reduced ? { opacity: 1 } : { y: "0%" }}
            viewport={VIEWPORT}
            transition={{
              duration: DURATION.slow,
              delay: delay + index * 0.08,
              ease: EASE_OUT,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Heading>
  );
};

export default RevealText;
