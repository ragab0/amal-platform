"use client";
import { motion } from "framer-motion";

export function FadeInUp({ children, className, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={className}
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

export function RightToLeft({ children, index, className, payload }) {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={className}
      {...payload}
    >
      {children}
    </motion.div>
  );
}

export function HoverCvPreviewCard({ children, index }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, delay: index * 0.1 },
      }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
      transition={{
        layout: { duration: 0.5, type: "spring" },
        opacity: { duration: 0.3 },
        y: { duration: 0.3, delay: 0.05 },
      }}
      className="bg-white border border-text rounded-[6px] p-[24px_40px]"
    >
      {children}
    </motion.div>
  );
}

export function SkillCvPreviewCard({ children, key }) {
  return (
    <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{
      layout: { duration: 0.5, type: "spring" },
      opacity: { duration: 0.3 },
      y: { duration: 0.3, delay: 0.05 },
    }}
    key={key}
    className="grid grid-cols-[1fr_1fr_auto] gap-4 items-start"
    >
      {children}
    </motion.div>
  );
}