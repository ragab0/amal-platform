"use client";

export default function ProgressSteps({
  steps,
  currentStep,
  onStepClick = () => {},
}) {
  return (
    <div
      className="flex flex-col md:flex-row items-center justify-center w-full 
     gap-4 md:gap-1 mx-auto"
    >
      {steps.map((_, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row items-center justify-center"
        >
          {/* Circle */}
          <button
            onClick={() => onStepClick(index + 1)}
            disabled={index + 1 >= currentStep}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold
              ${
                currentStep > index + 1
                  ? "bg-main text-white cursor-pointer"
                  : currentStep === index + 1
                  ? "bg-main text-white cursor-not-allowed"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              } 
              ${currentStep > index + 1 ? "hover:bg-main-pale" : ""}`}
          >
            {index + 1}
          </button>
          {/* Line */}
          {index < steps.length - 1 && (
            <div
              className={`h-[50px] md:h-1 w-1 md:w-[100px] lg:w-[200px] 
              ${
                currentStep > index + 1
                  ? "bg-main"
                  : currentStep === index + 1
                  ? "bg-main"
                  : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
