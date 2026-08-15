import { motion } from "framer-motion";
import { DURATION, EASE_OUT, VIEWPORT } from "./tokens";

const Rule = ({ className = "", delay = 0 }) => (
  <motion.div
    className={`h-px w-full origin-left bg-line ${className}`}
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={VIEWPORT}
    transition={{ duration: DURATION.slow, delay, ease: EASE_OUT }}
  />
);

export default Rule;
