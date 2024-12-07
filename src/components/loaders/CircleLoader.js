"use client";
import { motion } from "framer-motion";

export default function CircleLoader() {
  const circles = [
    {
      fill: "#4EB973",
      opacity: "0.209",
      size: 287.19,
      delay: 0,
    },
    {
      fill: "#459C64",
      opacity: "0.426",
      size: 232.96,
      delay: 0.2,
    },
    {
      fill: "#4EB973",
      opacity: "0.659",
      size: 175.94,
      delay: 0.4,
    },
    {
      fill: "#A5D5AF",
      opacity: "0.968",
      size: 114.818,
      delay: 0.6,
    },
    {
      fill: "#FFF",
      opacity: "1",
      size: 91.46,
      delay: 0.8,
    },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="840"
        height="900"
        style={{ width: "100%", height: "100%", maxWidth: "400px" }}
        viewBox="0 0 840 900"
      >
        <defs>
          <clipPath id="__lottie_element_2">
            <path d="M0 0h840v900H0z" />
          </clipPath>
        </defs>
        <g clipPath="url(#__lottie_element_2)">
          {circles.map((circle, index) => (
            <motion.path
              key={index}
              fill={circle.fill}
              fillOpacity={circle.opacity}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: circle.opacity 
              }}
              transition={{
                duration: 0.5,
                delay: circle.delay,
                ease: "easeOut"
              }}
              d={`M420 ${448 - circle.size}c${circle.size} 0 ${circle.size} ${circle.size} ${circle.size} ${circle.size}S${420 + circle.size} ${448 + circle.size} 420 ${448 + circle.size} ${420 - circle.size} ${420 + circle.size} ${420 - circle.size} 448 ${420 - circle.size} ${448 - circle.size} ${420 - circle.size} 448 ${420 - circle.size} ${448 - circle.size})`}
            />
          ))}
        </g>
      </motion.svg>
    </div>
  );
}
