"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { cvBuilderSchema } from "@/validations/cv-builder";
import Level1 from "./levels/Level1";
import Level2 from "./levels/Level2";
import Level3 from "./levels/Level3";
import SlideAnimation from "@/components/motion/SlideAnimation";
import ProgressSteps from "./ProgressSteps";

const steps = [
  { label: "اختيار الطريقة" },
  { label: "رفع السيرة الذاتية" },
  { label: "اختيار القالب" },
];

export default function BuildCVClient() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [cvChoice, setCvChoice] = useState(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(cvBuilderSchema),
  });

  function onSubmit(data) {
    console.log("data is:", data);
    if (currentLevel === 3) {
      router.push("/cv");
      return;
    }
    setCurrentLevel((prev) => prev + 1);
  }

  function handleNextStep() {
    if (currentLevel < steps.length) {
      setCurrentLevel((prev) => prev + 1);
    }
  }

  // function handlePrevStep() {
  //   if (currentLevel > 1) {
  //     setCurrentLevel((prev) => prev - 1);
  //   }
  // }

  function handleSkip() {
    setCurrentLevel(steps.length);
  }

  function handleStepClick(newStep) {
    if (newStep >= 1 && newStep <= steps.length) {
      setCurrentLevel(newStep);
    }
  }

  return (
    <div className="mx-auto px-4 py-12 overflow-hidden">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-20">
        <ProgressSteps
          steps={steps}
          currentStep={currentLevel}
          onStepClick={handleStepClick}
        />
        <AnimatePresence mode="wait" custom={currentLevel}>
          <SlideAnimation key={currentLevel} custom={currentLevel}>
            {currentLevel === 1 && (
              <Level1
                register={register}
                errors={errors}
                setCvChoice={setCvChoice}
                setValue={setValue}
                onSkip={handleSkip}
                onNext={handleNextStep}
              />
            )}
            {currentLevel === 2 && (
              <Level2
                register={register}
                errors={errors}
                cvChoice={cvChoice}
                setValue={setValue}
              />
            )}
            {currentLevel === 3 && (
              <Level3
                errors={errors}
                setValue={setValue}
                handleSubmit={handleSubmit}
                watch={watch}
              />
            )}
          </SlideAnimation>
        </AnimatePresence>
      </form>
    </div>
  );
}
