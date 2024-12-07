"use client";
import { motion } from "framer-motion";

export function FadeInUp({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

export function HoverCard({ children, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
      }}
    >
      {children}
    </motion.div>
  );
}

export function HoverHeader({ children, className }) {
  return (
    <motion.div
      className={className}
      whileHover={{ backgroundColor: "#5620a3" }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

export function FadeInSlide({ children, index, itemIndex }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.2 + itemIndex * 0.1 + 0.3,
      }}
    >
      {children}
    </motion.li>
  );
}

export function HoverButton({ children }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      {children}
    </motion.div>
  );
}
