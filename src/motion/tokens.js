import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export const EASE_OUT = [0.16, 1, 0.3, 1];

export const DURATION = {
  fast: 0.22,
  base: 0.5,
  slow: 0.8,
};

export const DISTANCE = {
  sm: 16,
  md: 24,
};

export const VIEWPORT = { once: true, amount: 0.25 };

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isMobile;
}

export function useMotionDistance(base) {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  if (reduced) return 0;
  return isMobile ? base / 2 : base;
}
