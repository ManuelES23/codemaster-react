import { motion } from "framer-motion";
import { DURATION, EASE_OUT } from "../motion/tokens";

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: DURATION.fast, ease: EASE_OUT }}
  >
    {children}
  </motion.div>
);

export default PageTransition;
