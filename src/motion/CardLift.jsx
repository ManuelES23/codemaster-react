import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASE_OUT } from "./tokens";

const CardLift = ({ lift = 6, className = "", children, ...rest }) => {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={false}
      whileHover={reduced ? { borderColor: "var(--color-card-border-hover)" } : { y: -lift, borderColor: "var(--color-card-border-hover)" }}
      transition={{ duration: DURATION.base, ease: EASE_OUT }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default CardLift;
