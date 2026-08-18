import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useIsMobile } from "./tokens";

const Tilt3D = ({ max = 8, className = "", children }) => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const disabled = reduced || isMobile;

  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), {
    stiffness: 220,
    damping: 22,
  });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), {
    stiffness: 220,
    damping: 22,
  });

  const onMove = (event) => {
    if (disabled || !ref.current) return;
    const box = ref.current.getBoundingClientRect();
    if (!box.width || !box.height) {
      px.set(0);
      py.set(0);
      return;
    }
    px.set((event.clientX - box.left) / box.width - 0.5);
    py.set((event.clientY - box.top) / box.height - 0.5);
  };

  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div className={className} style={{ perspective: 900 }}>
      <motion.div
        ref={ref}
        className="h-full"
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={
          disabled
            ? { transformStyle: "preserve-3d" }
            : { rotateX, rotateY, transformStyle: "preserve-3d" }
        }
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Tilt3D;
