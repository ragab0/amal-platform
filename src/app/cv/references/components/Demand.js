"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Demand() {
  const [isOn, setIsOn] = useState(false);
  function toggleHandler() {
    setIsOn((o) => !o);
  }

  return (
    <div className="w-full h-[60px] bg-main rounded-[6px] mb-8 flex items-center justify-between px-8">
      <h2 className="text-white text-lg font-semibold">
        عرض &quot;المراجع متوفرة عند الطلب&quot; في سيرتك الذاتية
      </h2>
      <motion.button
        className={`relative w-[50px] h-[26px] rounded-full ${
          isOn ? "bg-white" : "bg-[#1A5336]"
        }`}
        onClick={toggleHandler}
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
    </div>
  );
}
