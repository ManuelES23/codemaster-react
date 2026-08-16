import { motion } from "framer-motion";
import { DISTANCE, DURATION, EASE_OUT, VIEWPORT, useMotionDistance } from "./tokens";

const Reveal = ({
  as = "div",
  delay = 0,
  distance = DISTANCE.md,
  className = "",
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
      viewport={VIEWPORT}
      transition={{ duration: DURATION.base, delay, ease: EASE_OUT }}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Reveal;
