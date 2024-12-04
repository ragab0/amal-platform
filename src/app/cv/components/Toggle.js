"use client";
import { motion } from "framer-motion";

export default function Toggle({ isOn, onToggle }) {
  return (
    <motion.button
      className={`relative w-[50px] h-[26px] rounded-full ${
        isOn ? "bg-white" : "bg-[#1A5336]"
      }`}
      onClick={onToggle}
      aria-label="Toggle"
    >
      <motion.div
        className={`absolute top-[4px] left-[4px] w-[18px] h-[18px] rounded-full ${
          isOn ? "bg-main" : "bg-white"
        }`}
        animate={{ x: isOn ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </motion.button>
  );
}
