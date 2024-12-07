"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RightToLeft } from "@/components/motion/MotionWrappers";
import DobleArrowIcon from "@/assets/icons/jsx/DobleArrowIcon";

export default function FAQClient({ questions }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-6">
      {questions.map((question, index) => (
        <RightToLeft
          key={index}
          index={index}
          className="bg-[#F9F5FF] p-[50px] rounded-lg cursor-pointer"
          payload={{
            onClick: () => toggleQuestion(index),
          }}
        >
          <div>
            <div className="flex items-center justify-start gap-6">
              <motion.div
                animate={{ rotate: activeIndex === index ? -90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <DobleArrowIcon className="w-[16px] h-[20px] text-[#707070]" />
              </motion.div>
              <h3 className="text-2xl">{question.question}</h3>
            </div>
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="mt-6 text-xl leading-10">{question.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </RightToLeft>
      ))}
    </div>
  );
}
