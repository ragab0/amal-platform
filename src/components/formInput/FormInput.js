"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useId } from "react";

export default function FormInput({
  label,
  type = "text",
  icon,
  register,
  name,
  error,
  must = false,
  disabled = false,
  inpClassName = "",
  spaceBlock = true,
  ...props
}) {
  const id = useId();

  return (
    <div className={`flex flex-col ${spaceBlock ? "mb-8" : ""}`}>
      {label && (
        <label
          htmlFor={id}
          className={`pb-5 text-[22px] leading-[30px] font-cairo text-text ${
            disabled ? "opacity-70" : ""
          }`}
        >
          {label}
          {must && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute right-3 z-10 flex items-center justify-center">
            {icon}
          </div>
        )}
        <input
          id={id}
          type={type}
          className={`w-full h-[60px] px-4 bg-white border rounded-[6px] disabled:opacity-50 
            transition-all duration-300 ease-out focus:outline-none focus:ring-4 disabled:cursor-not-allowed
            ${
              error
                ? "form-error border-red-500 text-red-500 focus:border-red-500 focus:ring-[rgba(220,53,69,0.25)]"
                : "border-gray-300 hover:border-gray-400 text-[#495057] focus:ring-[rgba(0,123,255,0.25)]"
            } 
          ${inpClassName}
          `}
          {...(register && register(name))}
          {...props}
          disabled={disabled}
        />
      </div>
      <AnimatePresence mode="wait">
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-2 text-sm text-red-500"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
