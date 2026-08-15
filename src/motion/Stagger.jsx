import { motion } from "framer-motion";
import { DURATION, EASE_OUT, VIEWPORT, useMotionDistance } from "./tokens";

const Stagger = ({ as = "div", className = "", gap = 0.08, children, ...rest }) => {
  const Component = motion[as] ?? motion.div;

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: gap } } }}
      {...rest}
    >
      {children}
    </Component>
  );
};

export const StaggerItem = ({ as = "div", className = "", distance = 16, children, ...rest }) => {
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
