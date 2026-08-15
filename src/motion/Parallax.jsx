import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "./tokens";

const Parallax = ({ offset = 60, className = "", children }) => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const disabled = reduced || isMobile;
  const y = useTransform(scrollYProgress, [0, 1], disabled ? [0, 0] : [offset, -offset]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
};

export default Parallax;
