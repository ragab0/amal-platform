"use client";

import { motion } from "framer-motion";

export const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? -1000 : 1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? -1000 : 1000,
    opacity: 0,
  }),
};

export default function SlideAnimation({ children, custom, className = "" }) {
  return (
    <motion.div
      custom={custom}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
